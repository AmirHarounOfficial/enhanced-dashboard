"use client"
import React from 'react';
import { RegistrationProvider } from './RegistrationContext';

export default function Sign_inLayout({ children }) {
  return (
    <RegistrationProvider>
      {children}
    </RegistrationProvider>
  );
}
