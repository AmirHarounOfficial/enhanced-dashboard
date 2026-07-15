"use client"
import React from 'react'
import Personal_DataPage from './Personal_Data/page'

function FreelancePage({ open, setOpen }) {
  return (
  
    <>
      <Personal_DataPage open={open} setOpen={setOpen} />
    </>
  )
}

export default FreelancePage