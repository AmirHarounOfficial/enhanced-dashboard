"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function Seating_detailsPage({getReservationsById}) {
  const {t} = useTranslation()
  return (
    <>
      <div className='bg-white border border-[#E3E8EF] shadow-sm hover:shadow-md transition-shadow duration-200 p-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/restaurant-yellow.svg" alt="" />
          <span className='text-[#364152] text-xl font-medium'>{t('Seating details')}</span>
        </p>

        <div className='mt-6 grid grid-cols-3 gap-6'>
          {/* The hall */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('The hall')}</p>
            <p className='text-[#364152] text-lg'>{getReservationsById?.seating_details?.hall} </p>
          </div>
          {/* The view */}
          <div className='font-normal '>
            <p className='text-[#697586] text-base'>{t('The view')}</p>
            <p className='text-[#364152] text-lg'>{getReservationsById?.seating_details?.views?.[0]?.name}</p>
          </div>
          {/* The table */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('The table')}</p>
            <p className='text-[#364152] text-lg'> {getReservationsById?.seating_details?.table}</p>
          </div>

          {/* Special requests */}
          <div className='font-normal col-span-3'>
            <p className='text-[#697586] text-base'>{t('Special requests')}</p>
            <p className='text-[#364152] text-lg'>{getReservationsById?.notes} </p>
          </div>
          
        </div>

        {/*notifications  */}
        <div className='mt-4'>
          <p className='text-[#364152] text-base mb-1'>{t('notifications')}</p>
          <div className='flex gap-4'>
            {getReservationsById?.notifications?.map((item , index)=>(
              <p key={index} className='bg-[var(--color-primary)] w-fit h-10 px-3 rounded-full flex  items-center'>
                <span className='text-white'> {item}</span>
              </p>
            ))}
            
            
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Seating_detailsPage
