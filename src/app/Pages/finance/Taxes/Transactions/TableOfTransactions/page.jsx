"use client"
import { CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const statusConfig = {
  pending:  { cls: 'bg-[#DCFAE6] border-[#067647] text-[#067647]',   icon: '/images/icons/true_circle.svg',           label: 'Collected' },
  exported: { cls: 'bg-[#FEE4E2] border-[#F97066] text-[#F97066]',   icon: '/images/icons/checkmark-circle-false.svg', label: 'Non-collected' },
};

function TableOfTransactionsPage({TaxesTransactionsData , loading}) {
    const {t} = useTranslation()
    const [active, setActive] = useState("Collected");

    const filteredData = TaxesTransactionsData?.filter((item) => {
      if (active === "Collected") return item?.status === "pending";
      if (active === "Non-collected") return item?.status === "exported";
      return true;
    }) || [];

    const StatusBadge = ({ status }) => {
      const cfg = statusConfig[status];
      if (!cfg) return null;
      return (
        <span className={"inline-flex items-center gap-1.5 text-xs font-medium h-7 px-2.5 rounded-2xl border " + cfg.cls}>
          <img src={cfg.icon} alt="" className="w-3 h-3" />
          {t(cfg.label)}
        </span>
      );
    };

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 flex justify-center items-center bg-[#FEF0C7] rounded-[8px]'>
            <img src="/images/icons/tax dueBlue.svg" alt="" className='w-5 h-5' />
          </div>
          <p className='text-[#364152] text-base font-semibold'>{t('Estimated taxes on services')}</p>
        </div>

        <div className="flex bg-[#EEF2F6] rounded-[8px] p-1 w-[320px]">
          {["Collected", "Non-collected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={"flex-1 px-3 py-2 rounded-[6px] text-sm font-medium transition-all duration-150 cursor-pointer " + (active === tab ? "bg-[#C69815] text-white shadow-sm" : "text-[#697586] hover:text-[#364152]")}
            >
              {t(tab)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 mb-5 data-table-wrap overflow-x-auto">
        <table className="min-w-[1000px] lg1:w-full text-sm text-right">
          <thead className="bg-[#F8FAFC] border-b border-[#E3E8EF] text-[#697586] sticky top-0 z-10">
            <tr>
              <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Transaction number")}</th>
              <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Booking number")}</th>
              <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("the date")}/{t("the time")}</th>
              <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("tax due")} 14%</th>
              <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Net Profit")}</th>
              <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Status")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3E8EF] bg-white">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-10"><CircularProgress size="3rem" color="warning" /></td></tr>
            ) : filteredData?.length > 0 ? (
              filteredData.map((finance) => (
                <tr key={finance?.service_payment_id} className="hover:bg-[#F9F5E8] cursor-pointer transition-colors duration-100 text-[#697586]">
                  <td className="p-4 text-[#364152] font-medium">#{finance?.service_payment_id}</td>
                  <td className="p-4">#{finance?.booking_id}</td>
                  <td className="p-4 tabular-nums">{finance?.created_at}</td>
                  <td className="p-4 text-[#C69815] font-semibold tabular-nums">{finance?.total_tax}</td>
                  <td className="p-4 text-[#C69815] font-semibold tabular-nums">{finance?.amount}</td>
                  <td className="p-4"><StatusBadge status={finance?.status} /></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={6} className="text-center py-10"><CircularProgress size="3rem" color="warning" /></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableOfTransactionsPage
