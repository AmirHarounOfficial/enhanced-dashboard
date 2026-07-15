"use client"
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import Personal_DataPage from './Personal_Data/page';

function CompanyPage({ open, setOpen }) {
  const {t} = useTranslation();
  return (
  <>
  <Personal_DataPage  open={open} setOpen={setOpen}/>
  </>
  )
}

export default CompanyPage