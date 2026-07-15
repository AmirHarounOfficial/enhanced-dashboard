"use client"
import React, { Suspense, useEffect, useState } from 'react'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import No_services_Add from './No_services_Add'
import CardOfService from './CardOfService'
import Pagination from './Pagination'
import SearchForm from '@/app/Components/Forms/SearchForm'
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import AddBtn from '@/app/Components/Buttons/AddBtn'
import { useTranslation } from 'react-i18next'
import FiltersPage from './Filters/page'
import { useDispatch, useSelector } from 'react-redux'
import { useSelect } from '@heroui/react'
import { getAllPropertiesThunk } from '@/redux/slice/Services/ServicesSlice'

function ServiceContent() {
  const {t} = useTranslation()

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const dispatch = useDispatch()
  const {getProperties, propertiesMeta} = useSelector((state)=>state.services)
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(()=>{
    const delayDebounceFn = setTimeout(() => {
      dispatch(getAllPropertiesThunk({ page: 1, search: searchQuery, ...activeFilters }))
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, activeFilters, dispatch])

  const handlePageChange = (page) => {
    dispatch(getAllPropertiesThunk({ page, search: searchQuery, ...activeFilters }))
  }


  return (
    <MainLayout>
      {(!getProperties || getProperties.length === 0) ? (
        <No_services_Add/>
      ) : (
        <div>
          {/* //header and add btn */}
          <div className=" flex justify-between mb-8">
            <div>
              <p className="text-[#000] text-2xl font-medium flex items-center mb-3">{t("My properties")}</p>
              <p className='text-[#697586] text-base font-normal'>{t('A comprehensive overview of all your properties')}</p>
            </div>
            
            <AddBtn               
              href="/Pages/Services/Property_Module/Service/Add"
              label="Adding a new property" 
            />
          </div>
          {/* //search and filter */}
          <div className="flex gap-6 mb-4">
            <SearchForm  
              placeholderKey="Search by property name or number" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FilterBtn onClick={handleClickOpen}/>
          </div>

          {/* //services list */}
          <div className='grid grid-cols-2 lg1:grid-cols-3 gap-6'>
            <CardOfService getProperties={getProperties}/>
          </div>

          {propertiesMeta && propertiesMeta.total_pages > 1 && (
            <Pagination meta={propertiesMeta} onPageChange={handlePageChange} />
          )}

        </div>
      )}

      <FiltersPage
        open={open} 
        setOpen={setOpen}
        handleClose={handleClose}
        onApplyFilters={(filters) => {
          setActiveFilters(filters);
        }}
      />
    </MainLayout>
  )
}


export default function ServicePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceContent />
    </Suspense>
  );
}