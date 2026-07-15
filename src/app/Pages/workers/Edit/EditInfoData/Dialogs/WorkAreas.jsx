"use client"
import { getAllAreasThunk } from '@/redux/slice/Services/ServicesSlice';
import { UpdateWorkerThunk } from '@/redux/slice/Workers/WorkersSlice';
import { Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function WorkAreas({openWorkAreas,setOpenWorkAreas ,worker}) {
  const {t}= useTranslation();


  //api 
  const dispatch = useDispatch();
  const {getAreas} = useSelector(state=>state.services)
  const { loading } = useSelector(state => state.workers);
  useEffect(()=>{
    dispatch(getAllAreasThunk())
  },[dispatch])
  
  
useEffect(()=>{
    if (worker?.handyman_areas?.length > 0){
      setSelected4(worker.handyman_areas)
    }
  } , [worker , openWorkAreas ])



  // Workplace 4
  const [open4, setOpen4] = useState(false);
  const [selected4, setSelected4] = useState([]);
  const [searchValue4, setSearchValue4] = useState("");
  const dropdownRef4 = useRef(null);
  const optionWorkplace = getAreas?.areas || []

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef4.current && !dropdownRef4.current.contains(event.target)) setOpen4(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', worker?.id);
    // Send array of area ids
    selected4.forEach((area, index) => {
      formData.append(`provider_area_ids[${index}]`, area.id);
    });
    
    const result = await dispatch(UpdateWorkerThunk(formData));
    if (UpdateWorkerThunk.fulfilled.match(result)) {
      setOpenWorkAreas(false);
    }
  };

  return (
    <>
      <Dialog 
        open={openWorkAreas} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "ServicePage-dialog" }}
      >
      <button onClick={()=>setOpenWorkAreas(false)} className="modal-close" aria-label={t('cancel')}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
      </button>


      <div className='flex flex-col gap-5 items-center justify-center mb-8'>
        {/* icon */}
        <div className='bg-[#EEF2F6] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center '>
          <div className='bg-[#CDD5DF] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
            <img src="/images/icons/Workplaces.svg" className="w-7.5 h-7.5"  />
          </div>
        </div>

        {/* title */}
        <p className='text-[var(--color-primary)] text-xl font-bold'>{t('Changing workplace')}</p>

      </div>
      
        <div className=' px-6 '>
      
          <div className="flex flex-col">
            <label className="text-[#364152] text-sm font-medium mb-2 block">
              {t("Workplaces")}
            </label>

            <div className="relative w-full" ref={dropdownRef4}>
              <div
                onClick={() => setOpen4(!open4)}
                className="p-2 min-h-11 border border-[#E3E8EF] rounded-[10px] cursor-pointer flex items-center flex-wrap gap-2 bg-white transition-all duration-150 hover:border-[#C69815]/40"
              >
                {/* Selected tags / placeholder */}
                {selected4.length > 0 ? (
                  selected4.map((item, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1.5 h-10 w-fit bg-[#FEF0C7] border border-[#E2E2E2] text-[#505050] text-sm px-3 py-1 rounded-full"
                    >
                      {item?.city}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected4(selected4.filter((_, i) => i !== index));
                        }}
                        className="text-[#364152]"
                      >
                        <img src="/images/icons/x.svg" alt="" className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-[#9AA4B2] text-sm">{t("Identify the workplaces")}</span>
                )}

                {/* Arrow icon on the right */}
                <span className="absolute left-3">
                  {open4 ? (
                    <img src="/images/icons/ArrowUp.svg" alt="" />
                  ) : (
                    <img src="/images/icons/ArrowDown.svg" alt="" />
                  )}
                </span>
              </div>

              {/* Dropdown options */}
              {open4 && (
                <ul className="absolute inset-inline-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10 max-h-48 overflow-y-auto">
                  {optionWorkplace.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        if (!selected4.includes(option)) {
                          setSelected4([...selected4, option]);
                        }
                        setOpen4(false);
                      }}
                      className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                    >
                      {option.city}
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
            <button onClick={()=>setOpenWorkAreas(false)} className="btn-ghost flex-1">
              {t('cancel')}
            </button>
          </div>
        </div>
      
      </Dialog>
    </>
  )
}

export default WorkAreas

