"use client";
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { IMAGE_BASE_URL } from '../../../../../../../../../../config/imageUrl';

function ImagesPage({bookingDetails}) {
  const { t } = useTranslation();

const images = Array.isArray(bookingDetails?.images) 
    ? bookingDetails.images.map(img => `${IMAGE_BASE_URL}${img.image_path}`) 
    : [];
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    if (length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 100000);
    return () => clearInterval(interval);
  }, [length]);


  if (images.length === 0) return null;


  return (
    <>
      {bookingDetails?.images?.length > 0 && (

        <section className='shadow-sm rounded-[8px] p-4 mt-6 w-full'>
          <p className='text-[#364152] text-base font-normal mb-4'>{t('Illustrative images')} </p>

          <div className="overflow-y-auto overflow-x-hidden">
            {/* Image Slider */}
            <section className="relative w-full  h-[200px] ">
              
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`service-image-${index}`}
                  className={`absolute top-0 left-0 w-full h-[200px] transition-opacity duration-700 ${
                              index === current ? "opacity-100" : "opacity-0"
                      }`}    
                  />
                ))}

              
              {/* Image Dots */}
              <div className="absolute bottom-4  left-1/2 -translate-x-1/2 bg-white/55 h-5.5 px-3 py-1.5 rounded-[20px] flex items-center gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`transition rounded-full ${
                      current === index
                        ? "w-2.5 h-2.5 bg-white"
                        : "w-1.5 h-1.5 bg-[#EEF2F6]"
                    }`}
                  />
                ))}
              </div>
            </section>
          </div>

        </section>
      )}

    </>
  )
}

export default ImagesPage

