// src/context/TokenContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

interface TokenContextType {
    token: string | null;
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(null);

  const fetchToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: "app@gmail.com",
          password:"password",
        })
      });
      const data = await response.json();
      setToken(data.token);
    } catch (err) {
      console.error('Failed to fetch token', err);
    }
  };

  useEffect(() => {
    fetchToken();

    // Optional: Refresh every 10 minutes (assuming token lives for 10 minutes)
    const interval = setInterval(() => {
      fetchToken();
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, []);

  console.log(`Token: ${token}`);

  return (
    <TokenContext.Provider value={{ token}}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
