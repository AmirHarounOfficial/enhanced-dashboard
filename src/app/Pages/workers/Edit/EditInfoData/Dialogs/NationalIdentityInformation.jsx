"use client"
import { Dialog } from '@mui/material'
import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import dayjs from "dayjs";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateWorkerThunk } from '@/redux/slice/Workers/WorkersSlice';

function NationalIdentityInformation({openNationalIdentityInformation , setOpenNationalIdentityInformation ,worker}) {
    const {t}= useTranslation();
  
  // التاريخ النهائي
  const id_end_date = worker?.id_end_date;


  const checkEndDate = (date) => {
    const today = dayjs();
    const endDate = dayjs(date);
    const diffInDays = endDate.diff(today, "day");   //   [تاريخ الانتهاء-تاريخ اليوم] 


    if(diffInDays <= 0) {
      return {status: "expired" , message: "يجب تحديث هذا الملف بشكل فوري لتجنب ايقاف الحساب", color: "#F04438", icon:"/images/icons/red warning.svg" };
    } else if (diffInDays < 30) {
      return {status: "warning" , message:"يلزم تحديث صورة البطاقة قبل موعد انتهائه", color:"#DC6803", icon:'/images/icons/orange warning.svg' , datee:date };
    }else if(id_end_date === null){
      return {status: "waiting" , message: "لم يتم مراجعة هذا الملف بعد", color: "#697586" };
    }else{
      return {status: "done" , message:""};
    }


  };

  const { message, color , icon  ,datee ,status} = checkEndDate(id_end_date);
  const renderButton = (status, inputRef) => {
    switch(status) {
      case "expired":
        return (
          <button className="p-2" onClick={() => inputRef.current.click()}>
            <img src="/images/icons/EditYellow.svg" />
          </button>
        );

      case "warning":
        return (
          <button className="p-2" onClick={() => inputRef.current.click()}>
            <img src="/images/icons/EditYellow.svg" />
          </button>
        );

      case "expiredToday":
        return (
          <button className="p-2" onClick={() => inputRef.current.click()}>
            <img src="/images/icons/EditYellow.svg" />
          </button>
        );

      case "waiting":
        return (
          <img src='/images/icons/remove-circle.svg' />
          
        );

      case "done":
        return (
          
            <img src="/images/icons/_Checkbox base.svg" />
        );
    }
  };

  // Helper to extract filename from URL
  const getFileNameFromUrl = (url) => {
    if (!url) return null;
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  // Helper to get file extension from URL
  const getFileExtensionFromUrl = (url) => {
    if (!url) return 'PNG';
    const filename = getFileNameFromUrl(url);
    const ext = filename?.split('.').pop()?.toUpperCase() || 'PNG';
    return ext;
  };

  const [frontFiles, setFrontFiles] = useState([
    { name: "بطاقة الشخصية الأمامية", size: "تم الرفع", type: "PNG", url: null }
  ]);
  const [backFiles, setBackFiles] = useState([
    { name: "بطاقة الشخصية خلفية", size: "تم الرفع", type: "PNG", url: null }
  ]);

  // Initialize from backend data when worker changes
  useEffect(() => {
    if (worker?.id_front) {
      const fileName = getFileNameFromUrl(worker.id_front) || "بطاقة الشخصية الأمامية";
      const fileExt = getFileExtensionFromUrl(worker.id_front);
      setFrontFiles([{ name: fileName, size: "تم الرفع", type: fileExt, url: worker.id_front }]);
    }
    if (worker?.id_back) {
      const fileName = getFileNameFromUrl(worker.id_back) || "بطاقة الشخصية خلفية";
      const fileExt = getFileExtensionFromUrl(worker.id_back);
      setBackFiles([{ name: fileName, size: "تم الرفع", type: fileExt, url: worker.id_back }]);
    }
  }, [worker]);

  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);

  const handleFileChange = (e, setFiles) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split('.').pop().toUpperCase();
      const sizeKB = Math.round(file.size / 1024);
      setFiles([
        { name: file.name, size: `${sizeKB} كيلوبايت`, type: extension, url: URL.createObjectURL(file), originFile: file }
      ]);
    }
  };

  // Redux
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.workers);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('id', worker?.id);
    
    // Check if new front file selected
    if (frontFiles.length > 0 && frontFiles[0].originFile) {
      formData.append('id_front', frontFiles[0].originFile);
    }

    // Check if new back file selected
    if (backFiles.length > 0 && backFiles[0].originFile) {
      formData.append('id_back', backFiles[0].originFile);
    }
    
    // Only dispatch if there are changes (optional check, but good for performance)
    // But since we might be re-submitting, we'll dispatch anyway
    
    const result = await dispatch(UpdateWorkerThunk(formData));
    if (UpdateWorkerThunk.fulfilled.match(result)) {
      setOpenNationalIdentityInformation(false);
    }
  };


  return (
    <>
      <Dialog 
          open={openNationalIdentityInformation} 
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{ className: "ServicePage-dialog" }}
        >
        {/* close btn */}
        <button onClick={()=>setOpenNationalIdentityInformation(false)} className="modal-close" aria-label={t('cancel')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>

        {/* head */}
        <div className='flex flex-col gap-5 items-center justify-center mb-8'>
          {/* icon */}
          <div className='bg-[#EEF2F6] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center '>
            <div className='bg-[#CDD5DF] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
              <img src="/images/icons/National Identity Information.svg" className="w-7.5 h-7.5"  />
            </div>
          </div>

          {/* title */}
          <p className='text-[var(--color-primary)] text-xl font-bold'>{t('National Identity Information')}</p>

        </div>
        
        <div className=' px-6 '>


          {/* National Identity Information */}
          <div className="flex flex-col w-full mb-6">
            <label className="text-[#364152] text-sm font-medium mb-2 block">{t('National ID number')}</label>
            <input
              type="text"
              value={worker?.national_id}
              readOnly
              placeholder={t('Enter your national ID number')}
              className="w-full h-11 px-4 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]" />
          </div>



          
          {/* Front & Back  national ID card photo */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-[#364152] text-sm font-medium mb-2 block">{t('Personal card')}</label>

              <div className="space-y-4">
                  {/* Front */}
                  {frontFiles.map((file, index) => (
                    <div key={index} className="flex items-center p-4 border border-[#E3E8EF] rounded-[10px] gap-4 bg-white shadow-sm">
      
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <img src="/images/filephoto.svg" className="w-12 h-12" />
                        <span className="absolute bottom-0 right-2  text-white text-[10px] px-1 py-0.5 rounded-sm">
                          {file.type}
                        </span>
                      </div>

                      <div className="flex-1">
                        <p className="text-[#364152] font-semibold">{file.name}</p>
                        <p className="text-[#697586] text-sm">{file.size}</p>
                      </div>
        
                      {renderButton(status, frontInputRef)}

                    </div>
                  ))}

                  <input
                    type="file"
                    ref={frontInputRef}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setFrontFiles)}
                  />

                  {/* Back */}
                  {backFiles.map((file, index) => (
                    <div key={index} className="flex items-center p-4 border border-[#E3E8EF] rounded-[10px] gap-4 bg-white shadow-sm">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <img src="/images/filephoto.svg" className="w-12 h-12" />
                        <span className="absolute bottom-0 right-2  text-white text-[10px] px-1 py-0.5 rounded-sm">
                          {file.type}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#364152] font-semibold">{file.name}</p>
                        <p className="text-[#697586] text-sm">{file.size}</p>
                      </div>
                      {renderButton(status, backInputRef)}
                    </div>
                  ))}

                  <input
                    type="file"
                    ref={backInputRef}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setBackFiles)}
                  />

                  </div>


              {/* //id_end_date */}
              <div style={{ color }} className=" flex gap-2">
                <img src={icon} alt="" />
                <p className='text-sm font-normal'>{message}  {datee ? `(${dayjs(datee).format("YYYY-MM-DD")})` : ""}</p>
              </div>

            </div>





          <div className="modal-footer">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold">
              {loading ? t('loading...') : t('save')}
            </button>
            <button onClick={()=>setOpenNationalIdentityInformation(false)} className="btn-ghost flex-1">
              {t('cancel')}
            </button>
          </div>
        </div>
        
        </Dialog>

    </>
  )
}

export default NationalIdentityInformation




