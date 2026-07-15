"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function TitleOfCardsPage() {
    const{t}= useTranslation()
  
  return (
    <>
    <div className='mb-10'>
      <p className='text-[#364152] text-2xl font-medium mb-3'>{t('Overview')}</p>
      <p className='text-[#697586] text-base font-normal '>{t('Track your financial performance accurately — from portfolio to transactions and taxes in one organized place.')}</p>
    </div>

    </>
  )
}

export default TitleOfCardsPage