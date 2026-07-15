"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function No_Guest_Add({ setOpenAdd }) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center my-16">
      <img src="/images/clock.svg" alt="" className="w-20 h-20 opacity-75" />
      <p className="text-[#364152] text-lg font-semibold mt-6 mb-2">
        {t("There are no guests on the waiting list.")}
      </p>
      <p className="text-[#697586] text-sm mb-8">{t('Add a guest to get started')}</p>
      <button
        onClick={() => setOpenAdd(true)}
        className="btn-primary flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white h-11 px-6 rounded-[6px] cursor-pointer text-sm font-semibold"
      >
        <span>{t('Add guest')}</span>
        <img src="/images/icons/AddIcon.svg" className="w-4.5 h-4.5" />
      </button>
    </div>
  )
}

export default No_Guest_Add
