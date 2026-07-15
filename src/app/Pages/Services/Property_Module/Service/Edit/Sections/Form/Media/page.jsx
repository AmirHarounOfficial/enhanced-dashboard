"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import TitleOfHeader from '../../TitleOfHeader';
import Loader from '@/app/Components/Loader/Loader';
import FirstNote from './FirstNote';
import UploadImage from './UploadImage';
import UploadVideo from './UploadVideo';
import { addMediaThunk, deleteVideoThunk, getMediaThunk } from '@/redux/slice/Services/ServicesSlice';
import { useDispatch, useSelector } from 'react-redux';

function MediaPageContent() {
  const {t} = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { getMedia } = useSelector((state) => state.services);
  const getMediaData = getMedia?.data;

  // formData.images: mix of strings (server paths) and File objects (new uploads)
  const [formData, setFormData] = useState({
    images: [],
    video: '',
    vr_path: '',
  });

  // Fetch media on mount
  useEffect(() => {
    if (id) dispatch(getMediaThunk(id));
  }, [id]);

  // Populate formData from server response
  // Track original server values to detect deletions
  const [originalMedia, setOriginalMedia] = useState({ video: '', vr_path: '' });

  useEffect(() => {
    if (getMediaData) {
      setFormData({
        images: getMediaData?.images || [],
        video: getMediaData?.video || '',
        vr_path: getMediaData?.vr_path || '',
      });
      setOriginalMedia({
        video: getMediaData?.video || '',
        vr_path: getMediaData?.vr_path || '',
      });
    }
  }, [getMediaData]);

  const handleSave = async () => {
  const data = new FormData();

  try {
    setLoading(true);
    data.append("property_id", id);

    formData.images.forEach((img, index) => {
      if (img?.file instanceof File) {
        data.append(`images[${index}][file]`, img.file);
        data.append(`images[${index}][sort_order]`, img.sort_order ?? index + 1);
        data.append(`images[${index}][is_primary]`, img.is_primary ? 1 : 0);
      } else if (img?.id) {
        data.append(`images[${index}][id]`, img.id);
        data.append(`images[${index}][sort_order]`, img.sort_order ?? index + 1);
        data.append(`images[${index}][is_primary]`, img.is_primary ? 1 : 0);
      } else if (img?.image_url) {
        data.append(`images[${index}][image_url]`, img.image_url);
        data.append(`images[${index}][sort_order]`, img.sort_order ?? index + 1);
        data.append(`images[${index}][is_primary]`, img.is_primary ? 1 : 0);
      }
    });

    // Delete video from server if it was cleared
    if (originalMedia.video && !formData.video) {
      await dispatch(deleteVideoThunk({ id, type: 'video' })).unwrap();
    }

    // Delete VR tour from server if it was cleared
    if (originalMedia.vr_path && !formData.vr_path) {
      await dispatch(deleteVideoThunk({ id, type: 'vr' })).unwrap();
    }

    // Upload new vr_path file
    if (formData.vr_path instanceof File) {
      data.append("vr_path", formData.vr_path);
    }

    // Upload new video file
    if (formData.video instanceof File) {
      data.append("video", formData.video);
    }

    await dispatch(addMediaThunk(data)).unwrap();
    router.push(`/Pages/Services/Property_Module/Service/Edit?id=${id}`);

  } catch (error) {
    console.error(error);
    setErrors([error?.message || 'Something went wrong']);
  } finally {
    setLoading(false);
  }
  };
  
  return (
    <MainLayout>
      <TitleOfHeader/>
      <div className='border border-[#E6E6E6] p-8 rounded-[6px] mb-4'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 8 :</span>
            <span>{t('Media')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>تم تحميل {formData.images.length} صور</p>
          <div className='border border-[#E3E8EF] my-4'></div>
        </div>
        
        <FirstNote/>
        <UploadImage formData={formData} setFormData={setFormData}/>
        <UploadVideo formData={formData} setFormData={setFormData}/>

        {/* btn */}
        <div className="flex mt-6">
          <div className='flex gap-2 justify-start w-full'>
            <button
              onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit?id=${id}`)}
              className="h-11 w-[30%] lg1:w-[15%] border border-[#697586] text-[#697586] rounded-[6px] cursor-pointer"
            >
              {t('Return')}
            </button>

            <button
              onClick={handleSave}
              className="h-11 w-[30%] lg1:w-[15%] bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer"
            >
            {loading ? t('Saving...') : t('save')}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default function MediaPage() {
  return (
    <Suspense fallback={<Loader/>}>
      <MediaPageContent />
    </Suspense>
  )
}


