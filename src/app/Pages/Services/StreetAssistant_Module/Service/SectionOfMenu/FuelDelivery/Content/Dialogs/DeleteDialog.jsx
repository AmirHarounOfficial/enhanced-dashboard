'use client'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

function DeleteDialog({open,setOpen, onConfirm }) {
    const {t} = useTranslation();
  
  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: "ServiceDeletePage-dialog",
      }}
    >
      <button onClick={()=>setOpen(false)} className="modal-close" aria-label={t('cancel')}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
      </button>
      <div className="flex flex-col items-center text-center px-8 pt-9 pb-6">
        <div className="modal-icon-danger mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </div>
        <h2 className="text-[#364152] text-lg font-bold mb-2 max-w-[340px]">
          {t('Are you sure you want to delete this policy?')}
        </h2>
        <p className="text-[#697586] text-sm font-normal leading-relaxed max-w-[360px]">
          {t('This policy will be removed from your list and will no longer be available.')}
        </p>
      </div>
      <div className="modal-footer">
        <button onClick={()=>setOpen(false)} className="btn-ghost flex-1">{t('cancel')}</button>
        <button onClick={onConfirm} className="btn-danger flex-1">{t('delete')}</button>
      </div>
    </Dialog>
    </>
  )
}

export default DeleteDialog


