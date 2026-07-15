'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Switch } from '@mui/material'


function Form({getCategories , formData , setFormData}) {
  const {t} = useTranslation()
  console.log('formData' , formData);
  // =========================
  const [open1, setOpen1] = useState(false);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const categoryType = getCategories;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
      
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)

const handleAddImage = (e) => {
  const files = Array.from(e.target.files);

  const newImages = files.map((file) => ({
    id: Date.now() + Math.random(),
    file,
    url: URL.createObjectURL(file),
    name: file.name,
  }));

  const updatedImages = [...images, ...newImages].slice(0, 5);

  setImages(updatedImages);

  // تحديث formData
  setFormData((prev) => ({
    ...prev,
    images: updatedImages.map((img) => img.file),
  }));

  e.target.value = "";
};
const handleRemoveImage = (id) => {
  const updatedImages = images.filter((img) => img.id !== id);

  setImages(updatedImages);

  setFormData((prev) => ({
    ...prev,
    images: updatedImages.map((img) => img.file),
  }));
};
  const GreenSwitch = styled((props) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
  ))(({ theme }) => ({
    width: 53,
    height: 24,
    padding: 0,

    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 3,
      transitionDuration: '500ms',

      '&.Mui-checked': {
        transform: 'translateX(31px)',
        color: '#fff',

        '& + .MuiSwitch-track': {
          backgroundColor: '#10B981',
          opacity: 1,
          border: 0,
        },

        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },

      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },

      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.grey[100],
      },
    },

    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 18,
      height: 18,
    },

    '& .MuiSwitch-track': {
      borderRadius: 12,
      backgroundColor: '#E9E9EA',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  return (
    <>
    {/* Basic Information */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[6px]'>
      <p className='text-[#364152] text-lg font-medium mb-4'>{t('Basic Information')}</p>

      <div className='flex flex-col gap-3'>
        {/*Classification name (Arabic)  */}
        <div className='w-full flex flex-col gap-1'>
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('Classification name')} ({t('Arabic')})</span>
            <span className=' text-[#F04438]'>*</span>
          </p>  
          <input 
            type="text"
            name='title'
            value={formData.name.ar}
            onChange={(e)=>setFormData({...formData , 
              name:{
                ...formData.name,
                ar: e.target.value,
              } 
            })}
            placeholder={t("Classification name")}
            className={`w-full border border-[#E3E8EF] rounded-[10px] px-4 h-11 text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]`}
          />
        </div>

        {/*Classification name (English)  */}
        <div className='w-full flex flex-col gap-1'>
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('Classification name')} ({t('English')})</span>
          </p>  
          <input 
            type="text"
            name='title'
            value={formData.name?.en}
            onChange={(e)=>setFormData({...formData , 
              name:{
                ...formData.name,
                en: e.target.value,
              } 
            })}
            placeholder={t("Classification name")}
            className={`w-full border border-[#E3E8EF] rounded-[10px] px-4 h-11 text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]`}
          />
        </div>

        {/* ========== category type 1  ========== */}
        <div className="flex flex-col">
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('Classification')} </span>
          </p>

          <div className="relative w-full" ref={dropdownRef1}>
            <div
              className="relative flex items-center border border-[#E3E8EF] rounded-[10px] cursor-pointer bg-white transition-all duration-150 hover:border-[#C69815]/40"
              onClick={() => setOpen1(!open1)}
            >
              <input
                type="text"
                placeholder={t("Classification")}
                value={searchValue1}
                onChange={(e) => {
                  setSearchValue1(e.target.value);
                  setOpen1(true);
                }}
                className="h-11 px-4 w-full text-sm text-[#364152] bg-transparent outline-none placeholder-[#9AA4B2] rounded-[10px]"
              />

              <span className="absolute end-3 cursor-pointer">
                {open1 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="up" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="down" />
                )}
              </span>
            </div>

            {open1 && (
              <ul className="absolute left-0 right-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10 max-h-48 overflow-y-auto">
                {categoryType
                  ?.filter((opt) =>
                    opt?.name?.toLowerCase().includes(searchValue1.toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt?.id}
                      onClick={() => {
                        setFormData((prev)=>({...prev , category_id : opt?.id}))
                        setSearchValue1(opt?.name);
                        setOpen1(false);
                      }}
                      className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                    >
                      {opt?.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/*description (Arabic)  */}
        <div className='w-full flex flex-col gap-1.5'>
          <p className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium'>{t('description')} {t('Arabic')} </span>
            <span className=' text-[#697586] font-normal'>({t('optional')}) </span>
          </p>  
          <textarea
            name="description"
            value={formData?.description?.ar}
            onChange={(e)=>setFormData({...formData , 
              description:{
                ...formData.description,
                ar: e.target.value,
              } 
            })}
            placeholder={t("Write a brief description")}
            className="w-full border border-[#E3E8EF] rounded-[10px] px-4 py-3 min-h-[88px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] resize-none"
          />
        </div>

        {/*description (English)  */}
        <div className='w-full flex flex-col gap-1.5'>
          <p className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium'>{t('description')} {t('English')} </span>
            <span className=' text-[#697586] font-normal'>({t('optional')}) </span>
          </p>  
          <textarea
            name="description"
            value={formData?.description?.en}
            onChange={(e)=>setFormData({...formData , 
              description:{
                ...formData.description,
                en: e.target.value,
              } 
            })}
            placeholder={t("Write a brief description")}
            className="w-full border border-[#E3E8EF] rounded-[10px] px-4 py-3 min-h-[88px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] resize-none"
          />
        </div>

      </div>
    </div>

    {/* images */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[6px] my-6'>
      <p className='text-[#364152] text-lg font-medium mb-4'>{t('Photos')}</p>

      {/* hidden file input */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple
        className='hidden'
        onChange={handleAddImage}
      />

      {/* image preview cards */}
      {images.length > 0 && (
        <div className='grid grid-cols-5 gap-3 mb-3'>
          {images.map((img) => (
            <div key={img.id} className='relative group rounded-[6px] overflow-hidden border border-[#E3E8EF] aspect-square'>
              <img src={img.url} alt={img.name} className='w-full h-full object-cover' />
              <button
                type='button'
                onClick={() => handleRemoveImage(img.id)}
                className='absolute top-1 right-1 w-5 h-5 bg-[#F04438] text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* add button — hidden when 5 images uploaded */}
      {images.length < 5 && (
        <button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          className='w-full border-2 border-dashed border-[#E3E8EF] rounded-[12px] hover:border-[#C69815]/50 hover:bg-[#FFFDF8] transition-all cursor-pointer p-4 flex flex-col gap-2 justify-center items-center'
        >
          <p>
            <img src='/images/icons/image-add--gray.svg' alt='' />
          </p>
          <p className='text-[#4B5565] font-normal text-sm'>{t('Add image')}</p>
        </button>
      )}

      <p className='text-[#697586] text-xs font-normal mt-2'>{t('Add up to 5 photos')}</p>
    </div>

    {/* price */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[6px] my-6'>
      <p className='text-[#364152] text-lg font-medium mb-4'>{t('Pricing')}</p>
      {/*Basic price  */}
      <div className='w-full flex flex-col gap-1'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Basic price')} ({t('Egypt')})</span>
        </p>  
        <input 
          type="text"
          name='title'
          value={formData?.base_price}
          onChange={(e)=>setFormData({...formData , base_price:e.target.value})}
          placeholder='0:00'
          className={`w-full border border-[#E3E8EF] rounded-[10px] px-4 h-11 text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]`}
        />
      </div>

    </div>

    {/* Preparation */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[6px]'>
      <p className='text-[#364152] text-lg font-medium mb-4'>{t('Preparation')}</p>
      {/*Preparation time  */}
      <div className='w-full flex flex-col gap-1'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Preparation time')} ({t('minutes')})</span>
        </p>  
        <input 
          type="number"
          name='title'
          value={formData?.prep_time_min}
          onChange={(e)=>setFormData({...formData , prep_time_min:e.target.value})}
          placeholder='0:00'
          className={`w-full border border-[#E3E8EF] rounded-[10px] px-4 h-11 text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]`}
        />
      </div>

      {/*Calories */}
      <div className='w-full flex flex-col gap-1 mt-3'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Calories')} ({t('optional')})</span>
        </p>  
        <input 
          type="number"
          name='title'
            value={formData?.calories}
          onChange={(e)=>setFormData({...formData , calories:e.target.value})}
          placeholder='0:00'
          className={`w-full border border-[#E3E8EF] rounded-[10px] px-4 h-11 text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]`}
        />
      </div>

    </div>

    {/* Savings schedule */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[6px] mt-6'>
      <p className='text-[#364152] text-base font-medium'>{t('Savings schedule')}</p>
      <div className='mt-4 flex justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-[#364152] text-sm font-normal'>{t('Available all day')}</p>
          <p className='text-[#4B5565] text-sm font-normal'>{t('Available at all times')}</p>
        </div>

        <div>
          <GreenSwitch
          checked={formData.availability_type === 'all_day'}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                availability_type: e.target.checked ? 'all_day' : 'schedule',
              }))
            }
          />
        </div>
      </div>
    </div>

    {/* Status */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[6px] mt-6'>
      <p className='text-[#364152] text-lg font-medium mb-4'>{t('Status')}</p>
      
      <div className='mt-4 flex justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-[#364152] text-sm font-normal'>{t('active')}</p>
          <p className='text-[#4B5565] text-sm font-normal'>{t('Show this category in the list')}</p>
        </div>

        <div>
          <GreenSwitch
            checked={formData.status === 'active'}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.checked ? 'active' : 'hidden',
              }))
            }
          />
        </div>
      </div>


      <div className="border-[0.5px] border-[#E3E8EF] my-3" />


      <div className='mt-4 flex justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-[#364152] text-sm font-normal'>{t('available')}</p>
          <p className='text-[#4B5565] text-sm font-normal'>{t('Marked as temporarily unavailable')}</p>
        </div>

        <div>
          <GreenSwitch
          checked={formData.is_visible === 1}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                is_visible: e.target.checked ? 1 : 0,
              }))
            }
          />
        </div>
      </div>

    </div>




  

    </>
  )
}

export default Form

