"use client"
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Content from './Content'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { CalendarSettingThunk, getCalendarSettingThunk } from '@/redux/slice/Setting/SettingSlice'

function Savings_CalendarPage() {
  const {t} = useTranslation()
  //api
  const dispatch = useDispatch()
  const {getCalendarSetting}= useSelector((state)=>state.setting)
  const getCalendarSettingData = getCalendarSetting

  useEffect(()=>{
    dispatch(getCalendarSettingThunk())
  },[dispatch])

  console.log('getCalendarSettingData' , getCalendarSettingData);

  const [formData , setFormData]= useState({
    availability_mode:'',
    buffer_between_bookings_hours:'',
    maintenance_mode:0,
  })

  useEffect(()=>{
    if(getCalendarSettingData){
      setFormData({
        availability_mode: getCalendarSettingData?.availability_mode ?? '',
        buffer_between_bookings_hours: getCalendarSettingData?.buffer_between_bookings_hours ?? '',
        maintenance_mode: getCalendarSettingData?.maintenance_mode ?? 0,
      })
    }
  },[getCalendarSettingData])

  const handleSubmit = () => {
    console.log("formData", formData);

    dispatch(CalendarSettingThunk(formData))
  }

  return (
    <>
      <div className='border border-[#E3E8EF] '>
        <Header/>
        <div className='px-6 py-4'>
          <Content
            formData={formData}
            setFormData={setFormData}
          />

          <button 
            onClick={handleSubmit}
            className='h-14 w-[20%] mt-12 bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer'>
            {t('Save changes')}
          </button>
        </div>
      </div>

    </>
  )
}

export default Savings_CalendarPage
