import React from 'react'
import { useTranslation } from 'react-i18next'

function ExtractBtn() {
  const { t } = useTranslation()
  return (
    <button className='btn-filter flex justify-center items-center gap-2'>
      <img src="/images/icons/extract.svg" alt="" className="w-4 h-4 opacity-80" />
      <span className="text-sm font-medium">{t('Extract')}</span>
    </button>
  )
}

export default ExtractBtn
