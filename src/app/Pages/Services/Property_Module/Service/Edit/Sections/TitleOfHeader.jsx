"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function TitleOfHeader() {
  const {t} = useTranslation()
  return (
    <>
      <div className='mb-10'>
        <p className='text-[#364152] text-2xl font-medium mb-3'>{t('Property modification')}</p>
        <p className='text-[#697586] text-base font-normal'>{t('You can edit the property details while keeping all settings and reservations.')}</p>
      </div>
    </>
  )
}

export default TitleOfHeader