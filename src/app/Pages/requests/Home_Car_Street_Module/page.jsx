'use client'
import React, { Suspense, useEffect, useState } from 'react'
import NavRequest from './NavRequest'
import TableRequest from './TableRequest'
import Pagination from './Pagination'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getBookingsThunk } from '@/redux/slice/Requests/RequestsSlice'
import Loader from '@/app/Components/Loader/Loader'

function RequestsPage() {
  const dispatch = useDispatch()
  const {bookings ,bookingDetails, loading , error, pagination } =useSelector((state)=>state.requests)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{
    const fetchBookings = () => {
      dispatch(getBookingsThunk({ page: currentPage, ...filters }))
    }

    fetchBookings()

    window.addEventListener('booking_updated', fetchBookings)

    return () => {
      window.removeEventListener('booking_updated', fetchBookings)
    }
  },[dispatch, currentPage, filters])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  return (
    <MainLayout>

      <NavRequest 
        onApplyFilters={handleApplyFilters} 
        onResetFilters={handleResetFilters} 
        onSearch={setSearchTerm}
      />

      <Suspense fallback={<Loader />}>
        <TableRequest bookings={bookings} bookingDetails={bookingDetails} searchTerm={searchTerm}/>
      </Suspense>
      
      <Pagination
        totalPages={pagination?.last_page || 1}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

    </MainLayout>
  )
}

export default RequestsPage