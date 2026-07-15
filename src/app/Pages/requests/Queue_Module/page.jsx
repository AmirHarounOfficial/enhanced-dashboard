"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import BoxPage from './Box/page'
import NavRequest from './NavRequest'
import CardOfRequests from './CardOfRequests'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getReservationsThunk } from '@/redux/slice/Requests/RequestsSlice'

function Queue_ModulePage() {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {getReservations} = useSelector((state)=>state.requests) 
  const getReservationsSummary = getReservations?.summary
  const getReservationsData = getReservations?.data



  return (
    <MainLayout>
      <p className='text-[#364152] text-2xl font-medium mb-10'>{t('Reservations')}</p>

      <BoxPage getReservationsSummary={getReservationsSummary}/>
      
      <div>
        <NavRequest/>
        <CardOfRequests getReservationsData={getReservationsData}/>
      </div>
      
    </MainLayout>
  )
}

export default Queue_ModulePage