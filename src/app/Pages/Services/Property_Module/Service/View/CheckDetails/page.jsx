"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function CheckDetailsPage({getdetailsData}) {
  const {t} = useTranslation()
  
  return (
    <>
      <div className=' w-full  border border-[#E3E8EF] rounded-[6px] p-4'>
        <p className='text-[#364152] text-base font-medium mb-5'>{t('Check-in details')}</p>

        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Login')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">{getdetailsData?.check_in_time}</p>
        </div>

        <div className="flex justify-between items-center py-3 ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Exit')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">{getdetailsData?.check_out_time}</p>
        </div>
        
      </div>

    </>
  )
}
export default CheckDetailsPage

