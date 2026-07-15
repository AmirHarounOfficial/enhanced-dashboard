"use client"
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { ar } from 'date-fns/locale';

// ─── AddDialog now accepts formData + setFormData ────────────────────────────
function AddDialog({ open, setOpen, formData, setFormData }) {
  const { t } = useTranslation()
  const [openCalendar, setOpenCalendar] = useState(false);
  const [periodName, setPeriodName]     = useState('');
  const [price, setPrice]               = useState('');
  const [error, setError]               = useState('');

  const [range, setRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [selectedText, setSelectedText] = useState('');

  const handleApply = () => {
    const { startDate, endDate } = range[0];
    const formatted = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    setSelectedText(formatted);
    setOpenCalendar(false);
  };

  const toDateStr = (date) => {
    const yyyy = date.getFullYear();
    const mm   = String(date.getMonth() + 1).padStart(2, '0');
    const dd   = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSave = () => {
    // Basic validation
    if (!periodName.trim()) { setError(t('Please enter a period name')); return; }
    if (!selectedText)      { setError(t('Please select a date range'));  return; }
    if (!price)             { setError(t('Please enter a price'));         return; }

    setError('');

    const newEntry = {
      id:    Date.now(),          // temp local id until backend assigns one
      title: periodName.trim(),
      from:  toDateStr(range[0].startDate),
      to:    toDateStr(range[0].endDate),
      price: Number(price),
    };

    setFormData(prev => ({
      ...prev,
      seasonal_pricing: [...(prev.seasonal_pricing || []), newEntry],
    }));

    // Reset fields
    setPeriodName('');
    setPrice('');
    setSelectedText('');
    setRange([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "ServicePage-dialog" }}
      >
        <section className="px-6 mt-6">
          <button onClick={() => setOpen(false)} className="modal-close" aria-label={t('cancel')}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
          <p className='text-[#364152] text-lg font-bold flex justify-center mb-4'>
            {t('Add pricing')}
          </p>
        </section>

        <section className='px-6'>
          {/* Period name */}
          <div className='w-full mb-4'>
            <label className='text-[#364152] text-sm font-medium mb-2 block'>{t('Period name')}</label>
            <input
              type="text"
              value={periodName}
              onChange={(e) => setPeriodName(e.target.value)}
              placeholder='مثال: اجازة عيد الفطر'
              className='w-full border border-[#E3E8EF] rounded-[10px] px-4 h-11 text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]'
            />
          </div>

          {/* Date selection */}
          <div className="flex flex-col mb-4">
            <label className="text-[#364152] text-sm font-medium mb-2 block">
              {t("Date selection")}
            </label>

            <div
              className="relative flex items-center border border-[#E3E8EF] rounded-[10px] cursor-pointer bg-white transition-all duration-150 hover:border-[#C69815]/40"
              onClick={() => setOpenCalendar(true)}
            >
              <input
                type="text"
                placeholder={t("Select date range")}
                value={selectedText}
                readOnly
                className="h-11 px-4 w-full text-sm text-[#364152] bg-transparent outline-none cursor-pointer placeholder-[#9AA4B2] rounded-[10px]"
              />
              <span className="absolute end-4 pointer-events-none">
                <img src="/images/icons/calender.svg" alt="calendar" />
              </span>
            </div>

            <Dialog
              open={openCalendar}
              onClose={() => setOpenCalendar(false)}
              PaperProps={{ className: "rerquest-dialog", dir: "rtl" }}
            >
              <section className="flex justify-between px-6 mt-6">
                <button
                  onClick={() => setOpenCalendar(false)}
                  className="border border-[#E3E8EF] w-12 h-12 rounded-full flex items-center justify-center"
                >
                  <img src="/images/icons/xx.svg" alt="close" className="w-6 h-6" />
                </button>
                <div className="w-14 h-14 bg-[#EEF2F6] rounded-full flex items-center justify-center">
                  <img src="/images/icons/FilterGreyicon.svg" alt="" className="w-6 h-6" />
                </div>
              </section>

              <span className="border border-[#E3E8EF] my-2" />

              <section className="p-6 flex justify-center">
                <div dir="ltr">
                  <DateRangePicker
                    onChange={(item) => setRange([item.selection])}
                    ranges={range}
                    months={2}
                    direction="horizontal"
                    locale={ar}
                    rangeColors={["var(--color-primary)"]}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                  />
                </div>
              </section>

              <section className="p-6 flex gap-4">
                <button
                  onClick={handleApply}
                  className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-[6px] text-base font-medium"
                >
                  {t("apply")}
                </button>
                <button
                  onClick={() => setOpenCalendar(false)}
                  className="px-6 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[6px] text-base font-medium"
                >
                  {t("cancel")}
                </button>
              </section>
            </Dialog>
          </div>

          {/* Price */}
          <div className='w-full mb-2'>
            <label className='text-[#364152] text-sm font-medium mb-2 block'>{t('the price')}</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={t('Enter the price')}
              className='w-full border border-[#E3E8EF] rounded-[10px] px-4 h-11 text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]'
            />
          </div>

          {error && <p className='text-[#F04438] text-sm font-normal mb-1'>{error}</p>}
          <p className='text-[#F04438] text-sm font-normal'>
            {t('Note: This price will replace the original price of the property during the specified period.')}
          </p>
        </section>

        {/* Buttons */}
        <div className="modal-footer">
          <button
            onClick={handleSave}
            className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold"
          >
            {t("It was completed")}
          </button>
          <button
            onClick={() => setOpen(false)}
            className="btn-ghost flex-1"
          >
            {t("cancel")}
          </button>
        </div>
      </Dialog>
    </>
  )
}

export default AddDialog



