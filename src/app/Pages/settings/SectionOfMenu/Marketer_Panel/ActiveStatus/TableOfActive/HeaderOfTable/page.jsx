"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function HeaderOfTablePage({ activeTab, setActiveTab }) {
  const { t } = useTranslation();

  return (
    <>
  {/* title and filter */}
<div className="flex justify-between mb-6">
  <div className="flex   gap-1">
    <p className="w-12 h-12 flex justify-center items-center bg-[#FEF0C7] rounded-[8px]">
      <img
        src="/images/icons/Transactions.svg"
        alt="transactions"
        className="w-6 h-6"
      />
    </p>

    <div>
      <p className="text-[#364152] text-base font-semibold">
      {t('Withdrawal transactions')}
      </p>
      <p className="text-[#697586] text-xs">
        {t('Track withdrawals and easily check their status.')}
      </p>
    </div>
  </div>

  {/* filter buttons (controlled) */}
  <div className="flex bg-[#EEF2F6] rounded-[8px] p-1 w-[280px]">
    <button
      onClick={() => setActiveTab('complete')}
      className={`px-2 py-3 flex-1 px-3 py-2 rounded-[6px] text-sm font-medium w-full transition-all duration-150 cursor-pointer ${
        activeTab === 'complete'
          ? 'bg-[#C69815] text-white shadow-sm'
          : 'text-[#364152] cursor-pointer'
      }`}
    >
      {t('Complete')}
    </button>

    <button
      onClick={() => setActiveTab('under_review')}
      className={`px-2 py-3 flex-1 px-3 py-2 rounded-[6px] text-sm font-medium w-full transition-all duration-150 cursor-pointer ${
        activeTab === 'under_review'
          ? 'bg-[#C69815] text-white shadow-sm'
          : 'text-[#364152] cursor-pointer'
      }`}
    >
      {t('Under review')}
    </button>
  </div>
</div>


    </>
  )
}

export default HeaderOfTablePage
