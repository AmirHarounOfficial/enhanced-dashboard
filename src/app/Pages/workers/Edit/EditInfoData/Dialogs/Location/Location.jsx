

"use client"
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Map from './Map';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateWorkerThunk } from '@/redux/slice/Workers/WorkersSlice';

function Location({openLocation , setOpenLocation ,worker}) {
    const {t}= useTranslation();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.workers);

      //Map
    const [openMap , setOpenMap] = useState(false);
      const [address, setAddress] = useState("");
      const [city, setCity] = useState("");
      const [state, setState] = useState("");
      const [country, setCountry] = useState("");

      const handleClickOpen = () => setOpenMap(true);
      const handleClose = () => setOpenMap(false);
      const handleLocationSelect = async (lat, lng) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await response.json();
          const formattedAddress = data.display_name || "Unknown address";
          const addr = data.address || {};

          setAddress(formattedAddress);
          setCity(addr.city || addr.town || addr.village || addr.county || "");
          setState(addr.state || addr.region || "");
          setCountry(addr.country || "");
          
          setOpenMap(false);
        } catch (error) {
          console.error("Error fetching address:", error);
          setAddress(`Latitude: ${lat}, Longitude: ${lng}`); 
        }
      };

    
    // //api
    useEffect(()=>{
      if(worker){
        setAddress(worker?.address || "");
        setCity(worker?.city || "");
        setState(worker?.state || "");
        setCountry(worker?.country || "");
      }
    } , [worker , openLocation])

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('id', worker?.id);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('country', country);
      
      const result = await dispatch(UpdateWorkerThunk(formData));
      if (UpdateWorkerThunk.fulfilled.match(result)) {
        setOpenLocation(false);
      }
    };
  
  return (
    <>
      <Dialog 
          open={openLocation} 
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{ className: "LocationPage-dialog" }}
        >
        <button className='pt-8 px-6 pb-2 cursor-pointer' onClick={()=>setOpenLocation(false)}>
          <p className='border border-[#DDD] rounded-[100%] w-10 h-10 flex justify-center items-center  '>
            <img src="/images/icons/xx.svg" alt="" />
          </p>
        </button>


        <div className='flex flex-col gap-5 items-center justify-center mb-8'>
          {/* icon */}
          <div className='bg-[#EEF2F6] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center '>
            <div className='bg-[#CDD5DF] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
              <img src="/images/icons/LocationBlack.svg" className="w-7.5 h-7.5"  />
            </div>
          </div>

          {/* title */}
          <p className='text-[var(--color-primary)] text-xl font-bold'>{t('Change address')}</p>

        </div>
        
          <div className=' px-6 '>
            <div className="flex flex-col relative">
                  <label className="text-[#364152] text-base font-normal mb-3">
                    {t("Address")}
                  </label>

                  <textarea
                    readOnly
                    placeholder={t("Choose the title")}
                    value={address}
                    
                    className="h-fit p-3 pl-10  resize-none  border border-[#C8C8C8] outline-[#C69815] rounded-[6px] placeholder:text-[#9A9A9A]"
                  />

            {/* Icon inside textarea - left side */}
            <img
              src="/images/icons/location.svg"
              alt=""
              onClick={handleClickOpen}
              className="w-6 h-6 absolute left-3 top-[55px] cursor-pointer" 
            />
            </div>

            <div className='my-6 flex gap-3'>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className='w-full h-11 bg-[var(--color-primary)] text-[#fff] cursor-pointer rounded-[6px] flex justify-center items-center disabled:opacity-50'>
                {loading ? t('loading...') : t('save')}
              </button>
              <button onClick={()=>setOpenLocation(false)} className='w-full h-11 border border-[var(--color-primary)] text-[var(--color-primary)] cursor-pointer rounded-[6px] flex justify-center items-center '>
                {t('cancel')}
              </button>
            </div>
          </div>
        
        </Dialog>

        <Map
        openMap={openMap}
        handleClose={handleClose}
        onSelectLocation={handleLocationSelect} 
      />
    </>
  )
}

export default Location


