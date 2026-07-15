"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { styled, Switch } from "@mui/material";

function Form({getHallType, formData, setFormData}) {
  const {t} = useTranslation();
    // =========================
    const [open1, setOpen1] = useState(false);
    const [searchValue1, setSearchValue1] = useState("");
    const dropdownRef1 = useRef(null);
    const optionHallType = getHallType?.data;

    // =========================
    const [open2, setOpen2] = useState(false);
    const [searchValue2, setSearchValue2] = useState("");
    const dropdownRef2 = useRef(null);

    const optionDefaultBookingDuration = ['60', '90', '120', '180'];

    //=====================
    const [open3, setOpen3] = useState(false);
    const [searchValue3, setSearchValue3] = useState("");
    const dropdownRef3 = useRef(null);
    const optionBufferTimeBetweenBookings = ['10', '15', '20', '30'];

    // الحصول على اسم نوع القاعة من الـ id
    const getHallTypeName = () => {
      if (!formData.hall_type_id || !optionHallType) return "";
      const found = optionHallType.find(opt => opt.id === formData.hall_type_id || opt.id === Number(formData.hall_type_id));
      return found ? found.name : "";
    };

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

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
        if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
        if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) setOpen3(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
  return (
    <>
    <div className='grid grid-cols-2 gap-6'>

      {/* ========== Hall Name  ========== */}
      <div className='w-full'>
      <p className='text-sm font-medium mb-1.5'>
        <span className='text-[#364152] '>{t('Hall Name')} </span>
        <span className=' text-[#F04438]'>*</span>
      </p>
      <input 
        type="text"
        name='title'
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder={t('Write the name of the hall')}
        className={`w-full h-11 px-4 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]`}
      />
      </div>

      {/* ========== Hall type 1  ========== */}
      <div className="flex flex-col">
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Hall type')} </span>
          <span className=' text-[#F04438]'>*</span>
        </p>

        <div className="relative w-full" ref={dropdownRef1}>
          <div
            className="relative flex items-center border border-[#E3E8EF] rounded-[10px] cursor-pointer bg-white transition-all duration-150 hover:border-[#C69815]/40"
            onClick={() => setOpen1(!open1)}
          >
            <input
              type="text"
              placeholder={t("Choose the type of hall")}
              value={searchValue1 || getHallTypeName() || ""}
              onChange={(e) => {
                setSearchValue1(e.target.value);
                setOpen1(true);
              }}
              className="h-11 px-4 w-full text-sm text-[#364152] bg-transparent focus:outline-none placeholder-[#9AA4B2]"
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
              {optionHallType
                ?.filter((opt) =>
                  opt?.name?.toLowerCase().includes(searchValue1.toLowerCase())
                )
                .map((opt) => (
                  <li
                    key={opt?.id}
                    onClick={() => {
                      setFormData({...formData, hall_type_id: opt?.id});
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

      {/* ============= Floor number ================= */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <label className="text-[#4B5565] text-sm font-medium">
            {t("Floor number")}
          </label>

          <label className="flex gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.floor_number === 0 || formData.floor_number === '0'}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  floor_number: e.target.checked ? 0 : "",
                });
              }}
              className="w-5 h-5 appearance-none border rounded-[6px] border-[#CDD5DF] bg-white checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-xs"
            />

            <p className="text-[#4B5565] text-sm font-normal select-none">
              {t("ground floor")}
            </p>
          </label>
        </div>

        <input
          type="number"
          min="0"
          value={formData.floor_number}
          onChange={(e) =>
            setFormData({
              ...formData,
              floor_number: e.target.value === "" ? "" : Number(e.target.value),
            })
          }
          placeholder={t("Floor number")}
          className="w-full h-11 px-4 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
        />
      </div>

      {/* ========== default booking duration  ========== */}
      <div className="relative w-full" ref={dropdownRef2}>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('default booking duration')} </span>
          <span className=' text-[#F04438]'>*</span>
        </p>
        <div
          className="relative flex items-center border border-[#C8C8C8] rounded-[6px] cursor-pointer"
          onClick={() => setOpen2(!open2)}
        >
          <input
            type="text"
            placeholder={t("Enter the default duration for bookings in this hall.")}
            value={searchValue2 || formData.default_reservation_duration_min || ""}
            onChange={(e) => {
              setSearchValue2(e.target.value);
              setOpen2(true);
            }}
            className="h-14 p-3 w-full text-[#364152] focus:outline-none"
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
          <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[6px] shadow-md z-10 max-h-48 overflow-y-auto">
            {optionDefaultBookingDuration
              .filter((opt) =>
                opt.toLowerCase().includes(searchValue2.toLowerCase())
              )
              .map((opt) => (
                <li
                  key={opt}
                  onClick={() => {
                    setFormData({...formData, default_reservation_duration_min: opt});
                    setSearchValue2("");
                    setOpen2(false);
                  }}
                  className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                >
                  {opt}
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* ========== The buffer time between bookings  ========== */}
      <div className="relative w-full" ref={dropdownRef3}>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152]'>{t('The buffer time between bookings')}</span>
          <span className='text-[#F04438]'>*</span>
        </p>

        <div
          className="relative flex items-center border border-[#C8C8C8] rounded-[6px] cursor-pointer"
          onClick={() => setOpen3(!open3)}
        >
          <input
            type="text"
            placeholder={t("Enter the buffer time between bookings in this hall.")}
            value={searchValue3 || formData.buffer_time_min || ""}
            onChange={(e) => {
              setSearchValue3(e.target.value);
              setOpen3(true);
            }}
            className="h-14 p-3 w-full text-[#364152] focus:outline-none"
          />

          <span className="absolute left-3 cursor-pointer">
            {open3 ? (
              <img src="/images/icons/ArrowUp.svg" alt="up" />
            ) : (
              <img src="/images/icons/ArrowDown.svg" alt="down" />
            )}
          </span>
        </div>

        {open3 && (
          <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[6px] shadow-md z-10 max-h-48 overflow-y-auto">
            {optionBufferTimeBetweenBookings
              .filter((opt) =>
                opt.toLowerCase().includes(searchValue3.toLowerCase())
              )
              .map((opt) => (
                <li
                  key={opt}
                  onClick={() => {
                    setFormData({...formData, buffer_time_min: opt});
                    setSearchValue3("");
                    setOpen3(false);
                  }}
                  className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                >
                  {opt}
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* ========== Hall condition =================== */}
      <div className='flex justify-between bg-[#F8FAFC] border border-[#EEF2F6] rounded-[10px] py-3 px-4'>
        <div>
          <p className='text-[#364152] text-lg font-medium'>
            {t('Hall condition')}
          </p>
          <p className='text-base font-normal text-[#697586]'>
            {t('Make this lounge available for bookings')}
          </p>
        </div>

        <div className='flex items-center'>
          <GreenSwitch
            checked={formData.status === 1}
            onChange={(e) => setFormData({...formData, status: e.target.checked ? 1 : 0})}
          />
        </div>
      </div>


      




    </div>
        
    </>
  )
}

export default Form



