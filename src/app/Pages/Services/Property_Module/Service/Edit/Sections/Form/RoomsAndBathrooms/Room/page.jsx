"use client"
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import RoomCard from './RoomCard'
import { useDispatch, useSelector } from 'react-redux';
import { getBedTypesThunk, getRoomAmentyThunk, getRoomTypesThunk } from '@/redux/slice/Services/ServicesSlice';

function RoomPage({ rooms, updateRoom, deleteRoom, addRoom }) {
  const { t } = useTranslation();

  const dispatch = useDispatch()
  const { getRoomTypes, getBedTypes, getRoomAmenty } = useSelector((state) => state.services)

  useEffect(() => {
    dispatch(getRoomTypesThunk())
    dispatch(getBedTypesThunk())
    dispatch(getRoomAmentyThunk())
  }, [dispatch])

  return (
    <>
      {rooms?.map((room, index) => (
        <div key={room.id} className='border border-[#E3E8EF] rounded-[6px] mt-4'>
          {/* Card accordion header */}
          <button
            type="button"
            onClick={() => updateRoom(room.id, { isOpen: !room.isOpen })}
            className='w-full flex items-center justify-between px-4 py-3 bg-[#F8FAFC] cursor-pointer'
          >
            <div className='flex items-center gap-2'>
              <img src="/images/icons/bed-single-blue.svg" className="w-5 h-5" alt="" />
              <span className='text-[#364152] text-sm font-medium'>
                {room.selected1 || `${t('Room')} ${index + 1}`}
              </span>
            </div>
            <img
              src="/images/icons/ArrowDown.svg"
              className={`w-4 h-4 transition-transform duration-200 ${room.isOpen ? 'rotate-180' : ''}`}
              alt=""
            />
          </button>
          {/* Card content */}
          {room.isOpen && (
            <div className='p-4'>
              <RoomCard
                room={room}
                onUpdate={(changes) => updateRoom(room.id, changes)}
                onDelete={() => deleteRoom(room.id)}
                getRoomTypes={getRoomTypes}
                getBedTypes={getBedTypes}
                getRoomAmenty={getRoomAmenty}
              />
            </div>
          )}
        </div>
      ))}

      {/* Add room button */}
      <button
        type="button"
        onClick={addRoom}
        className='flex justify-center items-center gap-1 w-full h-14 py-2.5 px-4 border border-dashed border-[#E3E8EF] mt-4 rounded-[6px] cursor-pointer'
      >
        <p className='text-[#697586] text-base font-medium'>{t('Add a room')}</p>
        <img src="/images/icons/AddGrayIcon.svg" className="w-5 h-5" />
      </button>
    </>
  );
}

export default RoomPage


