"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState, useEffect } from 'react'
import BoxPage from './Box/page'
import RatePage from './Rate/page'
import AbbreviationsPage from './Abbreviations/page'
import TileOfSevicesPage from './TileOfSevices/page'
import CardsPage from './Cards/page'

function ServicesPage() {
  const [current_module_key, setCurrentModuleKey] = useState(null)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setCurrentModuleKey(userData?.current_module_key ?? null)
  }, [])

  return (
    <MainLayout>
      <TileOfSevicesPage current_module_key={current_module_key}/>
      <BoxPage current_module_key={current_module_key}/>
      <CardsPage current_module_key={current_module_key}/>
      <RatePage/>
      <AbbreviationsPage/>
    </MainLayout>
  )
}

export default ServicesPage