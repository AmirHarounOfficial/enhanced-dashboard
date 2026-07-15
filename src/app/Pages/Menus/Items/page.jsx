'use client'
import React, { useEffect } from 'react'
import All_ItemsPage from './All_Items/page'
import No_Items from './No_Items'
import { getItemsThunk } from '@/redux/slice/Menus/MenusSlice'
import { useDispatch, useSelector } from 'react-redux'

function ItemsPage({setOpenAddItem}) {
  const dispatch = useDispatch()
  const {getItems} = useSelector((state)=>state.Menus)
  
  useEffect(()=>{
    dispatch(getItemsThunk())
  },[dispatch])

  // console.log('getItems' , getItems);

  return (
    <>
      {/* <No_Items setOpenAddItem={setOpenAddItem}/> */}
      <All_ItemsPage getItems={getItems}/>
    </>
  )
}

export default ItemsPage