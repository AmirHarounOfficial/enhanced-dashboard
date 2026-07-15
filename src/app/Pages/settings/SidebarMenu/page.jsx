"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function SidebarMenuPage({ selectedMenu, setSelectedMenu }) {
  const {t}= useTranslation()
  const [openDropdown, setOpenDropdown] = useState(null)
  
  const menuItems = [
    {
      Label:'Company_data', 
      name:t('Company data'), 
      icon:'/images/icons/Company_dataBlack.svg', 
      iconSelected:'/images/icons/Company_dataWhite.svg',
      subItems: [
        {Label:'BasicInformation', name:t('Basic Information')},
        {Label:'YourFiles', name:t('Your Files')},
        {Label:'ContactInformation', name:t('Contact Information')},
        {Label:'ChangePassword', name:t('Change Password')},
        {Label:'CompanyAddress', name:t('Company Address')},
      ]
    },
    {Label:'Personal_data', name:t('Personal data'), icon:'/images/icons/Personal_dataBlack.svg', iconSelected:'/images/icons/Personal_dataWhite.svg'},
    {Label:'Marketer_Panel', name:t('Marketer panel'), icon:'/images/icons/Marketer_PanelBlack.svg', iconSelected:'/images/icons/Marketer_PanelWhite.svg'},
    // {Label:'Activity_settings', name:t('Activity settings'), icon:'/images/icons/Activity_settingsBlack.svg', iconSelected:'/images/icons/Activity_settingsWhite.svg'},
  ]
  
  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  return (
    <>
      <ul className='py-6 px-4 shadow-sm'>
        {menuItems.map((item) => {
          const isSelected = selectedMenu === item.Label || item.subItems?.some(subItem => subItem.Label === selectedMenu)
          
          return (
          <div key={item.Label}>
            <li 
              className={`p-3 text-base font-normal cursor-pointer transition-colors flex items-center gap-3 justify-between ${
                isSelected 
                  ? 'bg-[var(--color-primary)] text-white' 
                  : 'hover:bg-[#EEF2F6] text-[#364152]'
              }`}
              onClick={() => {
                if (item.subItems) {
                  toggleDropdown(item.Label)
                } else {
                  setSelectedMenu(item.Label)
                }
              }}
            >
              <div className="flex items-center gap-3">
                {isSelected ?(
                  <img src={item.iconSelected} alt={item.Label} className="w-5 h-5" />
                  ):(
                  <img src={item.icon} alt={item.Label} className="w-5 h-5" />
                  )
                }
                {item.name}
              </div>
              {item.subItems && (
                <svg 
                  className={`w-4 h-4 transition-transform ${openDropdown === item.Label ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </li>
            
            {/* Sub-items */}
            {item.subItems && openDropdown === item.Label && (
              <ul className="p-3">
                {item.subItems.map((subItem) => (
                  <li
                    key={subItem.Label}
                    className={`py-2 px-3  text-sm font-normal cursor-pointer transition-colors ${
                      selectedMenu === subItem.Label
                        ? 'bg-[#F9F5E8] text-[#364152]'
                        : ' text-[#4B5565]'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedMenu(subItem.Label)
                    }}
                  >
                    {subItem.name}
                  </li>
                ))}
              </ul>
            )}

          </div>
          )
        })}
      </ul>
    </>
  )
}

export default SidebarMenuPage

