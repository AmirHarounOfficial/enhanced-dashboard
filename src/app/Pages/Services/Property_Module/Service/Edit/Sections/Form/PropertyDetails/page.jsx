"use client"
import React, { Suspense, use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import InformationPage from './Information/page';
import Arrival_DeparturePage from './Arrival_Departure/page';
import Receive_GuestsPage from './Receive_Guests/page';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import TitleOfHeader from '../../TitleOfHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '@/app/Components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyDetailsThunk, addPropertyDetailsThunk } from '@/redux/slice/Services/ServicesSlice';

function PropertyDetailsPageContent() {
  const {t} = useTranslation();

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const from = searchParams.get('from')

  //api
  const dispatch = useDispatch()
  const {getPropertyDetails} = useSelector((state) => state.services)
  const getPropertyDetailsData = getPropertyDetails?.data

  const [formData, setFormData] =useState({
    property_id: "",
    area: "",
    area_unit: "",
    floor_number: "",
    has_elevator: "",
    check_in_time: "",
    check_out_time: "",
    availabilities: [
      {
        id: "",
        available_from: "",
        available_to: "",
        created_at: "",
        updated_at: ""
      }
    ]
  })
  
  useEffect(()=>{
    if(id){
      setFormData((prev) => ({
        ...prev,
        property_id:id
      }))
    }
  }, [id])

  useEffect(() => {
    if (id) {
      dispatch(getPropertyDetailsThunk(id))
    }
  }, [id])

  const handleBack = () => {
    if (from === 'Add') {
      router.push(
        `/Pages/Services/Property_Module/Service/Add/FormData?property_id=${id}`
      )
    } else {
      router.push(
        `/Pages/Services/Property_Module/Service/Edit?id=${id}`
      )
    }
  }
  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        check_in_time: formData.check_in_time ? formData.check_in_time.substring(0, 5) : "",
        check_out_time: formData.check_out_time ? formData.check_out_time.substring(0, 5) : "",
        availabilities: (formData.availabilities || []).map(a => ({
          ...a,
          available_from: a.available_from ? a.available_from.substring(0, 5) : "",
          available_to: a.available_to ? a.available_to.substring(0, 5) : "",
        })),
      };
      await dispatch(addPropertyDetailsThunk(payload)).unwrap();
      if (from === 'Add') {
        router.push(`/Pages/Services/Property_Module/Service/Add/FormData?property_id=${id}`)
      } else {
        router.push(`/Pages/Services/Property_Module/Service/Edit?id=${formData.property_id}`)
      }

    } catch (error) {
      console.error('Error saving property details:', error);
    }
  }

  useEffect(()=>{
    if(getPropertyDetailsData){
      setFormData((prev) => ({
        ...prev,
        area: getPropertyDetailsData?.area || "",
        area_unit: getPropertyDetailsData?.area_unit || "",
        floor_number: getPropertyDetailsData?.floor_number || "",
        has_elevator: getPropertyDetailsData?.has_elevator || "",
        check_in_time: getPropertyDetailsData?.check_in_time || "",
        check_out_time: getPropertyDetailsData?.check_out_time || "",
        availabilities: getPropertyDetailsData?.availabilities || [
          {
            id: "",
            available_from: "",
            available_to: "",
            created_at: "", 
            updated_at: ""
          }
        ]
      }))
    }
  },[getPropertyDetailsData])

  return (
    <MainLayout>
      <TitleOfHeader/>
      <div className='border border-[#E6E6E6] p-8 rounded-[6px] mb-4'>
        {/* title */}
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 4 :</span>
            <span>{t('Property details')}</span>
          </p>
            <p className='text-[#697586] text-base font-normal'>الدور 1 . 120 م.ع . المصعد (متاح)</p>
          <div className='border border-[#E3E8EF] my-4'></div>
        </div>
        
        {/* Property Information */}
        <InformationPage  formData={formData} setFormData={setFormData} />

        {/* Arrival and departure times */}
        <Arrival_DeparturePage  formData={formData} setFormData={setFormData} />

        {/* Service provider available to receive guests */}
        <Receive_GuestsPage  formData={formData} setFormData={setFormData} />





        {/* btn */}
        <div className="flex  mt-6">
          
          <div className='flex gap-2 justify-start w-full '>
            <button
              onClick={handleBack}
              className="btn-ghost h-11 px-6 w-[30%] lg1:w-[15%] cursor-pointer"
            >
              {t('Return')}
            </button>

            <button
              onClick={handleSubmit}
              className="btn-primary h-11 px-6 w-[30%] lg1:w-[15%] rounded-[10px] text-white text-sm font-semibold cursor-pointer"
            >
              {t('Save changes')}
            </button>
          </div>
          
        </div>
      </div>
    </MainLayout>
  )
}

export default function PropertyDetailsPage() {
  return (
    <Suspense fallback={<Loader/>}>
      <PropertyDetailsPageContent />
    </Suspense>
  )
}


