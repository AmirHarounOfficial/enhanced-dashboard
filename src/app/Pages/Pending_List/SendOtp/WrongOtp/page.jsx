'use client'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function WrongOtpPage({open , setOpen , setOpenOtp}) {
  const {t} = useTranslation()

  const handleOpen = ()=>{
    setOpen(false)
    setOpenOtp(true)
  }
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "rerquest-dialog" }}
      >
        
        <section className="mt-6 px-6">
          <p className="text-[#364152] text-2xl font-medium mb-3">{t("Booking code")}</p>
        </section>
        <span className="border-[0.5px] border-[#E3E8EF]" />
        

        <div className='p-6'>

          {/*  */}
          <div className='border border-[#F04438] bg-[#FEF3F2] flex flex-col gap-1 items-center p-4 rounded-[6px] '>
            
            <p className='flex justify-center items-center bg-[#F04438] w-14 h-14 rounded-full mb-2'>
              <img src="/images/icons/cancel-circle-white.svg" alt="" />
            </p>

            <p className='text-[#364152] text-base font-medium'>{t('Invalid code')}</p>
            <p className='text-[#4B5565] text-base font-normal'>{t('This code does not match a valid reservation for this restaurant.')}</p>
          </div>

          {/*  */}
          <div className='bg-[#F9F5E8] rounded-[6px] p-4 my-8'>
            <p className='text-[#B54708] text-base font-normal '>{t('Please check:')}</p>
            <ul className='mt-2 space-y-2 text-[#DC6803] list-disc pr-5 '>
              <li>{t('The symbol belongs to this branch.')}</li>
              <li>{t('The reservation has not been cancelled.')}</li>
              <li>{t('The date and time are correct.')}</li>
            </ul>
          </div>

          {/* btn */}
          <button
            onClick={handleOpen}
            className="w-full h-14 flex justify-center items-center gap-2  bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer"
          >
            <img src="/images/icons/return.svg" className="w-6 h-6" />
            <span className='text-base font-normal'>{t('Re-search')}</span>
          </button>

          {/*  */}
          <div className='flex justify-center gap-2 text-[#697586] mt-3 '>
            <p>{t('Do you need help?')}</p> 
            <button className='cursor-pointer'>{t('Contact technical support')}</button>
          </div>
        </div>
      </Dialog>
    
    </>
  )
}

export default WrongOtpPage

