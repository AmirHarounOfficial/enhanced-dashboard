

"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function WaitingListPage({ getWaitlist }) {
  const { t } = useTranslation()
  const getWaitlistData = getWaitlist?.data

  return (
    <div className='bg-white border border-[#E3E8EF] rounded-[8px] p-5'>
      <div className='flex justify-between items-center mb-4'>
        <p className='text-[#364152] text-base font-semibold'>{t('waiting list')}</p>
        <button className='text-[var(--color-primary)] text-sm font-medium cursor-pointer transition-opacity duration-150 hover:opacity-75'>
          {t('More')}
        </button>
      </div>

      <div className='flex flex-col divide-y divide-[#E3E8EF]'>
        {getWaitlistData?.map((Waitlist) => {
          const minutes = Waitlist?.avg_wait_time
          const isShort = minutes < 15
          return (
            <div key={Waitlist?.id} className='flex justify-between items-center py-3 first:pt-0 last:pb-0'>
              <div className='flex gap-3 items-center'>
                <div className='w-10 h-10 bg-[#F79009]/15 text-[#F79009] rounded-full flex items-center justify-center text-sm font-semibold'>
                  {Waitlist?.guest_name?.charAt(0)}
                </div>
                <div>
                  <p className='text-[#364152] text-sm font-medium mb-0.5'>{Waitlist?.guest_name}</p>
                  <p className='text-[#697586] text-xs'>
                    <span>{Waitlist?.guest_count}</span> {t('People')}
                  </p>
                </div>
              </div>

              <span className={`text-xs font-semibold px-2.5 py-1 rounded-2xl border ${
                isShort
                  ? 'bg-[#DCFAE6] border-[#067647] text-[#067647]'
                  : 'bg-[#FEE4E2] border-[#F97066] text-[#D92D20]'
              }`}>
                {minutes} {t('minute')}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WaitingListPage
