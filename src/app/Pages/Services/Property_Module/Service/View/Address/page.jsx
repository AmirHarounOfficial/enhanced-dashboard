"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function AddressPage({getdetailsData}) {
  const {t} = useTranslation()
  return (
    <>
      <div className=' w-full   border border-[#E3E8EF] rounded-[6px] p-4'>
          <p className='text-[#364152] text-base font-medium mb-5'>{t('the address')}</p>
          <div className="flex justify-between items-center  ">
            <p className="text-[#4B5565] text-sm font-normal">{t('State')}</p>
            <p className="text-[#364152] text-sm font-medium w-[20%]">{getdetailsData?.location?.country}</p>
          </div>
          <div className="flex justify-between items-center py-3 ">
            <p className="text-[#4B5565] text-sm font-normal">{t('City')}</p>
            <p className="text-[#364152] text-sm font-medium w-[20%]">{getdetailsData?.location?.city}</p>
          </div>
          <div className="flex justify-between items-center  ">
            <p className="text-[#4B5565] text-sm font-normal">{t('region')}</p>
            <p className="text-[#364152] text-sm font-medium w-[20%]">{getdetailsData?.location?.area} </p>
          </div>

      </div>
    </>
  )
}
export default AddressPage

