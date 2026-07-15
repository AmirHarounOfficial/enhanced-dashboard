"use client";
import React from 'react'
import { Dialog } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

function Complete_Data({ setNationalId }) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleCompleteData = () => {
    router.push('/Pages/dashboard/TemporaryDashboard/CompleteSignupData');
    setNationalId(true);
  };

  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "ServicePage-dialog" }}
    >
      <section className="px-6 pt-6">
        <button
          onClick={() => setNationalId(true)}
          className="modal-close"
          aria-label={t('cancel')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
      </section>

      <div className="flex flex-col items-center px-8 pt-8 pb-4">
        <div className="modal-icon-gold mb-5">
          <img src="/images/icons/alert-yellow.svg" alt="" className="w-8 h-8" />
        </div>
        <p className="text-[#364152] text-lg font-bold text-center mb-2">
          {t('Please complete your details and subscribe before adding the service.')}
        </p>
      </div>

      <hr className="border-[#E3E8EF] mb-6" />

      <div className="px-6 mb-6">
        <button
          onClick={handleCompleteData}
          className="btn-primary h-11 w-full px-6 rounded-[10px] text-white text-sm font-semibold"
        >
          {t("Complete your data")}
        </button>
      </div>
    </Dialog>
  )
}

export default Complete_Data
