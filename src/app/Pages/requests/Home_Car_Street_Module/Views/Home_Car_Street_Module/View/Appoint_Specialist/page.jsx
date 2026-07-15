"use client"
import SearchForm from '@/app/Components/Forms/SearchForm'
import { assignHandymanThunk, getAvailableHandymenThunk, getBookingByIDThunk } from '@/redux/slice/Requests/RequestsSlice';
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { IMAGE_BASE_URL } from '../../../../../../../../../config/imageUrl';

// Force dynamic rendering - this page should not be statically generated
export const dynamic = 'force-dynamic';

function Appoint_SpecialistPage({ setActiveSection , bookingDetails }) {
  
  const [selectedHandymen, setSelectedHandymen] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleHandyman = (id) => {
    setSelectedHandymen((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleAssign = () => {
    if (selectedHandymen.length === 0) return;
    const mergedHandymen = [...(bookingDetails?.assigned_handymen_ids || []), ...selectedHandymen];
    dispatch(assignHandymanThunk({
      booking_id: bookingDetails?.id,
      handymen: mergedHandymen,
    })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setSelectedHandymen([]);
        // Refresh booking details to update assigned handymen
        dispatch(getBookingByIDThunk(bookingDetails?.id));
        // Refresh available handymen list
        const formData = new FormData();
        formData.append('booking_id', bookingDetails?.id);
        formData.append('visit_date', bookingDetails?.visit_date);
        formData.append('visit_time', bookingDetails?.visit_time);
        dispatch(getAvailableHandymenThunk(formData));
        window.dispatchEvent(new Event('booking_updated'));
      }
    });
  };

  //api


  const dispatch = useDispatch()
  const {availableHandymen , loading, error } = useSelector((state) => state.requests)
  useEffect(()=>{
    const formData = new FormData()
    formData.append('booking_id', bookingDetails?.id)
    formData.append('visit_date', bookingDetails?.visit_date)
    formData.append('visit_time', bookingDetails?.visit_time)
    dispatch(getAvailableHandymenThunk(formData))
  },[dispatch])

  console.log("booking_id", bookingDetails?.id);

  const assignedIds = bookingDetails?.assigned_handymen_ids || [];

  return (
    <div className='h-full flex flex-col'>
      <div className='px-6 flex gap-6 mb-5'>
        <div className='flex justify-center items-center cursor-pointer' onClick={() => setActiveSection(1)}>
          <p className='bg-[var(--color-primary)] w-10 h-10 flex justify-center items-center rounded-[8px]'>
            <img src="/images/icons/arrow-left-go.svg" alt="" className='w-8 h-8' />
          </p>
        </div>

        <div className=''>
          <p className='text-[#364152] text-lg font-medium'>{t('Appoint a specialist')}</p>
          <p className='text-[#4B5565] text-sm font-normal'>{t('He was specifically appointed to implement and monitor specialized measures.')}</p>
        </div>

      </div>
      <span className="border-[0.5px] border-[#E3E8EF] " />


      {/* search */}
      <section className='px-6 pt-6'>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('Search by employee name')}
          className='w-full border border-[#E3E8EF] rounded-[6px] px-4 py-2.5 text-sm text-[#364152] outline-none focus:border-[var(--color-primary)] transition'
        />
      </section>

      <div className=' h-[320px]  overflow-y-auto'>
        {/* specialists list */}
        <section className='p-6 '>
          {availableHandymen?.filter((handyman) => {
              const fullName = `${handyman?.firstname ?? ''} ${handyman?.lastname ?? ''}`.toLowerCase();
              return fullName.includes(searchQuery.toLowerCase());
            }).map((handyman)=>{
                const isAssigned = assignedIds.includes(handyman?.id);
                const isSelected = selectedHandymen.includes(handyman?.id);
                console.log('handyman?.id'  , handyman?.id);
            return (
            <div 
              key={handyman?.id}
              className=' shadow-sm rounded-[8px] p-4'>
              <div className='flex gap-2 mb-4'>
                {/* avatar */}
                <div >
                  <img src={`${IMAGE_BASE_URL}${handyman?.image}`} alt="" className='w-15 h-15 rounded-full'/>
                </div>
                {/* name and specialization */}
                <div className='font-normal'>
                  <p className='text-[#202939] text-lg mb-2'>{handyman?.firstname} {handyman?.lastname} {handyman?.id}</p>
                  <p className='text-[#697586] text-base'>{handyman?.designation?.name}</p>
                </div>

              </div>

              {/* time */}
              <div className='flex gap-1.5 mb-6'>
                <img src="/images/icons/time.svg" alt="" />
                <p className='text-[#697586]'> {t('Available time')}: {handyman?.working_time}</p>
              </div>

              {/* btn */}
              <button
                onClick={() => !isAssigned && handleToggleHandyman(handyman?.id)}
                disabled={isAssigned}
                className={`
                  flex items-center justify-center gap-2 px-4 py-2 rounded-md transition w-full h-11 cursor-pointer
                  ${isAssigned || isSelected ? "bg-[#17B26A] " : "border border-[var(--color-primary)] "}
                `}
              >
                {isAssigned ?(
                  <img src='/images/icons/checkmark-circle.svg' />
                ) :isSelected ? (
                  <img src='/images/icons/loading.svg' />
                ) : (
                  <img src='/images/icons/add-circle.svg' />
                )}
                <span>
                  {isAssigned ? (
                    <span className='text-white text-base font-medium'>{t('The factor was identified')}</span>
                  ) : isSelected ? (
                    <span className='text-white text-base font-medium'>{t('Selected')}</span>
                  ) : (
                    <span className='text-[var(--color-primary)] text-base font-medium '>{t('to set')}</span>
                  )}
                </span>
              </button>
            </div>
          )})}
          
        </section>
      </div>
    

      <div className='p-6'>
        <button
          onClick={handleAssign}
          disabled={selectedHandymen.length === 0 || loading}
          className={`bg-[var(--color-primary)] text-white w-full h-14 flex items-center justify-center rounded-[6px] cursor-pointer ${
            selectedHandymen.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <CircularProgress color="inherit" size="20px"  />
          ) : (t('assign'))}
        </button>
      </div>

    </div>
  )
}

export default Appoint_SpecialistPage



