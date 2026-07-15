'use client'
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FilterPage from '../Filter/page'

function TitleOfTransactionsPage({onFilterApply}) {
    const {t} = useTranslation()

    const [open , setOpen]=useState(false);

  
  return (
    <>
  <div className='flex justify-between mb-8'>
    <div className='flex items-center gap-2 '>
      <p className='w-12 h-12 flex justify-center items-center bg-[#FEF0C7] rounded-[8px]'>
        <img src="/images/icons/Transactions.svg" alt="" className='w-6 h-6' />
      </p>
      <div>
        <p className='text-[#364152] text-xl font-medium'>{t('Transactions')}</p>
        <p className='text-[#697586] text-base font-light'>{t('Track your financial transactions accurately and easily from one organized place.')}</p>
      </div>
      
    </div>


    {/* FilterBtn */}
    <div>
      <button 
        onClick={()=>setOpen(true)}
        className='flex gap-4  justify-center items-center border h-14 w-37.5  border-[#C69815] rounded-[6px] cursor-pointer'
      >
        <img src="/images/icons/FlterIcon.svg" alt=""  className='w-6 h-6'/>
        <span className='text-[var(--color-primary)] text-base font-medium'>{t('filter')} </span>
      </button>
    </div>
  </div>

  <FilterPage open={open} setOpen={setOpen} onFilterApply={onFilterApply}/>
    </>
  )
}

export default TitleOfTransactionsPage

