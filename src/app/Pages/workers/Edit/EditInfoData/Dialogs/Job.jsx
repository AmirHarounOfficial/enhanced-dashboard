import { getDesignationsThunk, UpdateWorkerThunk } from '@/redux/slice/Workers/WorkersSlice';
import { Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function Job({openJob ,setOpenJob ,worker}) {
    const {t}= useTranslation();

      //api
      const dispatch = useDispatch()
      const{getDesignations} = useSelector(state=>state.workers)
      useEffect(()=>{
        dispatch(getDesignationsThunk())
      },[dispatch])


      useEffect(()=>{
        if(worker?.designation?.name){
          setSelected1(worker?.designation?.name)
          setSearchValue1("");
        }
      }, [worker, openJob])


      //job
        const [open1, setOpen1] = useState(false);
        const [selected1, setSelected1] = useState("");
        const [searchValue1, setSearchValue1] = useState("");
        const dropdownRef1 = useRef(null);
        const optionJob=getDesignations || []
        const { loading } = useSelector(state => state.workers);

        const handleSubmit = async () => {
          const selectedOption = optionJob.find(opt => opt.name === selected1);
          
          const formData = new FormData();
          formData.append('id', worker?.id);
          if (selectedOption) {
            formData.append('designation_id', selectedOption.id);
          }
          
          const result = await dispatch(UpdateWorkerThunk(formData));
          if (UpdateWorkerThunk.fulfilled.match(result)) {
            setOpenJob(false);
          }
        };
  
  return (
    <>
      <Dialog 
        open={openJob} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "ServicePage-dialog" }}
      >
        <button onClick={()=>setOpenJob(false)} className="modal-close" aria-label={t('cancel')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>

        <div className='flex flex-col gap-5 items-center justify-center mb-8'>
          {/* icon */}
          <div className='bg-[#EEF2F6] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center '>
            <div className='bg-[#CDD5DF] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
              <img src="/images/icons/labor_black.svg" className="w-7.5 h-7.5"  />
            </div>
          </div>

          {/* title */}
          <p className='text-[var(--color-primary)] text-xl font-bold'>{t('job change')}</p>

        </div>


          {/* job */}
        <div className="flex flex-col p-6">
            <label className="text-[#364152] text-sm font-medium mb-2 block">
              {t("job")}
            </label>

            <div className="relative w-full" ref={dropdownRef1}>
              <div
                className="relative flex items-center border border-[#E3E8EF] rounded-[10px] cursor-pointer transition-all duration-150 hover:border-[#C69815]/40 focus-within:border-[#C69815] focus-within:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] bg-white"
                onClick={() => setOpen1(!open1)}
              >
                {/* Input */}
                <input
                  type="text"
                  placeholder={t("Choose the job")}
                  value={searchValue1 || selected1}
                  onChange={(e) => {
                    setSearchValue1(e.target.value);
                    setOpen1(true);
                    setSelected1(null);
                  }}
                  className="h-11 px-4 w-full text-sm text-[#364152] bg-transparent rounded-[10px] outline-none placeholder-[#9AA4B2]"
                />
      
                {/* 🔽 Dropdown arrow */}
                <span className="absolute left-3 cursor-pointer">
                  {open1 ? (
                    <img src="/images/icons/ArrowUp.svg" alt="up" />
                  ) : (
                    <img src="/images/icons/ArrowDown.svg" alt="down" />
                  )}
                </span>
              </div>
      
              {/* 🔽 Dropdown options */}
              {open1 && (
                <ul className="absolute inset-inline-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10 max-h-48 overflow-y-auto">
                  {optionJob
                    .filter((option) =>
                      option?.name
                        ?.toLowerCase()
                        .includes(searchValue1.toLowerCase())
                    )
                    .map((option, index) => (
                      <li
                        key={option.id}
                        onClick={() => {
                          setSelected1(option?.name);
                          setSearchValue1("");
                          setOpen1(false);
                        }}
                        className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                      >
                        {option.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
        </div>


          <div className="modal-footer">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold">
              {loading ? t('loading...') : t('save')}
            </button>
            <button onClick={()=>setOpenJob(false)} className="btn-ghost flex-1">
              {t('cancel')}
            </button>
          </div>

      </Dialog>
    </>
  )
}

export default Job

