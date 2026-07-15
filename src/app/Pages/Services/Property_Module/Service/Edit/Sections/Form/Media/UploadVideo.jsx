"use client"
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next';

function UploadVideo({ formData, setFormData }) {
  const {t} = useTranslation();
  const tourVideoRef = useRef(null);
  const propertyVideoRef = useRef(null);

  return (
    <>
      {/* Additional media */}
      <div>
        <p className='text-[#364152] text-base font-medium mb-4'>{t('Additional media')} ({t('optional')})</p>
        <div className='grid grid-cols-2 gap-6'>

          {/* Virtual tour (vr_path) */}
          <div className='border border-[#E3E8EF] py-4 px-3 rounded-[6px] flex justify-between'>
            <div className='flex gap-2'>
              <p className='flex items-start mt-1'>
                <img src="/images/icons/Frame-green.svg" alt="" />
              </p>
              <div className='flex flex-col'>
                <p className='text-[#364152] text-base font-medium'>{t('virtual tour')}</p>
                <p className='text-[#4B5565] text-sm font-normal'>{t('360-degree interactive experience')}</p>
              </div>
            </div>

            <input
              ref={tourVideoRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0] || null;
                setFormData((prev) => ({ ...prev, vr_path: file }));
              }}
            />

          {formData.vr_path ? (
                <div className="flex items-center gap-1 px-2 py-1">
                <img src="/images/icons/checkmark-circle-true.svg" className="w-4 h-4" alt="" />
                <p className="text-[#17B26A] text-sm font-normal">{t('A tour was selected')}</p>
                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, vr_path: '' }));
                    tourVideoRef.current.value = '';
                  }}
                  className="text-[#17B26A] font-bold text-sm leading-none cursor-pointer"
                >×</button>
              </div>
            ) : (
              <button
                onClick={() => tourVideoRef.current.click()}
                className='text-[var(--color-primary)] text-base font-normal cursor-pointer'
              >
                {t('Add a tour')}
              </button>
            )}
          </div>

          {/* Property video */}
          <div className='border border-[#E3E8EF] py-4 px-3 rounded-[6px] flex justify-between'>
            <div className='flex gap-2'>
              <p className='flex items-start mt-1'>
                <img src="/images/icons/camera_blue.svg" alt="" />
              </p>
              <div className='flex flex-col'>
                <p className='text-[#364152] text-base font-medium'>{t('Property video')}</p>
                <p className='text-[#4B5565] text-sm font-normal'>{t('View a detailed tour of your space')}</p>
              </div>
            </div>

            <input
              ref={propertyVideoRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0] || null;
                setFormData((prev) => ({ ...prev, video: file }));
              }}
            />

            {formData?.video ? (
              <div className="flex items-center gap-1 px-2 py-1">
                <img src="/images/icons/checkmark-circle-true.svg" className="w-4 h-4" alt="" />
                <p className="text-[#17B26A] text-sm font-normal">{t('A tour was selected')}</p>
                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, video: '' }));
                    propertyVideoRef.current.value = '';
                  }}
                  className="text-[#17B26A] font-bold text-sm leading-none cursor-pointer"
                >×</button>
              </div>
            ) : (
              <button
                onClick={() => propertyVideoRef.current.click()}
                className='text-[var(--color-primary)] text-base font-normal cursor-pointer'
              >
                {t('Add a video')}
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default UploadVideo
