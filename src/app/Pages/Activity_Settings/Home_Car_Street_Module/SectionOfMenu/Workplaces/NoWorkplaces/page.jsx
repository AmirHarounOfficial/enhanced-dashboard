'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MapDialog from '../Dialog/MapDialog'

function NoWorkplacesPage() {
  const {t} = useTranslation()
  const [openMap, setOpenMap] = useState(false)
  return (
    <>
    
    <div className='p-6'>
      <div className='flex flex-col items-center'>
        <img src="/images/NoWorkplaces.svg" alt="" className='w-78 h-57'/>
        <p className='text-[#0F022E] text-xl font-medium'>{t('She hasnot added any space yet.')}</p>
        <button 
          onClick={() => setOpenMap(true)}
          className='flex items-center justify-center gap-2 w-[30%] h-14 bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer my-6'
        >
          <span>{t('Add a place')}</span>
          <img src="/images/icons/AddIcon.svg" alt="" className='w-6 h-6'/>
        </button>
      </div>
    </div>
    
    <MapDialog open={openMap}  handleClose={() => setOpenMap(false)} />
    </>
  )
}

export default NoWorkplacesPage
