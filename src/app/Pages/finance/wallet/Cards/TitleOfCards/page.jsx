"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function TitleOfCardsPage() {
  const {t}= useTranslation()

  return (
    <>
      <div className='mb-10'>
        <p className='text-[#364152] text-2xl font-medium mb-3'>{t('Available funds')}</p>
        <p className='text-[#697586] text-base font-normal'>{t('Check your current balance and easily track the amounts ready for withdrawal or use.')}</p>
      </div>
    </>
  )
}

export default TitleOfCardsPage