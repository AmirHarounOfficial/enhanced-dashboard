"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { getBookingByIDThunk } from "@/redux/slice/Requests/RequestsSlice";
import ViewHome_Car_Street_ModulePage from "./Views/Home_Car_Street_Module/View/page";
import { IMAGE_BASE_URL } from "../../../../../config/imageUrl";



export default function TableRequest({bookings ,bookingDetails, searchTerm}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null
  const current_module_key = userData?.current_module_key

  const [open, setOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setSelectedBookingId(id);
      dispatch(getBookingByIDThunk(id));
      setOpen(true);
    } else {
      setOpen(false);
      setSelectedBookingId(null);
    }
  }, [searchParams, dispatch]);

  const handleClickOpen = (id) => {
    const params = new URLSearchParams(searchParams);
    params.set('id', id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('id');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const statusConfig = {
    accepted:        { bg: '#DCFAE6', border: '#067647', text: '#067647', icon: '/images/icons/Active Status.svg',   label: 'accepted' },
    completed:       { bg: '#DCFAE6', border: '#067647', text: '#067647', icon: '/images/icons/Active Status.svg',   label: 'Complete' },
    pending_approval:{ bg: '#FFFAEB', border: '#F79009', text: '#DC6803', icon: '/images/icons/pending Status.svg',  label: 'pending' },
    in_progress:     { bg: '#EFF4FF', border: '#518BFF', text: '#004EEB', icon: '/images/icons/inactive Status.svg', label: 'in_progress' },
    on_going:        { bg: '#E3E8EF', border: '#697586', text: '#4B5565', icon: '/images/icons/on_going Status.svg', label: 'The worker on the road' },
    rejected:        { bg: '#FEE4E2', border: '#F97066', text: '#D92D20', icon: '/images/icons/refused Status.svg',  label: 'rejected' },
    cancelled:       { bg: '#FEE4E2', border: '#F97066', text: '#D92D20', icon: '/images/icons/refused Status.svg',  label: 'cancelled' },
  };

  const StatusRender = (status) => {
    const cfg = statusConfig[status];
    if (!cfg) return null;
    return (
      <span
        className='inline-flex items-center gap-1.5 text-xs font-medium h-7 px-2.5 rounded-2xl border'
        style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.text }}
      >
        <img src={cfg.icon} alt="" className='w-3 h-3 mt-0' />
        {t(cfg.label)}
      </span>
    );
  };

  return (
    <div className="data-table-wrap overflow-x-auto mt-2 mb-5">
      <table className="min-w-[1000px] lg1:w-full text-sm text-right">
        {/* Table Head */}
        <thead className="text-[#697586] sticky top-0 z-10">
          <tr>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("order number")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Customer name")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Service")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("the date")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("the time")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("The worker")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Status")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("the price")}</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-[#E3E8EF] bg-white">
          {Array.isArray(bookings?.bookings?.data) &&
            bookings.bookings.data
              .filter((row) => {
                if (!searchTerm) return true;
                return String(row?.id).includes(searchTerm);
              })
              .map((row) => (
            <tr
              key={row?.id}
              onClick={() => handleClickOpen(row?.id)}
              className="table-row-hover cursor-pointer transition-colors duration-100 text-[#697586]"
            >
              <td className="p-4 text-[#364152] font-medium">#{row?.id}</td>
              <td className="p-4">{row?.user?.name} {row?.user?.lastname}</td>
              <td className="p-4">{row?.service?.category?.title}</td>
              <td className="p-4 tabular-nums">{row?.visit_date}</td>
              <td className="p-4 tabular-nums font-mono text-xs">{row?.visit_time}</td>
              <td className="p-4">
                {!row?.assigned_handymen?.[0] ? (
                  <span className="text-[#9AA4B2] text-xs">{t('There is no handymen')}</span>
                ) : (
                  <div className="flex items-center gap-2">
                    {row?.assigned_handymen?.[0]?.image ? (
                      <img
                        src={`${IMAGE_BASE_URL}${row?.assigned_handymen?.[0]?.image}`}
                        alt={row?.worker}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-[#E3E8EF]"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#EEF2F6] text-[#697586] flex items-center justify-center text-xs font-semibold">
                        {row?.assigned_handymen?.[0]?.firstname?.charAt(0)}
                        {row?.assigned_handymen?.[0]?.lastname?.charAt(0)}
                      </div>
                    )}
                    <span>
                      {row?.assigned_handymen?.[0]?.firstname}{" "}
                      {row?.assigned_handymen?.[0]?.lastname}
                    </span>
                  </div>
                )}
              </td>
              <td className='p-4'>{StatusRender(row?.status)}</td>
              <td className="p-4 text-[#C69815] font-semibold tabular-nums">{row?.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*✅*/}
      <ViewHome_Car_Street_ModulePage
        open={open}
        handleClose={handleClose}
        bookingId={selectedBookingId}
        bookingDetails={bookingDetails}
      />
    </div>
  );
}
