
import { WalletProvider } from './contexts/WalletContext';
import { TransactionProvider } from './contexts/TransactionContext';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TransactionToast from './components/TransactionToast';
import HomePage from './pages/HomePage';
import CreateChallenge from './pages/CreateChallenge';
import MyVault from './pages/MyVault';
import Discover from './pages/Discover';
import './index.css';

function App() {
  return (
    <WalletProvider>
      <TransactionProvider>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreateChallenge />} />
              <Route path="/vault" element={<MyVault />} />
              <Route path="/discover" element={<Discover />} />
            </Routes>
          </main>
          <TransactionToast />
        </div>
      </TransactionProvider>
    </WalletProvider>
  );
}

export default App;
