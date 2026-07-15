"use client";
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import ConfirmationBtn from '../../../Components/Buttons/ConfirmationBtn';
import PreviousBtn from '../../../Components/Buttons/PreviousBtn';
import Link from 'next/link';
import SecondSection from '@/app/Components/login/SecondSection';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassVerifyEmailOtpThunk, forgetPassVerifyPhoneOtpThunk } from '@/redux/slice/Auth/AuthSlice';
import { useRouter } from 'next/navigation';


function VerifyNumberpage() {
  const { t } = useTranslation();
    const router = useRouter();


    const dispatch = useDispatch();
    const { loading, error, verified ,method } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  
    const [otp, setOtp] = useState(['', '', '', '']); // 4 separate digits

    useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("email"));
      setPhone(localStorage.getItem("phone"));
    }
  }, []);

const handleVerify = () => {
  const code = otp.join("");

  // Save OTP in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("otp", code);
  }

  if (method === "email") {
    dispatch(forgetPassVerifyEmailOtpThunk({ email, otp: code }));
  } else {
    dispatch(forgetPassVerifyPhoneOtpThunk({ phone, otp: code }));
  }
};

  

  
  useEffect(() => {
    if (verified) {
      router.push("/Auth/Login/CreateNewPassword"); // بعد التحقق الناجح
    }
  }, [verified, router]);


  const handleChange = (e, index) => {
    if (e.target.value.length === 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus(); 
      }
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus(); 
      }
    }
  };

  //timer
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

  // const handleResend = () => {
  //   setTimeLeft(10); // reset timer
  //   setCanResend(false); // hide resend link
  //   console.log("📩 Resend code request sent!");
  // };
  const handleResend = () => {
  setTimeLeft(30);
  setCanResend(false);

  if (method === "email") {
    dispatch(forgetPassVerifyEmailOtpThunk({ email }));
  } else {
    dispatch(forgetPassVerifyPhoneOtpThunk({ phone }));
  }
};
  return (
      <>

      <div className='p-8 flex justify-between gap-8  '>
        <section className='w-full mt-25 lg1:mt-50.5 '>
          {/* 📱Tablet screen only */}
          <div className="lg1:hidden flex justify-center gap-1 mb-17.5 lg1:mb-20">
            <img src="/images/LogoText.svg" alt="" />
            <img src="/images/Logo.svg" alt="" />
          </div>

          {/* logo */}
          <div className='WHLogA bg-[#EEF2F6] rounded-[100px] flex justify-center items-center mx-auto mb-5'>
            <p className='WHLogB bg-[#CDD5DF] rounded-[100px] flex justify-center items-center '>
            <img src="/images/icons/call-received.svg" className='WHLogC' alt="" />
            </p>
          </div>
          
          <div className='flex flex-col items-center '>
            <p className='text-[#C69815] text-xl font-bold'>{t('Verify number')}</p>
            <p className="text-center text-lg text-[#656565] mt-4 w-[400px]">
            {t("Please enter the code we sent to your number.")} 
              <span className="font-semibold text-[#C69815]"> *******15 </span> 
            {t("To verify the code")}
            </p>
          </div>

          <div className='my-10  '>
            <p className='text-[#4D4D4D] text-base font-medium mb-3 flex justify-center'>{t('verification code')}</p>
            <form className="flex gap-4 justify-center"dir="ltr">
              {[0, 1, 2, 3].map((i) => (
                // <input
                //   key={i}
                //   id={`otp-${i}`}
                //   type="text"
                //   maxLength="1"
                //   onChange={(e) => {
                //     const newOtp = [...otp];
                //     newOtp[i] = e.target.value;
                //     setOtp(newOtp);
                //     handleChange(e, i); 
                //   }}
                //   onKeyDown={(e) => handleKeyDown(e, i)}
                //   className="border border-[#C7C7C7] bg-[#fff] w-25 h-20 rounded-[6px] text-center text-lg"
                // />
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={otp[i]}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[i] = e.target.value.replace(/[^0-9]/g, ""); // numbers only
                    setOtp(newOtp);
                    handleChange(e, i);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="border border-[#C7C7C7] bg-[#fff] w-25 h-20 rounded-[6px] text-center text-lg"
                />
              ))}
            </form>

              <div className="mt-6">
                {!canResend ? (
                  <div className='flex justify-center items-center gap-2 '>
                    <span className="text-[#4D4D4D] text-base font-normal">
                      {t("Resend after")}
                    </span>
                    <span className="text-[#C69815] text-base font-bold">
                      00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                    </span>
                  </div>
                ) : (
                  <div className='flex justify-center '>
                    <button
                      onClick={handleResend}
                      className="text-[#C69815] text-base font-bold   "
                    >
                      {t("Resend")}
                    </button>
                  </div>  
                )}
              </div>
          </div>

          <div className='flex gap-6 justify-center mb-12'>
            <PreviousBtn path='/Auth/Login/ForgetPassword' className='w-64'  />
            <ConfirmationBtn         onClick={handleVerify}  className='w-64' />
          </div>
          
          <p className='flex justify-center gap-1.5'>
            <span className='text-[#697586] text-lg font-normal'>{t('Dont have an account?')}</span>
            <Link href='/Auth/Sign_in' className="text-[#9E7A11] text-lg font-medium">
              {t("Create an account")}
            </Link>
          </p>
        </section>
      

  
        
          {/* second section */}
      <SecondSection />
  
      </div>

    </>  
    )
}

export default VerifyNumberpage
