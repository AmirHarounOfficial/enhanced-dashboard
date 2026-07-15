'use client'
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { getViewsThunk } from '@/redux/slice/Requests/RequestsSlice'
import { addWaitlistThunk } from '@/redux/slice/Pending_List/Pending_ListSlice'

function AddPage({open , setOpen}) {
  const{t} = useTranslation()

  //api
  const dispatch = useDispatch()
  const {getViews} = useSelector((state)=>state?.requests)

  useEffect(()=>{
    dispatch(getViewsThunk())
  },[dispatch])

  const [formData ,  setFormData] = useState({
    name:'',
    phone:'',
    number_of_guests:'',
    favourite_view_id:'',
    notes:''
  })

  const handleSubmit = async () => {
    try {
      const result = await dispatch(addWaitlistThunk(formData)).unwrap();
      console.log(result);

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
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Add a new guest")}</p>
        <p className="text-[#4B5565] text-xl font-normal mb-5">
          {t("Enter guest details")}
        </p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      {/*  */}
      <Form getViews={getViews} formData={formData} setFormData={setFormData}/>

      {/* btn */}
      <div className='px-6 grid grid-cols-2 gap-6 mb-6'>
        <button onClick={()=>setOpen(false)} className='border border-[var(--color-primary)] text-[var(--color-primary)] w-full text-base font-medium py-3 px-6 rounded-[6px]  cursor-pointer'>
          {t('cancel')}
        </button>
        <button onClick={handleSubmit} className=' bg-[#E3E8EF] text-[#9AA4B2] w-full text-base font-medium py-3 px-6 rounded-[6px]  cursor-pointer'>
          {t('Add to the queue')}
        </button>
      </div>

    </Dialog>
  )
}

export default AddPage

