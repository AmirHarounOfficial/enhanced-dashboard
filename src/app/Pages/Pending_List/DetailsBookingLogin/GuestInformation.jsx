'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function GuestInformation({getScanWaitlist}) {

  const {t} = useTranslation()
  const getScanWaitlistData = getScanWaitlist?.data



  const formattedDate = getScanWaitlistData?.reservation_date
    ? new Date(getScanWaitlistData.reservation_date).toLocaleDateString(
        "ar-EG",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "";

  const formattedTime = getScanWaitlistData?.start_time
    ? new Date(`1970-01-01T${getScanWaitlistData.start_time}`)
        .toLocaleTimeString("ar-EG", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .replace("م", "مساءً")
        .replace("ص", "صباحاً")
    : "";


  return (
    <>

      <div className='bg-white border border-[#E3E8EF] shadow-sm hover:shadow-md transition-shadow duration-200 p-4 my-6'>
        <p className='flex gap-1'>
          <img src="/images/icons/user_yellow.svg" alt="" />
          <span className='text-[#364152] text-xl font-medium'>{t('Guest Information')}</span>
        </p>

        <div className='mt-6 grid grid-cols-2 gap-4'>
          {/* Guest name */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('Guest name')}</p>
            <p className='text-[#364152] text-lg'>{getScanWaitlistData?.guest_name}</p>
          </div>
          {/* phone number */}
          <div className='font-normal '>
            <p className='text-[#697586] text-base'>{t('phone number')}</p>
            <p className='text-[#364152] text-lg'>{getScanWaitlistData?.guest_phone}</p>
          </div>
          {/* Number of people */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('Number of people')}</p>
            <p className='text-[#364152] text-lg'> {getScanWaitlistData?.guest_count} {t('guests')}</p>
          </div>
        
          {/* Booking status */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('Booking status')}</p>
            <p className='text-[#364152] text-lg'>{getScanWaitlistData?.status} </p>
          </div>
          {/* the date */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('the date')}</p>
            <p className='text-[#364152] text-lg'>
            {formattedDate}
            </p>
          </div>
          
          {/* the time */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('the time')}</p>
            <p className='text-[#364152] text-lg'>
            {formattedTime}
            </p>
          </div>
        </div>
      </div>
      

    </>
  )
}

export default GuestInformation
