"use client"
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';

function ImageUpload({formData, setFormData}) {
  const {t} = useTranslation()
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_FILE_SIZE) {
      alert(t("Image size must be less than 2MB"));
      return;
    }

    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert(t("Only PNG, JPG, and JPEG images are allowed"));
      return;
    }

    const newPreview = URL.createObjectURL(file);
    setPreviewImage(newPreview);
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleDelete = () => {
    setPreviewImage('');
    setFormData((prev) => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className='text-base font-medium'>
        <span className='text-[#364152] '>{t('Photos of the hall')}</span>
        <span className='text-[#F04438]'>*</span>
      </p>

      {!previewImage ? (
        <div
          onClick={() => fileInputRef.current.click()}
          className="w-full p-8 border border-dashed border-[#9AA4B2] hover:border-[var(--color-primary)] transition-colors duration-200 cursor-pointer rounded-md flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]"
        >
          <input
            type="file"
            ref={fileInputRef}
            accept=".png,.jpg,.jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="bg-[#E3E8EF] w-14 h-14 rounded-full flex items-center justify-center">
            <div className="bg-[#EEF2F6] w-12 h-12 rounded-full flex items-center justify-center">
              <img src="/images/icons/upload images.svg" alt="upload" />
            </div>
          </div>
          <p className="text-center text-sm">
            <span className="font-semibold text-[#364152]">{t("Click to upload")}</span>{" "}
            <span className="font-medium text-[#9AA4B2]">{t("Or drag and drop files")}</span>
          </p>
          <p className="text-[#494C4D] text-sm font-normal">
            ({t("Maximum")} 2MB) PNG, JPG, JPEG
          </p>
        </div>
      ) : (
        <div className="relative w-full object-cover h-64 border border-[#E3E8EF] rounded-md overflow-hidden bg-[#F8FAFC] flex items-center justify-center group shadow-sm">
          <img src={previewImage} alt="Hall photo" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleDelete(); }}
            className="absolute top-3 right-3 bg-[#FEE4E2] border border-[#F04438] hover:bg-[#FECDCA] rounded-md p-2 shadow-sm transition-all duration-200 flex items-center justify-center cursor-pointer animate-fade-in"
            title={t("Delete")}
          >
            <img src="/images/icons/delete Red.svg" alt="delete" className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
