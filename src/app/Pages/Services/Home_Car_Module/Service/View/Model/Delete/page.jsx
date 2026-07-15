"use client"
import React from 'react'
import Dialog from '@mui/material/Dialog';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

function DeletePage({open ,handleClosee, onDelete, title, description }) {
  const {t} = useTranslation();

  return (
  <>
    <Dialog
      open={open}
      onClose={handleClosee}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: "ServiceDeletePage-dialog",
      }}
    >
      <div className='pt-6 px-6'>
        <button onClick={handleClosee} className='border border-[rgba(102,107,109,0.20)] w-12 h-12  rounded-[58.182px] flex justify-center items-center'>
          <img src="/images/icons/xx.svg" alt="" />
        </button>
      </div>

      <div className='flex justify-center mb-4'>
        <div className='bg-[#FEF3F2] w-12 h-12 p-3 rounded-full'>
          <div className=' bg-[#FEE4E2] w-6 h-6 rounded-full  '>
            <img src="/images/icons/xxx.svg" alt="" />
          </div>
        </div>
      </div>

      <div className='flex flex-col  items-center mb-6'>
        <p className='text-[#0F022E] text-xl font-semibold mb-4'>
          {title || t('Are you sure you want to delete the service?')}
        </p>
        <p className='text-[#697586] text-base font-normal w-97 text-center '>
          {description || t('This service will be removed from your list and will no longer be available to customers.')}
        </p>
      </div>

      <div className="w-full h-px bg-[#CDD5DF] mt-6"></div>

      <section className='w-full flex p-6 gap-3'>
        <button 
          onClick={onDelete}
          className='w-full  bg-[#D92D20] text-[#fff]  h-11  rounded-[6px] '
        >
          <span className='text-base font-medium'>{t('delete')}</span>
        </button>
        <button onClick={handleClosee} className='w-full border border-[#697586] text-[#4B5565]  h-11  rounded-[6px] '>
          <span className='text-base font-normal'>{t('cancel')}</span>
        </button>

      
      </section>




    </Dialog>
  </>
  )
}

export default DeletePage

