"use client";
import React from 'react'
import { useTranslation } from 'react-i18next';

function CustomerPage({bookingDetails}) {
  const { t } = useTranslation();
  const userDetails = bookingDetails?.user;
  return (
    <>
      {userDetails &&  (
        <section className='flex justify-between shadow-sm rounded-[8px] p-4 mt-6'>

          <div className='flex gap-3 '>
            {/* image   */}
            <div className=' flex items-center'>
              <div className='bg-[#E3E8EF] w-10 h-10 flex items-center justify-center rounded-[999px]'>
                <img src="/images/icons/Customer.svg" alt="" />
              </div>
            </div>
            {/* Name */}
            <div className='text-sm font-normal'>
              <p className='text-[#808080] '>{t('Customer')}</p>
              <p className='text-[#0B2C3E] mt-1 '>{bookingDetails?.user?.name} {bookingDetails?.user?.lastname}</p>
            </div>
          </div>

          <div className='flex items-center gap-4'>

            {/* chat */}
            <div className='border border-[#946DF1] w-10 h-10 flex justify-center items-center rounded-[999px]'>
              <img src="/images/icons/chatIcon.svg" alt="" />
            </div>

            {/* call */}
            <a
              href={`tel:${bookingDetails?.user?.phone}`}
              className='border border-[#946DF1] w-10 h-10 flex justify-center items-center rounded-[999px]'>
              <img src="/images/icons/call.svg" alt="" />
            </a>

          </div>
        
        </section>
      )}
    </>
  )
}

export default CustomerPage

