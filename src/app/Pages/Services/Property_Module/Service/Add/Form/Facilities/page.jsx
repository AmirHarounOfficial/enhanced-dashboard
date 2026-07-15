"use client"
import { getPropertiesAmenitiesThunk, addAmenitiesThunk } from '@/redux/slice/Services/ServicesSlice';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_BASE_URL } from '../../../../../../../../../config/imageUrl';

function FacilitiesPage({prevStep , nextStep }) {
  const {t} = useTranslation();

  
  const dispatch = useDispatch()
  const {getPropertiesAmenities , addBasicProperty} = useSelector((state)=>state.services)
  
  const [property_id, setProperty_id] = useState(() => {
    if (typeof window !== 'undefined') {
      return addBasicProperty?.data?.id || sessionStorage.getItem('property_id') || null;
    }
    return addBasicProperty?.data?.id || null;
  });

  useEffect(() => {
    if (addBasicProperty?.data?.id) {
      setProperty_id(addBasicProperty?.data?.id);
      sessionStorage.setItem('property_id', addBasicProperty?.data?.id);
    }
  }, [addBasicProperty?.data?.id]);

  useEffect(() => {
    if (property_id) {
      dispatch(getPropertiesAmenitiesThunk(property_id));
    }
  }, [dispatch, property_id]); 
  
  const [formData, setFormData] = useState({
    property_id: property_id,
    amenities: []
  })

  const handleCheckboxChange = (amenityId) => {
    setFormData((prev) => {
      const isSelected = prev.amenities.includes(amenityId);
      if (isSelected) {
        return { ...prev, amenities: prev.amenities.filter((id) => id !== amenityId) };
      } else {
        return { ...prev, amenities: [...prev.amenities, amenityId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const data = new FormData();
        data.append("property_id", property_id || addBasicProperty?.data?.id || addBasicProperty?.id || "");
        
        formData?.amenities.forEach((id, index) => {
          data.append(`amenities[${index}]`, id);
        });

        await dispatch(addAmenitiesThunk(data)).unwrap();
        nextStep();
  
      } catch (err) {
        console.log(err);
      }
  }


  return (
    <>
      <div className='border border-[#E6E6E6] p-8 rounded-[6px]'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 5 :</span>
            <span>{t('Facilities')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>{t('Enter the facility details to begin adding them.')}</p>
          <div className='border border-[#E3E8EF] my-4'></div>
        </div>
        
        {getPropertiesAmenities?.data?.map((item ,index)=>(
          <div key={index} className='border border-[#E3E8EF] mb-6 py-4 px-6'>
              
              <div  className='flex gap-2 mb-5'>
                <img src={`${IMAGE_BASE_URL}${item?.category?.icon}`} className="w-6 h-6" />
                <p className='text-[#364152] text-base font-medium'>{item?.category?.name}</p>
              </div>

              <div >
              {item?.amenities?.map((amenity )=>(
                <div key={amenity?.id} className='mb-4  flex justify-between'>
                  <div className='flex gap-2  '>
                    <img src={`${IMAGE_BASE_URL}${amenity?.icon}`} className="w-6 h-6" />
                    <p className='text-[#4B5565] text-base font-medium'>{amenity?.name} </p>
                  </div>
                  <div>
                    <input 
                      type="checkbox"
                      checked={formData?.amenities.includes(amenity?.id)}
                      onChange={() => handleCheckboxChange(amenity?.id)}
                      className="w-5 h-5 appearance-none border rounded-[6px]  border-[#CDD5DF] bg-white  checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex  checked:after:items-center checked:after:justify-center checked:after:text-xs"  
                    />
                  </div>
                </div>
              ))}
              </div>
          </div>
          ))}

      {/* btn */}
      <div className="flex justify-between mt-6">
        <div className='w-full '>
          <button
            onClick={prevStep}
            className="btn-ghost h-11 px-6 w-[50%] lg1:w-[15%] cursor-pointer"
          >
            {t('the previous')}
          </button>
        </div>
        
        <div className='flex gap-2 justify-end w-full '>
          <button
            className="btn-ghost h-11 px-6 w-[50%] lg1:w-[15%] cursor-pointer"
          >
            {t('Save draft')}
          </button>

          <button
            onClick={handleSubmit}
            className="btn-primary h-11 px-6 w-[50%] lg1:w-[15%] rounded-[10px] text-white text-sm font-semibold cursor-pointer"
          >
            {t('the next')}
          </button>
        </div>
        
      </div>
      </div>
    </>
  )
}

export default FacilitiesPage



