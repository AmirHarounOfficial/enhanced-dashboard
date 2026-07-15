'use client'
import React, { useEffect } from 'react'
import Header from './Header'
import NoReviewsPage from './NoReviews/page'
import HaveReviewsPage from './HaveReviews/page'
import { useDispatch, useSelector } from 'react-redux'
import { getReviewThunk } from '@/redux/slice/Setting/SettingSlice'

function ReviewsPage() {
  const data = true 
  //api
  const dispatch = useDispatch();
  const {reviews , loading , error} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getReviewThunk())
  },[dispatch])

  
  return (

    <>
    <div className="border border-[#E3E8EF] rounded-[8px] mb-8 overflow-hidden">
      <Header />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : reviews?.data && reviews?.data.length > 0 ? (
        <HaveReviewsPage reviews={reviews} />
      ) : (
        <NoReviewsPage />
      )}
    </div>

    </>
  )
}

export default ReviewsPage
