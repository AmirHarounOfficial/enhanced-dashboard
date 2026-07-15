"use client"
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

function SchedulePage({ handleNext, handlePrev, formData, handleChange, service }) {
  const { t } = useTranslation();

  //************* */ DAYS ************///
  //------------------------------------
    const days = [
    { id: 1, name: "Sunday" },
    { id: 2, name: "Monday" },
    { id: 3, name: "Tuesday" },
    { id: 4, name: "Wednesday" },
    { id: 5, name: "Thursday" },
    { id: 6, name: "Friday" },
    { id: 7, name: "Saturday" },
  ];

  const [selectedDays, setSelectedDays] = useState([days[0].id]);
  const [allDays, setAllDays] = useState(false);

  const handleAllDaysChange = (e) => {
    const checked = e.target.checked;
    setAllDays(checked);
    if (checked) {
      setSelectedDays(days.map((d) => d.id));
    } else {
      setSelectedDays([]);
    }
  };

  const handleDayToggle = (dayId) => {
    setSelectedDays((prev) => {
      const isSelected = prev.includes(dayId);
      let updated;
      if (isSelected) {
        updated = prev.filter((id) => id !== dayId);
      } else {
        updated = [...prev, dayId];
      }
      
      // Update All Days checkbox status
      setAllDays(updated.length === days.length);
      return updated;
    });
  };

  //************* */ TIME ************///
  //------------------------------------
  
  const [currentPeriod, setCurrentPeriod] = useState({ from: null, to: null });
  const [savedPeriods, setSavedPeriods] = useState(() => {
    // Initialize from existing service data if available
    const initial = {};
    if (service?.days && service.days.length > 0) {
      service.days.forEach(dayInfo => {
        const day = days.find(d => d.name.toLowerCase() === dayInfo.day.toLowerCase());
        if (day && dayInfo.times) {
          initial[day.id] = dayInfo.times.map(t => ({
            id: Math.random(),
            from: dayjs(t.from, 'HH:mm'),
            to: dayjs(t.to, 'HH:mm')
          }));
        }
      });
    }
    return initial;
  });

  // Sync savedPeriods with parent formData whenever it changes
  React.useEffect(() => {
    if (savedPeriods && Object.keys(savedPeriods).length > 0) {
      const formattedDays = days
        .map(day => {
          const dayPeriods = savedPeriods[day.id];
          if (!dayPeriods || dayPeriods.length === 0) return null;
          
          return {
            day: day.name.toLowerCase(), // Backend expects lowercase day names
            times: dayPeriods.map(p => ({
              from: p.from?.format('HH:mm'), // 24-hour format
              to: p.to?.format('HH:mm')      // 24-hour format
            }))
          };
        })
        .filter(Boolean);

      handleChange('days', formattedDays);
    } else {
      // Clear days if no periods
      handleChange('days', []);
    }
  }, [savedPeriods]);

  const addPeriod = () => {
    if (!currentPeriod.from || !currentPeriod.to || selectedDays.length === 0) return;

    const newSavedPeriods = { ...savedPeriods };
    selectedDays.forEach((dayId) => {
      if (!newSavedPeriods[dayId]) newSavedPeriods[dayId] = [];
      
      const isDuplicate = newSavedPeriods[dayId].some(p => 
        p.from.isSame(currentPeriod.from, 'minute') && 
        p.to.isSame(currentPeriod.to, 'minute')
      );

      if (!isDuplicate) {
        newSavedPeriods[dayId].push({
          id: Date.now() + Math.random(),
          ...currentPeriod,
        });
      }
    });
    setSavedPeriods(newSavedPeriods);
  };

  const removeSavedPeriod = (dayId, periodId) => {
    const updated = { ...savedPeriods };
    updated[dayId] = updated[dayId].filter((p) => p.id !== periodId);
    if (updated[dayId].length === 0) delete updated[dayId];
    setSavedPeriods(updated);
  };

  const [allTime, setAllTime] = useState(false);
  const handleAllTimeChange = (e) => {
    const checked = e.target.checked;
    setAllTime(checked);
    if (checked) {
      const startTime = dayjs().hour(0).minute(0).second(0);
      const endTime = dayjs().hour(23).minute(59).second(0);
      setCurrentPeriod({ from: startTime, to: endTime });
    } else {
      setCurrentPeriod({ from: null, to: null });
    }
  };

  return (
    <>
      {/* Days Section */}
      <section className="mb-12">
        <div className="flex justify-between mb-6">
          <p className="text-[#4B5565] text-base font-medium">{t("days")}</p>
          <div className="flex gap-2 items-center">
            <input 
              type="checkbox" 
              className="w-6 h-6 border border-[#E3E8EF]" 
              checked={allDays}
              onChange={handleAllDaysChange}
            />
            <p className="text-[#4B5565] text-base font-normal">{t("All days")}</p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-5 w-full ">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => handleDayToggle(day.id)}
              className={`w-full h-11  border rounded-[6px] shadow-xs transition text-base font-normal ${
                selectedDays.includes(day.id) 
                  ? "border-[var(--color-primary)] bg-[#F9F5E8] text-[var(--color-primary)]" 
                  : "border-[#E3E8EF] text-[#9AA4B2]"
              }`}
            >
              {t(day.name)}
            </button>
          ))}
        </div>
        
      </section>

      {/* Time Section */}
      <section>
        <div className="flex justify-between mb-6">
          <p className="text-[#4B5565] text-base font-medium">{t("the time")}</p>
          <div className="flex gap-2 items-center">
            <input 
              type="checkbox" 
              className="w-6 h-6 border border-[#E3E8EF]" 
              checked={allTime}
              onChange={handleAllTimeChange}
            />
            <p className="text-[#4B5565] text-base font-normal">{t("All the time")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* From Time */}
          <div className="flex flex-col">
            <div className="flex gap-6">
              <label className="flex items-center text-[#4B5565] text-xl font-normal whitespace-nowrap">
                {t("From")}
              </label>
              <div className="p-4 w-full">
                <LocalizationProvider
                  localeText={{
                    timePickerToolbarTitle: t('Select Time'),
                  }}
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ar"
                >
                  <MobileTimePicker
                    value={currentPeriod.from}
                    onChange={(newValue) => setCurrentPeriod({ ...currentPeriod, from: newValue })}
                    ampm={true}
                    views={["hours", "minutes"]}
                    closeOnSelect={true}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          sx: {
                            direction: "rtl",
                            justifyContent: "space-between",
                            "& input": {
                              textAlign: "left",
                              paddingRight: "8px",
                            },
                            "& .MuiInputAdornment-root": {
                              order: -1,
                              marginLeft: "12px",
                            },
                          },
                        },
                      },
                      mobilePaper: {
                        sx: {
                          direction: "ltr",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          {/* To Time */}
          <div className="flex flex-col">
            <div className="flex gap-6">
              <label className="flex items-center text-[#4B5565] text-xl font-normal whitespace-nowrap">
                {t("To")}
              </label>
              <div className="p-4 w-full">
                <LocalizationProvider
                  localeText={{
                    timePickerToolbarTitle: t('Select Time'),
                  }}
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ar"
                >
                  <MobileTimePicker
                    value={currentPeriod.to}
                    onChange={(newValue) => setCurrentPeriod({ ...currentPeriod, to: newValue })}
                    ampm={true}
                    views={["hours", "minutes"]}
                    closeOnSelect
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          sx: {
                            direction: "rtl",
                            justifyContent: "space-between",
                            "& input": {
                              textAlign: "left",
                              paddingRight: "8px",
                            },
                            "& .MuiInputAdornment-root": {
                              order: -1,
                              marginLeft: "12px",
                            },
                          },
                        },
                      },
                      mobilePaper: {
                        sx: {
                          direction: "ltr",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>

      
      </section>

      {/* Added Periods btn */}
      <div className="flex justify-end mt-6">
        <button
          onClick={addPeriod}
          className="flex items-center justify-center border border-[var(--color-primary)] rounded-[6px] w-[197px] h-14 cursor-pointer"
        >
          <img src="/images/icons/AddYellowIcon.svg" alt=""  className="w-6 h-6" />
          <p className="text-[var(--color-primary)] text-base font-medium ">
            {t("Add period")}
          </p>
        </button>
      </div>

      {/* Added Periods List */}
      <section className="mt-12 bg-white rounded-[6px]">
        <p className="text-[#364152] text-base font-semibold mb-6">{t("Added periods")}</p>
        
        <div className="flex flex-col gap-6">
          {Object.keys(savedPeriods).length === 0 ? (
            <div className="flex flex-col  py-3 border  border-[#FEC84B] rounded-[6px] bg-[#FEF0C7]">
              <p className="text-[#4E4E4E] text-sm font-medium px-4">
                {t("No period has been added yet. Click “Add period” to begin.")}
              </p>
            </div>
          ) : (
            days.map((day) => {
              const dayPeriods = savedPeriods[day.id];
              if (!dayPeriods || dayPeriods.length === 0) return null;

              return (
                <div key={day.id} className="border border-[#E3E8EF] shadow-sm rounded-[6px] p-4">
                  <div className="flex justify-start  mb-4">
                    <p className="text-[#4E4E4E] text-base font-medium">{t(day.name)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-start">
                    {dayPeriods.map((p) => (
                      <div 
                        key={p.id} 
                        className="flex items-center gap-3 px-3 py-2 bg-[#EEF2F6] border border-[#E3E8EF] rounded-full"
                      >
                        <span className="text-[#4B5565] text-sm font-normal">
                          {p.from?.format('hh:mm A')} - {p.to?.format('hh:mm A')}
                        </span>

                        <button 
                          onClick={() => removeSavedPeriod(day.id, p.id)}
                          className="flex items-center justify-center p-1 cursor-pointer"
                        >
                          <img src="/images/icons/delete-darkRed.svg" alt="delete" className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>





      {/* Bottom Nav */}
      <div className="my-12 flex gap-3">
        <button
          onClick={handlePrev}
          className="border w-48 h-11 py-2.5 px-4 rounded-[6px] border-[var(--color-primary)] text-[var(--color-primary)] text-base font-medium cursor-pointer"
        >
          {t("the previous")}
        </button>
        <button
          onClick={handleNext}
          className="border w-58 h-11 py-2.5 px-4 rounded-[6px] bg-[var(--color-primary)] text-[#fff] text-base font-medium cursor-pointer"
        >
          {t("the next")}
        </button>
      </div>

    </>
  )
}

export default SchedulePage



