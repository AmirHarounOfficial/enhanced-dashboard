"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function No_Halls_Add() {
    const {t} = useTranslation()
    const router = useRouter()
  
  return (
    <>
      <div className='flex flex-col items-center justify-center  '>
        <img src="/images/hall.svg" alt="" />
        <p className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4'>{t("Start by adding a new lounge")}</p>
        <p className='text-[#697586] text-xl font-normal '>{t('Add a new lounge and start organizing restaurant tables with ease.')}</p>
        <button 
          className='flex justify-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2.5 h-14 w-[25%] rounded-[6px] my-6 cursor-pointer'
          onClick={() => router.push('/Pages/Halls/Hall/Add')}
        >
          <p className='text-base flex items-center'>{t("Adding a hall")} </p>
          <p className='flex items-center'>
            <img src="/images/icons/AddIcon.svg" className="w-5 h-5" />
          </p>
        </button>
      </div>

    </>
  )
}

export default No_Halls_Add
