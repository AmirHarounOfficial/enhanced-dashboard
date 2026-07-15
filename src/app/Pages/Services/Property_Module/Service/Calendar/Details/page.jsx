"use client"
import { getAllDetailsThunk } from '@/redux/slice/Services/ServicesSlice';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, Suspense } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_BASE_URL } from '../../../../../../../../config/imageUrl';

function DetailsContent() {
  const {t} = useTranslation()

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

  const getDetailsData = getDetails?.data


  const StatusRender = (status) => {
    switch (status) {
      case "active": //نشط 
        return (
        <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-7 rounded-2xl flex justify-center items-center '>
          <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
            <span className='text-xs lg1:text-sm'>{t('active')}</span>
          </div>
        </div>
        );
      case "inactive"://غير نشط 
        return (
        <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  h-7 rounded-2xl flex justify-center items-center '>
          <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
            <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4 mt-1' />
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
              <img src={`${IMAGE_BASE_URL}${getDetailsData?.primary_image?.image_path}`} alt="" className=' h-35 w-full' />  
            </div>
    
            <div className='w-[75%]'>
              <div className='flex gap-10 mb-3'>
                <p className='text-[#364152] text-base font-medium  flex items-center'> {getDetailsData?.title}  </p> 
                <div>{StatusRender(getDetailsData?.activity_status)}</div>
              </div>

              <div className='flex gap-2 '>
                <img src="/images/icons/locationblue.svg" className="w-4 h-4 mt-1" />
                <p className='text-[#4B5565] text-sm font-normal'> {getDetailsData?.location?.address}</p> 
              </div>
    
              <div className=' mt-3 flex gap-1' > 
                <img src="/images/icons/star.svg" alt="" />
                <p>
                  <span className='text-[#4B5565] text-base font-medium '>{getDetailsData?.rating_avg}</span> {''}
                  <span className='text-[#697586] text-base font-normal '>({getDetailsData?.reviews_count})</span>
                </p>
              </div>
              
            </div>
    
          </div>  

    </>
  )
}

function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading Details...</div>}>
      <DetailsContent />
    </Suspense>
  )
}

export default DetailsPage


