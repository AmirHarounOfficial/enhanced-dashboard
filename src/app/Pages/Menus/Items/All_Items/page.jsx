'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Card from './Card'

function All_ItemsPage({getItems}) {
    const {t} = useTranslation()
  
  return (
      <>
        <div className='border border-[#E3E8EF] py-8 px-6 rounded-[6px]'>
          <div className=' mb-6'>
            
            <p className='text-[#364152] text-xl font-medium'>{t('List of items')} </p>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <Card  getItems={getItems}/>
          </div>
        </div>
        </>
  )
}

export default All_ItemsPage
