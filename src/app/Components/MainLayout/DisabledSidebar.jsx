"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slice/Auth/AuthSlice';

function DisabledSidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const pathname = usePathname();

  // Logout functionality
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());      
    setIsSidebarOpen(false);
    router.push("/Auth/Login"); 
  }

  return (
    <aside
      className={`
        ${isSidebarOpen ? "block" : "hidden"}
        lg1:flex flex-col h-screen border-x border-[#E3E8EF] transition-all p-4 duration-200
        ${open ? "w-70" : "w-18"}
        bg-white fixed lg:static z-50 top-0 right-0
      `}
    >
      {/* Logo open and close */}
      <button
        onClick={() => {
          if (window.innerWidth >= 1340) { 
            setOpen(!open);
          }
        }}
        className="w-full flex justify-center mt-10 mb-14 cursor-pointer"
      >
        {open ? (
          <div className='flex gap-2 items-center'>
            <img src='/images/LogoText.svg' alt="logo text" />
            <img src='/images/Logo.svg' alt="logo" />
          </div>
        ) : (
          <div className='flex items-center'>
            <img src='/images/Logo.svg' alt="logo" />
          </div>
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className='flex flex-col h-full'>

          {/* Dashboard - DISABLED */}
          <li className="cursor-not-allowed opacity-50 rounded">
            <div className="pointer-events-none">
              {open ? (
                <div className='flex gap-4 items-center py-4 px-2'>
                  <img src="/images/icons/dashboard.svg" alt="" />
                  <p className="text-base font-normal text-[#364152]">{t('dashboard')}</p>
                </div>
              ) : (
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/dashboard.svg" alt="" />
                </div>
              )}
            </div>
          </li>

          {/* Requests - DISABLED */}
          <li className="cursor-not-allowed opacity-50 rounded">
            <div className="pointer-events-none">
              {open ? (
                <div className='flex gap-4 items-center py-4 px-2'>
                  <img src="/images/icons/Requests.svg" alt="" />
                  <p className="text-base font-normal text-[#364152]">{t('Requests')}</p>
                </div>
              ) : (
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/Requests.svg" alt="" />
                </div>
              )}
            </div>
          </li>

          {/* Workers - DISABLED */}
          <li className="cursor-not-allowed opacity-50 rounded">
            <div className="pointer-events-none">
              {open ? (
                <div className='flex gap-4 items-center py-4 px-2'>
                  <img src="/images/icons/workers.svg" alt="" />
                  <p className="text-base font-normal text-[#364152]">{t('workers')}</p>
                </div>
              ) : (
                <div className='flex justify-center items-center py-4 px-2'>
                  <img src="/images/icons/workers.svg" alt="" />
                </div>
              )}
            </div>
          </li>

          {/* Services - DISABLED */}
          <li className="cursor-not-allowed opacity-50 rounded">
            <div className="pointer-events-none">
              {open ? (
                <div className='flex gap-4 items-center py-4 px-2'>
                  <img src="/images/icons/Services.svg" alt="" />
                  <p className="text-base font-normal text-[#364152]">{t('Services')}</p>
                </div>
              ) : (
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/Services.svg" alt="" />
                </div>
              )}
            </div>
          </li>

          {/* Subscription - DISABLED */}
          <li className="cursor-not-allowed opacity-50 rounded">
            <div className="pointer-events-none">
              {open ? (
                <div className='flex gap-4 items-center py-4 px-2'>
                  <img src="/images/icons/Subscription.svg" alt="" />
                  <p className="text-base font-normal text-[#364152]">{t('Subscription')}</p>
                </div>
              ) : (
                <div className='flex justify-center items-center py-4 px-2'>
                  <img src="/images/icons/Subscription.svg" alt="" />
                </div>
              )}
            </div>
          </li>

          {/* Conversations - DISABLED */}
          <li className="cursor-not-allowed opacity-50 rounded">
            <div className="pointer-events-none">
              {open ? (
                <div className='flex gap-4 items-center py-4 px-2'>
                  <img src="/images/icons/conversations.svg" alt="" />
                  <p className="text-base font-normal text-[#364152]">{t('conversations')}</p>
                </div>
              ) : (
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/conversations.svg" alt="" />
                </div>
              )}
            </div>
          </li>

          {/* Finance - DISABLED */}
          <li className="cursor-not-allowed opacity-50 rounded">
            <div className="pointer-events-none">
              {open ? (
                <div className='flex gap-4 items-center py-4 px-2'>
                  <img src="/images/icons/Finance.svg" alt="" />
                  <p className="text-base font-normal text-[#364152]">{t('Finance')}</p>
                </div>
              ) : (
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/Finance.svg" alt="" />
                </div>
              )}
            </div>
          </li>

          {/* Technical Support - ENABLED ✅ */}
          <li className={`cursor-pointer rounded ${pathname.startsWith("/Pages/technicalSupport") ? "bg-[#C69815] text-[#fff]" : ""}`}>
            <Link href="/Pages/technicalSupport" onClick={() => setIsSidebarOpen(false)}>
              {open ? (
                <div className='flex gap-4 items-center py-4 px-2'>
                  <img 
                    src="/images/icons/dashboard.svg" 
                    alt="" 
                    className={pathname.startsWith("/Pages/technicalSupport") ? "invert" : ""} 
                  />
                  <p className={`text-base font-normal ${pathname.startsWith("/Pages/technicalSupport") ? "text-[#fff]" : "text-[#364152]"}`}>
                    {t('technical support')}
                  </p>
                </div>
              ) : (
                <div className='flex justify-center items-center py-2 px-2'>
                  <img 
                    src="/images/icons/dashboard.svg" 
                    alt="" 
                    className={pathname.startsWith("/Pages/technicalSupport") ? "invert" : ""}
                  />
                </div>
              )}
            </Link>
          </li>

          {/* Settings - DISABLED */}
          <li className="cursor-not-allowed opacity-50 rounded mt-auto mb-2">
            <div className="pointer-events-none">
              {open ? (
                <div className='flex gap-4 items-center py-4 px-2'>
                  <img src="/images/icons/settings.svg" alt="" />
                  <p className="text-base font-normal text-[#364152]">{t('Settings')}</p>
                </div>
              ) : (
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/settings.svg" alt="" />
                </div>
              )}
            </div>
          </li>
          
          {/* Sign Out - ENABLED ✅ */}
          <li className="cursor-pointer py-2 px-2 rounded">
            <button onClick={handleLogout}>
              {open ? (
                <div className='flex gap-4 items-center'>
                  <img src="/images/icons/signout.svg" alt="" />
                  <p className='text-[#D92D20] text-base font-normal'>{t('Sign out')}</p>
                </div>
              ) : (
                <div className='flex justify-center items-center'>
                  <img src="/images/icons/signout.svg" alt="" />
                </div>
              )}
            </button>
          </li>

        </ul>
      </nav>
    </aside>
  );
}

export default DisabledSidebar;
