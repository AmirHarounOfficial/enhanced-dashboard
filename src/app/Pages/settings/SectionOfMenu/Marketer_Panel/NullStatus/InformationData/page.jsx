"use client";
import React from 'react'
import { useTranslation } from 'react-i18next';

function InformationDataPage({userData}) {
  const {t} = useTranslation();
  return (
    <div className='mb-8'>
      {/* name */}
      <div className='grid grid-cols-1 lg1:grid-cols-3 gap-3 mb-4'>

        <div>
          <p className='mb-1.5 text-[#364152] text-sm font-normal'>{t('First Name')}</p>
          <p className='border border-[#C8C8C8] bg-[#EEF2F6] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] p-3'>
            <span className='text-[#656565] text-sm font-normal'>{userData?.firstname}</span>
          </p>
        </div>

        <div>
          <p className='mb-1.5 text-[#364152] text-sm font-normal'>{t('Second name')}</p>
          <p className='border border-[#C8C8C8] bg-[#EEF2F6] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] p-3'>
            <span className='text-[#656565] text-sm font-normal'>{userData?.middlename}</span>
          </p>
        </div>

        <div>
          <p className='mb-1.5 text-[#364152] text-sm font-normal'>{t('Last Name')}</p>
          <p className='border border-[#C8C8C8] bg-[#EEF2F6] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] p-3'>
            <span className='text-[#656565] text-sm font-normal'>{userData?.lastname}</span>
          </p>
        </div>
      </div>

      {/* National ID number */}
      <div className='mb-4'>
        <p className='mb-1.5 text-[#364152] text-sm font-normal'>{t('National ID number')}</p>
        <p className='border border-[#C8C8C8] bg-[#EEF2F6] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] p-3'>
          <span className='text-[#656565] text-sm font-normal'>{userData?.national_id}</span>
        </p>
      </div>

        <div className='grid grid-cols-1 lg1:grid-cols-2 gap-3 mb-4'>

        <div>
          <p className='mb-1.5 text-[#364152] text-sm font-normal'>{t('Front national ID card photo')}</p>
          <p className='flex gap-1.5 border border-[#C8C8C8] bg-[#EEF2F6] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] p-3'>
            <img src="/images/icons/imageicon.svg" alt="" className='w-5 h-5'/>
            <span className='text-[#656565] text-sm font-normal'>البطاقة jbg.1</span>
          </p>
        </div>

        <div>
          <p className='mb-1.5 text-[#364152] text-sm font-normal'>{t('Back national ID card photo')}</p>
            
            <p className='flex gap-1.5 border border-[#C8C8C8] bg-[#EEF2F6] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] p-3'>
              <img src="/images/icons/imageicon.svg" alt="" className='w-5 h-5'/>
              <span className='text-[#656565] text-sm font-normal'>البطاقة jbg.2</span>
            </p>
        
        </div>

      
      </div>


    </div>
  )
}

export default InformationDataPage