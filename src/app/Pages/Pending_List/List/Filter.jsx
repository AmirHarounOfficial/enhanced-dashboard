"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function Filter({activeTab , setActiveTab}) {
  const {t} = useTranslation()

  const tabs = [
    { id: 'coming',   label: t('The newcomers') },
    { id: 'waiting',  label: t('pending list') },
    { id: 'notified', label: t('Notification given') },
    { id: 'no_show',  label: t('He did not attend') },
  ];

  return (
    <div className='flex flex-wrap gap-3 mb-6'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            rounded-full h-10 px-5 cursor-pointer border text-sm font-medium
            transition-all duration-150
            ${activeTab === tab.id
              ? 'border-[var(--color-primary)] bg-[#F9F5E8] text-[var(--color-primary)]'
              : 'border-[#E3E8EF] bg-white text-[#697586] hover:border-[#C69815]/50 hover:text-[var(--color-primary)]'}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Filter
