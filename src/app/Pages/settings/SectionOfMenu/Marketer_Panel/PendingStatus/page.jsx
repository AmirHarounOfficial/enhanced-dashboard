import { t } from 'i18next'
import React from 'react'

function PendingStatusPage() {
  return (
    <>
    <div className='flex flex-col justify-center items-center mb-9'>
      <img src="/images/sandyHour.svg" alt="" className="w-25 h-25 mt-7.5" />
      <p className='text-[#0F022E] text-lg font-semibold mt-6 mb-3'>{t('Application under review')} </p>
      <p className='text-[#697586] text-sm font-normal'>{t('The data will be reviewed and you will be notified as soon as possible.')}</p>
    </div>
  
    </>
  )
}

export default PendingStatusPage