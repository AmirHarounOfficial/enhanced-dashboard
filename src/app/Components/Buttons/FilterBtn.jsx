"use client";
import React from 'react'
import { useTranslation } from 'react-i18next'

function FilterBtn({ className, onClick }) {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      className={`btn-filter ${className ?? ""}`}
    >
      <img src="/images/icons/FlterIcon.svg" alt="" className="w-4 h-4" />
      <span>{t('filter')}</span>
    </button>
  )
}

export default FilterBtn
