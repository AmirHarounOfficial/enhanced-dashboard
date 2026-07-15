'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function SidebarMenuPage({ selectedMenu, setSelectedMenu }) {
  const {t}= useTranslation()
    const [openDropdown, setOpenDropdown] = useState(null)
    
    const menuItems = [
      {id:40 , Label:'Battery operation', name:t('Battery operation'), icon:'/images/icons/Battery operation.svg', iconSelected:'/images/icons/Battery operationWhite.svg'},
      {id:36 , Label:'Wheel repair', name:t('Wheel repair'), icon:'/images/icons/Wheel repair.svg', iconSelected:'/images/icons/Wheel repairWhite.svg'},
      {id:35 , Label:'Car transport', name:t('Car transport'), icon:'/images/icons/Car transport.svg', iconSelected:'/images/icons/Car transportWhite.svg'},
      {id:37 , Label:'Car unlock', name:t('Car unlock'), icon:'/images/icons/Car unlock.svg', iconSelected:'/images/icons/Car unlockWhite.svg'},
      {id:39 , Label:'Fuel delivery', name:t('Fuel delivery'), icon:'/images/icons/Fuel delivery.svg', iconSelected:'/images/icons/Fuel deliveryWhite.svg'},
      {id:38 , Label:'General maintenance', name:t('General maintenance'), icon:'/images/icons/General maintenance.svg', iconSelected:'/images/icons/General maintenanceWhite.svg'},

    ]
    
    const toggleDropdown = (label) => {
      setOpenDropdown(openDropdown === label ? null : label)
    }
  return (
    <>
      <ul className='flex items-center gap-4 py-3 px-4 w-full overflow-x-auto whitespace-nowrap bg-[#F8FAFC] '>
        {menuItems.map((item) => {
          const isSelected = selectedMenu === item.id 
          
          return (
          <div key={item.id} className="w-full ">
            <li 
              className={`px-4 py-3 w-full text-base font-normal cursor-pointer transition-colors flex items-center gap-3 rounded-[6px] ${
                isSelected 
                  ? 'bg-[var(--color-primary)] text-white' 
                  : '  text-[#364152] '
              }`}
                onClick={() => {
                  setSelectedMenu(item.id)
                }}
            >
              <div className="flex items-center gap-3">
                {isSelected ?(
                  <img src={item.iconSelected} alt={item.Label} className="w-5 h-5" />
                  ):(
                  <img src={item.icon} alt={item.Label} className="w-5 h-5" />
                  )
                }
                <span>{item.name}</span>
              </div>
            </li>
          </div>
          )
        })}
      </ul>
    </>
  )
}

export default SidebarMenuPage

