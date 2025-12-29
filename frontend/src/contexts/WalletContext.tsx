import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

interface UserData {
  profile: {
    stxAddress: {
      mainnet: string;
      testnet: string;
    };
  };
}

interface WalletContextType {
  userSession: UserSession;
  userData: UserData | null;
  isConnected: boolean;
  address: string;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData as UserData);
        setIsConnected(true);
      });
    } else if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData() as UserData;
      setUserData(userData);
      setIsConnected(true);
    }
  }, []);

  const connect = () => {
    showConnect({
      appDetails: {
        name: 'BitVault',
        icon: window.location.origin + '/vault-icon.png',
      },
      redirectTo: '/',
      onFinish: () => {
        const userData = userSession.loadUserData() as UserData;
        setUserData(userData);
        setIsConnected(true);
      },
      userSession,
    });
  };

  const disconnect = () => {
    userSession.signUserOut('/');
    setUserData(null);
    setIsConnected(false);
  };

  const network = import.meta.env.VITE_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
  const address = userData?.profile?.stxAddress?.[network] || '';

  return (
    <WalletContext.Provider
      value={{
        userSession,
        userData,
        isConnected,
        address,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
