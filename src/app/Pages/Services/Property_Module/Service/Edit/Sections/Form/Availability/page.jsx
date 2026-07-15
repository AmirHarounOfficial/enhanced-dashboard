"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import BookingTypePage from './BookingType/page';
import SpecialPricesPage from './SpecialPrices/page';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import TitleOfHeader from '../../TitleOfHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '@/app/Components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addAvailabilitySeasonsThunk, getAvailabilitySeasonsThunk } from '@/redux/slice/Services/ServicesSlice';
import { deleteSeasonalPrice } from '@/redux/api/Services/ServicesApi';

function AvailabilityPageContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const dispatch = useDispatch();
  const { getAvailabilitySeasons } = useSelector((state) => state.services);
  const getAvailabilitySeasonsData  = getAvailabilitySeasons?.data;

  useEffect(() => {
    if (id) dispatch(getAvailabilitySeasonsThunk(id));
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    property_id: '',
    availability: { all_avalable: false, slots: [] },
    seasonal_pricing: [],
  });

  const [deletedSeasonalPrices, setDeletedSeasonalPrices] = useState([]);

  useEffect(() => {
    if (getAvailabilitySeasonsData) {
      setFormData({
        property_id: getAvailabilitySeasonsData.property_id || '',

        availability: {
          all_avalable: getAvailabilitySeasonsData.all_avalable || false,
          slots: (getAvailabilitySeasonsData.availability || []).map(item => ({
            from:   item.start_date?.split('T')[0],
            to:     item.end_date?.split('T')[0],
            status: item.status,
          })),
        },

        seasonal_pricing: getAvailabilitySeasonsData.seasonal_pricing || [],
      });
    }
  }, [getAvailabilitySeasonsData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.availability.all_avalable && formData.availability.slots.length === 0) {
      alert(t('Please select at least one available date'));
      return;
    }

    try {
      if (deletedSeasonalPrices.length > 0) {
        await Promise.all(deletedSeasonalPrices.map(deletedId => deleteSeasonalPrice(deletedId)));
      }

      const payload = {
        property_id: formData.property_id,

        availability: {
          all_avalable: formData.availability.all_avalable,
          slots: formData.availability.slots.map(item => ({
            from:   item.from,    
            to:     item.to,
            status: item.status,
          })),
        },

        seasonal_pricing: formData.seasonal_pricing.map(item => ({
          title:      item.title,
          start_date: item.start_date || item.from,  
          end_date:   item.end_date   || item.to,
          price:      item.price,
        })),
      };

      await dispatch(
        addAvailabilitySeasonsThunk({
          property_id: formData.property_id,
          formData: payload,
        })
      ).unwrap();

      router.push(`/Pages/Services/Property_Module/Service/Edit?id=${formData.property_id}`);
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <MainLayout>
      <TitleOfHeader />

      <div className='border border-[#E6E6E6] p-8 rounded-[6px] mb-4'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 7 : </span>
            <span>{t('Availability')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>
            تم تمكين مزامنة التقويم . 45 ليلة متاحة
          </p>
          <div className='border border-[#E3E8EF] my-4'></div>
        </div>

        {/* ── Sub-pages get formData + setFormData ── */}
        <BookingTypePage   formData={formData} setFormData={setFormData} />
        <SpecialPricesPage 
          formData={formData} 
          setFormData={setFormData} 
          setDeletedSeasonalPrices={setDeletedSeasonalPrices}
        />

        {/* ── Action buttons ── */}
        <div className="flex mt-6">
          <div className='flex gap-2 justify-start w-full'>
            <button
              type="button"
              onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit?id=${id}`)}
              className="h-11 w-[30%] lg1:w-[15%] border border-[#697586] text-[#697586] rounded-[6px] cursor-pointer"
            >
              {t('Return')}
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="h-11 w-[30%] lg1:w-[15%] bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer"
            >
              {t('save')}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function AvailabilityPage() {
  return (
    <Suspense fallback={<Loader />}>
      <AvailabilityPageContent />
    </Suspense>
  );
}



