"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function Arrival_DeparturePage({setFormData ,formData, fieldErrors, setFieldErrors}) {
  const {t} = useTranslation()
  const [startTime, setStartTime] = useState(null);
  const [leaveTime, setLeaveTime] = useState(null);

  return (
    <>
      <div className='my-10'>
        {/*  */}
        <div className='flex gap-2'>
          <img src="/images/icons/clock-blue.svg" className="w-6 h-6" />
          <p className='text-[#364152] text-base font-medium'>{t('Arrival and departure times')}</p>
        </div>
        {/*  */}
        <p className='text-[#4B5565] text-base font-normal'>{t('Add details of registration and checkout times')}</p>
        

        <div className='mt-6 border border-[#E3E8EF] p-4'>
          <div className='grid grid-cols-2 gap-6'>
            {/* Login start time */}
            <div className='flex flex-col gap-1.5'>
              <p className='text-sm font-medium'>
                <span className='text-[#364152] '>{t('Login start time')} </span>
                <span className=' text-[#F04438]'>*</span>
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
                    onChange={(newValue) => {
                      setStartTime(newValue);
                      if (newValue) {
                        setFormData({ ...formData, check_in_time: newValue.format('HH:mm') });
                        if (setFieldErrors) setFieldErrors(prev => ({...prev, check_in_time: false}));
                      }
                    }}
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
                              borderColor: fieldErrors?.check_in_time ? "#F04438" : "#CDD5DF",
                              borderRadius: "3px",
                            },
                            "&:hover fieldset": {
                              borderColor: fieldErrors?.check_in_time ? "#F04438" : "#CDD5DF",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: fieldErrors?.check_in_time ? "#F04438" : "#CDD5DF",
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
                <span className='text-[#364152] '>{t('Time to leave')} </span>
                <span className=' text-[#F04438]'>*</span>
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
                    onChange={(newValue) => {
                      setLeaveTime(newValue);
                      if (newValue) {
                        setFormData({ ...formData, check_out_time: newValue.format('HH:mm') });
                        if (setFieldErrors) setFieldErrors(prev => ({...prev, check_out_time: false}));
                      }
                    }}
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
                              borderColor: fieldErrors?.check_out_time ? "#F04438" : "#CDD5DF",
                              borderRadius: "3px",
                            },
                            "&:hover fieldset": {
                              borderColor: fieldErrors?.check_out_time ? "#F04438" : "#CDD5DF",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: fieldErrors?.check_out_time ? "#F04438" : "#CDD5DF",
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
        </div>
      </div>

    </>
  )
}

export default Arrival_DeparturePage
