"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    country_code:'',
    role: '',
    password: '',
    password_confirmation: '',
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('registrationData');
    if (savedData) {
      setRegistrationData(JSON.parse(savedData));
    }
  }, []);

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem('registrationData', JSON.stringify(registrationData));
  }, [registrationData]);

  const updateRegistrationData = (newData) => {
    setRegistrationData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <RegistrationContext.Provider value={{ registrationData, updateRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
