'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IMAGE_BASE_URL } from '../../../../../../config/imageUrl'

// Mock item data — replace with real props/API data as needed
const MOCK_ITEM = {
  images: [
    '/images/P.p.svg',
    '/images/P.p.svg',
    '/images/P.p.svg',
  ],
  nameAr: 'حمص',
  category: 'المقبلات',
  price: 25,
  currency: 'جنية',
  status: 'متوفر',
  descriptionAr: 'وصف تفصيلي للصنف يتضمن المكونات وطريقة التحضير والخصائص المميزة أبدأ الطبق الشهي',
  prepTimeMin: 15,
  prepTimeMax: 20,
  calories: 350,
}

function Data({ getItemsDetails }) {
  const { t } = useTranslation()
  const item =  getItemsDetails?.data

  const [activeSlide, setActiveSlide] = useState(0)
  const [imageLoading, setImageLoading] = useState(true);
  const handleSlideChange = (index) => {
    setImageLoading(true);
    setActiveSlide(index);
  };

const images = item?.images?.map((img) => img.image) || [];

  const StatusRender = (status) => {
    switch (status) {
      case 'active': //نشط 
        return (
          <div className=' bg-[#fff] border border-[#17B26A] text-[#067647] w-fit  h-7.5 rounded-full flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex  items-center gap-1'>
              <img src="/images/icons/true_green.svg" alt="" className='w-3.5 h-3.5' />
              <span className='text-xs lg1:text-sm'>{t('active')}</span>
            </div>
          </div>
        );

      case 'hidden': //مغلق
        return null
        // (
        //   <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  h-7.5 rounded-full flex  items-center '>
        //     <div className='py-1 px-2 flex  items-center  gap-1'>
        //       <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
        //       <span className='text-xs lg1:text-sm'>{t('closed')}</span>
        //     </div>
        //   </div>
        // );

    }
  }

  return (
    <div className="flex flex-col gap-4">

      {/* ── Image Carousel ─────────────────────────────── */}
    {images.length > 0 && (
      <div
        className="relative w-full rounded-[6px] overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#EEF2F6]">
            <div className="w-8 h-8 border-4 border-[#CDD5DF] border-t-[var(--color-primary)] rounded-full animate-spin" />
          </div>
        )}

        <img
          src={`${IMAGE_BASE_URL}${images[activeSlide]}`}
          alt={item?.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />

        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSlideChange(i)}
                className={`rounded-full transition-all cursor-pointer ${
                  i === activeSlide
                    ? "w-4 h-2 bg-white"
                    : "w-2 h-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    )}

      {/* ── Name, Category & Status ─────────────────────── */}
      <div className="flex justify-between items-start">
      
        {/*  name + category */}
        <div className="flex flex-col  gap-2">
          <p className="text-[#364152] text-xl font-medium">{item?.name}</p>
          <p className="text-[#697586] text-sm font-normal">{item?.category_name}</p>
        </div>
        {/*  status badge + price */}
        <div className="flex flex-col gap-2">
          <span className="">
            {StatusRender(item?.status)}
          </span>
          <p className="text-[var(--color-primary)] text-lg font-semibold">
            {item?.base_price} جنيه
          </p>
        </div>
      </div>

      {/* ── Description ────────────────────────────────── */}
      <div className="shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)] rounded-[6px] p-4">
        <div className=" mb-2">  

          <p className="text-[#364152] text-base font-medium mb-2">{t('description')}</p>
          <p className="text-[#4B5565] text-sm font-normal leading-relaxed text-right">
            {item?.description}
          </p>

        </div>
      </div>

      {/* ── Additional Info ─────────────────────────────── */}
      <div className="shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)] rounded-[6px] p-4">
        <div className="mb-2">
          <p className="text-[#364152] text-base font-semibold">{t('Additional information')}</p>
        </div>
        {/* Preparation time row */}
        <div className="flex justify-between items-center py-2">
          <p className="text-[#697586] text-sm font-normal">{t('Preparation time')}</p>
          <p className="text-[#364152] text-sm font-medium">
            {item?.prep_time_min} {t('minutes')}
          </p>
        
        </div>


        {/* Calories row */}
        <div className="flex justify-between items-center py-2">
          <p className="text-[#697586] text-sm font-normal">{t('Calories')}</p>
          <p className="text-[#364152] text-sm font-medium">{item?.calories} {t('calorie')}</p>
        
        </div>
      </div>

    </div>
    
  )
}

export default Data


