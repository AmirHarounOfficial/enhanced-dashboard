"use client"
import { changePhoneThunk } from '@/redux/slice/Setting/SettingSlice';
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


function PhoneDialogPage({openPhone, setOpenPhone ,setOpenOtpPhone ,phone ,setPhone ,countryCode , setCountryCode ,dispatch}) {
  const {t}= useTranslation();

  const handleSend =()=>{
    dispatch(changePhoneThunk({ phone, country_code: countryCode }))
    setOpenPhone(false)
    setOpenOtpPhone(true)
  }

  return (
    <>
    <Dialog
      open={openPhone}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "ServicePage-dialog" }}
    >
        <button onClick={()=>setOpenPhone(false)} className="modal-close" aria-label={t('cancel')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>

        <div className="flex flex-col gap-5 items-center justify-center mb-8">
          {/* icon */}
          <div className="bg-[#EEF2F6] w-17.5 h-17.5 rounded-full flex items-center justify-center">
            <div className="bg-[#CDD5DF] w-12.5 h-12.5 rounded-full flex items-center justify-center">
              <img
                src="/images/icons/call-received.svg"
                className="w-7.5 h-7.5"
                alt="phone icon"
              />
            </div>
          </div>

          {/* title */}
          <p className="text-[var(--color-primary)] text-xl font-bold">
            {t('Change mobile number')}
          </p>

          <p className='w-[60%] text-[#656565] text-lg font-normal text-center'> 
            {t('You can change and reconfirm your email address via a one-time verification code (OTP).')}
          </p>
        </div>

        <div className="px-6">
          {/* Mobile number */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-sm font-medium mb-2 block">
              {t('Mobile number')}
            </label>

            <div className="relative">
              <PhoneInput
              country={'eg'}
                value={`${countryCode}${phone}`}
                onChange={(value, country) => {
                  setCountryCode(`+${country.dialCode}`);
                  setPhone(value.replace(country.dialCode, ''));
                }}
                placeholder="000000000"
                containerClass="!w-full"
                inputClass="!w-full !h-[60px] !border !border-[#9AA4B2] !rounded-[6px] !pl-24 !text-left !shadow-sm !text-[#364152] placeholder-[#9A9A9A] focus:border-[#C69815] outline-none"
                buttonClass="!absolute !left-0 !top-0 !h-full !px-3 !flex !items-center !gap-2 !bg-transparent !border-r-0"
                dropdownClass="!absolute !left-0 !top-full !mt-1 !z-50 !border !border-[#C8C8C8] !rounded-md !shadow-sm"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              onClick={handleSend}
              className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold"
            >
              {t('send')}
            </button>

            <button
              onClick={()=>setOpenPhone(false)}
              className="btn-ghost flex-1"
            >
              {t('cancel')}
            </button>
          </div>
        </div>

    </Dialog>


    </>
    
  )
}

export default PhoneDialogPage

