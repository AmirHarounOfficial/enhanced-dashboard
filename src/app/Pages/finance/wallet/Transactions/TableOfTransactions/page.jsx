"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Pagination from './Pagination';
import DeleteDialogPage from './DeleteDialog/page';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteTransactionThunk } from '@/redux/slice/Finance/FinanceSlice';

const statusConfig = {
  completed: { cls: 'bg-[#DCFAE6] border-[#067647] text-[#067647]',   icon: '/images/icons/Active Status.svg',  label: 'Acceptable' },
  pending:   { cls: 'bg-[#EFF4FF] border-[#518BFF] text-[#004EEB]',   icon: '/images/icons/Under review.svg',   label: 'Under review' },
  rejected:  { cls: 'bg-[#FEE4E2] border-[#F97066] text-[#D92D20]',   icon: '/images/icons/refused Status.svg', label: 'rejected' },
};

function TableOfTransactionsPage({WalletTransactionsData, loading, error, currentPage, totalPages, handlePageChange, activeTab, setActiveTab}) {
  const {t, i18n} = useTranslation()
  const active = activeTab;
  const setActive = setActiveTab;
  const filteredTransactions = WalletTransactionsData;

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [selectedTransactionId, setSelectedTransactionId] = useState(null)

  const handleDelete = (transactionId) => {
    dispatch(deleteTransactionThunk(transactionId))
  }

  const formatDateTimeByLang = (dateString, lang) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const isArabic = lang === "ar";
    const datePart = new Intl.DateTimeFormat(isArabic ? "ar-EG" : "en-US", { day: "numeric", month: isArabic ? "long" : "short", year: "numeric" }).format(date);
    const timePart = new Intl.DateTimeFormat(isArabic ? "ar-EG" : "en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(date);
    return isArabic ? `${datePart} : ${timePart}` : `${datePart} - ${timePart}`;
  };

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
            <img src="/images/icons/Transactions.svg" alt="" className='w-5 h-5' />
          </div>
          <div>
            <p className='text-[#364152] text-base font-semibold'>{t('Withdrawal transactions')}</p>
            <p className='text-[#697586] text-xs font-normal'>{t('Track withdrawals and easily check their status.')}</p>
          </div>
        </div>

        <div className="flex bg-[#EEF2F6] rounded-[8px] p-1 w-[280px]">
          {[{ key: "completed", label: "Complete" }, { key: "review", label: "Under review" }].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={"flex-1 px-3 py-2 rounded-[6px] text-sm font-medium transition-all duration-150 cursor-pointer " + (active === tab.key ? "bg-[#C69815] text-white shadow-sm" : "text-[#697586] hover:text-[#364152]")}
            >
              {t(tab.label)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 mb-5 data-table-wrap overflow-x-auto">
        <table className="min-w-[1000px] lg1:w-full text-sm text-right">
          <thead className="bg-[#F8FAFC] border-b border-[#E3E8EF] text-[#697586] sticky top-0 z-10">
            <tr>
              <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Transaction number")}</th>
              <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("the date")}/{t("the time")}</th>
              <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Amount paid")}</th>
              <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Status")}</th>
              {active === "review" && <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("procedures")}</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3E8EF] bg-white">
            {loading ? (
              <tr><td colSpan={active === "review" ? 5 : 4} className="text-center py-10"><CircularProgress size="3rem" color="warning" /></td></tr>
            ) : filteredTransactions?.length > 0 ? (
              filteredTransactions.map((finance) => (
                <tr key={finance?.id} className="hover:bg-[#F9F5E8] cursor-pointer transition-colors duration-100 text-[#697586]">
                  <td className="p-4 text-[#364152] font-medium">#{finance?.id}</td>
                  <td className="p-4 tabular-nums">{formatDateTimeByLang(finance?.created_at, i18n.language)}</td>
                  <td className="p-4 text-[#C69815] font-semibold tabular-nums">{finance?.amount}</td>
                  <td className='p-4'><StatusBadge status={finance?.status} /></td>
                  {active === "review" && (
                    <td className='p-4'>
                      <button
                        onClick={() => { setSelectedTransactionId(finance?.id); setOpen(true) }}
                        className="w-8 h-8 flex items-center justify-center rounded-[6px] hover:bg-[#FEE4E2] transition-colors duration-150"
                      >
                        <img src="/images/icons/delete-darkRed.svg" alt="" className="w-4 h-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={active === "review" ? 5 : 4} className="text-center py-10 text-[#697586]">
                  {t('No transactions found for the selected status')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <DeleteDialogPage open={open} setOpen={setOpen} transactionId={selectedTransactionId} onDelete={handleDelete} />
    </>
  )
}

export default TableOfTransactionsPage
