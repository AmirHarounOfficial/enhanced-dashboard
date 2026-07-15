"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import PricingInfoPage from './PricingInfo/page';
import CancellationPolicyPage from './CancellationPolicy/page';
import PricingDetailsPage from './PricingDetails/page';
import { useDispatch, useSelector } from 'react-redux';
import { addPricingPoliciesThunk, getPoliciesApprovedThunk, getPricingPoliciesThunk } from '@/redux/slice/Services/ServicesSlice';

function PricingPage({prevStep , nextStep }) {
  const {t} = useTranslation();

  
  const dispatch = useDispatch();
  const {getPoliciesApproved , addBasicProperty , getPricingPolicies} = useSelector((state)=>state.services)
    
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
      dispatch(getPoliciesApprovedThunk(property_id));
      dispatch(getPricingPoliciesThunk(property_id));
    }
  }, [dispatch, property_id]); 


  console.log(getPricingPolicies);

  const [formData, setFormData] = useState({
    base_price: '',
    security_deposit: '',
    cleaning_fee: '',
    cancellation_policy_id:'',
  })

  const [fieldErrors, setFieldErrors] = useState({});

    const handleSubmit = async (e) => {
      e.preventDefault();

      const errors = {};
      if (!formData.base_price) errors.base_price = true;
      if (!formData.security_deposit) errors.security_deposit = true;
      if (!formData.cleaning_fee) errors.cleaning_fee = true;
      if (!formData.cancellation_policy_id) errors.cancellation_policy_id = true;

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});

        try {
          const data = new FormData();
          data.append("property_id", property_id || "");
          data.append("base_price", formData.base_price);
          data.append("security_deposit", formData.security_deposit);
          data.append("cleaning_fee", formData.cleaning_fee);
          data.append("cancellation_policy_id", formData.cancellation_policy_id);
        
          await dispatch(addPricingPoliciesThunk({ property_id, formData: data })).unwrap();
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
            <span>{t('Step')} 6 :</span>
            <span>{t('Pricing')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>{t('Enter your pricing details to begin adding them.')}</p>
          <div className='border border-[#E3E8EF] my-4'></div>
        </div>

        <PricingInfoPage           formData={formData} setFormData={setFormData} fieldErrors={fieldErrors} setFieldErrors={setFieldErrors} />
        <CancellationPolicyPage    formData={formData} setFormData={setFormData} getPoliciesApproved={getPoliciesApproved}/>
        <PricingDetailsPage        formData={formData} setFormData={setFormData}  getPricingPolicies={getPricingPolicies}/>

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

export default PricingPage


