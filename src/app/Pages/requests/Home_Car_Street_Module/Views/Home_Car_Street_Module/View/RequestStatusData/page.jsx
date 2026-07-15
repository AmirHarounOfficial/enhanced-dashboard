"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import MainRequestViewPage from '../MainRequestView/page';
import Appoint_SpecialistPage from '../Appoint_Specialist/page';

// Force dynamic rendering - this page should not be statically generated
export const dynamic = 'force-dynamic';

function RequestStatusDataPage({bookingDetails , handleCloseViewHome_Car}) {
  const { t } = useTranslation();

  const status =  bookingDetails?.status;
  const assigned_handymen = bookingDetails?.assigned_handymen || [];
  
  const StatusRender = (status) => {
    switch (status) {
      case "accepted":// تم القبول
        if (assigned_handymen.length === 0) {
          return (
            <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit rounded-3xl'>
              <div className='py-1.5 px-3 flex gap-1'>
                <img src="/images/icons/Active Status.svg" alt="" className='mt-1' />
                <span className='text-xs font-normal flex items-center'>
                  {t('accepted')}
                </span>
              </div>
            </div>
          );
        }
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/Active Status.svg" alt="" className='mt-1' />
              <span className='text-xs font-normal flex items-center'>
                {t('A specialist has been appointed')}
              </span>
            </div>
          </div>
        );
      case "completed"://مكتملة
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit   rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/Active Status.svg" alt="" className=' mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('Complete')}</span>
            </div>
          </div>
        );
      case "pending_approval": //في انتظار الموافقة
        return (
          <div className=' bg-[#FFFAEB] border  border-[#F79009] text-[#DC6803] w-fit  rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/pending Status.svg" alt="" className=' mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('pending')}</span>
            </div>
          </div>
        );
      case "in_progress": //قيد التنفيذ
        return (
          <div className=' bg-[#EFF4FF] border border-[#518BFF] text-[#004EEB] w-fit   rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/inactive Status.svg" alt="" className=' mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('in_progress')}</span>
            </div>
          </div>
        );
      case "on_going": //العامل في الطريق
        return (
          <div className=' bg-[#E3E8EF] border border-[#697586] text-[#4B5565] w-fit  rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/on_going Status.svg" alt="" className=' mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('The worker on the road')}</span>
            </div>
          </div>
        );
      case "rejected": // مرفوضة
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('rejected')}</span>
            </div>
          </div>
        );
      case "cancelled": // ملغيه
      return (
        <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  rounded-3xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/refused Status.svg" alt="" className=' mt-1' />
            <span className='text-xs font-normal flex items-center'>{t('cancelled')}</span>
          </div>
        </div>
      );
    }
  };

// pending
// hold
// cancelled
// paid
// approved

  const [activeSection, setActiveSection] = useState(1);


  return (
    <>
      {/* section1 */}
      {activeSection === 1 && (
        <>
          <MainRequestViewPage
            StatusRender={StatusRender}
            status={status}
            assigned_handymen={assigned_handymen}
            setActiveSection={setActiveSection}
            bookingDetails={bookingDetails}
            handleCloseViewHome_Car={handleCloseViewHome_Car}
          />

        </>

      )}
      {/* تعيين مختص */}
      {/* section 2*/}
      {activeSection === 2 && (
        <>
          <Appoint_SpecialistPage 
            setActiveSection={setActiveSection} 
            bookingDetails={bookingDetails}
            
          />
        </>

      )}










    </>
  )
}

export default RequestStatusDataPage