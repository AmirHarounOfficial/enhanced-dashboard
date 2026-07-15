"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function ProfitsPage({getBookingDetails}) {
  const {t} = useTranslation()
    const getBookingDetailsData = getBookingDetails?.data

  return (
    <>  
    <div className='border border-[#E3E8EF] rounded-[6px] p-4'>
      <p className='text-[#364152] text-base font-medium mb-5'>{t('Your profits')}</p>

      <div>

        {/*  */}
        <div className='flex justify-between '>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Total amount')}</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>{getBookingDetailsData?.total_amount} </span>
            <span>{getBookingDetailsData?.currency}</span>
          </p>
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Platform fees')} ({getBookingDetailsData?.total_percentage}%)</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>{getBookingDetailsData?.total_tax_and_service_fee}</span>
            <span>{getBookingDetailsData?.currency}</span>
          </p>
        </div>

        <div className='border border-dashed border-[#E3E8EF] my-3'></div>

        {/*  */}
        <div className='flex justify-between  '>
          <p className='text-[#364152] text-sm font-medium  flex items-center '>{t('Net profit')} </p>
          <p className='text-[var(--color-primary)] text-base font-semibold flex  gap-1'>
            <span>{getBookingDetailsData?.total_profit}</span>
            <span>{getBookingDetailsData?.currency}</span>
          </p>
        </div>

      </div>
    </div>
    
    </>
  )
}

export default ProfitsPage

