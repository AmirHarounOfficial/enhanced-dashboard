import React from 'react'
import LoginBtn from '../Buttons/LoginBtn'
import { useTranslation } from 'react-i18next'

function Have_an_account() {
  const {t} = useTranslation()
  return (
    <>
    <div className="flex justify-center gap-1.5">
      <p className="text-[#697586] text-lg font-normal">{t('Already have an account?')} </p>
      <LoginBtn />
    </div>

    </>
  )
}

export default Have_an_account