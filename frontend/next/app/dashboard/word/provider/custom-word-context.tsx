"use client"
import React, { createContext, useContext, ReactNode } from 'react';
import { useCustomWord } from '../hooks/useCustomWord';
import { CustomWordContextType } from './wordContextInterface';

const CustomWordContext = createContext<CustomWordContextType | undefined>(undefined);

export const CustomWordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const customWord = useCustomWord();

  return (
    <CustomWordContext.Provider value={customWord}>
      {children}
    </CustomWordContext.Provider>
  );
};

export const useCustomWordContext = () => {
  const context = useContext(CustomWordContext);
  if (context === undefined) {
    throw new Error('useCustomWordContext must be used within a CustomWordProvider');
  }
  return context;
};
