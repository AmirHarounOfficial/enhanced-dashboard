"use client"
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmailOtpThunk, getProfileThunk } from '@/redux/slice/Setting/SettingSlice';

function OtpEmailPage({openOtpEmail ,setOpenOtpEmail ,setOpenEmail, email ,dispatch }) {
  const {t} = useTranslation()
  const {otpVerified, otpLoading, otpError ,profileData} = useSelector((state)=>state.setting)
  
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setOtpValues(newOtp);
    }

    if (value.length === 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // timer
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!canResend && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const handleResend = () => {
    setTimeLeft(30);
    setCanResend(false);
  };

  const handleConfirmation = () => {
    const otp = otpValues.join('');
    if (otp.length === 4) {
      dispatch(verifyEmailOtpThunk({otp}));
    }
  };

  // Handle successful OTP verification
  useEffect(() => {
    if (otpVerified) {
      dispatch(getProfileThunk())
        .unwrap()
        .then((data) => {
          const userData = data.provider || data;

          if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            window.dispatchEvent(new Event("storage"));
          }
          
          setOpenOtpEmail(false);
          setOpenEmail(false);
          setOtpValues(["", "", "", ""]);
          dispatch(resetOtpState());
        })
        .catch((error) => {
          console.error("Failed to fetch profile:", error);
    
          setOpenOtpEmail(false);
          setOpenEmail(false);
          setOtpValues(["", "", "", ""]);
          dispatch(resetOtpState());
        });
    }
  }, [otpVerified, setOpenOtpEmail, setOpenEmail, dispatch]);

  return (
    <Dialog
      open={openOtpEmail}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "ServicePage-dialog" }}
    >
      <button onClick={()=>setOpenOtpEmail(false)} className="modal-close" aria-label={t('cancel')}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
      </button>

      <div className="flex flex-col items-center">
        {/* icon */}
        <div className=" bg-[#EEF2F6] w-17.5 h-17.5 rounded-full flex items-center justify-center mb-1.5">
          <div className="bg-[#CDD5DF] w-12.5 h-12.5 rounded-full flex items-center justify-center">
            <img
              src="/images/icons/emailotp.svg"
              className="w-7.5 h-7.5"
              alt="email icon"
            />
          </div>
        </div>

        {/* title */}
        <p className="text-[var(--color-primary)] text-xl font-bold">{t('Email verification')}</p>

        <p className="text-center text-lg text-[#656565] mt-3 w-[75%]">
          {t('Please enter the code we sent you')}
          <span className="font-semibold text-[var(--color-primary)]"> {email || 'example@email.com'} </span>
          {t('To check the code')}
        </p>
      </div>

      <div className="mt-10 ">
        <p className="text-[#4D4D4D] text-base font-medium mb-3 flex justify-start px-20">
          {t('verification code')}
        </p>

        <form
          className="flex gap-4 justify-center"
          dir="ltr"
          onSubmit={(e) => e.preventDefault()}
        >
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength="1"
              value={otpValues[i]}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`w-12 h-12 border-2 rounded-[10px] text-center text-lg font-bold bg-white text-[#364152] outline-none focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.12)] ${otpValues[i] ? "border-[#C69815] bg-[#FFFDF8]" : "border-[#E3E8EF]"}`}
            />
          ))}
        </form>

        <div className="mt-6">
          {!canResend ? (
            <div className="flex justify-center items-center gap-2">
              <span className="text-[#4D4D4D] text-base">{t('Resend after')}</span>
              <span className="text-[var(--color-primary)] text-base font-bold">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={handleResend}
                className="text-[var(--color-primary)] text-base font-bold"
              >
                {t('Resend')}
              </button>
            </div>
          )}
        </div>
      </div>

      {otpError && (
        <div className="px-6 mb-4">
          <p className="text-[#F04438] text-sm text-center">{otpError?.message || t('Invalid OTP code. Please try again.')}</p>
        </div>
      )}

      <div className="modal-footer">
        <button
          onClick={handleConfirmation}
          disabled={otpLoading || otpValues.join('').length !== 4}
          className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold disabled:cursor-not-allowed"
        >
          {otpLoading ? t('Verifying...') : t('confirmation')}
        </button>
      </div>

    </Dialog>
  )
}

export default OtpEmailPage


