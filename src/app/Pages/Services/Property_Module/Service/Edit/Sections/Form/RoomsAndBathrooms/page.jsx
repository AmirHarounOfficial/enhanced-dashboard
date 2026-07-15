"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import RoomPage from './Room/page';
import BathroomPage from './Bathroom/page';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import TitleOfHeader from '../../TitleOfHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '@/app/Components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addUnitsThunk, deleteRoomThunk, deleteBathroomThunk, getUnitsThunk } from '@/redux/slice/Services/ServicesSlice';

const createRoom = () => ({
  id: Date.now() + Math.random(),
  isOpen: true,
  open1: false,
  selected1: null,
  searchValue1: '',
  photos: [],
  previewImages: [],
  beds: [],
  features: [],
});

const createBathroom = () => ({
  id: Date.now() + Math.random(),
  isOpen: true,
  open1: false, selected1: null, searchValue1: '',
  open2: false, selected2: null, searchValue2: '',
  photos: [], previewImages: [],
  selectedFeature: null,
});

function RoomsAndBathroomsPageContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const dispatch = useDispatch()
  const { getUnits } = useSelector((state) => state.services)
  const getUnitsData = getUnits?.data

  const [formData, setFormData] = useState({ property_id: '', rooms: [], bathrooms: [] })
  const [roomsOpen, setRoomsOpen] = useState(true);
  const [bathroomsOpen, setBathroomsOpen] = useState(true);

  // Track IDs of rooms/bathrooms to delete from DB on save
  const [pendingDeleteRoomIds, setPendingDeleteRoomIds] = useState([]);
  const [pendingDeleteBathroomIds, setPendingDeleteBathroomIds] = useState([]);

  useEffect(() => {
    if (id) setFormData((prev) => ({ ...prev, property_id: id }))
  }, [id])

  useEffect(() => {
    if (id) dispatch(getUnitsThunk(id))
  }, [id])

  useEffect(() => {
    if (getUnitsData) {
      setFormData((prev) => ({
        ...prev,
        rooms: (getUnitsData.rooms || []).map((room) => ({
          id: room.id,
          room_type_id: room.room_type?.id,
          isOpen: false,
          open1: false,
          selected1: room.room_type?.name || null,
          searchValue1: '',
          photos: [],
          previewImages: (room.photos || []).map((p) => p.path),
          beds: (room.beds || []).map((b) => ({
            id: b.id,
            bed_type_id: b.bed_type?.id,
            selected: b.bed_type?.name || null,
            searchValue: '',
            open: false,
            counter: b.count || 1,
          })),
        features: Array.isArray(room.amenities)
        ? room.amenities.map((a) => a.id)
        : [],

        })),
        bathrooms: (getUnitsData.bathrooms || []).map((b) => ({
          id: b.id,
          bathroom_type_id: b.bathroom_type?.id,
          location_value: b.location,
          access_type: b.access_type,
          isOpen: false,
          open1: false, selected1: b.bathroom_type?.name || null, searchValue1: '',
          open2: false, selected2: b.location || null, searchValue2: '',
          photos: [],
          previewImages: (b.photos || []).map((p) => p.path),
          selectedFeature: b.access_type === 'private' ? 1 : b.access_type === 'public' ? 2 : null,
        })),
      }));
    }
  }, [getUnitsData]);

  // Helper: IDs > 1 billion are locally-generated (not in DB)
  const isNewId = (id) => !id || id > 1_000_000_000;

  // --- Room handlers ---
  const addRoom = () => setFormData(prev => ({ ...prev, rooms: [...prev.rooms, createRoom()] }));

  const deleteRoom = (rid) => {
    // If room exists in DB, queue it for deletion on save
    if (!isNewId(rid)) {
      setPendingDeleteRoomIds(prev => [...prev, rid]);
    }
    // Remove from UI immediately
    setFormData(prev => ({ ...prev, rooms: prev.rooms.filter(r => r.id !== rid) }));
  };

  const updateRoom = (rid, changes) => setFormData(prev => ({
    ...prev, rooms: prev.rooms.map(r => r.id === rid ? { ...r, ...changes } : r)
  }));

  // --- Bathroom handlers ---
  const addBathroom = () => setFormData(prev => ({ ...prev, bathrooms: [...prev.bathrooms, createBathroom()] }));

  const deleteBathroom = (bid) => {
    // If bathroom exists in DB, queue it for deletion on save
    if (!isNewId(bid)) {
      setPendingDeleteBathroomIds(prev => [...prev, bid]);
    }
    // Remove from UI immediately
    setFormData(prev => ({ ...prev, bathrooms: prev.bathrooms.filter(b => b.id !== bid) }));
  };

  const updateBathroom = (bid, changes) => setFormData(prev => ({
    ...prev, bathrooms: prev.bathrooms.map(b => b.id === bid ? { ...b, ...changes } : b)
  }));

  const handleSave = async () => {
    try {
      // --- Delete rooms/bathrooms that were removed from UI ---
      for (const roomId of pendingDeleteRoomIds) {
        const result = await dispatch(deleteRoomThunk(roomId));
        if (result?.meta?.requestStatus !== 'fulfilled') {
          console.error(`Failed to delete room ${roomId} from server`);
          return;
        }
      }
      for (const bathroomId of pendingDeleteBathroomIds) {
        const result = await dispatch(deleteBathroomThunk(bathroomId));
        if (result?.meta?.requestStatus !== 'fulfilled') {
          console.error(`Failed to delete bathroom ${bathroomId} from server`);
          return;
        }
      }

      const cleanRooms = formData.rooms
        .filter((room) => room.room_type_id)
        .map((room) => ({
          ...room,
          beds: (room.beds || []).filter((bed) => bed.bed_type_id),
        }));

      // --- Clean bathrooms: keep only those with all 3 required fields ---
      const cleanBathrooms = formData.bathrooms
        .filter((b) => b.bathroom_type_id && b.location_value && b.access_type);

      // --- Build FormData ---
      const fd = new FormData();
      fd.append('property_id', formData.property_id);

      // Rooms
      cleanRooms.forEach((room, i) => {
        if (!isNewId(room.id)) fd.append(`rooms[${i}][id]`, room.id);
        fd.append(`rooms[${i}][room_type_id]`, room.room_type_id);

        // Room amenities
        (room.features || []).forEach((amenityId, ai) => {
          fd.append(`rooms[${i}][amenity_ids][${ai}]`, amenityId);
        });

        // Room beds
        room.beds.forEach((bed, bi) => {
          if (!isNewId(bed.id)) fd.append(`rooms[${i}][beds][${bi}][id]`, bed.id);
          fd.append(`rooms[${i}][beds][${bi}][bed_type_id]`, bed.bed_type_id);
          fd.append(`rooms[${i}][beds][${bi}][count]`, bed.counter || 1);
        });

        // Room photos (File objects only)
        (room.photos || []).forEach((file, fi) => {
          if (file instanceof File) {
            fd.append(`rooms[${i}][photos][${fi}]`, file);
          }
        });
      });

      // Bathrooms
      cleanBathrooms.forEach((b, i) => {
        if (!isNewId(b.id)) fd.append(`bathrooms[${i}][id]`, b.id);
        fd.append(`bathrooms[${i}][bathroom_type_id]`, b.bathroom_type_id);
        fd.append(`bathrooms[${i}][location]`, b.location_value);
        fd.append(`bathrooms[${i}][access_type]`, b.access_type);

        // Bathroom photos (File objects only)
        (b.photos || []).forEach((file, fi) => {
          if (file instanceof File) {
            fd.append(`bathrooms[${i}][photos][${fi}]`, file);
          }
        });
      });

      // DEBUG: Check raw state before building FormData
      console.log('=== DEBUG: Raw formData.rooms ===');
      formData.rooms.forEach((room, i) => {
        console.log(`Room ${i}:`, {
          room_type_id: room.room_type_id,
          features: room.features,
          beds: room.beds?.map(b => ({ bed_type_id: b.bed_type_id, count: b.counter })),
          imagesCount: room.photos?.length,
          imagesAreFiles: room.photos?.map(img => img instanceof File),
        });
      });
      console.log('=== DEBUG: Raw formData.bathrooms ===');
      formData.bathrooms.forEach((b, i) => {
        console.log(`Bathroom ${i}:`, {
          bathroom_type_id: b.bathroom_type_id,
          location_value: b.location_value,
          access_type: b.access_type,
          imagesCount: b.photos?.length,
          imagesAreFiles: b.photos?.map(img => img instanceof File),
        });
      });

      console.log('=== FormData entries ===');
      for (const [key, val] of fd.entries()) console.log(key, val);

      const result = await dispatch(addUnitsThunk(fd))
      if (result?.meta?.requestStatus === "fulfilled") {
        // Clear pending deletions after successful save
        setPendingDeleteRoomIds([]);
        setPendingDeleteBathroomIds([]);
        router.push(`/Pages/Services/Property_Module/Service/Edit?id=${formData.property_id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <MainLayout>
      <TitleOfHeader />
      <div className='border border-[#E6E6E6] p-8 rounded-[6px] mb-4'>

        {/* Page header */}
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 3 : </span>
            <span>{t('Rooms and bathrooms')}</span>
          </p>
          <div className='border border-[#E3E8EF] mt-4'></div>
        </div>

        {/* Rooms Accordion */}
        <div className='border border-[#E3E8EF] rounded-[6px] mt-6'>
          {/* Header - always visible */}
          <div className='w-full flex items-center justify-between px-4 py-3 bg-[#F8FAFC]'>
            <button
              type="button"
              onClick={() => setRoomsOpen(!roomsOpen)}
              className='flex items-center gap-2 flex-1 cursor-pointer'
            >
              <img src="/images/icons/bed-single-blue.svg" className="w-5 h-5" alt="" />
              <span className='text-[#364152] text-base font-medium'>{t('Room Information')}</span>
            </button>
            <button type="button" onClick={() => setRoomsOpen(!roomsOpen)} className='cursor-pointer'>
                <img
                  src="/images/icons/ArrowDown.svg"
                  className={`w-4 h-4 transition-transform duration-200 ${roomsOpen ? 'rotate-180' : ''}`}
                  alt=""
                />
              </button>
          </div>
          {/* Collapsible content */}
          {roomsOpen && (
            <div className='p-4'>
              <RoomPage
                rooms={formData.rooms}
                updateRoom={updateRoom}
                deleteRoom={deleteRoom}
                addRoom={addRoom}
              />
            </div>
          )}
        </div>






        {/* Bathrooms Accordion */}
        <div className='border border-[#E3E8EF] rounded-[6px] mt-4'>
          {/* Header - always visible */}
          <div className='w-full flex items-center justify-between px-4 py-3 bg-[#F8FAFC]'>
            <button
              type="button"
              onClick={() => setBathroomsOpen(!bathroomsOpen)}
              className='flex items-center gap-2 flex-1 cursor-pointer'
            >
              <img src="/images/icons/bathtub-blue.svg" className="w-5 h-5" alt="" />
              <span className='text-[#364152] text-base font-medium'>{t('Bathroom information')}</span>
            </button>
          <button type="button" onClick={() => setBathroomsOpen(!bathroomsOpen)} className='cursor-pointer'>
                <img
                  src="/images/icons/ArrowDown.svg"
                  className={`w-4 h-4 transition-transform duration-200 ${bathroomsOpen ? 'rotate-180' : ''}`}
                  alt=""
                />
              </button>
          </div>
          {/* Collapsible content */}
          {bathroomsOpen && (
            <div className='p-4'>
              <BathroomPage
                bathrooms={formData.bathrooms}
                updateBathroom={updateBathroom}
                deleteBathroom={deleteBathroom}
                addBathroom={addBathroom}
              />
            </div>
          )}
        </div>






        {/* Buttons */}
        <div className="flex mt-6">
          <div className='flex gap-2 justify-start w-full'>
            <button
              type="button"
              onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit?id=${id}`)}
              className="h-11 w-[30%] lg1:w-[15%] border border-[#697586] text-[#697586] rounded-[6px] cursor-pointer"
            >
              {t('Return')}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="h-11 w-[30%] lg1:w-[15%] bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer"
            >
              {t('Save changes')}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default function RoomsAndBathroomsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <RoomsAndBathroomsPageContent />
    </Suspense>
  )
}


