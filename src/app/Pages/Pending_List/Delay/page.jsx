"use client"
import { delayWaitlistThunk } from '@/redux/slice/Pending_List/Pending_ListSlice'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

function DelayPage({open , setOpen , guestID , guestDetails }) {
  const{t} = useTranslation()
// console.log("guestDetails_______" ,guestDetails);
// console.log('guestID' , guestID);
  const dispatch = useDispatch();


  



  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);

  const DelayTime = [
    {name:5 , value:5},
    {name:10 , value:10},
    {name:15 , value:15},
    {name:20 , value:20},
  ]

  const DelayReason = [
    {id:1 , name:t("It hasn't arrived yet.") , value:'did_not_arrive'},
    {id:2 , name:t("Request for postponement") , value:'asked_for_delay'},
    {id:3 , name:t("No response") , value:'do_not_answer'},
    {id:4 , name:t("Another reason") , value:'other'},
  ]

  const [formData , setFormData] = useState({
    delay_time:'',
    reason:'',

  })

  const handleSubmit = async () => {
    try {
      await dispatch(
        delayWaitlistThunk({
          reservation_id: guestID,
          delay_time: formData.delay_time,
          reason: formData.reason,
        })
      ).unwrap();

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };


  console.log('formData',formData);

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* header */}
      <section className="flex justify-end px-6 mt-6">
        <button
          onClick={()=>setOpen(false)}
          className="border border-[#E3E8EF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      </section>
      <section className="mt-4 px-6">
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Guest delay")}</p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />


      {/*  */}

        <div className='p-6'>
        
        <section className='bg-[#F8FAFC] border border-[#EEF2F6] p-3 rounded-[6px] mb-4 flex gap-1'>
          <img src="/images/icons/user_gray.svg" alt="" />
          <p className='text-[#697586] text-base font-normal'>{t('guest')} : </p>
          <p className='text-[#364152] text-base font-normal'>{guestDetails?.guest_name} </p>
        </section>

      
        {/*Delay period  */}
        <div className='mt-4'>
          <p className=' font-normal'>
            <span className='text-[#364152] text-base'>{t('Delay period')}</span> 
          </p>
          
          <div className='grid grid-cols-2 gap-4 my-1.5'>
            {DelayTime?.map((item, index)=>(
              <div 
                key={index} 
                onClick={() => {
                  setSelectedTime(index)
                  setFormData((prev)=>({
                    ...prev,
                    delay_time:item?.value
                  }))
                }}
                className={`py-2.5 px-2 flex gap-2 justify-center items-center rounded-[6px] cursor-pointer border ${
                  selectedTime === index
                    ? 'border-[var(--color-primary)] bg-[#FFFDF5]'
                    : 'border-[#E3E8EF]'
                }`}
              >
                <img src="/images/icons/clock-gray.svg" alt="" />
                <p className='text-[#364152] text-base font-normal'>{item?.name} دقائق</p>
              </div>
            ))}
            
            
          </div>

        </div>

        {/*the reason */}
        <div className='mt-4'>
          <p className=' font-normal'>
            <span className='text-[#364152] text-base'>{t('the reason')}</span> 
          </p>
          
          <div className='grid grid-cols-1 gap-4 my-1.5'>
            {DelayReason?.map((item)=>(
              <div  
                key={item?.id} 
                onClick={() =>{
                  setSelectedReason(item.id)
                  setFormData((prev)=>({
                    ...prev,
                    reason:item?.value,

                  }))
                }}
                className={`py-2.5 px-2 flex items-center rounded-[6px] cursor-pointer border ${
                  selectedReason === item.id
                    ? 'border-[var(--color-primary)] bg-[#FFFDF5]'
                    : 'border-[#E3E8EF] bg-white'
                }`}
              >
                <p className='text-[#364152] text-base font-normal'>{item?.name}</p>
              </div>
            ))}
          
          </div>

        </div>




        {/* btn */}
        <section className="w-full flex gap-3 mt-6">
          
          <button
            onClick={()=>setOpen(false)}
            className="w-full h-11 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[6px] cursor-pointer"
          >
            {t('cancel')}
          </button>

          <button
            onClick={handleSubmit}
            className="w-full h-14 bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer"
          >
            {t('Delay confirmed')}
          </button>
        </section>


      </div>


    </Dialog>
  )
}

export default DelayPage


