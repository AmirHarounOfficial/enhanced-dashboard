"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './List/Header';
import Box from './List/Box';
import Filter from './List/Filter';
import Cards from './List/Cards';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import No_Guest_Add from './List/No_Guest_Add';
import { useDispatch, useSelector } from 'react-redux';
import { getWaitingListThunk, getwaitlistAnalysisThunk } from '@/redux/slice/Pending_List/Pending_ListSlice';
import Pagination from './List/Pagination';



function Pending_ListPage() {
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState('coming');
  const [openAdd , setOpenAdd] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  //api
  const dispatch = useDispatch()
  const {getwaitlistAnalysis ,getWaitingList} = useSelector((state)=>state.PendingList)

  useEffect (()=>{
    dispatch(getwaitlistAnalysisThunk())
  },[dispatch])

  useEffect(() => {
    dispatch(getWaitingListThunk({ page: currentPage, type: activeTab }))
  }, [dispatch, currentPage, activeTab])

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    dispatch(getWaitingListThunk({ page: currentPage, type: activeTab }))
    dispatch(getwaitlistAnalysisThunk())
  };

  const pageNumber = getWaitingList?.current_page || getWaitingList?.meta?.current_page || getWaitingList?.pagination?.current_page || currentPage;
  const totalPages = getWaitingList?.last_page || getWaitingList?.meta?.last_page || getWaitingList?.pagination?.last_page || 1;

  console.log('getWaitingList', getWaitingList);

  return (
    <MainLayout>
      <Header openAdd={openAdd} setOpenAdd={setOpenAdd}/>
      <Box getwaitlistAnalysis={getwaitlistAnalysis}/>

      <div className='bg-white border border-[#E3E8EF] rounded-[8px] p-6 mb-6'>
        <Filter activeTab={activeTab} setActiveTab={handleTabChange}/>

        {!getWaitingList?.data?.length ? (
          <No_Guest_Add setOpenAdd={setOpenAdd}/>
        ) : (
          <>
            <Cards activeTab={activeTab} getWaitingList={getWaitingList} refresh={handleRefresh}/>
            <Pagination
              currentPage={pageNumber}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default Pending_ListPage
