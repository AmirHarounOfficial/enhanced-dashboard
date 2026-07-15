"use client"
import AuthBrandPanel from '@/app/Components/login/AuthBrandPanel'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { VerifyPhoneOtpThunk, checkEnterPhoneThunk } from '@/redux/slice/Auth/AuthSlice'
import { useRegistration } from '../../RegistrationContext'

function PhoneOtpPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const { registrationData } = useRegistration()
  const { loading, error } = useSelector((state) => state.auth)

  const [otpValues, setOtpValues] = useState(["", "", "", ""])
  const [showError, setShowError] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [canResend, setCanResend] = useState(false)

  const handleChangeOtp = (e, index) => {
    const value = e.target.value
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otpValues]
      newOtp[index] = value
      setOtpValues(newOtp)
    }
    if (value.length === 1) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  useEffect(() => {
    if (!canResend && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000)
      return () => clearInterval(timer)
    }
    if (timeLeft === 0) setCanResend(true)
  }, [timeLeft, canResend])

  const handleResend = async () => {
    try {
      await dispatch(checkEnterPhoneThunk({
        phone: `${registrationData.country_code}${registrationData.phone}`
      })).unwrap()
      setTimeLeft(30)
      setCanResend(false)
      setOtpValues(["", "", "", ""])
      setShowError(false)
    } catch (err) {
      console.error("Failed to resend OTP:", err)
    }
  }

  const handleVerify = async () => {
    const otpCode = otpValues.join('')
    if (otpCode.length !== 4) { setShowError(true); return }
    try {
      await dispatch(VerifyPhoneOtpThunk({
        phone: `${registrationData.country_code}${registrationData.phone}`,
        otp: otpCode
      })).unwrap()
      router.push('/Auth/Sign_in/Company/SetPassword')
    } catch (err) {
      console.error("OTP verification failed:", err)
      setShowError(true)
    }
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

        <div className="w-full max-w-[400px] relative flex flex-col gap-5">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/images/LogoText.svg" alt="ZeTime" className="h-7" />
            <img src="/images/Logo.svg" alt="" className="h-7" />
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {[1,2,3].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                  ${s <= 2 ? 'bg-[#C69815] text-white' : 'bg-[#E3E8EF] text-[#9AA4B2]'}`}>
                  {s === 1 ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : s}
                </div>
                {s < 3 && <div className={`flex-1 h-0.5 ${s < 2 ? 'bg-[#C69815]' : 'bg-[#E3E8EF]'}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* Icon */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FEF0C7] flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#F5D469] flex items-center justify-center">
                <img src="/images/icons/call-received.svg" className="w-5 h-5" alt="" />
              </div>
            </div>
            <div>
              <h1 className="text-[22px] font-bold text-[#364152]">{t("Verify number")}</h1>
              <p className="text-[#697586] text-sm mt-1 max-w-[300px] leading-relaxed">
                {t('Please enter the code we sent you')}{' '}
                <span className="font-semibold text-[#C69815]">
                  {registrationData?.country_code}{registrationData?.phone || '***'}
                </span>
              </p>
            </div>
          </div>

          {/* OTP inputs */}
          <div className="flex flex-col gap-3">
            <p className="text-[#364152] text-sm font-medium text-center">{t("verification code")}</p>
            <div className="flex gap-3 justify-center" dir="ltr">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={otpValues[i]}
                  onChange={(e) => handleChangeOtp(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`w-14 h-14 border-2 rounded-[12px] text-center text-xl font-bold outline-none transition-all duration-150
                    bg-white text-[#364152] focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.12)]
                    ${otpValues[i] ? 'border-[#C69815] bg-[#FFFDF8]' : 'border-[#E3E8EF]'}`}
                />
              ))}
            </div>

            {(showError || error) && (
              <p className="text-[#F04438] text-sm text-center">
                {error || t("Invalid OTP code. Please try again.")}
              </p>
            )}

            {/* Timer / Resend */}
            <div className="flex justify-center">
              {!canResend ? (
                <span className="text-[#697586] text-sm">
                  {t("Resend after")}{' '}
                  <span className="text-[#C69815] font-bold">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                </span>
              ) : (
                <button onClick={handleResend} className="text-[#9E7A11] text-sm font-bold hover:underline">
                  {t("Resend")}
                </button>
              )}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            <Link href='/Auth/Sign_in/Company'
              className="flex-1 h-11 flex items-center justify-center border-2 border-[#C69815] text-[#C69815] rounded-[10px] text-sm font-semibold transition-all hover:bg-[#FEF0C7]/40">
              {t("the previous")}
            </Link>
            <button onClick={handleVerify} disabled={loading}
              className={`flex-1 h-11 rounded-[10px] text-white text-sm font-semibold tracking-wide transition-all duration-150
                ${loading ? 'opacity-60 cursor-not-allowed bg-[#C69815]' : 'btn-primary cursor-pointer'}`}
            >
              {loading ? t("Loading...") : t("the next")}
            </button>
          </div>

          <p className="flex justify-center items-center gap-1.5 text-sm">
            <span className="text-[#697586]">{t('Already have an account?')}</span>
            <a href="/Auth/Login" className="text-[#9E7A11] font-semibold hover:underline underline-offset-2">{t('Log in')}</a>
          </p>
        </div>
      </div>

      <AuthBrandPanel />
    </div>
  )
}

export default PhoneOtpPage
