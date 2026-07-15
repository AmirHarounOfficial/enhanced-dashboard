"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PaymentPage({getReservationsById}) {
  const {t} = useTranslation()
  const status = 'pending'
    // '!pending','!confirmed','!seated','!completed','!cancelled','no_show','!arrived','!rejected'
  const StatusRender = (status) => {
    switch (status) {
      case "confirmed": //مؤكد
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-7 rounded-2xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' mt-1' />
            <span className=''>{t('certain')}</span>
          </div>
        </div>
        );
      case "completed"://مكتملة
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-7 rounded-2xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' mt-1' />
            <span className=''>{t('Complete')}</span>
          </div>
        </div>
        );
      case "pending": //قيد الانتظار          
        return (
          <div className=' bg-[#FFFAEB] border  border-[#F79009] text-[#DC6803] w-fit h-7 rounded-2xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/pending Status.svg" alt=""className=' mt-1' />
              <span className=''>{t('Pending')}</span>
            </div>
          </div>
        );
      case "arrived": // وصل
        return (
          <div className=' bg-[#F9F5E8] border border-[#9E7A11] text-[#9E7A11] w-fit h-7 rounded-2xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/tabler_map-pin-check.svg" alt="" className=' mt-1' />
              <span className=''>{t('receipt')}</span>
            </div>
          </div>
        );
      case "seated": // جالس
      return (
        <div className=' bg-[#E3E8EF] border border-[#697586] text-[#4B5565] w-fit h-7 rounded-2xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/chair-gray.svg" alt="" className=' mt-1' />
            <span className=''>{t('sitting')}</span>
          </div>
        </div>
      );
      case "no_show": // لم يحضر
        return (
          <div className=' bg-[#FEF0C7] border border-[var(--color-primary)] text-[var(--color-primary)] w-fit h-7 rounded-2xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/tabler_map-pin-x.svg" alt="" className=' mt-1'/>
              <span className=''>{t('not_attend')}</span>
            </div>
          </div>
        );
      case "canceled": // ملغيه
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('cancelled')}</span>
            </div>
          </div>
        );
      case "rejected": // مرفوضه
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('rejected')}</span>
            </div>
          </div>
        );
      }
  };
  return (
    <>
      <div className='bg-white border border-[#E3E8EF] shadow-sm hover:shadow-md transition-shadow duration-200 p-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/save-money-dollar-Yellow.svg" alt="" />
          <span className='text-[#364152] text-xl font-medium'>{t('Payment')}</span>
        </p>

        <div className='flex justify-between my-4'>
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('Deposit amount')}</p>
            <p className='text-[#364152] text-lg'>{getReservationsById?.payment?.deposit_paid} جنيه </p>
          </div>

          <div className='flex items-center'>
            {StatusRender(getReservationsById?.status)}
          </div>
        </div>

        <div className='border border-[#48A1FF] bg-[#EFF6FF] flex gap-2 p-3 rounded-[6px] mt-5 '>
          <p className='flex items-center'>
            <img src="/images/icons/ii_blue.svg" className="w-4 h-4" />
          </p>
          <p className='text-[#364152] text-base font-normal'>{t('Refunds are available up to 12 hours before booking.')}</p>
        </div>

      </div>


    </>
  )
}

export default PaymentPage


