"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

const shortcuts = [
  { icon: "/images/icons/Submit_complaint.svg", key: 'Submit a complaint', w: 'w-6', h: 'h-8' },
  { icon: "/images/icons/technical-support.svg", key: 'technical support', w: 'w-8', h: 'h-8' },
  { icon: "/images/icons/working_hours.svg", key: 'working hours', w: 'w-6', h: 'h-8' },
];

function AbbreviationsPage() {
  const { t } = useTranslation();
  return (
    <div className='border border-[#E3E8EF] rounded-[8px] p-4 mb-10'>
      <h2 className='text-[#364152] text-base font-semibold mb-4'>{t('Abbreviations')}</h2>
      <div className='grid grid-cols-3 gap-3'>
        {shortcuts.map(({ icon, key, w, h }) => (
          <button
            key={key}
            className='flex flex-col gap-2 border border-[#E3E8EF] rounded-[8px] p-4 items-center cursor-pointer
                       transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-sm hover:bg-[#C69815]/5
                       active:scale-[0.97]'
          >
            <img src={icon} alt="" className={`${w} ${h}`} />
            <p className='text-[#364152] text-sm font-medium text-center'>{t(key)}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default AbbreviationsPage
