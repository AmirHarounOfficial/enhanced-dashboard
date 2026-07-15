"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Content from './Content'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { AdvancedSettingThunk, getAdvancedSettingThunk } from '@/redux/slice/Setting/SettingSlice'


function AdvancedSettingsPages() {
  const {t} = useTranslation()
  //api
  const dispatch = useDispatch()
  const {getAdvancedSetting}= useSelector((state)=>state.setting)
  const getAdvancedSettingData = getAdvancedSetting?.data

  useEffect(()=>{
    dispatch(getAdvancedSettingThunk())
  },[dispatch])

  console.log('getAdvancedSettingData' , getAdvancedSettingData);

  const [formData , setFormData] = useState({
    auto_set_no_show:false,
    no_show_after_hours:'',
    auto_complete_booking_on_no_show : false,
    no_show_collection_policy:''        
  })
  //  'collect_all','collect_one_night','collect_nothing'

  useEffect(()=>{
    if(getAdvancedSettingData){
      setFormData({
        auto_set_no_show : getAdvancedSettingData?.auto_set_no_show ?? false,
        no_show_after_hours : getAdvancedSettingData?.no_show_after_hours ?? '',
        auto_complete_booking_on_no_show : getAdvancedSettingData?.auto_complete_booking_on_no_show ?? false ,
        no_show_collection_policy : getAdvancedSettingData?.no_show_collection_policy ?? ''
      })
    }
  },[getAdvancedSettingData])

  const hanleSubmit = ()=>{
    dispatch(AdvancedSettingThunk(formData))
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
            onClick={hanleSubmit}
            className='h-14 w-[20%] mt-12 bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer'>
            {t('Save changes')}
          </button>
        </div>
      </div>

    </>
  )
}

export default AdvancedSettingsPages
