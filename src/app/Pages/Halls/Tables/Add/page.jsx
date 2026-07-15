"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { getHallsViewThunk, getTageThunk, addTableThunk } from '@/redux/slice/Halls/HallsSlice'
import { toast } from 'react-toastify'

function AddContent() {
  const {t} = useTranslation()
  const router = useRouter()

  const searchParams = useSearchParams();
  const hall_id = searchParams.get("hall_id");
  console.log('hall_id' , hall_id);

  //api
  const dispatch = useDispatch()
  const {getTage , getHallsView, loading} = useSelector((state)=>state.halls)
  useEffect(()=>{
    dispatch(getTageThunk())
    if(hall_id){
      dispatch(getHallsViewThunk(hall_id))
    }
  },[dispatch,hall_id])

  console.log("getHallsView********", getHallsView);

  const [formData, setFormData] = useState({
    code: '',
    shape: '',
    views: [],
    capacity: 1,
    tags: [],
    is_bookable: true,
    is_active: true
  });

  const handleSubmit = async () => {
    if (!formData.code) {
      toast.error(t('Table name/number is required'));
      return;
    }
    if (!formData.shape) {
      toast.error(t('Table type is required'));
      return;
    }
    if (!formData.views || formData.views.length === 0) {
      toast.error(t('Views are required'));
      return;
    }

    const data = new FormData();
    data.append('code', formData.code);
    data.append('shape', formData.shape);
    data.append('capacity', String(formData.capacity));
    data.append('is_bookable', formData.is_bookable ? '1' : '0');
    data.append('is_active', formData.is_active ? '1' : '0');

    formData.tags.forEach((tag, index) => {
      data.append(`tags[${index}]`, tag);
    });

    formData.views.forEach((viewId, index) => {
      data.append(`views[${index}]`, viewId);
    });

    try {
      await dispatch(addTableThunk({ id: hall_id, formData: data })).unwrap();
      toast.success(t('Table added successfully'));
      router.push(`/Pages/Halls/Tables?hall_id=${hall_id}`);
    } catch (err) {
      console.error(err);
      toast.error(err?.message || t('Failed to add table'));
    }
  };

  return (
    <MainLayout>

      <div className='flex justify-between mb-10'>
        <div className='flex flex-col gap-2'>
          <p className='text-[#364152] text-2xl font-medium '>{t('Add a new table')}</p>
          <p className='text-[#4B5565] text-base font-normal'>{t('Configuring table settings')}</p>
        </div>
        
        <button onClick={() => router.push(`/Pages/Halls/Tables?hall_id=${hall_id}`)} className='flex justify-center items-center bg-[var(--color-primary)] w-8 h-8 rounded-[6px] cursor-pointer'>
          <img src="/images/icons/arrow-right-go.svg" className='w-5 h-5' alt="" />
        </button>
      </div>



      <Form 
        getTage={getTage} 
        getHallsView={getHallsView}
        formData={formData}
        setFormData={setFormData}
      />

      <button 
        onClick={handleSubmit} 
        disabled={loading}
        className='bg-[var(--color-primary)] text-white w-[20%] text-base font-medium py-3 px-6 rounded-[6px] my-6 cursor-pointer disabled:opacity-50'
      >
        {loading ? t('saving...') : t('save')}
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

