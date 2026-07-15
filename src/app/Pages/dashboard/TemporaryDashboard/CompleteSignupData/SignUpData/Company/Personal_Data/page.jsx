"use client"
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import MapDialog from './MapDialog';
import OtpEmailPage from '../OtpEmail/page';
import { useSignupData } from '../../../SignupDataContext';
import { sendEmailThunk } from '@/redux/slice/Auth/AuthSlice';
import { useDispatch } from 'react-redux';

function Personal_DataPage({ open, setOpen }) {
  const {t} = useTranslation();
  const { signupData, updateSignupData } = useSignupData();
  const dispatch = useDispatch();

  const [openMap, setOpenMap] = useState(false);
  
  const handleLocationConfirm = (location) => {
    updateSignupData({
        address: location.address,
        latitude: location.latitude,
        longitude: location.longitude,
        country: location.country,
        state: location.state,
        city: location.city
    });
  };

  const [openOtpEmail, setOpenOtpEmail] = useState(false);
const handleNext = async () => {
    if (!signupData.email) return; // Add validation toast here if needed
    try {
        await dispatch(sendEmailThunk({ email: signupData.email })).unwrap();
        setOpen(false);
        setOpenOtpEmail(true);
    } catch(error) {
        console.error("Failed to send OTP:", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSignupData({ [name]: value });
  };

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
        <p className="text-[var(--color-primary)] font-semibold text-xl">{t('Enter your personal details')}</p>
      </section>
      <section className="py-11 px-12.5">
        <div className=' border border-[#E3E8EF] p-10'>
        {/* Form */}
          {/* Company Name */}
          <div className='flex flex-col gap-3'>
            <p className='text-[#364152] text-base font-normal'>{t('Company Name')}</p>
            <input 
              type="text"
              name="companyName"
              value={signupData.companyName}
              onChange={handleChange}
              placeholder={t('Enter company name')}
              className='border border-[#C8C8C8] p-3 rounded-[6px] outline-none'
            />
          </div>

          {/* Email */}
          <div className='flex flex-col gap-3 mt-6'>
            <p className='text-[#364152] text-base font-normal'>{t('Email')}</p>
            <input 
              type="text"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              placeholder={t('Enter your email address')}
              className='border border-[#C8C8C8] p-3 rounded-[6px] outline-none'
            />
          </div>

          {/* Number of employees */}
          <div className='flex flex-col gap-3 mt-6'>
            <p className='text-[#364152] text-base font-normal'>{t('Number of employees')}</p>
            <input 
              type="text"
              name="workers_count"
              value={signupData.workers_count}
              onChange={handleChange}
              placeholder={t('Enter the number of employees')}
              className='border border-[#C8C8C8] p-3 rounded-[6px] outline-none'
            />
          </div>

          {/* Years of experience */}
          <div className='flex flex-col gap-3 mt-6'>
            <p className='text-[#364152] text-base font-normal'>{t('Years of experience')}</p>
            <input 
              type="text"
              name="yearsofexperience"
              value={signupData.yearsofexperience}
              onChange={handleChange}
              placeholder={t('Enter the number of years of experience')}
              className='border border-[#C8C8C8] p-3 rounded-[6px] outline-none'
            />
          </div>

          {/* Company address */}
          <div className="flex flex-col gap-3 mt-6" onClick={() => setOpenMap(true)}>
            <p className="text-[#364152] text-base font-normal">
              {t("Company address")}
            </p>

            <div className="relative">
              {/* icon */}
              <span className="absolute left-3 top-4 ">
                <img src="/images/icons/LocationBlack.svg" alt="location" className='w-6 h-6' />
              </span>
              
              <textarea
                readOnly
                value={signupData.address || ''}
                // placeholder={t("Click to select location on map")}
                className="border border-[#C8C8C8] min-h-14  rounded-[6px] outline-none w-full px-3 py-1 "
              />
            </div>
          </div>

          {/* btn */}
          <div className=' mt-10'>
            <button 
              onClick={handleNext}
              className='bg-[var(--color-primary)] text-white w-full h-14 cursor-pointer rounded-[6px] '
            >
              {t('the next')}
            </button>
          </div>

        </div>
      </section>
    </Dialog>

    <MapDialog open={openMap} handleClose={() => setOpenMap(false)} onConfirm={handleLocationConfirm} />
    
    <OtpEmailPage
      setOpenPrevious={setOpen}
      open={openOtpEmail} 
      setOpen={setOpenOtpEmail} 
    />
  </>
  )
}

export default Personal_DataPage

