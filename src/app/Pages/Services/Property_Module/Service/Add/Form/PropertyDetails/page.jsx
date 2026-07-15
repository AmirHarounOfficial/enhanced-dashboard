"use client"
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import InformationPage from './Information/page';
import Arrival_DeparturePage from './Arrival_Departure/page';
import Receive_GuestsPage from './Receive_Guests/page';
import { useDispatch, useSelector } from 'react-redux';
import { addPropertyDetailsThunk } from '@/redux/slice/Services/ServicesSlice';

function PropertyDetailsPage({prevStep , nextStep }) {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const {addBasicProperty} = useSelector((state) => state.services);

  const [property_id, setProperty_id] = useState(() => {
    if (typeof window !== 'undefined') {
      return addBasicProperty?.data?.id || addBasicProperty?.id || sessionStorage.getItem('property_id') || null;
    }
    return addBasicProperty?.data?.id || addBasicProperty?.id || null;
  });

  useEffect(() => {
    if (addBasicProperty?.data?.id || addBasicProperty?.id) {
      const id = addBasicProperty?.data?.id || addBasicProperty?.id;
      setProperty_id(id);
      sessionStorage.setItem('property_id', id);
    }
  }, [addBasicProperty?.data?.id, addBasicProperty?.id]);

  const [formData , setFormData] =useState({
    area:"",
    area_unit:"",
    has_elevator:"",
    check_in_time:"",
    check_out_time:"",
    availabilities:[],
    floor_number:"",
  })

  const [fieldErrors, setFieldErrors] = useState({});
  
  console.log("property_id", property_id)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData?.check_in_time) errors.check_in_time = true;
    if (!formData?.check_out_time) errors.check_out_time = true;
    if (formData?.floor_number === "" && formData?.floor_number !== 0) errors.floor_number = true;
    if (formData?.has_elevator === "") errors.has_elevator = true;
    if (!formData?.availabilities || formData?.availabilities.length === 0) errors.availabilities = true;
    if (!formData?.area) errors.area = true;
    if (!formData?.area_unit) errors.area_unit = true;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    try {
      const data = new FormData();
      data.append("property_id", property_id || "");
      data.append("area", formData?.area);
      data.append("area_unit", formData?.area_unit);
      data.append("has_elevator", formData?.has_elevator);
      data.append("check_in_time", formData?.check_in_time);
      data.append("check_out_time", formData?.check_out_time);
      data.append("floor_number", formData?.floor_number);
      formData.availabilities.forEach((item, index) => {
        data.append(`availabilities[${index}][available_from]`, item?.available_from || "");
        data.append(`availabilities[${index}][available_to]`, item?.available_to || "");
      });
      await dispatch(addPropertyDetailsThunk(data)).unwrap();
      nextStep();

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <div className='border border-[#E6E6E6] p-8 rounded-[6px]'>
        {/* title */}
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 4 :</span>
            <span>{t('Property details')}</span>
          </p>
            <p className='text-[#697586] text-base font-normal'>{t('Enter the property details to begin adding it.')}</p>
          <div className='border border-[#E3E8EF] my-4'></div>
        </div>
        
        {/* Property Information */}
        <InformationPage setFormData={setFormData} formData={formData} fieldErrors={fieldErrors} setFieldErrors={setFieldErrors} />

        {/* Arrival and departure times */}
        <Arrival_DeparturePage setFormData={setFormData} formData={formData} fieldErrors={fieldErrors} setFieldErrors={setFieldErrors} />

        {/* Service provider available to receive guests */}
        <Receive_GuestsPage setFormData={setFormData} formData={formData} fieldErrors={fieldErrors} setFieldErrors={setFieldErrors} />





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

export default PropertyDetailsPage


