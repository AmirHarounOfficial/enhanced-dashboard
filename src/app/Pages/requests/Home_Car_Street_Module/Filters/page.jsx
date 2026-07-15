"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns';
import { ar } from 'date-fns/locale'; // Arabic locale
import { useDispatch, useSelector } from "react-redux";
import { getDrowpdownFiltersThunk } from "@/redux/slice/Requests/RequestsSlice";


// Dynamically import Dialog to avoid SSR
const Dialog = dynamic(() => import("@mui/material/Dialog"), { ssr: false });

function FiltersPage({ open, handleClose, onApplyFilters, onResetFilters }) {
  const { t } = useTranslation();




  const dispatch = useDispatch();
  const {filterData,loading,error}= useSelector((state)=>state.requests)
  
  useEffect(()=>{
    dispatch(getDrowpdownFiltersThunk())
  },[dispatch])


    
    // City (1)
    // =========================
    const [open1, setOpen1] = useState(false);
    const [selected1, setSelected1] = useState(null);
    const [searchValue1, setSearchValue1] = useState("");
    const dropdownRef1 = useRef(null);
    const optionCity = filterData?.cities;
  

    //service (2)
    // =========================
    const [open2, setOpen2] = useState(false);
    const [selected2, setSelected2] = useState(null);
    const [searchValue2, setSearchValue2] = useState("");
    const dropdownRef2 = useRef(null);
    const optionservice =filterData?.services ;

    // Status (3)
    // =========================
    const [open3, setOpen3] = useState(false);
    const [selected3, setSelected3] = useState(null);
    const [searchValue3, setSearchValue3] = useState("");
    const dropdownRef3 = useRef(null);
    const optionStatus = filterData?.statuses;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
      if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) setOpen3(false); 
      if (dropdownRef4.current && !dropdownRef4.current.contains(event.target)) setOpen4(false);   
  
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  /*  ========== calender ========== */
  const [open4, setOpen4] = useState(false);
  const dropdownRef4 = useRef(null);

  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);
  const [dateApplied, setDateApplied] = useState(false);

  const handleApplyFilters = () => {
    const filters = {};
    if (selected1) filters.city = selected1.city;
    if (selected2) filters.service_id = selected2.id;
    if (selected3) filters.status = selected3;
    if (dateApplied && state[0].startDate) filters.date_from = format(state[0].startDate, 'yyyy-MM-dd');
    if (dateApplied && state[0].endDate) filters.date_to = format(state[0].endDate, 'yyyy-MM-dd');
    if (onApplyFilters) onApplyFilters(filters);
    handleClose();
  };

  const handleResetFilters = () => {
    setSelected1(null);
    setSearchValue1('');
    setSelected2(null);
    setSearchValue2('');
    setSelected3(null);
    setSearchValue3('');
    setState([{ startDate: null, endDate: null, key: 'selection' }]);
    setDateApplied(false);
    if (onResetFilters) onResetFilters();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
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
        <p className="text-[#697586] text-sm mt-1 mb-5">
          {t("Filter results to facilitate access to the required service")}
        </p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      <section className="p-6">
        <div className=" grid grid-cols-2 gap-4 mb-4">
          {/* ==========City ========== */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-sm font-medium mb-2">
              {t("City")}
            </label>

            <div className="relative w-full" ref={dropdownRef1}>
              <div
                className="relative flex items-center cursor-pointer"
                onClick={() => setOpen1(!open1)}
              >
                <input
                  type="text"
                  placeholder={t("Select City")}
                  value={selected1?.city || searchValue1}   
                  onChange={(e) => {
                    setSearchValue1(e.target.value);
                    setOpen1(true);
                    setSelected1(null);
                  }}
                  className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
                />

                <span className="absolute end-3 pointer-events-none">
                  {open1 ? (
                    <img src="/images/icons/ArrowUp.svg" alt="up" />
                  ) : (
                    <img src="/images/icons/ArrowDown.svg" alt="down" />
                  )}
                </span>
              </div>

              {open1 && (
                <ul className="absolute inset-inline-0 z-20 mt-1.5 max-h-52 overflow-y-auto rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_8px_28px_rgb(15_23_42_/_0.12)] p-1.5">
                  {optionCity
                    .filter((opt) =>
                      opt.city.toLowerCase().includes(searchValue1.toLowerCase())
                    )
                    .map((opt) => (
                      <li
                        key={opt.city}
                        onClick={() => {
                          setSelected1(opt);
                          setOpen1(false);
                          setSearchValue1("");
                        }}
                        className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                      >
                        {opt?.city}
                      </li>
                    ))}
                </ul>
              )}

            </div>
          </div>


          {/* ==========service ========== */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-sm font-medium mb-2">
              {t("Service")}
            </label>

            <div className="relative w-full" ref={dropdownRef2}>
              <div
                className="relative flex items-center cursor-pointer"
                onClick={() => setOpen2(!open2)}
              >
                <input
                  type="text"
                  placeholder={t("Choose the service")}
                  value={selected2?.title || searchValue2}   
                  onChange={(e) => {
                    setSearchValue2(e.target.value);
                    setOpen2(true);
                    setSelected2(null);
                  }}
                  className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
                />

                <span className="absolute end-3 pointer-events-none">
                  {open2 ? (
                    <img src="/images/icons/ArrowUp.svg" alt="up" />
                  ) : (
                    <img src="/images/icons/ArrowDown.svg" alt="down" />
                  )}
                </span>
              </div>

              {open2 && (
                <ul className="absolute inset-inline-0 z-20 mt-1.5 max-h-52 overflow-y-auto rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_8px_28px_rgb(15_23_42_/_0.12)] p-1.5">
                  {optionservice
                    .filter((opt) =>
                      opt.title.toLowerCase().includes(searchValue2.toLowerCase())
                    )
                    .map((opt) => (
                      <li
                        key={opt.id}
                        onClick={() => {
                          setSelected2(opt);
                          setOpen2(false);
                          setSearchValue2("");
                        }}
                        className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                      >
                        {opt?.title}
                      </li>
                    ))}
                </ul>
              )}

            </div>
          </div>          
        </div>
      
        {/* ========== status ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Status")}
          </label>

          <div className="relative w-full" ref={dropdownRef3}>
            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => setOpen3(!open3)}
            >
              <input
                type="text"
                placeholder={t("Select status")}
                value={t(selected3) || searchValue3}
                onChange={(e) => {
                  setSearchValue3(e.target.value);
                  setOpen3(true);
                  setSelected3(null);
                }}
                className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
              />

              <span className="absolute end-3 pointer-events-none">
                {open3 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="up" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="down" />
                )}
              </span>
            </div>

            {open3 && (
              <ul className="absolute inset-inline-0 z-20 mt-1.5 max-h-52 overflow-y-auto rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_8px_28px_rgb(15_23_42_/_0.12)] p-1.5">
                {optionStatus
                  .filter((opt) =>
                    opt.toLowerCase().includes(searchValue3.toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setSelected3(opt);
                        setOpen3(false);
                        setSearchValue3("");
                      }}
                      className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                    >
                      {t(opt)}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>


        {/* ========== calender ========== */}
        <div className="flex flex-col mt-4">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Service history")}
          </label>

          <div className="relative w-full">
            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => setOpen4(true)}
            >
              <input
                type="text"
                placeholder={t("Select date range")}
                value={
                  dateApplied && state[0].startDate && state[0].endDate
                    ? `${state[0].startDate.toLocaleDateString()} - ${state[0].endDate.toLocaleDateString()}`
                    : ""
                }
                readOnly
                className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] cursor-pointer"
              />

              <span className="absolute end-4 pointer-events-none">
                <img src="/images/icons/calender.svg" alt="calendar" />
              </span>
            </div>
          </div>




          {/* Date Range Picker Modal */}
          <Dialog
            open={open4}
            onClose={() => setOpen4(false)}
            aria-labelledby="date-picker-dialog"
            PaperProps={{ className: "rerquest-dialog", dir: "rtl" }}
          >
            {/* title of calender */}
            <section className="flex justify-between px-6 mt-6 ">
              <button
                onClick={() => setOpen4(false)}
                className="modal-close"
                aria-label={t('cancel')}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </button>
              <div className="w-11 h-11 bg-[#FEF0C7] rounded-full flex items-center justify-center">
                <img src="/images/icons/FilterGreyicon.svg" alt="" className="w-6 h-6" />
              </div>
            </section>


            <span className="border-[0.5px] border-[#E3E8EF] my-2" />

            <section className="p-6 flex items-center justify-center ">
              <div dir="ltr" className="inline-block ">
                <div className="  ">
                    <DateRangePicker
                      onChange={item => setState([item.selection])}
                      showSelectionPreview={true}
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={state}
                      direction="horizontal"
                      preventSnapRefocus={true}
                      calendarFocus="backwards"
                      locale={ar}
                      staticRanges={[]}
                      inputRanges={[]}
                      rangeColors={["var(--color-primary)"]}
                      
                    />
                </div>
              
              </div>
            </section>

            {/* btns of calender */}
            <div className="modal-footer">
              <button onClick={() => { setDateApplied(true); setOpen4(false); }} className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold">
                {t('apply')}
              </button>

              <button onClick={() => setOpen4(false)} className="btn-ghost flex-1">
                {t('cancel')}
              </button>
            </div>




          </Dialog>
        </div>


      </section>

      
      <div className="modal-footer">
        <button onClick={handleApplyFilters} className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold">
          {t('Show results')}
        </button>

        <button onClick={handleResetFilters} className="btn-ghost flex-1">
          {t('Reset')}
        </button>
      </div>

      
    </Dialog>
  );
}

export default FiltersPage;




