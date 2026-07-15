'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function NoTerms_PoliciesPage({ onAddClick }) {
  const {t} = useTranslation()
  return (
    <>
      <div className='p-6 flex flex-col items-center'>
        <img src="/images/Terms and Policies.svg" alt="dd" />
        <p className='text-[#232323] text-lg font-semibold my-6'>{t('No conditions have been added yet.')}</p>

        <button 
          onClick={onAddClick}
          className='bg-[var(--color-primary)] rounded-[6px] cursor-pointer text-white flex items-center justify-center gap-2 w-[35%] h-14 '
        >
          <span className='text-base font-semibold'>{t('Add policy')}</span>
          <img src="/images/icons/AddIcon.svg" alt="" />
        </button>
      </div>

    </>
  )
}

export default NoTerms_PoliciesPage
