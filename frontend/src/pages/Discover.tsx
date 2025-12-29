import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Target, TrendingUp } from 'lucide-react';

const Discover = () => {
  // Mock data - in production, fetch from contract
  const challenges = [
    {
      id: 0,
      title: 'New Year Savings Challenge',
      creator: 'ST1P...QFGH',
      targetAmount: 100000000,
      currentParticipants: 15,
      maxParticipants: 50,
      deadline: 'Jan 31, 2025',
      totalDeposited: 45000000,
    },
    {
      id: 1,
      title: 'Bitcoin Believers Fund',
      creator: 'ST2A...WXYZ',
      targetAmount: 50000000,
      currentParticipants: 8,
      maxParticipants: 20,
      deadline: 'Feb 14, 2025',
      totalDeposited: 12000000,
    },
    {
      id: 2,
      title: 'DeFi Summer Savings',
      creator: 'ST3B...LMNO',
      targetAmount: 75000000,
      currentParticipants: 22,
      maxParticipants: 30,
      deadline: 'Mar 1, 2025',
      totalDeposited: 38000000,
    },
  ];

  return (
    <div className="discover-page container">
      <div className="discover-header">
        <h1>Discover Challenges</h1>
        <p>Join community savings challenges and build discipline together</p>
      </div>

      <div className="challenges-grid">
        {challenges.map((challenge) => {
          const participantProgress = (challenge.currentParticipants / challenge.maxParticipants) * 100;
          const savingsProgress = (challenge.totalDeposited / challenge.targetAmount) * 100;

          return (
            <div key={challenge.id} className="challenge-card glass-card">
              <div className="card-header">
                <h3>{challenge.title}</h3>
                <div className="creator">by {challenge.creator}</div>
              </div>

              <div className="card-stats">
                <div className="stat-row">
                  <div className="stat-item">
                    <Target size={16} />
                    <span>{(challenge.targetAmount / 1000000).toFixed(0)} STX Goal</span>
                  </div>
                  <div className="stat-item">
                    <TrendingUp size={16} />
                    <span>{(challenge.totalDeposited / 1000000).toFixed(2)} STX Saved</span>
                  </div>
                </div>

                <div className="stat-row">
                  <div className="stat-item">
                    <Users size={16} />
                    <span>{challenge.currentParticipants}/{challenge.maxParticipants} Participants</span>
                  </div>
                  <div className="stat-item">
                    <Calendar size={16} />
                    <span>Ends {challenge.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="card-progress">
                <div className="progress-label">
                  <span>Participants</span>
                  <span>{participantProgress.toFixed(0)}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${participantProgress}%` }} />
                </div>
              </div>

              <div className="card-progress">
                <div className="progress-label">
                  <span>Savings Progress</span>
                  <span>{savingsProgress.toFixed(0)}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${savingsProgress}%` }} />
                </div>
              </div>

              <button className="btn btn-primary btn-block">
                Join Challenge
              </button>
            </div>
          );
        })}
      </div>

      <div className="cta-section">
        <div className="cta-card glass-card">
          <h2>Don't see a challenge you like?</h2>
          <p>Create your own savings challenge and invite friends to join!</p>
          <Link to="/create" className="btn btn-success">
            Create Challenge
          </Link>
        </div>
      </div>

      <style>{`
        .discover-page {
          padding: 4rem 0;
        }

        .discover-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .discover-header h1 {
          margin-bottom: 1rem;
        }

        .discover-header p {
          color: var(--text-secondary);
          font-size: 1.125rem;
        }

        .challenges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .challenge-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }

        .card-header {
          margin-bottom: 1.5rem;
        }

        .card-header h3 {
          margin-bottom: 0.5rem;
        }

        .creator {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-family: monospace;
        }

        .card-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }

        .stat-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .card-progress {
          margin-bottom: 1rem;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .progress-label span:first-child {
          color: var(--text-muted);
        }

        .btn-block {
          width: 100%;
          margin-top: auto;
        }

        .cta-section {
          margin-top: 4rem;
        }

        .cta-card {
          text-align: center;
          padding: 3rem 2rem;
        }

        .cta-card h2 {
          margin-bottom: 1rem;
        }

        .cta-card p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .challenges-grid {
            grid-template-columns: 1fr;
          }

          .stat-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Discover;
