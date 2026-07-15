"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function BasicInformationPage({getDetailsData, propertyId}) {
  const {t} = useTranslation()
  const router = useRouter()

  
  return (
    <>
      <div className=' w-full   border border-[#E3E8EF] rounded-[6px] p-4'>
        <div className='mb-5 flex justify-between'>
          <p className='text-[#364152] text-base font-medium '>{t('Basic Information')}</p>
          <button 
            onClick={()=>router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/BasicInformation?id=${propertyId}&from=Add`)}
            className='flex gap-1'>
            <img src="/images/icons/EditYellow.svg" className="w-5 h-5 mt-1" />
            <span className='text-[var(--color-primary)]'>{t('modification')}</span>
          </button>
        </div>
        
        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Property type')}</p> 
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            {getDetailsData?.property_type?.name}
          </p>
        </div>
        <div className="flex justify-between items-center py-3 ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Maximum number of guests')}</p> 
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>{getDetailsData?.guests_count}</span>
            <span>{t('guests')}</span>
          </p>
        </div>
        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('measuring')}</p> 
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>{getDetailsData?.area}</span>
            <span>{t(getDetailsData?.area_unit)}</span>
          </p>
        </div>

      </div>

    </>
  )
}
export default BasicInformationPage

