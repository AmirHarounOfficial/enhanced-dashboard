'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function No_Items({setOpenAddItem}) {
  const {t} = useTranslation()
  return (
    <>

      <div className='flex flex-col gap-2 items-center'>
        <img src="/images/NOMenu.svg" alt="" />
        <p className='text-[#364152] text-2xl font-semibold '>{t('Start by adding items')}</p>
        <p className='text-[#697586] text-xl font-normal'>{t('Add a new item and start featuring it on the menu.')}</p>
        <button 
          onClick={()=>setOpenAddItem(true)}
          className='flex justify-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2.5 h-14 w-[25%] rounded-[6px] my-6 cursor-pointer'
        >
          <p className='text-base flex items-center'>{t('Add category')} </p>
          <p className='flex items-center'>
            <img src="/images/icons/AddIcon.svg" className="w-5 h-5" />
          </p>

        </button>

      </div>  
    </>
  )
}

export default No_Items
