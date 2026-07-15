"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';

function InformationPage({formData, setFormData}) {
  const {t} = useTranslation();

  /* Property area */
  const options = [
    { label: t('SQM'), value: "sqm" },
    { label: t('SQFT'), value: "sqft " },
  ];
  const selected = options.find(opt => opt.value === formData?.area_unit) || options[0];  const [open, setOpen] = useState(false);
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
                  value={formData?.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-[70%] px-3 py-2 h-14 p-3 border border-[#E3E8EF] text-sm text-[#7d8d84] rounded-r-[3px] outline-none"
                />  
                {/* Dropdown */}
                <div className="relative w-[30%] h-14 p-3 border-l border-t border-b border-[#E3E8EF] text-sm text-[#7d8d84] rounded-l-[3px] outline-none">
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
                    <ul className="absolute left-0 mt-3 right-0 border border-[#C8C8C8] bg-white  shadow-md z-10 max-h-48 overflow-y-auto">
                      {options.map((item) => (
                        <li
                          key={item.value}
                          onClick={() => {
                            setOpen(false);
                            setFormData({...formData, area_unit: item.value})
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
                <label className='text-[#4B5565] text-sm font-medium '>
                  {t('Floor number')}
                </label>

                <label className='flex gap-2 items-center cursor-pointer'>
                  <input 
                    type="checkbox"
                    checked={formData?.floor_number == 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, floor_number: 0 });
                      } else {
                        setFormData({ ...formData, floor_number: "" });
                      }
                    }}
                    className="w-5 h-5 appearance-none border rounded-[6px] border-[#CDD5DF] bg-white checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-xs"
                  />
                  <p className='text-[#4B5565] text-sm font-normal select-none'>
                    {t('ground floor')}
                  </p>
                </label>
              </div>

              <input 
                type="text" 
                value={formData?.floor_number}
                onChange={(e) =>
                  setFormData({ ...formData, floor_number: e.target.value })
                }
                disabled={formData?.floor_number == 0}
                placeholder={t('Floor number')}
                className="w-full px-3 py-2 h-11 border border-[#E3E8EF] text-sm text-[#7d8d84] rounded-[6px] outline-none disabled:bg-[#f1f5f9] disabled:cursor-not-allowed"
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
                    checked={formData?.has_elevator == 1}
                    onChange={() => setFormData({...formData, has_elevator: 1})}                    className="w-5 h-5 appearance-none border rounded-full border-[#E3E8EF] bg-white checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-white checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                  />
                  <p className='text-[#697586] text-sm select-none'>{t('yes')}</p>
                </label>
                <label className='flex gap-2 items-center cursor-pointer'>
                  <input 
                    type="radio" 
                    name="elevator"
                    checked={formData?.has_elevator == 0}
                    onChange={() => setFormData({...formData, has_elevator: 0})}                    className="w-5 h-5 appearance-none border rounded-full border-[#E3E8EF] bg-white checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-white checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
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



