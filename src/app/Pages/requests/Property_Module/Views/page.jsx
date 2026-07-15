"use client"
import { Dialog } from '@mui/material'
import { t } from 'i18next';
import React, { useEffect, useState } from 'react'
import RequestPage from './Request/page';
import GuestInformationPage from './GuestInformation/page';
import PropertyDetailsPage from './PropertyDetails/page';
import PaymentDetailsPage from './PaymentDetails/page';
import ProfitsPage from './profits/page';
import Activity_LogPage from './Activity_Log/page';
import { useDispatch, useSelector } from 'react-redux';
import { changeBookingActionThunk, getBookingByIdPropertyThunk } from '@/redux/slice/Requests/RequestsSlice';

function ViewsPage({open , setOpen, id}) {
  const [showActivityLog, setShowActivityLog] = useState(false);
  //api
  const dispatch = useDispatch()
  const {getBookingDetails} = useSelector((state)=>state.requests)
  useEffect(()=>{
    if (id && id !== "undefined" && open) {
      dispatch(getBookingByIdPropertyThunk(id))
        console.log(id);

    }
  },[dispatch, id, open])

  
  const status = getBookingDetails?.data?.status

  const handleChangeStatus = (action) => {
    dispatch(changeBookingActionThunk({ booking_id: id, action }))
      .unwrap()
      .then(() => dispatch(getBookingByIdPropertyThunk(id)))
      .catch((err) => console.error('Action failed:', err));
  };

  const StatusBtn = (status) => {
    switch (status) {
      case "confirmed": //مقبوله
        return (
          <div className='flex gap-6'>
            <button onClick={() => handleChangeStatus('checked_in')} className='bg-[var(--color-primary)] text-white h-14 w-full cursor-pointer rounded-[6px]'>{t('Accessed')}</button>
            <button onClick={() => handleChangeStatus('not_attend')} className='border border-[#F04438] text-[#F04438] h-14 w-full cursor-pointer rounded-[6px]'>{t('The client did not attend')}</button>
          </div>
        );
      case "completed"://مكتملة
        return (
          <div className='flex gap-6'>
            <button className='bg-[var(--color-primary)] text-white h-14 w-full cursor-pointer rounded-[6px]'>{t('Download the invoice')}</button>
            <button className='border border-[#F04438] text-[#F04438] h-14 w-full cursor-pointer rounded-[6px]'>{t('Report a problem')}</button>
          </div>
        );
      case "pending": //قيد الانتظار          
        return (
          <div className='flex gap-6'>
            <button onClick={() => handleChangeStatus("confirmed")} className='bg-[var(--color-primary)] text-white h-14 w-full cursor-pointer rounded-[6px]'>{t('Accept Booking')}</button>
            <button onClick={() => handleChangeStatus("canceled")} className='border border-[#F04438] text-[#F04438] h-14 w-full cursor-pointer rounded-[6px]'>{t('Reservation refused')}</button>
          </div>
        );
      case "checked_in": // تم الوصول 
        return (
          <div className='flex gap-6'>
            <button onClick={() => handleChangeStatus('completed')} className='bg-[#9333EA] text-white h-14 w-full cursor-pointer rounded-[6px]'>{t('Departure')}</button>
            <button className='border border-[#F04438] text-[#F04438] h-14 w-full cursor-pointer rounded-[6px]'>{t('Report a problem')}</button>
          </div>
        );
      case "not_attend": // لم يحضر
      case "canceled": // ملغيه
        return (
          <div >
            <button className='border border-[#F04438] text-[#F04438] h-14 w-full cursor-pointer rounded-[6px]'>{t('Report a problem')}</button>
          </div>
        );
      }
  };
  
  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* Close Button */}
      <section className="px-6 mt-6 flex justify-end">
        <button
          onClick={()=>{setOpen(false)}}
          className="border border-[#E3E8EF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      </section>

      {/*  */}
        

      {/* content */}
      <div className='px-6'>
        {showActivityLog ? (
          
          <Activity_LogPage onBack={() => setShowActivityLog(false)} />
        ) : (
          <>
            <section className="my-4 flex  justify-between  ">
              <div className='  '>
                <p className="text-[#364152] text-xl font-medium mb-5">
                  {t("Order details")}
                </p>
                <p className="text-[#4B5565] text-sm font-normal ">
                  {t("Full details explaining the status and contents of the order")}
                </p>
              </div>

              <div className=' flex items-center '>
                <button
                  className='flex gap-2 border border-[var(--color-primary)] rounded-[6px]  px-4 py-2.5 cursor-pointer'
                  onClick={() => setShowActivityLog(prev => !prev)}
                >
                  <img src="/images/icons/Activity log.svg" className="w-6 h-6" />
                  <p className='text-[var(--color-primary)] text-base font-normal'>{t('Activity log')}</p>
                </button>
              </div>
            </section>
            <div className="border border-[#E3E8EF] mb-6" />

            <RequestPage getBookingDetails={getBookingDetails}/>
            <GuestInformationPage getBookingDetails={getBookingDetails}/>
            <PropertyDetailsPage getBookingDetails={getBookingDetails}/>
            <PaymentDetailsPage getBookingDetails={getBookingDetails}/>
            <ProfitsPage getBookingDetails={getBookingDetails}/>
          </>
        )}
      </div>


      {/* btns */}
      <div className='px-6 my-6'>
        {StatusBtn(status)}
      </div>

    </Dialog>

    </>
  )
}

export default ViewsPage

