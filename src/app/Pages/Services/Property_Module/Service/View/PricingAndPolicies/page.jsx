"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PricingAndPoliciesPage({getdetailsData}) {
  const {t} = useTranslation()
  return (
    <>
      <div className=' w-full   border border-[#E3E8EF] rounded-[6px] p-4'>
        <p className='text-[#364152] text-base font-medium mb-5'>{t('Pricing and policies')}</p>

        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Basic price')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>{getdetailsData?.base_price}</span>
            <span>{getdetailsData?.currency}</span> {' '}
            <span>{t('On the night')}</span>
            
          </p>
        </div>
        <div className="flex justify-between items-center py-3 ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Cleaning fees')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>{getdetailsData?.cleaning_fee}</span>
            <span>{getdetailsData?.currency}</span>
          </p>
        </div>
        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Deposit of guarantee')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>{getdetailsData?.security_deposit}</span>
            <span>{getdetailsData?.currency}</span>
          </p>
        </div>
        <div className="flex justify-between items-center  py-3">
          <p className="text-[#4B5565] text-sm font-normal">{t('cancellation')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            {getdetailsData?.cancellation_policy?.policy_name}
          </p>
        </div>

      </div>
    </>
  )
}
export default PricingAndPoliciesPage

