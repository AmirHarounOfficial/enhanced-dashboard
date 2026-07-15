'use client'
import { styled, Switch } from "@mui/material";
import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import EditPage from "./Edit/page";
import { IMAGE_BASE_URL } from "../../../../../config/imageUrl";
import ConfirmDelete from "./ConfirmDelete";

const sideConfig = {
  right:  { cls: 'bg-[#FEE4E2] border-[#F04438] text-[#F04438]', label: 'Right side' },
  left:   { cls: 'bg-[#EFF4FF] border-[#518BFF] text-[#004EEB]', label: 'Left side' },
  top:    { cls: 'bg-[#FFFAEB] border-[#F79009] text-[#DC6803]', label: 'Top side' },
  bottom: { cls: 'bg-[#DCFAE6] border-[#067647] text-[#067647]', label: 'Bottom side' },
};

function CardOfViews({getViews, handleDelete, handleToggle, refreshViews}) {
  const {t} = useTranslation()

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    width: 53, height: 24, padding: 0,
    "& .MuiSwitch-switchBase": {
      margin: 3, padding: 0,
      transitionDuration: `${theme.transitions.duration.standard}ms`,
      "&.Mui-checked": {
        transform: "translateX(29px)", color: "#fff",
        "& + .MuiSwitch-track": { backgroundColor: "#10B981", opacity: 1, border: 0 },
      },
    },
    "& .MuiSwitch-thumb": { width: 18, height: 18, boxSizing: "border-box" },
    "& .MuiSwitch-track": { borderRadius: 12, backgroundColor: "#E9E9EA", opacity: 1,
      transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.standard }),
    },
  }));

  const [openEdit, setOpenEdit] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [selectedViewId, setSelectedViewId] = useState(null);
  console.log(getViews);

  const actionBtn = 'flex items-center justify-center gap-1.5 rounded-[6px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer transition-colors duration-150 hover:bg-[#F8FAFC] text-[#364152] text-sm'

  return (
    <>
      <div className='grid grid-cols-1 lg1:grid-cols-2 gap-4'>
        {getViews?.data?.map((view) => {
          const side = sideConfig[view?.side];
          return (
            <div key={view?.id} className='bg-white border border-[#E3E8EF] rounded-[8px] p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer'>
              <div className="flex justify-between items-center mb-3">
                <div className='flex gap-3 items-center'>
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-[8px] flex-shrink-0"
                    style={{ background: view?.hex_code }}
                  >
                    <img src={`${IMAGE_BASE_URL}${view?.icon}`} alt="" className="w-6 h-6" />
                  </div>
                  <p className='text-[#364152] text-base font-semibold'>{view?.name}</p>
                </div>
                <GreenSwitch checked={view?.status} onChange={() => handleToggle(view?.id)} />
              </div>

              <div className="flex justify-between items-center mb-3">
                <p className="text-[#697586] text-sm">
                  {view?.status === true ? t('Visible to customers') : t('Invisible to customers')}
                </p>
                {side && (
                  <span className={"inline-flex items-center gap-1 text-xs font-medium h-7 px-2.5 rounded-2xl border " + side.cls}>
                    {t(side.label)}
                  </span>
                )}
              </div>

              <hr className='border-[#E3E8EF] mb-3' />

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setSelectedViewId(view?.id); setOpenEdit(true) }}
                  className={actionBtn}
                >
                  <img src="/images/icons/EditYellow.svg" className='w-4 h-4' alt="" />
                  {t('modification')}
                </button>
                <button onClick={() => setDeleteId(view?.id)} className='flex items-center justify-center gap-1.5 rounded-[6px] border border-[#FEE4E2] px-2 h-10 w-full cursor-pointer transition-colors duration-150 hover:bg-[#FEE4E2] text-[#D92D20] text-sm'>
                  <img src="/images/icons/delete-darkRed.svg" className='w-4 h-4' alt="" />
                  {t('delete')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <EditPage open={openEdit} setOpen={setOpenEdit} viewId={selectedViewId} refreshViews={refreshViews} />
      <ConfirmDelete deleteId={deleteId} setDeleteId={setDeleteId} handleDelete={handleDelete} />
    </>
  )
}

export default CardOfViews
