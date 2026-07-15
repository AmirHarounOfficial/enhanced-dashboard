"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function BasicInformationPage({getdetailsData}) {
  const {t} = useTranslation()
  
  return (
    <>
      <div className=' w-full   border border-[#E3E8EF] rounded-[6px] p-4'>
        <p className='text-[#364152] text-base font-medium mb-5'>{t('Basic Information')}</p>

        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Property type')}</p> 
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            {getdetailsData?.property_type?.name}
          </p>
        </div>
        <div className="flex justify-between items-center py-3 ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Maximum number of guests')}</p> 
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>{getdetailsData?.guests_count}</span>
            <span>{t('guests')}</span>
          </p>
        </div>
        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('measuring')}</p> 
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>{getdetailsData?.area}</span>
            <span> {t(getdetailsData?.area_unit)}</span>
          </p>
        </div>

      </div>

    </>
  )
}
export default BasicInformationPage

