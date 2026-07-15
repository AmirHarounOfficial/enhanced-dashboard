"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import TitleOfHeader from '../../TitleOfHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addAmenitiesThunk, getAmenitiesThunk, getPropertiesAmenitiesThunk } from '@/redux/slice/Services/ServicesSlice';
import { IMAGE_BASE_URL } from '../../../../../../../../../../config/imageUrl';
import Loader from '@/app/Components/Loader/Loader';

function FacilitiesPageContent() {
  const {t} = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const from = searchParams.get('from')

  //api
  const dispatch = useDispatch()
  const {getPropertiesAmenities ,getAmenities } = useSelector((state)=>state.services)
  useEffect(() => {
    if (id) {
      dispatch(getPropertiesAmenitiesThunk(id));
      dispatch(getAmenitiesThunk());
    }
  }, [dispatch, id]); 
  
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  useEffect(() => {
    if (getPropertiesAmenities?.data) {
      const selected = [];

      getPropertiesAmenities.data.forEach(category => {
        category.amenities.forEach(am => {
          if (am.selected) { // حسب API عندك
            selected.push(am.id);
          }
        });
      });

      setSelectedAmenities(selected);
    }
  }, [getPropertiesAmenities]);

  const handleToggleAmenity = (id) => {
    setSelectedAmenities(prev => 
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleBack = () => {
    if (from === 'Add') {
      router.push(
        `/Pages/Services/Property_Module/Service/Add/FormData?property_id=${id}`
      )
    } else {
      router.push(
        `/Pages/Services/Property_Module/Service/Edit?id=${id}`
      )
    }
  }

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("property_id", id);

    selectedAmenities.forEach((amenityId) => {
      formData.append("amenities[]", amenityId);
    });

    try {
      await dispatch(addAmenitiesThunk(formData));
      if (from === 'Add') {
        router.push(`/Pages/Services/Property_Module/Service/Add/FormData?property_id=${id}`)
      } else {
        router.push(`/Pages/Services/Property_Module/Service/Edit?id=${formData.property_id}`)
      }
      console.log("Saved successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <TitleOfHeader/>
      
      <div className='border border-[#E6E6E6] p-8 rounded-[6px] mb-4'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 5 :</span>
            <span>{t('Facilities')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>واي فاي . صانع القهوة . ميكرويوف</p>
          <div className='border border-[#E3E8EF] my-4'></div>
        </div>
        
      
          {getPropertiesAmenities?.data?.map((item ,index)=>(
          <div key={index} className='border border-[#E3E8EF] mb-6 py-4 px-6'>
              
              <div  className='flex gap-2 mb-5'>
                <img src={`${IMAGE_BASE_URL}${item?.category?.icon}`} className="w-6 h-6" />
                <p className='text-[#364152] text-base font-medium'>{item?.category?.name}</p>
              </div>

              <div className=''>
              {item?.amenities?.map((amenity )=>(
                <div key={amenity?.id} className='mb-4  flex justify-between'>
                  <div className='flex gap-2  '>
                    <img src={`${IMAGE_BASE_URL}${amenity?.icon}`} className="w-6 h-6" />
                    <p className='text-[#4B5565] text-base font-medium'>{amenity?.name} </p>
                  </div>
                  <div>
                    <input 
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity?.id)}
                      onChange={() => handleToggleAmenity(amenity?.id)}
                      className="w-5 h-5 appearance-none border rounded-[6px] border-[#CDD5DF] bg-white checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-xs"
                    />
                  </div>
                </div>
              ))}
              </div>
          </div>
          ))}
        
        

      {/* btn */}
        <div className="flex  mt-6">
          
          <div className='flex gap-2 justify-start w-full '>
            <button
              onClick={handleBack}
              className="h-11 w-[30%] lg1:w-[15%]  border border-[#697586] text-[#697586] rounded-[6px] cursor-pointer"
            >
              {t('Return')}
            </button>

            <button
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

export default function FacilitiesPage() {
  return (
    <Suspense fallback={<Loader/>}>
      <FacilitiesPageContent />
    </Suspense>
  )
}



