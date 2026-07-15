"use client"
import React, { useState, useEffect } from 'react'
import TitleOfIncome_analysisPage from './TitleOfIncome_analysis/page'
import ChartPage from './Chart/page'
import { useDispatch, useSelector } from 'react-redux'
import { getRevenueChartDataThunk } from '@/redux/slice/Finance/FinanceSlice'

function Income_analysisPage() {
  const dispatch = useDispatch();
  const { revenueChartData } = useSelector((state) => state.finance);
  const [filter, setFilter] = useState('all');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    dispatch(getRevenueChartDataThunk({ year: currentYear, filter }));
  }, [dispatch, currentYear, filter]);

  return (
    <>
    <div className='border border-[#E3E8EF] rounded-[6px] mb-12'>
      <TitleOfIncome_analysisPage selectedFilter={filter} onFilterChange={setFilter}/>
      <hr className='border border-[#E3E8EF] w-full mt-4'></hr>
      <ChartPage dispatch={dispatch} revenueChartData={revenueChartData}/>
      
    </div>
  
    </>
  )
}

export default Income_analysisPage
