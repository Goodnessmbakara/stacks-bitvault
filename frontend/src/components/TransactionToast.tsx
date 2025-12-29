import React from 'react';
import { useTransactions } from '../contexts/TransactionContext';
import { CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';

const TransactionToast = () => {
  const { transactions } = useTransactions();

  if (transactions.length === 0) return null;

  return (
    <div className="transaction-toast-container">
      {transactions.map((tx) => (
        <div key={tx.id} className={`transaction-toast toast-${tx.status}`}>
          <div className="toast-icon">
            {tx.status === 'pending' && <Loader2 className="spinner" size={20} />}
            {tx.status === 'success' && <CheckCircle size={20} />}
            {tx.status === 'error' && <AlertCircle size={20} />}
          </div>
          <div className="toast-content">
            <div className="toast-title">{tx.type}</div>
            <div className="toast-message">{tx.message}</div>
            {tx.txId && (
              <a
                href={`https://explorer.hiro.so/txid/${tx.txId}?chain=testnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="toast-link"
              >
                View on Explorer →
              </a>
            )}
          </div>
        </div>
      ))}

      <style>{`
        .transaction-toast-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 400px;
        }

        .transaction-toast {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .toast-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .toast-pending .toast-icon {
          color: var(--accent-primary);
        }

        .toast-success .toast-icon {
          color: var(--accent-success);
        }

        .toast-error .toast-icon {
          color: var(--accent-warning);
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .toast-content {
          flex: 1;
        }

        .toast-title {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .toast-message {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .toast-link {
          display: inline-block;
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: var(--accent-primary);
          text-decoration: none;
        }

        .toast-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .transaction-toast-container {
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

export default TransactionToast;
