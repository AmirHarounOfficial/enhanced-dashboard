"use client"
import React from 'react'
import TextEditor from './TextEditor'
import { useTranslation } from 'react-i18next'

function EditContent({ onCancel }) {
  const {t} = useTranslation()
  return (
    <>
      <div className='p-6'>
        {/*  */}
        <div>
          <p className='text-[#4B5565] text-sm font-normal'>{t('the address')}</p>
          <input 
            type="text"
            className='w-full h-11 border border-[#E3E8EF] mt-1.5 rounded-[6px] outline-none px-4'  
          />
        </div>
        {/*  */}
        <div className='mt-4'>
          <p className='text-[#4B5565] text-sm font-normal'>{t('Proposed text')}</p>
          <TextEditor  />
        </div>
        
        <div className='mt-8 flex justify-start gap-4'>
          <button 
            className='bg-[var(--color-primary)] text-white px-6 h-14 w-62.5 rounded-[6px] cursor-pointer font-medium '
          >
            {t('Save changes')}
          </button>
          <button 
            onClick={onCancel}
            className='border border-[var(--color-primary)] text-[var(--color-primary)] px-6 h-14 w-50 rounded-[6px] cursor-pointer font-medium '
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    

    </>
  )
}

export default EditContent

