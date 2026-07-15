"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { useTranslation } from 'react-i18next';

const statusConfig = {
  confirmed:  { bg: 'bg-[#DCFAE6]', border: 'border-[#067647]', text: 'text-[#067647]', icon: '/images/icons/Active Status.svg',   labelKey: 'confirmed' },
  completed:  { bg: 'bg-[#DCFAE6]', border: 'border-[#067647]', text: 'text-[#067647]', icon: '/images/icons/Active Status.svg',   labelKey: 'Complete' },
  checked_in: { bg: 'bg-[#E3E8EF]', border: 'border-[#697586]', text: 'text-[#4B5565]', icon: '/images/icons/cargray.svg',         labelKey: 'checked_in' },
  pending:    { bg: 'bg-[#FFFAEB]', border: 'border-[#F79009]', text: 'text-[#DC6803]', icon: '/images/icons/pending Status.svg',  labelKey: 'Pending' },
  not_attend: { bg: 'bg-[#FEF0C7]', border: 'border-[var(--color-primary)]', text: 'text-[var(--color-primary)]', icon: '/images/icons/remove-circle_blue.svg', labelKey: 'not_attend' },
  canceled:   { bg: 'bg-[#FEE4E2]', border: 'border-[#F97066]', text: 'text-[#D92D20]', icon: '/images/icons/refused Status.svg',  labelKey: 'cancelled' },
};

function UpcomingBookingsPage({ topThreeBookings }) {
  const { t } = useTranslation();
  const router = useRouter();

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

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center mb-4'>
        <p className='text-[#364152] text-base font-semibold'>{t('Upcoming bookings')}</p>
        <button
          onClick={() => router.push('/Pages/requests/Property_Module')}
          className='text-[var(--color-primary)] text-sm font-medium cursor-pointer transition-opacity duration-150 hover:opacity-75'
        >
          {t('More')}
        </button>
      </div>

      <div className='bg-white border border-[#E3E8EF] rounded-[8px] p-4 mb-10 divide-y divide-[#E3E8EF]'>
        {topThreeBookings?.map((booking, index) => (
          <div key={index} className={index === 0 ? '' : 'pt-4'}>
            <div className='flex justify-between items-center mb-2'>
              <div className='flex items-center gap-2'>
                <div className='w-9 h-9 flex items-center justify-center bg-[#C69815]/15 text-[#C69815] rounded-full text-sm font-semibold'>
                  {booking?.guest?.name?.charAt(0)}
                </div>
                <p className='text-[#364152] text-sm font-medium'>{booking?.guest?.name}</p>
              </div>
              <StatusBadge status={booking?.status} />
            </div>

            <div className='flex justify-between items-center pb-4'>
              <p className='text-[#697586] text-sm w-[60%]'>{booking?.property?.title}</p>
              <p className='text-[#4B5565] text-xs text-end w-[40%]'>
                {new Date(booking?.check_in).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}
                {' : '}
                {new Date(booking?.check_out).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingBookingsPage


