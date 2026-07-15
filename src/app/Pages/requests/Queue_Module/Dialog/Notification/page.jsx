"use client"
import { notifyUserThunk } from '@/redux/slice/Requests/RequestsSlice'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

function NotificationPage({open , setOpen , reservationData}) {
  const {t} = useTranslation()
  const [count, setCount] = useState("");

  const dispatch = useDispatch()
  const [formData , setFormData]= useState({
    reservation_id:'',
    message:'',
  })


  const handleSubmit = ()=>{
    dispatch(notifyUserThunk({
      reservation_id:reservationData?.id,
      message:formData?.message,
    }))
  }
  return (
    <>  
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* Header */}
      <section className="flex justify-between px-6 mt-6">
        <button onClick={()=>setOpen(false)} className="modal-close" aria-label={t('cancel')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
        <div className="w-14 h-14 bg-[#EEF2F6] rounded-[100px] flex justify-center items-center">
          <p className="bg-[#E3E8EF] flex items-center justify-center w-10 h-10 rounded-[100px]">
            <img src="/images/icons/FilterGreyicon.svg" alt="" className="w-6 h-6" />
          </p>
        </div>
      </section>

      <div className='p-6'>
        
        <section className='bg-[#F8FAFC] border border-[#EEF2F6] p-3 rounded-[6px] mb-4 flex gap-1'>
          <img src="/images/icons/user_gray.svg" alt="" />
          <p className='text-[#697586] text-base font-normal'>{t('guest')} : </p>
          <p className='text-[#364152] text-base font-normal'>{reservationData?.guest_name}</p>
        </section>

        <section className="flex flex-col mb-3">
          <label className='text-[#364152] text-sm font-medium mb-2 block'>{t('message')} </label>
          <div className="relative w-full">
            <textarea
              value={formData?.message}
              onChange={(e) => setFormData({
                ...formData,
                message:e.target.value
              })}
              placeholder={t("Write a brief description of the property.")}
              maxLength={500}
              className={`w-full h-50 border border-[#E3E8EF] rounded-[10px] px-4 py-3 min-h-[88px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] resize-none`}
            />

            {/* counter */}
            <span className="absolute bottom-3 end-3 text-[#9AA4B2] text-sm">
              {formData?.message.length}/500
            </span>
          </div>
        </section>

        {/* btn */}
        <div className="modal-footer">
          <button
            onClick={handleSubmit}
            className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold"
          >
            {t('send')}
          </button>

          <button
            onClick={()=>setOpen(false)}
            className="btn-ghost flex-1"
          >
            {t('cancel')}
          </button>
        </div>


      </div>
    </Dialog>
    
    
    </>
  )
}

export default NotificationPage


