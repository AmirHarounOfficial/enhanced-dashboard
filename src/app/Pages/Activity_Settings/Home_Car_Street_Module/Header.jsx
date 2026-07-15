'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getModuleTitle } from '../../../../../config/getModuleTitle'

function Header({current_module_key}) {
  const {t} = useTranslation()
  const title = getModuleTitle(current_module_key, t)

  return (
    <div className="page-hero">
      <p className='text-[#364152] text-xl font-semibold leading-tight'>{title}</p>
      <p className='text-[#697586] text-sm font-normal mt-0.5'>{t('Lets check your updates today')}</p>
    </div>
  )
}

export default Header
