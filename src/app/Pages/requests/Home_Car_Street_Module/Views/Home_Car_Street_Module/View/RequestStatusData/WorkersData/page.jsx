

"use client";
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function WorkersDataPage({status , assigned_handymen ,bookingDetails}) {
  const [open, setOpen] = useState(false);

  const {t}= useTranslation();

  return (
    <>
    {status === "accepted" && assigned_handymen.length > 0 && (
        <div className="w-full p-4 shadow-sm rounded-[8px] overflow-hidden bg-white select-none mt-6">
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between   text-right"
        >
          <span className="text-[#0F022E] text-base font-normal flex items-center gap-2">
            <img src="/images/icons/labor.svg" alt="" />
            {t('Workers data')}
          </span>

          <div
            className={`transition-transform duration-300 cursor-pointer ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            <img src="/images/icons/ArrowDown.svg" alt="" />
          </div>
        </button>

        {/* Content */}
        {open && (
          <>
            {bookingDetails?.assigned_handymen?.map((item , index)=>(
            <div 
              key={item?.id}
              className=" mt-5 flex justify-between  text-right ">

              <div className='flex items-center gap-2 '>
                <p className='bg-[#007AFF] text-[#fff] w-8.5 h-8.5 flex justify-center items-center rounded-[999px]'>  {item?.firstname?.charAt(0)}</p>
                <p className='text-[#364152]  text-sm font-normal'>{item?.firstname} {item?.lastname}  </p>
              </div>

              {/* call */}
              <a 
                href={`tel:${item?.phone}`}
                className=' bg-[var(--color-primary)] w-8.5 h-8.5 flex justify-center items-center rounded-[999px] cursor-pointer'>
                <img src="/images/icons/call white.svg" alt="" />
              </a>

            </div>
            ))}
          


            

            
          </>
        

          
        )}
      </div>
    )}
    
    </>
  )
}

export default WorkersDataPage

