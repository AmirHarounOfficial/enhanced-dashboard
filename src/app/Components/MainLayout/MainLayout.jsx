
"use client";
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SidebarProperty from './Sidebar/SidebarProperty';
import SidebarQueue from './Sidebar/SidebarQueue';
import SidebarHomeCarStreet from './Sidebar/SidebarHomeCarStreet';


function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [current_module_key, setCurrentModuleKey] = useState(null)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setCurrentModuleKey(userData?.current_module_key ?? null)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar */}

      {(current_module_key === "home_services" || current_module_key === "car_services" || current_module_key === "street_assistant") && (
          <SidebarHomeCarStreet
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
      )}

      {current_module_key === "property_rental" && (
        <SidebarProperty
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

      )}

      {current_module_key === "queue" && (
        <SidebarQueue
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}

      {/* {current_module_key === "delivery" && (
        <SidebarDelivery
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )} */}



      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto lg1:pt-8 pt-10 px-6 page-enter">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
