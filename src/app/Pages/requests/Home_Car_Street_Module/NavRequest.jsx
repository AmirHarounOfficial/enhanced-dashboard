"use client"
import ExtractBtn from '@/app/Components/Buttons/ExtractBtn'
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FiltersPage from './Filters/page'


function NavRequest({ onApplyFilters, onResetFilters, onSearch }) {
  const{t}= useTranslation()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="page-hero flex justify-between items-center gap-4 flex-wrap">
        <div>
          <p className='text-[#364152] text-xl font-semibold leading-tight'>{t('Orders and reservations')}</p>
          <p className='text-[#697586] text-sm font-normal mt-0.5'>{t('A comprehensive view of all your requests and reservations')}</p>
        </div>
        <ExtractBtn/>
      </div>

      <section className='flex gap-3 mb-8'>
        <SearchForm
          placeholderKey="Search by order number"
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
        <FilterBtn onClick={handleClickOpen} />
      </section>

      <FiltersPage open={open} handleClose={handleClose} onApplyFilters={onApplyFilters} onResetFilters={onResetFilters} />
    </>
  )
}

export default NavRequest
