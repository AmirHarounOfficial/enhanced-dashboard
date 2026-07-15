"use client";
import { getProviderStateThunk } from '@/redux/slice/Home/HomeSlice';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/app/Components/Loader/Loader';

function BoxPage({ current_module_key }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { providerState, loading } = useSelector((state) => state.Home);

  useEffect(() => {
    dispatch(getProviderStateThunk());
  }, [dispatch]);

  const role = providerState?.role;

  if (loading) return <Loader />;

  return (
    <section className="mb-10 grid grid-cols-2 lg1:grid-cols-4 gap-4 stagger-children">

      {/* New Orders */}
      <div className="stat-card card-warm border border-[#E3E8EF] rounded-[12px] p-5 flex flex-col gap-4 cursor-default">
        <div className="flex items-center justify-between">
          <span className="w-11 h-11 flex justify-center items-center bg-[#FEF3F2] rounded-[10px] flex-shrink-0 shadow-[0_2px_6px_rgb(240_68_56_/_0.15)]">
            <img src="/images/icons/invoice-red.svg" alt="" className="w-5 h-5" />
          </span>
          <span className="text-xs font-semibold text-[#F04438] bg-[#FEF3F2] px-2.5 py-1 rounded-full border border-[#FEE4E2]">
            {t('New')}
          </span>
        </div>
        <div>
          <p className="kpi-value counter-enter">{providerState?.new_bookings_count ?? 0}</p>
          <p className="text-[#697586] text-sm font-normal mt-1.5">{t('New orders')}</p>
        </div>
        <p className="text-[#9AA4B2] text-xs border-t border-[#F3F4F6] pt-2.5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F04438] inline-block"></span>
          {t('today')}
        </p>
      </div>

      {/* Current Orders */}
      <div className="stat-card card-warm border border-[#E3E8EF] rounded-[12px] p-5 flex flex-col gap-4 cursor-default">
        <div className="flex items-center justify-between">
          <span className="w-11 h-11 flex justify-center items-center bg-[#DCFAE6] rounded-[10px] flex-shrink-0 shadow-[0_2px_6px_rgb(6_118_71_/_0.15)]">
            <img src="/images/icons/invoice-green.svg" alt="" className="w-5 h-5" />
          </span>
          <span className="text-xs font-semibold text-[#067647] bg-[#DCFAE6] px-2.5 py-1 rounded-full border border-[#ABEFC6]">
            {t('Active')}
          </span>
        </div>
        <div>
          <p className="kpi-value counter-enter">{providerState?.ongoing_bookings_count ?? 0}</p>
          <p className="text-[#697586] text-sm font-normal mt-1.5">{t('Current Orders')}</p>
        </div>
        <p className="text-[#9AA4B2] text-xs border-t border-[#F3F4F6] pt-2.5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#067647] inline-block"></span>
          {t('ongoing')}
        </p>
      </div>

      {/* Profits */}
      <div className="stat-card border border-[rgba(198,152,21,0.2)] rounded-[12px] p-5 flex flex-col gap-4 cursor-default" style={{background:'linear-gradient(145deg,#fffdf5 0%,#fff8e8 100%)'}}>
        <div className="flex items-center justify-between">
          <span className="w-11 h-11 flex justify-center items-center bg-[#FEF0C7] rounded-[10px] flex-shrink-0 shadow-[0_2px_8px_rgb(198_152_21_/_0.25)]">
            <img src="/images/icons/profits-orange.svg" alt="" className="w-5 h-5" />
          </span>
          <span className="text-xs font-semibold text-[#C69815] bg-[#FEF0C7] px-2.5 py-1 rounded-full border border-[#F5D469]">
            SAR
          </span>
        </div>
        <div>
          <p className="gold-shimmer-text text-[30px] leading-[1.1] counter-enter">{providerState?.today_earnings ?? 0}</p>
          <p className="text-[#697586] text-sm font-normal mt-1.5">{t('profits')}</p>
        </div>
        <p className="text-[#9AA4B2] text-xs border-t border-[#F5E9B0] pt-2.5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C69815] inline-block"></span>
          {t('today')}
        </p>
      </div>

      {/* Rating / Technicians */}
      {(
        current_module_key === 'street_assistant' ||
        current_module_key === 'home_services' ||
        current_module_key === 'car_services'
      ) && (
        role === 'company' ? (
          <div className="stat-card card-warm border border-[#E3E8EF] rounded-[12px] p-5 flex flex-col gap-4 cursor-default">
            <div className="flex items-center justify-between">
              <span className="w-11 h-11 flex justify-center items-center bg-[#FEF0C7] rounded-[10px] flex-shrink-0 shadow-[0_2px_6px_rgb(198_152_21_/_0.18)]">
                <img src="/images/icons/labor-blue.svg" alt="" className="w-5 h-5" />
              </span>
              <span className="text-xs font-semibold text-[#C69815] bg-[#FEF0C7] px-2.5 py-1 rounded-full border border-[#F5D469]">
                {t('Team')}
              </span>
            </div>
            <div>
              <p className="kpi-value counter-enter">{providerState?.handymen_count ?? 0}</p>
              <p className="text-[#697586] text-sm font-normal mt-1.5">{t('Available technicians')}</p>
            </div>
            <p className="text-[#9AA4B2] text-xs border-t border-[#F3F4F6] pt-2.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C69815] inline-block"></span>
              {t('Technicians')}
            </p>
          </div>
        ) : (
          <div className="stat-card card-warm border border-[#E3E8EF] rounded-[12px] p-5 flex flex-col gap-4 cursor-default">
            <div className="flex items-center justify-between">
              <span className="w-11 h-11 flex justify-center items-center bg-[#FEF0C7] rounded-[10px] flex-shrink-0 shadow-[0_2px_6px_rgb(198_152_21_/_0.18)]">
                <img src="/images/icons/Evaluation-blue.svg" alt="" className="w-5 h-5" />
              </span>
              <span className="text-xs font-semibold text-[#C69815] bg-[#FEF0C7] px-2.5 py-1 rounded-full border border-[#F5D469]">
                ★
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <img src="/images/icons/star.svg" alt="" className="w-5 h-5" />
                <p className="kpi-value text-[#FDB022] counter-enter">{providerState?.average_rating ?? '–'}</p>
              </div>
              <p className="text-[#697586] text-sm font-normal mt-1.5">{t('Evaluation')}</p>
            </div>
            <p className="text-[#9AA4B2] text-xs border-t border-[#F3F4F6] pt-2.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FDB022] inline-block"></span>
              {t('average rating')}
            </p>
          </div>
        )
      )}

    </section>
  );
}

export default BoxPage;
