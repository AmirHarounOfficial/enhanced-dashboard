"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function RejectedStatusPage({setMarketerStatus}) {
      const {t}=useTranslation()
  
  return (
    <>
      <div className='flex flex-col justify-center items-center mb-9'>
        <img src="/images/cancel.svg" alt="" className="" />
        <p className='text-[#0F022E] text-lg font-semibold mt-6 mb-5'>{t('The request was rejected')}</p>

        <div className='bg-[#FEE4E2] w-[80%] p-4'>
          <ul className='text-[#313131] text-base font-semibold list-disc mr-4'>
            <li>{t('Reasons for rejection')}</li>
          </ul>
          <ul className='text-[#D92D20] text-base font-medium mt-5 list-decimal mr-4'>
            <li className='mb-4'>لم يتم إرفاق المستندات المطلوبة بشكل صحيح.</li>
            <li>المعلومات المقدمة غير واضحة أو غير كاملة.</li>
          </ul>
        </div>


        <button 
        className={`mt-8 w-62.5 h-12 bg-[var(--color-primary)] text-white cursor-pointer text-base font-medium rounded-[6px]`}
        onClick={() => setMarketerStatus(null)}
        >
            {t('Data correction')}
        </button>
      </div>

    </>
  )
}

export default RejectedStatusPage
