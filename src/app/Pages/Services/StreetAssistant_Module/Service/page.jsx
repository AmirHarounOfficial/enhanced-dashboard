'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import Header from './Header'
import SidebarMenuPage from './SidebarMenu/page'
import SectionOfMenuPage from './SectionOfMenu/page'

function ServicePage() {
    const [selectedMenu, setSelectedMenu] = useState(40)
  return (
    <MainLayout>   
      <>
        <Header/>

        <div className="flex flex-col gap-6 mt-14">
          <div className='w-full' >
            <SidebarMenuPage selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
          </div>

          <div className='w-full'>
            <SectionOfMenuPage selectedMenu={selectedMenu}/>
          </div>
        </div>
      </>
    </MainLayout>
  )
}

export default ServicePage