"use client"
import React, { useEffect, useState } from 'react'
import NullStatusPage from './NullStatus/page';
import PendingStatusPage from './PendingStatus/page';
import RejectedStatusPage from './RejectedStatus/page';
import ActiveStatusPage from './ActiveStatus/page';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CardMarketerThunk } from '@/redux/slice/Setting/SettingSlice';

function Marketer_PanelPage({userData}) {
  const {t}=useTranslation()
  //api
  const dispatch = useDispatch()
  const {cardData , loading , error}= useSelector((state)=>state.setting)
  
  useEffect(()=>{
    dispatch(CardMarketerThunk())
  },[dispatch])

  useEffect(() => {
    if (cardData) {
      setIsMarketer(cardData.is_markter);
      setMarketerStatus(cardData.markter_status);
    }
  }, [cardData]);

  const [is_marketer, setIsMarketer] =useState(cardData?.is_markter);
  const [marketerStatus, setMarketerStatus] = useState(cardData?.markter_status) // [pending , active , rejected , null ]

  return (
    <>
    <div className='border border-[#E3E8EF]' >

      {/* // Header */}
      <div className=' px-6 py-4  flex gap-2 '>
          <p className='w-10 h-10 bg-[#FEF0C7] flex justify-center items-center rounded-[6px]'>
          <img src="/images/icons/user-searchBlue.svg" alt=""  className='w-5 h-5 '/>
        </p>
        <p className='flex items-center text-[#364152] text-base font-normal'>{t('Marketer Panel')}</p>
      </div>
      <hr className='border-0.5 border-[#E4E6EF]'/>

      {/* // Content */}
      <div className='p-6'>
        {
          (()=>{
            if(marketerStatus === null){                                             //marketer?.status=== null && is_marketer===false || marketer?.status=== null && is_marketer===true
              return <NullStatusPage is_marketer={is_marketer} setIsMarketer={setIsMarketer} setMarketerStatus={setMarketerStatus} userData={userData}/>
            }else if(marketerStatus=== 'pending'){
              return <PendingStatusPage/>
            }else if(marketerStatus=== 'rejected'){
              return <RejectedStatusPage setMarketerStatus={setMarketerStatus}/>
            }else if(marketerStatus=== 'active'){
              return <ActiveStatusPage is_marketer={is_marketer} setIsMarketer={setIsMarketer} cardData={cardData}/>
            }
          })  ()
        }
      </div>
    
    </div>
  
    </>
  )
}

export default Marketer_PanelPage
