import React from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

function No_account() {
  const { t } = useTranslation()
  return (
    <p className="flex justify-center items-center gap-1.5 text-sm">
      <span className="text-[#697586]">{t("Dont have an account?")}</span>
      <Link href='/Auth/Sign_in' className="text-[#9E7A11] font-semibold hover:underline underline-offset-2 transition-opacity hover:opacity-80">
        {t("Create an account")}
      </Link>
    </p>
  )
}

export default No_account
