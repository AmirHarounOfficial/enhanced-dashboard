"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PricingDetailsPage({ formData, setFormData }) {
  const {t} = useTranslation()
  const basePrice = parseFloat(formData?.base_price) || 0;
  const cleaningFee = parseFloat(formData?.cleaning_fee) || 0;
  const nights = 1;

  const subTotal = basePrice + cleaningFee;
  const serviceFee =(subTotal * formData?.service_fee_percentage ||0) / 100;
  const taxAmount = (subTotal * formData?.tax_percentage ||0) / 100;
  const totalAmount = subTotal + serviceFee + taxAmount;

  return (
    <>
      <div className='border border-[#E3E8EF] bg-[#F8FAFC] mt-6 p-4'>
        <p className='text-[#364152] text-lg font-medium'>{t('Pricing details')}</p>

        {/* Basic price */}
        <div className='flex justify-between mt-4'>
          <p className='text-[#4B5565] text-base  font-normal'>
            <span>{t('Basic price')}</span>{' '}
            <span>({nights} {t('nights')} )</span>
          </p>
          <p className='text-[#364152] text-base font-medium'>
            <span>{basePrice}</span>
            <span>جنية</span>
          </p>
        </div>

        {/* Cleaning fees */}
        <div className='flex justify-between mt-4'>
          <p className='text-[#4B5565] text-base  font-normal'>
            <span>{t('Cleaning fees')}</span>
          </p>
          <p className='text-[#364152] text-base font-medium'>
            <span>{cleaningFee}</span>
            <span>جنية</span>
          </p>
        </div>

        {/* Service fees */}
        <div className='flex justify-between mt-4'>
          <p className='text-[#4B5565] text-base  font-normal'>
            <span>{t('Service fees')}</span>
          </p>
          <p className='text-[#364152] text-base font-medium'>
            <span>{serviceFee}</span>
            <span>جنية</span>
          </p>
        </div>

        {/* Value Added Tax */}
        <div className='flex justify-between mt-4'>
          <p className='text-[#4B5565] text-base  font-normal'>
            <span>{t('Value Added Tax')}</span>{' '}
            <span>(3%)</span>
          </p>
          <p className='text-[#364152] text-base font-medium'>
            <span>{taxAmount}</span>
            <span>جنية</span>
          </p>
        </div>

        <div className='border border-dashed border-[#E3E8EF] my-4 '></div>

        {/* Total */}
        <div className='flex justify-between mt-4'>
          <p className='text-[#364152] text-base  font-normal'>
            <span>{t('Total')}</span>{' '}
            <span>({t('The guest pays')})</span>
          </p>
          <p className='text-[#364152] text-base font-medium'>
            <span>{totalAmount}</span>
            <span>جنية</span>
          </p>
        </div>

        {/* Gain */}
        <div className='flex justify-between mt-4'>
          <p className='text-[var(--color-primary)] text-base  font-normal'>
            <span>{t('Gain')}</span>
          </p>
          <p className='text-[#364152] text-base font-medium'>
            <span>{subTotal}</span>
            <span>جنية</span>
          </p>
        </div>


      </div>
    </>
  )
}

export default PricingDetailsPage
