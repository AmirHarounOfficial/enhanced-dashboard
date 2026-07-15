'use client';
import React, { useEffect } from 'react'
import NewOrdersPage from './NewOrders/page'
import CurrentOrdersPage from './CurrentOrders/page'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/app/Components/Loader/Loader';
import { getBookingNewThunk, getBookingOngoingThunk } from '@/redux/slice/Home/HomeSlice';

function HomeAndCarServiceCardPages({current_module_key}) {
  const {ongoingBookings,newBookings , loading ,error}= useSelector((state)=>state.Home)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getBookingNewThunk())
    dispatch(getBookingOngoingThunk())
  },[dispatch])


  const newOrders = newBookings ;

  const currentOrders = ongoingBookings ;

  // console.log("newOrders**",newOrders);
  // console.log("currentOrders***",currentOrders);

  const isNewOrdersEmpty = !newOrders || newOrders.length === 0;
  const isCurrentOrdersEmpty = !currentOrders || currentOrders.length === 0;

  if (isNewOrdersEmpty && isCurrentOrdersEmpty) {
    return null;
  }

  if (isNewOrdersEmpty && !isCurrentOrdersEmpty) {
    return <CurrentOrdersPage orders={currentOrders} layout="grid" />;
  }

  if (!isNewOrdersEmpty && isCurrentOrdersEmpty) {
    return <NewOrdersPage orders={newOrders} layout="grid" />;
  }


  return (
    <>
    
      <div className={`grid grid-cols-1 lg1:grid-cols-2 gap-6`}>
        <NewOrdersPage orders={newOrders} current_module_key={current_module_key}/>
        <CurrentOrdersPage orders={currentOrders} current_module_key={current_module_key} />
      </div>
    </>
  )
}

export default HomeAndCarServiceCardPages