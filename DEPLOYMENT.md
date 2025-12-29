# Deployment Guide

## Prerequisites
- Stacks wallet with testnet STX
- Clarinet CLI installed
- Node.js and npm

## Deploy to Testnet

### Option 1: Using Clarinet (Recommended)

1. **Start Clarinet Console**
```bash
clarinet console
```

2. **In the console, deploy the contract:**
```clarity
::deploy_contract bitvault-core ./contracts/bitvault-core.clar
```

3. **Test a transaction:**
```clarity
(contract-call? .bitvault-core create-challenge 
  "Test Challenge" 
  u50000000 
  u144 
  u4320 
  u10)
```

### Option 2: Using Hiro Platform

1. Go to [Hiro Platform](https://platform.hiro.so/)
2. Connect your wallet
3. Upload `bitvault-core.clar`
4. Deploy to testnet
5. Copy the contract address and update `.env`:
   ```
   VITE_CONTRACT_ADDRESS=<your-deployed-address>
   ```

## Test the Frontend

1. **Start the dev server:**
```bash
cd frontend
npm run dev
```

2. **Open:** http://localhost:5173

3. **Connect your wallet** (Leather or Xverse)

4. **Create a challenge:**
   - Click "Create Challenge"
   - Fill in the form
   - Submit transaction

## Generate Transactions

### Automated Transaction Script

Run this in Clarinet console to create multiple challenges:

```clarity
;; Create 5 different challenges
(contract-call? .bitvault-core create-challenge "Emergency Fund" u50000000 u144 u4320 u10)
(contract-call? .bitvault-core create-challenge "Vacation Savings" u100000000 u144 u8640 u20)
(contract-call? .bitvault-core create-challenge "New Car Fund" u200000000 u1008 u17280 u5)
(contract-call? .bitvault-core create-challenge "House Down Payment" u500000000 u1008 u34560 u3)
(contract-call? .bitvault-core create-challenge "Bitcoin Accumulation" u75000000 u144 u4320 u15)
```

### Join and Participate

```clarity
;; Join a challenge (from different wallet)
(contract-call? .bitvault-core join-challenge u0)

;; Make deposits  
(contract-call? .bitvault-core make-deposit u0 u5000000)
(contract-call? .bitvault-core make-deposit u0 u3000000)

;; Check stats
(contract-call? .bitvault-core get-user-stats tx-sender)
(contract-call? .bitvault-core get-challenge u0)
```

## Verification

1. **Check contract on Explorer:**
   - Visit [Stacks Testnet Explorer](https://explorer.hiro.so/?chain=testnet)
   - Search for your contract address
   - Verify transactions

2. **Monitor activity:**
   ```bash
   # View recent transactions
   clarinet console
   ::get_assets_maps
   ```

## Production Deployment (Mainnet)

1. **Update configuration:**
   ```bash
   cd frontend
   # Edit .env
   VITE_NETWORK=mainnet
   VITE_CONTRACT_ADDRESS=<mainnet-address>
   ```

2. **Build frontend:**
   ```bash
   npm run build
   ```

3. **Deploy contract using Hiro Platform to mainnet**

4. **Deploy frontend** to Vercel/Netlify

## Tips for Generating Activity

- Create multiple challenges with different parameters
- Invite friends to join group challenges
- Make daily deposits to build streaks
- Test forfeit and complete flows
- Claim rewards from successful challenges

This will generate significant on-chain activity for the Stacks Challenge!
