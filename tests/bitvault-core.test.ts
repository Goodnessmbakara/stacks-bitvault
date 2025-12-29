import Clarinet from 'clarinet';
import { expect } from 'vitest';

Clarinet.test({
  name: "Can create a savings challenge",
  async fn(chain, accounts) {
    const deployer = accounts.get('deployer')!;
    
    const block = chain.mineBlock([
      Clarinet.tx.contractCall(
        'bitvault-core',
        'create-challenge',
        [
          Clarinet.types.ascii("Emergency Fund"),
          Clarinet.types.uint(50000000), // 50 STX
          Clarinet.types.uint(144), // daily deposits
          Clarinet.types.uint(4320), // ~30 days
          Clarinet.types.uint(10) // max 10 participants
        ],
        deployer.address
      ),
    ]);
    
    const receipt = block.receipts[0];
    receipt.result.expectOk().expectUint(0); // First challenge ID should be 0
  },
});

Clarinet.test({
  name: "Can join an existing challenge",
  async fn(chain, accounts) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    // First create a challenge
    let block = chain.mineBlock([
      Clarinet.tx.contractCall(
        'bitvault-core',
        'create-challenge',
        [
          Clarinet.types.ascii("Group Savings"),
          Clarinet.types.uint(100000000),
          Clarinet.types.uint(144),
          Clarinet.types.uint(4320),
          Clarinet.types.uint(5)
        ],
        deployer.address
      ),
    ]);
    
    // Then join it with another wallet
    block = chain.mineBlock([
      Clarinet.tx.contractCall(
        'bitvault-core',
        'join-challenge',
        [Clarinet.types.uint(0)],
        wallet1.address
      ),
    ]);
    
    const receipt = block.receipts[0];
    receipt.result.expectOk();
  },
});

Clarinet.test({
  name: "Can make deposits and track streaks",
  async fn(chain, accounts) {
    const deployer = accounts.get('deployer')!;
    
    // Create challenge
    let block = chain.mineBlock([
      Clarinet.tx.contractCall(
        'bitvault-core',
        'create-challenge',
        [
          Clarinet.types.ascii("Daily Saver"),
          Clarinet.types.uint(10000000),
          Clarinet.types.uint(144),
          Clarinet.types.uint(4320),
          Clarinet.types.uint(1)
        ],
        deployer.address
      ),
    ]);
    
    // Make a deposit
    block = chain.mineBlock([
      Clarinet.tx.contractCall(
        'bitvault-core',
        'make-deposit',
        [
          Clarinet.types.uint(0),
          Clarinet.types.uint(1000000) // 1 STX
        ],
        deployer.address
      ),
    ]);
    
    const receipt = block.receipts[0];
    receipt.result.expectOk().expectUint(1); // First streak
  },
});

Clarinet.test({
  name: "Read challenge details",
  async fn(chain, accounts) {
    const deployer = accounts.get('deployer')!;
    
    // Create challenge
    chain.mineBlock([
      Clarinet.tx.contractCall(
        'bitvault-core',
        'create-challenge',
        [
          Clarinet.types.ascii("Test Challenge"),
          Clarinet.types.uint(25000000),
          Clarinet.types.uint(144),
          Clarinet.types.uint(2160),
          Clarinet.types.uint(3)
        ],
        deployer.address
      ),
    ]);
    
    // Read challenge details
    const challengeDetails = chain.callReadOnlyFn(
      'bitvault-core',
      'get-challenge',
      [Clarinet.types.uint(0)],
      deployer.address
    );
    
    expect(challengeDetails.result).toContain('creator');
    expect(challengeDetails.result).toContain('title');
  },
});
