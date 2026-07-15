'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function SidebarMenuPage({ selectedMenu, setSelectedMenu }) {
  const { t } = useTranslation()
  const [hoveredItem, setHoveredItem] = useState(null)

  const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null
  const current_module_key = userData?.current_module_key

  const menuHomeCarItems = [
    { id: 1, Label: 'Terms and Policies', name: t('Terms and Policies'), icon: '/images/icons/Terms and Policies_Black.svg',      iconSelected: '/images/icons/Terms and Policies_yellow.svg' },
    { id: 2, Label: 'Workplaces',         name: t('Workplaces'),         icon: '/images/icons/maps-location_Black.svg',           iconSelected: '/images/icons/maps-location-yellow.svg' },
    { id: 3, Label: 'Working hours',      name: t('Working hours'),      icon: '/images/icons/date-time-black.svg',               iconSelected: '/images/icons/date-time-yellow.svg' },
    { id: 4, Label: 'Legal documents',    name: t('Legal documents'),    icon: '/images/icons/document-attachment_black.svg',     iconSelected: '/images/icons/document-attachment_yellow.svg' },
    { id: 5, Label: 'Reviews',            name: t('Reviews'),            icon: '/images/icons/star_black.svg',                    iconSelected: '/images/icons/star_yellow.svg' },
  ]

  const menuStreetItems = [
    { id: 1, Label: 'Terms and Policies', name: t('Terms and Policies'), icon: '/images/icons/Terms and Policies_Black.svg',      iconSelected: '/images/icons/Terms and Policies_yellow.svg' },
    { id: 2, Label: 'Workplaces',         name: t('Workplaces'),         icon: '/images/icons/maps-location_Black.svg',           iconSelected: '/images/icons/maps-location-yellow.svg' },
    { id: 4, Label: 'Legal documents',    name: t('Legal documents'),    icon: '/images/icons/document-attachment_black.svg',     iconSelected: '/images/icons/document-attachment_yellow.svg' },
    { id: 5, Label: 'Reviews',            name: t('Reviews'),            icon: '/images/icons/star_black.svg',                    iconSelected: '/images/icons/star_yellow.svg' },
  ]

  let menuItems
  switch (current_module_key) {
    case 'home_services':
    case 'car_services':
      menuItems = menuHomeCarItems
      break
    case 'street_assistant':
      menuItems = menuStreetItems
      break
    default:
      menuItems = menuHomeCarItems
  }

  return (
    <ul className='flex border-b border-[#E3E8EF] gap-1 w-full'>
      {menuItems.map((item) => {
        const isSelected = selectedMenu === item.id
        const isHovered = hoveredItem === item.id
        return (
          <li
            key={item.id}
            className={`
              relative flex w-full items-center justify-center gap-2
              px-2 lg1:px-4 py-3 cursor-pointer whitespace-nowrap
              text-sm font-medium transition-colors duration-150
              ${isSelected
                ? 'text-[var(--color-primary)]'
                : 'text-[#4B5565] hover:text-[var(--color-primary)]'}
            `}
            onClick={() => setSelectedMenu(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <img
              src={isSelected || isHovered ? item.iconSelected : item.icon}
              alt={item.Label}
              className="w-4.5 h-4.5 flex-shrink-0"
            />
            {item.name}
            {/* animated underline */}
            <span className={`
              absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full
              transition-all duration-200
              ${isSelected ? 'bg-[var(--color-primary)] opacity-100' : 'opacity-0'}
            `} />
          </li>
        )
      })}
    </ul>
  )
}

export default SidebarMenuPage
