"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function AddressPage({getDetailsData , propertyId}) {
  const {t} = useTranslation()
  const router = useRouter()
  return (
    <>
      <div className=' w-full   border border-[#E3E8EF] rounded-[6px] p-4'>
          <div className='mb-5 flex justify-between'>
            <p className='text-[#364152] text-base font-medium '>{t('the address')}</p>
            <button
              onClick={()=>router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/Address?id=${propertyId}&from=Add`)}
              className='flex gap-1'>
              <img src="/images/icons/EditYellow.svg" className="w-5 h-5 mt-1" />
              <span className='text-[var(--color-primary)]'>{t('modification')}</span>
            </button>
          </div>
        
          <div className="flex justify-between items-center  ">
            <p className="text-[#4B5565] text-sm font-normal">{t('State')}</p>
            <p className="text-[#364152] text-sm font-medium w-[20%]">{getDetailsData?.location?.country}</p>
          </div>
          <div className="flex justify-between items-center py-3 ">
            <p className="text-[#4B5565] text-sm font-normal">{t('City')}</p>
            <p className="text-[#364152] text-sm font-medium w-[20%]">{getDetailsData?.location?.city}</p>
          </div>
          <div className="flex justify-between items-center  ">
            <p className="text-[#4B5565] text-sm font-normal">{t('region')}</p>
            <p className="text-[#364152] text-sm font-medium w-[20%]">{getDetailsData?.location?.area}</p>
          </div>

      </div>
    </>
  )
}
export default AddressPage

