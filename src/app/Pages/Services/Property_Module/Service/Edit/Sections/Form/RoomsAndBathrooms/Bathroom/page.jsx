"use client"
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import BathroomCard from './BathroomCard'
import { getBathRoomTypesThunk } from '@/redux/slice/Services/ServicesSlice';
import { useDispatch, useSelector } from 'react-redux';

function BathroomPage({ bathrooms, updateBathroom, deleteBathroom, addBathroom }) {
  const { t } = useTranslation();

  const dispatch = useDispatch()
  const { getBathRoomTypes } = useSelector((state) => state.services)

  useEffect(() => {
    dispatch(getBathRoomTypesThunk())
  }, [dispatch])

  return (
    <>
      {bathrooms?.map((bathroom, index) => (
        <div key={bathroom.id} className='border border-[#E3E8EF] rounded-[6px] mt-4'>
          {/* Card accordion header */}
          <button
            type="button"
            onClick={() => updateBathroom(bathroom.id, { isOpen: !bathroom.isOpen })}
            className='w-full flex items-center justify-between px-4 py-3 bg-[#F8FAFC] cursor-pointer'
          >
            <div className='flex items-center gap-2'>
              <img src="/images/icons/bathtub-blue.svg" className="w-5 h-5" alt="" />
              <span className='text-[#364152] text-sm font-medium'>
                {bathroom.selected1 || `${t('Bathroom')} ${index + 1}`}
              </span>
            </div>
            <img
              src="/images/icons/ArrowDown.svg"
              className={`w-4 h-4 transition-transform duration-200 ${bathroom.isOpen ? 'rotate-180' : ''}`}
              alt=""
            />
          </button>
          {/* Card content */}
          {bathroom.isOpen && (
            <div className='p-4'>
              <BathroomCard
                bathroom={bathroom}
                onUpdate={(changes) => updateBathroom(bathroom.id, changes)}
                onDelete={() => deleteBathroom(bathroom.id)}
                getBathRoomTypes={getBathRoomTypes}
              />
            </div>
          )}
        </div>
      ))}

      {/* Add bathroom button */}
      <button
        type="button"
        onClick={addBathroom}
        className='flex justify-center items-center gap-1 w-full h-14 py-2.5 px-4 border border-dashed border-[#E3E8EF] mt-4 rounded-[6px] cursor-pointer'
      >
        <p className='text-[#697586] text-base font-medium'>{t('Add bathroom')}</p>
        <img src="/images/icons/AddGrayIcon.svg" className="w-5 h-5" />
      </button>
    </>
  );
}

export default BathroomPage;


