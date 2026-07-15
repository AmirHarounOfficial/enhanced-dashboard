"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function FirstNote() {
    const {t} = useTranslation();  
    const imageNote = [
      {id:1 , title:t('Use natural light when possible')},
      {id:2 , title:t('View all rooms and amenities')},
      {id:3 , title:t('Keep spaces clean and organized')},
      {id:4 , title:t('Including outdoor and neighborhood shots')},
    ]
  
  return (
    <>
      <div>
        <p className='text-[#364152] text-lg font-medium'>{t('Property photos')}</p>
        <p>{t('Add at least 5 high-quality photos to showcase your property.')}</p>
      </div>

      {/* note */}
      <div className='bg-[#F8FAFC] border border-[#EEF2F6] rounded-[6px] p-3 my-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/ii_blue.svg" className="w-6 h-6" />
          <span className='text-[#364152] text-base font-medium'>{t('Recommendations before adding images')}</span>
        </p>
        <ul className='grid grid-cols-2 gap-3 mt-4 list-disc pr-6'>
          {imageNote?.map((item)=>(
            <li key={item?.id} className='text-[#4B5565] text-base font-normal'>{item?.title}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default FirstNote
