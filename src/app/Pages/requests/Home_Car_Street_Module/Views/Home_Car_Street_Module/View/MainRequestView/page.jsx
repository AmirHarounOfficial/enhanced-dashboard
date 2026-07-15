"use client";
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { UpdateBookingThunk } from '@/redux/slice/Requests/RequestsSlice';
import WorkersDataPage from '../RequestStatusData/WorkersData/page';
import CustomerPage from '../RequestStatusData/Customer/page';
import DescriptionPage from '../RequestStatusData/Description/page';
import ImagesPage from '../RequestStatusData/Images/page';
import AddressPage from '../RequestStatusData/Address/page';
import CarDetailsPage from '../RequestStatusData/CarDetails/page';
import PaymentDetailsPage from '../RequestStatusData/PaymentDetails/page';
import RejectedCompPage from '../RequestStatusData/RejectedComp/page';
import RejectedDialogPage from './RejectedDialog/page';
import Activity_logPage from './Activity_log/page';
import RequestDataPage from '../RequestStatusData/RequestData/page';

// Force dynamic rendering - this page should not be statically generated
export const dynamic = 'force-dynamic';

function  MainRequestViewPage({ StatusRender, status, assigned_handymen, setActiveSection ,bookingDetails , handleCloseViewHome_Car}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleApprove = () => {
    dispatch(UpdateBookingThunk({ 
      id: bookingDetails?.id, 
      formData: { status: 'accepted' } 
    }));
  };

  const handleCancelled = () => {
    dispatch(UpdateBookingThunk({ 
      id: bookingDetails?.id, 
      formData: { status: 'cancelled' } 
    }));
  };


  const [activeSubSection, setActiveSubSection] = useState(1);

  // setActiveSection  تعيين مختص
  // setActiveSubSection  سجل النشاط

    console.log("bookingDetails",bookingDetails);

  return (
    <>

      {activeSubSection === 1 && (
        <>
          {/* Title-->  btn  سجل النشاط + title*/}
          <section className="my-4 px-6 flex  justify-between  ">

            <div className='  '>
              <p className="text-[#364152] text-xl font-medium mb-5">
                {t("Order details")}
              </p>
              <p className="text-[#4B5565] text-sm font-normal ">
                {t("Full details explaining the status and contents of the order")}
              </p>
            </div>

            {bookingDetails?.logs?.length > 0 ? (
              <div className="flex items-center">
                <button
                  className="flex items-center gap-2 border border-[var(--color-primary)] rounded-[6px] px-4 h-9 cursor-pointer transition-colors duration-150 hover:bg-[#C69815]/8"
                  onClick={() => setActiveSubSection(2)}
                >
                  <img src="/images/icons/Activity log.svg" className="w-4 h-4" />
                  <p className="text-[var(--color-primary)] text-sm font-medium">{t('Activity log')}</p>
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <button
                  className="flex items-center gap-2 border border-[#E3E8EF] rounded-[6px] px-4 h-9 cursor-not-allowed opacity-50"
                  disabled
                >
                  <img src="/images/icons/No record log.svg" className="w-4 h-4" />
                  <p className="text-[#9AA4B2] text-sm font-medium">{t('No record')}</p>
                </button>
              </div>
            )}


          </section>
          <span className="border-[0.5px] border-[#E3E8EF] mb-6" />


          <section className='px-6 mb-6 '>
            
            <RequestDataPage bookingDetails={bookingDetails} StatusRender={StatusRender} status={status}/> {/* request Data card (card1) */}
            <WorkersDataPage status={status} assigned_handymen={assigned_handymen} bookingDetails={bookingDetails}/>  {/* Workers data */}
            {status === 'rejected' && (<RejectedCompPage bookingDetails={bookingDetails} />)}      {/* Rejected Component */}
            <CustomerPage bookingDetails={bookingDetails} />  {/* Customer Info */}
            <DescriptionPage bookingDetails={bookingDetails} />  {/* Description message and voice */}
            <ImagesPage bookingDetails={bookingDetails}/>  {/* Images */}
            <AddressPage  bookingDetails={bookingDetails} />     {/* Address */}
            <CarDetailsPage bookingDetails={bookingDetails} />  {/* Car Details */}
            <PaymentDetailsPage bookingDetails={bookingDetails}/> {/* Payment Details */}

          </section>




          {/* //Btns */}
          {status === 'pending_approval' && (
            <>
              <span className="border-[0.5px] border-[#E3E8EF] mb-6" />
              <div className='px-6 pb-6 flex gap-3'>
                <button className=' flex-1 h-11 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-[6px] cursor-pointer btn-primary '
                  onClick={handleApprove}
                >
                  {t('approval')}
                </button>
                <button className=' flex-1 h-11 border border-[#FEE4E2] text-[#D92D20] text-sm font-medium rounded-[6px] cursor-pointer transition-colors duration-150 hover:bg-[#FEE4E2] '
                  onClick={() => (handleClickOpen())}

                >
                  {t('reject')}
                </button>
              </div>
            </>
          )}

          {status === 'accepted' && (assigned_handymen.length === 0 ? (
            <>
              <span className="border-[0.5px] border-[#E3E8EF] mb-6" />
              <div className='px-6 pb-6 flex gap-3'>
                <button className=' flex-1 h-11 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-[6px] cursor-pointer btn-primary '
                  onClick={() => setActiveSection(2)}
                >
                  {t('Appoint a specialist')}
                </button>
                <button
                  onClick={()=> handleCancelled()}
                  className=' flex-1 h-11 border border-[#FEE4E2] text-[#D92D20] text-sm font-medium rounded-[6px] cursor-pointer transition-colors duration-150 hover:bg-[#FEE4E2] '>
                  {t('cancellation of reservation')}
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="border-[0.5px] border-[#E3E8EF] mb-6" />
              <div className='px-6 pb-6 flex gap-3'>
                <button 
                  onClick={() => setActiveSection(2)}
                className=' flex-1 h-11 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-[6px] cursor-pointer btn-primary '>
                  {t('Reset')}
                </button>
                <button 
                  onClick={()=> handleCancelled()}
                  className=' flex-1 h-11 border border-[#FEE4E2] text-[#D92D20] text-sm font-medium rounded-[6px] cursor-pointer transition-colors duration-150 hover:bg-[#FEE4E2] '>
                  {t('cancellation of reservation')}
                </button>
              </div>
            </>
          )
          )}


          {/* (اعاده تعيين (مخفي     */}
          {status === 'on_going' && (
            <> 
              <span className="border-[0.5px] border-[#E3E8EF] mb-6" />
              <div className='px-6 pb-6  '>
                <button className=' w-full h-11 bg-[#EEF2F6] text-[#9AA4B2] text-sm font-medium rounded-[6px] cursor-not-allowed '>
                  {t('Reset')}
                </button>
              </div>
            </>

          )}

        </>
      )}








      {/* سجل النشاط */}
      {activeSubSection === 2 && (
        <>
          <Activity_logPage setActiveSubSection={setActiveSubSection} bookingDetails={bookingDetails}/>

        </>
      )}












      <RejectedDialogPage open={open} handleClose={handleClose} bookingDetails={bookingDetails} />
    </>
  )
}

export default MainRequestViewPage


