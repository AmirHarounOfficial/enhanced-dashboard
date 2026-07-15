"use client"
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import ViewsPage from './Views/page';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const statusConfig = {
  confirmed:  { bg: 'bg-[#DCFAE6]', border: 'border-[#067647]', text: 'text-[#067647]', icon: '/images/icons/Active Status.svg',    labelKey: 'Acceptable' },
  completed:  { bg: 'bg-[#DCFAE6]', border: 'border-[#067647]', text: 'text-[#067647]', icon: '/images/icons/Active Status.svg',    labelKey: 'Complete' },
  pending:    { bg: 'bg-[#FFFAEB]', border: 'border-[#F79009]', text: 'text-[#DC6803]', icon: '/images/icons/pending Status.svg',   labelKey: 'Pending' },
  checked_in: { bg: 'bg-[#E3E8EF]', border: 'border-[#697586]', text: 'text-[#4B5565]', icon: '/images/icons/on_going Status.svg', labelKey: 'checked_in' },
  not_attend: { bg: 'bg-[#FEE4E2]', border: 'border-[#F97066]', text: 'text-[#D92D20]', icon: '/images/icons/refused Status.svg',  labelKey: 'not_attend' },
  canceled:   { bg: 'bg-[#FEE4E2]', border: 'border-[#F97066]', text: 'text-[#D92D20]', icon: '/images/icons/refused Status.svg',  labelKey: 'cancelled' },
};

function CardOfRequest({ getBooking, hasActiveFilters }) {
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlId = searchParams.get('id')

  const getBookingData = Array.isArray(getBooking) ? getBooking : getBooking?.data
  const [openView, setOpenView] = useState(false)

  useEffect(() => {
    setOpenView(!!urlId)
  }, [urlId])

  const StatusBadge = ({ status }) => {
    const cfg = statusConfig[status];
    if (!cfg) return null;
    return (
      <span className={"inline-flex items-center gap-1.5 text-xs font-medium h-7 px-2.5 rounded-2xl border " + cfg.bg + " " + cfg.border + " " + cfg.text}>
        <img src={cfg.icon} alt="" className="w-3.5 h-3.5" />
        {t(cfg.labelKey)}
      </span>
    );
  };

  return (
    <>
      {getBookingData && getBookingData.length === 0 && (
        <div className="col-span-2 lg1:col-span-3 flex flex-col items-center justify-center py-20 text-center">
          <img src="/images/icons/empty.svg" alt="empty" className="w-24 h-24 mb-4 opacity-40" onError={(e) => e.target.style.display = 'none'} />
          {hasActiveFilters && (
            <>
              <p className="text-[#697586] text-lg font-medium">{t('لا توجد نتائج')}</p>
              <p className="text-[#9AA4B2] text-sm mt-1">{t('لا توجد حجوزات تطابق الفلتر المحدد')}</p>
            </>
          )}
        </div>
      )}

      {getBookingData?.map((booking, index) => {
        const formatTime = (time) => {
          if (!time) return "--";
          const [hoursStr, minutesStr] = time.split(":");
          let hours = parseInt(hoursStr);
          const minutes = parseInt(minutesStr);
          if (isNaN(hours) || isNaN(minutes)) return "--";
          const period = hours >= 12 ? t('evening') : t('morning');
          hours = hours % 12 || 12;
          return hours + ":" + minutes.toString().padStart(2, "0") + " " + period;
        };

        return (
          <div key={booking?.id} className="bg-white border border-[#E3E8EF] rounded-[8px] mt-4 p-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex justify-between items-center mb-3">
              <div className="flex gap-3 items-center">
                <div className="bg-[#C69815]/15 text-[#C69815] text-sm w-10 h-10 flex justify-center items-center rounded-full font-semibold">
                  {booking?.guest?.name?.charAt(0) ?? 's'}
                </div>
                <p className="text-[#364152] text-sm font-medium">{booking?.guest?.name}</p>
              </div>
              <StatusBadge status={booking?.status} />
            </div>

            {booking?.guest_is_repeated && (
              <span className="inline-flex items-center border border-[var(--color-primary)] bg-[#FEF0C7] text-[var(--color-primary)] text-xs font-medium h-7 px-2.5 rounded-2xl mb-3">
                {t('Frequent guest')}
              </span>
            )}

            <div className="flex justify-between mb-4">
              <div>
                <p className="text-[#364152] text-sm font-medium">{booking?.property?.title}</p>
                <p className="text-[#697586] text-xs mt-0.5">{booking?.property?.city} , {booking?.property?.area}</p>
              </div>
              <p className="text-[#697586] text-xs font-medium">{booking?.booking_number}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'Arrival date',    value: booking?.check_in   && new Date(booking.check_in).toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" }) },
                { label: 'Departure date',  value: booking?.check_out  && new Date(booking.check_out).toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" }) },
                { label: 'Guests',          value: booking?.guest_count_text },
                { label: 'amount',          value: booking?.total_amount + 'جنية', gold: true },
              ].map(({ label, value, gold }) => (
                <div key={label}>
                  <p className="text-[#697586] text-xs mb-0.5">{t(label)}:</p>
                  <p className={"text-sm font-medium " + (gold ? 'text-[var(--color-primary)]' : 'text-[#364152]')}>{value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 text-sm mb-4">
              <p className="text-[#697586]">{t('Expected customer arrival time')}:</p>
              <p className="text-[#364152] font-medium">{booking?.expected_arrival_at && formatTime(booking.expected_arrival_at)}</p>
            </div>

            <hr className="border-[#E3E8EF] mb-4" />

            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  router.push(pathname + "?id=" + booking?.id, { scroll: false });
                  setOpenView(true);
                }}
                className="btn-primary bg-[var(--color-primary)] text-white h-11 w-[70%] rounded-[6px] cursor-pointer text-sm font-medium"
              >
                {t('Details')}
              </button>
              <button className="border border-[var(--color-primary)] w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-150 hover:bg-[#C69815]/5">
                <img src="/images/icons/chat_yellow.svg" alt="" className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}

      <ViewsPage
        open={openView}
        setOpen={(val) => {
          setOpenView(val);
          if (!val) router.push(pathname, { scroll: false });
        }}
        id={urlId}
      />
    </>
  )
}

export default CardOfRequest

