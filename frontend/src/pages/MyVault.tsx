
import { useWallet } from '../contexts/WalletContext';
import { Vault, TrendingUp, Award, Target } from 'lucide-react';

const MyVault = () => {
  const { isConnected, connect, address } = useWallet();

  // Mock data - in production, fetch from contract
  const userStats = {
    totalChallenges: 3,
    completedChallenges: 1,
    totalSaved: 25000000, // microSTX
    currentStreak: 14,
    longestStreak: 21,
  };

  const activeChallenges = [
    {
      id: 0,
      title: 'Emergency Fund',
      targetAmount: 50000000,
      deposited: 25000000,
      deadline: 'Dec 31, 2024',
      streak: 14,
      participants: 1,
    },
  ];

  if (!isConnected) {
    return (
      <div className="vault-page container">
        <div className="connect-prompt glass-card">
          <Vault size={64} />
          <h2>Connect to View Your Vault</h2>
          <p>Connect your wallet to see your savings challenges and progress</p>
          <button onClick={connect} className="btn btn-primary">
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vault-page container">
      <div className="vault-header">
        <h1>My Vault</h1>
        <p className="address">Connected: {address}</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card glass-card">
          <div className="stat-icon">
            <Target />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Challenges</div>
            <div className="stat-value">{userStats.totalChallenges}</div>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon success">
            <Award />
          </div>
          <div className="stat-content">
            <div className="stat-label">Completed</div>
            <div className="stat-value">{userStats.completedChallenges}</div>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon primary">
            <Vault />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Saved</div>
            <div className="stat-value">{(userStats.totalSaved / 1000000).toFixed(2)} STX</div>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon warning">
            <TrendingUp />
          </div>
          <div className="stat-content">
            <div className="stat-label">Current Streak</div>
            <div className="stat-value">{userStats.currentStreak} days</div>
          </div>
        </div>
      </div>

      {/* Active Challenges */}
      <section className="challenges-section">
        <h2>Active Challenges</h2>
        <div className="challenges-list">
          {activeChallenges.map((challenge) => {
            const progress = (challenge.deposited / challenge.targetAmount) * 100;
            
            return (
              <div key={challenge.id} className="challenge-card glass-card">
                <div className="challenge-header">
                  <h3>{challenge.title}</h3>
                  <span className="badge badge-success">Active</span>
                </div>

                <div className="challenge-progress">
                  <div className="progress-info">
                    <span>{(challenge.deposited / 1000000).toFixed(2)} STX</span>
                    <span className="text-muted">of {(challenge.targetAmount / 1000000).toFixed(2)} STX</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="progress-percentage">{progress.toFixed(0)}%</div>
                </div>

                <div className="challenge-details">
                  <div className="detail-item">
                    <TrendingUp size={16} />
                    <span>{challenge.streak} day streak</span>
                  </div>
                  <div className="detail-item">
                    <Target size={16} />
                    <span>Ends {challenge.deadline}</span>
                  </div>
                </div>

                <button className="btn btn-primary btn-block">
                  Make Deposit
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        .vault-page {
          padding: 4rem 0;
        }

        .vault-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .vault-header .address {
          color: var(--text-secondary);
          font-family: monospace;
          margin-top: 0.5rem;
        }

        .connect-prompt {
          text-align: center;
          padding: 6rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .connect-prompt svg {
          color: var(--accent-primary);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
        }

        .stat-icon.primary {
          background: var(--gradient-primary);
          color: white;
        }

        .stat-icon.success {
          background: var(--gradient-success);
          color: white;
        }

        .stat-icon.warning {
          background: var(--gradient-accent);
          color: white;
        }

        .stat-content {
          flex: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .challenges-section h2 {
          margin-bottom: 1.5rem;
        }

        .challenges-list {
          display: grid;
          gap: 1.5rem;
        }

        .challenge-card {
          padding: 2rem;
        }

        .challenge-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .challenge-header h3 {
          margin: 0;
        }

        .challenge-progress {
          margin-bottom: 1.5rem;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .progress-percentage {
          text-align: right;
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .challenge-details {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .btn-block {
          width: 100%;
        }

        .text-muted {
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .challenge-details {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MyVault;
