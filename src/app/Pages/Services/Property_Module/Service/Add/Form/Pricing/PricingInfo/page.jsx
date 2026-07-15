"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PricingInfoPage({formData , setFormData, fieldErrors, setFieldErrors}) {
  const {t} = useTranslation()
  return (
    <>
    <div className='flex gap-2 mb-6'>
      <img src="/images/icons/money-bag_blue.svg" alt="" />
        <p className='text-[#364152] text-lg font-medium'>{t('Pricing')}</p>
    </div>

    <div className='border border-[#E3E8EF] p-4'>
      {/*  */}
      <div className='grid grid-cols-2 gap-6'>
        {/*Basic price per night */}
        <div className='w-full'>
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('Basic price per night')} </span>
            <span className=' text-[#F04438]'>*</span>
          </p>
          <input 
            type="text"
            placeholder='1,500 جنية' 
            name='formData?.base_price'
            value={formData?.base_price}
            onChange={(e) => {
              setFormData({...formData, base_price: e.target.value});
              if (e.target.value && setFieldErrors) setFieldErrors(prev => ({...prev, base_price: false}));
            }}
            className={`w-full h-11 mb-1.5 px-4 border text-sm text-[#364152] bg-white rounded-[10px] outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] ${fieldErrors?.base_price ? 'border-[#F04438]' : 'border-[#E3E8EF]'}`}
          />
          <p className='text-[#697586] text-xs font-normal'>{t('This is your base price before any fees or taxes.')}</p>
        </div>

        {/*Deposit of guarantee */}
        <div className='w-full'>
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('Deposit of guarantee')} </span>
          </p>
          <input 
            type="text"
            placeholder='1,500 جنية'
            name='formData?.security_deposit'
            value={formData?.security_deposit}
            onChange={(e) => {
              setFormData({...formData, security_deposit: e.target.value});
              if (setFieldErrors) setFieldErrors(prev => ({...prev, security_deposit: false}));
            }}
            className={`w-full mb-1.5 h-11 px-4 border text-sm text-[#364152] bg-white rounded-[10px] outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] ${fieldErrors?.security_deposit ? 'border-[#F04438]' : 'border-[#E3E8EF]'}`}
          />
          <p className='text-[#697586] text-xs font-normal'>{t('Refundable if no damage occurs')}</p>
        </div>
      </div>

      {/*Cleaning fees*/}
      <div className='w-full mt-6'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Cleaning fees')} </span>
        </p>
        <input 
          type="text"
          placeholder='1,500 جنية'
          name='formData?.cleaning_fee'
          value={formData?.cleaning_fee}
          onChange={(e) => {
            setFormData({...formData, cleaning_fee: e.target.value});
            if (setFieldErrors) setFieldErrors(prev => ({...prev, cleaning_fee: false}));
          }}
          className={`w-full h-11 px-4 border text-sm text-[#364152] bg-white rounded-[10px] outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] ${fieldErrors?.cleaning_fee ? 'border-[#F04438]' : 'border-[#E3E8EF]'}`}
        />
      </div>

      {/*  */}
      <div className='w-full mt-6 grid grid-cols-2 gap-4'>

        {/* Taxes */}
        <div className='border border-[#EEF2F6] bg-[#F8FAFC] rounded-[6px]  flex justify-between py-2 px-4'>
          <p className='flex flex-col'>
            <span className='text-[#364152] text-base font-medium'>{t('Taxes')}</span>
            <span className='text-[#4B5565] text-sm font-normal'>استنادا إلى موقع القاهرة، مصر</span>
          </p>
          <p className='text-[#364152] text-base font-medium flex items-center'>%14 ق.م</p>
        </div>

          {/* Service fees */}
        <div className='border border-[#EEF2F6] bg-[#F8FAFC] rounded-[6px] flex justify-between py-2 px-4'>
          <p className='flex flex-col'>
            <span className='text-[#364152] text-base font-medium'>{t('Service fees')}</span>
            <span className='text-[#4B5565] text-sm font-normal'>استنادا إلى موقع القاهرة، مصر</span>
          </p>
          <p className='text-[#364152] text-base font-medium flex items-center'>%14 ق.م</p>
        </div>

      </div>
    </div>

    </>
  )
}

export default PricingInfoPage

