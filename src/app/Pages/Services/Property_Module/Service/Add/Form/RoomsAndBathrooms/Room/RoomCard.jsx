"use client"
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'



function RoomCard({ room, onUpdate, onDelete ,getRoomTypes ,getBedTypes ,getRoomAmenty }) {
  const { t } = useTranslation();
  const optionRoomType =getRoomTypes?.data ;
  const optionBeds = getBedTypes?.data;
  const MAX_IMAGES = 5;

  const optionalRoomFeatures = getRoomAmenty?.data ; 

  const fileInputRef = useRef(null);
  const dropdownRef1 = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
        onUpdate({ open1: false });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- images ---
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (room.images.length + files.length > MAX_IMAGES) {
      alert(`Maximum number of photos ${MAX_IMAGES}`);
      return;
    }
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    onUpdate({
      images: [...room.images, ...files],
      previewImages: [...room.previewImages, ...newPreviews],
    });
  };

  const handleDeleteImage = (index) => {
    onUpdate({
      images: room.images.filter((_, i) => i !== index),
      previewImages: room.previewImages.filter((_, i) => i !== index),
    });
  };

  // --- beds ---
  const addBed = () => {
    onUpdate({
      beds: [...room.beds, { id: Date.now(), selected: null, searchValue: '', open: false, counter: 1 }],
    });
  };

  const removeBed = (id) => {
    onUpdate({ beds: room.beds.filter((b) => b.id !== id) });
  };

  const updateBed = (id, changes) => {
    onUpdate({ beds: room.beds.map((b) => (b.id === id ? { ...b, ...changes } : b)) });
  };

  const lastBedFilled = room.beds.length === 0 || room.beds[room.beds.length - 1].selected !== null;

  // --- features ---
  const toggleFeature = (id) => {
    onUpdate({
      features: room.features.includes(id)
        ? room.features.filter((f) => f !== id)
        : [...room.features, id],
    });
  };

  return (
    <div className='border border-[#E3E8EF] rounded-[6px] p-4 mt-6'>

      {/* Room type */}
      <div className="flex flex-col w-full mb-6">
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Room type')} </span>
          <span className='text-[#F04438]'>*</span>
        </p>

        <div className="relative w-full" ref={dropdownRef1}>
          <div
            className="relative flex items-center"
            onClick={() => onUpdate({ open1: !room.open1 })}
          >
            <input
              type="text"
              placeholder={t('Choose room type')}
              value={room.searchValue1 || room.selected1 || ''}
              onChange={(e) => onUpdate({ searchValue1: e.target.value, open1: true, selected1: null })}
              className='w-full h-14 p-3 border border-[#E3E8EF] text-sm text-[#7d8d84] rounded-[6px] outline-none'
            />
            <span className="absolute left-3 cursor-pointer">
              {room.open1 ? (
                <img src="/images/icons/ArrowUp.svg" alt="up" />
              ) : (
                <img src="/images/icons/ArrowDown.svg" alt="down" />
              )}
            </span>
          </div>

          {room.open1 && (
            <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[6px] shadow-md z-10 max-h-48 overflow-y-auto">
              {optionRoomType
                .filter((opt) => opt?.name?.toLowerCase().includes((room.searchValue1 || '').toLowerCase()))
                ?.map((opt) => (
                  <li
                    key={opt?.id}
                    onClick={() => onUpdate({ selected1: opt?.name, room_type_id: opt?.id, searchValue1: '', open1: false })}
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
          <span className='text-[#364152] text-sm font-medium'>{t('Room photos')}</span>
        </div>

        <div className="flex flex-col gap-3">
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

            {room.previewImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <img src="/images/icons/image-add-gray.svg" />
                <p className="text-lg font-normal text-[#4B5565]">{t('Add image')}</p>
              </div>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {room.previewImages.map((src, idx) => (
                  <div key={idx} className="relative w-36 h-28 border border-[#E5E7EB] rounded-[6px] overflow-hidden">
                    <img src={src} alt="preview" className="w-full h-full object-cover" />
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteImage(idx); }}
                      className="absolute top-1 right-1 bg-[#00000080] w-5 h-5 flex justify-center items-center rounded-full cursor-pointer"
                    >
                      <img src="/images/icons/x_white.svg" />
                    </button>
                  </div>
                ))}
                {room.previewImages.length < MAX_IMAGES && (
                  <button
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}
                    className="w-36 h-28 cursor-pointer border bg-[#F8FAFC] border-dashed border-[#E3E8EF] flex items-center justify-center"
                  >
                    <img src="/images/icons/AddGrayIcon.svg" />
                  </button>
                )}
              </div>
            )}

            {room.previewImages.length >= MAX_IMAGES && (
              <p className="mt-1 text-sm text-[var(--color-primary)]">
                {t('You reached max images. Delete one to add new.')}
              </p>
            )}
          </div>
        </div>
        <p className='text-[#697586] text-sm font-normal mt-2'>
          {t('Add up to 5 images. The first image will be the main image.')}
        </p>
      </div>

      {/* Bed */}
      <div className='mt-6'>
        <p className='mb-1.5'>
          <span className='text-[#364152] text-sm font-medium'>{t('A bed in this room')}</span>
        </p>

        <div className='flex flex-col gap-4'>
          {room.beds.map((bed) => (
            <div key={bed.id} className='flex gap-5'>
              {/* Bed type dropdown */}
              <div className="w-[80%] relative">
                <div
                  className="relative flex items-center"
                  onClick={() => updateBed(bed.id, { open: !bed.open })}
                >
                  <input
                    type="text"
                    placeholder={t('Choose bed type')}
                    value={bed.searchValue || bed.selected || ''}
                    onChange={(e) => updateBed(bed.id, { searchValue: e.target.value, open: true, selected: null })}
                    className='w-full h-14 p-3 border border-[#E3E8EF] text-sm text-[#7d8d84] rounded-[6px] outline-none'
                  />
                  <span className="absolute left-3 cursor-pointer">
                    {bed.open ? (
                      <img src="/images/icons/ArrowUp.svg" alt="up" />
                    ) : (
                      <img src="/images/icons/ArrowDown.svg" alt="down" />
                    )}
                  </span>
                </div>

                {bed.open && (
                  <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[6px] shadow-md z-10 max-h-48 overflow-y-auto">
                    {optionBeds
                      .filter((opt) => opt?.name?.toLowerCase().includes((bed.searchValue || '').toLowerCase()))
                      .map((opt) => (
                        <li
                          key={opt?.id}
                          onClick={() => updateBed(bed.id, { selected: opt?.name, bed_type_id: opt?.id, searchValue: '', open: false })}
                          className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                        >
                          {opt?.name}
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              {/* counter & delete */}
              <div className='w-[20%] flex gap-4 items-center'>
                <div className='flex items-center gap-3 bg-[#EEF2F6] rounded-full p-2'>
                  <button
                    onClick={() => updateBed(bed.id, { counter: Math.max(1, bed.counter - 1) })}
                    className='w-9 h-9 flex items-center justify-center text-lg cursor-pointer'
                  > - </button>
                  <span className='text-[#364152] text-base font-medium w-3 text-center'>{bed.counter}</span>
                  <button
                    onClick={() => updateBed(bed.id, { counter: bed.counter + 1 })}
                    className='w-9 h-9 flex items-center justify-center text-lg cursor-pointer'
                  > + </button>
                </div>
                <button onClick={() => removeBed(bed.id)} className='cursor-pointer'>
                  <img src="/images/icons/xxxx.svg" className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={lastBedFilled ? addBed : undefined}
          className={`flex justify-center items-center gap-1 w-full h-14 py-2.5 px-4 border border-dashed border-[#E3E8EF] mt-4 rounded-[6px] ${
            lastBedFilled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
          }`}
        >
          <p className='text-[#697586] text-base font-medium'>{t('Add a bed')}</p>
          <img src="/images/icons/AddGrayIcon.svg" className="w-5 h-5" />
        </button>
      </div>

      {/* Features of the optional room */}
      <div className='mt-6'>
        <p className='text-[#364152] text-sm font-medium'>{t('Features of the optional room')}</p>
        {optionalRoomFeatures.map((item) => (
          <div key={item.id} className='flex gap-2 mt-2'>
            <input
              type="checkbox"
              checked={room.features.includes(item.id)}
              onChange={() => toggleFeature(item.id)}
              className="w-5 h-5 appearance-none border rounded-[6px] border-[#CDD5DF] bg-white checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-['✔'] checked:after:text-[white] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-xs"
            />
            <p className='text-[#4B5565] text-sm font-normal'>{item.name}</p>
          </div>
        ))}
      </div>

      {/* Delete room */}
      <button onClick={onDelete} className='my-6 cursor-pointer'>
        <p className='flex gap-1'>
          <img src="/images/icons/delete_red.svg" alt="" />
          <span className='text-[#F04438] text-base font-medium'>{t('Delete room')}</span>
        </p>
      </button>
    </div>
  );
}

export default RoomCard




