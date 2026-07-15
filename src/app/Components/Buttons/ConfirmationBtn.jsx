"use client";
import React from "react";
import { useTranslation } from "react-i18next";

function ConfirmationBtn({ onClick, className }) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className={`btn-primary h-10 px-5 rounded-[8px] cursor-pointer text-sm font-medium tracking-wide ${className ?? ""}`}
    >
      {t("confirmation")}
    </button>
  );
}

export default ConfirmationBtn;
