"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'
import NavWorker from './NavWorker'
import TableWorkers from './TableWorkers'
import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from 'react-redux'
import { getAllWorkersThunk, getDesignationsThunk, setPage } from '@/redux/slice/Workers/WorkersSlice'

function WorkersPage() {
  const FiltersPage = dynamic(() => import("./Filters/page"), { ssr: false });

    const [open, setOpen] = useState(false);
    const [filterParams, setFilterParams] = useState({});

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleApply = (filters) => {
      setFilterParams(filters);
      dispatch(setPage(1));
      handleClose();
    };

    const handleReset = () => {
      setFilterParams({});
      dispatch(setPage(1));
    };

    const handleSearch = (term) => {
      setFilterParams(prev => {
        const newParams = { ...prev, search: term };
        if (!term) delete newParams.search;
        return newParams;
      });
      dispatch(setPage(1));
    }


    //api
    const dispatch = useDispatch();
    const {workers , loading , error, currentPage, totalPages ,getDesignations}=useSelector(state=>state.workers)

    useEffect(() => {
      dispatch(getAllWorkersThunk({ page: currentPage, limit: 10, ...filterParams }));
      
    }, [dispatch,currentPage, filterParams]);

    useEffect(()=>{
      dispatch(getDesignationsThunk())
    },[dispatch])  
    
    


  const handlePageChange = (page) => {
      dispatch(setPage(page)); 
    }

  return (
    <MainLayout>
      <NavWorker 
        handleClickOpen={handleClickOpen}
        onSearch={handleSearch}
      />

      <TableWorkers 
        workers={workers} 
        loading={loading}
      />

      <Pagination
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />

      <FiltersPage 
        open={open} 
        handleClose={handleClose} 
        getDesignations={getDesignations} 
        onApply={handleApply}
        onReset={handleReset}
        currentFilters={filterParams}
      />

    </MainLayout>
  )
}

export default WorkersPage