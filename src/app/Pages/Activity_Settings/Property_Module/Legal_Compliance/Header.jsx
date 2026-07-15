'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Header() {
  const { t } = useTranslation()
  return (
    <>
      <div className='py-4 px-6 flex items-center gap-3'>
        <div className='w-9 h-9 bg-[#FEF0C7] flex justify-center items-center rounded-[8px]'>
          <img src="/images/icons/Legal Documents _blue.svg" alt="" className='w-5 h-5' />
        </div>
        <p className='text-[#364152] text-sm font-semibold'>{t('Legal Compliance')}</p>
      </div>
      <hr className='border-[#E3E8EF]' />
    </>
  )
}

export default Header
