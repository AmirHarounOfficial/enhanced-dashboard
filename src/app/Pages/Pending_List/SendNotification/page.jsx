"use client"
import { notifyUserThunk } from '@/redux/slice/Requests/RequestsSlice'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

function SendNotificationPage({open , setOpen ,guestID ,guestDetails  }) {
  const{t} = useTranslation()

  const dispatch = useDispatch()

  const [formData , setFormData] = useState({
    reservation_id:'',
    message:''
  })

  const handleSubmit = async () => {
    try {
      await dispatch(
        notifyUserThunk({
          reservation_id: guestID,
          message: formData.message,
        })
      ).unwrap();

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* header */}
      <section className="flex justify-end px-6 mt-6">
        <button
          onClick={()=>setOpen(false)}
          className="border border-[#E3E8EF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      </section>
      <section className="mt-4 px-6">
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Send notification")}</p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />


      {/*  */}

        <div className='p-6'>
        
        <section className='bg-[#F8FAFC] border border-[#EEF2F6] p-3 rounded-[6px] mb-4 flex gap-1'>
          <img src="/images/icons/user_gray.svg" alt="" />
          <p className='text-[#697586] text-base font-normal'>{t('guest')} : </p>
          <p className='text-[#364152] text-base font-normal'>{guestDetails?.guest_name} </p>
        </section>

        <section className="flex flex-col mb-3">
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('message')} </span>
          </p>
          <div className="relative w-full">
            <textarea
              placeholder={t("Send notification")}
              maxLength={500}
              value= {formData?.message}
              onChange={(e)=>setFormData({
                ...formData , 
                message : e.target.value
              })}
              className={`w-full h-50 border rounded-[6px] p-3 text-sm text-[#7d8d84] outline-none border-[#E3E8EF]`}
            />

            {/* counter */}
            <span className="absolute bottom-3 left-3 text-[#9A9A9A] text-sm">
              {formData?.message.length}/500
            </span>
          </div>
        </section>

        {/* btn */}
        <section className="w-full flex gap-3">
          
          <button
            onClick={()=>setOpen(false)}
            className="w-full h-11 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[6px] cursor-pointer"
          >
            {t('cancel')}
          </button>

          <button
            onClick={handleSubmit}
            className="w-full h-14 bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer"
          >
            {t('send')}
          </button>
        </section>


      </div>


    </Dialog>
  )
}

export default SendNotificationPage


