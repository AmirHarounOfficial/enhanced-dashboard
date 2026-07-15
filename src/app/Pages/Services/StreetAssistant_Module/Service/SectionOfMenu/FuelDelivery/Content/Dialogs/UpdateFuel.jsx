'use client'
import { Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import DeleteDialog from './DeleteDialog'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFuelPriceThunk, updateFuelPriceThunk, getFuelPricesThunk } from '@/redux/slice/Services/ServicesSlice'



function UpdateFuel({open , setOpen, fuelData}) {
  
  const {t}= useTranslation();
  const dispatch = useDispatch();
  const { loadingList } = useSelector((state) => state.services);
  const GreenSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
      width: 53,
      height: 24,
      padding: 0,
      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 3,
        transitionDuration: '500ms',
        '&.Mui-checked': {
          transform: 'translateX(31px)', 
          color: '#fff',
          '& + .MuiSwitch-track': {
            backgroundColor: '#10B981',
            opacity: 1,
            border: 0,
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: '#33cf4d',
          border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
          color: theme.palette.grey[100],
        },
      },
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 18,
        height: 18,
      },
      '& .MuiSwitch-track': {
        borderRadius: 24 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
          duration: 500,
        }),
      },
  }));

  // Form state
  const [isActive, setIsActive] = useState(false)
  const [fuelPrice, setFuelPrice] = useState('')

  
  
  // type of fuel (1)
  // =========================
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);

  useEffect(() => {
    if (fuelData) {
      setIsActive(fuelData?.is_active || false)
      setSelected1(fuelData?.type_name || null)
      setFuelPrice(fuelData?.price || '')
    }
  }, [fuelData])

  const [openDelete , setOpenDelete] = useState(false)

  const handleOpenDelete = ()=>{
    setOpen(false)
    setOpenDelete(true)
  }

  const handleDelete = () => {
    if (fuelData?.id) {
      dispatch(deleteFuelPriceThunk(fuelData.id)).unwrap().then(() => {
        setOpenDelete(false)
        setOpen(false)
      })
    }
  }

  const handleUpdate = () => {
    if (!fuelData?.id || !fuelPrice) {
      alert(t('Please fill all fields'));
      return;
    }

    const formData = {
      id: fuelData.id,
      price: fuelPrice,
      is_active: isActive ? 1 : 0
    };

    dispatch(updateFuelPriceThunk(formData))
      .unwrap()
      .then(() => {
        // Refresh fuel prices list
        dispatch(getFuelPricesThunk());
        // Close dialog
        setOpen(false);
      })
      .catch((error) => {
        console.error('Failed to update fuel price:', error);
        alert(t('Failed to update fuel price'));
      });
  }

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

      <p className='flex justify-center text-[#364152] text-lg font-bold mb-6'>{t('Fuel type modification')}</p>

      <section className='p-6'>
        {/*  */}
        <div className='flex justify-between items-center px-4 py-3 mb-3 border border-[#E3E8EF] rounded-[10px]'>
          <p className='text-[#4B5565] text-base font-normal '>{t('Fuel activation')}</p>
          <GreenSwitch 
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>

          {/* ==========type of fuel  ========== */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-sm font-medium mb-2 block">
              {t("Fuel type")}
            </label>

            <div className="relative w-full">
              <input
                type="text"
                placeholder={t("Choose fuel type")}
                value={selected1 || ''}
                disabled
                className="h-11 px-4 w-full text-sm text-[#364152] bg-[#EEF2F6] border border-[#E3E8EF] rounded-[10px] cursor-not-allowed opacity-75 placeholder-[#9AA4B2]"
              />
            </div>
          </div>

          {/* ========== price  ========== */}
          <div className='flex flex-col gap-1.5 my-4'>
            <label className="text-[#364152] text-sm font-medium mb-2 block">{t('the price')}({t('pound')})</label>
            <input
              type="text"
              placeholder={t('Enter the price')}
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
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
              onClick={handleUpdate}
              disabled={loadingList}
              className='btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold disabled:opacity-50'
            >
              {loadingList ? t('Loading...') : t('Save changes')}
            </button>
            <button onClick={handleOpenDelete} className='flex-1 h-11 rounded-[10px] border border-[#F04438] text-[#F04438] text-sm font-semibold cursor-pointer'>
              {t('delete')}
            </button>
          </div>
          

      </section>
    </Dialog>

    <DeleteDialog open={openDelete} setOpen={setOpenDelete} onConfirm={handleDelete} />
    </>
  )
}

export default UpdateFuel



