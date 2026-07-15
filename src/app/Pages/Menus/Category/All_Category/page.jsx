'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Card from './Card'
import Pagination from './Pagination'

function All_CategoryPage({ onViewCategoryItems, getCategories, meta, currentPage, onPageChange }) {
  const {t} = useTranslation()
  return (
    <>
        <div className='border border-[#E3E8EF] py-8 px-6 rounded-[6px]'>
          <p className='text-[#364152] text-xl font-medium mb-6'>{t('List categories')}</p>

          <div className='grid grid-cols-2 gap-6'>
            <Card onViewCategoryItems={onViewCategoryItems} getCategories={getCategories}/>
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={meta?.last_page || 1}
            onPageChange={onPageChange}
          />
      </div>
    </>
  )
}

export default All_CategoryPage
