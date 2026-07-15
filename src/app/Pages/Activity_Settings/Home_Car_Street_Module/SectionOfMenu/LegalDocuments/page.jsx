'use client'
import React, { useEffect } from 'react'
import Header from './Header'
import TextState from './TextState'
import Files from './Files'
import { useDispatch, useSelector } from 'react-redux'
import { getRequiredDocumentsThunk } from '@/redux/slice/Setting/SettingSlice'

function LegalDocumentsPage() {
  const dispatch = useDispatch();
  const {documents , loading , error}= useSelector((state)=>state.setting)

  useEffect(()=>{
    dispatch(getRequiredDocumentsThunk())
  },[dispatch])

  return (
    <>
    <div className="border border-[#E3E8EF] rounded-[8px] mb-8 overflow-hidden">
      <Header/>
      <TextState documents={documents}/>
      
      <Files documents={documents}/>
      
    </div>

    </>
  )
}

export default LegalDocumentsPage
