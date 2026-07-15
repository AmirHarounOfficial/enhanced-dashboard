"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function No_Tables_Add() {
  const {t} = useTranslation()
  const router = useRouter()
  
  return (
    <>
      <div className='flex flex-col items-center justify-center  '>
        <img src="/images/Tables.svg" alt="" />
        <p className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4'>{t("Start by adding a table")}</p>
        <p className='text-[#697586] text-xl font-normal '>{t('Create a new table to facilitate reservation management.')}</p>
        <button 
          className='flex justify-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2.5 h-14 w-[25%] rounded-[6px] my-6 cursor-pointer'
          onClick={() => router.push('/Pages/Halls/Tables/Add')}
        >
          <p className='text-base flex items-center'>{t("Add table")} </p>
          <p className='flex items-center'>
            <img src="/images/icons/AddIcon.svg" className="w-5 h-5" />
          </p>
          
        </button>
      </div>

    </>
  )
}

export default No_Tables_Add
