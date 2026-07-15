"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function GuestInformationPage({getBookingDetails}) {
  const {t} = useTranslation()
  const getBookingDetailsData = getBookingDetails?.data

  const guestRepeated = getBookingDetailsData?.guest_is_repeated

  return (
    <>
    <div className='border border-[#E3E8EF] rounded-[6px] p-4 mb-4'>
      <p className='text-[#364152] text-base font-medium mb-6'>{t('Guest Information')}</p>

      {/*  */}
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <p className='w-10 h-10 bg-[#007AFF] text-white rounded-full flex justify-center items-center'>{getBookingDetailsData?.guest_name?.charAt(0)}</p>
          <div>
            <p className='text-[#364152] text-base font-medium'>{getBookingDetailsData?.guest_name}</p>
            <p className='text-[#4B5565] text-base font-normal'>{getBookingDetailsData?.guest_total_bookings} {t('Reservations')}</p> 
          </div>
        </div>

          {guestRepeated && (
            <>
              <p className='border border-[#079455] bg-[#DCFAE6] text-[#079455] h-7.5 px-2   rounded-[6px]'>
                {t('Frequent guest')}
              </p>
            </>
          )}
      

      </div>

      <div className='border border-[#E3E8EF] my-4 h-0.5'></div>

      {/*  */}
      <div className='flex justify-between font-normal'>
        <p className='text-[#4B5565] text-base '>{t('Mobile number')}</p>
        <p className='text-[#364152] text-base '>{getBookingDetailsData?.guest_phone}</p>
      </div>

      {/*  */}
      <div className='flex justify-between font-normal mt-3 mb-6'>
        <p className='text-[#4B5565] text-base '>{t('Email')}</p>
        <p className='text-[#364152] text-base '>{getBookingDetailsData?.guest_email}</p>
      </div>

      {/*  */}
      <div className='flex gap-4'>
        <button 
          onClick={() => {
            if (getBookingDetailsData?.guest_phone) {
              window.location.href = `tel:${getBookingDetailsData.guest_phone}`
            }
          }}
          className='flex justify-center items-center gap-2.5 h-14 bg-[#ECFDF3] py-2.5 px-4 w-full rounded-[6px] cursor-pointer'
        >
          <img src="/images/icons/call-green.svg" className="w-5 h-5" />
          <p className='text-[#079455] text-base font-medium'>{t('communication')}</p>
        </button>

        <button className='flex justify-center items-center h-14 gap-2.5 bg-[#FEF0C7] py-2.5 px-4 w-full rounded-[6px] cursor-pointer'>
          <img src="/images/icons/chat_blue.svg" className="w-5 h-5" />
          <p className='text-[var(--color-primary)] text-base font-medium'>{t('conversation')}</p>
        </button>
      </div>

    </div>

    </>
  )
}

export default GuestInformationPage


