"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import TileOfSevicesPage from './TileOfSevices/page'
import BoxPage from './Box/page'
import Cardspage from './Cards/page'
import { useDispatch, useSelector } from 'react-redux'
import { getconversationsLatestUnseenThunk, getPropertiesAnalysisThunk, getPropertiesTopThunk, gettopThreeBookingsThunk } from '@/redux/slice/Home/HomeSlice'
import UpcomingBookingsPage from './UpcomingBookings/page'
import PerformancePage from './Performance/page'
import ChatPage from './Chat/page'
import ActionPage from './Action/page'

function ServicesPage() {
  const dispatch = useDispatch()
  const {analysisProperties ,topProperties  , topThreeBookings , conversationsLatestUnseen} = useSelector((state)=>state.Home)

  useEffect(()=>{
    dispatch(getPropertiesAnalysisThunk())
    dispatch(getPropertiesTopThunk())
    dispatch(gettopThreeBookingsThunk())
    dispatch(getconversationsLatestUnseenThunk())
  },[dispatch])

  console.log(topThreeBookings);
  return (
    <MainLayout>

      <TileOfSevicesPage/>
      
      <BoxPage analysisProperties={analysisProperties}/>
      
      <Cardspage topProperties={topProperties}/>

      <div className='grid grid-cols-2 gap-6'>
        <UpcomingBookingsPage topThreeBookings={topThreeBookings}/>
        <div>
          <PerformancePage analysisProperties={analysisProperties}/>
          <ChatPage conversationsLatestUnseen={conversationsLatestUnseen}/>
        </div>
      </div>

      <ActionPage analysisProperties={analysisProperties}/>

    </MainLayout>
  )
}

export default ServicesPage