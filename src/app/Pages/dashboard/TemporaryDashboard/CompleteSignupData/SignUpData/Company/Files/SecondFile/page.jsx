'use client';
import React, { useState } from 'react'
import ConfirmationDonePage from '../../ConfirmationDone/page'
import { Dialog } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSignupData } from '../../../../SignupDataContext';
import { SecondRegistrationThunk } from '@/redux/slice/Auth/AuthSlice';

function SecondFilePage({open , setOpen ,setOpenPrevious}) {
  const {t}= useTranslation();
  const { signupData, updateSignupData } = useSignupData();
  const dispatch = useDispatch();
    // Front national ID card photo 
    const file = signupData.id_front;
    const [progress, setProgress] = useState(0);
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type === "application/pdf") {
        updateSignupData({ id_front: selectedFile });
  
        let uploaded = 0;
        const interval = setInterval(() => {
          uploaded += 20;
          if (uploaded >= 100) {
            uploaded = 100;
            clearInterval(interval);
          }
          setProgress(uploaded);
        }, 500);
      }
    };
  
    const handleRemove = () => {
      updateSignupData({ id_front: null });
      setProgress(0);
    };

    //Back national ID card photo
    const BackFile = signupData.id_back;
    const[BackProgress , setBackProgress]= useState(0);
    
    const handleBackFileChange = (e)=>{
      const selectBackFile = e.target.files[0];
      if(selectBackFile && selectBackFile.type === "application/pdf" ){
        updateSignupData({ id_back: selectBackFile });
        let uploaded=0;
        const interval = setInterval(() => {
          uploaded += 20;
          if (uploaded >= 100) {
            uploaded = 100;
            clearInterval(interval);
          }
          setBackProgress(uploaded);
        }, 500);
      }
    }
    const handleBackRemove = () => {
      updateSignupData({ id_back: null });
      setBackProgress(0);
    };
  

  const [openConfirmation, setOpenConfirmation]= useState(false);
    const handlePrevious = () => {
      setOpen(false);
      setOpenPrevious(true);
    }
  
    const handleNext = async () => {
      const formData = new FormData();
      // Append text data
      Object.keys(signupData).forEach(key => {
          if (signupData[key] && key !== 'commercial_register' && key !== 'tax_card' && key !== 'id_front' && key !== 'id_back') {
              formData.append(key, signupData[key]);
          }
      });
  
      // Append files
      if (signupData.commercial_register instanceof File) formData.append('commercial', signupData.commercial_register);
      if (signupData.tax_card instanceof File) formData.append('tax_card', signupData.tax_card);
      if (signupData.id_front instanceof File) formData.append('id_front', signupData.id_front);
      if (signupData.id_back instanceof File) formData.append('id_back', signupData.id_back);
  
      const token = localStorage.getItem('token'); 
  
      try {
          await dispatch(SecondRegistrationThunk({ formData, token })).unwrap();
          setOpen(false);
          setOpenConfirmation(true);
      } catch (error) {
          console.error("Registration failed:", error);
      }
    }
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "COMPANY-dialog" }}
      >
        <section className="px-6 mt-6">
          <button
            onClick={() => setOpen(false)}
            className="border border-[#E3E8EF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
          </button>
      
        </section>

        <section className="pt-6  flex justify-center flex-col gap-4 items-center">
          <p className="text-[#364152] font-normal text-2xl">{t('Simple steps to complete your account')}</p>
          <p className="text-[var(--color-primary)] font-semibold text-xl">{t('Upload legal documents')}</p>
        </section>



      <section className="py-11 px-12.5">
          <div className=' border border-[#E3E8EF] p-10'>
            {/* note */}
            <ul className=" bg-[#EEF2F6] text-[#775B0D] text-base font-normal py-3 px-4 rounded-[6px] list-disc list-inside">
              <li className="mb-2 ">
                {t('The size of a single file must not exceed 10 MB.')}
              </li>
              <li className=" ">
                {t('The file format must be PDF.')}
              </li>
            </ul>
            
            
            {/* Front national ID card photo */}
            <div className="flex flex-col gap-3 mt-8">
              <label className="text-[#364152]">{t("Front national ID card photo")}</label>

              {!file ? (
                // === Initial state (placeholder upload box) ===
                <label className="flex items-center relative gap-2 h-15 p-3 border border-[#C8C8C8] rounded-[6px] text-[#9A9A9A] cursor-pointer">
                  <img
                    src="/images/icons/upload.svg"
                    alt="upload"
                    className="w-5 h-5 absolute left-3"
                  />
                  <span className="flex-1">
                    {t("Upload a photo of the front of your national ID card")}
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              ) : progress < 100? (
                // === Upload in progress UI ===
                <div className="border border-[#C8C8C8] rounded-[6px] p-3">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                      <img src="/images/icons/imageicon.svg" alt="pdf" className="w-5 h-5" />
                      <span className="text-sm text-[#364152] font-medium">
                        {file.name}
                      </span>
                    </div>
                    <button onClick={handleRemove} className="text-[var(--color-primary)]">
                      <img src="/images/icons/cancel-circle.svg" alt="" />
                    </button>
                  
                  </div>

                  <div className="flex items-center justify-between mt-2 text-xs text-[#364152] p-3">
                    <p className='flex gap-2'>
                      <p className='text-[#9D919F] text-sm font-normal '> • 60 ك ب من 120 م ب</p>
                      <img src="/images/icons/loading.svg" alt="" />
                      <span>{t("Loading...")}</span>
                    </p>
                    {/* <span>{progress}%</span> */}
                  </div>

                  <div className="w-full bg-[#E3E8EF] h-1 mt-1 rounded">
                    <div
                      className="bg-[var(--color-primary)] h-1 rounded"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

              ) : (

                // Final UI after upload complete
                <div className="border border-[#C8C8C8] rounded-[6px] p-3 h-15 flex items-center justify-between">
                    {/* file name + icon */}
                  <div className="flex items-center gap-2">
                    <img src="/images/icons/imageicon.svg" alt="pdf" className="w-5 h-5" />
                    <span className="text-sm text-[#656565] font-medium">{file.name}</span>
                  </div>
                  {/* delete button */}
                  <button onClick={handleRemove}>
                    <img src="/images/icons/delete.svg" alt="delete" className="w-5 h-5 text-[var(--color-primary)] cursor-pointer" />
                  </button>

                
                </div>
              )}
            </div>

            {/* Back national ID card photo */}
            <div className="flex flex-col gap-3 mt-6">
              <label className="text-[#364152]">{t("Back national ID card photo")}</label>

              {!BackFile ? (
                // === Initial state (placeholder upload box) ===
                <label className="flex items-center relative gap-2 h-15 p-3 border border-[#C8C8C8] rounded-[6px] text-[#9A9A9A] cursor-pointer">
                  <img
                    src="/images/icons/upload.svg"
                    alt="upload"
                    className="w-5 h-5 absolute left-3 cursor-pointer"
                  />
                  <span className="flex-1">
                    {t("Upload a photo of the back of your national ID card")}
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleBackFileChange}
                  />
                </label>
              ) : BackProgress < 100? (
                // === Upload in progress UI ===
                <div className="border border-[#C8C8C8] rounded-[6px] p-3">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                      <img src="/images/icons/imageicon.svg" alt="pdf" className="w-5 h-5" />
                      <span className="text-sm text-[#364152] font-medium">
                        {BackFile.name}
                      </span>
                    </div>
                    <button onClick={handleBackRemove} className="text-[var(--color-primary)]">
                      <img src="/images/icons/cancel-circle.svg" alt="" />
                    </button>
                  
                  </div>

                  <div className="flex items-center justify-between mt-2 text-xs text-[#364152] p-3">
                    <p className='flex gap-2'>
                      <p className='text-[#9D919F] text-sm font-normal '> • 60 ك ب من 120 م ب</p>
                      <img src="/images/icons/loading.svg" alt="" />
                      <span>{t("Loading...")}</span>
                    </p>
                    {/* <span>{progress}%</span> */}
                  </div>

                  <div className="w-full bg-[#E3E8EF] h-1 mt-1 rounded">
                    <div
                      className="bg-[var(--color-primary)] h-1 rounded"
                      style={{ width: `${BackProgress}%` }}
                    ></div>
                  </div>
                </div>

              ) : (

                // Final UI after upload complete
                <div className="border border-[#C8C8C8] rounded-[6px] p-3 h-15 flex items-center justify-between">
                    {/* file name + icon */}
                  <div className="flex items-center gap-2">
                    <img src="/images/icons/imageicon.svg" alt="pdf" className="w-5 h-5" />
                    <span className="text-sm text-[#656565] font-medium">{BackFile.name}</span>
                  </div>
                  {/* delete button */}
                  <button onClick={handleBackRemove}>
                    <img src="/images/icons/delete.svg" alt="delete" className="w-5 h-5 text-[var(--color-primary)] cursor-pointer" />
                  </button>

                
                </div>
              )}
            </div>

            {/* National ID number */}
            <div className='flex flex-col gap-3 my-6'>
              <label>{t('National ID number')} </label>
              <input type="text" className='h-15 p-3 border border-[#C8C8C8] rounded-[6px] outline-none'
                value={signupData.national_id}
                onChange={(e) => updateSignupData({ national_id: e.target.value })}
                placeholder={t('Enter your national ID number')}/>
            </div>

          <div className='flex gap-6 justify-between w-full'>
            <button 
              onClick={handlePrevious}
              className="px-4 py-2 w-full h-11 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[6px] cursor-pointer"
            >
              {t('the previous')}
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 w-full h-11 bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer"
            >
              {t('confirmation')}
            </button>
          </div>


          </div>
        </section>
      

      </Dialog>

      <ConfirmationDonePage open={openConfirmation} setOpen={setOpenConfirmation} />

    </>
  )
}

export default SecondFilePage



