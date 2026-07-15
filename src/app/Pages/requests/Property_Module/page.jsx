"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState, useRef, Suspense } from 'react'
import NavRequest from './NavRequest'
import CardOfRequest from './CardOfRequest'
import Pagination from './Pagination'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookingPropertyThunk, getPropertyBookingByIdThunk } from '@/redux/slice/Requests/RequestsSlice'
import Loader from '@/app/Components/Loader/Loader'

function Property_ModuleContent() {

  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const serviceid = searchParams.get('serviceid')

  const { getBooking, getBookingPagination, getPropertyBooking } = useSelector((state) => state.requests)

  const [filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
 
  useEffect(() => {
    if (serviceid) {
      dispatch(getPropertyBookingByIdThunk(serviceid))
    } else {
      dispatch(getAllBookingPropertyThunk({ ...filters, page: currentPage, per_page: 10 }))
    }
  }, [dispatch, filters, currentPage, serviceid])

  const currentBooking = serviceid ? getPropertyBooking : getBooking;

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    if (serviceid) {
      router.replace(pathname, { scroll: false })
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const searchTimerRef = useRef(null)
  const handleSearch = (value) => {
    clearTimeout(searchTimerRef.current)
    searchTimerRef.current = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: value }))
      setCurrentPage(1)
    }, 500)
  }

  const hasActiveFilters = Object.values(filters).some(v =>
    Array.isArray(v) ? v.length > 0 : v !== '' && v !== undefined && v !== null
  )

  return (
    <MainLayout>
      <NavRequest onApplyFilters={handleApplyFilters} onSearch={handleSearch}/>

      <div className='grid grid-cols-2 lg1:grid-cols-3 gap-6'>
        <CardOfRequest getBooking={currentBooking} hasActiveFilters={hasActiveFilters}/>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={getBookingPagination?.total_pages || 1}
        onPageChange={handlePageChange}
      />
    </MainLayout>
  )
}

function Property_ModulePage() {
  return (
    <Suspense fallback={<div><Loader/></div>}>
      <Property_ModuleContent />
    </Suspense>
  )
}

export default Property_ModulePage