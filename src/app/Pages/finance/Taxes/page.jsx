"use client"

import React, { useEffect } from 'react'
import HeaderOfTaxesPage from './HeaderOfTaxes/page'
import CardsPage from './Cards/page'
import TransactionsPage from './Transactions/page'
import { useDispatch, useSelector } from 'react-redux'
import { getTaxesDataThunk, getTransactionsTaxesThunk } from '@/redux/slice/Finance/FinanceSlice'

function TaxesPage() {
  const dispatch = useDispatch()
  const {TaxesData ,TaxesTransactionsData, TaxesPagination, loading , error} = useSelector((state)=>state.finance)

  useEffect(()=>{
    dispatch(getTaxesDataThunk())
    dispatch(getTransactionsTaxesThunk(1))
  },[dispatch])

  // Handle pagination page change
  const handlePageChange = (page) => {
    dispatch(getTransactionsTaxesThunk(page));
  };

  console.log('TaxesTransactionsData' , TaxesTransactionsData);
  return (
    <>
    <HeaderOfTaxesPage/>

    <CardsPage TaxesData={TaxesData}/>
    <TransactionsPage TaxesTransactionsData={TaxesTransactionsData} loading={loading} pagination={TaxesPagination} onPageChange={handlePageChange}/>

    </>
  )
}

export default TaxesPage