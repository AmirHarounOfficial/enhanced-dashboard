'use client'
import React, { Suspense, useState } from 'react'
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import SidebarMenuPage from './SidebarMenu/page';
import SectionOfMenuPage from './SectionOfMenu/page';
import Header from './Header';
import Loader from '@/app/Components/Loader/Loader';



function Activity_SettingsPage() {
  const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null
  const current_module_key = userData?.current_module_key

  const [selectedMenu, setSelectedMenu] = useState(1)

  return (
    <MainLayout>
      <Header current_module_key={current_module_key}/>
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col gap-8">
          <SidebarMenuPage selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
          <div className="page-enter">
            <SectionOfMenuPage selectedMenu={selectedMenu}/>
          </div>
        </div>
      </Suspense>
    </MainLayout>
  )
}

export default Activity_SettingsPage
