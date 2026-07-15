
"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesForFilterThunk } from "@/redux/slice/Requests/RequestsSlice";
import { useSearchParams } from "next/navigation";

const Dialog = dynamic(() => import("@mui/material/Dialog"), { ssr: false });

function FiltersPageContent({ open, handleClose, onApplyFilters }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getPropertiesFilter } = useSelector((state) => state.requests);

  useEffect(() => {
    dispatch(getPropertiesForFilterThunk());
  }, [dispatch]);

  // ── Filter State ──────────────────────────────────────────
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [checkInFrom, setCheckInFrom]           = useState(null);
  const [checkInTo, setCheckInTo]               = useState(null);
  const [checkOutFrom, setCheckOutFrom]         = useState(null);
  const [checkOutTo, setCheckOutTo]             = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [selectedPropertyTitle, setSelectedPropertyTitle] = useState("");
  const [selectedPayment, setSelectedPayment]   = useState(null);
  const [minPrice, setMinPrice]                 = useState("");
  const [maxPrice, setMaxPrice]                 = useState("");

  // ── Property dropdown ────────────────────────────────────
  const [openProp, setOpenProp] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);
  const PropertyOptions = getPropertiesFilter?.data || [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenProp(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchParams = useSearchParams();
  const serviceid = searchParams.get('serviceid');

  useEffect(() => {
    if (serviceid && PropertyOptions.length > 0 && !selectedPropertyId) {
      const prop = PropertyOptions.find((p) => p.id == serviceid);
      if (prop) {
        setSelectedPropertyId(prop.id);
        setSelectedPropertyTitle(prop.title);
      }
    }
  }, [serviceid, PropertyOptions, selectedPropertyId]);

  // ── Options ───────────────────────────────────────────────
  const allStatusValues = ['confirmed', 'completed', 'pending', 'checked_in', 'not_attend', 'canceled'];
  const isAllSelected = allStatusValues.every(v => selectedStatuses.includes(v)) && selectedStatuses.length > 0;

  const statusOptions = [
    { id: 0, name: t('All'),        value: 'all' },
    { id: 1, name: t('Acceptable'), value: 'confirmed' },
    { id: 2, name: t('Complete'),   value: 'completed' },
    { id: 3, name: t('Pending'),    value: 'pending' },
    { id: 4, name: t('checked_in'), value: 'checked_in' },
    { id: 5, name: t('not_attend'), value: 'not_attend' },
    { id: 6, name: t('cancelled'),  value: 'canceled' },
  ];

  const dateRangeOptions = [
    { id: 0, name: t('Today is arrival'), value: 'today' },
    { id: 1, name: t('coming'),           value: 'coming' },
    { id: 2, name: t('this week'),        value: 'week' },
    { id: 3, name: t('This month'),       value: 'month' },
  ];

  const paymentOptions = [
    { id: 1, name: t('Paid'),            value: 'paid' },
    { id: 3, name: t('Payment Pending'), value: 'pending' },
    { id: 4, name: t('refunded'),        value: 'refunded' },
  ];

  const datePickerSx = {
    '& .MuiInputBase-input': { paddingLeft: '12px', textAlign: 'right' },
    '& .MuiOutlinedInput-root': { borderRadius: '10px' },
  };

  // ── Apply ─────────────────────────────────────────────────
  const handleApply = () => {
    const filters = {
      status: selectedStatuses,
      date_range: selectedDateRange || "",
      check_in_from:  checkInFrom  ? checkInFrom.format("YYYY-MM-DD")  : "",
      check_in_to:    checkInTo    ? checkInTo.format("YYYY-MM-DD")    : "",
      check_out_from: checkOutFrom ? checkOutFrom.format("YYYY-MM-DD") : "",
      check_out_to:   checkOutTo   ? checkOutTo.format("YYYY-MM-DD")   : "",
      min_price:      minPrice || "",
      max_price:      maxPrice || "",
      property_id:    selectedPropertyId || undefined,
      payment_status: selectedPayment || "",
    };
    onApplyFilters(filters);
  };

  // ── Reset ─────────────────────────────────────────────────
  const handleReset = () => {
    setSelectedStatuses([]);
    setSelectedDateRange(null);
    setCheckInFrom(null);
    setCheckInTo(null);
    setCheckOutFrom(null);
    setCheckOutTo(null);
    setSelectedPropertyId(null);
    setSelectedPropertyTitle("");
    setSelectedPayment(null);
    setMinPrice("");
    setMaxPrice("");
    onApplyFilters({});
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* Header */}
      <section className="flex justify-between px-6 mt-6">
        <button
          onClick={handleClose}
          className="modal-close"
          aria-label={t('cancel')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
        <div className="w-11 h-11 bg-[#FEF0C7] rounded-full flex items-center justify-center">
          <img src="/images/icons/FilterGreyicon.svg" alt="" className="w-6 h-6" />
        </div>
      </section>

      <section className="mt-8 px-6">
        <p className="text-[#364152] text-lg font-bold">{t("Filter items")}</p>
        <p className="text-[#697586] text-sm mt-1 mb-5">{t("Filter your orders")}</p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      {/* Booking Status */}
      <section className="px-6 mt-4">
        <p className="text-[#364152] text-sm font-medium mb-2">{t('Booking status')}</p>
        <div className="flex gap-3 flex-wrap">
          {statusOptions.map((item) => {
            const isAll = item.value === 'all';
            const isActive = isAll ? isAllSelected : selectedStatuses.includes(item.value);
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isAll) {
                    setSelectedStatuses(isAllSelected ? [] : [...allStatusValues]);
                  } else {
                    setSelectedStatuses(prev =>
                      prev.includes(item.value)
                        ? prev.filter(v => v !== item.value)
                        : [...prev, item.value]
                    );
                  }
                }}
                className={`h-10 px-4 rounded-full border text-sm font-medium cursor-pointer transition ${
                  isActive
                    ? "border-[#C69815] text-[#C69815] bg-[#FEF0C7]"
                    : "border-[#E3E8EF] text-[#697586]"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Date Range */}
      <section className="px-6">
        <p className="text-[#364152] text-sm font-medium mb-2">{t('Date range')}</p>
        <div className="flex gap-3 flex-wrap">
          {dateRangeOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedDateRange(prev => prev === item.value ? null : item.value)}
              className={`h-10 px-4 rounded-full border text-sm font-medium cursor-pointer transition ${
                selectedDateRange === item.value
                  ? "border-[#C69815] text-[#C69815] bg-[#FEF0C7]"
                  : "border-[#E3E8EF] text-[#697586]"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Check-in date */}
      <section className="px-6">
        <p className="text-[#364152] text-sm font-medium mb-2">{t('Check-in date')}</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[#697586] text-sm font-normal mb-1.5">{t('From date')}</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={checkInFrom}
                onChange={setCheckInFrom}
                format="DD/MM/YYYY"
                slotProps={{ textField: { placeholder: "00/00/0000", fullWidth: true, sx: datePickerSx } }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <p className="text-[#697586] text-sm font-normal mb-1.5">{t('To date')}</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={checkInTo}
                onChange={setCheckInTo}
                format="DD/MM/YYYY"
                slotProps={{ textField: { placeholder: "00/00/0000", fullWidth: true, sx: datePickerSx } }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Check-out date */}
      <section className="px-6">
        <p className="text-[#364152] text-sm font-medium mb-2">{t('Check-out date')}</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[#697586] text-sm font-normal mb-1.5">{t('From date')}</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={checkOutFrom}
                onChange={setCheckOutFrom}
                format="DD/MM/YYYY"
                slotProps={{ textField: { placeholder: "00/00/0000", fullWidth: true, sx: datePickerSx } }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <p className="text-[#697586] text-sm font-normal mb-1.5">{t('To date')}</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={checkOutTo}
                onChange={setCheckOutTo}
                format="DD/MM/YYYY"
                slotProps={{ textField: { placeholder: "00/00/0000", fullWidth: true, sx: datePickerSx } }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Property */}
      <section className="px-6">
        <label className="text-[#364152] text-sm font-medium mb-2 block">{t("Property")}</label>
        <div className="relative w-full" ref={dropdownRef}>
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => setOpenProp(!openProp)}
          >
            <input
              type="text"
              placeholder={t("Select property")}
              value={selectedPropertyTitle || searchValue}
              onChange={(e) => { setSearchValue(e.target.value); setOpenProp(true); setSelectedPropertyId(null); setSelectedPropertyTitle(""); }}
              className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
            />
            <span className="absolute end-3 pointer-events-none">
              <img src={openProp ? "/images/icons/ArrowUp.svg" : "/images/icons/ArrowDown.svg"} alt="" />
            </span>
          </div>
          {openProp && (
            <ul className="absolute inset-inline-0 z-20 mt-1.5 max-h-52 overflow-y-auto rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_8px_28px_rgb(15_23_42_/_0.12)] p-1.5">
              {PropertyOptions
                .filter((opt) => opt?.title?.toLowerCase().includes(searchValue.toLowerCase()))
                .map((opt) => (
                  <li
                    key={opt.id}
                    onClick={() => { setSelectedPropertyId(opt.id); setSelectedPropertyTitle(opt.title); setOpenProp(false); setSearchValue(""); }}
                    className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                  >
                    {opt.title}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Payment Status */}
      <section className="px-6">
        <p className="text-[#364152] text-sm font-medium mb-2">{t('Payment status')}</p>
        <div className="flex gap-3 flex-wrap">
          {paymentOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedPayment(prev => prev === item.value ? null : item.value)}
              className={`h-10 px-4 rounded-full border text-sm font-medium cursor-pointer transition ${
                selectedPayment === item.value
                  ? "border-[#C69815] text-[#C69815] bg-[#FEF0C7]"
                  : "border-[#E3E8EF] text-[#697586]"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Booking Amount */}
      <section className="px-6">
        <p className="text-[#364152] text-sm font-medium mb-2">{t('Booking amount')}</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[#697586] text-sm font-normal">{t('minimum')}</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0 جنيه"
              className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#697586] text-sm font-normal">{t('maximum')}</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="0 جنيه"
              className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
            />
          </div>
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Actions */}
      <div className="modal-footer">
        <button
          onClick={handleApply}
          className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold"
        >
          {t('apply')}
        </button>
        <button
          onClick={handleReset}
          className="btn-ghost flex-1"
        >
          {t('cancel')}
        </button>
      </div>
    </Dialog>
  );
}

function FiltersPage(props) {
  return (
    <Suspense fallback={null}>
      <FiltersPageContent {...props} />
    </Suspense>
  );
}

export default FiltersPage;



