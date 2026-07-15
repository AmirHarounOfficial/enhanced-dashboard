"use client"
import { changeEmailThunk } from '@/redux/slice/Setting/SettingSlice';
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function EmailDialogPage({openEmail , setOpenEmail , setOpenOtpEmail ,email , setEmail ,dispatch  }) {
  const {t}= useTranslation();
  
  const HandleOtpEmail =()=>{
    dispatch(changeEmailThunk({email}))
    setOpenEmail(false);
    setOpenOtpEmail(true)
  }
  return (
    <>
      <Dialog
        open={openEmail}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "ServicePage-dialog" }}
      >
        <button onClick={()=>setOpenEmail(false)} className="modal-close" aria-label={t('cancel')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>

        <div className="flex flex-col gap-3 items-center justify-center mb-8">
          {/* icon */}
          <div className="bg-[#EEF2F6] w-17.5 h-17.5 rounded-full flex items-center justify-center mb-1.5">
            <div className="bg-[#CDD5DF] w-12.5 h-12.5 rounded-full flex items-center justify-center">
              <img
                src="/images/icons/emailotp.svg"
                className="w-7.5 h-7.5"
                alt="email icon"
              />
            </div>
          </div>

          {/* title */}
          <p className="text-[var(--color-primary)] text-xl font-bold">
            {t('Change email')}
          </p>
          <p className='w-[60%] text-[#656565] text-lg font-normal text-center'> 
            {t('You can change and reconfirm your email address via a one-time verification code (OTP).')}
          </p>
        </div>

        <div className="px-6">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-sm font-medium mb-2 block">
              {t('New email')}
            </label>
            <input
              type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder={t('Enter your new email address')}
              className="w-full h-11 px-4 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
            />
          </div>

          <div className="modal-footer">
            <button
              onClick={HandleOtpEmail}
              className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold">
              {t('send')}
            </button>

            <button
              onClick={()=>setOpenEmail(false)}
              className="btn-ghost flex-1">
              {t('cancel')}
            </button>
          </div>
        </div>

      </Dialog>


    </>
  
  )
}

export default EmailDialogPage

