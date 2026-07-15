"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllAreasThunk } from "@/redux/slice/Services/ServicesSlice";

// Dynamically import Dialog to avoid SSR
const Dialog = dynamic(() => import("@mui/material/Dialog"), { ssr: false });

function FiltersPage({ open, handleClose , getDesignations, onApply, onReset, currentFilters }) {
  const { t } = useTranslation();

  //api
    const dispatch = useDispatch()
    const {getAreas } = useSelector(state=>state.services)
    useEffect(() => {
      dispatch(getAllAreasThunk()); 
    }, [dispatch])


  
  // workplaces 
    const [open1, setOpen1] = useState(false);
    const [selected1, setSelected1] = useState("");
    const [searchValue1, setSearchValue1] = useState("");
    const dropdownRef1 = useRef(null);
    const optionWorkplaces=getAreas?.areas || [];
    
    //status
    const [open2, setOpen2] = useState(false);
    const [selected2, setSelected2] = useState("");
    const [searchValue2, setSearchValue2] = useState("");
    const dropdownRef2 = useRef(null);
    const optionStatus =[
      "نشط" , "غير نشط"
    ];

    //job
    const [open3, setOpen3] = useState(false);
    const [selected3, setSelected3] = useState("");
    const [searchValue3, setSearchValue3] = useState("");
    const dropdownRef3 = useRef(null);
    const optionJob = getDesignations || [];

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
          if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
          if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) setOpen3(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      // Initialize state from currentFilters when dialog opens
      useEffect(() => {
        if (open && currentFilters) {
          // Areas
          if (currentFilters.areas && currentFilters.areas.length > 0 && optionWorkplaces.length > 0) {
            const selectedAreas = optionWorkplaces.filter(area => currentFilters.areas.includes(area.id));
            setSelected1(selectedAreas);
          } else if (!currentFilters.areas) {
            setSelected1([]);
          }

          // Status
          if (currentFilters.status) {
            if (currentFilters.status === "active") setSelected2("نشط");
            if (currentFilters.status === "inactive") setSelected2("غير نشط");
          } else {
             setSelected2("");
          }

          // Designation
          if (currentFilters.designation_id && optionJob.length > 0) {
            const job = optionJob.find(opt => opt.id === currentFilters.designation_id);
            if (job) setSelected3(job.name);
          } else {
            setSelected3("");
          }
        }
      }, [open, currentFilters, optionWorkplaces, optionJob]);
    
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "ServicePage-dialog" }}
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
        <p className="text-[#364152] text-lg font-bold">{t("Worker filtering")}</p>
        <p className="text-[#697586] text-sm mt-1 mb-5">
          {t("Precise filtering of workers and orders to quickly find what you are looking for.")}
        </p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      <section className="p-6">
        {/* workplaces */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Workplaces")}
          </label>

          <div className="relative w-full" ref={dropdownRef1}>
            <div
              onClick={() => setOpen1(!open1)}
              className="relative p-2 min-h-11 pe-10 border border-[#E3E8EF] rounded-[10px] bg-white cursor-pointer flex items-center flex-wrap gap-2 transition-all duration-150 hover:border-[#C69815]/40"
            >
              {/* Selected tags / placeholder */}
              {selected1.length > 0 ? (
                selected1.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1.5 h-10 w-fit bg-[#FEF0C7] border border-[#E2E2E2] text-[#505050] text-sm px-3 py-1 rounded-full"
                  >
                    {item?.city}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected1(selected1.filter((_, i) => i !== index));
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
              <span className="absolute end-3">
                {open1 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="" />
                )}
              </span>
            </div>

            {/* Dropdown options */}
            {open1 && (
              <ul className="absolute inset-inline-0 z-20 mt-1.5 max-h-52 overflow-y-auto rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_8px_28px_rgb(15_23_42_/_0.12)] p-1.5">
                {optionWorkplaces.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      if (!selected1.includes(option)) {
                        setSelected1([...selected1, option]);
                      }
                      setOpen1(false);
                    }}
                    className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                  >
                    {option.city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* status */}
        <div className="flex flex-col mt-4">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Status")}
          </label>

          <div className="relative w-full" ref={dropdownRef2}>
            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => setOpen2(!open2)}
            >
              {/* Input */}
              <input
                type="text"
                placeholder={t("Select status")}
                value={searchValue2 || selected2}
                onChange={(e) => {
                  setSearchValue2(e.target.value);
                  setOpen2(true);
                  setSelected2(null);
                
                }}
                className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
              />

              {/* 🔽 Dropdown arrow */}
              <span className="absolute end-3 cursor-pointer">
                {open2 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="up" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="down" />
                )}
              </span>
            </div>

            {/* 🔽 Dropdown options */}
            {open2 && (
              <ul className="absolute inset-inline-0 z-20 mt-1.5 max-h-52 overflow-y-auto rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_8px_28px_rgb(15_23_42_/_0.12)] p-1.5">
                {optionStatus
                  .filter((option) =>
                    option
                      ?.toLowerCase()
                      .includes(searchValue2.toLowerCase())
                  )
                  .map((option, index) => (
                    <li
                      key={option.id || index}
                      onClick={() => {
                        setSelected2(option);
                        setSearchValue2("");
                        setOpen2(false);
                      }}
                      className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                    >
                      {option}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* job */}
        <div className="flex flex-col mt-4">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("job")}
          </label>

          <div className="relative w-full" ref={dropdownRef3}>
            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => setOpen3(!open3)}
            >
              {/* Input */}
              <input
                type="text"
                placeholder={t("Select job")}
                value={searchValue3 || selected3}
                onChange={(e) => {
                  setSearchValue3(e.target.value);
                  setOpen3(true);
                  setSelected3(null);
                
                }}
                className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
              />

              {/* 🔽 Dropdown arrow */}
              <span className="absolute end-3 cursor-pointer">
                {open3 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="up" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="down" />
                )}
              </span>
            </div>

            {/* 🔽 Dropdown options */}
            {open3 && (
              <ul className="absolute inset-inline-0 z-20 mt-1.5 max-h-52 overflow-y-auto rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_8px_28px_rgb(15_23_42_/_0.12)] p-1.5">
                {optionJob
                  .filter((option) =>
                    option?.name
                      ?.toLowerCase()
                      .includes(searchValue3.toLowerCase())
                  )
                  .map((option, index) => (
                    <li
                      key={option.id || index}
                      onClick={() => {
                        setSelected3(option?.name);
                        setSearchValue3("");
                        setOpen3(false);
                      }}
                      className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                    >
                      {option.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      

      <div className="modal-footer">
        <button
          onClick={() => {
            const filters = {};
            if (selected1.length > 0) {
              filters.areas = selected1.map((item) => item.id);
            }
            if (selected2) {
              if (selected2 === "نشط") filters.status = "active";
              if (selected2 === "غير نشط") filters.status = "inactive";
            }
            if (selected3) {
              const job = optionJob.find((opt) => opt.name === selected3);
              if (job) filters.designation_id = job.id;
            }
            onApply(filters);
          }}
          className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold"
        >
          {t("Show results")}
        </button>
        <button
          className="btn-ghost flex-1"
          onClick={() => {
            setSelected1([]);
            setSelected2("");
            setSelected3("");
            onReset();
          }}
        >
          {t("Reset")}
        </button>
      </div>
    </Dialog>
  );
}

export default FiltersPage;




