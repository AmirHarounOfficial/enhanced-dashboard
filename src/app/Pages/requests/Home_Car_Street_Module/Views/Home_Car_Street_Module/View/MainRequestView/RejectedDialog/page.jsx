"use client"
import { getRejectionReasonsThunk, UpdateBookingThunk } from '@/redux/slice/Requests/RequestsSlice';
import { Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function RejectedDialogPage({ open, handleClose ,bookingDetails }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { RejectionReasons, loading, error } = useSelector((state) => state.requests);

  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const [notesValue, setNotesValue] = useState("");
  const dropdownRef1 = useRef(null);

  useEffect(() => {
    dispatch(getRejectionReasonsThunk());
  }, [dispatch]);

  const handleConfirmReject = () => {
    const cancel_reason = selected1 === "other" ? notesValue : selected1;
    dispatch(
      UpdateBookingThunk({
        id: bookingDetails?.id,
        formData: {
          status: 'rejected',
          reason: selected1,
          notes: notesValue,
          cancel_reason
        }
      })
    );
    handleClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


    
  return (
    <>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      <section className="flex justify-between px-6 mt-6">
        {/* close btn*/}
        <button
          onClick={handleClose}
          className="border border-[#E3E8EF] w-12 h-12 cursor-pointer rounded-[100px] flex justify-center items-center"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
        
        <div className="w-14 h-14 bg-[#EEF2F6] rounded-[100px] flex justify-center items-center">
          <p className="bg-[#E3E8EF] flex items-center justify-center w-10 h-10 rounded-[100px]">
            <img src="/images/icons/shopping-basket-remove.svg" alt="" className="w-6 h-6" />
          </p>
        </div>
      </section>


      <section className='p-6'>
        <p className='text-[#364152] text-lg font-medium mb-2'>{t('Do you want to decline the request?')}</p>
        <p className='text-[#4B5565]  text-sm font-normal'>{t('Refusing the request means not following up on it or implementing it.')}</p>
      </section>

      <span className="border-[0.5px] border-[#E3E8EF]" />

      <section className='p-6'>
        <div>
          {/* Reason for rejection */}
          <div className="flex flex-col mb-4">
            <label className="text-[#364152] text-base font-normal mb-3">
              {t("Reason for rejection")}
            </label>

            <div className="relative w-full" ref={dropdownRef1}>
              <div
                className="relative flex items-center border border-[#C8C8C8] rounded-[6px] cursor-pointer"
                onClick={() => setOpen1(!open1)}
              >
                <input
                  type="text"
                  placeholder={t("Choose the reason for rejection")}
                  value={selected1 || searchValue1}   
                  onChange={(e) => {
                    setSearchValue1(e.target.value);
                    setOpen1(true);
                    setSelected1(null);
                  }}
                  className="h-15 p-3 w-full text-[#364152] focus:outline-none"
                />

                <span className="absolute left-3 pointer-events-none">
                  {open1 ? (
                    <img src="/images/icons/ArrowUp.svg" alt="up" />
                  ) : (
                    <img src="/images/icons/ArrowDown.svg" alt="down" />
                  )}
                </span>
              </div>

              {open1 && (
                <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[8px] shadow-md z-10 max-h-48 overflow-y-auto">
                  {RejectionReasons
                    .filter((opt) =>
                      opt?.reason?.toLowerCase().includes(searchValue1.toLowerCase())
                    )
                    .map((opt) => (
                      <li
                        key={opt.id}
                        onClick={() => {
                          setSelected1(opt?.reason);
                          setOpen1(false);
                          setSearchValue1("");
                        }}
                        className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                      >
                        {opt?.reason}
                      </li>
                    ))}
                  {/* Static "other" option */}
                  {"other".includes(searchValue1.toLowerCase()) && (
                  <li
                    key="other"
                    onClick={() => {
                      setSelected1("other");
                      setOpen1(false);
                      setSearchValue1("");
                    }}
                    className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {t('other')}
                  </li>
                  )}
                </ul>
              )}

            </div>
          </div>


          {selected1 === "other" && (
            <div>
              <label className="text-[#364152] text-base font-normal mb-3">
                {t('Explaining the reason for rejection')}
              </label>
              <textarea
                className="w-full mt-3 h-33 border border-[#C8C8C8] rounded-[8px] p-3 text-[#364152] focus:outline-none resize-none"
                placeholder={t('Explain the reason for the rejection to the customer.')}
                value={notesValue}
                onChange={(e) => setNotesValue(e.target.value)}
              ></textarea>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 pb-6 flex gap-4 ">
        <button
          className="w-42.5 h-11 bg-[var(--color-primary)] cursor-pointer  text-[#fff] rounded-[8px] text-base font-medium"
          onClick={handleConfirmReject}
        >
          {t('send')}
        </button>

        <button
          className="w-35 h-11 border border-[#B42318] cursor-pointer  text-[#B42318] rounded-[8px] text-base font-medium"
          onClick={handleClose}
        >
          {t('cancel')}
        </button>
      </section>
    

    </Dialog>
    </>
  )
}

export default RejectedDialogPage



