"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import TitleOfCardsPage from './TitleOfCards/page'

const iconShadowMap = {
  'bg-[#FEF0C7]': 'shadow-[0_2px_6px_rgb(198_152_21_/_0.18)]',
  'bg-[#B4F0CC]': 'shadow-[0_2px_6px_rgb(6_118_71_/_0.15)]',
  'bg-[#FEF3F2]': 'shadow-[0_2px_6px_rgb(240_68_56_/_0.15)]',
}

const cardDefs = (paymentsData) => [
  { icon: '/images/icons/cash.svg',          bg: 'bg-[#FEF0C7]', labelKey: 'cash',          value: paymentsData?.cash_booking_sum,     pct: paymentsData?.weekly_stats?.cash?.percent_change ?? 0 },
  { icon: '/images/icons/recovery.svg',      bg: 'bg-[#FEF0C7]', labelKey: 'recovery',      value: paymentsData?.refunded_sum,          pct: paymentsData?.weekly_stats?.refunded?.percent_change ?? 0 },
  { icon: '/images/icons/Total profits.svg', bg: 'bg-[#B4F0CC]', labelKey: 'Total profits', value: paymentsData?.total_booking_price,  pct: paymentsData?.weekly_stats?.booking?.percent_change ?? 0 },
  { icon: '/images/icons/credit card.svg',   bg: 'bg-[#FEF3F2]', labelKey: 'credit card',   value: paymentsData?.card_booking_sum,     pct: paymentsData?.weekly_stats?.card?.percent_change ?? 0 },
]

function CardsPage({ paymentsData }) {
  const { t } = useTranslation()

  return (
    <>
      <TitleOfCardsPage />
      <div className="grid grid-cols-2 lg1:grid-cols-4 gap-4 mb-12 stagger-children">
        {cardDefs(paymentsData).map(({ icon, bg, labelKey, value, pct }) => (
          <section key={labelKey} className="stat-card card-warm border border-[#E3E8EF] rounded-[12px] p-5 flex flex-col gap-4 cursor-default">
            <div className="flex items-center justify-between">
              <div className={`w-11 h-11 ${bg} flex items-center justify-center rounded-[10px] flex-shrink-0 ${iconShadowMap[bg] ?? ''}`}>
                <img src={icon} alt="" className="w-5 h-5" />
              </div>
              {pct >= 0 ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-[#067647] bg-[#DCFAE6] px-2 py-0.5 rounded-full border border-[#ABEFC6]">
                  {pct}%<img src="/images/icons/green_arrow_up.svg" alt="" className="w-3 h-3" />
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-semibold text-[#D92D20] bg-[#FEF3F2] px-2 py-0.5 rounded-full border border-[#FEE4E2]">
                  {pct}%<img src="/images/icons/red_arrow_down.svg" alt="" className="w-3 h-3" />
                </span>
              )}
            </div>

            <div>
              <p className="gold-shimmer-text text-[30px] leading-[1.1] counter-enter">{value ?? 0}</p>
              <p className="text-[#697586] text-sm font-normal mt-1.5">{t(labelKey)}</p>
            </div>

            <p className="text-[#9AA4B2] text-xs border-t border-[#F3F4F6] pt-2.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C69815] inline-block"></span>
              {t('Last week')}
            </p>
          </section>
        ))}
      </div>
    </>
  )
}

export default CardsPage
