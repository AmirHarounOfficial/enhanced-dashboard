"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddDialog from './AddDialog'




function SpecialPricesPage({formData, setFormData}) {
  const {t} = useTranslation()
  
  const [open , setOpen] = useState(false)
  const [specialPrices, setSpecialPrices] = useState([])

const handleAddSpecialPrice = (newPrice) => {
  const updated = [...specialPrices, newPrice];
  setSpecialPrices(updated);

  setFormData(prev => ({
    ...prev,
    seasonal_pricing: updated.map(item => ({
      title: item.periodName,
      start_date: item.startDate,   // <-- من AddDialog
      end_date: item.endDate,       // <-- من AddDialog
      price: Number(item.price)
    }))
  }));
};

const handleDeleteSpecialPrice = (index) => {
  const updated = [...specialPrices];
  updated.splice(index, 1);
  setSpecialPrices(updated);

  setFormData(prev => ({
    ...prev,
    seasonal_pricing: updated.map(item => ({
      title: item.periodName,
      start_date: item.startDate,
      end_date: item.endDate,
      price: Number(item.price)
    }))
  }));
};

  return (
    <>
      <div className='border border-[#E3E8EF] p-3  rounded-[6px] mt-6'>

        <div className='flex justify-between w-full'>
          <div className='flex gap-2 w-full'>
            <img src="/images/icons/web-validation_blue.svg" className="w-5 h-5 mt-1 "/>
            <p className='text-[#364152] text-lg font-medium'>{t('Special prices')}</p>
          </div>

          <button 
            onClick={()=>setOpen(true)}
            className='flex gap-0.5 w-full justify-end cursor-pointer'>
            <img src="/images/icons/add-circle.svg" className="w-4 h-4 mt-0.5 " />
            <p className='text-[var(--color-primary)] text-sm font-medium'>{t('addition')}</p>
          </button>
        </div>

        <div className='grid grid-cols-2 gap-3 mt-4'>

          {specialPrices.map((item, index) => (
            <div key={index} className='border border-[#E3E8EF] p-4  flex flex-col gap-1 rounded-[6px] '>
              {/*  */}
              <div className='flex justify-between'>
                <p className='text-[#364152] text-base font-medium'>{item.periodName}</p>
                <button className='cursor-pointer' onClick={() => handleDeleteSpecialPrice(index)}>
                  <img src="/images/icons/delete_red.svg" alt="" />
                </button>
              </div>

              {/*  */}
              <p className='text-[#4B5565] text-base font-normal'>
                <span>{item.dateRange} : </span>
                <span> سعر ثابت</span>
              </p>

              {/*  */}
              <p className='text-[var(--color-primary)] text-base font-semibold'>
                <span>{t('the price')} : </span>
                <span>{item.price} جنية</span>
              </p>
            </div>
          ))}


          

        </div>

      </div>  



      {/* note */}

      <div className='bg-[#F8FAFC] border border-[#EEF2F6] rounded-[6px] p-3 mt-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/ii_blue.svg" className="w-6 h-6" />
          <span className='text-[#364152] text-base font-medium'>{t('Savings Summary')}</span>
        </p>
        <p className='text-[#4B5565] text-base font-normal'>25 يومًا متاحة هذا الشهر مع تطبق قواعد التسعير الخاصة</p>
      </div>


    <AddDialog open={open} setOpen={setOpen} onAdd={handleAddSpecialPrice} />
    </>
  )
}

export default SpecialPricesPage
