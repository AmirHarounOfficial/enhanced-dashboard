"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import AddPage from '../Add/page';

function Header({openAdd , setOpenAdd}) {
  const {t} = useTranslation();
  return (
    <>
      <header className='page-hero flex justify-between items-center gap-4 flex-wrap'>
        <div>
          <p className='text-[#364152] text-xl font-semibold leading-tight'>{t('pending list')}</p>
          <p className='text-[#697586] text-sm font-normal mt-0.5'>{t('Guests expected to arrive soon')}</p>
        </div>
        <button
          onClick={()=>setOpenAdd(true)}
          className='btn-primary flex justify-center items-center gap-2 px-5 h-11 bg-[var(--color-primary)] text-white rounded-[8px] cursor-pointer text-sm font-medium'
        >
          <img src="/images/icons/AddIcon.svg" alt="" className="w-4.5 h-4.5" />
          <span>{t('Add a new guest')}</span>
        </button>
      </header>

      <AddPage
        open={openAdd}
        setOpen={setOpenAdd}
      />
    </>
  )
}

export default Header
