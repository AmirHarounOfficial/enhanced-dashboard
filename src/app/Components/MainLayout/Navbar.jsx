"use client";
import React, { useState, useRef, useEffect } from "react";
import i18n from "../../../language/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentLoginThunk } from "@/redux/slice/Auth/AuthSlice";
import ServiceToggle from "../DaialogsOfNavbar/ServiceToggle";

function Navbar({ onMenuClick }) {
  const [open, setOpen] = useState(false);
  const [hasNotif, setHasNotif] = useState(true);
  const { t } = useTranslation();
  const dropdownRef = useRef(null);

  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentLoginThunk());
  }, [dispatch]);

  const [openServiceToggle, setOpenServiceToggle] = useState(false);

  return (
    <>
      <header className="navbar-glass h-20 flex items-center justify-between px-6 py-4 sticky top-0 z-40">
        {/* Left — greeting (desktop) / hamburger (mobile) */}
        <div className="lg1:block hidden">
          <p className="text-[#364152] text-base font-semibold leading-tight">
            {t("Welcome back")}{user?.firstname ? `, ${user.firstname}` : "!"} 👋
          </p>
          <p className="text-[#697586] text-sm font-normal mt-0.5">
            {t("Lets check your update today")}
          </p>
        </div>

        <div className="lg1:hidden block">
          <button
            onClick={onMenuClick}
            className="icon-btn p-2 rounded-[6px] border border-[#E3E8EF] cursor-pointer"
            aria-label="Toggle menu"
          >
            <img src="/images/icons/menu.svg" alt="" />
          </button>
        </div>

        {/* Right — actions */}
        <div className="flex gap-3 items-center">

          {/* Switch activity */}
          <button
            onClick={() => setOpenServiceToggle(true)}
            className="btn-primary px-4 gap-2 h-10 bg-[var(--color-primary)] flex justify-center items-center rounded-[6px] cursor-pointer"
          >
            <img src="/images/icons/toggleArrow_white.svg" alt="" className="w-4 h-4" />
            <span className="text-white text-sm font-medium hidden sm:inline">{t('Switch activity')}</span>
          </button>

          {/* Language Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              className="icon-btn w-10 h-10 border border-[#E3E8EF] rounded-[6px] flex items-center justify-center cursor-pointer"
              onClick={() => setOpen(!open)}
              aria-label="Change language"
              aria-expanded={open}
            >
              <img src="/images/icons/Language.svg" alt="" className="w-5 h-5" />
            </button>

            {open && (
              <div className="dropdown-enter absolute end-0 mt-2 bg-white border border-[#E3E8EF] rounded-[8px] p-1.5 flex gap-1.5"
                  style={{ boxShadow: 'var(--shadow-lg)', zIndex: 50, minWidth: 110 }}>
                <button
                  onClick={() => handleLangChange("en")}
                  className="lang-btn flex-1 text-xs"
                >
                  <span className="font-bold text-[10px] tracking-wider">EN</span>
                  <span className="text-[#697586]">English</span>
                </button>
                <button
                  onClick={() => handleLangChange("ar")}
                  className="lang-btn flex-1 text-xs"
                >
                  <span className="font-bold text-[10px] tracking-wider">ع</span>
                  <span className="text-[#697586]">عربي</span>
                </button>
              </div>
            )}
          </div>

          {/* Notification */}
          <button
            className="icon-btn relative w-10 h-10 border border-[#E3E8EF] rounded-[6px] flex items-center justify-center cursor-pointer"
            aria-label="Notifications"
            onClick={() => setHasNotif(false)}
          >
            <img src="/images/icons/notification.svg" alt="" className="w-5 h-5" />
            {hasNotif && <span className="notif-dot" />}
          </button>

          {/* Divider */}
          <div className="w-px h-9 bg-[#E3E8EF]" />

          {/* User */}
          <div className="flex gap-2.5 items-center">
            <div className="relative flex-shrink-0">
              <img
                src={`https://api.zetime.co/storage/${user?.image}`}
                alt={user?.firstname ?? "User"}
                width={40}
                height={40}
                className="rounded-full object-cover ring-2 ring-[#E3E8EF] hover:ring-[var(--color-primary)] transition-all duration-200"
                style={{ width: 40, height: 40 }}
              />
              <span className="absolute bottom-0 end-0 w-2.5 h-2.5 bg-[#17B26A] rounded-full border-2 border-white" />
            </div>
            <div className="hidden lg1:block">
              <p className="text-[#364152] text-sm font-semibold leading-tight">{user?.firstname}</p>
              <p className="text-[#697586] text-xs font-normal mt-0.5">{user?.designation?.name}</p>
            </div>
          </div>

        </div>
      </header>

      <ServiceToggle openServiceToggle={openServiceToggle} setOpenServiceToggle={setOpenServiceToggle} />
    </>
  );
}

export default Navbar;
