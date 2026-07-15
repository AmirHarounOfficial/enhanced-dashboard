'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function NoReviewsPage() {
  const {t} = useTranslation()
  return (
    <>
    
    <div className='p-6'>
      <div className='flex flex-col items-center'>
        <img src="/images/Review.svg" alt="" className='w-80 h-80'/>
        <p className='text-[#0F022E] text-xl font-medium'>{t('No one has participated yet…')}</p>
      </div>
    </div>
    </>
  )
}

export default NoReviewsPage