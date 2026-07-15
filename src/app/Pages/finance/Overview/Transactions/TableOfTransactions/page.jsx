"use client";
import { CircularProgress } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const statusConfig = {
  paid:     { bg: 'bg-[#DCFAE6]', border: 'border-[#067647]', text: 'text-[#067647]', icon: '/images/icons/Active Status.svg',  labelKey: 'paid' },
  refunded: { bg: 'bg-[#FEF0C7]', border: 'border-[var(--color-primary)]', text: 'text-[var(--color-primary)]', icon: '/images/icons/refunded.svg',       labelKey: 'refunded' },
  pending:  { bg: 'bg-[#FEE4E2]', border: 'border-[#F97066]', text: 'text-[#D92D20]', icon: '/images/icons/refused Status.svg', labelKey: 'pending_finance' },
};

const methodConfig = {
  cash: { bg: 'bg-[#F9F5E8]', border: 'border-[var(--color-primary)]', text: 'text-[var(--color-primary)]', icon: '/images/icons/cash_yellow.svg', labelKey: 'cash_' },
  card: { bg: 'bg-[#F8FAFC]',  border: 'border-[#697586]',             text: 'text-[#697586]',             icon: '/images/icons/credit-card.svg',  labelKey: 'card' },
};

export default function TableOfTransactionsPage({ TransactionsData, loading }) {
  const { t, i18n } = useTranslation();

  const formatDateTimeByLang = (dateString, lang) => {
    if (!dateString) return "";
    const date = new Date(dateString.replace(" ", "T"));
    const isArabic = lang === "ar";
    const formatter = new Intl.DateTimeFormat(isArabic ? "ar-EG" : "en-US", {
      day: "numeric", month: "long", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });
    const formatted = formatter.format(date);
    return isArabic ? formatted.replace("،", " :") : formatted.replace(",", " :");
  };

  const Badge = ({ config, labelKey }) => {
    if (!config) return null;
    return (
      <span className={"inline-flex items-center gap-1.5 text-xs font-medium h-7 px-2.5 rounded-2xl border " + config.bg + " " + config.border + " " + config.text}>
        <img src={config.icon} alt="" className="w-3.5 h-3.5" />
        {t(labelKey ?? config.labelKey)}
      </span>
    );
  };

  return (
    <div className="data-table-wrap overflow-x-auto mt-4 mb-5">
      <table className="min-w-[1000px] lg1:w-full text-sm text-right">
        <thead className="text-[#364152]">
          <tr>
            {['Transaction number','Service name','Name of the worker','Customer name','the date','Amount paid','payment method','Status'].map((h) => (
              <th key={h} className="p-4 font-medium text-xs uppercase tracking-wide">{t(h)}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E3E8EF]">
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center py-10">
                <CircularProgress size="3rem" color="warning" />
              </td>
            </tr>
          ) : TransactionsData?.length > 0 ? (
            TransactionsData.map((finance) => (
              <tr
                key={finance?.id}
                className="hover:bg-[#F9F5E8] cursor-pointer transition-colors duration-150 text-[#697586]"
              >
                <td className="p-4 text-[#364152] font-medium">#{finance?.id}</td>
                <td className="p-4">{finance?.service?.title}</td>
                <td className="p-4">{finance?.handyman?.firstname} {finance?.handyman?.lastname}</td>
                <td className="p-4">{finance?.user?.firstname} {finance?.user?.lastname}</td>
                <td className="p-4 text-xs">{formatDateTimeByLang(finance?.created_at, i18n.language)}</td>
                <td className="p-4 text-[var(--color-primary)] font-semibold">{finance?.amount}{finance?.currency}</td>
                <td className="p-4"><Badge config={methodConfig[finance?.payment_method]} /></td>
                <td className="p-4"><Badge config={statusConfig[finance?.payment_status]} /></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-10 text-[#697586]">
                {t("No data found")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
