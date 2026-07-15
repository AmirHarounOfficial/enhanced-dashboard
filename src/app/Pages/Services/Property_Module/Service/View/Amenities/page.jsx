"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function AmenitiesPage({getdetailsData}) {
  const {t} = useTranslation()

  return (
    <>
      <div className=' w-full   border border-[#E3E8EF] rounded-[6px] p-4'>
        <p className='text-[#364152] text-base font-medium mb-5'>{t('Amenities')}</p>


        <div className='flex flex-wrap gap-1.5'>
          {getdetailsData?.amenities?.map((items)=>(
            <p key={items?.id} className='bg-[#EEF2F6] text-[#364152] text-sm p-2.5 rounded-[55px] w-fit'>
            {items?.name}
            </p>
          ))}
          
        </div>
        
      </div>

    </>
  )
}
export default AmenitiesPage

