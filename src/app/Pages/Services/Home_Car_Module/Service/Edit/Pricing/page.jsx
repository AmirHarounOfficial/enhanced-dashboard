
"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

function PricingPage({handlePrev , handleGoBack , service ,formData ,handleChange , handleSave}) {
  const { t } = useTranslation();


  const [isPriceOnInspection, setIsPriceOnInspection] = useState(service?.price_on_inspection || false);

  // pricing type dropdown
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
  

  // Discount
    const [open2, setOpen2] = useState(false);
    const dropdownRef2 = useRef(null);

    const optionRates = [
      { label: t("percentage"), value: "percent" },
      { label: t("constant value"), value: "flat"}
    ]

  useEffect(() => {
    if (service?.pricing_type) {
      setSelected1(service.pricing_type);
    };
    
    if (service?.discount_type) {
      setSelected1(service.discount_type);
    };

    if (service?.price_on_inspection !== undefined) {
    setIsPriceOnInspection(service.price_on_inspection);
    };
    
  }, [service]);


  return (
    <>
      <form action="" className="flex flex-col gap-8">
        {/*************************************** price & pricing type *************************** */}
        <div className="flex gap-6">
          {/* price field */}
          <div className={`flex flex-col gap-4  ${isPriceOnInspection ? 'w-[50%]':'w-full'}`}>
            <div className="flex justify-between">
              <label className="text-[#364152]">{t("Service Price")}</label>
      
              {/* checkbox */}
              <div className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  checked={formData?.price_on_inspection === true}
                  onChange={(e) =>
                    handleChange("price_on_inspection", e.target.checked) // update formData
                  } 
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
              value={formData?.price || ""}  
              onChange={(e) => handleChange("price", e.target.value)}
              className="border h-11 p-3 border-[#C8C8C8] rounded-[6px]"
              placeholder={t("Enter the service price")}
            />
          </div>
      
          {/* pricing type dropdown (hide when checked) */}
          {!formData?.price_on_inspection &&  (
            // Pricing Type
            <div className="flex flex-col gap-4 w-full">
              <label className="text-[#364152]">{t("Pricing Type")}</label>

              <div className="relative w-full mb-6" ref={dropdownRef1}>
                <div
                  onClick={() => setOpen1(!open1)}
                  className="h-11 p-3 border border-[#C8C8C8] rounded-[6px] cursor-pointer flex items-center justify-between"
                >
                  <span className={formData?.pricing_type ? "text-[#364152]" : "text-[#9A9A9A]"}>
                    {options.find((o) => o.value === formData?.pricing_type)?.label || t("Choose the pricing type")}
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
                  <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[6px] shadow-md z-10 max-h-48 overflow-y-auto">
                    {options.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          handleChange("pricing_type", option.value);
                          setOpen1(false);
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
        {!formData?.price_on_inspection && (

          /*Discount*/
          <div className="flex flex-col gap-2">
            <label className="text-[#364152]">{t("Discount")}</label>
      
            <div className="flex w-full">

              {/* Input field */}
              <input
                type="text"
                value={formData?.discount}
                onChange={(e) => handleChange("discount", e.target.value)}
                placeholder={t("Enter the discount price")}
                className="h-11 w-[85%] px-3 border border-[#C8C8C8] rounded-[6px] focus:outline-none"
              />
      
              {/* Dropdown rate */}
              <div className="relative w-[15%]" ref={dropdownRef2}>
                <div
                  onClick={() => setOpen2(!open2)}
                  className="bg-[#EEF2F6] p-3 h-11 border border-[#C8C8C8] rounded-[6px] cursor-pointer flex items-center justify-between"
                >
                  <span className="text-[#4B5565]">
                    {optionRates.find(o => o.value === formData?.discount_type)?.label || t("Rate")}
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
                  <ul className="border border-[#4B5565] bg-white rounded-[6px] shadow-md z-10">
                    {optionRates.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          handleChange("discount_type", option.value);
                          setOpen2(false);
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
        className="border w-48 h-11 py-2.5 px-4 rounded-[6px] border-[#C69815] text-[#C69815] text-base font-medium cursor-pointer"
      >
        {t('the previous')}
      </button>
      <button
        onClick={handleSave} 
        className="border w-58 h-11 py-2.5 px-4 rounded-[6px] bg-[#C69815] text-[#fff] text-base font-medium cursor-pointer"
      >
          {t('save')}
      </button>
      </div>
    </>
    
  );
}

export default PricingPage;




