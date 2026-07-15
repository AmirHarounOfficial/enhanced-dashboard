'use client'
import { getActiveFuelTypesThunk, createFuelPriceThunk, getFuelPricesThunk } from '@/redux/slice/Services/ServicesSlice';
import { Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';

function AddFuel({open , setOpen}) {
  const {t}= useTranslation();

  //api
  const dispatch = useDispatch()
  const {ActiveFuel, loadingList } = useSelector((state) => state.services)

  const[formData , setFormData]=useState({
    price:'',
    type_id:'',
    is_active:1
  })

  const handleSubmit = () => {
    if (!formData.type_id || !formData.price) {
      alert(t('Please fill all fields'));
      return;
    }

    dispatch(createFuelPriceThunk(formData))
      .unwrap()
      .then(() => {
        // Reset form
        setFormData({ price: '', type_id: '', is_active: 1 });
        setSelected1(null);
        setSearchValue1('');
        // Refresh fuel prices list
        dispatch(getFuelPricesThunk());
        // Close dialog
        setOpen(false);
      })
      .catch((error) => {
        console.error('Failed to create fuel price:', error);
        alert(t('Failed to add fuel price'));
      });
  }

  useEffect(() => {
    if (!ActiveFuel || ActiveFuel.length === 0) {
      dispatch(getActiveFuelTypesThunk());
    }
  }, [dispatch, ActiveFuel]);


  // type of fuel (1)
  // =========================
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const optionFuel = Array.isArray(ActiveFuel?.data) ? ActiveFuel.data  : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);        };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "AddFuel-dialog" }}
    >
      <section className="px-6 mt-6">
        <button onClick={() => setOpen(false)} className="modal-close" aria-label={t('cancel')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>

      </section>
      <p className='flex justify-center text-[#364152] text-lg font-bold mb-8'>{t('Add fuel type')}</p>

      <section className='p-6'>
          {/* ==========type of fuel  ========== */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-sm font-medium mb-2 block">
              {t("Fuel type")}
            </label>

            <div className="relative w-full" ref={dropdownRef1}>
              <div
                className="relative flex items-center border border-[#E3E8EF] rounded-[10px] cursor-pointer bg-white transition-all duration-150 hover:border-[#C69815]/40"
                onClick={() => setOpen1(!open1)}
              >
                <input
                  type="text"
                  placeholder={t("Choose fuel type")}
                  value={selected1 || searchValue1}
                  onChange={(e) => {
                    setSearchValue1(e.target.value);
                    setOpen1(true);
                    setSelected1(null);
                  }}
                  className="h-11 px-4 w-full text-sm text-[#364152] bg-transparent outline-none placeholder-[#9AA4B2] rounded-[10px]"
                />

                <span className="absolute end-3 pointer-events-none">
                  {open1 ? (
                    <img src="/images/icons/ArrowUp.svg" alt="up" />
                  ) : (
                    <img src="/images/icons/ArrowDown.svg" alt="down" />
                  )}
                </span>
              </div>

              {open1 && (
                <ul className="absolute left-0 right-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10 max-h-48 overflow-y-auto">
                  {optionFuel
                    .filter((opt) =>
                      opt.name.toLowerCase().includes(searchValue1.toLowerCase())
                    )
                    .map((opt) => (
                      <li
                        key={opt.id}
                        onClick={() => {
                          setSelected1(opt.name);
                          setFormData({ ...formData, type_id: opt.id });
                          setOpen1(false);
                          setSearchValue1("");
                        }}
                        className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                      >
                        {opt.name}
                      </li>
                    ))}
                </ul>
              )}

            </div>
          </div>


          <div className='flex flex-col gap-1.5 my-4'>
            <label className="text-[#364152] text-sm font-medium mb-2 block">{t('the price')}({t('pound')})</label>
            <input
              type="text"
              placeholder={t('Enter the price')}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className='w-full border border-[#E3E8EF] rounded-[10px] px-4 h-11 text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]'
              />
          </div>

          {/* note */}
          <ul className='bg-[#EEF2F6] p-3 mb-4'>
            <li className='text-[#775B0D] text-sm font-normal'>{t('The price must match the official prices to avoid account suspension.')}</li>
          </ul>

          {/* btn */}
          <div className="modal-footer">
            <button
              onClick={handleSubmit}
              disabled={loadingList}
              className='btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold disabled:opacity-50'
            >
              {loadingList ? t('Loading...') : t('addition')}
            </button>
          </div>

      </section>
    </Dialog>
    </>
  )
}

export default AddFuel


