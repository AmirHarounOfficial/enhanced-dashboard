"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function BookingTypePage({formData, setFormData, fieldErrors, setFieldErrors}) {
  const {t} = useTranslation()
  const [selectedPolicy, setSelectedPolicy] = useState('')

  const inputClassName = "w-5 h-5 appearance-none border rounded-full  border-[#CDD5DF] bg-white  checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex  checked:after:items-center checked:after:justify-center checked:after:text-xs"  

  const days = [
    t("Saturday"),
    t("Sunday"),
    t("Monday"),
    t("Tuesday"),
    t("Wednesday"),
    t("Thursday"),
    t("Friday"),
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  const [bannedDates, setBannedDates] = useState([]);
  const [selectAllActive, setSelectAllActive] = useState(false);
  const [banAllActive, setBanAllActive] = useState(false);
  const [status, setStatus] = useState('available');
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startDay = (firstDay + 1) % 7;

  const calendarDays = [];

  for (let i = 0; i < startDay; i++) {
    calendarDays.push("");
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const toggleDateSelection = (day) => {
    if (!day) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    
    if (status === 'available') {
      if (selectedDates.includes(dateStr)) {
        setSelectedDates(selectedDates.filter(d => d !== dateStr));
      } else {
        setBannedDates(bannedDates.filter(d => d !== dateStr));
        setSelectedDates([...selectedDates, dateStr]);
      }
    } else if (status === 'blocked') {
      if (bannedDates.includes(dateStr)) {
        setBannedDates(bannedDates.filter(d => d !== dateStr));
      } else {
        setSelectedDates(selectedDates.filter(d => d !== dateStr));
        setBannedDates([...bannedDates, dateStr]);
      }
    }
  };

  const handleSelectAll = () => {
    const allDaysInMonth = [];
    for (let i = 1; i <= daysInMonth; i++) {
      allDaysInMonth.push(`${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`);
    }
    const newSelected = new Set([...selectedDates, ...allDaysInMonth]);
    setSelectedDates(Array.from(newSelected));
    setBannedDates(bannedDates.filter(d => !allDaysInMonth.includes(d)));
    setSelectAllActive(true);
    setBanAllActive(false);
  };
  const handleBanAll = () => {
    const allDaysInMonth = [];
    for (let i = 1; i <= daysInMonth; i++) {
      allDaysInMonth.push(`${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`);
    }
    const newBanned = new Set([...bannedDates, ...allDaysInMonth]);
    setBannedDates(Array.from(newBanned));
    setSelectedDates(selectedDates.filter(d => !allDaysInMonth.includes(d)));
    setBanAllActive(true);
    setSelectAllActive(false);
  };

// في BookingTypePage — عدّل الـ useEffect
useEffect(() => {
  const toSlots = (dates, status) => {
    if (dates.length === 0) return [];
    const sorted = [...dates].sort();
    const slots = [];
    let start = sorted[0];
    let end = sorted[0];

    for (let i = 1; i < sorted.length; i++) {
      // استخدم string comparison بدل Date objects
      const prevDate = new Date(end + 'T00:00:00');
      const currDate = new Date(sorted[i] + 'T00:00:00');
      const diff = (currDate - prevDate) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        end = sorted[i];
      } else {
        slots.push({ from: start, to: end, status });
        start = sorted[i];
        end = sorted[i];
      }
    }
    slots.push({ from: start, to: end, status });
    return slots;
  };

  const slots = [
    ...toSlots(selectedDates, 'available'),
    ...toSlots(bannedDates, 'blocked'),
  ];

  setFormData(prev => ({
    ...prev,
    availability: {
      all_avalable: selectedPolicy === '2',
      slots
    }
  }));

}, [selectedDates, bannedDates, selectedPolicy]);
  function Legend({ color, label, onClick, active }) {
  return (
    <div 
      className={`flex items-center gap-2 border ${active ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' : 'border-[#E3E8EF]'} px-3 py-2 rounded ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <span className={`w-4 h-4 ${color} rounded`}></span>
      {label}
    </div>
  );
  }
  return (
    <>
      {/* booking type  */}
      <div className='border border-[#E3E8EF] p-3  rounded-[6px]'>

        {/* tittle */}
        <div className='flex gap-2'>
          <img src="/images/icons/web-validation_blue.svg" alt="" />
          <p className='text-[#364152] text-lg font-medium'>{t('Booking type')}</p>
        </div>

        <div className='grid grid-cols-2 gap-4 mt-4'>

          {/*Available on specified dates  */}
          <div 
            className={`border flex justify-between  p-3 cursor-pointer rounded-[6px] ${
              selectedPolicy === '1' 
                ? 'border-[var(--color-primary)]' 
                : fieldErrors?.booking_type 
                  ? 'border-[#F04438]' 
                  : 'border-[#E3E8EF]'
            }`}
            onClick={() => {
              setSelectedPolicy('1');
              if (setFieldErrors) setFieldErrors(prev => ({...prev, booking_type: false}));
            }}
          >
            <div>
              <div className='flex gap-2'>
                  <input 
                    type="radio"
                    value="1"
                    checked={selectedPolicy === '1'}
                    onChange={(e) => setSelectedPolicy(e.target.value)}
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

          {/*Always available  */}
          <div 
            className={`border flex justify-between p-3 cursor-pointer rounded-[6px] ${
              selectedPolicy === '2' 
                ? 'border-[var(--color-primary)]' 
                : fieldErrors?.booking_type 
                  ? 'border-[#F04438]' 
                  : 'border-[#E3E8EF]'
            }`}
            onClick={() => {
              setSelectedPolicy('2');
              if (setFieldErrors) setFieldErrors(prev => ({...prev, booking_type: false}));
            }}
          >
            <div>
              <div className='flex gap-2'>
                  <input 
                    type="radio"
                    value="2"
                    checked={selectedPolicy === '2'}
                    onChange={(e) => setSelectedPolicy(e.target.value)}
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

      {/* calendar */}
      <div className='flex gap-6 w-full border border-[#E3E8EF] mt-4 p-4 rounded-[6px]'> 
        {/* right section */}
        <div className=' w-[70%]  mt-4 bg-white rounded-[6px]'>
        {/* Header */}
        <div className='flex justify-between mb-4 w-full'>
          {/* tittle */}
          <div className='flex items-center gap-2 w-[70%]'>
            <img src="/images/icons/appointment-blue.svg" className="w-6 h-6" />
            <p className='text-[#364152] text-base font-medium'>{t('Quick procedures')}</p>
          </div>

          <div className="flex justify-between items-center w-[30%]  rounded">
            <button onClick={prevMonth} className="text-[#364152] font-bold px-2 py-1 hover:bg-[#E3E8EF] rounded">{"<"}</button>

            <h2 className="font-medium text-base text-[#364152]">
              {currentDate.toLocaleString("ar-EG", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <button onClick={nextMonth} className="text-[#364152] font-bold px-2 py-1 hover:bg-[#E3E8EF] rounded">{">"}</button>
          </div>
        </div>
        

        {/* Calendar Grid */}
        <div className="bg-[#F8FAFC] p-6 border border-[#E3E8EF] rounded">
          {/* Days */}
          <div className="grid grid-cols-7 text-center text-sm font-medium text-[#364152] mb-2">
            {days.map((day, i) => (
              <div key={i}>{day}</div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, i) => {
              const dateStr = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : null;
              const isSelected = dateStr && selectedDates.includes(dateStr);
              const isBanned = dateStr && bannedDates.includes(dateStr);
              
              return (
                <div
                  key={i}
                  className={`h-10 flex items-center justify-center rounded text-sm transition-colors
                  ${day ? "cursor-pointer hover:bg-[#EEF2F6]  text-[#364152]" : ""}
                  ${isSelected ? "!bg-[#17B26A] !text-white !border-[#17B26A]" : ""}
                  ${isBanned ? "!bg-[#F04438] !text-white !border-[#F04438]" : ""}`}
                  onClick={() => toggleDateSelection(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <Legend color="bg-[#17B26A]" label={t("Available")} onClick={() => setStatus('available')} active={status === 'available'} />
          <Legend color="bg-[#F04438]" label={t("Forbidden")} onClick={() => setStatus('blocked')} active={status === 'blocked'} />
          <Legend color="bg-[#E3E8EF]" label={t("Not available")}
          />
        </div>
        
        </div>


        {/* left section */}
        <div className='w-[30%]'>
          <div className='border border-[#E3E8EF]  p-4 mt-4 bg-white rounded-[6px]'>
          {/* tittle */}
          <div className='flex gap-2'>
            <img src="/images/icons/save-money-dollar_blue.svg" alt="" />
            <p className='text-[#364152] text-base font-medium'>{t('Quick procedures')}</p>
          </div>  

          {/* select all  */}
          <button onClick={handleSelectAll} className={`border rounded-[6px] ${selectAllActive ? 'border-[green]' : 'border-[#E3E8EF]'} flex flex-col items-center gap-2 mt-5 w-full p-4 cursor-pointer`}
            >
              <img src="/images/icons/calendar-add-green.svg" className="w-7 h-7 mb-2 " />
              <p className='text-[#364152] text-base font-normal'>{t('Select all')}</p>
              <p className='text-[#697586] text-sm font-normal'>{t('This month')}</p>
            </button>

            {/* Ban all  */}
            <button onClick={handleBanAll} className={`border rounded-[6px] ${banAllActive ? 'border-[red]' : 'border-[#E3E8EF]'} flex flex-col items-center gap-2 mt-4 w-full p-4 cursor-pointer`}
            >
              <img src="/images/icons/calendar-remove-red.svg" className="w-7 h-7 mb-2 " />
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

