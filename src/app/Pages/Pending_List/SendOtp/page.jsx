'use client'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import WrongOtpPage from './WrongOtp/page'
import DetailsBookingLoginPage from '../DetailsBookingLogin/page'
import { useDispatch } from 'react-redux'
import { scanWaitlistThunk } from '@/redux/slice/Pending_List/Pending_ListSlice'

function SendOtpPage({open , setOpen , guestID ,guestDetails, refresh}) {
  const {t} = useTranslation()
  const [openWrongOtp , setWrongOtp] = useState(false)
  const [openDetailsBookingLogin , setOpenDetailsBookingLogin] = useState(false)

  const [bookingToken, setBookingToken] = useState('');
  //api
  const dispatch = useDispatch()
  console.log('guestDetails====' , guestDetails);

  const [formData , setFormData] = useState({
    qr_token:'',
  })

const handleSubmit = async () => {
  try {
    const payload = {
      qr_token: formData.qr_token,
      reservation_id: guestID,
    };

    const result = await dispatch(scanWaitlistThunk(payload)).unwrap();

    console.log(result);

    if (result?.code === 422) {
      setWrongOtp(true);
      return;
    }

    setBookingToken(formData.qr_token)
    setOpenDetailsBookingLogin(true);

    setTimeout(() => {
      setOpen(false);
    }, 100);

  } catch (error) {
    console.log(error);

    setWrongOtp(true);

    setTimeout(() => {
      setOpen(false);
    }, 100);
  }
};




  
  

  return (
  <>
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
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Enter the booking code")}</p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />


      {/*  */}

      <div className='p-6'>
        {/* otp */}
        <div className='w-full flex flex-col gap-1.5'>
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('Booking code')}</span>
          </p>  
          <input 
            type="text"
            name='title'
            value={formData.qr_token}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                qr_token: e.target.value,
              }))
            }
            placeholder='XXXXXX'
          
            className={`w-full h-14 text-center  p-3 border border-[#C8C8C8]  text-sm text-[#364152]  rounded-[6px] outline-none `}
          />
        </div>
        {/* note */}
        <p className='text-[#697586] text-sm font-normal mt-2'>{t('Enter the 6-letter/number code')}</p>


        {/* btn */}
        <div className="w-full flex gap-3 mt-6">
          
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
            {t('confirmation')}
          </button>
        </div>
      
      </div>
      

    
  
  
    </Dialog>


    <WrongOtpPage
      open={openWrongOtp}
      setOpen={setWrongOtp}
      setOpenOtp ={setOpen}
    />

    <DetailsBookingLoginPage
      open={openDetailsBookingLogin}
      setOpen={setOpenDetailsBookingLogin}
      guestID={guestID}
      refresh={refresh}
      token={bookingToken}
    />



  </>

    
  )
}

export default SendOtpPage


