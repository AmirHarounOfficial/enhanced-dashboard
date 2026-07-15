"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import Content from './Content'
import Header from './Header'


function AdvancedSettingsPages() {
    const {t} = useTranslation()
  
  return (
    <>
      <div className='border border-[#E3E8EF] '>
        <Header/>
        <div className='px-6 py-4'>
          <Content/>

      
        </div>
      </div>

    </>
  )
}

export default AdvancedSettingsPages

