"use client"
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'



function BathroomCard({ bathroom, onUpdate, onDelete ,getBathRoomTypes }) {
  const { t } = useTranslation();
  const MAX_IMAGES = 5;

  const optionBathroomType = getBathRoomTypes?.data;
  console.log("bathroom types:", optionBathroomType);
  
  const optionBathroomLocation = [
    {id:1 , title:t("inside") , value:"inside"},
    {id:2 , title:t("common"), value:"common"},
  
  ];

  const optionalBathroomFeatures = [
    { id: 1, title: t("private") },
    { id: 2, title: t("public") },
  
];


  const fileInputRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
        onUpdate({ open1: false });
      }
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        onUpdate({ open2: false });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- images ---
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);

    if (bathroom.images.length + files.length > MAX_IMAGES) {
      alert(`Maximum number of photos ${MAX_IMAGES}`);
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    onUpdate({
      images: [...bathroom.images, ...files],
      previewImages: [...bathroom.previewImages, ...newPreviews],
    });
  };

  const handleDeleteImage = (index) => {
    onUpdate({
      images: bathroom.images.filter((_, i) => i !== index),
      previewImages: bathroom.previewImages.filter((_, i) => i !== index),
    });
  };

  // --- features ---
  

  return (
    <div className='border border-[#E3E8EF] rounded-[6px] p-4 mt-6'>

      {/* Bathroom type */}
      <div className="flex flex-col w-full mb-6">
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Bathroom type')} </span>
          <span className='text-[#F04438]'>*</span>
        </p>

        <div className="relative w-full" ref={dropdownRef1}>
          <div
            className="relative flex items-center"
            onClick={() => onUpdate({ open1: !bathroom.open1 })}
          >
            <input
              type="text"
              placeholder={t('Choose the type of bathroom')}
              value={bathroom.searchValue1 || bathroom.selected1 || ''}
              onChange={(e) =>
                onUpdate({
                  searchValue1: e.target.value,
                  open1: true,
                  selected1: null
                })
              }
              className='w-full h-14 p-3 border border-[#E3E8EF] text-sm text-[#7d8d84] rounded-[6px] outline-none'
            />

            <span className="absolute left-3 cursor-pointer">
              {bathroom.open1 ? (
                <img src="/images/icons/ArrowUp.svg" alt="up" />
              ) : (
                <img src="/images/icons/ArrowDown.svg" alt="down" />
              )}
            </span>
          </div>

          {bathroom.open1 && (
            <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[6px] shadow-md z-10 max-h-48 overflow-y-auto">
              {optionBathroomType
                ?.filter((opt) =>
                  opt?.name?.toLowerCase().includes((bathroom.searchValue1 || '').toLowerCase())
                )
                .map((opt) => (
                  <li
                    key={opt?.id}
                    onClick={() =>
                      onUpdate({
                        selected1: opt?.name,
                        bathroom_type_id: opt?.id,
                        searchValue1: '',
                        open1: false
                      })
                    }
                    className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {opt?.name}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* Upload image */}
      <div>
        <div className='mb-1.5'>
          <span className='text-[#364152] text-sm font-medium'>
            {t('Bathroom photos')}
          </span>
        </div>

        <div
          onClick={() => fileInputRef.current.click()}
          className="w-full p-4 border border-dashed border-[#9AA4B2] rounded-[6px] cursor-pointer"
        >
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept=".svg,.png,.jpg,.jpeg"
            className="hidden"
            onChange={handleFilesChange}
          />

          {bathroom.previewImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <img src="/images/icons/image-add-gray.svg" />
              <p className="text-lg font-normal text-[#4B5565]">
                {t('Add image')}
              </p>
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {bathroom.previewImages.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-36 h-28 border border-[#E5E7EB] rounded-[6px] overflow-hidden"
                >
                  <img src={src} className="w-full h-full object-cover" />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(idx);
                    }}
                    className="absolute top-1 right-1 bg-[#00000080] w-5 h-5 flex justify-center items-center rounded-full cursor-pointer"
                  >
                    <img src="/images/icons/x_white.svg" />
                  </button>
                </div>
              ))}

              {bathroom.previewImages.length < MAX_IMAGES && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current.click();
                  }}
                  className="w-36 h-28 cursor-pointer border bg-[#F8FAFC] border-dashed border-[#E3E8EF] flex items-center justify-center"
                >
                  <img src="/images/icons/AddGrayIcon.svg" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>


        
      {/* Bathroom location */}
      <div className="flex flex-col w-full mt-6">
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Bathroom location')} </span>
          <span className='text-[#F04438]'>*</span>
        </p>

        <div className="relative w-full" ref={dropdownRef2}>
          <div
            className="relative flex items-center"
            onClick={() => onUpdate({ open2: !bathroom.open2 })}
          >
            <input
              type="text"
              placeholder={t('Choose the bathroom location')}
              value={bathroom.searchValue2 || bathroom.selected2 || ''}
              onChange={(e) =>
                onUpdate({
                  searchValue2: e.target.value,
                  open2: true,
                  selected2: null
                })
              }
              className='w-full h-14 p-3 border border-[#E3E8EF] text-sm text-[#7d8d84] rounded-[6px] outline-none'
            />

            <span className="absolute left-3 cursor-pointer">
              {bathroom.open2 ? (
                <img src="/images/icons/ArrowUp.svg" alt="up" />
              ) : (
                <img src="/images/icons/ArrowDown.svg" alt="down" />
              )}
            </span>
          </div>

          {bathroom.open2 && (
            <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[6px] shadow-md z-10 max-h-48 overflow-y-auto">
              {optionBathroomLocation
                .filter((opt) =>
                  opt?.title?.toLowerCase().includes((bathroom.searchValue2 || '').toLowerCase())
                )
                .map((opt) => (
                  <li
                    key={opt?.id}
                    onClick={() =>
                      onUpdate({
                        selected2: opt?.title,
                        location: opt?.value,
                        searchValue2: '',
                        open2: false
                      })
                    }
                    className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {opt?.title}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Features */}
      <div className='mt-6'>
        <p className='text-[#364152] text-sm font-medium'>
          {t('Access to the bathroom')}
        </p>

        {optionalBathroomFeatures.map((item) => (
          <div key={item.id} className='flex gap-2 mt-2'>
            <input
              type="radio"
              checked={bathroom.selectedFeature === item.id}
              onChange={() => onUpdate({ selectedFeature: item.id })}
              className="w-5 h-5 appearance-none border-2 border-[#CDD5DF] rounded-full cursor-pointer   checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)]  relative  after:content-[''] after:absolute after:inset-1 after:rounded-full  checked:after:bg-white"
            />
            <p className='text-[#4B5565] text-sm font-normal'>
              {item.title}
            </p>
          </div>
        ))}
      </div>

      

      {/* Delete */}
      <button onClick={onDelete} className='my-6 cursor-pointer'>
        <p className='flex gap-1'>
          <img src="/images/icons/delete_red.svg" />
          <span className='text-[#F04438] text-base font-medium'>
            {t('Bathroom removal')}
          </span>
        </p>
      </button>
    </div>
  );
}

export default BathroomCard;



