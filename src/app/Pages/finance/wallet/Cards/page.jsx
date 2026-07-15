"use client"
import React, { useState } from 'react'
import TitleOfCardsPage from './TitleOfCards/page'
import { useTranslation } from 'react-i18next'
import WithdrawDialogPage from './WithdrawDialog/page'

function CardsPage({ TaxesData }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <TitleOfCardsPage />

      <div className="grid grid-cols-2 gap-6">
        {/* Available balance */}
        <section className="card-hover bg-white border border-[#E3E8EF] p-6 rounded-[8px]">
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-[#FEF0C7] w-12 h-12 flex justify-center items-center rounded-[8px]">
              <img src="/images/icons/Available balance.svg" alt="" className="w-6 h-6" />
            </div>
            <p className="text-[#697586] text-sm font-medium">{t('Available balance')}</p>
          </div>
          <p className="text-[#364152] text-2xl lg1:text-3xl font-semibold">{TaxesData?.total_earnings} جنية</p>
        </section>

        {/* Available for withdrawal */}
        <section className="card-hover bg-white border border-[#E3E8EF] p-6 rounded-[8px]">
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-[#FEF0C7] w-12 h-12 flex justify-center items-center rounded-[8px]">
              <img src="/images/icons/Available_withdrawal.svg" alt="" className="w-6 h-6" />
            </div>
            <p className="text-[#697586] text-sm font-medium">{t('Available balance for withdrawal')}</p>
          </div>
          <p className="text-[#364152] text-2xl lg1:text-3xl font-semibold mb-5">{TaxesData?.withdraw_amount} جنية</p>
          <button
            onClick={() => setOpen(true)}
            className="btn-primary w-full h-11 bg-[var(--color-primary)] text-white rounded-[6px] text-sm font-semibold cursor-pointer"
          >
            {t('to withdraw')}
          </button>
        </section>
      </div>

      <WithdrawDialogPage open={open} setOpen={setOpen} />
    </>
  )
}

export default CardsPage
