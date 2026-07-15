"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { t } from 'i18next';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import BookingSettingPpage from './BookingSettings/page';
import Savings_CalendarPage from './Savings_Calendar/page';
import Legal_CompliancePage from './Legal_Compliance/page';
import ReviewsPages from './Reviews/pages';
import AdvancedSettingsPages from './AdvancedSettings/pages';
import Terms_PoliciesPage from './Terms_Policies/page';
import LegalDocumentsPages from './LegalDocuments/pages';

function Property_ModulePage() {
  const {t} = useTranslation() 
  const [activeTab, setActiveTab] = useState(1);

  const menuTabBar = [
    {id:1 , name:t('Booking settings') , icons:'/images/icons/calendar-gray.svg' , iconSelected:'/images/icons/calendar-yellow2.svg'},
    {id:2 , name:t('Reviews') , icons:'/images/icons/Star_blackk.svg' , iconSelected:'/images/icons/star-yellow.svg'},
    {id:3 , name:t('Savings and Calendar') , icons:'/images/icons/clock-black.svg' , iconSelected:'/images/icons/clock-yellow.svg'},
    {id:4 , name:t('Legal and Compliance') , icons:'/images/icons/web-protection-black.svg' , iconSelected:'/images/icons/web-protection-yellow.svg'},
    {id:5 , name:t('Advanced settings') , icons:'/images/icons/settings-black.svg' , iconSelected:'/images/icons/settings-yellow.svg'},
    {id:6 , name:t('Terms and Policies') , icons:'/images/icons/security_black.svg' , iconSelected:'/images/icons/security_yellow.svg'},
    {id:7 , name:t('Legal documents') , icons:'/images/icons/document-attachment-black.svg' , iconSelected:'/images/icons/document-attachment-yellow.svg'},
  ]
  return (
    <MainLayout>

      <div className='"w-full '>
        <div className='flex gap-4 border-b border-[#CDD5DF] overflow-x-auto whitespace-nowrap scrollbar-hide '>
          {menuTabBar?.map((tab)=>(
            <button 
              key={tab.id}
              onClick={()=>setActiveTab(tab.id)}
              className={`w-full cursor-pointer text-sm py-6 px-2 font-normal flex items-center justify-center ${
                activeTab === tab.id ? "text-[var(--color-primary)] border-b border-[var(--color-primary)]" :"text-[#364152]"
              }`}
            >
              <div className='flex gap-1'>
                <img src={activeTab === tab.id ? tab.iconSelected : tab.icons} className="w-4 h-4 mt-1" />
                <p className='flex items-center '>
                  <span className='text-base font-medium' >{tab.name}</span>
                </p>
              </div>
              
            </button>
          ))}
        </div>

        <div className='p-6'>
          {activeTab===1 && <BookingSettingPpage/>}
          {activeTab===2 && <ReviewsPages/>}
          {activeTab===3 && <Savings_CalendarPage/>}
          {activeTab===4 && <Legal_CompliancePage/>}
          {activeTab===5 && <AdvancedSettingsPages/>}
          {activeTab===6 && <Terms_PoliciesPage/>}
          {activeTab===7 && <LegalDocumentsPages/>}
        </div>

      </div>

    </MainLayout>
  )
}

export default Property_ModulePage
