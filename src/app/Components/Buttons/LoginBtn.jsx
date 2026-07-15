
"use client";
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next';

function LoginBtn() {
  const { t } = useTranslation()
  return (
    <Link
      href='/Auth/Login'
      className="
        text-[#9E7A11] text-base font-semibold
        transition-all duration-150
        hover:text-[#C69815]
        underline-offset-2 hover:underline
      "
    >
      {t('Log in')}
    </Link>
  )
}

export default LoginBtn
