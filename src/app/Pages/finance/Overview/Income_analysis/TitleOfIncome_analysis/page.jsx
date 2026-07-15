'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function TitleOfIncome_analysisPage({ selectedFilter, onFilterChange }) {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false);  
  const options = [
    { id: 'all', label: t('Total') },
    { id: 'cash', label: t('monetary') }, 
    { id: 'card', label: t('credit card') },
    { id: 'refunded', label: t('refunded') }
  ];
  const currentLabel = options.find(opt => opt.id === selectedFilter)?.label || t('Total');
  const handleSelect = (value) => {
    onFilterChange(value);
    setOpen(false);
  };

  return (
    <>
  <div className='flex justify-between py-4 px-6   '>
    <div className='flex items-center gap-2 '>
      <p className='w-12 h-12 flex justify-center items-center bg-[#FEF0C7] rounded-[8px]'>
        <img src="/images/icons/Income analysis.svg" alt="" className='w-6 h-6' />
      </p>
      <p className='text-[#364152] text-xl font-medium'>{t('Income analysis')}</p>
    </div>

    <div className="relative inline-block text-right">
      <button
        onClick={() => setOpen(!open)}
        className="h-11 w-36 px-2 border border-[#E3E8EF] rounded-[6px]  flex justify-between items-center"
      >
        <span className='text-[#364152] text-sm font-normal'>{currentLabel}</span>
        <img
          src="/images/icons/chevron-down.svg"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          width={14}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg p-2 z-50">
          <ul className="flex flex-col gap-2">
            {options.map((opt) => (
              <li
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`hover:bg-[#EEF2F6] px-3 py-2 rounded cursor-pointer ${selectedFilter === opt.id ? 'bg-[#F8FAFC]' : ''}`}
              >
                {opt.label}
              </li>
            ))}

            
          </ul>
        </div>
      )}
    </div>
  </div>
    </>
  )
}

export default TitleOfIncome_analysisPage




