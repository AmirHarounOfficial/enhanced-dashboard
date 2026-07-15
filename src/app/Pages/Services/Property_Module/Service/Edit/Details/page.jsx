"use client"
import { getAllDetailsThunk } from '@/redux/slice/Services/ServicesSlice'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGE_BASE_URL } from '../../../../../../../../config/imageUrl'

function DetailsContent() {
  const {t} = useTranslation()



  //api
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('id');

  const dispatch = useDispatch()
  const {getDetails} = useSelector((state) => state.services)
  const getDetailsData = getDetails?.data


  useEffect(() => {
    if (propertyId) {
      dispatch(getAllDetailsThunk(propertyId));
    }
  }, [dispatch, propertyId]);




  const status = getDetailsData?.activity_status
  const StatusRender = (status) => {
    switch (status) {
      case "active": //نشط 
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-7 rounded-2xl flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 '>
              <span className='text-xs lg1:text-sm'>{t('active')}</span>
            </div>
          </div>
        );
      case "inactive"://غير نشط 
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#F97066] w-fit  h-7 rounded-2xl flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 '>
              <span className='text-xs lg1:text-sm'>{t('inactive')}</span>
            </div>
          </div>
        );  
    }
  }; 

  
  return (
    <>
      <div className='mb-6 w-full flex gap-8  border border-[#E3E8EF] rounded-[6px] p-3'>
        <div className='w-[25%]  '>
          <img src={`${IMAGE_BASE_URL}${getDetailsData?.primary_image?.image_path}`} alt="" className='h-35 w-full' />  
        </div>

        <div className='w-[75%]'>
          <div className='flex gap-6'>
            <p className='text-[#364152] text-base font-medium mb-2'> {getDetailsData?.title} </p> 
            <div>{StatusRender(status)}</div>
          </div>
          
          <ul className="flex items-center gap-2 text-sm font-normal text-[#4B5565]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span> 
              {getDetailsData?.beds_count} {t('bed')}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span> 
              {getDetailsData?.bathrooms_count} {t('bathroom')}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span> 
              {getDetailsData?.guests_count} {t('guests')}
            </li>
          </ul>
          
          <div className='flex gap-2 mt-3'>
            <img src="/images/icons/locationblue.svg" className="w-4 h-4 mt-1" />
            <p className='text-[#4B5565] text-sm font-normal'>{getDetailsData?.location?.address}</p> 
          </div>

          <div className='text-[var(--color-primary)] text-base font-medium my-2 flex gap-2' > 
            <p>
              <span>{getDetailsData?.base_price}</span>
              <span>{getDetailsData?.currency}</span>
            </p>
            <p>{t('On the night')}</p>
          </div>
          
        </div>

      </div>


    </>
  )
}


export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsContent />
    </Suspense>
  );
}


