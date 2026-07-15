"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function ActionPage({ analysisProperties }) {
  const { t } = useTranslation()
  const pending = analysisProperties?.pending

  if (!pending?.show_section) return null

  return (
    <div className='border border-[#FEC84B] bg-[#FFFCF5] rounded-[8px] p-4 mb-8'>
      <div className='flex gap-2 items-start mb-2'>
        <img src="/images/icons/alert-yellow.svg" className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <p className='text-[#364152] text-sm font-semibold'>{t('Action required')}</p>
      </div>
      <p className='text-[#697586] text-sm mb-3'>{pending?.message}</p>
      <button className='btn-primary bg-[var(--color-primary)] flex items-center justify-center gap-2 w-full h-11 rounded-[6px] cursor-pointer'>
        <span className='text-white text-sm font-medium'>{t('Review now')}</span>
        <img src="/images/icons/arrow-left-white.svg" className="w-5 h-5" />
      </button>
    </div>
  )
}

export default ActionPage
