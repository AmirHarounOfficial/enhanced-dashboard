"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { Suspense, useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import Form from './Form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { EditHallThunk, getHallByIdThunk, getHallTypeThunk } from '@/redux/slice/Halls/HallsSlice'
import { useRouter, useSearchParams } from 'next/navigation'

function EditContent() {
  const {t} = useTranslation();
  //api
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const dispatch = useDispatch();
  const {loading,error,getHallType , getHallById} = useSelector((state)=>state.halls)

  useEffect(() => {
    dispatch(getHallTypeThunk());
    if (id) {
      dispatch(getHallByIdThunk(id));
    }
  }, [dispatch, id]);

  console.log('getHallById:', getHallById);

  const [formData, setFormData] =useState({
    id:'',
    name:'',
    type:'',
    type_id:'',
    status:0,
    default_reservation_duration_min:'',
    buffer_time_min:'',
    floor_number:'',
    image:'',

  })

  useEffect(()=>{
    if(getHallById){
      setFormData({
        id:getHallById?.data?.id || '',
        name:getHallById?.data?.name || '',
        type:getHallById?.data?.type?.name || '', 
        type_id:getHallById?.data?.type_id || '',
        status:getHallById?.data?.status || 0,
        default_reservation_duration_min:getHallById?.data?.default_reservation_duration_min || '',
        buffer_time_min:getHallById?.data?.buffer_time_min || '',
        floor_number:getHallById?.data?.floor_number ?? '',
        image:getHallById?.data?.image || '',
      })
    }
  },[getHallById])

  const handleSubmit = async () => {
    console.log("Sending Data:", formData);

    const data = new FormData();
    data.append('_method', 'POST');
    data.append('name', formData.name);
    data.append('type_id', formData.type_id);
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
      const result = await dispatch(
        EditHallThunk({
          id: formData.id,
          data,
        })
      ).unwrap();

      console.log('Hall updated successfully:', result);

      router.push('/Pages/Halls/Hall');
    } catch (error) {
      console.error('Failed to update hall:', error);
    }
  };
  return (
    <MainLayout>
      
      <div className='flex justify-between mb-10'>
        <p className='text-[#364152] text-2xl font-medium '>{t('Hall renovation')}</p>
        <button onClick={() => router.push('/Pages/Halls/Hall')} className='flex justify-center items-center bg-[var(--color-primary)] w-8 h-8 rounded-[6px] cursor-pointer'>
          <img src="/images/icons/arrow-right-go.svg" className='w-5 h-5' alt="" />
        </button>
      </div>

      <div className="flex flex-col gap-6 border border-[#E3E8EF] rounded-[6px] py-8 px-6">
        <ImageUpload formData={formData} setFormData={setFormData}/>
        <Form getHallType={getHallType} formData={formData} setFormData={setFormData} />
      </div>

      <button onClick={handleSubmit} className='bg-[var(--color-primary)] text-white w-[20%] text-base font-medium py-3 px-6 rounded-[6px] my-6 cursor-pointer'>
        {t('Save changes')}
      </button>
      
    </MainLayout>
  )
}


export default function EditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditContent />
    </Suspense>
  );
}


