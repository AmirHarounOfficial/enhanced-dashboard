"use client"
import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import FirstNote from './FirstNote';
import UploadImage from './UploadImage';
import UploadVideo from './UploadVideo';
import { useDispatch, useSelector } from 'react-redux';
import { addMediaThunk } from '@/redux/slice/Services/ServicesSlice';

const MIN_IMAGES = 5;

function MediaPage({prevStep , nextStep }) {
  const {t} = useTranslation();
  const router = useRouter();

  const dispatch = useDispatch();
  const {addBasicProperty} = useSelector((state) => state.services);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const[formData, setFormData] = useState({
    property_id:"",
    vr_path:"",
    images:[],
    video:null,
  })

  useEffect(() => {
    const propId = addBasicProperty?.id || sessionStorage.getItem('property_id');
    if (propId) {
      setFormData(prev => ({...prev, property_id: propId}));
    }
  }, [addBasicProperty]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // --- Frontend validation ---
    const validationErrors = [];
    if (formData?.images.length < MIN_IMAGES) {
      validationErrors.push(t(`Please upload at least ${MIN_IMAGES} images.`));
    }
    const hasPrimary = formData?.images.some((img) => img.is_primary === 1);
    if (formData?.images.length > 0 && !hasPrimary) {
      validationErrors.push(t('Please select a primary image (click the star icon).'));
    }
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    console.log("FORM DATA:", formData);

    try {
      setLoading(true);
      data.append("property_id", formData?.property_id);

      formData?.images.forEach((img, index) => {
        data.append(`images[${index}][file]`, img.file);
        data.append(`images[${index}][sort_order]`, img.sort_order);
        data.append(`images[${index}][is_primary]`, img.is_primary);
      });

      if (formData?.vr_path) {
        data.append("vr_path", formData?.vr_path);
      }

      if (formData?.video) {
        data.append("video", formData?.video);
      }
      await dispatch(addMediaThunk(data)).unwrap();
      router.push(`/Pages/Services/Property_Module/Service/Add/FormData?property_id=${formData?.property_id}`);
    } catch (error) {
      console.log(error);
      const serverErrors = error?.errors
        ? Object.values(error.errors).flat()
        : [error?.message || t('Something went wrong, please try again.')];
      setErrors(serverErrors);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
    <div className='border border-[#E6E6E6] p-8 rounded-[6px]'>
      <div>
        <p className='text-[#364152] text-xl font-medium mb-3'>
          <span>{t('Step')} 8 :</span>
          <span>{t('Media')}</span>
        </p>
        <p className='text-[#697586] text-base font-normal'>{t('Enter the media details to begin adding them.')}</p>
        <div className='border border-[#E3E8EF] my-4'></div>
      </div>
      

      {/*  */}
      <FirstNote   />
      <UploadImage  formData={formData} setFormData={setFormData}  />
      <UploadVideo  formData={formData} setFormData={setFormData}  />

      



      {/* Validation errors */}
      {errors.length > 0 && (
        <div className='flex flex-col gap-1 mt-4 p-3 bg-[#FEF3F2] border border-[#FDA29B] rounded-[6px]'>
          {errors.map((err, i) => (
            <p key={i} className='text-[#B42318] text-sm font-normal'>{err}</p>
          ))}
        </div>
      )}

      {/* btn */}
      <div className="flex justify-between mt-6">
        <div className='w-full '>
          <button
            onClick={prevStep}
            className="w-[50%] lg1:w-[15%] h-11 border border-[#697586] text-[#697586] rounded-[6px] cursor-pointer"
          >
            {t('the previous')}
          </button>
        </div>
        
        <div className='flex gap-2 justify-end w-full '>
          <button
            className="h-11 w-[50%] lg1:w-[15%] border border-[#697586] text-[#697586] rounded-[6px] cursor-pointer"
          >
            {t('Save draft')}
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="h-11 w-[50%] lg1:w-[15%] bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? t('Saving...') : t('the next')}
          </button>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default MediaPage


