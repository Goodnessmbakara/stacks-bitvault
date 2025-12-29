import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { TrendingUp, Users, Shield, Zap } from 'lucide-react';

const HomePage = () => {
  const { isConnected, connect } = useWallet();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section container fade-in">
        <div className="hero-content">
          <h1 className="hero-title">
            Build Savings Discipline with
            <br />
            <span className="gradient-text">Social Accountability</span>
          </h1>
          <p className="hero-description">
            Join savings challenges with friends, track your progress, earn rewards,
            and build lasting financial habits on Bitcoin's most secure layer 2.
          </p>
          <div className="hero-actions">
            {isConnected ? (
              <>
                <Link to="/create" className="btn btn-primary btn-lg">
                  Create Challenge
                </Link>
                <Link to="/discover" className="btn btn-secondary btn-lg">
                  Explore Challenges
                </Link>
              </>
            ) : (
              <>
                <button onClick={connect} className="btn btn-primary btn-lg">
                  Connect Wallet to Start
                </button>
                <Link to="/discover" className="btn btn-secondary btn-lg">
                  Learn More
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card glass-card">
            <div className="stat-value">1,247</div>
            <div className="stat-label">Active Challenges</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-value">12.5K STX</div>
            <div className="stat-label">Total Saved</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-value">892</div>
            <div className="stat-label">Savers</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <h2 className="section-title">How BitVault Works</h2>
        <div className="features-grid">
          <div className="feature-card glass-card">
            <div className="feature-icon">
              <TrendingUp size={32} />
            </div>
            <h3>Create Challenges</h3>
            <p>
              Set your savings goals, choose deposit frequency, and invite friends
              to join your challenge.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon">
              <Users size={32} />
            </div>
            <h3>Social Accountability</h3>
            <p>
              Join group challenges with friends or the community. Stay motivated
              through shared progress tracking.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon">
              <Zap size={32} />
            </div>
            <h3>Build Streaks</h3>
            <p>
              Make consistent deposits to build streaks. Longer streaks earn higher
              bonus rewards.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon">
              <Shield size={32} />
            </div>
            <h3>Secure & Transparent</h3>
            <p>
              Your savings are secured by Bitcoin through Stacks. All smart contracts
              are open source and auditable.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section container">
        <div className="cta-card glass-card">
          <h2>Ready to start your savings journey?</h2>
          <p>Create your first challenge today and earn rewards for building discipline.</p>
          {isConnected ? (
            <Link to="/create" className="btn btn-success btn-lg">
              Create Your First Challenge
            </Link>
          ) : (
            <button onClick={connect} className="btn btn-success btn-lg">
              Connect Wallet to Begin
            </button>
          )}
        </div>
      </section>

      <style>{`
        .home-page {
          min-height: 100vh;
          padding: 4rem 0;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 6rem;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .gradient-text {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .stat-card {
          padding: 2rem;
          text-align: center;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .features-section {
          margin-bottom: 6rem;
        }

        .section-title {
          text-align: center;
          margin-bottom: 3rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          padding: 2rem;
        }

        .feature-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-primary);
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
          color: white;
        }

        .feature-card h3 {
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: var(--text-secondary);
        }

        .cta-section {
          margin-bottom: 4rem;
        }

        .cta-card {
          text-align: center;
          padding: 4rem 2rem;
        }

        .cta-card h2 {
          margin-bottom: 1rem;
        }

        .cta-card p {
          color: var(--text-secondary);
          font-size: 1.125rem;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
