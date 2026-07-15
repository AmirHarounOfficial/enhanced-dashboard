"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function Guest_InformationPage({getReservationsById}) {
  const {t} = useTranslation()

      // '!pending','!confirmed','!seated','!completed','!cancelled','no_show','!arrived','!rejected'
  const StatusRender = (status) => {
    switch (status) {
      case "confirmed": //مؤكد
        return (
          <p className=' text-[#067647]  text-lg font-normal flex items-center'>{t('certain')}</p>
        );
      case "completed"://مكتملة
        return (
          <p className=' text-[#067647]  text-lg font-normal flex items-center'>{t('Complete')}</p>
        );
      case "pending": //قيد الانتظار          
        return (
          <p className=' text-[#DC6803]  text-lg font-normal flex items-center'>{t('Pending')}</p>
        );
      case "arrived": // وصل
        return (
          <p className=' text-[#9E7A11]  text-lg font-normal flex items-center'>{t('receipt')}</p>
        );
      case "seated": // جالس
      return (
        <p className=' text-[#4B5565]  text-lg font-normal flex items-center'>{t('sitting')}</p>
      );
      case "no_show": // لم يحضر
        return (
          <p className=' text-[var(--color-primary)]  text-lg font-normal flex items-center'>{t('not_attend')}</p>
        );
      case "canceled": // ملغيه
        return (
          <p className=' text-[#D92D20]  text-lg font-normal flex items-center'>{t('cancelled')}</p>
        );
      case "rejected": // مرفوضه
        return (
          <p className='text-[#D92D20]  text-lg font-normal flex items-center'>{t('rejected')}</p>
        );
      }
  };
  return (
    <>
      <div className='bg-white border border-[#E3E8EF] shadow-sm hover:shadow-md transition-shadow duration-200 p-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/user_yellow.svg" alt="" />
          <span className='text-[#364152] text-xl font-medium'>{t('Guest Information')}</span>
        </p>

        <div className='mt-6 grid grid-cols-2 gap-4'>
          {/* Guest name */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('Guest name')}</p>
            <p className='text-[#364152] text-lg'>{getReservationsById?.guest_name}</p>
          </div>
          {/* phone number */}
          <div className='font-normal '>
            <p className='text-[#697586] text-base'>{t('phone number')}</p>
            <p className='text-[#364152] text-lg'>{getReservationsById?.guest_phone}</p>
          </div>
          {/* Number of people */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('Number of people')}</p>
            <p className='text-[#364152] text-lg'> {getReservationsById?.guest_count} {t('guests')}</p>
          </div>
          {/* Booking status */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('Booking status')}</p>
            <div>{StatusRender(getReservationsById?.status)} </div>
          </div>
          {/* Booking code */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('Booking code')}</p>
            <p className='text-[#364152] text-lg'> # {getReservationsById?.code}  </p>
          </div>
          {/* the time */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('the time')}</p>
            <p className='text-[#364152] text-lg'>
              {
                new Date(`1970-01-01T${getReservationsById?.start_time}`)
                  .toLocaleTimeString("ar-EG", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
              }
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Guest_InformationPage
