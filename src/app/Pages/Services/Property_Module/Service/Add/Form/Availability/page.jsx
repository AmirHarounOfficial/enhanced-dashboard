"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import BookingTypePage from './BookingType/page';
import SpecialPricesPage from './SpecialPrices/page';
import { useDispatch, useSelector } from 'react-redux';
import { addAvailabilitySeasonsThunk } from '@/redux/slice/Services/ServicesSlice';

function AvailabilityPage({prevStep , nextStep }) {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const {addBasicProperty} = useSelector((state) => (state.services));


  const [formData, setFormData] = useState({
    property_id: "",
    availability: {
      all_avalable: false,
      slots: []
    },
    seasonal_pricing: []
  });

  useEffect(() => {
    const storedPropertyId = sessionStorage.getItem("property_id");
    const propertyId = addBasicProperty?.data?.id || storedPropertyId;

    if (propertyId) {
      if (!storedPropertyId) {
        sessionStorage.setItem("property_id", propertyId);
      }
      setFormData((prevData) => ({
        ...prevData,
        property_id: propertyId,
      }));
    }
      console.log('id' , propertyId);

  }, [addBasicProperty]);
  
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
  e.preventDefault();

  const errors = {};
  const hasPolicy = formData?.availability?.all_avalable || formData?.availability?.slots.length > 0;
  if (!hasPolicy) errors.booking_type = true;

  if (Object.keys(errors).length > 0) {
    setFieldErrors(errors);
    return;
  }
  setFieldErrors({});

  try {
    // ابعت formData مباشرة كـ JSON مش FormData
    await dispatch(addAvailabilitySeasonsThunk({
      property_id: formData?.property_id,
      formData: {
        property_id: formData?.property_id,
        availability: formData?.availability,
        seasonal_pricing: formData?.seasonal_pricing
      }
    })).unwrap();

    nextStep();
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
      <div className='border border-[#E6E6E6] p-8 rounded-[6px]'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 7 :</span>
            <span>{t('Availability')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>{t('Enter availability details to begin adding them')}</p>
          <div className='border border-[#E3E8EF] my-4'></div>
        </div>




        <BookingTypePage    formData={formData} setFormData={setFormData} fieldErrors={fieldErrors} setFieldErrors={setFieldErrors} />
        <SpecialPricesPage  formData={formData} setFormData={setFormData} />


      {/* btn */}
      <div className="flex justify-between mt-6">
        <div className='w-full '>
          <button
            onClick={prevStep}
            className="w-[50%] lg1:w-[15%] h-11 border border-[#697586] text-[#697586] rounded-[6px] cursor-pointer"
          >
            {t('the previous')}
          </button>
        </div>
        
        <div className='flex gap-2 justify-end w-full '>
          <button
            className="h-11 w-[50%] lg1:w-[15%]  border border-[#697586] text-[#697586] rounded-[6px] cursor-pointer"
          >
            {t('Save draft')}
          </button>

          <button
            onClick={handleSubmit}
            className="h-11 w-[50%] lg1:w-[15%] bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer"
          >
            {t('the next')}
          </button>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default AvailabilityPage


