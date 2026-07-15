"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function RequestPage({getBookingDetails}) {
  const {t} = useTranslation()
  const getBookingDetailsData = getBookingDetails?.data
  const status = getBookingDetailsData?.status
  const StatusRender = (status) => {
    switch (status) {
      case "confirmed": //مقبوله
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-7 rounded-2xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' mt-1' />
            <span className=''>{t('Acceptable')}</span>
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
      case "checked_in": // تم الوصول 
        return (
          <div className=' bg-[#E3E8EF] border border-[#697586] text-[#4B5565] w-fit h-7 rounded-2xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/on_going Status.svg" alt="" className=' mt-1' />
              <span className=''>{t('checked_in')}</span>
            </div>
          </div>
        );
      case "not_attend": // لم يحضر
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-7 rounded-2xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' mt-1'/>
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
      }
  };

    const formatTime = (time) => {
      if (!time) return "--";

      const [hoursStr, minutesStr] = time.split(":");
      let hours = parseInt(hoursStr);
      let minutes = parseInt(minutesStr);

      if (isNaN(hours) || isNaN(minutes)) return "--";

      const period = hours >= 12 ? t('evening') : t('morning');
      hours = hours % 12 || 12;

      return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

  return (
    <>
      <div className='border border-[#E3E8EF] rounded-[6px] p-4 mb-4 mt-6'>
        <div className='flex justify-between'>
          <p className='text-[#697586] text-sm font-normal'>{t('to request')}/{getBookingDetailsData?.booking_number}</p>        
          <div>{StatusRender(status)}</div>
        </div>

        {status === 'pending' &&(
          <div className='flex gap-2 border border-[#FDB022] bg-[#FFFCF5] p-3 mt-4 rounded-[6px]'>
            <img src="/images/icons/clock_orange_bold.svg" alt="" />
            <p className='text-[#DC6803] text-sm font-normal'>{t('Please review the request and respond immediately.')}</p>
          </div>
        )}

        <div className='border border-[#E3E8EF] my-4'></div>

        {/*  */}
        <div>
          <p className='text-[#364152] text-xl font-normal'>{t('The reservation was made in')} : </p>
          <div className='mt-4 grid grid-cols-2'>
            {/*  */}
            <div className='flex gap-2  '>
              <img src="/images/icons/calendar_blue.svg" alt="" />
              <p className='text-[#4B5565] text-base font-medium'>
                {getBookingDetailsData?.created_at &&
                  new Date(getBookingDetailsData.created_at).toLocaleDateString("ar-EG", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </p>
            </div>
            {/*  */}
            <div className='flex gap-2  '>
              <img src="/images/icons/clock-blue.svg" alt="" />
              <p className='text-[#4B5565] text-base font-medium'>
                  {getBookingDetailsData?.created_at &&
              formatTime(getBookingDetailsData.created_at)}
              </p>
            </div>
          </div>

          {/* box */}
          <div className='grid grid-cols-3 gap-2 mt-6 '>
            {/*  */}
            <div className='flex flex-col items-center py-4  border border-[#EEF2F6] rounded-[14px]'>
              <p className='w-10 h-10 bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center rounded-full'>
                <img src="/images/icons/user-blue.svg" alt="" />
              </p>
              <p className='text-[#4B5565] text-base font-normal'>{t('Adults')}</p>
              <p className='text-[#0B0E11] text-xl font-medium'>{getBookingDetailsData?.adults}</p>
            </div>
            {/*  */}
            <div className='flex flex-col items-center py-4  border border-[#EEF2F6] rounded-[14px]'>
              <p className='w-10 h-10 bg-gradient-to-br from-[#FCE7F3] to-[#FBCFE8] flex items-center justify-center rounded-full'>
                <img src="/images/icons/Baby-pink.svg" alt="" />
              </p>
              <p className='text-[#4B5565] text-base font-normal'>{t('children')}</p>
              <p className='text-[#0B0E11] text-xl font-medium'>{getBookingDetailsData?.children}</p>
            </div>
            {/*  */}
            <div className='flex flex-col items-center py-4  border border-[#EEF2F6] rounded-[14px]'>
              <p className='w-10 h-10 bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center rounded-full'>
                <img src="/images/icons/Moon-blue.svg" alt="" />
              </p>
              <p className='text-[#4B5565] text-base font-normal'>{t('nights')}</p>
              <p className='text-[#0B0E11] text-xl font-medium'>{getBookingDetailsData?.nights}</p>
            </div>


          </div>
        </div>

        <div className='border border-[#E3E8EF] my-4'></div>
        
        {/*  */}

        <div className='grid grid-cols-2'>
          <div className='text-base font-normal'>
            <p className='text-[#364152] mb-2'>{t('Arrival date')}:</p>
            <p className='text-[#697586]'>
                {getBookingDetailsData?.check_in &&
                new Date(getBookingDetailsData.check_in).toLocaleDateString("ar-EG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
            </p>
          </div>

          <div className='text-base font-normal'>
            <p className='text-[#364152] mb-2'>{t('Departure date')}:</p>
            <p className='text-[#697586]'>
              {getBookingDetailsData?.check_out &&
                  new Date(getBookingDetailsData.check_out).toLocaleDateString("ar-EG", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}
            </p>
          </div>
        </div>

        <div className='text-base font-normal grid grid-cols-2 mt-4'>
          <p className='text-[#364152] '>{t('Expected guest arrival time')}:</p>
          <p className='text-[#697586]'>
            {getBookingDetailsData?.expected_arrival_at &&
              formatTime(getBookingDetailsData.expected_arrival_at)}
          </p>
        </div>



      </div>

    </>
  )
}

export default RequestPage

