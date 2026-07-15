"use client"
import ViewsPage from '@/app/Pages/requests/Property_Module/Views/page';
import { getProviderRateThunk } from '@/redux/slice/Home/HomeSlice';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function Content() {
  const {t} = useTranslation()

    //API
  const dispatch = useDispatch()
  const {providerRate , providerState , loading} = useSelector((state) => state.Home)
  useEffect(()=>{
    dispatch(getProviderRateThunk())
  },[dispatch])

  console.log('providerRate' , providerRate);
  
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleOpenBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setBookingOpen(true);
  };
  
  const toggleExpanded = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  
  const maxLength = 130;
  return (
    <>
        
  {providerRate?.ratings?.map((rate, index) => {
  const text = rate?.review || "";
  const isLong = text.length > maxLength;
  const shortText = text.slice(0, maxLength);
  const expanded = expandedIndexes[index];

  return (
    <div
      key={index}
      className="border-b border-[#E3E8EF]"
    >
      <div className="flex justify-between">
        <div className="flex mb-4 gap-3">
          <p className="bg-[#C69815]/20 text-[#C69815] w-10 h-10 flex justify-center items-center rounded-full p-2 mt-2">
            {rate?.user?.name?.charAt(0)}
          </p>

          <div className="flex flex-col gap-1">
            <p className="text-[#364152] text-base font-medium">
              {rate?.user?.name} {rate?.user?.lastname}
            </p>

            <p className="text-[#697586] text-sm font-normal">
              {`${new Date(rate?.created_at).getDate()}/${
                new Date(rate?.created_at).getMonth() + 1
              }/${new Date(rate?.created_at).getFullYear()}`}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium flex gap-1">
            <span className="text-[#8B8B8B]">#</span>

            <span
              className="text-[var(--color-primary)] underline cursor-pointer"
              onClick={() => handleOpenBooking(rate?.booking_id)}
            >
              {rate?.booking_id}
            </span>
          </p>

          <p className="flex items-center">
            <img
              src="/images/icons/star.svg"
              className="w-4 h-4 mt-0.5"
            />

            <span className="text-[#FDB022] text-sm font-medium">
              {rate?.rating}
            </span>
          </p>
        </div>
      </div>

      <p className="mb-4 text-[#4B5565] text-sm font-normal">
        {expanded || !isLong ? text : shortText + "... "}

        {isLong && (
          <span
            onClick={() => toggleExpanded(index)}
            className="text-[var(--color-primary)] text-sm font-normal cursor-pointer"
          >
            {expanded ? t("Show less") : t("Read more")}
          </span>
        )}
      </p>
    </div>
  );
})}
      <ViewsPage
        open={bookingOpen}
        setOpen={setBookingOpen}
        id={selectedBookingId}
      />
    </>
  )
}

export default Content


