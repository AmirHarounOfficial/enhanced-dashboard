"use client";
import React, { useState, useLayoutEffect } from "react";
import MainLayout from "./Components/MainLayout/MainLayout";
import { useTranslation } from "react-i18next";
import i18n from "../language/i18n";
import { usePathname, useRouter } from "next/navigation";
import HomePage from "./Pages/Home/page";

function Homepage({ children }) {
  const [open, setOpen] = useState(true);
  const [checkedAuth, setCheckedAuth] = useState(false); 
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  // 🚀 Runs before UI paint (fixes the flash)
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !pathname.startsWith("/Auth")) {
      router.replace("/Auth/Login");
      return;
    }

    if (token && pathname.startsWith("/Auth")) {
      router.replace("/Pages/Home");
      return;
    }

    // if everything's okay, allow render
    setCheckedAuth(true);
  }, [pathname, router]);

  // 🧩 Handle language change
  const handleLangChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    document.documentElement.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");
  };

  // لو لسه بنفحص التوكن مفيش UI يظهر
  if (!checkedAuth && !pathname.startsWith("/Auth")) {
    return null;
  }

  // لو صفحة Auth متعرضش الـ Layout
  if (pathname.startsWith("/Auth")) {
    return <>{children}</>;
  }

  return (
    <>
      <HomePage/>
    </>
  );
}

export default Homepage;