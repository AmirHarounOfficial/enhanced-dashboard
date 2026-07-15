"use client"
import React from 'react';
import { SignupDataProvider } from './SignupDataContext';

export default function CompleteSignupDataLayout({ children }) {
  return (
    <SignupDataProvider>
      {children}
    </SignupDataProvider>
  );
}
