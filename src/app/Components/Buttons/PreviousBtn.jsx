import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

function PreviousBtn({ onClick, className, path }) {
  const { t } = useTranslation()

  return (
    <Link href={path}>
      <button
        onClick={onClick}
        className={`
          h-12
          px-6 py-2.5
          bg-white text-[#C69815]
          border border-[#C69815]
          text-sm font-medium
          rounded-[6px]
          cursor-pointer
          transition-all duration-150
          hover:bg-[#C69815]/8
          active:scale-[0.97]
          ${className}
        `}
      >
        {t("the previous")}
      </button>
    </Link>
  )
}

export default PreviousBtn
