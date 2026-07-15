"use client"
import React, { useEffect } from 'react'
import Header from './Header';
import HaveWorkplacesPage from './HaveWorkplaces/page';
import NoWorkplacesPage from './NoWorkplaces/page';
import { getWorkplacesThunk } from '@/redux/slice/Setting/SettingSlice';
import { useDispatch, useSelector } from 'react-redux';

function WorkplacesPage() {
    const dispatch = useDispatch()
    const {Workplaces , loading , error} = useSelector((state)=>state.setting)
    const hasWorkplaces = Workplaces?.areas?.length > 0
    useEffect(()=>{
      dispatch(getWorkplacesThunk())
    },[dispatch])


  return (
    <>
    <div className="border border-[#E3E8EF] rounded-[8px] mb-8 overflow-hidden">
      <Header/>
      {
        hasWorkplaces? (
          <HaveWorkplacesPage Workplaces={Workplaces}/>
        ):(
          <NoWorkplacesPage/>
        )
      }
    </div>

    </>
  )
}

export default WorkplacesPage
