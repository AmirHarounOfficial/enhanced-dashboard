"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function Receive_GuestsPage({formData, setFormData}) {
  const {t} = useTranslation()
  const [startTime, setStartTime] = useState(null);
  const [leaveTime, setLeaveTime] = useState(null);
  const [periods, setPeriods] = useState([]);

  const handleAddPeriod = () => {
    if (startTime && leaveTime) {
      setFormData({
        ...formData,
        availabilities: [
          ...(formData?.availabilities || []),
          {
            available_from: startTime ? startTime.format("HH:mm") : "",
            available_to: leaveTime ? leaveTime.format("HH:mm") : ""
          }
        ]
      });      
      setStartTime(null);
      setLeaveTime(null);
    }
  };

  const handleRemovePeriod = (indexToRemove) => {
  setFormData({
    ...formData,
    availabilities: formData.availabilities.filter((_, index) => index !== indexToRemove)
  });
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
                            borderColor: "#CDD5DF",
                            borderRadius: "3px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#CDD5DF",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#CDD5DF",
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
                            borderColor: "#CDD5DF",
                            borderRadius: "3px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#CDD5DF",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#CDD5DF",
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
            {(formData?.availabilities?.length > 0) && (
              <>
                <p className='text-[#364152] text-base font-medium mb-3'>{t('Added periods')}</p>
                <div className='grid grid-cols-2 gap-4'>
                  
                  {(formData?.availabilities || []).map((period, index) => (
                    <div key={index} className='flex border border-[#E3E8EF]  rounded-[6px] py-4 px-3 w-full '>
                      <div className='flex gap-2 w-full'>
                        <img src="/images/icons/clock-yellow.svg" alt="" />
                        <p className='text-[#364152] text-base font-normal'>
                          {formatTime(dayjs(period.available_from, "HH:mm"))}
                          -
                          {formatTime(dayjs(period.available_to, "HH:mm"))}                        
                        </p>
                      </div>
                      <button 
                        onClick={() => handleRemovePeriod(index)}
                        className='w-full flex justify-end cursor-pointer'
                      >
                        <img src="/images/icons/xxx.svg" alt="" />
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

