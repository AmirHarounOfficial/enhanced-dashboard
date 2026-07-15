"use client"
import AuthBrandPanel from '@/app/Components/login/AuthBrandPanel'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRegistration } from './RegistrationContext'

function Sign_inPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { updateRegistrationData } = useRegistration()

  const handleRole = (role) => {
    updateRegistrationData({ role })
    router.push('/Auth/Sign_in/Company')
  }

  return (
    <div className="h-dvh overflow-hidden flex" style={{ background: '#F8FAFC' }}>

      {/* Form panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 lg1:px-14 relative overflow-hidden">
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgb(198 152 21 / 0.06) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        <div className="w-full max-w-[420px] relative flex flex-col gap-8">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/images/LogoText.svg" alt="ZeTime" className="h-7" />
            <img src="/images/Logo.svg" alt="" className="h-7" />
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-[22px] font-bold text-[#364152] leading-snug mb-1">
              {t('Choose your account type to get started?')}
            </h1>
            <p className="text-[#697586] text-sm leading-relaxed">
              {t('Please select whether you are registering as a company or as an individual to provide you with a personalized experience that suits your needs.')}
            </p>
          </div>

          {/* Role cards */}
          <div className="flex gap-4">
            <button
              onClick={() => handleRole('company')}
              className="flex-1 flex flex-col items-center justify-center gap-3 py-7 border-2 border-[#C69815] rounded-[12px] cursor-pointer transition-all duration-150
                         hover:bg-[#FEF0C7]/40 hover:shadow-[0_4px_16px_rgb(198_152_21_/_0.18)] active:scale-[0.98]"
              style={{ background: 'linear-gradient(145deg, #fff 0%, #FFFEF9 100%)' }}
            >
              <img src="/images/Company.svg" alt="" className="w-14 h-14" />
              <span className="text-[#364152] text-base font-semibold">{t('Company')}</span>
            </button>

            <button
              onClick={() => handleRole('freelance')}
              className="flex-1 flex flex-col items-center justify-center gap-3 py-7 border-2 border-[#C69815] rounded-[12px] cursor-pointer transition-all duration-150
                         hover:bg-[#FEF0C7]/40 hover:shadow-[0_4px_16px_rgb(198_152_21_/_0.18)] active:scale-[0.98]"
              style={{ background: 'linear-gradient(145deg, #fff 0%, #FFFEF9 100%)' }}
            >
              <img src="/images/Freelance.svg" alt="" className="w-14 h-14" />
              <span className="text-[#364152] text-base font-semibold">{t('Freelance')}</span>
            </button>
          </div>

          {/* Already have account */}
          <p className="flex justify-center items-center gap-1.5 text-sm">
            <span className="text-[#697586]">{t('Already have an account?')}</span>
            <a href="/Auth/Login" className="text-[#9E7A11] font-semibold hover:underline underline-offset-2">
              {t('Log in')}
            </a>
          </p>

          <p className="text-center text-[#9AA4B2] text-xs">
            © {new Date().getFullYear()} ZeTime — جميع الحقوق محفوظة
          </p>
        </div>
      </div>

      <AuthBrandPanel />
    </div>
  )
}

export default Sign_inPage
