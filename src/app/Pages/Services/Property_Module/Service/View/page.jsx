"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, Suspense } from 'react'
import AddressPage from './Address/page'
import BasicInformationPage from './BasicInformation/page'
import CheckDetailsPage from './CheckDetails/page'
import AmenitiesPage from './Amenities/page'
import PricingAndPoliciesPage from './PricingAndPolicies/page'
import DetailsPage from './Details/page'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDetailsThunk } from '@/redux/slice/Services/ServicesSlice'
import { useRouter, useSearchParams } from 'next/navigation'

function ViewPageContent() {
  const {t} = useTranslation()
  const router = useRouter()
  //api
  const dispatch = useDispatch();
  const { getDetails } = useSelector((state) => state.services);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      dispatch(getAllDetailsThunk(id));
    }
  }, [dispatch, id]);

  console.log("getDetails",getDetails);

  const getdetailsData = getDetails?.data;

  return (
    <MainLayout>
      <div className='border border-[#E3E8EF] p-8 '>
        <p className='mb-10 text-[#364152] text-2xl font-medium px-6'>{t('Property details')}</p>
        <DetailsPage getdetailsData={getdetailsData} />
        <div className='grid grid-cols-2 gap-6'>
          <AddressPage getdetailsData={getdetailsData}/>
          <BasicInformationPage getdetailsData={getdetailsData}/>
          <CheckDetailsPage getdetailsData={getdetailsData}/>
          <AmenitiesPage getdetailsData={getdetailsData}/>
        </div>
        
        <PricingAndPoliciesPage getdetailsData={getdetailsData}/>

        <button
          onClick={()=>router.push(`/Pages/Services/Property_Module/Service/Edit?id=${id}`)}
          className='bg-[var(--color-primary)] text-white px-4 h-14 w-50 mt-8 rounded-[6px] cursor-pointer'>
          {t('modification')}
        </button>

      </div>
    </MainLayout>
  )
}
function ViewPage() {
  return (
    <Suspense fallback={null}>
      <ViewPageContent />
    </Suspense>
  )
}

export default ViewPage

