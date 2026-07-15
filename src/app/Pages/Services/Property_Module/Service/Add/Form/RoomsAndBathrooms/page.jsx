"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import RoomPage from './Room/page';
import BathroomPage from './Bathroom/page';
import { useDispatch, useSelector } from 'react-redux';
import { addUnitsThunk } from '@/redux/slice/Services/ServicesSlice';

function RoomsAndBathroomsPage({prevStep , nextStep }) {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const {addBasicProperty} = useSelector((state) => state.services);

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [propertyId, setPropertyId] = useState("");

  // Use refs to hold latest rooms/bathrooms from children
  const roomsRef = useRef([]);
  const bathroomsRef = useRef([]);

  useEffect(() => {
    const propId = addBasicProperty?.id || sessionStorage.getItem('property_id');
    if (propId) {
      setPropertyId(propId);
    }
  }, [addBasicProperty]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const rooms = roomsRef.current;
    const bathrooms = bathroomsRef.current;

    // --- Frontend validation ---
    const validationErrors = [];
    if (rooms.length === 0) {
      validationErrors.push(t('Please add at least one room.'));
    }
    rooms.forEach((room, i) => {
      if (!room.room_type_id) {
        validationErrors.push(t(`Room ${i + 1}: Please select a room type.`));
      }
    });
    bathrooms.forEach((bathroom, i) => {
      if (!bathroom.bathroom_type_id) {
        validationErrors.push(t(`Bathroom ${i + 1}: Please select a bathroom type.`));
      }
    });
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // --- Build FormData ---
    const data = new FormData();
    data.append("property_id", propertyId);

    rooms.forEach((room, rIdx) => {
      data.append(`rooms[${rIdx}][room_type_id]`, room.room_type_id);

      // Beds
      if (room.beds && room.beds.length > 0) {
        room.beds.forEach((bed, bIdx) => {
          if (bed.bed_type_id) {
            data.append(`rooms[${rIdx}][beds][${bIdx}][bed_type_id]`, bed.bed_type_id);
            data.append(`rooms[${rIdx}][beds][${bIdx}][count]`, bed.counter || 1);
          }
        });
      }

      // Amenity IDs (features)
      if (room.features && room.features.length > 0) {
        room.features.forEach((amenityId, aIdx) => {
          data.append(`rooms[${rIdx}][amenity_ids][${aIdx}]`, amenityId);
        });
      }

      // Photos
      if (room.images && room.images.length > 0) {
        room.images.forEach((file, pIdx) => {
          data.append(`rooms[${rIdx}][photos][${pIdx}]`, file);
        });
      }
    });

    bathrooms.forEach((bathroom, bIdx) => {
      data.append(`bathrooms[${bIdx}][bathroom_type_id]`, bathroom.bathroom_type_id);

      // Location (raw value: "inside" / "common")
      if (bathroom.location) {
        data.append(`bathrooms[${bIdx}][location]`, bathroom.location);
      }

      // Access type (selectedFeature: 1=private, 2=public)
      if (bathroom.selectedFeature) {
        const accessType = bathroom.selectedFeature === 1 ? 'private' : 'public';
        data.append(`bathrooms[${bIdx}][access_type]`, accessType);
      }

      // Photos
      if (bathroom.images && bathroom.images.length > 0) {
        bathroom.images.forEach((file, pIdx) => {
          data.append(`bathrooms[${bIdx}][photos][${pIdx}]`, file);
        });
      }
    });

    try {
      setLoading(true);
      await dispatch(addUnitsThunk(data)).unwrap();
      nextStep();
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
          <span>{t('Step')} 3 :</span>
          <span>{t('Rooms and bathrooms')}</span>
        </p>
        <p className='text-[#697586] text-base font-normal'>{t('Enter the room and bathroom details to begin adding them.')}</p>
        <div className='border border-[#E3E8EF] mt-4'></div>
      </div>


      <>
        <RoomPage onRoomsChange={(rooms) => { roomsRef.current = rooms; }} />
        <BathroomPage onBathroomsChange={(bathrooms) => { bathroomsRef.current = bathrooms; }} />
      </>



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
            className="h-11 w-[50%] lg1:w-[15%]  border border-[#697586] text-[#697586] rounded-[6px] cursor-pointer"
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

export default RoomsAndBathroomsPage


