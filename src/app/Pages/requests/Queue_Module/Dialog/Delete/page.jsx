"use client"
import React from 'react'
import Dialog from '@mui/material/Dialog';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { rejectReservationThunk } from '@/redux/slice/Requests/RequestsSlice';

function DeletePage({ open, setOpen, reservationData }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleReject = () => {
    if (reservationData?.id) {
      dispatch(rejectReservationThunk(reservationData.id)).then((res) => {
        if (!res.error) {
          setOpen(false)
          window.location.reload()
        }
      })
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "ServiceDeletePage-dialog" }}
    >
      {/* Close */}
      <button onClick={() => setOpen(false)} className="modal-close" aria-label={t('cancel')}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="flex flex-col items-center text-center px-8 pt-9 pb-6">
        {/* Danger icon */}
        <div className="modal-icon-danger mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="text-[#364152] text-lg font-bold mb-2 max-w-[340px]">
          {t('Are you sure you want to reject this reservation?')}
        </h2>
        <p className="text-[#697586] text-sm font-normal leading-relaxed max-w-[360px]">
          {t('This reservation request will be rejected and the customer will be notified immediately.')}
        </p>
      </div>

      <div className="modal-footer">
        <button onClick={() => setOpen(false)} className="btn-ghost flex-1">
          {t('cancel')}
        </button>
        <button onClick={handleReject} className="btn-danger flex-1">
          {t('Reject reservation')}
        </button>
      </div>
    </Dialog>
  )
}

export default DeletePage
