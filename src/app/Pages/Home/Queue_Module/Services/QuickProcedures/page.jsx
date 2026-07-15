"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

const procedures = [
  { icon: '/images/icons/menu-square.svg',      key: 'Menu and Prices' },
  { icon: '/images/icons/restaurant-yellow.svg', key: 'Hall layout' },
  { icon: '/images/icons/add-circle.svg',        key: 'Add booking' },
  { icon: '/images/icons/dish-yellow.svg',       key: 'Halls' },
]

function QuickProceduresPage() {
  const { t } = useTranslation()
  return (
    <div className='border border-[#E3E8EF] rounded-[8px] p-4 mb-10 mt-10'>
      <p className='text-[#364152] text-base font-semibold mb-4'>{t('Quick procedures')}</p>
      <div className='grid grid-cols-4 gap-3'>
        {procedures.map(({ icon, key }) => (
          <button
            key={key}
            className='group flex flex-col gap-2 border border-[#E3E8EF] rounded-[8px] p-4 items-center cursor-pointer
                       transition-all duration-200 hover:border-[var(--color-primary)] hover:bg-[#C69815]/5 hover:shadow-sm
                       active:scale-[0.97]'
          >
            <img src={icon} alt="" className='w-7 h-7' />
            <p className='text-[#364152] text-sm font-medium text-center transition-colors duration-200 group-hover:text-[var(--color-primary)]'>
              {t(key)}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickProceduresPage
