"use client";
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import No_subscription from '../../../../Components/No_subscription/No_subscription';
import Complete_Data from '@/app/Components/Complete_Data/Complete_Data';

function No_services_Add() {
  const { t } = useTranslation();
  const [hasSubscription, setHasSubscription] = useState(true);
  const [nationalId, setNationalId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // Check if has_subscription is false or missing
    if (!user?.has_subscription) {
      setHasSubscription(false);
    } else {
      setHasSubscription(true);
    };
    if (!user?.national_id) {
      setNationalId(false);
    } else {
      setNationalId(true);
    }


    setLoading(false);
  }, []);

  if (loading) return null;


  return (
    <>
    <div className='flex flex-col items-center justify-center  mt-30'>
      <img src="/images/No_services_Add.svg" alt="" />
      <p className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4'>{t("No services yet...")}</p>
      <p className='text-[#697586] text-xl font-normal '>{t('Add your services to showcase them to clients and increase your profits.')}</p>
      <button className='flex justify-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2.5 h-14 w-[25%] rounded-[6px] my-6 cursor-pointer'>
        <p className='text-base flex items-center'>{t("Add a sub-service")} </p>
        <img src="/images/icons/AddIcon.svg" alt="" />
        
      </button>
    </div>
    {!hasSubscription && <No_subscription setHasSubscription={setHasSubscription} />}
    {!nationalId &&<Complete_Data setNationalId={setNationalId}/>}
    </>
  )
}

export default No_services_Add
