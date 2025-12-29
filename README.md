# 🔐 BitVault - Social Savings Challenge Platform

**Build savings discipline through social accountability on Bitcoin.**

BitVault is a decentralized savings challenge platform built on Stacks that combines time-locked savings, social accountability, and gamified rewards to help users build lasting financial habits.

## 🌟 Features

### For Savers
- **Create Personal or Group Challenges** - Set savings goals and invite friends
- **Time-Locked Vaults** - Secure your savings with smart contract time-locks
- **Streak Tracking** - Build consistency with deposit streak monitoring
- **Bonus Rewards** - Earn extra STX for maintaining streaks and completing challenges
- **Social Accountability** - Join group challenges with friends or community

### Technical Highlights
- **Smart Contracts** - Clarity smart contracts on Stacks with 100% Bitcoin security
- **WalletConnect Integration** - Seamless wallet connection via @stacks/connect
- **Premium UI** - Modern glassmorphism design with smooth animations
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Clarinet for smart contract development
- Stacks wallet (Leather or Xverse)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/stacks-bitvault.git
cd stacks-bitvault
```

2. **Install dependencies**
```bash
# Install Clarinet dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. **Set up environment variables**
```bash
cd frontend
cp .env.example .env
# Edit .env with your configuration
```

4. **Run development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
stacks-bitvault/
├── contracts/              # Clarity smart contracts
│   └── bitvault-core.clar # Main savings challenge contract
├── tests/                  # Smart contract tests
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── contexts/      # React contexts (Wallet)
│   │   ├── lib/          # Contract helpers
│   │   └── pages/        # Page components
│   └── public/
├── Clarinet.toml          # Clarinet configuration
└── README.md
```

## 🔧 Smart Contract Architecture

### Core Functions

**Create Challenge**
```clarity
(create-challenge 
  (title "Emergency Fund")
  (target-amount u50000000) ;; 50 STX
  (deposit-frequency u144)   ;; Daily deposits
  (duration-blocks u4320)    ;; ~30 days
  (max-participants u10))
```

**Join Challenge**
```clarity
(join-challenge (challenge-id u0))
```

**Make Deposit**
```clarity
(make-deposit (challenge-id u0) (amount u1000000)) ;; 1 STX
```

**Complete Challenge**
```clarity
(complete-challenge (challenge-id u0))
```

### Reward Mechanics
- **Streak Bonus**: 1% per week of maintained streak
- **Completion Bonus**: Share of forfeited funds from unsuccessful participants
- **Penalty**: 20% fee on early withdrawals, distributed to successful participants

## 🎨 User Interface

### Pages
- **Home** - Hero section, features, statistics
- **Discover** - Browse and join community challenges
- **Create** - Create new savings challenges
- **My Vault** - View active challenges and progress

### Design System
- **Premium Dark Theme** - Modern, professional aesthetic
- **Glassmorphism** - Frosted glass effects throughout
- **Smooth Animations** - Subtle micro-interactions
- **Responsive** - Mobile-first design approach

## 🔗 WalletConnect Integration

BitVault uses the official Stacks Connect library for seamless wallet integration:

```typescript
import { showConnect } from '@stacks/connect';

showConnect({
  appDetails: {
    name: 'BitVault',
    icon: window.location.origin + '/vault-icon.png',
  },
  onFinish: () => {
    // Handle successful connection
  },
  userSession,
});
```

Supports:
- ✅ Leather Wallet
- ✅ Xverse Wallet
- ✅ Any WalletConnect-enabled wallet

## 🧪 Testing

### Smart Contract Tests
```bash
clarinet test
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Build for Production
```bash
cd frontend
npm run build
```

## 📊 Challenge Metrics

BitVault is designed to generate high on-chain activity:
- ✅ Challenge creation transactions
- ✅ Daily/weekly deposit transactions
- ✅ Streak confirmation transactions
- ✅ Completion and withdrawal transactions
- ✅ Reward claim transactions

**Target**: 100+ transactions during challenge period

## 🏆 Built for Stacks Challenge #3

This project was built for the [Stacks + WalletConnect Challenge #3](https://talent.app/challenges/stacks-3) running from December 22-30, 2024.

### Why BitVault Wins
1. **Real Utility** - Solves actual problem of building savings discipline
2. **High Transaction Volume** - Each challenge creates multiple on-chain transactions
3. **Viral Mechanics** - Social challenges drive network effects
4. **Latest Tech** - Leverages sBTC and modern WalletConnect integration
5. **Premium UX** - Professional design that users love

## 🛠️ Technology Stack

- **Blockchain**: Stacks (Bitcoin Layer 2)
- **Smart Contracts**: Clarity
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Lucide React
- **Wallet**: @stacks/connect
- **Transactions**: @stacks/transactions

## 📝 Environment Variables

```env
VITE_NETWORK=testnet|mainnet
VITE_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project as a template for your own Stacks applications.

## 🔗 Links

- [Stacks Documentation](https://docs.stacks.co)
- [Clarity Language](https://docs.stacks.co/clarity)
- [WalletConnect for Stacks](https://docs.stacks.co/build-apps/connect-to-wallets)

## 👥 Team

Built with ❤️ for the Stacks community

---

**Start building better financial habits today with BitVault!** 🚀
