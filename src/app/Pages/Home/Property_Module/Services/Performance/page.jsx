"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PerformancePage({ analysisProperties }) {
  const { t } = useTranslation()
  const m = analysisProperties?.monthly_analysis

  const stats = [
    { label: 'Total bookings', value: m?.bookings_count, gold: false },
    { label: 'Occupancy rate', value: m?.total_occupancy != null ? `${m.total_occupancy}%` : '—', gold: false },
    { label: 'profits',        value: m?.total_profit,   gold: true  },
    { label: 'Average rating', value: m?.avg_rating,     gold: false, star: true },
  ]

  return (
    <div className='bg-white border border-[#E3E8EF] rounded-[8px] p-4 mb-4'>
      <p className='text-[#364152] text-base font-semibold mb-3'>{t('Performance this month')}</p>
      <div className='border-t border-[#E3E8EF]' />
      <div className='grid grid-cols-2 gap-4 pt-4'>
        {stats.map(({ label, value, gold, star }) => (
          <div key={label}>
            <p className='text-[#697586] text-xs font-medium mb-1'>{t(label)}</p>
            {star ? (
              <p className='flex items-center gap-1'>
                <img src="/images/icons/star.svg" alt="star" className='w-4 h-4' />
                <span className='text-[#364152] text-sm font-semibold'>{value ?? '—'}</span>
              </p>
            ) : (
              <p className={`text-sm font-semibold ${gold ? 'text-[var(--color-primary)]' : 'text-[#364152]'}`}>
                {value ?? '—'}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PerformancePage
