"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PaymentDetailsPage({getBookingDetails}) {
  const {t} = useTranslation();
  const getBookingDetailsData = getBookingDetails?.data


  const status = getBookingDetailsData?.payment_status
  const StatusNote = (status) => {
    switch (status) {
      case "paid":   
      return (
          <div className='flex flex-col gap-1 border border-[#17B26A] bg-[#ECFDF3] rounded-[6px] p-3 mt-6'>
            <p className='flex gap-2'>
              <img src="/images/icons/credit-card_green.svg" alt="" />
              <span className='text-[#17B26A] text-base font-medium'>{t('Payment made')}</span>
            </p>
            <p className='text-[#17B26A] text-base font-normal'>{t('The customer paid the booking fees.')}</p>
          </div>
        );
      case "pending":         
        return (
          <div className='flex flex-col gap-1 border border-[#FDB022] bg-[#FFFCF5] rounded-[6px] p-3 mt-6'>
            <p className='flex gap-2'>
              <img src="/images/icons/credit-card_yellow.svg" alt="" />
              <span className='text-[#DC6803] text-base font-medium'>{t('Payment pending')}</span>
            </p>
            <p className='text-[#DC6803] text-base font-normal'>{t('The guest will be charged a fee after approval.')}</p>
          </div>
        );
      case "failed": 
        return (
          <div className='flex flex-col gap-1 border border-[#F04438] bg-[#FEF3F2] rounded-[8px] p-3 mt-6'>
            <p className='flex gap-2'>
              <img src="/images/icons/credit-card_red.svg" alt="" />
              <span className='text-[#F04438] text-base font-medium'>{t('refund request')}</span>
            </p>
            <p className='text-[#F04438] text-base font-normal'>{t('The customer requested a refund of the booking fees.')}</p>
          </div>
          );
      case "refunded": 
        return (
          <div className='flex flex-col gap-1 border border-[#48A1FF] bg-[#EFF6FF] rounded-[6px] p-3 mt-6'>
            <p className='flex gap-2'>
              <img src="/images/icons/credit-card_blue.svg" alt="" />
              <span className='text-[#0F022E] text-base font-medium'>{t('refund request')}</span>
            </p>
            <p className='text-[#0F022E] text-base font-normal'>{t('The customer requested a refund of the booking fees.')}</p>
          </div>
        );
      }
  };

  return (
    <>
    <div className='border border-[#E3E8EF] rounded-[6px] p-4 mb-4'>
      <p className='text-[#364152] text-base font-medium mb-5'>{t('Payment details')}</p>

      <div>

        {/*  */}
        <div className='flex justify-between '>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Basic price')} ({getBookingDetailsData?.nights} {t('nights')})</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span> {(Number(getBookingDetailsData?.price) || 0) *(Number(getBookingDetailsData?.nights) || 0)}</span>
            <span>{getBookingDetailsData?.currency}</span>
          </p>
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Cleaning fees')}</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>{getBookingDetailsData?.cleaning_fee}</span>
            <span>{getBookingDetailsData?.currency}</span>
          </p> 
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Service fees')}({getBookingDetailsData?.service_fee_percentage}%)</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>{getBookingDetailsData?.service_fee}</span>
            <span>{getBookingDetailsData?.currency}</span>
          </p>
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Taxes')} ({getBookingDetailsData?.tax_percentage}%)</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>{getBookingDetailsData?.tax}</span>
            <span>{getBookingDetailsData?.currency}</span>
          </p>
        </div>

        <div className='border border-dashed border-[#E3E8EF] my-3'></div>

        {/*  */}
        <div className='flex justify-between  '>
          <p className='text-[#364152] text-sm font-medium  flex items-center '>{t('Final price')} </p>
          <p className='text-[var(--color-primary)] text-base font-semibold flex  gap-1'>
            <span>{getBookingDetailsData?.total_amount}</span>
            <span>{getBookingDetailsData?.currency}</span>
          </p>
        </div>

      </div>


      <div className=' '>
        {StatusNote(status)}
      </div>


    </div>
    </>
  )
}

export default PaymentDetailsPage


