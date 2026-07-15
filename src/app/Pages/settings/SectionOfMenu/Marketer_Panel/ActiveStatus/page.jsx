"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import TableOfActivePage from './TableOfActive/page';
import CardOfActivePage from './CardOfActive/page';
import WithdrawDialogPage from './WithdrawDialog/page';


import { useRouter } from 'next/navigation';

function ActiveStatusPage({is_marketer , setIsMarketer , cardData}) {

  const {t} = useTranslation()
  const router = useRouter(); 

  const has_subscription = cardData?.is_subscriber;
  
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

  const handleToggle = (event) => {
    setIsMarketer(event.target.checked)
  }

const [open , setOpen] =useState(false);   
  
  return (
    <>
    <div className='flex justify-between items-center px-6 py-4 mb-8 border border-[#E3E8EF] rounded-[6px]'>
      <p className='text-[#4B5565] text-base font-normal '>{t('Activating the marketer dashboard')}</p>
      <GreenSwitch checked={is_marketer} onChange={handleToggle} />
    </div>

    <CardOfActivePage is_marketer={is_marketer} cardData={cardData} />

    {has_subscription ? (
      <div className='mt-6'>
        <button 
          onClick={() => is_marketer && router.push('/Pages/finance/wallet')}
          className={`
            ${is_marketer ?'bg-[var(--color-primary)] text-white cursor-pointer':'bg-[#E3E8EF] text-[#9AA4B2]'}
              w-62.5 h-11 py-2.5 px-4 rounded-[6px] text-base font-medium`
            }
        >
          {t('Open the wallet')}
        </button>
      </div>
    ) : (
      <>
        {is_marketer && <TableOfActivePage  />}
        <div className=' mt-6'>
          <button 
            onClick={() => is_marketer && setOpen(true)}
            className={`
              ${is_marketer ?'bg-[var(--color-primary)] text-white cursor-pointer':'bg-[#E3E8EF] text-[#9AA4B2]'}
                w-62.5 h-11 py-2.5 px-4 rounded-[6px] text-base font-medium`
              }
        >
          {t('withdrawal request')}
        </button>
        </div>
      </>
    )}

    <WithdrawDialogPage open={open} setOpen={setOpen} />
    </>
  )
}

export default ActiveStatusPage


