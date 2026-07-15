"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import Link from 'next/link';
import React from 'react'
import { useTranslation } from 'react-i18next'

function AcceptAccountPage() {
  const {t} = useTranslation();

  return (
    <>
      <MainLayout>
        <section className='flex justify-center mb-[11.11vh]'>
          <div className='bg-[var(--color-primary)] rounded-[50px] flex gap-4 py-4 px-6'>
            <div className=' flex items-center'>
              <img src="/images/accept.svg" alt="" className='w-12 h-12 ' />
            </div>

            <div className='flex flex-col items-start text-[#fff]'>
              <span className=' font-medium text-xl mb-3'>{t('Your account has been successfully activated.')}</span>
              <span className='font-normal text-base'>{t('You can now benefit from all our services and start your journey with us.')}</span>
            </div>
          
          
          </div>
        </section>


        <section className='flex justify-center'> 
          <img src="/images/AcceptAccount.svg" alt="" />
        </section>
        <section className='flex flex-col gap-2 items-center mt-8'>
          <p className='text-[#575757] text-2xl font-semibold '>{t('Subscribe now to be able to add your services')}</p>
          <p className='text-[#656565] text-xl font-normal'>{t('To add your services and benefit from the platform s full benefits, subscribe to one of our packages.')}</p>
        </section>

        <section className='mb-5 flex justify-center mt-8'>
          <Link href='/Pages/Subscription/Subscribe' className='bg-[var(--color-primary)] rounded-[6px] py-2.5 px-4 w-62.5 h-11 cursor-pointer flex items-center justify-center'>
            <span className='text-[#fff] text-base font-medium'>{t('Subscribe now')}</span>
          </Link>
        </section>
      </MainLayout>


    </>
  )
}

export default AcceptAccountPage

