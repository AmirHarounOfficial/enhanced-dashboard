"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function Receive_GuestsPage({setFormData ,formData ,fieldErrors, setFieldErrors}) {
  const {t} = useTranslation()
  const [startTime, setStartTime] = useState(null);
  const [leaveTime, setLeaveTime] = useState(null);
  const [periods, setPeriods] = useState([]);

  const handleAddPeriod = () => {
    if (startTime && leaveTime) {
      const newPeriods = [...periods, { start: startTime, end: leaveTime }];
      setPeriods(newPeriods);
      
      const formattedPeriods = newPeriods.map(p => ({
        available_from: p.start.format('HH:mm'),
        available_to: p.end.format('HH:mm')
      }));
      setFormData({ ...formData, availabilities: formattedPeriods });
      if (setFieldErrors) setFieldErrors(prev => ({...prev, availabilities: false}));

      setStartTime(null);
      setLeaveTime(null);
    }
  };

  const handleRemovePeriod = (indexToRemove) => {
    const newPeriods = periods.filter((_, index) => index !== indexToRemove);
    setPeriods(newPeriods);
    
    const formattedPeriods = newPeriods.map(p => ({
      available_from: p.start.format('HH:mm'),
      available_to: p.end.format('HH:mm')
    }));
    setFormData({ ...formData, availabilities: formattedPeriods });
  };

  const formatTime = (timeObj) => {
    if (!timeObj) return '';
    return timeObj.format('hh:mm A')
      .replace('AM', 'ص')
      .replace('PM', 'م')
      .replace('am', 'ص')
      .replace('pm', 'م');
  };

  return (
    <>
    <div className='mb-10'>
      {/*  */}
      <div className='flex gap-2'>
        <img src="/images/icons/clock-blue.svg" className="w-6 h-6" />
        <p className='text-[#364152] text-base font-medium'>{t('Service provider available to receive guests')}</p>
      </div>
      {/*  */}
      <p className='text-[#4B5565] text-base font-normal'>{t('Add details of registration and checkout times')}</p>
      

      <div className='mt-6 border border-[#E3E8EF] p-4'>
        <div className='grid grid-cols-2 gap-6'>
          {/* Login start time */}
          <div className='flex flex-col gap-1.5'>
            <p className='text-sm font-medium'>
              <span className='text-[#364152] '>{t('from')} </span>
            </p>
            <div className='relative flex items-center cursor-pointer w-full'>
              <LocalizationProvider
                localeText={{
                  timePickerToolbarTitle: t('Select Time'),
                }}
                dateAdapter={AdapterDayjs}
                adapterLocale="ar"
              >
                <MobileTimePicker
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  ampm={true}
                  views={["hours", "minutes"]}
                  closeOnSelect={true}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        sx: {
                          height: "56px",
                          direction: "rtl",
                          "& fieldset": {
                            borderColor: fieldErrors?.availabilities ? "#F04438" : "#CDD5DF",
                            borderRadius: "3px",
                          },
                          "&:hover fieldset": {
                            borderColor: fieldErrors?.availabilities ? "#F04438" : "#CDD5DF",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: fieldErrors?.availabilities ? "#F04438" : "#CDD5DF",
                            borderWidth: "1px",
                          },
                          "& input": {
                            textAlign: "right",
                            fontSize: "14px",
                            color: "#7d8d84",
                            outline: "none",
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

          {/*Time to leave  */}
          <div className='flex flex-col gap-1.5'>
            <p className='text-sm font-medium'>
              <span className='text-[#364152] '>{t('to')} </span>
            </p>
            <div className='relative flex items-center cursor-pointer w-full'>
              <LocalizationProvider
                localeText={{
                  timePickerToolbarTitle: t('Select Time'),
                }}
                dateAdapter={AdapterDayjs}
                adapterLocale="ar"
              >
                <MobileTimePicker
                  value={leaveTime}
                  onChange={(newValue) => setLeaveTime(newValue)}
                  ampm={true}
                  views={["hours", "minutes"]}
                  closeOnSelect={true}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        sx: {
                          height: "56px",
                          direction: "rtl",
                          "& fieldset": {
                            borderColor: fieldErrors?.availabilities ? "#F04438" : "#CDD5DF",
                            borderRadius: "3px",
                          },
                          "&:hover fieldset": {
                            borderColor: fieldErrors?.availabilities ? "#F04438" : "#CDD5DF",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: fieldErrors?.availabilities ? "#F04438" : "#CDD5DF",
                            borderWidth: "1px",
                          },
                          "& input": {
                            textAlign: "right",
                            fontSize: "14px",
                            color: "#7d8d84",
                            outline: "none",
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

        <button 
          onClick={handleAddPeriod}
          className='flex items-center justify-center my-4 border border-dashed border-[var(--color-primary)] py-2.5 px-4 w-full h-14 cursor-pointer'
        >
          <p className='text-[var(--color-primary)]'>{t('Adding the period')}</p>
          <img src="/images/icons/AddYellowIcon.svg" alt="" />
        </button>

        <div>
            {periods.length > 0 && (
              <>
                <p className='text-[#364152] text-base font-medium mb-3'>{t('Added periods')}</p>
                <div className='grid grid-cols-2 gap-4'>
                  {periods.map((period, index) => (
                    <div key={index} className='flex border border-[#E3E8EF]  rounded-[6px] py-4 px-3 w-full '>
                      <div className='flex gap-2 w-full'>
                        <img src="/images/icons/clock-yellow.svg" className="w-8 h-8"  />
                        <p className='text-[#364152] text-base font-normal  w-full'>
                          {formatTime(period.start)} - {formatTime(period.end)}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleRemovePeriod(index)}
                        className=' flex justify-end cursor-pointer '
                      >
                        <img src="/images/icons/xxx.svg" className="w-10 h-10" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Receive_GuestsPage

