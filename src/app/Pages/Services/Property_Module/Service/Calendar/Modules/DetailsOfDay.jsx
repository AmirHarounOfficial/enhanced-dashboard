"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';

function DetailsOfDay({ selectedDayInfo, onClose }) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={!!selectedDayInfo}
      PaperProps={{
        className: "ServiceDeletePage-dialog",
      }}
    >
      {selectedDayInfo && (
        <div className="bg-white  ">
          
          <div className='py-6 px-6'>
            <button 
              onClick={onClose} 
              className='border border-[rgba(102,107,109,0.20)] w-12 h-12  rounded-[58.182px] flex justify-center items-center cursor-pointer'
            > 
              <img src="/images/icons/xx.svg" alt="" />
            </button>
          </div>
          
          <div className='mb-8 px-6 flex items-center gap-3'>
            <span className={`w-4 h-4 rounded-full ${selectedDayInfo.colorClass}`}></span>
            <span className='text-[#364152] text-2xl font-medium'>{selectedDayInfo.status}</span>
          </div>

          <div className='mb-6 px-6'>
            <span className='text-[#697586] text-xl font-normal'>{t('the date')} : </span>
            <span className='text-[#364152] text-xl font-normal'>{selectedDayInfo.date}</span>
          </div>

          <div className='mb-6 px-6'>
            <span className='text-[#697586] text-xl font-normal'>{t('Status')} : </span>
            <span className='text-[#364152] text-xl font-normal'>{selectedDayInfo.statusDetails}</span>
          </div>
    
          <div className='px-6 mb-6'>
            <button 
              onClick={onClose} 
              className='w-full  flex items-center justify-center bg-[var(--color-primary)] text-white h-14 cursor-pointer'>
              {t('closing')}
            </button>
          </div>
          



          {/* <div className='px-6' >
            <div className="flex justify-between items-center border-b border-[#E3E8EF] pb-3">
              <span className="font-semibold text-[#4B5565]">{t('Date') || "التاريخ"}:</span>
              <span className="font-medium">{selectedDayInfo.date}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="font-semibold text-[#4B5565]">{t('Status') || "النوع"}:</span>
              <span className="font-medium text-[var(--color-primary)]">{selectedDayInfo.status}</span>
            </div>
          </div> */}
        
        </div>
      )}
    </Dialog>
  );
}

export default DetailsOfDay;
