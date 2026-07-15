"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function RequestDataPage({bookingDetails ,StatusRender ,status}) {
    const { t } = useTranslation();
    const service_id = bookingDetails?.service_id;
      let content = null;

    switch (service_id) {
      case 39:
        content = (
          <>
            <hr className="border-[0.5px] border-[#E3E8EF] my-4 " />
            <div className='flex justify-between  w-full'>
              <div className='flex  gap-1.5 w-full'>
                <img src="/images/icons/fuel_gray.svg" alt="" className='w-6 h-6' />
                <p className='text-[#575757] text-sm font-normal flex justify-center items-center'>{t('Fuel type')}: {bookingDetails?.fuel_type?.name}</p>
              </div>
              <div className='flex justify-end gap-1.5  w-full'>
                <p className='text-[#575757] text-sm font-normal flex justify-center items-center'>{t('Fuel quantity')}: {bookingDetails?.quantity}</p>
              </div>
            </div>
          </>
        );
        break;
      case 40:
      case 36:
      case 35:
      case 37:
      case 38:
        content = null;
        break;
      default:
        content = (
          <>
            <hr className="border-[0.5px] border-[#E3E8EF] my-4 " />
            <div className='flex justify-between  w-full'>
              <div className='flex  gap-1.5 w-full'>
                <img src="/images/icons/date.svg" alt="" className='w-6 h-6' />
                <p className='text-[#575757] text-sm font-normal flex justify-center items-center'>{bookingDetails?.visit_date}</p>
              </div>
              <div className='flex justify-end gap-1.5  w-full'>
                <img src="/images/icons/time.svg" alt="" className='w-6 h-6' />
                <p className='text-[#575757] text-sm font-normal flex justify-center items-center'>{bookingDetails?.visit_time}</p>
              </div>
            </div>
          </>
        );
    }


  return (
    <>

      <div className='shadow-sm rounded-[8px] p-4  '>
        {/* request id & status */}
        <div className='flex justify-between'>
          <p className='text-[#697586] text-sm font-normal flex items-center'>
            <span>{t('request')}/</span>
            <span>{bookingDetails?.id}</span>
          </p>

          <div>
            {StatusRender && typeof StatusRender === 'function' ? StatusRender(status) : null}
          </div>
        </div>
        <hr className="border-[0.5px] border-[#E3E8EF] my-4 " />

        {/* service title */}
        <div>
          <p className='text-[#121926] text-base font-medium'>{bookingDetails?.service?.category?.title}</p>
        </div>

        {/* service id */ }
        {content}
        
      </div>

    </>
  )
}

export default RequestDataPage

