"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { getHallsViewThunk, getRestaurantTableThunk, EditRestaurantTableThunk } from '@/redux/slice/Halls/HallsSlice'
import { toast } from 'react-toastify'

function EditContent() {
  const {t} = useTranslation()
  const router = useRouter()

  const searchParams = useSearchParams();
  const table_id = searchParams.get("id");
  const hall_id = searchParams.get("hall_id");

  console.log('table_id' , table_id);
  console.log('hall_id' , hall_id);


  //api
  const dispatch = useDispatch()
  const {getHallsView, getRestaurantTable, loading} = useSelector((state)=>state.halls)
  
  useEffect(()=>{
    if(hall_id){
      dispatch(getHallsViewThunk(hall_id))
    }
    if(table_id){
      dispatch(getRestaurantTableThunk(table_id))
    }
  },[dispatch, hall_id, table_id])


  const [formData, setFormData] = useState({
    code: '',
    shape: '',
    views: [],
    capacity: 1,
    tags: [],
    is_bookable: true,
    is_active: true
  });

  useEffect(() => {
    if (getRestaurantTable?.data) {
      const table = getRestaurantTable.data.table;

      setFormData({
        code: table?.code || '',
        shape: table?.shape || '',
        capacity: table?.capacity || 1,

        views:
          getRestaurantTable.data.views
            ?.filter(view => view.is_selected)
            .map(view => view.id) || [],

        tags:
          getRestaurantTable.data.tags
            ?.filter(tag => tag.is_selected)
            .map(tag => tag.id) || [],

        is_bookable: table?.is_bookable ?? true,
        is_active: table?.is_active ?? true,
      });
    }
  }, [getRestaurantTable]);

  const handleSubmit = async () => {

    const data = new FormData();
    data.append('code', formData.code);
    data.append('shape', formData.shape);
    data.append('capacity', String(formData.capacity));
    data.append('is_bookable', formData.is_bookable ? '1' : '0');
    data.append('is_active', formData.is_active ? '1' : '0');

    formData.tags.forEach((tagId, index) => {
    data.append(`tags[${index}]`, tagId);
  });

    formData.views.forEach((viewId, index) => {
      data.append(`views[${index}]`, viewId);
    });

    try {
      await dispatch(EditRestaurantTableThunk({ id: table_id, formData: data })).unwrap();
      toast.success(t('Table updated successfully'));
      router.push(`/Pages/Halls/Tables?hall_id=${hall_id}`);
    } catch (err) {
      console.error(err);
      toast.error(err?.message || t('Failed to update table'));
    }
  };

  return (
    <MainLayout>

      <div className='flex justify-between mb-10'>
        <div className='flex flex-col gap-2'>
          <p className='text-[#364152] text-2xl font-medium '>{t('Table adjustment')}</p>
          <p className='text-[#4B5565] text-base font-normal'>{t('Configuring table settings')}</p>
        </div>
        
        <button onClick={() => router.push(`/Pages/Halls/Tables?hall_id=${hall_id}`)} className='flex justify-center items-center bg-[var(--color-primary)] w-8 h-8 rounded-[6px] cursor-pointer'>
          <img src="/images/icons/arrow-right-go.svg" className='w-5 h-5' alt="" />
        </button>
      </div>



      <Form

        getHallsView={getHallsView}
        formData={formData}
        setFormData={setFormData}
        availableTags={getRestaurantTable?.data?.tags || []}  

      />

      <button 
        onClick={handleSubmit}
        disabled={loading}
        className='bg-[var(--color-primary)] text-white w-[20%] text-base font-medium py-3 px-6 rounded-[6px] my-6 cursor-pointer disabled:opacity-50'
      >
        {loading ? t('saving...') : t('Save changes')}
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

