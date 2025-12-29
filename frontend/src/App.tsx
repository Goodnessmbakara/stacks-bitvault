import React from 'react';
import { WalletProvider } from './contexts/WalletContext';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreateChallenge from './pages/CreateChallenge';
import MyVault from './pages/MyVault';
import Discover from './pages/Discover';
import './index.css';

function App() {
  return (
    <WalletProvider>
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
      </div>
    </WalletProvider>
  );
}

export default App;
