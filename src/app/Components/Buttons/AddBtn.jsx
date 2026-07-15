"use client";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

function AddBtn({ label, href, className }) {
  const { t } = useTranslation();
  return (
    <Link href={href}>
      <button
        className={`
          btn-primary
          flex gap-2 items-center justify-center
          h-10 px-5
          rounded-[8px]
          cursor-pointer
          ${className ?? ""}
        `}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M7.5 2v11M2 7.5h11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
        </svg>
        <span className="text-white text-sm font-medium tracking-wide">{t(label)}</span>
      </button>
    </Link>
  );
}

export default AddBtn;
