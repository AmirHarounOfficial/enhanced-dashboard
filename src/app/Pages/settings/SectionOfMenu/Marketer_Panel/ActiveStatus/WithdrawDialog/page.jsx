"use client"
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

function WithdrawDialogPage({ open, setOpen }) {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "ServicePage-dialog" }}
    >
      
      {/* Close */}
      <button onClick={() => setOpen(false)} className="modal-close" aria-label={t('cancel')}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
      </button>

      <div className=' flex justify-center mb-8'>
        <p className='text-[#0F022E] text-2xl font-medium'>{t('withdrawal request')}</p>
      </div>

      <section className='px-6'>
        <p className='text-[#364152] text-sm font-medium mb-2 block'>{t('Enter the amount')}</p>
        <input type="text" className='w-full h-11 px-4 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]'/>
      </section>

      <section className='px-6 my-6 '>
        <div className='bg-[#EEF2F6] rounded-[8px] px-6'>
          <ul className='list-disc text-[#775B0D] text-sm font-normal p-3'>
            <li className='mb-2'>{t('The maximum amount that can be withdrawn is')} ( 225 جنية )</li>
            <li>{t('Upon acceptance of the withdrawal, the transfer will be made on the 1st and 15th of the month.')}</li>
          </ul>
        </div>
        
      </section>


      <section className='px-6 mb-8'>
        <div className="modal-footer">
          <button className='btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold'>
            {t('confirmation')}
          </button>
        </div>
      </section>

      
    </Dialog>
  )
}

export default WithdrawDialogPage


