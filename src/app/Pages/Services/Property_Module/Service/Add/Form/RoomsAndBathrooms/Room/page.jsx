"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import RoomCard from './RoomCard'
import { useDispatch, useSelector } from 'react-redux';
import { getBedTypesThunk, getRoomAmentyThunk, getRoomTypesThunk } from '@/redux/slice/Services/ServicesSlice';

function createRoom() {
  return {
    id: Date.now() + Math.random(),
    open1: false,
    selected1: null,
    searchValue1: '',
    images: [],
    previewImages: [],
    beds: [],
    features: [],
  };
}

function RoomPage({ onRoomsChange }) {
  const { t } = useTranslation();
  //api
  const dispatch = useDispatch()
  const {getRoomTypes , getBedTypes ,getRoomAmenty } = useSelector((state)=>state.services)
  useEffect(()=>{
    dispatch(getRoomTypesThunk())
    dispatch(getBedTypesThunk())
    dispatch(getRoomAmentyThunk())
    
  },[dispatch])


  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (onRoomsChange) onRoomsChange(rooms);
  }, [rooms]);

  const addRoom = () => {
    setRooms((prev) => [...prev, createRoom()]);
  };

  const deleteRoom = (id) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRoom = (id, changes) => {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...changes } : r)));
  };

  // "Add a room" is clickable only if the last room has a selected type (or no rooms yet)
  const lastRoomFilled = rooms.length === 0 || rooms[rooms.length - 1].selected1 !== null;

  return (
    <>
      <div className='mt-10'>
        <p className='flex gap-1'>
          <img src="/images/icons/bed-single-blue.svg" alt="" />
          <span className='text-[#364152] text-base font-medium'>{t('Room Information')}</span>
        </p>
        <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('Add details of each room and the beds in it.')}</p>

        {/* Rooms list */}
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onUpdate={(changes) => updateRoom(room.id, changes)}
            onDelete={() => deleteRoom(room.id)}
            getRoomTypes={getRoomTypes}
            getBedTypes={getBedTypes}
            getRoomAmenty={getRoomAmenty}
          />
        ))}

        {/* Add a room button */}
        <button
          onClick={lastRoomFilled ? addRoom : undefined}
          className={`flex justify-center items-center gap-1 w-full h-14 py-2.5 px-4 border border-dashed border-[#E3E8EF] mt-6 rounded-[6px] ${
            lastRoomFilled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
          }`}
        >
          <p className='text-[#697586] text-base font-medium'>{t('Add a room')}</p>
          <img src="/images/icons/AddGrayIcon.svg" className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}

export default RoomPage

