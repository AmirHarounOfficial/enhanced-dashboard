"use client"
import React, { Suspense, use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import MapDialog from './MapDialog';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import TitleOfHeader from '../../TitleOfHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '@/app/Components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addLocationThunk, getLocationThunk } from '@/redux/slice/Services/ServicesSlice';

function AddressPageContent() {
    const {t} = useTranslation();
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const from = searchParams.get('from')

    //api
    const dispatch = useDispatch()
    const { getLocation } = useSelector((state) => state.services)
    const getLocationData = getLocation?.data

    const [formData , setFormData] = useState({
      property_id:'',
      country:'',
      city:'',
      area:'',
      address:'',
      latitude:'',
      longitude:'',
      is_visible:true
    })


    useEffect(()=>{
      if(id){
        setFormData((prev) => ({
          ...prev,
          property_id:id
        }))
      }
    }, [id])

    useEffect(()=>{
      if(id){
        dispatch(getLocationThunk(id))
      }
    }, [id])

    useEffect(()=>{
      if(getLocationData){
        setFormData((prev)=>({
          ...prev , 
          country:getLocationData?.country || '',
          city:getLocationData?.city || '',
          area:getLocationData?.area || '',
          address:getLocationData?.address || '',
          latitude:getLocationData?.latitude || '',
          longitude:getLocationData?.longitude || '',
          is_visible: getLocationData?.is_visible ?? true        
        }))
      }
    },[getLocationData])


    const [count, setCount] = useState(0);
    const [openMap, setOpenMap] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(t('Click to open the map'));

    const handleMapConfirm = (data) => {
      setFormData((prev) => ({
        ...prev,
        address: data.address || '',
        latitude: data.lat || '',
        longitude: data.lng || '',
      }))

      setSelectedAddress(data.address)
      setCount(data.address?.length || 0)
    }

    const GreenSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
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
          borderRadius: 24 / 2,
          backgroundColor: '#E9E9EA',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
    }));

    const SiteTips = [
    {id:1 , title:t('The precise location helps guests easily find their royal accommodation.')},
    {id:2 , title:t('Your exact address will remain private until you book.')},
    {id:3 , title:t('A pin should be placed at the building entrance.')},
    ]

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
      try {
        const result = await dispatch(addLocationThunk(formData))

        if (result?.meta?.requestStatus === "fulfilled") {
          if (from === 'Add') {
            router.push(`/Pages/Services/Property_Module/Service/Add/FormData?property_id=${id}`)
          } else {
            router.push(`/Pages/Services/Property_Module/Service/Edit?id=${formData.property_id}`)
          }
        }
        
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <MainLayout>
      <TitleOfHeader/>
      
      <div className='border border-[#E6E6E6] p-8 rounded-[6px] mb-4'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 2 :</span>
            <span>{t('the address')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>القاهرة,مصر . القاهرة,مدينة نصر</p>
          <div className='border border-[#E3E8EF] my-4'></div>
        </div>

        {/* the address */}
        <div className="flex flex-col mt-10">
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('the address')} </span>
            <span className=' text-[#F04438]'>*</span>
          </p>
          <div className="relative w-full">
            <textarea
              value={formData?.address}
              onChange={(e) => {
                setCount(e.target.value.length)

                setFormData((prev) => ({
                  ...prev,
                  address: e.target.value
                }))
              }}
              placeholder={t("Write a brief description of the property.")}
              maxLength={500}
              className="w-full h-20 border border-[#C8C8C8] rounded-[6px] p-3 text-sm text-[#7d8d84]  outline-none "
            />

            {/* counter */}
            <span className="absolute bottom-3 left-3 text-[#9A9A9A] text-sm">
              {count}/500
            </span>
          </div>
        </div>

        {/*  */}
        <div className='border border-[#E3E8EF] p-3 rounded-[6px] flex justify-between mt-4'>
          <p className='text-[#4B5565] text-xs font-normal flex items-center '>{t('Show the user the exact and detailed address before booking')}</p>
          <div>
            <GreenSwitch
              checked={formData?.is_visible}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  is_visible: e.target.checked
                }))
              }
            />
          </div>
        </div>

        {/* note */}
        <div className='flex gap-2 mt-3'>
          <img src="/images/icons/ii.svg" alt="" />
          <p className='text-[#9AA4B2] text-sm font-normal'>{t('Disabling the display of the specified address will result in the user being shown a radius of one square kilometer until the booking is completed.')}</p>
        </div>

        {/* Locate the site on the map */}
        <div className='mt-6'>
          <p className='text-[#364152] text-sm font-medium'>{t('Locate the site on the map')}</p>

          <div 
            className='bg-[#F8FAFC] border border-[#EEF2F6] p-3 w-full  rounded-[6px] flex justify-between mt-4 cursor-pointer hover:bg-[#EEF2F6]'
            onClick={() => setOpenMap(true)}
          >
            <div className='flex gap-1 w-full'>
              <img src="/images/icons/location_gray.svg" alt="" />
              <p className='text-[#4B5565] text-xs font-normal flex items-center '>
                {selectedAddress}
              </p>
            </div>
            <p>
              <img src="/images/icons/google-map-icon.svg" alt="" />
            </p>
          </div>
        </div>

        <div className='border border-[#FEDF89] bg-[#FFFCF5] rounded-[6px] px-3 py-4 mt-4'>
          <div className='flex gap-2'>
            <img src="/images/icons/ii.svg" alt="" />
            <p className='text-[#364152] text-base font-medium'>{t('Site tips')}</p>
          </div>
            
          <div className='flex flex-col gap-2   my-4'>
            {SiteTips?.map((items,index)=>(
            <div key={items?.id} className='flex gap-1 w-[95%]  '>
              <img src="/images/icons/true.svg" className="w-6 h-6 " />
              <p className='text-[#4B5565] text-sm font-normal  '>{items?.title}</p>
            </div>
          ))}
          </div>
        </div>


        {/* Map Dialog */}
        <MapDialog 
          open={openMap} 
          handleClose={() => setOpenMap(false)} 
          onConfirm={handleMapConfirm}
        />

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

export default function AddressPage() {
  return (
    <Suspense fallback={<Loader/>}>
      <AddressPageContent />
    </Suspense>
  )
}


