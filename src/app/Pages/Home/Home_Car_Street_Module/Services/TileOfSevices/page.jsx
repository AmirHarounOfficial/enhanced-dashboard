'use client';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getModuleTitle } from '../../../../../../../config/getModuleTitle';
import { changeStatusThunk } from '@/redux/slice/Home/HomeSlice';
import { getProfileThunk } from '@/redux/slice/Setting/SettingSlice';

function TileOfSevicesPage({current_module_key}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.setting);

  useEffect(()=>{
    dispatch(getProfileThunk())
  },[dispatch])

console.log('profileData*********************', profileData?.provider?.is_active);

  const handleStatusChange = (event) => {
    const token = event.target.checked;
    dispatch(changeStatusThunk(token)).then(() => {
      dispatch(getProfileThunk());
    });
  };

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

  const title = getModuleTitle(current_module_key, t)
  const isActive = profileData?.provider?.is_active;

  return (
    <div className='page-hero flex justify-between items-center gap-4 flex-wrap mb-6'>
      <div>
        <p className='text-[#364152] text-xl font-semibold leading-tight'>{title}</p>
        <p className='text-[#697586] text-sm font-normal mt-0.5'>تابع وادِر طلبات الخدمات المنزلية بسهولة وكفاءة.</p>
      </div>

      <div className={`
        flex items-center gap-3 px-4 py-3
        border rounded-[8px] min-w-[200px]
        transition-colors duration-200
        ${isActive
          ? 'border-[#10B981] bg-[#F0FDF4]'
          : 'border-[#E3E8EF] bg-white'}
      `}>
        <div className='flex flex-col'>
          <p className='text-[#364152] text-sm font-medium'>{t('Current situation')}</p>
          <p className={`text-xs font-normal mt-0.5 ${isActive ? 'text-[#10B981]' : 'text-[#9AA4B2]'}`}>
            {isActive ? t('Active') : t('Inactive')}
          </p>
        </div>
        <GreenSwitch checked={isActive} onChange={handleStatusChange} />
      </div>
    </div>
  )
}

export default TileOfSevicesPage
