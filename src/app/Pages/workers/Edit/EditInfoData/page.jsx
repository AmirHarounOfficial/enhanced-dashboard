"use client"
import { Dialog } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import PhoneNumber from './Dialogs/PhoneNumber';
import Email from './Dialogs/Email';
import Password from './Dialogs/Password';
import WorkAreas from './Dialogs/WorkAreas';
import Location from './Dialogs/Location/Location';
import WorkingHours from './Dialogs/WorkingHours';
import NationalIdentityInformation from './Dialogs/NationalIdentityInformation';
import Job from './Dialogs/Job';
import { IMAGE_BASE_URL } from '../../../../../../config/imageUrl';

import { UpdateWorkerThunk } from '@/redux/slice/Workers/WorkersSlice';
import { useDispatch } from 'react-redux';

function EditInfoDataPage({ worker, loading }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  /**api */







  // images
    const fileInputRef = useRef(null);
  
    const [imagePreview, setImagePreview] = useState(null)
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    const handleFileSelect = () => {
      fileInputRef.current?.click();
    };
  
    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const allowedTypes = ["image/webp", "image/png", "image/svg+xml", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        alert(t("Please select a valid image file (WEBP, PNG, SVG, JPG)"));
        return;
      }
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert(t("File size should not exceed 5MB"));
        return;
      }
      
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      
      // Auto upload immediately
      const formData = new FormData();
      formData.append('id', worker?.id);
      formData.append('image', file);

      await dispatch(UpdateWorkerThunk(formData));
      
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
  
    const handleDeleteFile = () => {
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
  
    /** */
    const [openPhoneNumber, setOpenPhoneNumber] = useState(false);//PhoneNumber
    const [openEmail , setOpenEmail] = useState(false); //Email  
    const [openPassword , setOpenPassword] = useState(false); //Password
    const [openLocation , setOpenLocation] = useState(false); //Location  
    const [openWorkAreas , setOpenWorkAreas] = useState(false); //Work areas
    const [openWorkingHours , setOpenWorkingHours] = useState(false); //WorkingHours
    const [openNationalIdentityInformation , setOpenNationalIdentityInformation] = useState(false); //NationalIdentityInformation
    const [openJob , setOpenJob] =useState(false);  //Job
  return (
    <>
      {/* image */}
      <div className="  w-full p-8 mb-8 flex justify-center border border-[#E3E8EF] rounded-[6px]">
        <div className="py-4 px-6  w-[35%]">
          <div className="flex flex-col items-center w-full">
             <div className="relative">
              <img
                src={imagePreview || `${IMAGE_BASE_URL}${worker?.image}`}
                alt="Company Logo"
                className={`w-37.5 h-37.5 object-cover border border-[#EEF2F6] p-1 rounded-full ${loading ? 'opacity-50' : ''}`}
              />
              {loading && (
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                 </div>
              )}
             </div>

              <p className='mt-3 text-[#364152] text-xl font-medium'>{`${worker?.firstname} ${worker?.lastname}`}</p>
              <div className='flex gap-2 mt-3.5 mb-6'>
                <span className='text-[#4B5565] text-lg font-normal'> {`(${worker?.designation?.name})`}</span>
                <p className='flex gap-1'>
                  {worker?.average_rating !== null ? (
                    <>
                      <span className=' flex items-center'>  
                        <img src="/images/icons/star.svg" className='w-4 h-4' alt="" />
                      </span>
                      <span className='text-[#FDB022] text-sm font-medium flex items-center'>{worker?.average_rating}</span>
                    </>
                  ):""}
                
                </p>
              </div>

              <button
                type="button"
                className="w-full flex  justify-center gap-2 border text-[var(--color-primary)] font-medium py-2.5 px-4 rounded-[6px] cursor-pointer disabled:opacity-50"
                onClick={handleFileSelect}
                disabled={loading}
              >
                <span>{loading ? t("Updating...") : t("Image selection")}</span>  
                {!loading && <span><img src="/images/upload.svg" alt="" /></span>}
              </button>

          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".webp,.png,.svg,.jpg,.jpeg,image/webp,image/png,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      
      <section className='grid grid-cols-2 gap-6 '>
        
        {/* Mobile number */}
        <div className='border border-[#E3E8EF] flex justify-between py-3 px-4'>
          <div>
            <p className='text-[#697586] text-base font-normal mb-2'>{t('Mobile number')}</p>
            <p className='text-[#364152] text-base font-normal '>{worker?.phone}</p>
          </div>
          <div className='flex justify-center items-center'>
            <button onClick={() => setOpenPhoneNumber(true)} className=' w-10 h-10 flex items-center justify-center border border-[var(--color-primary)] rounded-[6px] cursor-pointer'>
              <img src="/images/icons/EditYellow.svg"  alt="" />
            </button>
          </div>
        </div>

        {/* Email */}
        <div className='border border-[#E3E8EF] flex justify-between py-3 px-4'>
          <div>
            <p className='text-[#697586] text-base font-normal mb-2'>{t('Email')}</p>
            <p className='text-[#364152] text-base font-normal '>{worker?.email}</p>
          </div>
          <div className='flex justify-center items-center'>
            <button onClick={() => setOpenEmail(true)} className=' w-10 h-10 flex items-center justify-center border border-[var(--color-primary)] rounded-[6px] cursor-pointer'>
              <img src="/images/icons/EditYellow.svg" alt="" />
            </button>
          </div>
        </div>

        {/* password */}
        <div className='border border-[#E3E8EF] flex justify-between py-3 px-4'>
          <div>
            <p className='text-[#697586] text-base font-normal mb-2'>{t('password')}</p>
            <p className='text-[#364152] text-base font-normal '>************</p>
          </div>
          <div className='flex justify-center items-center'>
            <button onClick={() => setOpenPassword(true)} className=' w-10 h-10 flex items-center justify-center border border-[var(--color-primary)] rounded-[6px] cursor-pointer'>
              <img src="/images/icons/EditYellow.svg" alt="" />
            </button>
          </div>
        </div>

        {/* Working hours */}
        <div className='border border-[#E3E8EF] flex justify-between py-3 px-4'>
          <div>
            <p className='text-[#697586] text-base font-normal mb-2'>{t('Working hours')}</p>
            <p className='text-[#364152] text-base font-normal '>{worker?.working_time}</p>
          </div>
          <div className='flex justify-center items-center'>
            <button onClick={()=>setOpenWorkingHours(true)} className=' w-10 h-10 flex items-center justify-center border border-[var(--color-primary)] rounded-[6px] cursor-pointer'>
              <img src="/images/icons/EditYellow.svg" alt="" />
            </button>
          </div>
        </div>

        {/* the address  */}
        <div className='border border-[#E3E8EF] flex justify-between py-3 px-4'>
          <div>
            <p className='text-[#697586] text-base font-normal mb-2'>{t('the address')}</p>
            <p className='text-[#364152] text-base font-normal '>{worker?.city} - {worker?.state}</p>
          </div>
          <div className='flex justify-center items-center'>
            <button onClick={()=>setOpenLocation(true)} className=' w-10 h-10 flex items-center justify-center border border-[var(--color-primary)] rounded-[6px] cursor-pointer'>
              <img src="/images/icons/EditYellow.svg" alt="" />
            </button>
          </div>
        </div>

        {/* workplace */}
        <div className='border border-[#E3E8EF] flex justify-between py-3 px-4'>
          <div>
            <p className='text-[#697586] text-base font-normal mb-2'>{t('Workplaces')}</p>
            <p className='text-[#364152] text-base font-normal '>
              {worker?.handyman_areas ?.map(area => area.city) .join(" - ")}
            </p>
          </div>
          <div className='flex justify-center items-center'>
            <button onClick={()=>setOpenWorkAreas(true)} className=' w-10 h-10 flex items-center justify-center border border-[var(--color-primary)] rounded-[6px] cursor-pointer'>
              <img src="/images/icons/EditYellow.svg" alt="" />
            </button>
          </div>
        </div>

        {/* National Identity Information */}
        <div className='border border-[#E3E8EF] flex justify-between py-3 px-4'>
          <div>
            <p className='text-[#364152] text-base font-normal mb-2'>{t('National Identity Information')}</p>
          </div>
          <div className='flex justify-center items-center'>
              <button onClick={()=> setOpenNationalIdentityInformation(true)} className=' w-10 h-10 flex items-center justify-center border border-[var(--color-primary)]  rounded-[6px] cursor-pointer'>
            <img src="/images/icons/arrowyellowOnly.svg" alt="" />
          </button>
          </div>
        
        </div>

        {/* Job */}
        <div className='border border-[#E3E8EF] flex justify-between py-3 px-4'>
          <div>
            <p className='text-[#697586] text-base font-normal mb-2'>{t('job')}</p>
            <p className='text-[#364152] text-base font-normal '>{worker?.designation?.name}</p>
          </div>
          <div className='flex justify-center items-center'>
            <button onClick={()=>setOpenJob(true)} className=' w-10 h-10 flex items-center justify-center border border-[var(--color-primary)] rounded-[6px] cursor-pointer'>
              <img src="/images/icons/EditYellow.svg" alt="" />
            </button>
          </div>
        </div>

      </section>



      <PhoneNumber openPhoneNumber={openPhoneNumber} setOpenPhoneNumber={setOpenPhoneNumber} worker={worker} />
      <Email openEmail={openEmail} setOpenEmail={setOpenEmail} worker={worker}/>
      <Password openPassword={openPassword} setOpenPassword={setOpenPassword} worker={worker}/>
      <WorkingHours openWorkingHours={openWorkingHours} setOpenWorkingHours={setOpenWorkingHours} worker={worker}/>
      <Location openLocation={openLocation} setOpenLocation={setOpenLocation} worker={worker}/>
      <WorkAreas openWorkAreas={openWorkAreas} setOpenWorkAreas={setOpenWorkAreas} worker={worker} />
      <NationalIdentityInformation openNationalIdentityInformation={openNationalIdentityInformation}  setOpenNationalIdentityInformation={setOpenNationalIdentityInformation} worker={worker}/>
      <Job openJob={openJob} setOpenJob={setOpenJob} worker={worker}/>

    </>
  )
}

export default EditInfoDataPage


