'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Header() {
  const { t } = useTranslation()
  return (
    <div className="page-hero flex justify-between items-center gap-4 flex-wrap">
      <div>
        <p className='text-[#364152] text-xl font-semibold leading-tight'>{t('Road services')}</p>
        <p className='text-[#697586] text-sm font-normal mt-0.5'>{t('Lets check your updates today')}</p>
      </div>
    </div>
  )
}

export default Header
