"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { Suspense, useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import Form from './Form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AddHallThunk, getHallTypeThunk } from '@/redux/slice/Halls/HallsSlice'
import { useRouter } from 'next/navigation'

function AddContent() {
  const {t} = useTranslation();
  const router = useRouter();
  //api
  const dispatch = useDispatch();
  const {loading,error,getHallType} = useSelector((state)=>state.halls)
  useEffect(()=>{
    dispatch(getHallTypeThunk())
  },[dispatch])

  const [formData, setFormData] = useState({
    hall_type_id:'',
    name:'',
    status:1,
    default_reservation_duration_min:'',
    buffer_time_min:'',
    floor_number:'',
    image:'',

  })

  

  const handleSubmit = async () => {
    const data = new FormData();

    data.append('hall_type_id', formData.hall_type_id);
    data.append('name', formData.name);
    data.append('status', formData.status);
    data.append(
      'default_reservation_duration_min',
      formData.default_reservation_duration_min
    );
    data.append('buffer_time_min', formData.buffer_time_min);
    data.append('floor_number', formData.floor_number);

    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    try {
      await dispatch(AddHallThunk(data)).unwrap();

      router.push('/Pages/Halls/Hall');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>

      <div className='flex justify-between mb-10'>
        <div className='flex flex-col gap-2'>
          <p className='text-[#364152] text-2xl font-medium '>{t('Adding a new hall')}</p>
          <p className='text-[#4B5565] text-base font-normal'>{t('Enter the details of the new lounge to start offering it to your customers.')}</p>
        </div>
        
        <button onClick={() => router.push('/Pages/Halls/Hall')} className='flex justify-center items-center bg-[var(--color-primary)] w-8 h-8 rounded-[6px] cursor-pointer'>
          <img src="/images/icons/arrow-right-go.svg" className='w-5 h-5' alt="" />
        </button>
      </div>

      <div className="flex flex-col gap-6 border border-[#E3E8EF] rounded-[6px] py-8 px-6">
        <ImageUpload formData={formData} setFormData={setFormData}/>
        <Form getHallType={getHallType} formData={formData} setFormData={setFormData}/>
      </div>

      <button onClick={handleSubmit} className='bg-[var(--color-primary)] text-white w-[20%] text-base font-medium py-3 px-6 rounded-[6px] my-6 cursor-pointer'>
        {t('save')}
      </button>
      
    </MainLayout>
  )
}


export default function AddPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddContent />
    </Suspense>
  );
}


