"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const Pagination = ({ totalPages = 1, currentPage = 1, onPageChange }) => {
  const { t } = useTranslation();

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    if (onPageChange) onPageChange(page);
  };

  const generatePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  const pages = generatePages();
  const isFirst = currentPage === 1;
  const isLast  = currentPage === totalPages;

  const navBtn = (disabled) =>
    disabled
      ? "flex items-center gap-2 px-4 h-9 rounded-[6px] border border-[#E3E8EF] text-[#9AA4B2] text-sm cursor-not-allowed select-none"
      : "flex items-center gap-2 px-4 h-9 rounded-[6px] border border-[#E3E8EF] text-[#364152] text-sm cursor-pointer transition-all duration-150 hover:bg-[#F8FAFC] hover:border-[#E3E8EF] active:scale-[0.97]";

  return (
    <div className="flex justify-between items-center mt-5 mb-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirst}
        className={navBtn(isFirst)}
      >
        <img src="/images/icons/arrow-right.svg" alt="" className="w-4 h-4" />
        <span>{t("the previous")}</span>
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
            className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-[6px] transition-all duration-150 ${
              page === currentPage
                ? "bg-[var(--color-primary)] text-white shadow-sm"
                : page === "..."
                ? "text-[#9AA4B2] cursor-default"
                : "border border-[#E3E8EF] text-[#697586] hover:bg-[#F8FAFC] hover:border-[#E3E8EF] cursor-pointer"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLast}
        className={navBtn(isLast)}
      >
        <span>{t("the next")}</span>
        <img src="/images/icons/arrow-left.svg" alt="" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;

