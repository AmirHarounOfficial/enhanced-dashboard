"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function AmenitiesPage({getDetailsData, propertyId}) {
  const {t} = useTranslation()
  const router = useRouter()

  const amentiesList = getDetailsData?.amenities

  return (
    <>
      <div className=' w-full   border border-[#E3E8EF] rounded-[6px] p-4'>
        
        <div className='mb-5 flex justify-between'>
          <p className='text-[#364152] text-base font-medium '>{t('Amenities')}</p>
          <button 
            onClick={()=>router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/Facilities?id=${propertyId}&from=Add`)}
            className='flex gap-1'>
            <img src="/images/icons/EditYellow.svg" className="w-5 h-5 mt-1" />
            <span className='text-[var(--color-primary)]'>{t('modification')}</span>
          </button>
        </div>

        <div className='flex flex-wrap gap-1.5'>
          {amentiesList?.map((items , index)=>(
            <p key={index} className='bg-[#EEF2F6] text-[#364152] text-sm p-2.5 rounded-[55px] w-fit'>
            {items?.name}
            </p>
          ))}
          
        </div>
        
      </div>

    </>
  )
}
export default AmenitiesPage

