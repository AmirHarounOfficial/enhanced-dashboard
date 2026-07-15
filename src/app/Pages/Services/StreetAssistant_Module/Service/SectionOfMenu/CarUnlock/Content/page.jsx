'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getStreetServiceByIdThunk, streetAssistantStatusThunk, updateServiceSettingStatusThunk, updateServiceSettingThunk } from '@/redux/slice/Services/ServicesSlice'

function ContentPage() {
  const {t} = useTranslation()

  /**api */
  const dispatch = useDispatch()
  const { streetServices, loadingList , mainStatus: reduxMainStatus} = useSelector((state) => state.services)
  const batteryReviveService = streetServices?.find(service => service.id === 37)
  
  const [mainStatus, setMainStatus] = useState(false)
  const [serviceStatus, setServiceStatus] = useState(false)
  const [price, setPrice] = useState('')
  const [isDayOnly, setIsDayOnly] = useState(0)

  useEffect(() => {
    dispatch(getStreetServiceByIdThunk())
  }, [dispatch])

  useEffect(() => {
    if (batteryReviveService?.settings) {
      setServiceStatus(batteryReviveService.settings.status === 1)
      setPrice(batteryReviveService.settings.price || '')
      setIsDayOnly(batteryReviveService.settings.is_day_only)
    }
  }, [batteryReviveService])

    useEffect(() => {
      if (reduxMainStatus !== null && reduxMainStatus !== undefined) {
        setMainStatus(reduxMainStatus === 1)
      }
    }, [reduxMainStatus])
  
    const handleSave = () => {
      if (!batteryReviveService?.settings?.id) return;

      const data = {
        service_setting_id: batteryReviveService.settings.id,
        price: price,
        is_day_only: isDayOnly,
      }

      dispatch(updateServiceSettingThunk(data))
        .unwrap()
        .then(() => {
          dispatch(getStreetServiceByIdThunk()) // Refresh data after update
        })
        .catch((error) => {
          console.error("Failed to update settings:", error)
        })
    }

  const handleStatusChange = (e) => {
    const newStatus = e.target.checked;
    setServiceStatus(newStatus); // Update UI immediately

    if (!batteryReviveService?.settings?.id) return;

    const data = {
      service_setting_id: batteryReviveService.settings.id,
      status: newStatus ? 1 : 0
    }

    dispatch(updateServiceSettingStatusThunk(data))
      .unwrap()
      .then(() => {
        dispatch(getStreetServiceByIdThunk()) // Refresh data to stay in sync
      })
      .catch((error) => {
        console.error("Failed to update status:", error)
        setServiceStatus(!newStatus); // Revert UI on failure
      })
  }

    const handleMainStatusChange = (e) => {
      const newStatus = e.target.checked;
      setMainStatus(newStatus); // Update UI immediately
  
      const formData = new FormData();
      formData.append('street_assistant_status', newStatus ? 1 : 0);
  
      dispatch(streetAssistantStatusThunk(formData))
        .unwrap()
        .then(() => {
          console.log("Street assistant status updated successfully")
        })
        .catch((error) => {
          console.error("Failed to update main status:", error)
          setMainStatus(!newStatus); // Revert UI on failure
        })
    }

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
  
if (loadingList) {
    return (
      <div className='p-6 flex items-center justify-center'>
        <p className='text-[#4B5565]'>{t('Loading...')}</p>
      </div>
    )
  }

  return (
    <>
      <div className=' p-6'>
        <p className='hidden'>{batteryReviveService?.settings?.id}</p>
        <div className='border border-[#E3E8EF] p-6'>
          {/*  */}
          <div className='flex justify-between items-center px-6 py-4 mb-8 border border-[#E3E8EF] rounded-[6px]'>
            <p className='text-[#4B5565] text-base font-normal '>{t('Activation of all services')}</p>
            <GreenSwitch
              checked={mainStatus}
              onChange={handleMainStatusChange}
            />
          </div>

          {/*  */}
          <div className='flex gap-3 w-full mb-6'>
            {/* Total profits */}
            <section className='border border-[#E3E8EF] rounded-[6px] p-4 w-full'>
              {/* title */}
              <div className='flex items-center gap-3 '>
                <p className='w-10 h-10 bg-[#FEF0C7] flex items-center justify-center rounded-[6px]'>
                  <img src="/images/icons/cash.svg" alt="" />
                </p>
                <p className='text-[#4B5565] text-base font-normal'>{t('Total profits')}</p>
              </div>

              <div className='py-2.5'>
                <p className='text-[#202939] text-lg font-medium'>{batteryReviveService?.bookings_sum || 0}</p>
              </div>

            </section>

            {/* Number of requests */}
            <section className='border border-[#E3E8EF] rounded-[6px] p-4 w-full'>
              {/* title */}
              <div className='flex items-center gap-3 '>
                <p className='w-10 h-10 bg-[#FEF0C7] flex items-center justify-center rounded-[6px]'>
                  <img src="/images/icons/Invoice_Orange.svg" alt="" />
                </p>
                <p className='text-[#4B5565] text-base font-normal'>{t('Number of requests')}</p>
              </div>

              <div className='py-2.5'>
                <p className='text-[#202939] text-lg font-medium'>
                  <span>{batteryReviveService?.bookings_count || 0}</span>
                  <span>{t('Requests')}</span>
                
                </p>
              </div>

            </section>

          </div>

          {/*  */}
          <div className='border border-[#E3E8EF] p-6'>
          
            {/*  */}
            <div className='flex gap-4 mb-6'>
              <p className='text-[#4B5565] text-base font-normal '>{t('Activate the service')}</p>
              <GreenSwitch 
                checked={serviceStatus}
                onChange={handleStatusChange} 
              />
            </div>

            {/*  */}
            <div className='flex flex-col gap-1.5 mb-4'>
              <label className="text-[#364152] text-sm font-normal">{t('Car unlocking price')}</label>
              <input 
                type="text"
                placeholder={t('Enter the price')}
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                className='border border-[#C8C8C8] w-full h-14 px-3 outline-none'
                />
            </div>

            {/* note */}
            <ul className='bg-[#EEF2F6] p-3 mb-4'>
              <li className='text-[#775B0D] text-sm font-normal'>{t('You must verify that the customer owns the car before performing the service and upload proof of ownership after completion.')}</li>
            </ul>

            {/*  */}
            <div>
              <p className='text-[#4B5565] text-sm font-normal mb-3'>{t('Is the service available only during daytime hours?')}</p>
                {[
                  { label: t('yes'), value: 1 },
                  { label: t('no'), value: 0 }
                ].map((item, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="day_service"
                    className="peer hidden"
                    checked={isDayOnly === item.value}
                    onChange={() => setIsDayOnly(item.value)}
                  />

                  <span className="w-5 h-5 mb-2 rounded-full border border-gray-400 flex items-center justify-center peer-checked:bg-[var(--color-primary)] peer-checked:border-0">
                    <img src="/images/icons/checkWhite.svg" alt="" />
                  </span>

                  <span className='mb-2 text-[#697586] text-sm font-normal'>{item.label}</span>
                </label>
              ))}

            </div>

          </div>

          {/* btn */}
          <button 
            onClick={handleSave}
            className='bg-[var(--color-primary)] text-white text-base font-medium h-11 w-[25%] rounded-[6px] my-6 cursor-pointer'>
            {t('It was completed')}
          </button>

        </div>
      </div>
    
    </>
  )
}

export default ContentPage


