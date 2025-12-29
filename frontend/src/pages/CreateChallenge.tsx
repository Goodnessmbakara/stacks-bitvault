import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { createChallenge } from '../lib/contractHelpers';
import { Plus, Users, Calendar, Target } from 'lucide-react';

const CreateChallenge = () => {
  const { isConnected, userSession, connect } = useWallet();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    depositFrequency: '144', // blocks per day
    duration: '30', // days
    maxParticipants: '10',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !userSession) return;

    setLoading(true);
    try {
      const durationBlocks = parseInt(formData.duration) * 144; // ~144 blocks per day
      const targetInMicroStx = parseInt(formData.targetAmount) * 1000000;

      const result = await createChallenge(
        userSession,
        formData.title,
        targetInMicroStx,
        parseInt(formData.depositFrequency),
        durationBlocks,
        parseInt(formData.maxParticipants)
      );

      console.log('Challenge created:', result);
      navigate('/vault');
    } catch (error) {
      console.error('Error creating challenge:', error);
      alert('Failed to create challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="create-page container">
        <div className="connect-prompt glass-card">
          <h2>Connect Your Wallet</h2>
          <p>Please connect your wallet to create a savings challenge.</p>
          <button onClick={connect} className="btn btn-primary">
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-page container">
      <div className="create-header">
        <h1>Create Savings Challenge</h1>
        <p>Set your goals and invite friends to build savings discipline together</p>
      </div>

      <form onSubmit={handleSubmit} className="create-form glass-card">
        <div className="form-group">
          <label htmlFor="title">
            <Target size={20} />
            Challenge Title
          </label>
          <input
            id="title"
            type="text"
            className="input"
            placeholder="e.g. Summer Vacation Fund"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            maxLength={100}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="target">
              <Target size={20} />
              Target Amount (STX)
            </label>
            <input
              id="target"
              type="number"
              className="input"
              placeholder="10"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              required
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">
              <Calendar size={20} />
              Duration (Days)
            </label>
            <select
              id="duration"
              className="input"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            >
              <option value="7">1 Week</option>
              <option value="14">2 Weeks</option>
              <option value="30">1 Month</option>
              <option value="60">2 Months</option>
              <option value="90">3 Months</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="frequency">Deposit Frequency</label>
            <select
              id="frequency"
              className="input"
              value={formData.depositFrequency}
              onChange={(e) => setFormData({ ...formData, depositFrequency: e.target.value })}
            >
              <option value="144">Daily (~144 blocks)</option>
              <option value="1008">Weekly (~1008 blocks)</option>
              <option value="4320">Monthly (~4320 blocks)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="participants">
              <Users size={20} />
              Max Participants
            </label>
            <input
              id="participants"
              type="number"
              className="input"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
              min="1"
              max="100"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Plus size={20} />
            {loading ? 'Creating...' : 'Create Challenge'}
          </button>
        </div>
      </form>

      <style>{`
        .create-page {
          padding: 4rem 0;
          max-width: 800px;
        }

        .create-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .create-header h1 {
          margin-bottom: 1rem;
        }

        .create-header p {
          color: var(--text-secondary);
          font-size: 1.125rem;
        }

        .create-form {
          padding: 2.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
        }

        .connect-prompt {
          text-align: center;
          padding: 4rem 2rem;
        }

        .connect-prompt h2 {
          margin-bottom: 1rem;
        }

        .connect-prompt p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .create-form {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateChallenge;
