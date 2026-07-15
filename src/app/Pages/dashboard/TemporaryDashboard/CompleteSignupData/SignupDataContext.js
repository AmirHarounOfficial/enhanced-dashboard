"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const SignupDataContext = createContext();

export const SignupDataProvider = ({ children }) => {
  const [signupData, setSignupData] = useState({
    email: "",
    companyName: "",
    workers_count: "",
    yearsofexperience: "",
    address: "",
    country: "",
    state: "",
    city: "",
    latitude: "",
    longitude: "",

    // files (❌ لا تتخزن في sessionStorage)
    id_front: null,
    id_back: null,
    commercial_register: null,
    tax_card: null,

    tax_number: "",
    national_id: "",
  });

  // ✅ load TEXT data only
  useEffect(() => {
    const savedData = sessionStorage.getItem("signupData");
    if (savedData) {
      setSignupData((prev) => ({
        ...prev,
        ...JSON.parse(savedData),
      }));
    }
  }, []);

  // ✅ save TEXT data only (exclude files)
  useEffect(() => {
    const {
      id_front,
      id_back,
      commercial_register,
      tax_card,
      ...textData
    } = signupData;

    sessionStorage.setItem("signupData", JSON.stringify(textData));
  }, [signupData]);

  const updateSignupData = (newData) => {
    setSignupData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <SignupDataContext.Provider value={{ signupData, updateSignupData }}>
      {children}
    </SignupDataContext.Provider>
  );
};

export const useSignupData = () => {
  const context = useContext(SignupDataContext);
  if (!context) {
    throw new Error(
      "useSignupData must be used within a SignupDataProvider"
    );
  }
  return context;
};
