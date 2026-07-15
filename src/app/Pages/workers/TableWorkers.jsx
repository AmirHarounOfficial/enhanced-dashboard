"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IMAGE_BASE_URL } from "../../../../config/imageUrl";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import DeletePage from "./Model/Delete/page";
import { useDispatch } from "react-redux";
import { deleteWorkerThunk } from "@/redux/slice/Workers/WorkersSlice";

export default function TableWorkers({workers , loading}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setSelectedWorkerId(id);
    setOpen(true);
  };
  const handleClosee = () => {
    setOpen(false);
    setSelectedWorkerId(null);
  };

  const handleDeleteWorker = () => {
    if (selectedWorkerId) {
      dispatch(deleteWorkerThunk(selectedWorkerId));
      handleClosee();
    }
  };

  const StatusRender = (status) => {
    if (status === true || status === "true") {
      return (
        <span className='inline-flex items-center gap-1.5 bg-[#DCFAE6] border border-[#067647] text-[#067647] text-xs font-medium h-7 px-2.5 rounded-2xl'>
          <img src="/images/icons/Active Status.svg" alt="" className='w-3 h-3' />
          {t('active')}
        </span>
      );
    } else {
      return (
        <span className='inline-flex items-center gap-1.5 bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] text-xs font-medium h-7 px-2.5 rounded-2xl'>
          <img src="/images/icons/refused Status.svg" alt="" className='w-3 h-3'/>
          {t('inactive')}
        </span>
      );
    }
  };

  const [imgError, setImgError] = useState(false);
  const router = useRouter();

  const handleEditClick = (id) => {
    router.push(`/Pages/workers/Edit?id=${id}`);
  };

  return (
    <div className="data-table-wrap overflow-x-auto mt-2 mb-5">
      <table className="min-w-[1000px] lg1:w-full text-sm text-right">
        {/* Table Head */}
        <thead className="text-[#697586]">
          <tr>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("User code")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Name of the worker")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("job")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Working hours")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("phone number")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("Status")}</th>
            <th className="p-4 font-medium text-xs uppercase tracking-wide">{t("procedures")}</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-[#E3E8EF] bg-white">
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center py-14">
                <CircularProgress size="2.5rem" color="warning" />
              </td>
            </tr>
          ) : workers.length > 0 ? (
            workers.map((worker) => (
              <tr
                key={worker.id}
                className="table-row-hover cursor-pointer transition-colors duration-100 text-[#697586]"
              >
                <td className="p-4 text-[#364152] font-medium">#{worker?.id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2.5">
                    {worker?.image === null || imgError ? (
                      <div className="w-8 h-8 rounded-full bg-[#EEF2F6] border border-[#E3E8EF] flex justify-center items-center text-[#697586] text-xs font-semibold">
                        {worker?.firstname?.charAt(0)}{worker?.lastname?.charAt(0)}
                      </div>
                    ) : (
                      <img
                        src={`${IMAGE_BASE_URL}${worker?.image}`}
                        alt={worker.worker}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-[#E3E8EF]"
                        onError={() => setImgError(true)}
                      />
                    )}
                    <span className="text-[#364152] font-medium">{worker?.firstname} {worker?.lastname}</span>
                  </div>
                </td>
                <td className="p-4">{worker?.designation?.name}</td>
                <td className="p-4">{worker?.working_time}</td>
                <td className="p-4 font-mono text-xs">{worker?.phone}</td>
                <td className="p-4">{StatusRender(worker.is_active)}</td>
                <td className="p-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditClick(worker.id)}
                      className="icon-btn w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#E3E8EF] cursor-pointer"
                      title={t('Edit')}
                    >
                      <img src="/images/icons/EditBlack.svg" alt="" className="w-4 h-4"/>
                    </button>
                    <button
                      className="icon-btn w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#FEE4E2] cursor-pointer hover:bg-[#FEE4E2]"
                      onClick={() => handleClickOpen(worker.id)}
                      title={t('Delete')}
                    >
                      <img src="/images/icons/delete-darkRed.svg" alt="" className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-16">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-[#EEF2F6] rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9AA4B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <p className="text-[#364152] text-sm font-medium">{t("No workers found")}</p>
                  <p className="text-[#9AA4B2] text-xs">{t("Add your first worker to get started")}</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <DeletePage
        open={open}
        handleClosee={handleClosee}
        onDelete={handleDeleteWorker}
      />
    </div>
  );
}
