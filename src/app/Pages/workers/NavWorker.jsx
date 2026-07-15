'use client'
import AddBtn from '@/app/Components/Buttons/AddBtn'
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React from 'react'
import { useTranslation } from 'react-i18next'

function NavWorker({handleClickOpen, onSearch}) {
  const {t} = useTranslation()
  return (
    <>
      <div className="page-hero flex justify-between items-center gap-4 flex-wrap">
        <div>
          <p className='text-[#364152] text-xl font-semibold leading-tight'>{t('List of workers')}</p>
          <p className='text-[#697586] text-sm font-normal mt-0.5'>{t('Manage your workers easily — review all workers and track their performance.')}</p>
        </div>
        <AddBtn href="/Pages/workers/Add" label="Adding a worker" />
      </div>

      <section className='flex gap-3 mb-8'>
        <SearchForm
          placeholderKey="Search by name"
          onChange={(e) => onSearch(e.target.value)}
        />
        <FilterBtn onClick={handleClickOpen}/>
      </section>
    </>
  )
}

export default NavWorker
