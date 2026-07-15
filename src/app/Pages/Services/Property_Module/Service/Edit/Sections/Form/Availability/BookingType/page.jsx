"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function BookingTypePage({ formData, setFormData }) {
  const { t } = useTranslation()

  const inputClassName = "w-5 h-5 appearance-none border rounded-full border-[#CDD5DF] bg-white checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-xs"

  const days = [
    t("Saturday"), t("Sunday"), t("Monday"), t("Tuesday"),
    t("Wednesday"), t("Thursday"), t("Friday"),
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  const [bannedDates, setBannedDates]     = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const [selectAllActive, setSelectAllActive] = useState(false);
  const [banAllActive, setBanAllActive]       = useState(false);
  const [activeMode, setActiveMode] = useState('available');

  const selectedPolicy = formData?.availability?.all_avalable ? '2' : '1';

  const setSelectedPolicy = (value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        all_avalable: value === '2',
      }
    }));
  };

  useEffect(() => {
  
  const slots = formData?.availability?.slots || [];
  if (!slots.length) return;

    const getDatesInRange = (startDate, endDate) => {
      const dates = [];
      let current = new Date(startDate);
      const end = new Date(endDate);
      current.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      while (current <= end) {
        const yyyy = current.getFullYear();
        const mm   = String(current.getMonth() + 1).padStart(2, '0');
        const dd   = String(current.getDate()).padStart(2, '0');
        dates.push(`${yyyy}-${mm}-${dd}`);
        current.setDate(current.getDate() + 1);
      }
      return dates;
    };

    const initSelected = new Set();
    const initBanned   = new Set();
    const initReserved = new Set();

    slots.forEach(item => {
      if (!item.from || !item.to) return;
      const datesInRange = getDatesInRange(item.from, item.to);
      datesInRange.forEach(date => {
        if (item.status === 'available') initSelected.add(date);
        else if (item.status === 'blocked')   initBanned.add(date);
        else if (item.status === 'reserved')  initReserved.add(date);
      });
    });

    setSelectedDates(Array.from(initSelected));
    setBannedDates(Array.from(initBanned));
    setReservedDates(Array.from(initReserved));
  }, [formData?.availability?.slots]);


  const datesToRanges = (dates, status) => {
    if (!dates.length) return [];
    const sorted = [...dates].sort(); // sort ascending
    const ranges = [];
    let rangeStart = sorted[0];
    let rangeEnd   = sorted[0];

    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(rangeEnd);
      const curr = new Date(sorted[i]);
      prev.setDate(prev.getDate() + 1); // expected next day

      if (prev.toISOString().slice(0, 10) === sorted[i]) {
        rangeEnd = sorted[i];
      } else {
        ranges.push({ from: rangeStart, to: rangeEnd, status });
        rangeStart = sorted[i];
        rangeEnd   = sorted[i];
      }
    }
    ranges.push({ from: rangeStart, to: rangeEnd, status });
    return ranges;
  };

  const buildSlots = (selected, banned, reserved) => [
    ...datesToRanges(selected, 'available'),
    ...datesToRanges(banned,   'blocked'),
    ...datesToRanges(reserved, 'reserved'),
  ];

  const syncToFormData = (newSelected, newBanned, newReserved) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        slots: buildSlots(newSelected, newBanned, newReserved),
      },
    }));
  };

  // ─── Calendar helpers ─────────────────────────────────────────────────────
  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay    = new Date(year, month, 1).getDay();
  const startDay    = (firstDay + 1) % 7;

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) calendarDays.push("");
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const toggleDateSelection = (day) => {
    if (!day) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    let newSelected  = [...selectedDates];
    let newBanned    = [...bannedDates];
    let newReserved  = [...reservedDates];

    if (activeMode === 'available') {
      if (newSelected.includes(dateStr)) {
        newSelected = newSelected.filter(d => d !== dateStr);
      } else {
        newSelected = [...newSelected, dateStr];
        newBanned   = newBanned.filter(d => d !== dateStr);
        newReserved = newReserved.filter(d => d !== dateStr);
      }
    } else if (activeMode === 'blocked') {
      if (newBanned.includes(dateStr)) {
        newBanned = newBanned.filter(d => d !== dateStr);
      } else {
        newBanned   = [...newBanned, dateStr];
        newSelected = newSelected.filter(d => d !== dateStr);
        newReserved = newReserved.filter(d => d !== dateStr);
      }
    } else if (activeMode === 'reserved') {
      if (newReserved.includes(dateStr)) {
        newReserved = newReserved.filter(d => d !== dateStr);
      } else {
        newReserved = [...newReserved, dateStr];
        newSelected = newSelected.filter(d => d !== dateStr);
        newBanned   = newBanned.filter(d => d !== dateStr);
      }
    }

    setSelectedDates(newSelected);
    setBannedDates(newBanned);
    setReservedDates(newReserved);
    syncToFormData(newSelected, newBanned, newReserved);
  };

  const handleSelectAll = () => {
    const allDays = [];
    for (let i = 1; i <= daysInMonth; i++)
      allDays.push(`${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`);

    const newSelected = Array.from(new Set([...selectedDates, ...allDays]));
    const newBanned   = bannedDates.filter(d => !allDays.includes(d));
    const newReserved = reservedDates.filter(d => !allDays.includes(d));

    setSelectedDates(newSelected);
    setBannedDates(newBanned);
    setReservedDates(newReserved);
    syncToFormData(newSelected, newBanned, newReserved);
    setSelectAllActive(true);
    setBanAllActive(false);
  };

  const handleBanAll = () => {
    const allDays = [];
    for (let i = 1; i <= daysInMonth; i++)
      allDays.push(`${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`);

    const newBanned   = Array.from(new Set([...bannedDates, ...allDays]));
    const newSelected = selectedDates.filter(d => !allDays.includes(d));
    const newReserved = reservedDates.filter(d => !allDays.includes(d));

    setBannedDates(newBanned);
    setSelectedDates(newSelected);
    setReservedDates(newReserved);
    syncToFormData(newSelected, newBanned, newReserved);
    setBanAllActive(true);
    setSelectAllActive(false);
  };

  function Legend({ color, label, onClick, isActive }) {
    return (
      <div
        className={`flex items-center gap-2 border px-3 py-2 rounded cursor-pointer transition-all ${isActive ? 'border-[var(--color-primary)] bg-[#F8FAFC] shadow-sm' : 'border-[#E3E8EF]'}`}
        onClick={onClick}
      >
        <span className={`w-4 h-4 ${color} rounded`}></span>
        {label}
      </div>
    );
  }

  return (
    <>
      {/* Booking type */}
      <div className='border border-[#E3E8EF] p-3 rounded-[6px]'>
        <div className='flex gap-2'>
          <img src="/images/icons/web-validation_blue.svg" alt="" />
          <p className='text-[#364152] text-lg font-medium'>{t('Booking type')}</p>
        </div>

        <div className='grid grid-cols-2 gap-4 mt-4'>
          {/* Available on specified dates */}
          <div
            className={`border flex justify-between p-3 cursor-pointer rounded-[6px] ${selectedPolicy === '1' ? 'border-[var(--color-primary)]' : 'border-[#E3E8EF]'}`}
            onClick={() => setSelectedPolicy('1')}
          >
            <div>
              <div className='flex gap-2'>
                <input
                  type="radio" value="1"
                  checked={selectedPolicy === '1'}
                  onChange={() => setSelectedPolicy('1')}
                  className={inputClassName}
                />
                <p className='text-[#364152] text-base font-medium'>{t('Available on specified dates')}</p>
              </div>
              <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('Choose specific dates when the property is available.')}</p>
            </div>
            <button className='flex items-start'>
              <img src="/images/icons/calendar-yellow.svg" className="w-6 h-6" />
            </button>
          </div>

          {/* Always available */}
          <div
            className={`border flex justify-between p-3 cursor-pointer rounded-[6px] ${selectedPolicy === '2' ? 'border-[var(--color-primary)]' : 'border-[#E3E8EF]'}`}
            onClick={() => setSelectedPolicy('2')}
          >
            <div>
              <div className='flex gap-2'>
                <input
                  type="radio" value="2"
                  checked={selectedPolicy === '2'}
                  onChange={() => setSelectedPolicy('2')}
                  className={inputClassName}
                />
                <p className='text-[#364152] text-base font-medium'>{t('Always available')}</p>
              </div>
              <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('Your property is available for booking this year - tour')}</p>
            </div>
            <button className='flex items-start'>
              <img src="/images/icons/web-validation_blue.svg" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className='flex gap-6 w-full border border-[#E3E8EF] mt-4 p-4 rounded-[6px]'>
        {/* Right section – calendar */}
        <div className='w-[70%] mt-4 bg-white rounded-[6px]'>
          <div className='flex justify-between mb-4 w-full'>
            <div className='flex items-center gap-2 w-[70%]'>
              <img src="/images/icons/appointment-blue.svg" className="w-6 h-6" />
              <p className='text-[#364152] text-base font-medium'>{t('Quick procedures')}</p>
            </div>

            <div className="flex justify-between items-center w-[30%] rounded">
              <button onClick={prevMonth} className="text-[#364152] font-bold px-2 py-1 hover:bg-[#E3E8EF] rounded">{"<"}</button>
              <h2 className="font-medium text-base text-[#364152]">
                {currentDate.toLocaleString("ar-EG", { month: "long", year: "numeric" })}
              </h2>
              <button onClick={nextMonth} className="text-[#364152] font-bold px-2 py-1 hover:bg-[#E3E8EF] rounded">{">"}</button>
            </div>
          </div>

          <div className="bg-[#F8FAFC] p-6 border border-[#E3E8EF] rounded">
            <div className="grid grid-cols-7 text-center text-sm font-medium text-[#364152] mb-2">
              {days.map((day, i) => <div key={i}>{day}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, i) => {
                const dateStr = day
                  ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                  : null;
                const isSelected = dateStr && selectedDates.includes(dateStr);
                const isBanned   = dateStr && bannedDates.includes(dateStr);
                const isReserved = dateStr && reservedDates.includes(dateStr);

                return (
                  <div
                    key={i}
                    className={`h-10 flex items-center justify-center rounded text-sm transition-colors
                      ${day ? "cursor-pointer hover:bg-[#EEF2F6] text-[#364152]" : ""}
                      ${isSelected ? "!bg-[#17B26A] !text-white" : ""}
                      ${isBanned   ? "!bg-[#F04438] !text-white" : ""}
                      ${isReserved ? "!bg-[var(--color-primary)] !text-white" : ""}`}
                    onClick={() => toggleDateSelection(day)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-6 text-sm">
            <Legend color="bg-[#17B26A]"               label={t("Available")} onClick={() => setActiveMode('available')} isActive={activeMode === 'available'} />
            <Legend color="bg-[#F04438]"               label={t("Forbidden")} onClick={() => setActiveMode('blocked')}   isActive={activeMode === 'blocked'} />
            <Legend color="bg-[var(--color-primary)]"  label={t("reserved")}  onClick={() => setActiveMode('reserved')}  isActive={activeMode === 'reserved'} />
          </div>
        </div>

        {/* Left section – quick actions */}
        <div className='w-[30%]'>
          <div className='border border-[#E3E8EF] p-4 mt-4 bg-white rounded-[6px]'>
            <div className='flex gap-2'>
              <img src="/images/icons/save-money-dollar_blue.svg" alt="" />
              <p className='text-[#364152] text-base font-medium'>{t('Quick procedures')}</p>
            </div>

            <button
              onClick={handleSelectAll}
              className={`border rounded-[6px] ${selectAllActive ? 'border-[#17B26A]' : 'border-[#E3E8EF]'} flex flex-col items-center gap-2 mt-5 w-full p-4 cursor-pointer`}
            >
              <img src="/images/icons/calendar-add-green.svg" className="w-7 h-7 mb-2" />
              <p className='text-[#364152] text-base font-normal'>{t('Select all')}</p>
              <p className='text-[#697586] text-sm font-normal'>{t('This month')}</p>
            </button>

            <button
              onClick={handleBanAll}
              className={`border rounded-[6px] ${banAllActive ? 'border-[#F04438]' : 'border-[#E3E8EF]'} flex flex-col items-center gap-2 mt-4 w-full p-4 cursor-pointer`}
            >
              <img src="/images/icons/calendar-remove-red.svg" className="w-7 h-7 mb-2" />
              <p className='text-[#364152] text-base font-normal'>{t('Ban all')}</p>
              <p className='text-[#697586] text-sm font-normal'>{t('This month')}</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingTypePage


