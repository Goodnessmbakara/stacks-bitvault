import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TransactionStatus = 'idle' | 'pending' | 'success' | 'error';

interface Transaction {
  id: string;
  status: TransactionStatus;
  type: string;
  message: string;
  txId?: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (type: string, message: string) => string;
  updateTransaction: (id: string, status: TransactionStatus, txId?: string) => void;
  clearTransactions: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (type: string, message: string): string => {
    const id = `tx-${Date.now()}-${Math.random()}`;
    const newTx: Transaction = {
      id,
      status: 'pending',
      type,
      message,
    };
    setTransactions((prev) => [...prev, newTx]);
    return id;
  };

  const updateTransaction = (id: string, status: TransactionStatus, txId?: string) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, status, txId } : tx
      )
    );

    // Auto-remove successful transactions after 5 seconds
    if (status === 'success') {
      setTimeout(() => {
        setTransactions((prev) => prev.filter((tx) => tx.id !== id));
      }, 5000);
    }
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, updateTransaction, clearTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within TransactionProvider');
  }
  return context;
};
