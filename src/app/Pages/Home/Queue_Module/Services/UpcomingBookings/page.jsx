"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function UpcomingBookingsPage({ getUpcoming }) {
  const { t } = useTranslation()
  const getUpcomingData = getUpcoming?.data

  return (
    <div className='bg-white border border-[#E3E8EF] rounded-[8px] p-5'>
      <div className='flex justify-between items-center mb-4'>
        <p className='text-[#364152] text-base font-semibold'>{t('Upcoming bookingss')}</p>
        <button className='text-[var(--color-primary)] text-sm font-medium cursor-pointer transition-opacity duration-150 hover:opacity-75'>
          {t('More')}
        </button>
      </div>

      <div className='flex flex-col divide-y divide-[#E3E8EF]'>
        {getUpcomingData?.map((Upcoming) => (
          <div key={Upcoming?.id} className='flex justify-between items-center py-3 first:pt-0 last:pb-0'>
            <div className='flex gap-3 items-center'>
              <div className='w-10 h-10 bg-[#C69815]/15 text-[#C69815] rounded-[8px] flex items-center justify-center text-sm font-semibold'>
                {Upcoming?.guest_name?.charAt(0) ?? 'j'}
              </div>
              <div>
                <p className='text-[#364152] text-sm font-medium mb-0.5'>{Upcoming?.guest_name}</p>
                <div className='flex items-center gap-3'>
                  <p className='text-[#697586] text-xs'>
                    <span>{Upcoming?.guest_count} </span>
                    <span>{t('guests')}</span>
                  </p>
                  <p className='text-[#697586] text-xs'>{Upcoming?.reservation_date}</p>
                </div>
              </div>
            </div>

            <button className='bg-[#F8FAFC] border border-[#E3E8EF] w-8 h-8 rounded-full flex justify-center items-center cursor-pointer
                               transition-colors duration-150 hover:border-[var(--color-primary)] hover:bg-[#C69815]/5'>
              <img src="/images/icons/arrow-right-blackk.svg" alt="" className='w-4 h-4' />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingBookingsPage
