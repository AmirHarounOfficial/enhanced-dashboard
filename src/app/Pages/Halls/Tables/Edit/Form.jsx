"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { styled, Switch } from "@mui/material";

function Form({getHallsView, formData, setFormData , availableTags }) {
  const {t} = useTranslation();
  // =========================
  const [open1, setOpen1] = useState(false);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const option1 =[
    {name:t('round'), value:'round'},
    {name:t('square'), value:'square'},
    {name:t('rectangle'), value:'rectangle'},
    {name:t('oval'), value:'oval'},
  ]

  // =========================
  const [open2, setOpen2] = useState(false);
  const [searchValue2, setSearchValue2] = useState("");
  const dropdownRef2 = useRef(null);
  const option2 = getHallsView?.data;

  // Derive display labels directly from formData (avoids stale state bugs)
  const selected1 = option1.find(opt => opt.value === formData?.shape)?.name || null;
  const selected2 = option2?.find(opt => opt.id === formData?.views?.[0])?.name || null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //==================
  const GreenSwitch = styled(Switch)(({ theme }) => ({
    width: 53,
    height: 24,
    padding: 0,

    "& .MuiSwitch-switchBase": {
      margin: 3,
      padding: 0,
      transitionDuration: `${theme.transitions.duration.standard}ms`,

      "&.Mui-checked": {
        transform: "translateX(29px)",
        color: "#fff",

        "& + .MuiSwitch-track": {
          backgroundColor: "#10B981",
          opacity: 1,
          border: 0,
        },

        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },

      "&.Mui-focusVisible .MuiSwitch-thumb": {
        border: "4px solid #fff",
      },

      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[300],
      },
    },

    "& .MuiSwitch-thumb": {
      width: 18,
      height: 18,
      boxSizing: "border-box",
    },

    "& .MuiSwitch-track": {
      borderRadius: 12,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create("background-color", {
        duration: theme.transitions.duration.standard,
      }),
    },
  }));
    const [selectedTag, setSelectedTag] = useState(null);
  return (
    <>
    <div className='grid grid-cols-2 gap-6'>
      
      {/* ========== Table name/number  ========== */}
      <div className='w-full'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Table name/number')} </span>
          <span className=' text-[#F04438]'>*</span>
        </p>
        <input 
          type="text"
          name='code'
          value={formData?.code || ''}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          placeholder={t('Write the table/number')}
          className={`w-full h-11 px-4 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] `}
        />
      </div>
      
      {/* =============== Table type  ============= */}
      <div className="flex flex-col gap-1.5">
        <p className='text-sm font-medium '>
          <span className='text-[#364152] '>{t('Table type')} </span>
          <span className=' text-[#F04438]'>*</span>
        </p>

        <div className="relative w-full" ref={dropdownRef1}>
          <div
            className="relative h-11 flex items-center border border-[#E3E8EF] rounded-[10px] cursor-pointer bg-white transition-all duration-150 hover:border-[#C69815]/40"
            onClick={() => setOpen1(!open1)}
          >
            <input
              type="text"
              placeholder={t("Choose the type of table")}
              value={searchValue1 || selected1|| ""}
              onChange={(e) => {
                setSearchValue1(e.target.value);
                setOpen1(true);
              }}
              className="px-4 w-full text-sm text-[#364152] bg-transparent focus:outline-none placeholder-[#9AA4B2]"
            />

            <span className="absolute left-3 cursor-pointer">
              {open1 ? (
                <img src="/images/icons/ArrowUp.svg" alt="up" />
              ) : (
                <img src="/images/icons/ArrowDown.svg" alt="down" />
              )}
            </span>
          </div>

          {open1 && (
            <ul className="absolute left-0 right-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10 max-h-48 overflow-y-auto">
              {option1
                ?.filter((opt) =>
                  opt?.name?.toLowerCase().includes(searchValue1.toLowerCase())
                )
                .map((opt) => (
                  <li
                    key={opt?.value}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, shape: opt?.value }));
                      setSearchValue1("");
                      setOpen1(false);
                    }}
                    className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {opt?.name}
                  </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/*============ Views =============== */}
      <div className="flex flex-col gap-1.5">
        <p className='text-sm font-medium '>
          <span className='text-[#364152]'>{t('views')} </span>
          <span className='text-[#F04438]'>*</span>
        </p>

        <div className="relative w-full" ref={dropdownRef2}>
          <div
            className="relative h-11 flex items-center border border-[#E3E8EF] rounded-[10px] cursor-pointer bg-white transition-all duration-150 hover:border-[#C69815]/40"
            onClick={() => setOpen2(!open2)}
          >
            <input
              type="text"
              placeholder={t("Choose the looks")}
              value={searchValue2 || selected2 || ""}
              onChange={(e) => {
                setSearchValue2(e.target.value);
                setOpen2(true);
              }}
              className="px-4 w-full text-sm text-[#364152] bg-transparent focus:outline-none placeholder-[#9AA4B2]"
            />

            <span className="absolute left-3 cursor-pointer">
              {open2 ? (
                <img src="/images/icons/ArrowUp.svg" alt="up" />
              ) : (
                <img src="/images/icons/ArrowDown.svg" alt="down" />
              )}
            </span>
          </div>

          {open2 && (
            <ul className="absolute left-0 right-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10 max-h-48 overflow-y-auto">
              {option2
                ?.filter((opt) =>
                  opt?.name?.toLowerCase().includes(searchValue2.toLowerCase())
                )
                .map((opt) => (
                  <li
                    key={opt?.id}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, views: [opt?.id] }));
                      setSearchValue2("");
                      setOpen2(false);
                    }}
                    className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {opt?.name}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/*=========== Number of guests =============*/}
      <div className="w-full  flex flex-col gap-1.5">
        <p className='text-sm font-medium text-[#364152]'>{t('Number of guests')}</p>

        <div className=" h-11 px-3 flex items-center justify-between rounded-[10px] border border-[#EEF2F6] bg-[#F8FAFC]  ">
          <button
            onClick={() => setFormData(prev => ({ ...prev, capacity: (prev?.capacity || 1) + 1 }))}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[6px] border border-[#E3E8EF] bg-[white] text-lg text-[#0F022E]"
          >
            +
          </button>

          <div className="text-center">
            <p className="text-xl font-medium text-[var(--color-primary)]">{formData?.capacity || 1}</p>
            <p className="text-sm text-[#364152]">{t('Guests')}</p>
          </div>

          <button
            onClick={() => setFormData(prev => ({ ...prev, capacity: Math.max(1, (prev?.capacity || 1) - 1) }))}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[6px] border border-[#E3E8EF] bg-[white] text-lg text-[#0F022E]"
          >
            -
          </button>
        </div>
      </div>

      {/* ========= slogans ============ */}
      <div className="w-full flex flex-col gap-1.5 col-span-2">
        <p className="text-sm font-medium text-[#364152]">{t('slogans')}</p>

        <div className="flex flex-wrap gap-3">
          {availableTags?.map((tag) => {
            const isSelected = formData?.tags?.includes(tag.id);
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => {
                  setFormData(prev => {
                    const already = prev.tags?.includes(tag.id);
                    return {
                      ...prev,
                      tags: already
                        ? prev.tags.filter(id => id !== tag.id)   // إلغاء التحديد
                        : [...(prev.tags || []), tag.id],          // إضافة
                    };
                  });
                }}
                className={`
                  min-h-10 px-4 py-2 flex justify-center items-center gap-2 
                  text-sm font-normal rounded-full border transition-all
                  ${
                    isSelected
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                      : "bg-[#FEF0C7] text-[#364152] border-[#E2E2E2] cursor-pointer"
                  }
                `}
              >
                {tag.name}

                {isSelected && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData(prev => ({
                        ...prev,
                        tags: prev.tags.filter(id => id !== tag.id),
                      }));
                    }}
                    className="flex items-center justify-center w-5 h-5 rounded-full cursor-pointer"
                  >
                    <img src="/images/icons/x_white.svg" alt="close" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>


      {/* Available for booking */}
      <div className='flex justify-between bg-[#F8FAFC] border border-[#EEF2F6] rounded-[10px] py-3 px-4'>
        <div>
          <p className='text-[#364152] text-base font-medium'>
            {t('Available for booking')}
          </p>
          <p className='text-base font-normal text-[#697586]'>
            {t('Allowing customers to book this table online')}
          </p>
        </div>
        <div className='flex items-center'>
          <GreenSwitch
            checked={!!formData?.is_bookable}
            onChange={(e) => { const v = e.target.checked; setFormData(prev => ({ ...prev, is_bookable: v })); }}
          />
        </div>
      </div>

      {/* Available*/}
      <div className='flex justify-between bg-[#F8FAFC] border border-[#EEF2F6] rounded-[10px] py-3 px-4'>
        <div>
          <p className='text-[#364152] text-base font-medium'>
            {t('Available')}
          </p>
          <p className='text-base font-normal text-[#697586]'>
            {t('Make this table available for use.')}
          </p>
        </div>
        <div className='flex items-center'>
          <GreenSwitch
            checked={!!formData?.is_active}
            onChange={(e) => { const v = e.target.checked; setFormData(prev => ({ ...prev, is_active: v })); }}
          />
        </div>
      </div>


    </div>
      

    
    
    </>
  )
}

export default Form

