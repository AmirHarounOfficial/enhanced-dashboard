"use client"
import Module_key from '@/app/Pages/dashboard/Main/Module_key'
import { Dialog } from '@mui/material'
import React from 'react'

function ServiceToggle({ openServiceToggle, setOpenServiceToggle }) {
  return (
    <Dialog
      open={openServiceToggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "ServicePage-dialog" }}
    >
      <div className="flex justify-between items-center pt-6 px-6">
        <button
          onClick={() => setOpenServiceToggle(false)}
          className="modal-close"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div className="p-6">
        <Module_key onClose={() => setOpenServiceToggle(false)} />
      </div>
    </Dialog>
  )
}

export default ServiceToggle
