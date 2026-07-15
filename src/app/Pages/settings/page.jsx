"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import SectionOfMenuPage from './SectionOfMenu/page'
import { useTranslation } from 'react-i18next'

const menuItems = [
  {
    Label: 'Company_data',
    nameKey: 'Company data',
    icon: '/images/icons/Company_dataBlack.svg',
    iconSelected: '/images/icons/Company_data_yellow.svg',
    subItems: [
      { Label: 'BasicInformation', nameKey: 'Basic Information' },
      { Label: 'YourFiles', nameKey: 'Your Files' },
      { Label: 'ContactInformation', nameKey: 'Contact Information' },
      { Label: 'ChangePassword', nameKey: 'Change Password' },
      { Label: 'CompanyAddress', nameKey: 'Company Address' },
    ],
  },
  { Label: 'Personal_data', nameKey: 'Personal data', icon: '/images/icons/Personal_dataBlack.svg', iconSelected: '/images/icons/Personal_data_yellow.svg' },
  { Label: 'Marketer_Panel', nameKey: 'Marketer panel', icon: '/images/icons/Marketer_PanelBlack.svg', iconSelected: '/images/icons/Marketer_Panel_yellow.svg' },
]

function Home_Car_Street_ModulePage() {
  const { t } = useTranslation()
  const [selectedMenu, setSelectedMenu] = useState('BasicInformation')

  const activeParent = menuItems.find(
    (item) => item.Label === selectedMenu || item.subItems?.some((s) => s.Label === selectedMenu)
  )

  const handleTabClick = (item) => {
    if (item.subItems) {
      setSelectedMenu(item.subItems[0].Label)
    } else {
      setSelectedMenu(item.Label)
    }
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Page title */}
        <div className="page-hero">
          <p className='text-[#364152] text-xl font-semibold leading-tight'>{t('Settings')}</p>
          <p className='text-[#697586] text-sm mt-0.5'>{t('Manage your account and preferences.')}</p>
        </div>

        {/* Main Tab Bar */}
        <div className="flex border-b border-[#E3E8EF] gap-1 w-full">
          {menuItems.map((item) => {
            const isActive = activeParent?.Label === item.Label
            return (
              <button
                key={item.Label}
                onClick={() => handleTabClick(item)}
                className={`
                  relative flex items-center justify-center gap-2 px-5 py-3
                  text-sm font-medium whitespace-nowrap cursor-pointer
                  transition-colors duration-150
                  ${isActive ? 'text-[var(--color-primary)]' : 'text-[#4B5565] hover:text-[#364152]'}
                `}
              >
                <img
                  src={isActive ? item.iconSelected : item.icon}
                  alt={item.Label}
                  className="w-4.5 h-4.5"
                />
                {t(item.nameKey)}
                <span className={`
                  absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full
                  transition-all duration-200
                  ${isActive ? 'bg-[var(--color-primary)] opacity-100' : 'opacity-0'}
                `} />
              </button>
            )
          })}
        </div>

        {/* Sub-Tab Bar */}
        {activeParent?.subItems && (
          <div className="flex gap-1 bg-[#EEF2F6] w-fit h-12 rounded-[8px] p-1.5">
            {activeParent.subItems.map((sub) => (
              <button
                key={sub.Label}
                onClick={() => setSelectedMenu(sub.Label)}
                className={`
                  px-3 py-1.5 text-sm rounded-[6px] cursor-pointer
                  transition-all duration-150
                  ${selectedMenu === sub.Label
                    ? 'bg-[var(--color-primary)] text-white font-medium shadow-sm'
                    : 'text-[#4B5565] hover:text-[var(--color-primary)] hover:bg-white/60'}
                `}
              >
                {t(sub.nameKey)}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="page-enter">
          <SectionOfMenuPage selectedMenu={selectedMenu} />
        </div>
      </div>
    </MainLayout>
  )
}

export default Home_Car_Street_ModulePage
