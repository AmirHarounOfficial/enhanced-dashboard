"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

const boxDefs = (summary) => [
  { icon: '/images/icons/calendar-true_yellow.svg', bg: 'bg-[#F4EAD0]', labelKey: 'today',   value: summary?.today    },
  { icon: '/images/icons/date-time_blue.svg',        bg: 'bg-[#FEF0C7]', labelKey: 'Coming',  value: summary?.upcoming },
  { icon: '/images/icons/calendar-remove-red2.svg',  bg: 'bg-[#FEE4E2]', labelKey: 'Late',    value: summary?.late     },
]

function BoxPage({ getReservationsSummary }) {
  const { t } = useTranslation()

  return (
    <section className="mb-10 grid grid-cols-3 gap-4">
      {boxDefs(getReservationsSummary).map(({ icon, bg, labelKey, value }) => (
        <div key={labelKey} className="card-hover bg-white border border-[#E3E8EF] rounded-[8px] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className={"w-10 h-10 flex justify-center items-center rounded-[8px] " + bg}>
              <img src={icon} className="w-5 h-5" />
            </div>
            <p className="text-[#697586] text-sm font-medium">{t(labelKey)}</p>
          </div>
          <p className="text-[#364152] text-2xl font-semibold">{value ?? 0}</p>
        </div>
      ))}
    </section>
  )
}

export default BoxPage

