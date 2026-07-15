"use client"
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Content from './Content'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getRuleSettingThunk, RuleSettingThunk } from '@/redux/slice/Setting/SettingSlice'

function Legal_CompliancePage() {
  const {t} = useTranslation()
  //api
  const dispatch = useDispatch()
  const {getRuleSetting} = useSelector((state)=>state.setting)
  const getRuleSettingData = getRuleSetting?.data
  useEffect(()=>{
    dispatch(getRuleSettingThunk())
  },[dispatch])

console.log('getRuleSetting' , getRuleSettingData);

  const [formData , setFormData] = useState({
    in_house_rules:'',
    ask_guest_identity:false,
    enable_whatsapp:false,
    enable_phone:false,
    enable_app_message:false
  })

  useEffect(()=>{
    if(getRuleSettingData){
      setFormData({
        in_house_rules : getRuleSettingData?.in_house_rules ?? '',
        ask_guest_identity : getRuleSettingData?.ask_guest_identity ?? false,
        enable_whatsapp : getRuleSettingData?.enable_whatsapp ?? false,
        enable_phone :getRuleSettingData?.enable_phone ?? false ,
        enable_app_message : getRuleSettingData?.enable_app_message ?? false

      })
    }
  },[getRuleSettingData])
  
  const handleSubmit =()=>{
    dispatch(RuleSettingThunk(formData))
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

export default Legal_CompliancePage
