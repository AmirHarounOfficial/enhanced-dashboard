import React from 'react'
import { useTranslation } from 'react-i18next'

function Box({getwaitlistAnalysis}) {
  const {t} = useTranslation()
  const data = getwaitlistAnalysis?.data

  const cardBase = `card-hover bg-white border border-[#E3E8EF] rounded-[8px] p-5 flex flex-col gap-3`;

  return (
    <div className='my-8 grid grid-cols-3 gap-5'>

      {/* Expected guests */}
      <div className={cardBase}>
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-2.5'>
            <span className='w-10 h-10 flex justify-center items-center bg-[#F4EAD0] rounded-[8px] flex-shrink-0'>
              <img src="/images/icons/user-group_yellow.svg" alt="" className="w-5 h-5" />
            </span>
            <p className='text-[#697586] text-sm font-normal'>{t('Expected guests')}</p>
          </div>
          <span className='bg-[#F9F5E8] text-[var(--color-primary)] flex items-center gap-1 py-1 px-2.5 rounded-full text-xs font-medium'>
            <img src="/images/icons/tick-yellow.svg" className="w-3.5 h-3.5" />
            {t('Active list')}
          </span>
        </div>
        <p className='text-[#202939] text-2xl font-semibold'>{data?.waitinglist_count ?? 0}</p>
        <p className='text-[#9AA4B2] text-xs'>{t('during')} 3 {t('past hours')}</p>
      </div>

      {/* Average wait time */}
      <div className={cardBase}>
        <div className='flex items-center gap-2.5'>
          <span className='w-10 h-10 flex justify-center items-center bg-[#FEF0C7] rounded-[8px] flex-shrink-0'>
            <img src="/images/icons/clock_orange.svg" alt="" className="w-5 h-5" />
          </span>
          <p className='text-[#697586] text-sm font-normal'>{t('Average wait time')}</p>
        </div>
        <div className='flex items-baseline gap-1.5'>
          <span className='text-[#202939] text-2xl font-semibold'>{data?.avg_wait_time ?? 0}</span>
          <span className='text-[#9AA4B2] text-sm'>{t('minute')}</span>
        </div>
      </div>

      {/* Ready for the seat */}
      <div className={cardBase}>
        <div className='flex items-center gap-2.5'>
          <span className='w-10 h-10 flex justify-center items-center bg-[#FEF0C7] rounded-[8px] flex-shrink-0'>
            <img src="/images/icons/checkmark-circle-blue.svg" alt="" className="w-5 h-5" />
          </span>
          <p className='text-[#697586] text-sm font-normal'>{t('Ready for the seat')}</p>
        </div>
        <p className='text-[#202939] text-2xl font-semibold'>{data?.available_tables ?? 0}</p>
        <p className='text-[#9AA4B2] text-xs'>{t('tables available')}</p>
      </div>

    </div>
  )
}

export default Box
