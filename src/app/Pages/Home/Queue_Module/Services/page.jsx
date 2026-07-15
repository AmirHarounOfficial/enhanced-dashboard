"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import BoxPage from './Box/page'
import UpcomingBookingsPage from './UpcomingBookings/page'
import WaitingListPage from './WaitingList/page'
import QuickProceduresPage from './QuickProcedures/page'
import { useDispatch, useSelector } from 'react-redux'
import { getcountersThunk, getUpcomingThunk, getWaitlistThunk } from '@/redux/slice/Home/HomeSlice'

function ServicesPage() {
  const dispatch = useDispatch()
  const {getcounters , getUpcoming ,getWaitlist} = useSelector((state)=>state.Home)
  useEffect(()=>{
    dispatch(getcountersThunk())
    dispatch(getUpcomingThunk())
    dispatch(getWaitlistThunk())
  },[dispatch])

  console.log('getWaitlist' ,getWaitlist);

  return (
    <MainLayout>
      <BoxPage getcounters={getcounters}/>

      <div className='grid grid-cols-2 gap-4'>
        <UpcomingBookingsPage getUpcoming={getUpcoming}/>
        <WaitingListPage getWaitlist={getWaitlist}/>
      </div>

      <QuickProceduresPage/>

    </MainLayout>
  )
}

export default ServicesPage