"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CompanyPage from './SignUpData/Company/page';
import FreelancePage from './SignUpData/Freelance/page';

function CompleteSignupDataPage() {
  const {t} = useTranslation();

  const [role, setRole] = useState(null);
 useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setRole(userData?.role);
    }
  }, []);
  const [openCompany , setOpenCompany] = useState(false);
  const [openFreelance , setOpenFreelance] = useState(false);

  const handleOpenSignupData = () => {
    if(role === 'company'){
      setOpenCompany(true);
    } else if(role === 'freelance'){
      setOpenFreelance(true);
    }
  }
  return (
    <>
      <MainLayout>
        <section className='flex justify-center mb-[11.11vh]'>
          {/* // */}
          <button 
            onClick={handleOpenSignupData}
            className='bg-[var(--color-primary)] rounded-[50px] flex gap-4 py-4 px-6 cursor-pointer'
          >
            <div className=' flex items-center'>
              <img src="/images/stars.svg" alt="" className='w-12 h-12 ' />
            </div>

            <div className='flex flex-col items-start text-[#fff]'>
              <span className=' font-bold text-xl'>{t('Complete your profile')}</span>
              <span className='font-normal text-base'>{t('To add your service, please complete your profile first.')}</span>
            </div>
            <div className='flex items-center '>
              <img src="/images/icons/arrow-right-go.svg" alt="" />
            </div>
          
          </button>

        </section>


        <section className='flex justify-center'> 
          <img src="/images/CompleteSignupData.svg" alt="" />
        </section>
        <section className='flex flex-col gap-5 items-center'>
          <p className='text-[#575757] text-2xl font-semibold '>{t('Your account is not activated yet!')}</p>
          <p className='text-[#656565] text-xl font-normal'>{t('Please complete your profile and wait for notification of account activation.')}</p>
        </section>
      </MainLayout>


    <CompanyPage open={openCompany} setOpen={setOpenCompany} />
    <FreelancePage open={openFreelance} setOpen={setOpenFreelance} />
    </>
  )
} 

export default CompleteSignupDataPage