"use client";
import React, { useState } from 'react'
import Navbar from './Navbar'
import DisabledSidebar from './DisabledSidebar';

function HiddenItemsLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <DisabledSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto lg1:pt-8 pt-10 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default HiddenItemsLayout;
