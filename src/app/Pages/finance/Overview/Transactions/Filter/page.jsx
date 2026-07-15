"use client"
import { Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { ar } from 'date-fns/locale'; // Arabic locale
import { useDispatch, useSelector } from 'react-redux';
import { getAllWorkersThunk } from '@/redux/slice/Workers/WorkersSlice';
import { getAllServicesThunk } from '@/redux/slice/Services/ServicesSlice';

function FilterPage({open , setOpen, onFilterApply}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { workers, loading } = useSelector((state) => state.workers);
    const { services } = useSelector((state) => state.services);

    // ===== Payment status 1 =====
    const [open1, setOpen1] = useState(false);
    const [selected1, setSelected1] = useState(null);
    const [searchValue1, setSearchValue1] = useState("");
    const dropdownRef1 = useRef(null);
    const paymentStatusKeys = ['pending', 'paid', 'refunded'];
    const optionPaymentStatus = paymentStatusKeys.map(key => ({ key, label: t(key) }));
  
    // ===== payment method 2 =====
    const [open2, setOpen2] = useState(false);
    const [selected2, setSelected2] = useState(null);
    const [searchValue2, setSearchValue2] = useState("");
    const dropdownRef2 = useRef(null);
    const paymentMethodKeys = ['cash', 'card'];
    const optionPaymentMethod = paymentMethodKeys.map(key => ({ key, label: t(key) }));

    // ===== worker 3 =====
    const [open3, setOpen3] = useState(false);
    const [selected3, setSelected3] = useState(null);
    const [searchValue3, setSearchValue3] = useState("");
    const dropdownRef3 = useRef(null);
    const optionWorker = workers;
    const handleOpenWorkerDropdown = () => {
      setOpen3((prev) => !prev);
      dispatch(
        getAllWorkersThunk ({
          per_page: 200,
          designation_id: '1', 
        })
      );
    };
    
    // ===== Service 4 =====
    const [open4, setOpen4] = useState(false);
    const [selected4, setSelected4] = useState(null);
    const [searchValue4, setSearchValue4] = useState("");
    const dropdownRef4 = useRef(null);
    const optionService = services;
    const handleOpenServiceDropdown = () => {
      setOpen4((prev)=>!prev);
      dispatch(
        getAllServicesThunk({
        per_page:200,
      }))
    }
    const getServiceTitle = (service) => {
      if (!service?.category?.title) return null;

      if (typeof service.category.title === "string") {
        return service.category.title.trim() || null;
      }


    };



        /*  ========== calender ========== */
        const [open5, setOpen5] = useState(false);
        const dropdownRef5 = useRef(null);
      
        const [state, setState] = useState([
          {
            startDate: null,
            endDate: null,
            key: 'selection'
          }
        ]);
      

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
          if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
          if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) setOpen3(false);
          if (dropdownRef4.current && !dropdownRef4.current.contains(event.target)) setOpen4(false);
          if (dropdownRef5.current && !dropdownRef5.current.contains(event.target)) setOpen5(false);

        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      const formatDate = (date) => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const handleResults = () => {
        const filters = {};
        if (selected1) filters.payment_status = selected1.key;
        if (selected2) filters.payment_method = selected2.key.toUpperCase(); 
        if (selected3) filters.handyman_id = selected3.id;
        // if (selected4) filters.service_id = selected4.id;
        if (selected4?.category?.id) {
          filters.service_id = selected4.category.id;
        }
        if (state[0].startDate) filters.date_from = formatDate(state[0].startDate);
        if (state[0].endDate) filters.date_to = formatDate(state[0].endDate);

        onFilterApply(filters);
        setOpen(false);
      };

      const handleReset = () => {
        setSelected1(null);
        setSelected2(null);
        setSelected3(null);
        setSelected4(null);
        setState([{
          startDate: null,
          endDate: null,
          key: 'selection'
        }]);
        onFilterApply({});
        setOpen(false);
      };

  return (
    <>
    <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            className: "overviewPage-dialog",
          }}
        >
          <section className="flex justify-between px-6 mt-6">
            <button
              onClick={()=>setOpen(false)}
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
            <p className="text-[#364152] text-lg font-bold">{t("Transaction settlement")}</p>
            <p className="text-[#697586] text-sm mt-1 mb-5">
              {t("Precise transaction filtering to quickly find what you are looking for.")}
            </p>
          </section>
          <span className="border-[0.5px] border-[#E3E8EF]" />

          <section className='p-6 '>
            <div className='grid grid-cols-2 gap-4'>
              {/* Payment status */}
              <div className="flex flex-col">
                <label className="text-[#364152] text-sm font-medium mb-2">
                  {t("Payment status")}
                </label>

                <div className="relative w-full" ref={dropdownRef1}>
                  <div
                    className="relative flex items-center cursor-pointer"
                    onClick={() => setOpen1(!open1)}
                  >
                    <input
                      type="text"
                      placeholder={t("Select payment status")}
                      value={selected1?.label || searchValue1}   
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
                      {optionPaymentStatus
                        .filter((opt) =>
                          opt.label.toLowerCase().includes(searchValue1.toLowerCase())
                        )
                        .map((opt) => (
                          <li
                            key={opt.key}
                            onClick={() => {
                              setSelected1(opt);
                              setOpen1(false);
                              setSearchValue1("");
                            }}
                            className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                          >
                            {opt.label}
                          </li>
                        ))}
                    </ul>
                  )}

                </div>
              </div>

              {/* payment method */}
              <div className="flex flex-col">
                <label className="text-[#364152] text-sm font-medium mb-2">
                  {t("payment method")}
                </label>

                <div className="relative w-full" ref={dropdownRef2}>
                  <div
                    className="relative flex items-center cursor-pointer"
                    onClick={() => setOpen2(!open2)}
                  >
                    <input
                      type="text"
                      placeholder={t("Select payment status")}
                      value={selected2?.label || searchValue2}   
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
                      {optionPaymentMethod
                        .filter((opt) =>
                          opt.label.toLowerCase().includes(searchValue2.toLowerCase())
                        )
                        .map((opt) => (
                          <li
                            key={opt.key}
                            onClick={() => {
                              setSelected2(opt);
                              setOpen2(false);
                              setSearchValue2("");
                            }}
                            className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                          >
                            {opt.label}
                          </li>
                        ))}
                    </ul>
                  )}

                </div>
              </div>

              {/* worker */}
              <div className="flex flex-col">
                <label className="text-[#364152] text-sm font-medium mb-2">
                  {t("worker")}
                </label>

                <div className="relative w-full" ref={dropdownRef3}>
                  <div
                    className="relative flex items-center cursor-pointer"
                    onClick={handleOpenWorkerDropdown}
                  >
                    <input
                      type="text"
                      placeholder={t("Choose a woker")}
                      value={selected3?`${selected3?.firstname} ${selected3?.lastname}`: searchValue3 } 
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
                      {optionWorker
                        ?.filter((opt) =>
                          `${opt?.firstname} ${opt?.lastname}`.toLowerCase().includes(searchValue3.toLowerCase())
                        )
                        .map((opt) => (
                          <li
                            key={opt?.id}
                            onClick={() => {
                              setSelected3(opt);
                              setOpen3(false);
                              setSearchValue3("");
                            }}
                            className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                          >
                            {opt?.firstname} {opt?.lastname}
                          </li>
                        ))}
                    </ul>
                  )}

                </div>
              </div>

              {/* Service */}
              <div className="flex flex-col">
                <label className="text-[#364152] text-sm font-medium mb-2">
                  {t("Service")}
                </label>

                <div className="relative w-full" ref={dropdownRef4}>
                  <div
                    className="relative flex items-center cursor-pointer"
                    onClick={handleOpenServiceDropdown}
                  >
                    <input
                      type="text"
                      placeholder={t("Choose the service")}
                      // value={selected4 ? selected4.title : searchValue4}
                      value={selected4 ? getServiceTitle(selected4) : searchValue4}

                      onChange={(e) => {
                        setSearchValue4(e.target.value);
                        setOpen4(true);
                        setSelected4(null);
                      }}
                      className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
                    />

                    <span className="absolute end-3 pointer-events-none">
                      {open4 ? (
                        <img src="/images/icons/ArrowUp.svg" alt="up" />
                      ) : (
                        <img src="/images/icons/ArrowDown.svg" alt="down" />
                      )}
                    </span>
                  </div>

                  {open4 && (
                    <ul className="absolute inset-inline-0 z-20 mt-1.5 max-h-52 overflow-y-auto rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_8px_28px_rgb(15_23_42_/_0.12)] p-1.5">
                      {optionService
                        .filter((opt) => getServiceTitle(opt))
                        .filter((opt) =>
                          getServiceTitle(opt).toLowerCase().includes(searchValue4.toLowerCase())
                        )
                        .map((opt) => (
                          <li
                            key={opt?.id}
                            onClick={() => {
                              setSelected4(opt);
                              setOpen4(false);
                              setSearchValue4("");
                            }}
                            className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                          >
                            {getServiceTitle(opt)}
                          </li>
                        ))}
                    </ul>
                  )}

                </div>
              </div>
            </div>
            
            
            <div className="flex flex-col mt-6">
              <label className="text-[#364152] text-base font-normal mb-3">
                {t("Service history")}
              </label>
    
              <div className="relative w-full">
                <div
                  className="relative flex items-center cursor-pointer"
                  onClick={() => setOpen5(true)}
                >
                  <input
                    type="text"
                    placeholder={t("Select date range")}
                    value={
                      state[0].startDate && state[0].endDate
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
                open={open5}
                aria-labelledby="date-picker-dialog"
                PaperProps={{ className: "rerquest-dialog", dir: "rtl" }}
              >
                {/* title of calender */}
                <section className="flex justify-between px-6 mt-6 ">
                  <button
                    onClick={() => setOpen5(false)}
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
                  <button
                  onClick={() => setOpen5(false)}
                  className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold">
                    {t('apply')}
                  </button>

                  <button
                  onClick={() => setOpen5(false)}
                  className="btn-ghost flex-1">
                    {t('cancel')}
                  </button>
                </div>
    
    
    
    
              </Dialog>
            </div>  
          </section>
          
          {/* btn */}
          <div className="modal-footer">
            <button
              onClick={handleResults}
              className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold"
            >
              {t('Show results')}
            </button>

            <button
              onClick={handleReset}
              className="btn-ghost flex-1"
            >
              {t('Reset')}
            </button>
          </div>


        </Dialog>

    </>
  )
}

export default FilterPage



