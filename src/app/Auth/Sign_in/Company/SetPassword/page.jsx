"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AuthBrandPanel from '@/app/Components/login/AuthBrandPanel'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { FirstRegistrationThunk } from '@/redux/slice/Auth/AuthSlice'
import { useRegistration } from '../../RegistrationContext'

function SetPasswordPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const { registrationData, updateRegistrationData } = useRegistration()
  const { loading, error: apiError } = useSelector((state) => state.auth)

  const [password, setPassword] = useState(registrationData.password || '')
  const [password_confirmation, setPassword_confirmation] = useState(registrationData.password_confirmation || '')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [error, setError] = useState("")

  const rules = {
    uppercase: /[A-Z]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    number: /[0-9]/.test(password),
    length: password.length >= 8,
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "password") { setPassword(value); updateRegistrationData({ password: value }) }
    else { setPassword_confirmation(value); updateRegistrationData({ password_confirmation: value }) }
  }

  useEffect(() => {
    if (password_confirmation && password !== password_confirmation) setError(t("Password does not match"))
    else setError("")
  }, [password, password_confirmation, t])

  const handleConfirm = () => {
    if (error || !rules.length || !rules.uppercase || !rules.number || !rules.symbol) return
    const fullData = { ...registrationData, password, password_confirmation }
    dispatch(FirstRegistrationThunk(fullData)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') router.push('/Auth/Sign_in/Company/Confirmation')
    })
  }

  const inputClass = (hasError) => `w-full h-11 ps-4 pe-11 border rounded-[10px] bg-white
    text-[#364152] text-sm placeholder-[#9AA4B2] outline-none transition-all duration-150
    hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8]
    ${hasError ? 'border-[#F04438]' : 'border-[#E3E8EF]'}`

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
                  ${s <= 3 ? 'bg-[#C69815] text-white' : 'bg-[#E3E8EF] text-[#9AA4B2]'}`}>
                  {s <= 2 ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : s}
                </div>
                {s < 3 && <div className="flex-1 h-0.5 bg-[#C69815]" />}
              </React.Fragment>
            ))}
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-[22px] font-bold text-[#364152] leading-snug mb-1">
              {t('Create a password?')}
            </h1>
            <p className="text-[#697586] text-sm">
              {t('Choose a strong password to protect your account.')}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#364152] text-sm font-medium">{t("password")}</label>
              <div className="relative">
                <input
                  className={inputClass(false)}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t("Enter the new password")}
                  value={password}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-[#9AA4B2] hover:text-[#697586] transition-colors p-1">
                  <img src={showPassword ? "/images/icons/eyeClose.svg" : "/images/icons/eyeOpen.svg"} alt="" className="w-4 h-4" />
                </button>
              </div>

              {/* Password strength hints */}
              {isFocused && (
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {[
                    { key: 'uppercase', label: t("Use at least one uppercase letter") },
                    { key: 'symbol',    label: t("Use at least one symbol") },
                    { key: 'number',    label: t("Use at least one number") },
                    { key: 'length',    label: t("Your password must be at least 8 characters long") },
                  ].map(({ key, label }) => (
                    <div key={key} className={`flex items-center gap-1.5 text-xs ${rules[key] ? 'text-[#067647]' : 'text-[#9AA4B2]'}`}>
                      <span className={`w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center
                        ${rules[key] ? 'bg-[#DCFAE6]' : 'bg-[#E3E8EF]'}`}>
                        {rules[key] && (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1 4l2 2 4-4" stroke="#067647" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                      <span className="leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#364152] text-sm font-medium">{t("Confirm password")}</label>
              <div className="relative">
                <input
                  className={inputClass(!!error)}
                  type={showConfirm ? "text" : "password"}
                  name="password_confirmation"
                  placeholder={t("Re-enter the new password")}
                  value={password_confirmation}
                  onChange={handleChange}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-[#9AA4B2] hover:text-[#697586] transition-colors p-1">
                  <img src={showConfirm ? "/images/icons/eyeClose.svg" : "/images/icons/eyeOpen.svg"} alt="" className="w-4 h-4" />
                </button>
              </div>
              {error && <p className="text-[#F04438] text-xs">{error}</p>}
            </div>

            {apiError && (
              <p className="text-[#F04438] text-sm">
                {typeof apiError === 'string' ? apiError : (apiError.message || t("An error occurred"))}
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <Link href='/Auth/Sign_in/Company/PhoneOtp'
                className="flex-1 h-11 flex items-center justify-center border-2 border-[#C69815] text-[#C69815] rounded-[10px] text-sm font-semibold transition-all hover:bg-[#FEF0C7]/40">
                {t('the previous')}
              </Link>
              <button onClick={handleConfirm} disabled={loading || !!error}
                className={`flex-1 h-11 rounded-[10px] text-white text-sm font-semibold tracking-wide transition-all duration-150
                  ${loading || error ? 'opacity-60 cursor-not-allowed bg-[#C69815]' : 'btn-primary cursor-pointer'}`}
              >
                {loading ? t('Loading...') : t('confirmation')}
              </button>
            </div>
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

export default SetPasswordPage
