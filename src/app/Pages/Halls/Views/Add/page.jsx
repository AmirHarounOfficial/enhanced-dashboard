'use client'
import { Dialog } from '@mui/material'
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { addHallViewThunk, getHallViewThunk, getViewsThunk } from '@/redux/slice/Halls/HallsSlice'

function AddContent({open , setOpen , Hallid}) {
  const{t} = useTranslation()
  console.log('Hallid' , Hallid);
  
  //api
  const dispatch = useDispatch()
  const {getHallView} = useSelector((state)=>state.halls)
  useEffect(()=>{
    dispatch(getHallViewThunk())
  },[dispatch])

  const [formData , setFormData] = useState({
    view_id:'',
    name:'',
    side:'',
    description:'',
  })

  const handleSave = async () => {
    try {
      await dispatch(
        addHallViewThunk({
          hallid: Hallid,
          formData,
        })
      ).unwrap();

      await dispatch(getViewsThunk(Hallid));
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  console.log('getHallView',getHallView);
  return (
    <>
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
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Add a look")}</p>
        <p className="text-[#4B5565] text-xl font-normal mb-5">
          {t("Configuring appearance settings")}
        </p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      {/*  */}
      <Form getHallView={getHallView} formData={formData} setFormData={setFormData}  />

      {/* btn */}
      <div className='px-6'>
        <button onClick={handleSave} className=' bg-[var(--color-primary)] text-white w-full text-base font-medium py-3 px-6 rounded-[6px] my-6 cursor-pointer'>
          {t('save')}
        </button>
      </div>
    
    </Dialog>
      
    </>
  )
}


export default function AddPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddContent />
    </Suspense>
  );
}

