import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface CreditContextType {
  credits: number;
  updateCredits: (newCredits: number) => void;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth(); // ✅ Now this works because CreditProvider is inside AuthProvider
  const [credits, setCredits] = useState(user?.credits || 0);

  // Update credits when the user changes
  useEffect(() => {
    if (user) {
      setCredits(user.credits);
    }
  }, [user]);

  const updateCredits = (newCredits: number) => {
    setCredits(newCredits);
    if (user) {
      user.credits = newCredits;
    }
  };

  return (
    <CreditContext.Provider value={{ credits, updateCredits }}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
};