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
import NotesPage from './Notes/page'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { addSubmitForReviewThunk, getAllDetailsThunk } from '@/redux/slice/Services/ServicesSlice'


function FormDataPageContent() {
  const {t} = useTranslation()

  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('property_id');


  const dispatch = useDispatch();
  const { getDetails , addSubmitForReview } = useSelector((state) => state.services);
  const getDetailsData = getDetails?.data;

  useEffect(() => {
    const idToFetch = propertyId || sessionStorage.getItem('property_id');
    if (idToFetch) {
      dispatch(getAllDetailsThunk(idToFetch));
    }
  }, [dispatch, propertyId]);

  console.log(propertyId);

  const handleSubmitReview = async () => {
    const idToSubmit = propertyId || sessionStorage.getItem('property_id');
    if (idToSubmit) {
      const res = await dispatch(addSubmitForReviewThunk(idToSubmit));
      if (res.payload?.status === true) {
        router.push('/Pages/Services/Property_Module/Service');
      }
    }
  };
  
  return (
    <MainLayout>
      <div className='border border-[#E3E8EF] p-8'>
        <p className='mb-10 text-[#364152] text-2xl font-medium px-6'>{t('Property details')}</p>
        <DetailsPage getDetailsData={getDetailsData} />
        <div className='grid grid-cols-2 gap-6'>
          <AddressPage getDetailsData={getDetailsData} propertyId={propertyId}/>
          <BasicInformationPage getDetailsData={getDetailsData} propertyId={propertyId} />
          <CheckDetailsPage getDetailsData={getDetailsData} propertyId={propertyId} />
          <AmenitiesPage getDetailsData={getDetailsData}  propertyId={propertyId}/>
        </div>
        
        <PricingAndPoliciesPage getDetailsData={getDetailsData} propertyId={propertyId} />

        <NotesPage/>


      <div>
        {addSubmitForReview?.status === false && addSubmitForReview?.missing_steps && (
          <div className="mt-4 p-4 bg-[#FEF3F2] text-[#D92D20] rounded-[8px] border border-[#FEE4E2]">
            <p className="font-semibold mb-2">{t('Please complete the following missing steps:')}</p>
            <ul className="list-disc ml-5">
              {addSubmitForReview.missing_steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
        
        <button 
          onClick={handleSubmitReview}
          className='bg-[var(--color-primary)] text-white px-4 h-14 w-fit mt-8 rounded-[6px] cursor-pointer'>
          {t('Property submission for review')}
        </button>

      </div>
    </MainLayout>
  )
}
function FormDataPage() {
  return (
    <Suspense fallback={null}>
      <FormDataPageContent />
    </Suspense>
  )
}

export default FormDataPage


