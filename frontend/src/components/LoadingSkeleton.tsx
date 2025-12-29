

const LoadingSkeleton = () => {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
      </div>
      
      <div className="skeleton-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-line skeleton-card-title"></div>
            <div className="skeleton-line skeleton-card-text"></div>
            <div className="skeleton-line skeleton-card-text short"></div>
          </div>
        ))}
      </div>

      <style>{`
        .loading-skeleton {
          padding: 4rem 0;
        }

        .skeleton-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .skeleton-line {
          background: linear-gradient(
            90deg,
            var(--bg-tertiary) 25%,
            var(--bg-secondary) 50%,
            var(--bg-tertiary) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: var(--radius-md);
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .skeleton-title {
          width: 60%;
          height: 3rem;
          margin: 0 auto 1rem;
        }

        .skeleton-subtitle {
          width: 40%;
          height: 1.5rem;
          margin: 0 auto;
        }

        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .skeleton-card {
          padding: 2rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
        }

        .skeleton-card-title {
          width: 70%;
          height: 1.5rem;
          margin-bottom: 1rem;
        }

        .skeleton-card-text {
          width: 100%;
          height: 1rem;
          margin-bottom: 0.75rem;
        }

        .skeleton-card-text.short {
          width: 60%;
        }

        @media (max-width: 768px) {
          .skeleton-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSkeleton;
