"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function No_services_Add() {
  const {t} = useTranslation()
  return (
    <>
        
        
    <div className='flex flex-col items-center justify-center  mt-30'>
      <img src="/images/property.svg" alt="" />
      <p className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4'>{t("No properties added yet")}</p>
      <p className='text-[#697586] text-xl font-normal '>{t('Add your first property to start receiving requests.')}</p>
      <button className='flex justify-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2.5 h-14 w-[25%] rounded-[6px] my-6 cursor-pointer'>
        <p className='text-base flex items-center'>{t("Add property")} </p>
        <img src="/images/icons/AddIcon.svg" alt="" />
      </button>
    </div>
    </>
  )
}

export default No_services_Add
