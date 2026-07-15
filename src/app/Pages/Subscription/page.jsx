"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next';

function SubscriptionPage() {
  const {t} = useTranslation();
  return (
    <MainLayout>
      <div className="page-hero">
        <p className='text-[#364152] text-xl font-semibold leading-tight'>{t('Subscription')}</p>
        <p className='text-[#697586] text-sm mt-0.5'>{t('Manage your subscription plan.')}</p>
      </div>

      <section className='flex justify-center mt-8'>
        <Link
          href='/Pages/Subscription/Subscribe'
          className='
            btn-primary
            bg-[var(--color-primary)] rounded-[8px]
            py-3 px-8 h-10
            cursor-pointer flex items-center justify-center gap-2
          '
        >
          <span className='text-white text-sm font-semibold'>{t('Subscribe now')}</span>
        </Link>
      </section>
    </MainLayout>
  )
}

export default SubscriptionPage

