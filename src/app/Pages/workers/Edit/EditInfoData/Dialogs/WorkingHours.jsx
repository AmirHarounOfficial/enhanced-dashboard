

"use client"
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import TimeRangePicker from './TimeRangePicker';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateWorkerThunk } from '@/redux/slice/Workers/WorkersSlice';

function WorkingHours({openWorkingHours , setOpenWorkingHours ,worker}) {
    const {t}= useTranslation();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.workers);

    // Working hours
    const [workingHours, setWorkingHours] = useState({
      start: '00:00',
  end: '00:00',
    });


    const convertArabicTimeTo24 = (timeStr) => {
  // timeStr = "11:37 ص"
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "م") { // مساءً
    if (hours < 12) hours += 12;
  } else if (period === "ص" && hours === 12) { // منتصف الليل
    hours = 0;
  }

  // رجع بصيغة HH:mm
  return `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}`;
};

  useEffect(() => {
  if(worker?.working_time){
    const [startRaw, endRaw] = worker.working_time.split(" - ");
    setWorkingHours({
      start: convertArabicTimeTo24(startRaw),
      end: convertArabicTimeTo24(endRaw),
    });
  }
}, [worker, openWorkingHours]);

    // Convert 24-hour time to Arabic format
    const formatTimeToArabic = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'م' : 'ص';
      const adjustedHours = hours % 12 || 12;
      return `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formattedWorkingTime = `${formatTimeToArabic(workingHours.start)} - ${formatTimeToArabic(workingHours.end)}`;
      
      const formData = new FormData();
      formData.append('id', worker?.id);
      formData.append('working_time', formattedWorkingTime);
      
      const result = await dispatch(UpdateWorkerThunk(formData));
      if (UpdateWorkerThunk.fulfilled.match(result)) {
        setOpenWorkingHours(false);
      }
    };

  return (
    <>
      <Dialog 
          open={openWorkingHours} 
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{ className: "ServicePage-dialog" }}
        >
        <button onClick={()=>setOpenWorkingHours(false)} className="modal-close" aria-label={t('cancel')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>


        <div className='flex flex-col gap-5 items-center justify-center mb-8'>
          {/* icon */}
          <div className='bg-[#EEF2F6] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center '>
            <div className='bg-[#CDD5DF] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
              <img src="/images/icons/clock.svg" className="w-7.5 h-7.5"  />
            </div>
          </div>

          {/* title */}
          <p className='text-[var(--color-primary)] text-xl font-bold'>{t('Working hours')}</p>

        </div>
        
          <div className=' px-6 '>
            {/* Working hours */}
            <div className="flex flex-col">
              <TimeRangePicker
                value={workingHours}
                onChange={setWorkingHours}
                label={t('Working hours')}
                language="ar"
              />
            </div>

            <div className="modal-footer">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold">
                {loading ? t('loading...') : t('save')}
              </button>
              <button onClick={()=>setOpenWorkingHours(false)} className="btn-ghost flex-1">
                {t('cancel')}
              </button>
            </div>
          </div>
        
        </Dialog>

    </>
  )
}

export default WorkingHours


