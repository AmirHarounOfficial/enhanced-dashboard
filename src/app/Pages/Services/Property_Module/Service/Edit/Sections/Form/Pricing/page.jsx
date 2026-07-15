"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import PricingInfoPage from './PricingInfo/page';
import CancellationPolicyPage from './CancellationPolicy/page';
import PricingDetailsPage from './PricingDetails/page';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import TitleOfHeader from '../../TitleOfHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getPoliciesApprovedThunk, getPricingPoliciesThunk, addPricingPoliciesThunk } from '@/redux/slice/Services/ServicesSlice';


function PricingPageContent() {
  const {t} = useTranslation();

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const from = searchParams.get('from')

    const dispatch = useDispatch();
    const {getPricingPolicies , getPoliciesApproved} = useSelector((state) => state.services);

    const [formData, setFormData] = useState({
      "property_id": '',
      "base_price": "",
      "cleaning_fee": "",
      "security_deposit": "",
      "tax_percentage": "",
      "service_fee_percentage": "",
      "provider_profit": '',
      "service_fee_amount": '',
      "tax_amount": '',
      "total_amount": '',
      "cancellation_policy_id": '',
      "platform_profit": '',
    })

    useEffect(()=>{
      if(getPricingPolicies){
        setFormData({
          property_id: id,
          base_price: getPricingPolicies.base_price,
          cleaning_fee: getPricingPolicies.cleaning_fee,
          security_deposit: getPricingPolicies.security_deposit,
          tax_percentage: getPricingPolicies.tax_percentage,
          service_fee_percentage: getPricingPolicies.service_fee_percentage,
          provider_profit: getPricingPolicies.provider_profit,
          service_fee_amount: getPricingPolicies.service_fee_amount,
          tax_amount: getPricingPolicies.tax_amount,
          total_amount: getPricingPolicies.total_amount,
          cancellation_policy_id: getPricingPolicies.cancellation_policy_id,
          platform_profit: getPricingPolicies.platform_profit,
        })
      }
    },[getPricingPolicies])

    useEffect(() => {
      if (id) {
        dispatch(getPoliciesApprovedThunk(id));
        dispatch(getPricingPoliciesThunk(id));
      }
    }, [id])

    const handleBack = () => {
      if (from === 'Add') {
        router.push(
          `/Pages/Services/Property_Module/Service/Add/FormData?property_id=${id}`
        )
      } else {
        router.push(
          `/Pages/Services/Property_Module/Service/Edit?id=${id}`
        )
      }
    }

    const handleSubmit = async () => {
      try {
        await dispatch(addPricingPoliciesThunk({ property_id: id, formData })).unwrap();
        if (from === 'Add') {
          router.push(`/Pages/Services/Property_Module/Service/Add/FormData?property_id=${id}`)
        } else {
          router.push(`/Pages/Services/Property_Module/Service/Edit?id=${formData.property_id}`)
        }
      } catch (error) {
        console.error('Error saving pricing policies:', error);
      }
    }

  return (
    <MainLayout>
      <TitleOfHeader/>
      <div className='border border-[#E6E6E6] p-8 rounded-[6px] mb-4'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 6 :</span>
            <span>{t('Pricing')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>250 جنية في الليلة . سياسة  إلغاء معتدلة</p>
          <div className='border border-[#E3E8EF] my-4'></div>
        </div>

          <PricingInfoPage formData={formData} setFormData={setFormData} />
          <CancellationPolicyPage formData={formData} setFormData={setFormData} getPoliciesApproved={getPoliciesApproved} />
          <PricingDetailsPage formData={formData} setFormData={setFormData} />

      {/* btn */}
        <div className="flex  mt-6">
          
          <div className='flex gap-2 justify-start w-full '>
            <button
              onClick={handleBack}
              className="h-11 w-[30%] lg1:w-[15%]  border border-[#697586] text-[#697586] rounded-[6px] cursor-pointer"
            >
              {t('Return')}
            </button>

            <button
              onClick={handleSubmit}
              className="h-11 w-[30%] lg1:w-[15%] bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer"
            >
              {t('Save changes')}
            </button>
          </div>
          
        </div>
      </div>
    </MainLayout>
  )
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PricingPageContent />
    </Suspense>
  )
}


