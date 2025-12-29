
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { Vault, Plus, Compass, Wallet } from 'lucide-react';

const Navbar = () => {
  const { isConnected, address, connect, disconnect } = useWallet();

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            <Vault size={32} />
            <span>BitVault</span>
          </Link>

          <div className="nav-links">
            <Link to="/discover" className="nav-link">
              <Compass size={20} />
              <span>Discover</span>
            </Link>
            <Link to="/create" className="nav-link">
              <Plus size={20} />
              <span>Create</span>
            </Link>
            {isConnected && (
              <Link to="/vault" className="nav-link">
                <Vault size={20} />
                <span>My Vault</span>
              </Link>
            )}
          </div>

          <div className="nav-actions">
            {isConnected ? (
              <div className="wallet-info">
                <div className="address-badge">
                  <Wallet size={16} />
                  <span>{formatAddress(address)}</span>
                </div>
                <button onClick={disconnect} className="btn btn-secondary btn-sm">
                  Disconnect
                </button>
              </div>
            ) : (
              <button onClick={connect} className="btn btn-primary">
                <Wallet size={20} />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--glass-border);
          padding: 1rem 0;
        }

        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          text-decoration: none;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-md);
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .wallet-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .address-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .nav-links {
           display: none;
          }
          
          .wallet-info {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
