"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function RejectedCompPage({bookingDetails}) {
  const { t } = useTranslation();
  return (
    <>
      <section>
        <div className='my-6 bg-[#FEE4E2] px-4 py-3 rounded-[8px]'>
            <p className='text-[#313131] text-sm font-medium mb-2'> {t('the reason')}: الموعد غير متاح   </p>
            <ol className="list-disc list-inside space-y-2 text-[#D92D20] text-sm font-normal">
            <li>{bookingDetails?.cancel_reason}</li>
            </ol>
          </div>
      </section>
    </>
  )
}

export default RejectedCompPage
