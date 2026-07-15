'use client';
import React from 'react'
import { useTranslation } from 'react-i18next';

function TileOfSevicesPage() {
  const {t} = useTranslation();

  return (
    <div className='page-hero mb-6'>
      <p className='text-[#364152] text-xl font-semibold leading-tight'>{t('Today overview')}</p>
      <p className='text-[#697586] text-sm font-normal mt-0.5'>{t('Track and manage real estate service requests easily and efficiently.')}</p>
    </div>
  )
}

export default TileOfSevicesPage
