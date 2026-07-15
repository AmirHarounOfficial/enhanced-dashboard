"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

// Dynamically import Dialog to avoid SSR
const Dialog = dynamic(() => import("@mui/material/Dialog"), { ssr: false });

function FiltersPage({ open, handleClose, onApply, onReset, currentFilters }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState([]);
  
  const options = [
    { value: "active", label: t("active") },
    { value: "pending", label: t("pending") },
    { value: "refused", label: t("refused") },
    { value: "stopped", label: t("stopped") },
    { value: "inactive", label: t("inactive") },
  ];

  // Initialize from currentFilters
  React.useEffect(() => {
    if (open && currentFilters && currentFilters.status) {
       // Support both single string (if user manually edited params) and array
       const status = Array.isArray(currentFilters.status) ? currentFilters.status : [currentFilters.status];
       setSelected(status);
    } else if (open && !currentFilters?.status) {
      setSelected([]);
    }
  }, [open, currentFilters]);

  const handleChange = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

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
        <p className="text-[#364152] text-lg font-bold">{t("Filter items")}</p>
        <p className="text-[#697586] text-sm mt-1 mb-5">
          {t("Filter results to facilitate access to the required service")}
        </p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      <section className="border m-6 p-6 border-[#E3E8EF] rounded-[10px]">
        <p className="mb-6 text-[#364152] text-lg font-bold">{t("Services status")}</p>
        <div>
          {options.map((option, index) => (
            <label key={index} className="flex items-center gap-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => handleChange(option.value)}
                className="hidden"
              />
              <span
                className={`w-6 h-6 flex items-center justify-center border rounded-[6px] 
                  ${
                    selected.includes(option.value)
                      ? "bg-[#C69815] border-[#C69815]"
                      : "bg-white border-[#E3E8EF]"
                  }`}
              >
                {selected.includes(option.value) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13 4.25L6.125 11.125L3 8"
                      stroke="white"
                      strokeWidth="2.08325"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="text-[#727272] text-base font-normal">{option.label}</span>
            </label>
          ))}
        </div>
      </section>

      <div className="modal-footer">
        <button
          onClick={() => {
            onApply({ status: selected });
          }}
          className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold"
        >
          {t("apply")}
        </button>
        <button
          className="btn-ghost flex-1"
          onClick={() => {
            setSelected([]);
            onReset();
          }}
        >
          {t("cancel")}
        </button>
      </div>
    </Dialog>
  );
}

export default FiltersPage;




