'use client';
import { getProviderRateThunk } from '@/redux/slice/Home/HomeSlice';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function RatePage() {
  const { t } = useTranslation();

  //API
  const dispatch = useDispatch()
  const {providerRate , providerState , loading} = useSelector((state) => state.Home)
  useEffect(()=>{
    dispatch(getProviderRateThunk())
  },[dispatch])

  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [showAll, setShowAll] = useState(false);

  const toggleExpanded = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const maxLength = 130;
  const hasMore = (providerRate?.ratings?.length ?? 0) > 3;
  const displayedRatings = showAll ? providerRate?.ratings : providerRate?.ratings?.slice(0, 3);

  return (
    <div className='bg-white border border-[#E3E8EF] rounded-[8px] my-6 p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-5'>
        <p className='text-[#0F022E] text-lg font-semibold'>{t('Reviews')}</p>
        <button
          onClick={() => hasMore && setShowAll(prev => !prev)}
          className={`text-sm font-medium px-3 py-1.5 rounded-[6px] transition-colors duration-150 ${
            hasMore
              ? 'text-[var(--color-primary)] hover:bg-[#C69815]/10 cursor-pointer'
              : 'text-[#C8C8C8] cursor-not-allowed'
          }`}
        >
          {showAll ? t('Less') : t('More')}
        </button>
      </div>

      {/* Rating summary */}
      <div className='border border-[#E3E8EF] rounded-[8px] mb-5 py-4 px-5 flex items-center gap-6 bg-[#F8FAFC]'>
        <p className='text-[#0F022E] text-5xl font-bold leading-none'>{providerState?.average_rating ?? '—'}</p>
        <div className='flex flex-col gap-1.5'>
          <p className='flex gap-1'>
            {Array.from({ length: 5 }, (_, i) => {
              const rating = providerState?.average_rating ?? 0;
              const full = Math.floor(rating);
              const hasHalf = rating - full >= 0.5;
              let src;
              if (i < full) {
                src = "/images/icons/star.svg";
              } else if (i === full && hasHalf) {
                src = "/images/icons/star-half.svg";
              } else {
                src = "/images/icons/star-empty.svg";
              }
              return <img key={i} src={src} alt="star" className='w-5 h-5' />;
            })}
          </p>
          <p className='text-[#697586] text-sm'>{providerState?.average_count} {t('reviews')}</p>
        </div>
      </div>

      {/* Reviews list */}
      <div className='flex flex-col divide-y divide-[#E3E8EF]'>
        {displayedRatings?.map((rate, index) => {
          const text = rate?.review || "";
          const isLong = text.length > maxLength;
          const shortText = text.slice(0, maxLength);
          const expanded = expandedIndexes[index];

          return (
            <div key={index} className="py-4 first:pt-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-3 items-center">
                  <div className="w-9 h-9 bg-[#C69815]/20 text-[#C69815] flex justify-center items-center rounded-full font-semibold text-sm flex-shrink-0">
                    {rate?.user?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#364152] text-sm font-semibold">
                      {rate?.user?.name} {rate?.user?.lastname}
                    </p>
                    <p className="text-[#9AA4B2] text-xs mt-0.5">
                      {`${new Date(rate?.created_at).getDate()}/${new Date(rate?.created_at).getMonth() + 1}/${new Date(rate?.created_at).getFullYear()}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/images/icons/star.svg" className="w-3.5 h-3.5"/>
                  <p className="text-[#FDB022] text-sm font-medium">{rate?.rating}</p>
                </div>
              </div>

              <p className="text-[#4B5565] text-sm font-normal leading-relaxed">
                {expanded || !isLong ? text : shortText + "... "}
                {isLong && (
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="text-[#C69815] text-sm font-medium cursor-pointer hover:underline ms-1"
                  >
                    {expanded ? t("Show less") : t("Read more")}
                  </button>
                )}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RatePage
