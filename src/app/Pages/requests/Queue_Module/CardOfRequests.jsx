"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NotificationPage from './Dialog/Notification/page'
import DetailsPage from './Dialog/Details/page'

const statusConfig = {
  confirmed: { cls: 'bg-[#DCFAE6] border-[#067647] text-[#067647]',   icon: '/images/icons/Active Status.svg',       label: 'certain' },
  completed: { cls: 'bg-[#DCFAE6] border-[#067647] text-[#067647]',   icon: '/images/icons/Active Status.svg',       label: 'Complete' },
  pending:   { cls: 'bg-[#FFFAEB] border-[#F79009] text-[#DC6803]',   icon: '/images/icons/pending Status.svg',      label: 'Pending' },
  arrived:   { cls: 'bg-[#F9F5E8] border-[#9E7A11] text-[#9E7A11]',   icon: '/images/icons/tabler_map-pin-check.svg', label: 'receipt' },
  seated:    { cls: 'bg-[#E3E8EF] border-[#697586] text-[#4B5565]',   icon: '/images/icons/chair-gray.svg',          label: 'sitting' },
  no_show:   { cls: 'bg-[#FEF0C7] border-[var(--color-primary)] text-[var(--color-primary)]',   icon: '/images/icons/tabler_map-pin-x.svg',    label: 'not_attend' },
  canceled:  { cls: 'bg-[#FEE4E2] border-[#F97066] text-[#D92D20]',   icon: '/images/icons/refused Status.svg',      label: 'cancelled' },
  rejected:  { cls: 'bg-[#FEE4E2] border-[#F97066] text-[#D92D20]',   icon: '/images/icons/refused Status.svg',      label: 'rejected' },
};

function CardOfRequests({getReservationsData}) {
  const {t} = useTranslation()

  const [openNotification, setOpenNotification] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState({ id: null, guest_name: '' })
  const [openDetails, setOpenDetails] = useState(false)

  const StatusBadge = ({ status }) => {
    const cfg = statusConfig[status];
    if (!cfg) return null;
    return (
      <span className={"inline-flex items-center gap-1.5 text-xs font-medium h-7 px-2.5 rounded-2xl border " + cfg.cls}>
        <img src={cfg.icon} alt="" className="w-3 h-3" />
        {t(cfg.label)}
      </span>
    );
  };

  return (
    <>
      {getReservationsData?.data.length > 0 ? (
        <div className='grid grid-cols-2 gap-4 mt-6'>
          {getReservationsData?.data.map((reservation) => (
            <div
              onClick={() => { setSelectedReservation({ id: reservation?.id }); setOpenDetails(true) }}
              key={reservation?.id}
              className='bg-white border border-[#E3E8EF] rounded-[8px] p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer'
            >
              <div className='flex justify-between items-center mb-3'>
                <div className='flex gap-3 items-center'>
                  <div className='bg-[#C69815]/15 text-[#C69815] text-sm font-semibold w-12 h-10 rounded-[6px] flex items-center justify-center'>
                    #{reservation?.table_code}
                  </div>
                  <p className='text-[#364152] text-base font-semibold'>{reservation?.guest_name}</p>
                </div>
                <StatusBadge status={reservation?.status} />
              </div>

              <div className='grid grid-cols-2 gap-2.5 mb-4'>
                <div className='flex gap-1.5 items-center'>
                  <img src="/images/icons/user-group_grey.svg" alt="" className="w-4 h-4" />
                  <p className='text-[#697586] text-sm'>{reservation?.guest_count} {t('guests')}</p>
                </div>
                <p className='text-[#697586] text-sm'>
                  {new Date("1970-01-01T" + reservation?.start_time).toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit', hour12: true })}
                </p>
                <div className='flex gap-1.5 items-center'>
                  <img src="/images/icons/restaurant-gray.svg" alt="" className="w-4 h-4" />
                  <p className='text-[#364152] text-sm'>{reservation?.hall_name}</p>
                </div>
                <div className='flex gap-1.5 items-center'>
                  <img src="/images/icons/tree.svg" alt="" className="w-4 h-4" />
                  <p className='text-[#364152] text-sm'>{reservation?.views?.[0]?.name}</p>
                </div>
              </div>

              <hr className='border-[#E3E8EF] mb-3' />

              <div className='flex gap-3'>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedReservation({ id: reservation?.id, guest_name: reservation?.guest_name }); setOpenNotification(true) }}
                  className='flex-1 h-11 border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-medium rounded-[6px] cursor-pointer hover:bg-[#F9F5E8] transition-colors duration-150'
                >
                  {t('notice')}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${reservation?.guest_phone}` }}
                  className='flex-1 h-11 border border-[#E3E8EF] text-[#697586] text-sm font-medium rounded-[6px] cursor-pointer hover:bg-[#F8FAFC] transition-colors duration-150'
                >
                  {t('communication')}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center mt-10 text-[#697586]'>{t('No reservations')}</p>
      )}

      <NotificationPage open={openNotification} setOpen={setOpenNotification} reservationData={selectedReservation} />
      <DetailsPage open={openDetails} setOpen={setOpenDetails} reservationData={selectedReservation} />
    </>
  )
}

export default CardOfRequests
