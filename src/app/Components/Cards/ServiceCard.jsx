"use client";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IMAGE_BASE_URL } from '../../../../config/imageUrl';
// import ViewPage from '@/app/Pages/Services/Home_Car_Module/Service/View/_page';
import ViewPage from '../../Pages/Services/Home_Car_Module/Service/View/page'

function ServiceCard({ service }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const StatusRender = (status) => {
    const base = 'h-8 rounded-2xl text-xs font-medium';
    const inner = 'py-1 px-2.5 flex items-center gap-1.5';
    switch (status) {
      case "active":
        return (
          <div className={`${base} bg-[#DCFAE6] border border-[#067647] text-[#067647]`}>
            <div className={inner}>
              <img src="/images/icons/Active Status.svg" alt="" className='w-3.5 h-3.5' />
              <span>{t('active')}</span>
            </div>
          </div>
        );
      case "inactive":
        return (
          <div className={`${base} bg-[#EFF4FF] border border-[#518BFF] text-[#004EEB]`}>
            <div className={inner}>
              <img src="/images/icons/inactive Status.svg" alt="" className='w-3.5 h-3.5' />
              <span>{t('inactive')}</span>
            </div>
          </div>
        );
      case "pending":
        return (
          <div className={`${base} bg-[#FFFAEB] border border-[#F79009] text-[#DC6803]`}>
            <div className={inner}>
              <img src="/images/icons/pending Status.svg" alt="" className='w-3.5 h-3.5' />
              <span>{t('pending')}</span>
            </div>
          </div>
        );
      case "stopped":
        return (
          <div className={`${base} bg-[#FEE4E2] border border-[#F97066] text-[#D92D20]`}>
            <div className={inner}>
              <img src="/images/icons/stopped Status.svg" alt="" className='w-3.5 h-3.5' />
              <span>{t('stopped')}</span>
            </div>
          </div>
        );
      case "refused":
        return (
          <div className={`${base} bg-[#FEE4E2] border border-[#F97066] text-[#D92D20]`}>
            <div className={inner}>
              <img src="/images/icons/refused Status.svg" alt="" className='w-3.5 h-3.5' />
              <span>{t('refused')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <>
      <section
        onClick={handleClickOpen}
        className='card-gold-hover img-card-hover bg-white border border-[#E3E8EF] rounded-[10px] overflow-hidden cursor-pointer'
      >
        {/* Image header */}
        <div className="relative overflow-hidden" style={{ height: '176px' }}>
          <img
            src={`${IMAGE_BASE_URL}${service?.image}`}
            alt=""
            className="img-card-img w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute top-2.5 start-2.5">
            {StatusRender(service?.status)}
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className='text-[#364152] text-sm font-semibold mb-2 truncate'>
            {service?.category?.title}
          </p>

          {/* Price row */}
          {service?.price_on_inspection === true ? (
            <div className='flex gap-1.5 items-center'>
              <img src="/images/icons/price.svg" alt="" className="w-4 h-4" />
              <p className='text-[#C69815] text-sm font-medium'>{t('Price upon viewing')}</p>
            </div>
          ) : (
            <div className='flex items-center gap-3'>
              <div className='flex gap-1.5 items-center'>
                <img src="/images/icons/price.svg" alt="" className="w-4 h-4" />
                <p className='text-[#C69815] text-sm font-semibold'>{service?.sale_price}{t('Pound')}</p>
              </div>
              {service?.sale_price && Number(service.sale_price) !== 0 && Number(service.price) !== 0 && (
                <div className="flex items-center gap-1">
                  <img src="/images/icons/sale price.svg" alt="" className="w-4 h-4" />
                  <p className="text-[#D92D20] font-medium text-xs line-through">{service?.price} جنية</p>
                </div>
              )}
            </div>
          )}

          {/* Stats metric grid */}
          <div className="metric-grid">
            <div className="metric-grid-item">
              <img src="/images/icons/Revenues.svg" alt="" className='w-3.5 h-3.5 flex-shrink-0' />
              <span className='text-[#697586]'>{t('Revenues')} </span>
              <span className='text-[#C69815] font-semibold'>{service?.bookings_sum_price ?? '0'}</span>
            </div>
            <div className="metric-grid-item">
              <img src="/images/icons/RequestsNumber.svg" alt="" className='w-3.5 h-3.5 flex-shrink-0' />
              <span className='text-[#697586]'>{t('Requests')} </span>
              <span className='text-[#364152] font-semibold'>{service?.bookings_count}</span>
            </div>
            <div className="metric-grid-item">
              <img src="/images/icons/Available areas.svg" alt="" className='w-3.5 h-3.5 flex-shrink-0' />
              <span className='text-[#697586]'>{t('areas')} </span>
              <span className='text-[#C69815] font-semibold'>({service?.areas?.length || 0}+)</span>
            </div>
            <div className="metric-grid-item">
              <img src="/images/icons/view.svg" alt="" className='w-3.5 h-3.5 flex-shrink-0' />
              <span className='text-[#364152] font-semibold'>{service?.views_count}</span>
              <span className='text-[#697586]'> {t('View')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Use the client-safe component */}
      <ViewPage open={open} handleClose={handleClose} serviceId={service?.id} />
    </>
  );
}

export default ServiceCard;
