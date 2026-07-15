"use client"
import React, { useEffect } from 'react'
import TextState from './TextState'
import Files from './Files'
import { useDispatch, useSelector } from 'react-redux';
import { getRequiredDocumentsThunk } from '@/redux/slice/Setting/SettingSlice';

function Content() {
    const dispatch = useDispatch();
    const {documents , loading , error}= useSelector((state)=>state.setting)
  
    useEffect(()=>{
      dispatch(getRequiredDocumentsThunk())
    },[dispatch])
    
  return (
    <>
      <TextState documents={documents}/>
      
      <Files documents={documents}/>

    </>
  )
}

export default Content