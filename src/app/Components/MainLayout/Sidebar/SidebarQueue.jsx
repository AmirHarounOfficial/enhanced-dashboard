"use client";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slice/Auth/AuthSlice';
import useSidebarCollapse from './useSidebarCollapse';
import SidebarCollapseButton from './SidebarCollapseButton';



function SidebarQueue({ isSidebarOpen, setIsSidebarOpen }) {
  const [open, toggleSidebar] = useSidebarCollapse();
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState(null);
  const pathname = usePathname();

  //🟢logout
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    setIsSidebarOpen(false);
    router.push("/Auth/Login");
  }

  const navItems = [
    {
      href: "/Pages/Home",
      icon: "/images/icons/dashboard.svg",
      label: t('dashboard'),
      isActive: pathname === "/" || pathname.startsWith("/Pages/dashboard") || pathname.startsWith("/Pages/Home"),
    },
    {
      href: "/Pages/requests/Queue_Module",
      icon: "/images/icons/Requests.svg",
      label: t('Reservations'),
      isActive: pathname.startsWith("/Pages/requests"),
    },
    {
      href: "/Pages/Pending_List",
      icon: "/images/icons/loading-black.svg",
      label: t('pending list'),
      isActive: pathname.startsWith("/Pages/Pending_List"),
    },
    {
      href: "/Pages/Menus",
      icon: "/images/icons/dish-black.svg",
      label: t('Menu and Prices'),
      isActive: pathname.startsWith("/Pages/Menus"),
    },
    {
      href: "/Pages/Halls/Hall",
      icon: "/images/icons/restaurant-black.svg",
      label: t('Halls'),
      isActive: pathname.startsWith("/Pages/Halls/Hall") || pathname.startsWith("/Pages/Halls/Tables") || pathname.startsWith("/Pages/Halls/Views"),
    },
    {
      href: "/Pages/Subscription",
      icon: "/images/icons/Subscription.svg",
      label: t('Subscription'),
      isActive: pathname.startsWith("/Pages/Subscription"),
    },
    {
      href: "/Pages/conversations",
      icon: "/images/icons/conversations.svg",
      label: t('conversations'),
      isActive: pathname.startsWith("/Pages/conversations"),
    },
    {
      href: "/Pages/technicalSupport",
      icon: "/images/icons/dashboard.svg",
      label: t('technical support'),
      isActive: pathname.startsWith("/Pages/technicalSupport"),
    },
  ];

  const bottomItems = [
    {
      href: "/Pages/Activity_Settings",
      icon: "/images/icons/Activity_settings.svg",
      label: t('Activity settings'),
      isActive: pathname.startsWith("/Pages/Activity_Settings"),
    },
    {
      href: "/Pages/settings",
      icon: "/images/icons/settings.svg",
      label: t('Settings'),
      isActive: pathname.startsWith("/Pages/settings"),
    },
  ];

  return (
    <aside
      className={`
        ${isSidebarOpen ? "flex" : "hidden"}
        lg1:flex flex-col h-screen border-e border-[#E3E8EF]
        ${open ? "w-[17.5rem]" : "w-[4.5rem]"}
        bg-white fixed lg1:static z-50 top-0 start-0
        shadow-[1px_0_8px_rgb(0_0_0/0.04)]
      `}
      style={{ transition: 'width 220ms cubic-bezier(0.4,0,0.2,1)' }}
    >

      {/* Logo + collapse toggle */}
      <div
        className={`flex items-center gap-2 mt-8 mb-6 px-4 ${open ? "justify-between" : "justify-center"}`}
      >
        {open && (
          <Link href="/Pages/Home" className='flex gap-2 items-center'>
            <img src='/images/LogoText.svg' alt="ZeTime" />
            <img src='/images/Logo.svg' alt="" />
          </Link>
        )}
        <SidebarCollapseButton open={open} onToggle={toggleSidebar} />
      </div>

      {open && <hr className="border-[#E3E8EF] mx-4 mb-4" />}

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto overflow-x-hidden">
        <ul className='flex flex-col gap-0.5'>

          {navItems.map((item) => (
            <li key={item.href} className="nav-item-wrapper">
              <Link href={item.href} onClick={() => setIsSidebarOpen(false)}>
                <div className={`nav-item rounded-[6px] flex items-center py-2.5 px-2 gap-3 cursor-pointer ${item.isActive ? "nav-item-active" : "hover:bg-[#EEF2F6]"}`}>
                  <img src={item.icon} alt="" className={`w-5 h-5 flex-shrink-0 ${item.isActive ? "invert" : ""}`} />
                  {open && (
                    <span className={`text-sm font-normal sidebar-label ${item.isActive ? "text-white" : "text-[#364152]"}`}>
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
              {!open && <span className="nav-tooltip">{item.label}</span>}
            </li>
          ))}

        </ul>
      </nav>

      {/* Bottom items */}
      <div className="px-3 pb-3 pt-2 border-t border-[#E3E8EF] mt-2">
        <ul className="flex flex-col gap-0.5">

          {bottomItems.map((item) => (
            <li key={item.href} className="nav-item-wrapper">
              <Link href={item.href} onClick={() => setIsSidebarOpen(false)}>
                <div className={`nav-item rounded-[6px] flex items-center py-2.5 px-2 gap-3 cursor-pointer ${item.isActive ? "nav-item-active" : "hover:bg-[#EEF2F6]"}`}>
                  <img src={item.icon} alt="" className={`w-5 h-5 flex-shrink-0 ${item.isActive ? "invert" : ""}`} />
                  {open && (
                    <span className={`text-sm font-normal sidebar-label ${item.isActive ? "text-white" : "text-[#364152]"}`}>
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
              {!open && <span className="nav-tooltip">{item.label}</span>}
            </li>
          ))}

          {/* Sign out */}
          <li className="nav-item-wrapper">
            <button onClick={handleLogout} className="w-full">
              <div className="nav-item rounded-[6px] flex items-center py-2.5 px-2 gap-3 cursor-pointer hover:bg-[#FEE4E2]">
                <img src="/images/icons/signout.svg" alt="" className="w-5 h-5 flex-shrink-0" />
                {open && (
                  <span className="text-[#D92D20] text-sm font-normal sidebar-label">{t('Sign out')}</span>
                )}
              </div>
            </button>
            {!open && <span className="nav-tooltip" style={{ background: '#D92D20' }}>{t('Sign out')}</span>}
          </li>

        </ul>
      </div>

    </aside>
  );

}

export default SidebarQueue;

