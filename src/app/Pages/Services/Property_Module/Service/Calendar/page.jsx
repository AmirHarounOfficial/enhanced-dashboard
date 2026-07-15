"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { Suspense } from 'react'
import DetailsPage from './Details/page'
import { useTranslation } from 'react-i18next'
import CalenderDaysPage from './CalenderDays/page'

import { useRouter, useSearchParams } from 'next/navigation'

function CalendarContent() {
  const {t} = useTranslation()
  const router = useRouter()
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <MainLayout>
      <div className='mb-10'>
        <p className='text-[#364152] text-2xl font-medium mb-3'>{t('Property valuation')}</p>
        <p className='text-[#697586] text-base font-normal'>{t('Available this month')}</p>
      </div>

      <div className='border border-[#E6E6E6] p-8'>
        <DetailsPage/>

        <CalenderDaysPage/>
      </div>

      <div className='my-6 flex gap-4'>
        <button
          onClick={()=>router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/Availability?id=${id}`)}
          className='bg-[var(--color-primary)] text-white h-11 w-[20%] rounded-[6px] cursor-pointer'
        >
          {t('Add appointments')}
        </button>
        <button 
          onClick={() => router.push('/Pages/Services/Property_Module/Service')}
          className='border border-[#697586] text-[#697586] h-11 w-[15%] rounded-[6px] cursor-pointer'
        >
          {t('Return')}
        </button>
      </div>
      
    </MainLayout>
  )
}


export default function CalendarPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalendarContent />
    </Suspense>
  );
}
