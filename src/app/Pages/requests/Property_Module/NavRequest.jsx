"use client"
import ExtractBtn from '@/app/Components/Buttons/ExtractBtn'
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FiltersPage from './Filters/page'

function NavRequest({ onApplyFilters, onSearch }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="page-hero flex justify-between items-center gap-4 flex-wrap">
        <div>
          <p className="text-[#364152] text-xl font-semibold leading-tight">{t('Orders')}</p>
          <p className="text-[#697586] text-sm mt-0.5">{t('A comprehensive overview of all your orders')}</p>
        </div>
        <ExtractBtn />
      </div>

      <section className="flex gap-3 mb-6">
        <SearchForm
          placeholderKey="Search by order number"
          onChange={(e) => onSearch(e.target.value)}
        />
        <FilterBtn onClick={() => setOpen(true)} />
      </section>

      <FiltersPage
        open={open}
        handleClose={() => setOpen(false)}
        onApplyFilters={(filters) => {
          onApplyFilters(filters);
          setOpen(false);
        }}
      />
    </>
  )
}

export default NavRequest
