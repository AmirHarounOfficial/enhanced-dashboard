"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function PropertyDetailsPage({getBookingDetails}) {
  const {t} = useTranslation()
    const [open, setOpen] = useState(false)
    
    const getBookingDetailsData = getBookingDetails?.data

      const formatTime = (time) => {
      if (!time) return "--";

      const [hoursStr, minutesStr] = time.split(":");
      let hours = parseInt(hoursStr);
      let minutes = parseInt(minutesStr);

      if (isNaN(hours) || isNaN(minutes)) return "--";

      const period = hours >= 12 ? "م" : "ص";
      hours = hours % 12 || 12;

      return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
    };


  return (
    <>
        <div className="w-full p-3 border border-[#E3E8EF] rounded-[6px] overflow-hidden bg-white select-none mb-4">
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between   text-right"
        >
          <span className="text-[#0F022E] text-base font-normal flex items-center gap-2">
            <img src="/images/icons/city_yellow.svg" alt="" />
            {t('Property details')}
          </span>

          <div
            className={`transition-transform duration-300 cursor-pointer ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            <img src="/images/icons/ArrowDown.svg" alt="" />
          </div>
        </button>



        {/** content (street) */}
        {open &&(
          <div className="mt-3   ">
            <div className='flex gap-2 mb-4'>
              <p>
                <img src="/images/icons/locationblue.svg" alt="" />
              </p>
              <div className='flex flex-col justify-end '>
                <p className='text-[#364152] text-base font-medium'>{getBookingDetailsData?.property_title}</p>
                <p className='text-[#697586] text-sm font-normal'> {getBookingDetailsData?.city} {getBookingDetailsData?.area}</p>
              </div>
            </div>
            <div className='bg-[#EEF2F6] rounded-[8px] px-4 py-2 '>
              <p className='text-[#364152] text-base font-medium mb-2'>{t('Login and logout instructions')}</p>

              <div className='grid grid-cols-2 gap-1 text-[#4B5565] text-sm font-normal'>
                <p>
                  ( {t('Login')}: {getBookingDetailsData?.property_check_in &&
                      formatTime(getBookingDetailsData.property_check_in)} )
                </p> 

                <p>
                  ( {t('Exit')} :{getBookingDetailsData?.property_check_out &&
                      formatTime(getBookingDetailsData.property_check_out)} )
                </p>
                <p>{t('The service provider is available from')} :</p>
                <p>
                  <span>
                    {getBookingDetailsData?.provider_availablity?.available_from &&
                      formatTime(getBookingDetailsData.provider_availablity.available_from)}
                  </span> {' '}
                  {t('to')} 
                  <span> {' '}
                    {getBookingDetailsData?.provider_availablity?.available_to &&
                      formatTime(getBookingDetailsData.provider_availablity.available_to)}
                  </span>
                </p>
              </div>
            </div>

          </div>

        )}

      </div>

    </>
  )
}

export default PropertyDetailsPage

