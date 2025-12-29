;; BitVault Core - Social Savings Challenge Contract
;; Enables time-locked savings challenges with social accountability and rewards

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-unauthorized (err u102))
(define-constant err-already-exists (err u103))
(define-constant err-invalid-amount (err u104))
(define-constant err-challenge-full (err u105))
(define-constant err-challenge-ended (err u106))
(define-constant err-too-early (err u107))
(define-constant err-deposit-required (err u108))
(define-constant err-already-claimed (err u109))

;; Data Variables
(define-data-var challenge-nonce uint u0)
(define-data-var platform-fee-percentage uint u5) ;; 5% fee on forfeits

;; Challenge types: personal or group
(define-data-var min-deposit uint u1000000) ;; 1 STX minimum

;; Data Maps
(define-map challenges
  { challenge-id: uint }
  {
    creator: principal,
    title: (string-ascii 100),
    target-amount: uint,
    deposit-frequency: uint, ;; blocks between deposits
    deadline: uint, ;; block height
    max-participants: uint,
    current-participants: uint,
    total-deposited: uint,
    is-active: bool,
    reward-pool: uint
  }
)

(define-map challenge-participants
  { challenge-id: uint, participant: principal }
  {
    total-deposited: uint,
    last-deposit-block: uint,
    deposit-count: uint,
    current-streak: uint,
    has-completed: bool,
    has-claimed-rewards: bool
  }
)

(define-map user-stats
  { user: principal }
  {
    total-challenges: uint,
    completed-challenges: uint,
    total-saved: uint,
    total-rewards: uint,
    longest-streak: uint
  }
)

;; Read-only functions
(define-read-only (get-challenge (challenge-id uint))
  (map-get? challenges { challenge-id: challenge-id })
)

(define-read-only (get-participant-info (challenge-id uint) (participant principal))
  (map-get? challenge-participants { challenge-id: challenge-id, participant: participant })
)

(define-read-only (get-user-stats (user principal))
  (default-to
    { total-challenges: u0, completed-challenges: u0, total-saved: u0, total-rewards: u0, longest-streak: u0 }
    (map-get? user-stats { user: user })
  )
)

(define-read-only (get-current-nonce)
  (var-get challenge-nonce)
)

(define-read-only (calculate-streak-bonus (streak uint))
  ;; Bonus increases with streak: 1% per week of streak
  (/ (* streak u10) u1000)
)

;; Public functions

;; Create a new savings challenge
(define-public (create-challenge 
  (title (string-ascii 100))
  (target-amount uint)
  (deposit-frequency uint)
  (duration-blocks uint)
  (max-participants uint))
  (let
    (
      (challenge-id (var-get challenge-nonce))
      (deadline (+ stacks-block-height duration-blocks))
    )
    ;; Validate inputs
    (asserts! (> target-amount u0) err-invalid-amount)
    (asserts! (> deposit-frequency u0) err-invalid-amount)
    (asserts! (> max-participants u0) err-invalid-amount)
    
    ;; Create challenge
    (map-set challenges
      { challenge-id: challenge-id }
      {
        creator: tx-sender,
        title: title,
        target-amount: target-amount,
        deposit-frequency: deposit-frequency,
        deadline: deadline,
        max-participants: max-participants,
        current-participants: u1,
        total-deposited: u0,
        is-active: true,
        reward-pool: u0
      }
    )
    
    ;; Add creator as first participant
    (map-set challenge-participants
      { challenge-id: challenge-id, participant: tx-sender }
      {
        total-deposited: u0,
        last-deposit-block: stacks-block-height,
        deposit-count: u0,
        current-streak: u0,
        has-completed: false,
        has-claimed-rewards: false
      }
    )
    
    ;; Update user stats
    (update-user-challenges tx-sender)
    
    ;; Increment nonce
    (var-set challenge-nonce (+ challenge-id u1))
    
    (ok challenge-id)
  )
)

;; Join an existing challenge
(define-public (join-challenge (challenge-id uint))
  (let
    (
      (challenge (unwrap! (get-challenge challenge-id) err-not-found))
      (existing-participant (map-get? challenge-participants { challenge-id: challenge-id, participant: tx-sender }))
    )
    ;; Validate
    (asserts! (get is-active challenge) err-challenge-ended)
    (asserts! (< (get current-participants challenge) (get max-participants challenge)) err-challenge-full)
    (asserts! (is-none existing-participant) err-already-exists)
    (asserts! (< stacks-block-height (get deadline challenge)) err-challenge-ended)
    
    ;; Add participant
    (map-set challenge-participants
      { challenge-id: challenge-id, participant: tx-sender }
      {
        total-deposited: u0,
        last-deposit-block: stacks-block-height,
        deposit-count: u0,
        current-streak: u0,
        has-completed: false,
        has-claimed-rewards: false
      }
    )
    
    ;; Update challenge participant count
    (map-set challenges
      { challenge-id: challenge-id }
      (merge challenge { current-participants: (+ (get current-participants challenge) u1) })
    )
    
    ;; Update user stats
    (update-user-challenges tx-sender)
    
    (ok true)
  )
)

;; Make a deposit to a challenge
(define-public (make-deposit (challenge-id uint) (amount uint))
  (let
    (
      (challenge (unwrap! (get-challenge challenge-id) err-not-found))
      (participant (unwrap! (get-participant-info challenge-id tx-sender) err-unauthorized))
      (blocks-since-last (- stacks-block-height (get last-deposit-block participant)))
    )
    ;; Validate
    (asserts! (get is-active challenge) err-challenge-ended)
    (asserts! (< stacks-block-height (get deadline challenge)) err-challenge-ended)
    (asserts! (>= amount (var-get min-deposit)) err-invalid-amount)
    
    ;; Transfer STX to contract
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    
    ;; Calculate new streak
    (let
      (
        (expected-frequency (get deposit-frequency challenge))
        (is-on-time (<= blocks-since-last (* expected-frequency u2))) ;; Allow 2x grace period
        (new-streak (if is-on-time
                      (+ (get current-streak participant) u1)
                      u1))
      )
      
      ;; Update participant
      (map-set challenge-participants
        { challenge-id: challenge-id, participant: tx-sender }
        (merge participant {
          total-deposited: (+ (get total-deposited participant) amount),
          last-deposit-block: stacks-block-height,
          deposit-count: (+ (get deposit-count participant) u1),
          current-streak: new-streak
        })
      )
      
      ;; Update challenge totals
      (map-set challenges
        { challenge-id: challenge-id }
        (merge challenge {
          total-deposited: (+ (get total-deposited challenge) amount)
        })
      )
      
      ;; Update user stats
      (update-total-saved tx-sender amount)
      (update-longest-streak tx-sender new-streak)
      
      (ok new-streak)
    )
  )
)

;; Complete a challenge and withdraw funds
(define-public (complete-challenge (challenge-id uint))
  (let
    (
      (challenge (unwrap! (get-challenge challenge-id) err-not-found))
      (participant (unwrap! (get-participant-info challenge-id tx-sender) err-unauthorized))
    )
    ;; Validate
    (asserts! (>= stacks-block-height (get deadline challenge)) err-too-early)
    (asserts! (not (get has-completed participant)) err-already-claimed)
    (asserts! (>= (get total-deposited participant) (get target-amount challenge)) err-deposit-required)
    
    ;; Calculate streak bonus
    (let
      (
        (base-amount (get total-deposited participant))
        (bonus-rate (calculate-streak-bonus (get current-streak participant)))
        (bonus-amount (/ (* base-amount bonus-rate) u1000))
        (total-withdrawal (+ base-amount bonus-amount))
      )
      
      ;; Transfer funds back to participant
      (try! (as-contract (stx-transfer? total-withdrawal tx-sender tx-sender)))
      
      ;; Update participant status
      (map-set challenge-participants
        { challenge-id: challenge-id, participant: tx-sender }
        (merge participant { has-completed: true })
      )
      
      ;; Update user stats
      (increment-completed-challenges tx-sender)
      
      (ok total-withdrawal)
    )
  )
)

;; Forfeit a challenge (early withdrawal with penalty)
(define-public (forfeit-challenge (challenge-id uint))
  (let
    (
      (challenge (unwrap! (get-challenge challenge-id) err-not-found))
      (participant (unwrap! (get-participant-info challenge-id tx-sender) err-unauthorized))
    )
    ;; Validate
    (asserts! (> (get total-deposited participant) u0) err-invalid-amount)
    (asserts! (not (get has-completed participant)) err-already-claimed)
    
    ;; Calculate penalty (20% goes to reward pool)
    (let
      (
        (deposited (get total-deposited participant))
        (penalty (/ (* deposited u200) u1000)) ;; 20% penalty
        (withdrawal (- deposited penalty))
      )
      
      ;; Transfer reduced amount back
      (try! (as-contract (stx-transfer? withdrawal tx-sender tx-sender)))
      
      ;; Add penalty to reward pool
      (map-set challenges
        { challenge-id: challenge-id }
        (merge challenge {
          reward-pool: (+ (get reward-pool challenge) penalty)
        })
      )
      
      ;; Mark as completed (forfeited)
      (map-set challenge-participants
        { challenge-id: challenge-id, participant: tx-sender }
        (merge participant { has-completed: true })
      )
      
      (ok withdrawal)
    )
  )
)

;; Claim rewards from completed challenge
(define-public (claim-rewards (challenge-id uint))
  (let
    (
      (challenge (unwrap! (get-challenge challenge-id) err-not-found))
      (participant (unwrap! (get-participant-info challenge-id tx-sender) err-unauthorized))
    )
    ;; Validate
    (asserts! (>= stacks-block-height (get deadline challenge)) err-too-early)
    (asserts! (get has-completed participant) err-unauthorized)
    (asserts! (not (get has-claimed-rewards participant)) err-already-claimed)
    (asserts! (> (get reward-pool challenge) u0) err-invalid-amount)
    
    ;; Calculate share of reward pool based on deposits
    (let
      (
        (user-deposits (get total-deposited participant))
        (total-deposits (get total-deposited challenge))
        (user-share (/ (* (get reward-pool challenge) user-deposits) total-deposits))
      )
      
      ;; Transfer rewards
      (try! (as-contract (stx-transfer? user-share tx-sender tx-sender)))
      
      ;; Mark as claimed
      (map-set challenge-participants
        { challenge-id: challenge-id, participant: tx-sender }
        (merge participant { has-claimed-rewards: true })
      )
      
      ;; Update user stats
      (update-total-rewards tx-sender user-share)
      
      (ok user-share)
    )
  )
)

;; Private helper functions
(define-private (update-user-challenges (user principal))
  (let
    ((stats (get-user-stats user)))
    (map-set user-stats
      { user: user }
      (merge stats { total-challenges: (+ (get total-challenges stats) u1) })
    )
  )
)

(define-private (increment-completed-challenges (user principal))
  (let
    ((stats (get-user-stats user)))
    (map-set user-stats
      { user: user }
      (merge stats { completed-challenges: (+ (get completed-challenges stats) u1) })
    )
  )
)

(define-private (update-total-saved (user principal) (amount uint))
  (let
    ((stats (get-user-stats user)))
    (map-set user-stats
      { user: user }
      (merge stats { total-saved: (+ (get total-saved stats) amount) })
    )
  )
)

(define-private (update-total-rewards (user principal) (amount uint))
  (let
    ((stats (get-user-stats user)))
    (map-set user-stats
      { user: user }
      (merge stats { total-rewards: (+ (get total-rewards stats) amount) })
    )
  )
)

(define-private (update-longest-streak (user principal) (streak uint))
  (let
    ((stats (get-user-stats user)))
    (if (> streak (get longest-streak stats))
      (map-set user-stats
        { user: user }
        (merge stats { longest-streak: streak })
      )
      true
    )
  )
)
