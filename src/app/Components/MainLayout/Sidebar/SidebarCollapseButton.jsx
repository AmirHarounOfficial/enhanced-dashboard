"use client";
import React from "react";
import { useTranslation } from "react-i18next";

/**
 * Discoverable collapse/expand toggle for the desktop sidebar.
 * Hidden on mobile (the hamburger drawer is used there instead).
 */
export default function SidebarCollapseButton({ open, onToggle }) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? t("Collapse sidebar") : t("Expand sidebar")}
      title={open ? t("Collapse sidebar") : t("Expand sidebar")}
      className="sidebar-collapse-btn hidden lg1:flex"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className={`transition-transform duration-200 ${open ? "" : "rotate-180"}`}
      >
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
