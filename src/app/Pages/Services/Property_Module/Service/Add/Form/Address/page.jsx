"use client"
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import MapDialog from './MapDialog';
import { useDispatch, useSelector } from 'react-redux';
import { addLocationThunk } from '@/redux/slice/Services/ServicesSlice';

function AddressPage({prevStep , nextStep }) {
    const {t} = useTranslation();
    const [count, setCount] = useState(0);
    const [openMap, setOpenMap] = useState(false);

    const handleMapConfirm = (data) => {
      if (data.address) {
        setFormData(prev => ({
          ...prev,
          address: data.address,
          latitude: data.lat,
          longitude: data.lng,
          country: data.details?.country || '',
          city: data.details?.city || data.details?.state || '',
          area: data.details?.suburb || data.details?.neighbourhood || data.details?.town || '',
        }));
        setCount(data.address.length);
      }
    };

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

    //api
    const dispatch = useDispatch();
    const { addBasicProperty } = useSelector((state) => state.services);
    const [isVisible, setIsVisible] = useState(true);

    const [property_id, setProperty_id] = useState(() => {
      if (typeof window !== 'undefined') {
        return addBasicProperty?.data?.id || addBasicProperty?.id || sessionStorage.getItem('property_id') || null;
      }
      return addBasicProperty?.data?.id || addBasicProperty?.id || null;
    });

    useEffect(() => {
      if (addBasicProperty?.data?.id || addBasicProperty?.id) {
        const id = addBasicProperty?.data?.id || addBasicProperty?.id;
        setProperty_id(id);
        sessionStorage.setItem('property_id', id);
      }
    }, [addBasicProperty?.data?.id, addBasicProperty?.id]);

    const [formData, setFormData] = useState({
      country:"",
      city:"",
      area:"",
      address:"",
      latitude:"",
      longitude:"",
    });

    const [fieldErrors, setFieldErrors] = useState({});

    const handleSubmit = async (e) => {
      e.preventDefault();

      const errors = {};
      if (!formData.address.trim()) errors.address = true;

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});

        try {
          const data = new FormData();
          data.append("property_id", property_id || "");
          data.append("is_visible", isVisible ? 1 : 0);
          data.append("country", formData.country);
          data.append("city", formData.city);
          data.append("area", formData.area);
          data.append("address", formData.address);
          data.append("latitude", formData.latitude);
          data.append("longitude", formData.longitude);
          await dispatch(addLocationThunk(data)).unwrap();
          nextStep();
    
        } catch (err) {
          console.log(err);
        }
    }

  return (
    <>

      <div className='border border-[#E6E6E6] p-8 rounded-[6px]'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 2 :</span>
            <span>{t('the address')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>{t('Enter the address details to begin adding it')}</p>
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
              onChange={(e) => {
                setCount(e.target.value.length);
                setFormData({ ...formData, address: e.target.value });
                if (e.target.value.trim()) setFieldErrors(prev => ({...prev, address: false}));
              }}
              placeholder={t("Write a brief description of the property.")}
              maxLength={500}
              className={`w-full h-20 border rounded-[6px] p-3 text-sm text-[#7d8d84] outline-none ${fieldErrors.address ? 'border-[#F04438]' : 'border-[#C8C8C8]'}`}
              value={formData.address}
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
              checked={isVisible} 
              onChange={(e) => setIsVisible(e.target.checked)} 
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
                {t('Click to open the map')}
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
              className="h-11 w-[50%] lg1:w-[15%] bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer"
            >
              {t('the next')}
            </button>
          </div>
          
        </div>

      </div>
    </>
  )
}

export default AddressPage


