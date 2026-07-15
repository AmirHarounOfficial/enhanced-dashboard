"use client"
import { Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import LocationPage from './Location/page';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertiesCitiesThunk, getPropertyTypesThunk } from '@/redux/slice/Services/ServicesSlice';

function FiltersPage({ open,setOpen , handleClose, onApplyFilters }) {
  const { t } = useTranslation();

  //api
  const dispatch = useDispatch()
  const {getPropertyTypes ,getPropertiesCities} = useSelector((state)=>state.services)
  useEffect(()=>{
    dispatch(getPropertyTypesThunk())
    dispatch(getPropertiesCitiesThunk())
  },[dispatch])





  const [openLocation, setOpenLocation] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const toggleLocation = (id) => {
    if (selectedLocations.includes(id)) {
      setSelectedLocations(selectedLocations.filter(locId => locId !== id))
    } else {
      setSelectedLocations([...selectedLocations, id])
    }
  }

  //
  const [expiryDate, setExpiryDate] = useState(null);
  //1-status =========================
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const statusKeys = ['active', 'pending', 'draft', 'inactive', 'rejected'];
  const optionStatus = statusKeys.map(k => t(k));

  //2-Property type =========================
  const [open2, setOpen2] = useState(false);
  const [selected2, setSelected2] = useState(null);
  const [searchValue2, setSearchValue2] = useState("");
  const dropdownRef2 = useRef(null);
  const optionPropertyType = getPropertyTypes?.data

  //3-Select availability =========================
  const [open3, setOpen3] = useState(false);
  const [selected3, setSelected3] = useState(null);
  const [searchValue3, setSearchValue3] = useState("");
  const dropdownRef3 = useRef(null);
  const availabilityKeys = ["available_now", "fully_booked", "has_blocked_dates"];
  const optionAvailability = availabilityKeys.map(k => t(k));

  //4-Booking activity =========================
  const [open4, setOpen4] = useState(false);
  const [selected4, setSelected4] = useState(null);
  const [searchValue4, setSearchValue4] = useState("");
  const dropdownRef4 = useRef(null);
  const bookingActivityKeys = ["has_upcoming_bookings", "has_pending_bookings", "no_bookings_yet"];
  const optionBookingActivity = bookingActivityKeys.map(k => t(k));

  //5-Evaluation =========================
  const [open5, setOpen5] = useState(false);
  const [selected5, setSelected5] = useState(null);
  const [searchValue5, setSearchValue5] = useState("");
  const dropdownRef5 = useRef(null);
  const ratingKeys = ["more_4_5", "more_4", "more_3_5", "more_3", "less_3", "not_rated"];
  const optionEvaluation = ratingKeys.map(k => t(k));

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const getAPIKeyFor = (translatedValue, keysArray, translationsArray) => {
    if (!translatedValue) return undefined;
    const index = translationsArray.indexOf(translatedValue);
    return index !== -1 ? keysArray[index] : undefined;
  }

  const handleApply = () => {
    const mappedCities = selectedLocations.map(index => getPropertiesCities?.data?.[index]?.id).filter(id => id);
    const statusVal = getAPIKeyFor(selected1, statusKeys, optionStatus);
    
    const payload = {
      status: statusVal ? [statusVal] : undefined,
      property_type_ids: selected2?.id ? [selected2.id] : undefined,
      cities: mappedCities.length > 0 ? mappedCities : undefined,
      availability: getAPIKeyFor(selected3, availabilityKeys, optionAvailability),
      activity: getAPIKeyFor(selected4, bookingActivityKeys, optionBookingActivity),
      rating: getAPIKeyFor(selected5, ratingKeys, optionEvaluation),
      date_added: expiryDate ? dayjs(expiryDate).format('YYYY-MM-DD') : undefined,
      min_price: minPrice || undefined,
      max_price: maxPrice || undefined,
    };
    
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);
    
    if (onApplyFilters) onApplyFilters(payload);
    handleClose();
  };

  const handleReset = () => {
    setSelected1(null);
    setSelected2(null);
    setSelected3(null);
    setSelected4(null);
    setSelected5(null);
    setSelectedLocations([]);
    setExpiryDate(null);
    setMinPrice("");
    setMaxPrice("");
    if (onApplyFilters) onApplyFilters({});
  };

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

  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "property-dialog" }}
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
          {t("Liquidation of your assets")}
        </p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      <section className='px-6 mt-6'>
        {/* ========== 1-Status ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Status")}
          </label>

          <div className="relative w-full" ref={dropdownRef1}>
            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => setOpen1(!open1)}
            >
              <input
                type="text"
                placeholder={t("Select status")}
                value={selected1 || searchValue1}   
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
                {optionStatus
                  .filter((opt) =>
                    opt.toLowerCase().includes(searchValue1.toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setSelected1(opt);
                        setOpen1(false);
                        setSearchValue1("");
                      }}
                      className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                    >
                      {opt}
                    </li>
                  ))}
              </ul>
            )}

          </div>
        </div>

        {/* ========== 2-Property type ========== */}
        <div className="flex flex-col my-4">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Property type")}
          </label>

          <div className="relative w-full" ref={dropdownRef2}>
            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => setOpen2(!open2)}
            >
              <input
                type="text"
                placeholder={t("Select the type of property")}
                value={selected2?.city || searchValue2}   
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
                {optionPropertyType
                  .filter((opt) =>
                    opt?.name?.toLowerCase().includes(searchValue2.toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt?.id}
                      onClick={() => {
                        setSelected2(opt);
                        setOpen2(false);
                        setSearchValue2("");
                      }}
                      className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                    >
                      {opt?.name}
                    </li>
                  ))}
              </ul>
            )}

          </div>
        </div>
        
        {/* ========== Location ========== */}
        <div className="flex flex-col my-4">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Location")}
          </label>

          <div className="relative w-full mb-3" ref={dropdownRef2}>
            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => setOpenLocation(!openLocation)}
            >
              <input
                type="text"
                className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
                onClick={()=>{handleClose(); setOpenLocation(true)}}
              />

              {/* <span className="absolute left-3 pointer-events-none">
                <img src="/images/icons/xx.svg" alt="" />
              </span> */}
              <span className="absolute start-1 pointer-events-none flex gap-1.5">
                <img src="/images/icons/location_gray.svg" alt="" />
                <span className='text-[#9A9A9A]'>{t('select location')}</span>
              </span>

            </div>

          

          </div>
          
          {/* Show selected location */}
          <div className='flex gap-3 flex-wrap mt-2'>
            {selectedLocations.map((index) => {
              const cityData = getPropertiesCities?.data?.[index];
              if (!cityData) return null;
              return (
                <div key={index} className='flex gap-1.5 border border-[#E2E2E2] bg-[#FEF0C7] w-fit px-3 py-1 h-9 rounded-[999px]'>
                  <p className='text-[#505050] text-sm flex items-center'>{cityData.city}</p>
                  <p className='flex items-center cursor-pointer' onClick={() => toggleLocation(index)}>
                    <img src="/images/icons/xx.svg" alt="remove" className="w-4 h-4" />
                  </p>
                </div>
              )
            })}
          </div>

        </div>
        
      
      </section>


      <section className='grid grid-cols-2 gap-3 p-6'>

        {/* ========== 3-Select availability ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Select availability")}
          </label>

          <div className="relative w-full" ref={dropdownRef3}>
            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => setOpen3(!open3)}
            >
              <input
                type="text"
                placeholder={t("Select availability")}
                value={selected3 || searchValue3}   
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
                {optionAvailability
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
                      {opt}
                    </li>
                  ))}
              </ul>
            )}

          </div>
        </div>

        {/* ========== 4-Booking activity ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Booking activity")}
          </label>

          <div className="relative w-full" ref={dropdownRef4}>
            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => setOpen4(!open4)}
            >
              <input
                type="text"
                placeholder={t("Select booking activity")}
                value={selected4 || searchValue4}   
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
                {optionBookingActivity
                  .filter((opt) =>
                    opt.toLowerCase().includes(searchValue4.toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setSelected4(opt);
                        setOpen4(false);
                        setSearchValue4("");
                      }}
                      className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                    >
                      {opt}
                    </li>
                  ))}
              </ul>
            )}

          </div>
        </div>

        {/* ========== 5-Evaluation ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Evaluation")}
          </label>

          <div className="relative w-full" ref={dropdownRef5}>
            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => setOpen5(!open5)}
            >
              <input
                type="text"
                placeholder={t("Select the evaluation")}
                value={selected5 || searchValue5}   
                onChange={(e) => {
                  setSearchValue5(e.target.value);
                  setOpen5(true);
                  setSelected5(null);
                }}
                className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
              />

              <span className="absolute end-3 pointer-events-none">
                {open5 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="up" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="down" />
                )}
              </span>
            </div>

            {open5 && (
              <ul className="absolute inset-inline-0 z-20 mt-1.5 max-h-52 overflow-y-auto rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_8px_28px_rgb(15_23_42_/_0.12)] p-1.5">
                {optionEvaluation
                  .filter((opt) =>
                    opt.toLowerCase().includes(searchValue5.toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setSelected5(opt);
                        setOpen5(false);
                        setSearchValue5("");
                      }}
                      className="cursor-pointer flex items-center gap-2.5 py-2 px-2.5 rounded-[8px] text-sm text-[#364152] hover:bg-[#FFFDF5]"
                    >
                      {opt}
                    </li>
                  ))}
              </ul>
            )}

          </div>
        </div>

        {/* ========== Date added  ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Date added")}
          </label>
          <div className="relative w-full mb-4 ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                fieldDirection="rtl"
                value={expiryDate}
                onChange={(newValue) => setExpiryDate(newValue)}
                slotProps={{
                  textField: {
                    placeholder: "00/00/0000",
                    fullWidth: true,
                    sx: {
                      '& .MuiInputBase-input': {
                        paddingLeft: '12px', 
                        textAlign: 'right', 
                        fieldDirection: 'rtl',
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                      }
                    }
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>


        {/* ========== Lowest price ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Lowest price")}
          </label>
          <input 
            type="text"
            placeholder='1000 $'
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
          />
        </div>

        {/* ========== Highest price ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-sm font-medium mb-2">
            {t("Highest price")}
          </label>
          <input 
            type="text"
            placeholder='2000 $'                 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full h-11 ps-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
          />
        </div>

      </section>

      <div className="modal-footer">
        <button onClick={handleApply} className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold">{t("Apply Filters")}</button>
        <button onClick={handleReset} className="btn-ghost flex-1">{t("Clear all")}</button>
      </div>
      
    </Dialog>

    <LocationPage
      openLocation={openLocation}
      setOpenLocation={setOpenLocation}
      setOpenMainFilter={setOpen}
      getPropertiesCities={getPropertiesCities}
      selectedLocations={selectedLocations}
      toggleLocation={toggleLocation}
    />

    </>
  )
}

export default FiltersPage


