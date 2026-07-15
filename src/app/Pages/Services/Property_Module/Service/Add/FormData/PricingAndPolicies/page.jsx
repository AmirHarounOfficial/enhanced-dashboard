"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function PricingAndPoliciesPage({getDetailsData, propertyId}) {
  const {t} = useTranslation()
  const router = useRouter()
  return (
    <>
      <div className=' w-full   border border-[#E3E8EF] rounded-[6px] p-4'>

        <div className='mb-5 flex justify-between'>
          <p className='text-[#364152] text-base font-medium '>{t('Pricing and policies')}</p>
          <button 
            onClick={()=>router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/Pricing?id=${propertyId}&from=Add`)}
            className='flex gap-1'>
            <img src="/images/icons/EditYellow.svg" className="w-5 h-5 mt-1" />
            <span className='text-[var(--color-primary)]'>{t('modification')}</span>
          </button>
        </div>
        
        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Basic price')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>{getDetailsData?.base_price}</span>
            <span>{getDetailsData?.currency}</span> {' '}
            <span>{t('On the night')}</span>
            
          </p>
        </div>
        <div className="flex justify-between items-center py-3 ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Cleaning fees')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>{getDetailsData?.cleaning_fee}</span>
            <span>{getDetailsData?.currency}</span>
          </p>
        </div>
        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Deposit of guarantee')}</p>
          <p className="text-[#1d2633] text-sm font-medium w-[20%]">
            <span>{getDetailsData?.security_deposit}</span>
            <span>{getDetailsData?.currency}</span>
          </p>
        </div>
        <div className="flex justify-between items-center  py-3">
          <p className="text-[#4B5565] text-sm font-normal">{t('cancellation')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            {getDetailsData?.cancellation_policy?.policy_name}
          </p>
        </div>

      </div>
    </>
  )
}
export default PricingAndPoliciesPage

