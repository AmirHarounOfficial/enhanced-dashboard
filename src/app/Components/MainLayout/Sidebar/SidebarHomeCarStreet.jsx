"use client";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slice/Auth/AuthSlice';
import useSidebarCollapse from './useSidebarCollapse';
import SidebarCollapseButton from './SidebarCollapseButton';

function SidebarHomeCarStreet({ isSidebarOpen, setIsSidebarOpen }) {
  const [open, toggleSidebar] = useSidebarCollapse();
  const { t } = useTranslation();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    setIsSidebarOpen(false);
    router.push("/Auth/Login");
  };

  const navItems = [
    {
      href: "/Pages/Home",
      icon: "/images/icons/dashboard.svg",
      label: t('dashboard'),
      isActive: pathname === "/" || pathname.startsWith("/Pages/dashboard") || pathname.startsWith("/Pages/Home"),
    },
    {
      href: "/Pages/requests/Home_Car_Street_Module",
      icon: "/images/icons/Requests.svg",
      label: t('Requests'),
      isActive: pathname.startsWith("/Pages/requests"),
    },
    {
      href: "/Pages/workers",
      icon: "/images/icons/workers.svg",
      label: t('workers'),
      isActive: pathname.startsWith("/Pages/workers"),
    },
    {
      href: "/Pages/Services",
      icon: "/images/icons/Services.svg",
      label: t('Services'),
      isActive: pathname.startsWith("/Pages/Services"),
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
      href: "/Pages/finance",
      icon: "/images/icons/Finance.svg",
      label: t('Finance'),
      isActive: pathname.startsWith("/Pages/finance"),
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

  const NavItem = ({ item }) => (
    <li className="nav-item-wrapper">
      <Link href={item.href} onClick={() => setIsSidebarOpen(false)}>
        <div className={`nav-item rounded-[6px] flex items-center py-2.5 px-2 gap-3 cursor-pointer
          ${item.isActive ? "nav-item-active" : ""}`}
        >
          <img
            src={item.icon}
            alt=""
            className={`w-5 h-5 flex-shrink-0 transition-transform duration-150 ${item.isActive ? "invert" : ""}`}
          />
          {open && (
            <span className={`text-sm sidebar-label truncate ${item.isActive ? "text-white font-medium" : "text-[#364152] font-normal"}`}>
              {item.label}
            </span>
          )}
        </div>
      </Link>
      {!open && <span className="nav-tooltip">{item.label}</span>}
    </li>
  );

  return (
    <aside
      className={`
        sidebar-luxury
        ${isSidebarOpen ? "flex" : "hidden"}
        lg1:flex flex-col h-screen border-e border-[#E3E8EF]
        ${open ? "w-[17.5rem]" : "w-[4.5rem]"}
        fixed lg1:static z-50 top-0 start-0
      `}
      style={{
        transition: 'width 220ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >

      {/* Logo + collapse toggle */}
      <div
        className={`flex items-center gap-2 mt-7 mb-5 px-4 ${open ? "justify-between" : "justify-center"}`}
      >
        {open && (
          <Link href="/Pages/Home" className="flex gap-2 items-center">
            <img src="/images/LogoText.svg" alt="ZeTime" />
            <img src="/images/Logo.svg" alt="" />
          </Link>
        )}
        <SidebarCollapseButton open={open} onToggle={toggleSidebar} />
      </div>

      <hr className="border-[#E3E8EF] mx-3 mb-3" />

      {/* Main Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto overflow-x-hidden">
        {open && (
          <p className="text-[#9AA4B2] text-[10px] font-semibold uppercase tracking-widest px-2 mb-2 mt-1 select-none">
            {t('Main')}
          </p>
        )}
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </ul>
      </nav>

      {/* Bottom — Settings + Logout */}
      <div className="px-3 pb-4 pt-2 mt-2" style={{ borderTop: '1px solid #E3E8EF' }}>
        {open && (
          <p className="text-[#9AA4B2] text-[10px] font-semibold uppercase tracking-widest px-2 mb-2 select-none">
            {t('Settings')}
          </p>
        )}
        <ul className="flex flex-col gap-0.5">

          {bottomItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}

          {/* Sign out */}
          <li className="nav-item-wrapper mt-1">
            <button onClick={handleLogout} className="w-full text-start">
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

export default SidebarHomeCarStreet;
