'use client';
import { getBookingNewThunk, getBookingOngoingThunk } from '@/redux/slice/Home/HomeSlice';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_BASE_URL } from '../../../../../../../../../config/imageUrl';
import { UpdateBookingThunk } from '@/redux/slice/Requests/RequestsSlice';

const statusConfig = {
  accepted:        { bg: 'bg-[#DCFAE6]', border: 'border-[#067647]', text: 'text-[#067647]', icon: '/images/icons/Active Status.svg',    labelKey: 'accepted' },
  completed:       { bg: 'bg-[#DCFAE6]', border: 'border-[#067647]', text: 'text-[#067647]', icon: '/images/icons/Active Status.svg',    labelKey: 'Complete' },
  pending_approval:{ bg: 'bg-[#FFFAEB]', border: 'border-[#F79009]', text: 'text-[#DC6803]', icon: '/images/icons/pending Status.svg',   labelKey: 'pending' },
  in_progress:     { bg: 'bg-[#EFF4FF]', border: 'border-[#518BFF]', text: 'text-[#004EEB]', icon: '/images/icons/inactive Status.svg',  labelKey: 'in_progress' },
  on_going:        { bg: 'bg-[#E3E8EF]', border: 'border-[#697586]', text: 'text-[#4B5565]', icon: '/images/icons/on_going Status.svg',  labelKey: 'The worker on the road' },
  rejected:        { bg: 'bg-[#FEE4E2]', border: 'border-[#F97066]', text: 'text-[#D92D20]', icon: '/images/icons/refused Status.svg',   labelKey: 'rejected' },
};

function CurrentOrdersPage({ orders = [], layout = "list", current_module_key }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookingOngoingThunk());
  }, [dispatch]);

  const handleOpenMap = (order) => {
    const lat = order?.booking_current_latitude || order?.latitude || order?.lat;
    const lng = order?.booking_current_longitude || order?.longitude || order?.lng;
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    } else {
      alert("لم أتمكن من العثور على الإحداثيات! هذه هي البيانات المتاحة بالطلب:\n" + Object.keys(order).join(",\n"));
      console.warn("Missing location data:", order);
    }
  };

  const StatusBadge = ({ status }) => {
    const cfg = statusConfig[status];
    if (!cfg) return null;
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-medium h-7 px-2.5 rounded-2xl border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
        <img src={cfg.icon} alt="" className="w-3.5 h-3.5" />
        {t(cfg.labelKey)}
      </span>
    );
  };

  const handleInProgressBooking = (booking_id) => {
    if (!booking_id) return;
    dispatch(UpdateBookingThunk({ id: booking_id, formData: { status: "in_progress" } }))
      .unwrap()
      .then(() => dispatch(getBookingNewThunk()))
      .catch((err) => console.error("Failed to accept booking:", err));
  };

  return (
    <div className='border border-[#E3E8EF] rounded-[8px] p-6 max-h-[500px] overflow-y-auto'>
      <p className='text-[#364152] text-base font-semibold mb-4'>{t('Current orders')}</p>

      <div className={layout === "grid" ? "grid grid-cols-2 gap-4" : `grid lg1:grid-cols-1 ${orders.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        {orders?.map((order) => (
          <div key={order?.booking_id} className='border border-[#E3E8EF] bg-white rounded-[8px] p-4 shadow-sm transition-shadow duration-200 hover:shadow-md'>
            <div className='flex justify-between w-full'>
              <div className='flex gap-2 items-center'>
                <img
                  src={order?.service_icon ? `${IMAGE_BASE_URL}${order.service_icon}` : "/images/icons/renewable-energy.svg"}
                  alt="service"
                  className='w-6 h-6 rounded'
                />
                <p className='text-[#364152] text-base font-semibold'>{order?.service_name}</p>
              </div>
              <StatusBadge status={order?.booking_status} />
            </div>

            <hr className='border-[#E3E8EF] my-3' />

            <div className='flex justify-between w-full'>
              <div className='flex gap-2 items-center lg1:w-full w-[70%]'>
                <img src='/images/icons/Customer.svg' alt='' className='w-5 h-5' />
                <p className='text-sm'>
                  <span className='text-[#697586]'>{t('Customer')} </span>
                  <span className='text-[#364152] font-medium'>{order?.username}</span>
                </p>
              </div>

              <div className='flex justify-end gap-3 lg1:w-full w-[30%]'>
                <button className='w-8 h-8 rounded-full border border-[#E3E8EF] flex items-center justify-center
                                   transition-colors duration-150 hover:border-[var(--color-primary)] hover:bg-[#C69815]/5'>
                  <img src='/images/icons/chat.svg' alt='chat' className='w-4 h-4' />
                </button>
                <a href={`tel:${order?.phone}`} className='w-8 h-8 rounded-full border border-[#E3E8EF] flex items-center justify-center
                                   transition-colors duration-150 hover:border-[var(--color-primary)] hover:bg-[#C69815]/5'>
                  <img src='/images/icons/calll.svg' alt='call' className='w-4 h-4' />
                </a>
              </div>
            </div>

            {/* Buttons */}
            {current_module_key === 'home_services' && (
              <button
                onClick={() => handleOpenMap(order)}
                className='btn-primary flex gap-2 items-center justify-center bg-[var(--color-primary)] text-white text-sm font-semibold w-full h-11 mt-4 rounded-[6px] cursor-pointer'
              >
                <img src='/images/icons/maps-location.svg' alt='' className='w-5 h-5' />
                <span>{t('Open the map')}</span>
              </button>
            )}

            {current_module_key === 'car_services' && (
              <div className='flex gap-3 mt-4'>
                <button
                  onClick={() => handleInProgressBooking(order?.booking_id)}
                  className='btn-primary flex gap-2 items-center justify-center bg-[var(--color-primary)] text-white text-sm font-semibold w-full h-11 rounded-[6px] cursor-pointer'
                >
                  <span>{t('Start Service')}</span>
                  <img src='/images/icons/arrow-left-white.svg' alt='' className='w-5 h-5' />
                </button>
                <button
                  onClick={() => handleOpenMap(order)}
                  className='flex gap-2 items-center justify-center border border-[#E3E8EF] text-[#697586] text-sm font-medium w-full h-11 rounded-[6px] cursor-pointer
                             transition-colors duration-150 hover:border-[#697586] hover:bg-[#F8FAFC] active:scale-[0.97]'
                >
                  <img src='/images/icons/maps-location_gray.svg' alt='' className='w-5 h-5' />
                  <span>{t('Open the map')}</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentOrdersPage;
