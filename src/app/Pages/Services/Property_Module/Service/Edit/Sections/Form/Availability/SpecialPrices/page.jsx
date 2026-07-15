"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddDialog from './AddDialog'

function SpecialPricesPage({ formData, setFormData, setDeletedSeasonalPrices }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const seasonalPricing = formData?.seasonal_pricing || [];

  const formatDateRange = (startDateStr, endDateStr) => {
    if (!startDateStr || !endDateStr) return '';
    const start = new Date(startDateStr);
    const end   = new Date(endDateStr);
    const months = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];

    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()}-${end.getDate()} ${months[start.getMonth()]}`;
    }
    return `${start.getDate()} ${months[start.getMonth()]} - ${end.getDate()} ${months[end.getMonth()]}`;
  };

  // ─── Delete a seasonal pricing entry ─────────────────────────────────────
  const handleDelete = (indexToRemove, id) => {
    if (id) {
      setDeletedSeasonalPrices(prev => [...prev, id]);
    }
    setFormData(prev => ({
      ...prev,
      seasonal_pricing: prev.seasonal_pricing.filter((_, i) => i !== indexToRemove),
    }));
  };

  return (
    <>
      <div className='border border-[#E3E8EF] p-3 rounded-[6px] mt-6'>

        <div className='flex justify-between w-full'>
          <div className='flex gap-2 w-full'>
            <img src="/images/icons/web-validation_blue.svg" className="w-5 h-5 mt-1" />
            <p className='text-[#364152] text-lg font-medium'>{t('Special prices')}</p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className='flex gap-0.5 w-full justify-end cursor-pointer'
          >
            <img src="/images/icons/add-circle.svg" className="w-4 h-4 mt-0.5" />
            <p className='text-[var(--color-primary)] text-sm font-medium'>{t('addition')}</p>
          </button>
        </div>

        <div className='grid grid-cols-2 gap-3 mt-4'>
          {seasonalPricing.map((item, index) => (
            <div key={item.id || index} className='border border-[#E3E8EF] p-4 flex flex-col gap-1 rounded-[6px]'>
              <div className='flex justify-between'>
                <p className='text-[#364152] text-base font-medium'>{item.title || 'سعر خاص'}</p>
                <button className='cursor-pointer' onClick={() => handleDelete(index, item.id)}>
                  <img src="/images/icons/delete_red.svg" alt="delete" />
                </button>
              </div>

              <p className='text-[#4B5565] text-base font-normal'>
                <span dir="rtl">{formatDateRange(item.from, item.to)} : </span>
                <span>سعر ثابت</span>
              </p>

              <p className='text-[var(--color-primary)] text-base font-semibold'>
                <span>{t('the price')} : </span>
                <span>{item.price} جنية</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className='bg-[#F8FAFC] border border-[#EEF2F6] rounded-[6px] p-3 mt-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/ii_blue.svg" className="w-6 h-6" />
          <span className='text-[#364152] text-base font-medium'>{t('Savings Summary')}</span>
        </p>
        <p className='text-[#4B5565] text-base font-normal'>
          25 يومًا متاحة هذا الشهر مع تطبق قواعد التسعير الخاصة
        </p>
      </div>

      {/* ✅ Pass formData + setFormData so dialog can push to seasonal_pricing */}
      <AddDialog
        open={open}
        setOpen={setOpen}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  )
}

export default SpecialPricesPage

