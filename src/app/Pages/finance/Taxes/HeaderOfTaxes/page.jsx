"use client"
import ExtractBtn from '@/app/Components/Buttons/ExtractBtn'
import React from 'react'
import { useTranslation } from 'react-i18next'

function HeaderOfTaxesPage() {
  const {t} = useTranslation()

  return (
    <>
    <div className='flex justify-between '>

      <div className='w-[65%]  lg1:w-fit '>
        <p className='text-[#364152] text-2xl font-medium'>{t('Taxes')}</p>

        <div className=' flex items-center bg-[#FEF3F2] h-18 py-3 px-4 rounded-[6px] mt-3 '>
          <p className='text-[#DC6803] text-sm font-normal'>{t('Profits and taxes are calculated for the current fiscal year from 01/07/2025 to 31/06/2026')}</p>
        </div>
      </div>


      <div className='  flex justify-end items-center'>
        <ExtractBtn/>
      </div>
    </div>
    </>
  )
}

export default HeaderOfTaxesPage
