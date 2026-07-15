"use client"

import React, { useEffect } from 'react'
import CardsPage from './Cards/page'
import Income_analysisPage from './Income_analysis/page'
import TransactionsPage from './Transactions/page'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentsDataThunk, getTransactionsOverviewThunk } from '@/redux/slice/Finance/FinanceSlice'

function OverviewPage() {
  const dispatch = useDispatch();
  const { paymentsData, TransactionsData, TransactionsPagination, loading, error } = useSelector((state) => state.finance);
  const [filters, setFilters] = React.useState({});

  useEffect(() => {
    dispatch(getPaymentsDataThunk());
    dispatch(getTransactionsOverviewThunk({ page: 1, filters }));
  }, []);

  // Handle pagination page change
  const handlePageChange = (page) => {
    dispatch(getTransactionsOverviewThunk({ page, filters }));
  };

  // Handle filter apply
  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    dispatch(getTransactionsOverviewThunk({ page: 1, filters: newFilters }));
  };

  // console.log('paymentsData' ,paymentsData);

  return (
    <>
      <CardsPage paymentsData={paymentsData} />
      <Income_analysisPage />
      <TransactionsPage
        TransactionsData={TransactionsData}
        loading={loading}
        pagination={TransactionsPagination}
        onPageChange={handlePageChange}
        onFilterApply={handleFilterApply}
      />
    </>
  )
}

export default OverviewPage