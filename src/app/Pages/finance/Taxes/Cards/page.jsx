"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function CardsPage({ TaxesData }) {
  const { t } = useTranslation()

  const cards = [
    { icon: '/images/icons/Gross Profit.svg', bg: 'bg-[#F4EAD0]', labelKey: 'Gross Profit', value: TaxesData?.total_earnings },
    { icon: '/images/icons/cash.svg',         bg: 'bg-[#FEF0C7]', labelKey: 'Net Profit',   value: TaxesData?.withdraw_amount },
    { icon: '/images/icons/tax due.svg',      bg: 'bg-[#EEF2F6]', labelKey: 'tax due',      value: TaxesData?.total_taxes },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 mb-12 mt-5">
      {cards.map(({ icon, bg, labelKey, value }) => (
        <section key={labelKey} className="card-hover bg-white border border-[#E3E8EF] rounded-[8px] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className={"w-10 h-10 " + bg + " flex items-center justify-center rounded-[8px]"}>
              <img src={icon} alt="" className="w-5 h-5" />
            </div>
            <p className="text-[#697586] text-sm font-medium">{t(labelKey)}</p>
          </div>
          <p className="text-[#364152] text-xl font-semibold">{value} جنيه</p>
        </section>
      ))}
    </div>
  )
}

export default CardsPage
