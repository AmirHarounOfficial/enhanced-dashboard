"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';

function InformationPage({setFormData ,formData ,fieldErrors, setFieldErrors}) {
  const {t} = useTranslation();

  /* Property area */
  const options = [
    { label: t('SQM'), value: "sqm" },
    { label: t('SQFT'), value: "sqft " },
  ];
  
  const [selected, setSelected] = useState("وحده المساحه");
  const [open, setOpen] = useState(false);
  const [hasElevator, setHasElevator] = useState("");
  const [isGroundFloor, setIsGroundFloor] = useState(false);
  const dropdownRef1 = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <>
      <div>
        {/*  */}
        <div className='flex gap-2'>
          <img src="/images/icons/city_blue.svg" className="w-6 h-6" />
          <p className='text-[#364152] text-base font-medium'>{t('Property Information')}</p>
        </div>
        {/*  */}
        <p className='text-[#4B5565] text-base font-normal'>{t('Add property details and floor information.')}</p>
        {/*  */}
        <div className='mt-6 border border-[#E3E8EF] p-4'>
          <div className='grid grid-cols-2 gap-6 '>

            {/* Property area */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-sm'>
                <span className='text-[#4B5565] font-medium'>{t('Property area')}</span> {" "}
                <span className='text-[#697586] font-normal'>({t('optional')})</span>
              </label>
              
              {/*  */}
              <div className="flex" ref={dropdownRef1}>
                {/* Input */}
                <input
                  type="number"
                  onChange={(e) => {
                    setFormData({...formData, area: e.target.value});
                    if (setFieldErrors) setFieldErrors(prev => ({...prev, area: false}));
                  }}
                  name="area"
                  className={`w-[70%] h-11 px-4 border text-sm text-[#364152] bg-white rounded-r-[10px] outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] ${fieldErrors?.area ? 'border-[#F04438]' : 'border-[#E3E8EF]'}`}
                />  
                {/* Dropdown */}
                <div className={`relative w-[30%] h-11 border-l border-t border-b text-sm text-[#364152] bg-white rounded-l-[10px] outline-none ${fieldErrors?.area_unit ? 'border-[#F04438]' : 'border-[#E3E8EF]'}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="w-full h-full flex items-center justify-between px-3 py-2 text-sm cursor-pointer"
                  >
                    <span>{selected.label}</span>
                    <span className="absolute left-3 cursor-pointer">
                      {open ? (
                        <img src="/images/icons/ArrowUp.svg" alt="up" />
                      ) : (
                        <img src="/images/icons/ArrowDown.svg" alt="down" />
                      )}
                    </span>                   
                  </button>

                  {open && (
                    <ul className="absolute left-0 mt-3 right-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10 max-h-48 overflow-y-auto">
                      {options.map((item) => (
                        <li
                          key={item?.value}
                          onClick={() => {
                            setSelected(item);
                            setOpen(false);
                            setFormData({...formData , area_unit:item?.value});
                            if (setFieldErrors) setFieldErrors(prev => ({...prev, area_unit: false}));
                          }}
                          className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>

            </div>


            {/* Floor number */}
            <div className='flex flex-col gap-1.5'>
              <div className='flex justify-between'>
                <label className='text-[#4B5565] text-sm font-medium '>{t('Floor number')} </label>
                <label className='flex gap-2 items-center cursor-pointer'>
                  <input 
                    type="checkbox"
                    checked={isGroundFloor}
                    onChange={(e) => {
                      setIsGroundFloor(e.target.checked);
                      if (e.target.checked) {
                        setFormData({ ...formData, floor_number: 0 });
                        if (setFieldErrors) setFieldErrors(prev => ({...prev, floor_number: false}));
                      } else {
                        setFormData({ ...formData, floor_number: "" });
                      }
                    }}
                    className="w-5 h-5 appearance-none border rounded-[6px]  border-[#CDD5DF] bg-white  checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex  checked:after:items-center checked:after:justify-center checked:after:text-xs"  
                  />
                  <p className='text-[#4B5565] text-sm font-normal select-none'>{t('ground floor')}</p>
                </label>
              
              </div>
              <input 
                type="number"
                min="0" 
                disabled={isGroundFloor}
                value={formData?.floor_number === 0 && isGroundFloor ? "" : formData?.floor_number}
                onChange={(e) => {
                  setFormData({ ...formData, floor_number: e.target.value });
                  if (setFieldErrors) setFieldErrors(prev => ({...prev, floor_number: false}));
                }}
                placeholder={t('Floor number')}
                className={`w-full h-11 px-4 border text-sm text-[#364152] bg-white rounded-[10px] outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] disabled:bg-[#f1f5f9] disabled:cursor-not-allowed ${fieldErrors?.floor_number ? 'border-[#F04438]' : 'border-[#E3E8EF]'}`}
              />
            </div>

            {/* Elevator available */}
            <div className='flex gap-6'>
              <p className='text-[#4B5565] text-base font-medium'>{t('Elevator available')}</p>
              <div className='flex gap-4 mt-2'>
                <label className='flex gap-2 items-center cursor-pointer'>
                  <input 
                    type="radio" 
                    name="elevator"
                    checked={hasElevator === 'yes'}
                    onChange={(e) => {
                      setHasElevator('yes');
                      setFormData({ ...formData, has_elevator: 1 });
                      if (setFieldErrors) setFieldErrors(prev => ({...prev, has_elevator: false}));
                    }}
                    className={`w-5 h-5 appearance-none border rounded-full bg-white checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-white checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 ${fieldErrors?.has_elevator ? 'border-[#F04438]' : 'border-[#E3E8EF]'}`}
                  />
                  <p className='text-[#697586] text-sm select-none'>{t('yes')}</p>
                </label>
                <label className='flex gap-2 items-center cursor-pointer'>
                  <input 
                    type="radio" 
                    name="elevator"
                    checked={hasElevator === 'no'}
                    onChange={(e) => {
                      setHasElevator('no');
                      setFormData({ ...formData, has_elevator: 0 });
                      if (setFieldErrors) setFieldErrors(prev => ({...prev, has_elevator: false}));
                    }}
                    className={`w-5 h-5 appearance-none border rounded-full bg-white checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-white checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 ${fieldErrors?.has_elevator ? 'border-[#F04438]' : 'border-[#E3E8EF]'}`}
                  />
                  <p className='text-[#697586] text-sm select-none'>{t('no')}</p>
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </>
  )
}

export default InformationPage


