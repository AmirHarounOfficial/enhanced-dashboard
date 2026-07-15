"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useRouter } from "next/navigation"
import { useRegistration } from '../../RegistrationContext'
import { useDispatch, useSelector } from 'react-redux'
import { checkEnterPhoneThunk } from '@/redux/slice/Auth/AuthSlice'
import AuthBrandPanel from '@/app/Components/login/AuthBrandPanel'

function CompanyInformationPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { registrationData, updateRegistrationData } = useRegistration()
  const { loading, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    firstname: registrationData?.firstname || '',
    lastname: registrationData?.lastname || '',
    phone: registrationData?.phone || '',
    country_code: registrationData?.country_code || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const updated = { ...formData, [name]: value }
    setFormData(updated)
    updateRegistrationData(updated)
  }

  const handlePhoneChange = (value, country) => {
    const dialCode = `+${country.dialCode}`
    const phoneNumber = value.replace(country.dialCode, '')
    const updated = { ...formData, country_code: dialCode, phone: phoneNumber }
    setFormData(updated)
    updateRegistrationData(updated)
  }

  const handleNext = async () => {
    updateRegistrationData(formData)
    try {
      await dispatch(checkEnterPhoneThunk({
        phone: `${formData.country_code}${formData.phone}`
      })).unwrap()
      router.push("/Auth/Sign_in/Company/PhoneOtp")
    } catch (err) {
      console.error("Failed to send OTP:", err)
    }
  }

  const inputClass = `w-full h-11 px-4 border border-[#E3E8EF] rounded-[10px] bg-white
    text-[#364152] text-sm placeholder-[#9AA4B2] outline-none transition-all duration-150
    hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8]`

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
                  ${s === 1 ? 'bg-[#C69815] text-white' : 'bg-[#E3E8EF] text-[#9AA4B2]'}`}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-0.5 ${s < 1 ? 'bg-[#C69815]' : 'bg-[#E3E8EF]'}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-[22px] font-bold text-[#364152] leading-snug mb-1">
              {t('Create a new account!')}
            </h1>
            <p className="text-[#697586] text-sm">
              {t('Complete simple steps to start your journey with us.')}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* First name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#364152] text-sm font-medium">{t("First Name")}</label>
              <input type="text" name="firstname" value={formData.firstname} onChange={handleChange}
                className={inputClass} placeholder={t("Enter first name")} />
            </div>

            {/* Last name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#364152] text-sm font-medium">{t("Last Name")}</label>
              <input type="text" name="lastname" value={formData.lastname} onChange={handleChange}
                className={inputClass} placeholder={t("Enter last name/family name")} />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#364152] text-sm font-medium">{t("Mobile number")}</label>
              <PhoneInput
                country={'sa'}
                value={`${formData.country_code}${formData.phone}`}
                onChange={handlePhoneChange}
                placeholder="000000000"
                enableSearch
                searchPlaceholder="ابحث عن دولة..."
                disableSearchIcon
                containerClass="!w-full"
                inputClass="!text-left"
                dropdownClass="phone-dropdown-ltr"
              />
            </div>

            {error && (
              <p className="text-[#F04438] text-sm">
                {typeof error === 'string' ? error : (error.message || t("An error occurred"))}
              </p>
            )}

            <button onClick={handleNext} disabled={loading}
              className={`w-full h-11 rounded-[10px] text-white text-sm font-semibold tracking-wide transition-all duration-150
                ${loading ? 'opacity-60 cursor-not-allowed bg-[#C69815]' : 'btn-primary cursor-pointer'}`}
            >
              {loading ? t('Loading...') : t('the next')}
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

export default CompanyInformationPage
