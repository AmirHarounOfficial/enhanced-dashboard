"use client";
import { t } from 'i18next';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';


function CarDetailsPage({bookingDetails}) {
    const [open, setOpen] = useState(false);
    const {t}= useTranslation();

    const carDetails = bookingDetails?.car

  return (
    <>
      {carDetails && (
        <section className="w-full mt-6 p-3 shadow-sm rounded-[8px] overflow-hidden bg-white select-none">
          {/* Header */}
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between   text-right"
          >
            <span className="text-[#0F022E] text-base font-normal flex items-center gap-2">
              <img src="/images/icons/caryellow.svg" alt="" />
              {t('Car details')}
            </span>
    
            <div
              className={`transition-transform duration-300 cursor-pointer ${
                open ? "rotate-180" : "rotate-0"
              }`}
            >
              <img src="/images/icons/ArrowDown.svg" alt="" />
            </div>
          </button>
    
          {/* Content */}
          {open && (
            <div className="px-3 mt-3  text-right ">
    
              
              {carDetails?.car_brand && (
                <div className="flex gap-0.5  text-sm border-b border-[#E3E8EF] py-4">
                  <span className="text-[#575757]  font-normal">{t('Brand')} :</span>
                  <span className="text-[#0F022E]  font-medium">{carDetails?.car_brand}</span>
                </div>
              )}
    
              {carDetails?.car_model && (
                <div className="flex gap-0.5  text-sm border-b border-[#E3E8EF] py-4">
                  <span className="text-[#575757]  font-normal">{t('Model')} :</span>
                  <span className="text-[#0F022E]  font-medium">{carDetails?.car_model}</span>
                </div>
              )}

              {carDetails?.car_year && (
                <div className="flex gap-0.5  text-sm border-b border-[#E3E8EF] py-4">
                  <span className="text-[#575757]  font-normal">{t('Year of issue')} : </span>
                  <span className="text-[#0F022E]  font-medium">{carDetails?.car_year}</span>
                </div>
              )}

              {carDetails?.transmission && (
                <div className="flex gap-0.5  text-sm border-b border-[#E3E8EF] py-4">
                  <span className="text-[#575757]  font-normal">{t('Type of transfer')} : </span>
                  <span className="text-[#0F022E]  font-medium">{carDetails?.transmission}</span>
                </div>
              )}

              {carDetails?.fuel_type && (
                <div className="flex gap-0.5  text-sm border-b border-[#E3E8EF] py-4">
                  <span className="text-[#575757]  font-normal">{t('Fuel type')} : </span>
                  <span className="text-[#0F022E]  font-medium">{carDetails?.fuel_type}</span>
                </div>
              )}

              {carDetails?.seats && (
                <div className="flex gap-0.5  text-sm border-b border-[#E3E8EF] py-4">
                  <span className="text-[#575757]  font-normal">{t('Number of seats')} : </span>
                  <span className="text-[#0F022E]  font-medium">{carDetails?.seats}</span>
                </div>
              )}

              {carDetails?.plate_number && (
                <div className="flex gap-0.5  text-sm  pt-4">
                  <span className="text-[#575757]  font-normal">{t('Plate number')} : </span>
                  <span className="text-[#0F022E]  font-medium">{carDetails?.plate_number}</span>
                </div>
              )}
            
            </div>
          )}
        </section>
      )}

    </>
  )
}

export default CarDetailsPage

