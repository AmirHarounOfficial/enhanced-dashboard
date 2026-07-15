'use client'
import { getHallsThunk, getViewsThunk } from '@/redux/slice/Requests/RequestsSlice'
import { Dialog } from '@mui/material'
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

function FilterPage({open , setOpen}) {
  const {t} = useTranslation()

  //API
  const dispatch = useDispatch()
  const {getHalls , getViews} = useSelector((state)=>state.requests)

  useEffect(()=>{
    dispatch(getHallsThunk())
    dispatch(getViewsThunk())
  },[dispatch])


  // status
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState([]);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const optionStatus = [
    {id:1 , name:t('certain') , value:'confirmed'},
    {id:2 , name:t('Complete') , value:'completed'},
    {id:3 , name:t('Pending') , value:'pending'},
    {id:4 , name:t('receipt') , value:'arrived'},
    {id:5 , name:t('sitting') , value:'seated'},
    {id:6 , name:t('not_attend') , value:'no_show'},
    {id:7 , name:t('cancelled') , value:'canceled'},
    {id:8 , name:t('rejected') , value:'rejected'},
  ];

  // The hall
  const [open2, setOpen2] = useState(false);
  const [selected2, setSelected2] = useState([]);
  const [searchValue2, setSearchValue2] = useState("");
  const dropdownRef2 = useRef(null);
  const optionHall = getHalls?.data;

  // The view
  const [open3, setOpen3] = useState(false);
  const [selected3, setSelected3] = useState([]);
  const [searchValue3, setSearchValue3] = useState("");
  const dropdownRef3 = useRef(null);
  const optionView = getViews?.data;




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
      if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) setOpen3(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  

  const [selectActive , setSelectActive] = useState(null)
  const inputClassName ="w-5 h-5 appearance-none border border-[#CDD5DF] rounded-full bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";

  return (
    <>

    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >

      {/* Header */}
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

      {/* title */}
      <section className="mt-8 px-6">
        <p className="text-[#364152] text-lg font-bold">{t("Filter items")}</p>
        <p className="text-[#697586] text-sm mt-1 mb-5">{t("Filter your bookings")}</p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      <section className='flex flex-col gap-4 p-6'>
        {/* time */}
        <div>
          <p className='text-[#364152] text-sm font-medium mb-2'>{t('time period')}</p>
          <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-1'>
              <p className='text-[#364152] text-sm font-medium mb-2'>{t('Start time')}</p>
              <div className="relative flex items-center w-full cursor-pointer">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ar"
                  localeText={{
                    timePickerToolbarTitle: t("Select Time"),
                  }}
                >
                  <MobileTimePicker
                    ampm
                    views={["hours", "minutes"]}
                    closeOnSelect
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          sx: {
                            height: "44px",
                            direction: "rtl",

                            "& fieldset": {
                              borderColor: "#E3E8EF",
                              borderRadius: "10px",
                            },

                            "&:hover fieldset": {
                              borderColor: "#E3E8EF",
                            },

                            "&.Mui-focused fieldset": {
                              borderColor: "#C69815",
                              borderWidth: "1px",
                            },

                            "& input": {
                              textAlign: "right",
                              fontSize: "14px",
                              color: "#364152",
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
            
            <div className='flex flex-col gap-1'>
              <p className='text-[#364152] text-sm font-medium mb-2'>{t('End time')}</p>
              <div className="relative flex items-center w-full cursor-pointer">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ar"
                  localeText={{
                    timePickerToolbarTitle: t("Select Time"),
                  }}
                >
                  <MobileTimePicker
                    ampm
                    views={["hours", "minutes"]}
                    closeOnSelect
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          sx: {
                            height: "44px",
                            direction: "rtl",

                            "& fieldset": {
                              borderColor: "#E3E8EF",
                              borderRadius: "10px",
                            },

                            "&:hover fieldset": {
                              borderColor: "#E3E8EF",
                            },

                            "&.Mui-focused fieldset": {
                              borderColor: "#C69815",
                              borderWidth: "1px",
                            },

                            "& input": {
                              textAlign: "right",
                              fontSize: "14px",
                              color: "#364152",
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

        {/* status */}
        <div className="">
          <p className="text-[#364152] text-sm font-medium mb-2">
            {t("Status")}
          </p>

          <div className="mt-2 w-full">
            <div className="relative w-full" ref={dropdownRef1}>
              {/* Input */}
              <div
                className="relative flex items-center"
                onClick={() => setOpen1(!open1)}
              >
                <input
                  type="text"
                  placeholder={t("Select status")}
                  value={searchValue1 || selected1.map((item) => item.name).join(", ")}
                  onChange={(e) => {
                    setSearchValue1(e.target.value);
                    setSelected1(null);
                    setOpen1(true);
                  }}
                  className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
                />
                <span className="absolute end-3 cursor-pointer">
                  <img
                    src={
                      open1
                        ? "/images/icons/ArrowUp.svg"
                        : "/images/icons/ArrowDown.svg"
                    }
                    alt="arrow"
                  />
                </span>
              </div>

              {/* Dropdown */}
              {open1 && (
                <ul className="absolute inset-inline-0 z-20 mt-1.5 max-h-52 overflow-y-auto rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_8px_28px_rgb(15_23_42_/_0.12)] p-1.5">
                  {optionStatus
                    .filter((opt) =>
                      opt?.name?.toLowerCase().includes(searchValue1.toLowerCase())
                    )
                    .map((opt) =>{
                      const alreadySelected = selected1.some(
                        (item) => item.id === opt.id
                      );
                    return(
                      <li
                        key={opt.id}
                        onClick={() => {
                        if (alreadySelected) {
                          setSelected1(selected1.filter((item) => item.id !== opt.id  ));  // remove
                        } else {
                          setSelected1([...selected1, opt]); // add
                        }
                        setSearchValue1("");
                      }}
                        className={`cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5] ${alreadySelected ? 'bg-[#FEF0C7]' : ''}`}
                      >
                        <p className='mt-1 '>
                          <input
                            type="checkbox"
                            checked={alreadySelected}
                            readOnly
                            className={inputClassName}
                          />
                        </p>
                          <span className=''>{opt.name}</span>

                      </li>
                    )})}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* The hall */}
        <div>
          <p className="text-[#364152] text-sm font-medium mb-2">
            {t("The hall")}
          </p>

          <div className="mt-2 w-full">
            <div className="relative w-full" ref={dropdownRef2}>
              
              {/* Input */}
              <div
                className="relative flex items-center"
                onClick={() => setOpen2(!open2)}
              >
                <input
                  type="text"
                  placeholder={t("Choose the type of hall")}
                  value={searchValue2 || selected2.map((item) => item.name).join(" , ")}
                  onChange={(e) => {
                    setSearchValue2(e.target.value);
                    setOpen2(true);
                  }}
                  className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
                />

                <span className="absolute end-3 cursor-pointer">
                  <img
                    src={
                      open2
                        ? "/images/icons/ArrowUp.svg"
                        : "/images/icons/ArrowDown.svg"
                    }
                    alt="arrow"
                  />
                </span>
              </div>

              {/* Dropdown */}
              {open2 && (
                <ul className="absolute inset-inline-0 z-20 mt-1.5 max-h-52 overflow-y-auto rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_8px_28px_rgb(15_23_42_/_0.12)] p-1.5">

                  {optionHall
                    .filter((opt) =>
                      opt?.name
                        .toLowerCase()
                        .includes(searchValue2.toLowerCase())
                    )
                    .map((opt) => {

                      const alreadySelected =
                        selected2.includes(opt);

                      return (
                        <li
                          key={opt?.id}
                          onClick={() => {

                            if (alreadySelected) {
                              // remove
                              setSelected2(
                                selected2.filter(
                                  (item) => item !== opt
                                )
                              );
                            } else {
                              // add
                              setSelected2([
                                ...selected2,
                                opt,
                              ]);
                            }

                            setSearchValue2("");
                          }}
                          className={`cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5] ${alreadySelected ? 'bg-[#FEF0C7]' : ''}`}
                        >

                          <input
                            type="checkbox"
                            checked={alreadySelected}
                            readOnly
                            className={inputClassName}
                          />

                          <span>{opt?.name}</span>

                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* The view */}
        <div>
          <p className="text-[#364152] text-sm font-medium mb-2">
            {t("The view")}
          </p>

          <div className="mt-2 w-full">
            <div className="relative w-full" ref={dropdownRef3}>

              {/* Input */}
              <div
                className="relative flex items-center"
                onClick={() => setOpen3(!open3)}
              >
                <input
                  type="text"
                  placeholder={t("Choose the type of look")}
                  value={
                    searchValue3 ||
                    selected3.map((item) => item.name).join(", ")
                  }
                  onChange={(e) => {
                    setSearchValue3(e.target.value);
                    setOpen3(true);
                  }}
                  className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
                />

                <span className="absolute end-3 cursor-pointer">
                  <img
                    src={
                      open3
                        ? "/images/icons/ArrowUp.svg"
                        : "/images/icons/ArrowDown.svg"
                    }
                    alt="arrow"
                  />
                </span>
              </div>

              {/* Dropdown */}
              {open3 && (
                <ul className="absolute inset-inline-0 z-20 mt-1.5 max-h-52 overflow-y-auto rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_8px_28px_rgb(15_23_42_/_0.12)] p-1.5">

                  {optionView
                    ?.filter((opt) =>
                      opt?.name
                        ?.toLowerCase()
                        .includes(searchValue3.toLowerCase())
                    )
                    .map((opt) => {

                      const alreadySelected = selected3.some(
                        (item) => item.id === opt.id
                      );

                      return (
                        <li
                          key={opt.id}
                          onClick={() => {

                            if (alreadySelected) {

                              // REMOVE
                              setSelected3(
                                selected3.filter(
                                  (item) => item.id !== opt.id
                                )
                              );

                            } else {

                              // ADD
                              setSelected3((prev) => [
                                ...prev,
                                opt,
                              ]);
                            }

                            setSearchValue3("");
                          }}
                          className={`cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5] ${alreadySelected ? 'bg-[#FEF0C7]' : ''}`}
                        >

                          <input
                            type="checkbox"
                            checked={alreadySelected}
                            readOnly
                            className={inputClassName}
                          />

                          <span>{opt?.name}</span>

                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Payment */}
        <div>
          <p className="text-[#364152] text-sm font-medium mb-2">{t('Payment')}</p>
          <div className='flex gap-4'>
            <button onClick={()=>setSelectActive('1')}
              className={`h-10 px-4 rounded-full border text-sm font-medium cursor-pointer
                ${selectActive==='1' ? 'border-[#C69815] text-[#C69815] bg-[#FEF0C7]':'border-[#E3E8EF] text-[#697586]'}
              `}
            >
              {t('Deposit paid')}
            </button>

            <button onClick={()=>setSelectActive('2')}
              className={`h-10 px-4 rounded-full border text-sm font-medium cursor-pointer
                ${selectActive==='2' ? 'border-[#C69815] text-[#C69815] bg-[#FEF0C7]':'border-[#E3E8EF] text-[#697586]'}
              `}
            >
              {t('Deposit not paid')}
            </button>

          </div>
        </div>

        {/* Actions */}
        <div className="modal-footer">
          <button
            className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold"
          >
            {t('apply')}
          </button>
          <button
            onClick={()=>setOpen(false)}
            className="btn-ghost flex-1"
          >
            {t('cancel')}
          </button>
        </div>
        


      </section>

    
    </Dialog>

    </>
  )
}

export default FilterPage



