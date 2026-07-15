"use client"
import AuthBrandPanel from '@/app/Components/login/AuthBrandPanel'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

function ConfirmationPage() {
  const { t } = useTranslation()

  return (
    <div className="h-dvh overflow-hidden flex" style={{ background: '#F8FAFC' }}>

      {/* Form panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 lg1:px-14 relative overflow-hidden">
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgb(198 152 21 / 0.06) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        <div className="w-full max-w-[400px] relative flex flex-col items-center gap-6 text-center">

          {/* Logo */}
          <div className="flex items-center gap-2 self-start">
            <img src="/images/LogoText.svg" alt="ZeTime" className="h-7" />
            <img src="/images/Logo.svg" alt="" className="h-7" />
          </div>

          {/* All steps done */}
          <div className="flex items-center gap-2 w-full">
            {[1,2,3].map((s) => (
              <React.Fragment key={s}>
                <div className="w-6 h-6 rounded-full bg-[#C69815] flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {s < 3 && <div className="flex-1 h-0.5 bg-[#C69815]" />}
              </React.Fragment>
            ))}
          </div>

          {/* Success illustration */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FEF0C7 0%, #F5D469 100%)' }}>
              <div className="w-14 h-14 rounded-full bg-[#C69815] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M5 14l6 6 12-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <img src="/images/ConfirmationDone.svg" alt="" className="w-40 opacity-90" />
          </div>

          {/* Text */}
          <div>
            <h1 className="text-[22px] font-bold text-[#364152] mb-2">
              {t('Your account has been created successfully.')}
            </h1>
            <p className="text-[#697586] text-sm leading-relaxed max-w-[320px]">
              {t('You have successfully created your account, log in now and enjoy our services.')}
            </p>
          </div>

          {/* CTA */}
          <Link href='/Auth/Login' className="w-full">
            <button className="w-full h-11 rounded-[10px] text-white text-sm font-semibold tracking-wide btn-primary cursor-pointer transition-all duration-150">
              {t('Log in')}
            </button>
          </Link>

          <p className="text-[#9AA4B2] text-xs">
            © {new Date().getFullYear()} ZeTime — جميع الحقوق محفوظة
          </p>
        </div>
      </div>

      <AuthBrandPanel />
    </div>
  )
}

export default ConfirmationPage
