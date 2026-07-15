"use client";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slice/Auth/AuthSlice';
import useSidebarCollapse from './useSidebarCollapse';
import SidebarCollapseButton from './SidebarCollapseButton';



function SidebarDelivery({ isSidebarOpen, setIsSidebarOpen }) {
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

  return (
    
    // 1440px and above
    <aside
      className={`
        ${isSidebarOpen ? "block" : "hidden"}   /* ✅ في الموبايل/تابلت */
        lg1:flex flex-col h-screen border-x border-[#E3E8EF] transition-all p-4 duration-200
        ${open ? "w-70" : "w-18"}               /* ✅ ده بس للشاشات الكبيرة */
        bg-white fixed lg:static z-50 top-0 right-0
      `}
    >



      {/* Logo + collapse toggle */}
      <div
        className={`flex items-center gap-2 mt-8 mb-8 ${open ? "justify-between" : "justify-center"}`}
      >
        {open && (
          <Link href="/Pages/Home" className='flex gap-2 items-center'>
            <img src='/images/LogoText.svg' alt="ZeTime" />
            <img src='/images/Logo.svg' alt="" />
          </Link>
        )}
        <SidebarCollapseButton open={open} onToggle={toggleSidebar} />
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className='flex flex-col h-full'>
          
          {/* Dashboard */}
          <li className={`cursor-pointer  rounded ${pathname === "/" || pathname.startsWith("/Pages/dashboard") || pathname.startsWith("/Pages/Home") ? "bg-[#C69815] text-[#fff]" : ""}`}>
            <Link href="/Pages/Home"  >
                {open?(
                //open 
                  <div  className='flex gap-4 items-center py-3 px-2'>
                    <img src="/images/icons/dashboard.svg" alt="" className={pathname === "/" || pathname.startsWith("/Pages/dashboard") || pathname.startsWith("/Pages/Home") ? "invert" : ""}/>
                    <p className={`text-base font-normal ${pathname === "/" || pathname.startsWith("/Pages/dashboard") || pathname.startsWith("/Pages/Home") ? "text-[#fff]" : "text-[#364152]"}`}>{t('dashboard')}</p>
                  </div>
                ):(
                  <div className='flex justify-center items-center py-2 px-2'>
                    <img src="/images/icons/dashboard.svg" alt="" className={pathname === "/" || pathname.startsWith("/Pages/dashboard") || pathname.startsWith("/Pages/Home")? "invert" : ""}/>
                  </div>
                )}
            </Link>
          </li>

          {/* Requests */}
          <li  className={`cursor-pointer  rounded ${pathname.startsWith("/Pages/requests") ? "bg-[var(--color-primary)] text-[#fff]" : ""}`}>
            <Link href="/Pages/requests" onClick={() => setIsSidebarOpen(false)}>
                {open?(
                //open 
                  <div  className='flex gap-4 items-center py-3 px-2'>
                    <img src="/images/icons/Requests.svg" alt="" className={pathname.startsWith("/Pages/requests") ? "invert" : ""}/>
                    <p className={`text-base font-normal ${pathname.startsWith("/Pages/requests") ? "text-[#fff]" : "text-[#364152]"}`}>{t('Requests')}</p>
                  </div>
                ):(
                  <div className='flex justify-center items-center py-2 px-2'>
                    <img src="/images/icons/Requests.svg" alt="" className={pathname.startsWith("/Pages/requests") ? "invert" : ""}/>
                  </div>
                )}
            </Link>
          </li>

          {/* workers */}
          <li  className={`cursor-pointer  rounded ${pathname.startsWith("/Pages/workers") ? "bg-[var(--color-primary)] text-[#fff]" : ""}`}>
            <Link href="/Pages/workers" onClick={() => setIsSidebarOpen(false)}>
              {open?(
              //open 
                <div className='flex gap-4 items-center py-3 px-2'>
                  <img src="/images/icons/workers.svg" alt="" className={pathname.startsWith("/Pages/workers") ? "invert" : ""}/>
                  <p className={`text-base font-normal ${pathname.startsWith("/Pages/workers") ? "text-[#fff]" : "text-[#364152]"}`}>{t('workers')}</p>
                </div>
              ):(
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/workers.svg" alt="" className={pathname.startsWith("/Pages/workers") ? "invert" : ""}/>
                </div>
              )}
            </Link>
          </li>

          {/* property rental */}
          <li  className={`cursor-pointer  rounded ${pathname.startsWith("/Pages/Services") ? "bg-[var(--color-primary)] text-[#fff]" : ""}`}>
            <Link href="/Pages/Services" onClick={() => setIsSidebarOpen(false)}>
              {open?(
              //open 
                <div className='flex gap-4 items-center py-3 px-2'>
                  <img src="/images/icons/Services.svg" alt="" className={pathname.startsWith("/Pages/Services") ? "invert" : ""}/>
                  <p className={`text-base font-normal ${pathname.startsWith("/Pages/Services") ? "text-[#fff]" : "text-[#364152]"}`}>{t('property rental')}</p>
                </div>
              ):(
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/Services.svg" alt="" className={pathname.startsWith("/Pages/Services") ? "invert" : ""}/>
                </div>
              )}
            </Link>
          </li>

          {/* Subscription */}
          <li  className={`cursor-pointer  rounded ${pathname.startsWith("/Pages/Subscription") ? "bg-[var(--color-primary)] text-[#fff]" : ""}`}>
            <Link href="/Pages/Subscription" onClick={() => setIsSidebarOpen(false)}>
              {open?(
              //open 
                <div className='flex gap-4 items-center py-3 px-2'>
                  <img src="/images/icons/Subscription.svg" alt="" className={pathname.startsWith("/Pages/Subscription") ? "invert" : ""}/>
                  <p className={`text-base font-normal ${pathname.startsWith("/Pages/Subscription") ? "text-[#fff]" : "text-[#364152]"}`}>
                    {t('Subscription')}
                  </p>
                </div>
              ):(
                <div className='flex justify-center items-center py-4 px-2'>
                  <img src="/images/icons/Subscription.svg" alt="" className={pathname.startsWith("/Pages/Subscription") ? "invert" : ""}/>
                </div>
              )}
            </Link>
          </li>
            
          {/* Conversations */}
          <li  className={`cursor-pointer rounded ${pathname.startsWith("/Pages/conversations") ? "bg-[var(--color-primary)] text-[#fff]" : ""}`}>
            <Link href="/Pages/conversations" onClick={() => setIsSidebarOpen(false)}>
              {open?(
              //open 
                <div className='flex gap-4 items-center py-3 px-2'>
                  <img src="/images/icons/conversations.svg" alt="" className={pathname.startsWith("/Pages/conversations") ? "invert" : ""}/>
                  <p className={`text-base font-normal ${pathname.startsWith("/Pages/conversations") ? "text-[#fff]" : "text-[#364152]"}`}>{t('conversations')}</p>
                </div>
              ):(
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/conversations.svg" alt="" className={pathname.startsWith("/Pages/conversations") ? "invert" : ""}/>
                </div>
              )}
            </Link>
          </li>

          {/* Finance */}
          <li className={`cursor-pointer rounded ${pathname.startsWith("/Pages/finance") ? "bg-[var(--color-primary)] text-[#fff]" : ""}`}>
            <Link href="/Pages/finance" onClick={() => setIsSidebarOpen(false)}>
              {open ? (
                //open 
                <div className='flex gap-4 items-center py-3 px-2'>
                  <img src="/images/icons/Finance.svg" alt="" className={pathname.startsWith("/Pages/finance") ? "invert" : ""} />
                  <p className={`text-base font-normal ${pathname.startsWith("/Pages/finance") ? "text-[#fff]" : "text-[#364152]"}`}>
                    {t('Finance')}
                  </p>
                </div>
              ) : (
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/Finance.svg" alt="" className={pathname.startsWith("/Pages/finance") ? "invert" : ""} />
                </div>
              )}
            </Link>
          </li>

          {/* Settings */}
          <li className={`cursor-pointer  rounded ${pathname.startsWith("/Pages/technicalSupport") ? "bg-[var(--color-primary)] text-[#fff]" : ""}`}>
            <Link href="/Pages/technicalSupport" onClick={() => setIsSidebarOpen(false)}>
              {open?(
              //open 
                <div className='flex gap-4 items-center py-3 px-2'>
                  <img src="/images/icons/dashboard.svg" alt="" className={pathname.startsWith("/Pages/technicalSupport")  ? "invert" : ""} />
                  <p className={`text-base font-normal ${pathname.startsWith("/Pages/technicalSupport") ? "text-[#fff]" : "text-[#364152]"}`}>{t('technical support')}</p>
                </div>
              ):(
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/dashboard.svg" alt="" className={pathname.startsWith("/Pages/technicalSupport")  ? "invert" : ""}/>
                </div>
              )}
            </Link>
          </li>

          {/* Activity Settings */}
          <li  className={`cursor-pointer  rounded  mt-auto mb-2 ${pathname.startsWith("/Pages/Activity_Settings") ? "bg-[var(--color-primary)] text-[#fff]" : ""}`}>
          <Link href="/Pages/Activity_Settings" onClick={() => setIsSidebarOpen(false)}>
              {open?(
              //open 
                <div className='flex gap-4 items-center py-3 px-2'>
                  <img src="/images/icons/Activity_settings.svg" alt=""className={pathname.startsWith("/Pages/Activity_Settings") ? "invert" : ""} />
                  <p className={`text-base font-normal ${pathname.startsWith("/Pages/Activity_Settings") ? "text-[#fff]" : "text-[#364152]"}`}>{t('Activity settings')}</p>
                </div>
              ):(
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/Activity_settings.svg" alt="" className={pathname.startsWith("/Pages/Activity_Settings") ? "invert" : ""}/>
                </div>
              )}
          </Link>
          </li>
      
          {/* Settings */}
          <li  className={`cursor-pointer  rounded  mt-auto mb-2 ${pathname.startsWith("/Pages/settings") ? "bg-[var(--color-primary)] text-[#fff]" : ""}`}>
          <Link href="/Pages/settings" onClick={() => setIsSidebarOpen(false)}>
              {open?(
              //open 
                <div className='flex gap-4 items-center py-3 px-2'>
                  <img src="/images/icons/settings.svg" alt=""className={pathname.startsWith("/Pages/settings") ? "invert" : ""} />
                  <p className={`text-base font-normal ${pathname.startsWith("/Pages/settings") ? "text-[#fff]" : "text-[#364152]"}`}>{t('Settings')}</p>
                </div>
              ):(
                <div className='flex justify-center items-center py-2 px-2'>
                  <img src="/images/icons/settings.svg" alt="" className={pathname.startsWith("/Pages/settings") ? "invert" : ""}/>
                </div>
              )}
          </Link>
          </li>
          
          {/* Sign out */}
          <li  onClick={handleLogout} className={`cursor-pointer py-2 px-2 rounded ${pathname.startsWith("/signout") ? "bg-[var(--color-primary)] text-[#fff]" : ""}`}>
          <button >
              {open?(
              //open 
                <div className='flex gap-4 items-center cursor-pointer'>
                  <img src="/images/icons/signout.svg" alt="" />
                  <p className='text-[#D92D20] text-base font-normal'>{t('Sign out')}</p>
                </div>
              ):(
                <div className='flex justify-center items-center cursor-pointer'>
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

export default SidebarDelivery;


