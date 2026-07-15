"use client";
import { logout } from '@/redux/slice/Auth/AuthSlice';
import { Dialog } from '@mui/material';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

function ConfirmationDonePage({open, setOpen}) {
  const {t} = useTranslation();
    //🟢logout
    const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());      
    router.push("/Auth/Login"); 
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

      <div className='mb-14'>
        <div className='flex justify-center gap-1  mb-3'>
          <img src="/images/LogoText.svg" alt="" />
          <img src="/images/Logo.svg" alt="" />
        </div>
        <p className='text-[#364152] text-xl font-normal text-center '>{t('Your journey starts now – enjoy our services')}</p>
      </div>

      <div className='flex justify-center mt-2'>
        <img src="/images/confirmationSignup.svg" alt="" />
      </div>

      <div className='mt-6 flex flex-col items-center gap-4'>
        <p className='text-[#202939] text-xl font-semibold'>
          {t('Your request has been sent successfully!')}
        </p>
        <p className='text-[#656565] text-lg font-normal w-[60%] text-center'>
          {t('The application will be reviewed and the account activation notification will be sent via email as soon as possible.')}
        </p>
      </div>

      <div className='my-12 p-6 w-full flex justify-center'>
        <button  onClick={handleLogout}
          className='w-[60%] h-15 bg-[var(--color-primary)] text-white text-base font-medium rounded-[6px] cursor-pointer '>
            {t('Log in')}
        </button>
      </div>   
      
    </Dialog>
    </>
  )
}

export default ConfirmationDonePage

