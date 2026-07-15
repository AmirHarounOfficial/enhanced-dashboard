"use client";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

function PricingPage({handlePrev , handleGoBack ,formData,handleChange ,handleSubmit,setFormData ,loadingDetails }) {
  const { t } = useTranslation();
  const [isPriceOnInspection, setIsPriceOnInspection] = useState(false);
  

const [open1, setOpen1] = useState(false);
const [selected1, setSelected1] = useState("");
const dropdownRef1 = useRef(null);
const [selectedValue1, setSelectedValue1] = useState(""); 
const options = [
  { label: t("constant value"), value: "flat" },
  { label: t("By the hour"), value: "hour" },
  { label: t("in kilograms"), value: "kilo" },
  { label: t("per meter"), value: "meter" },
];

const [open2, setOpen2] = useState(false);
const [selected2, setSelected2] = useState("");
const dropdownRef2 = useRef(null);
const optionRates = [
  {label:t("percentage") ,  value:"percent"},
  {label:t("constant value") , value:"flat"}
];
const [selectedValue2, setSelectedValue2] = useState(""); 

  return (
    <>
      <form action="" className="flex flex-col gap-8">
        {/*************************************** price & pricing type *************************** */}
        <div className="flex gap-6">
          {/* price field */}
          <div className={`flex flex-col gap-4  ${isPriceOnInspection ? 'w-[50%]':'w-full'}`}>
            <div className="flex justify-between">
              <label className="text-[#364152]">{t("Price of examination and inspection")}</label>
      
              {/* checkbox */}
              <div className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  checked={isPriceOnInspection}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setIsPriceOnInspection(checked); 
                    setFormData({
                      ...formData,
                      price_on_inspection: checked, 
                    });
                  }}
                  className="peer appearance-none w-6 h-6 border border-[#E3E8EF] rounded-[6px] cursor-pointer 
                  checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] 
                  checked:before:content-['✓'] checked:before:text-white 
                  checked:before:flex checked:before:items-center checked:before:justify-center checked:before:w-full checked:before:h-full"
                />
                <p className="text-[#4B5565]">{t("Price upon inspection")}</p>
              </div>
            </div>
      
            {/* price form (always visible) */}
            <input
              type="text"
              value={formData?.inspection_price}
              onChange={(e)=> handleChange("inspection_price", e.target.value)}
              className="w-full h-11 px-4 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
              placeholder={t("Enter the service price")}
            />
          </div>
      
        
          {!isPriceOnInspection && (
            // {/* pricing type dropdown (hide when checked) */}
            <div className="flex flex-col gap-4 w-full">
              <label className="text-[#364152]">{t("Pricing Type")}</label>
              <div className="relative w-full mb-6" ref={dropdownRef1}>
                <div
                  onClick={() => setOpen1(!open1)}
                  className="h-11 px-4 border border-[#E3E8EF] rounded-[10px] bg-white transition-all duration-150 hover:border-[#C69815]/40 cursor-pointer flex items-center justify-between"
                >
                  <span
                    className={
                      selected1 ? "text-[#364152]" : "text-[#9A9A9A]"
                    }
                  >
                    {selected1 || t("Choose the pricing type")}
                  </span>
                  <span className="ml-2">
                    {open1 ? (
                      <img src="/images/icons/ArrowUp.svg" alt="" />
                    ) : (
                      <img src="/images/icons/ArrowDown.svg" alt="" />
                    )}
                  </span>
                </div>
      
                {open1 && (
                  <ul className="absolute left-0 right-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10 max-h-48 overflow-y-auto">
                    {options.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setSelected1(option.label);      
                          setSelectedValue1(option.value); 
                          setOpen1(false);
                          handleChange("pricing_type", option.value);
                        }}
                        className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      
        {/*************************************** sale *************************** */}
        {!isPriceOnInspection && (
          <div className="flex flex-col gap-2">
            <label className="text-[#364152]">{t("Discount")}</label>
      
            <div className="flex w-full">
              {/* Input field */}
              <input
                type="text"
                value={formData?.discount}
                onChange={(e)=>handleChange('discount',e.target.value)}
                placeholder={t("Enter the discount price")}
                className="h-11 w-[85%] px-4 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
              />
      
              {/* Dropdown sale */}
              <div className="relative w-[15%]" ref={dropdownRef2}>
                <div
                  onClick={() => setOpen2(!open2)}
                  className="bg-[#EEF2F6] px-4 h-11 border border-[#E3E8EF] rounded-[10px] transition-all duration-150 hover:border-[#C69815]/40 cursor-pointer flex items-center justify-between"
                >
                  <span
                    className={
                      selected2 ? "text-[#364152]" : "text-[#9A9A9A]"
                    }
                    >
                    {selected2 || t("Rate")}
                  </span>
                  <span>
                    {open2 ? (
                      <img src="/images/icons/ArrowUp.svg" alt="" />
                    ) : (
                      <img src="/images/icons/ArrowDown.svg" alt="" />
                    )}
                  </span>
                </div>
      
                {open2 && (
                  <ul className="absolute left-0 right-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10">
                    {optionRates.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setSelected2(option.label);
                          setSelectedValue2(option.value); 
                          setOpen2(false);
                          handleChange("discount_type", option.value);
                        }}
                        className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </form>

      <div className=" flex gap-4 border border-[#FEC84B] bg-[#FFFCF5] rounded-[6px] shadow p-3 mt-6 w-[70%]">
        <img src="/images/icons/i.svg" alt="" className="w-6 h-6"/>
        <p className="text-[##202939] text-base font-normal">
          {t('The amount entered is only what you receive from the customer, without additional expenses or equipment transfer.')}
        </p>
      </div>

      <div className="my-12 flex gap-3">
      <button 
        onClick={handlePrev} 
        className="btn-ghost h-11 px-6 w-48 cursor-pointer"
      >
        {t('the previous')}
      </button>
      {/* <button
        onClick={handleGoBack} 
        className="border w-58 h-11 py-2.5 px-4 rounded-[6px] bg-[#C69815] text-[#fff] text-base font-medium cursor-pointer"
      >
          {t('save')}
      </button> */}
      <button
        onClick={handleSubmit}
        disabled={loadingDetails}
        className={`btn-primary h-11 px-6 w-58 rounded-[10px] text-white text-sm font-semibold ${
          loadingDetails ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {loadingDetails ? t("Saving...") : t("save")}
      </button>

      </div>
  
    </>
    
  );
}

export default PricingPage;




