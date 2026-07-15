"use client"

import React, { useEffect, useState } from 'react'
import CardsPage from './Cards/page'
import TransactionsPage from './Transactions/page'
import { useDispatch, useSelector } from 'react-redux'
import { getTaxesDataThunk, getTransactionsWalletThunk } from '@/redux/slice/Finance/FinanceSlice'

function walletPage() {
  const dispatch = useDispatch()
  const {TaxesData , WalletTransactionsData , WalletPagination ,loading ,error} = useSelector((state)=>state.finance)
  
  const [activeTab, setActiveTab] = useState("completed");

  const getStatusFilter = (tab) => {
    if (tab === "completed") return "completed";
    if (tab === "review") return "pending";
    return "";
  }

  useEffect(()=>{
    dispatch(getTaxesDataThunk())
    dispatch(getTransactionsWalletThunk({ page: 1, status: getStatusFilter(activeTab) }))
  } , [dispatch, activeTab])

  const handlePageChange = (page) => {
    dispatch(getTransactionsWalletThunk({ page, status: getStatusFilter(activeTab) }))
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // useEffect will trigger fetch
  }

  return (
    <>      <CardsPage TaxesData={TaxesData}/>

      <TransactionsPage 
        WalletTransactionsData={WalletTransactionsData} 
        loading={loading} 
        error={error}
        currentPage={WalletPagination?.current_page || 1}
        totalPages={WalletPagination?.last_page || 1}
        handlePageChange={handlePageChange}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
    </>
  )
}

export default walletPage