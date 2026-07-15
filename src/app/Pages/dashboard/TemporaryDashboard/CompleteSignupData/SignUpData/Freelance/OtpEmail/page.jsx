"use client"
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import FilesPage from '../Files/page';
import { useDispatch } from 'react-redux';
import { sendEmailThunk, VerifyEmailOtpThunk } from '@/redux/slice/Auth/AuthSlice';
import { useSignupData } from '../../../SignupDataContext';

function OtpEmailPage({open , setOpen ,setOpenPrevious}) {
  const {t} = useTranslation();
  const { signupData } = useSignupData();
  const dispatch = useDispatch();

  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const email = signupData.email;

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setOtpValues(newOtp);
    }

    if (value.length === 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // ⏱ Timer
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
    dispatch(sendEmailThunk({email}));
  };


  const [openFile , setOpenFile] = useState(false);

  const handlePrevious = () => {
    setOpen(false);
    setOpenPrevious(true);
  }

  const handleNext = async () => {
    const otp = otpValues.join("");
    if (otp.length === 4) {
        try {
            await dispatch(VerifyEmailOtpThunk({ email, otp })).unwrap();
            setOpen(false);
            setOpenFile(true);
        } catch (error) {
            console.error("OTP Verification failed", error);
        }
    }
  }

  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "COMPANY-dialog" }}
    >
      <section className="px-6 mt-6">
        <button
          onClick={() => setOpen(false)}
          className="border border-[#E3E8EF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
    
      </section>

      <section className="pt-6  flex justify-center flex-col gap-4 items-center">
        <p className="text-[#364152] font-normal text-2xl">{t('Simple steps to complete your account')}</p>
        <p className="text-[var(--color-primary)] font-semibold text-xl">{t('Enter the verification code')}</p>
      </section>

      <section className="py-11 px-12.5">
        <div className=' border border-[#E3E8EF] p-10'>
          {/* logo */}
          <div className='WHLogA bg-[#EEF2F6] rounded-[100px] flex justify-center items-center mx-auto mb-5'>
            <p className='WHLogB bg-[#CDD5DF] rounded-[100px] flex justify-center items-center'>
              <img src="/images/icons/emailotp.svg" className='WHLogC' alt="" />
            </p>
          </div>

          <div className='flex flex-col items-center'>
            <p className='text-[var(--color-primary)] text-xl font-bold'>
              {t('Email verification')}
            </p>
            <p className="text-center text-lg text-[#656565] mt-4 ">
                {t('Please enter the code we sent you')}
                <span className="font-semibold text-[var(--color-primary)]">
                  {email}
                </span>
                {' '}{t('To check the code')}
            </p>
          </div>

          <div className='my-10'>
            <p className='text-[#4D4D4D] text-base font-medium mb-3 flex justify-center'>
              {t('verification code')}
            </p>

            <form className="flex gap-4 justify-center" dir="ltr" onSubmit={(e) => e.preventDefault()}>
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength="1"
                  value={otpValues[i]}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="border border-[#C7C7C7] bg-white w-25 h-20 rounded-[6px] text-center text-lg outline-[var(--color-primary)]"
                />
              ))}
            </form>

            <div className="mt-6">
              {!canResend ? (
                <div className='flex justify-center gap-2'>
                  <span>{t("Resend after")}</span>
                  <span className="text-[var(--color-primary)] font-bold">
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                  </span>
                </div>
              ) : (
                <div className='flex justify-center'>
                  <button
                    onClick={handleResend}
                    className="text-[var(--color-primary)] font-bold"
                  >
                    {t("Resend")}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className='flex gap-6 justify-center mb-12'>
            <button 
              onClick={handlePrevious}
              className="px-4 py-2 w-64 h-11 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[6px] cursor-pointer"
            >
              {t('the previous')}
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 w-64 h-11 bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer"
            >
              {t('the next')}
            </button>
          </div>

        </div>
      </section>
    </Dialog>

    <FilesPage 
      setOpenPrevious={setOpenPrevious}
      open={openFile} 
      setOpen={setOpenFile} />
    </>
  )
}

export default OtpEmailPage


