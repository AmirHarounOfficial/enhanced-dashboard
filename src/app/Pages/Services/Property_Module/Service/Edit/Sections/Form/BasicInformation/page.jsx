"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TitleOfHeader from '../../TitleOfHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getBasicInfoThunk, getPropertyTypesThunk, UpdateBasicInfoThunk } from '@/redux/slice/Services/ServicesSlice';

function BasicInformationPageContent() {
  const {t} = useTranslation();

  const router = useRouter();
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const from = searchParams.get('from')
  
  //api
  const dispatch = useDispatch()
  const {getPropertyTypes, getBasicInfo} = useSelector((state)=>state.services)
  const getBasicInfoData = getBasicInfo?.data
  
  useEffect(() => {
    dispatch(getPropertyTypesThunk());
    if (id) {
      dispatch(getBasicInfoThunk(id));
    }
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    title:'',
    description:'',
    property_type_id:'',
    max_children:'',
    max_adults:'',
    children_equivalent_to_adult:'',
  })

  // Property type
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const optionPropertyType = getPropertyTypes?.data;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
      if (getBasicInfoData && optionPropertyType) {
        const selectedType = optionPropertyType.find(
          (item) => item.id === getBasicInfoData.property_type_id
        );
        setSelected1(selectedType);
      }
  }, [getBasicInfoData, optionPropertyType]);

  const [count, setCount] = useState(0);

  const [adultsCounter, setAdultsCounter] = useState(0);
  const [childrenCounter, setChildrenCounter] = useState(0);
  const [childrenReplacementCounter, setChildrenReplacementCounter] = useState(0);
  const [canReplaceAdults, setCanReplaceAdults] = useState(false);

  useEffect(()=>{
    if(getBasicInfoData){
      setFormData({
        title: getBasicInfoData?.title || '',
        description: getBasicInfoData?.description || '',
        property_type_id: getBasicInfoData?.property_type_id || '',
        max_children: getBasicInfoData?.max_children || '',
        max_adults: getBasicInfoData?.max_adults || '',
        children_equivalent_to_adult: getBasicInfoData?.children_equivalent_to_adult || '',
      });
      setAdultsCounter(getBasicInfoData?.max_adults || 0);
      setChildrenCounter(getBasicInfoData?.max_children || 0);
      setChildrenReplacementCounter(getBasicInfoData?.children_equivalent_to_adult || 0);
      setCanReplaceAdults(getBasicInfoData?.children_equivalent_to_adult > 0);
      if(getBasicInfoData?.description) setCount(getBasicInfoData.description.length);
    }
  },[getBasicInfoData])
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

  const handleSubmit = () => {
    if (!id) return;
    
    const dataToSubmit = {
      ...formData,
      max_adults: adultsCounter,
      max_children: childrenCounter,
      children_equivalent_to_adult: canReplaceAdults ? childrenReplacementCounter : 0,
    };

    dispatch(UpdateBasicInfoThunk({ property_id: id, formData: dataToSubmit })).then((res) => {
      if (!res.error) {
        if (from === 'Add') {
          router.push(`/Pages/Services/Property_Module/Service/Add/FormData?property_id=${id}`)
        } else {
          router.push(`/Pages/Services/Property_Module/Service/Edit?id=${formData.property_id}`)
        }
      }
    });
  };

  const increaseAdults = () => setAdultsCounter(prev => prev + 1);
  const decreaseAdults = () => { if (adultsCounter > 0) setAdultsCounter(prev => prev - 1); };

  const increaseChildren = () => setChildrenCounter(prev => prev + 1);
  const decreaseChildren = () => { if (childrenCounter > 0) setChildrenCounter(prev => prev - 1); };

  const increaseReplacement = () => setChildrenReplacementCounter(prev => prev + 1);
  const decreaseReplacement = () => { if (childrenReplacementCounter > 0) setChildrenReplacementCounter(prev => prev - 1); };

  const QuickTips = [
    {id:1 , title:t('Use clear and descriptive titles that highlight key attributes.')},
    {id:2 , title:t('Detailed descriptions increase booking chances by 40%.')},
    {id:3 , title:t('The exact property type helps guests find their perfect accommodation.')},
  ]




  return (
    <MainLayout>
      <TitleOfHeader/>
      
      <div className='border border-[#E6E6E6] p-8 rounded-[6px] mb-4'>

        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 1 :</span>
            <span>{t('Basic Information')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>الشقة بأكملها • 6 ضيوف كحد أقصى</p>
          <div className='border border-[#E3E8EF] my-4'></div>
        </div>

        <div className='flex gap-6 w-full mb-6 mt-10'>
          {/* Property Name */}
          <div className='w-full'>
            <p className='text-sm font-medium mb-1.5'>
              <span className='text-[#364152] '>{t('Property Name')} </span>
              <span className=' text-[#F04438]'>*</span>
            </p>
            <input 
              type="text"
              placeholder='مثال : - فيلا حي الروابي' 
              value={formData?.title}
              className='w-full h-11 px-4 border border-[#E3E8EF] text-sm text-[#364152] bg-white rounded-[10px] outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]'
              onChange={(e)=> setFormData(prev => ({...prev, title: e.target.value}))}
            />
          </div>

          {/* Property type */}
          <div className="flex flex-col w-full">
            <p className='text-sm font-medium mb-1.5'>
              <span className='text-[#364152] '>{t('Property type')} </span>
              <span className=' text-[#F04438]'>*</span>
            </p>

            <div className="relative w-full" ref={dropdownRef1}>
              <div
                className="relative flex items-center "
                onClick={() => setOpen1(!open1)}
              >
                <input
                  type="text"
                  placeholder={t("Select the main category")}
                  value={searchValue1 || selected1?.name || ""}                  
                  onChange={(e) => {
                    setSearchValue1(e.target.value);
                    setOpen1(true);
                    setSelected1(null);
                  }}

                  className='w-full h-11 px-4 border border-[#E3E8EF] text-sm text-[#364152] bg-white rounded-[10px] outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]'
                />

                <span className="absolute left-3 cursor-pointer">
                  {open1 ? (
                    <img src="/images/icons/ArrowUp.svg" alt="up" />
                  ) : (
                    <img src="/images/icons/ArrowDown.svg" alt="down" />
                  )}
                </span>
              </div>

              {open1 && (
                <ul className="absolute left-0 right-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10 max-h-48 overflow-y-auto">
                  {optionPropertyType
                    .filter((opt) =>
                      opt?.name?.toLowerCase().includes(searchValue1.toLowerCase())
                    )
                    .map((opt) => (
                      <li
                        key={opt?.id}
                        onClick={() => {
                          setSelected1(opt);
                          setSearchValue1("");
                          setOpen1(false);
                          setFormData(prev => ({...prev, property_type_id: opt?.id}))
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
        </div>
        
        {/* Property description */}
        <div className="flex flex-col">
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('Property description')} </span>
            <span className=' text-[#F04438]'>*</span>
          </p>
          <div className="relative w-full">
            <textarea
              value={formData?.description}
              onChange={(e) => {
                  setCount(e.target.value.length);
                  setFormData(prev => ({
                    ...prev,
                    description: e.target.value
                  }))
                }}             
              placeholder={t("Write a brief description of the property.")}
              maxLength={500}
              className="w-full min-h-[88px] border border-[#E3E8EF] rounded-[10px] px-4 py-3 text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
            />

            {/* counter */}
            <span className="absolute bottom-3 left-3 text-[#9A9A9A] text-sm">
              {count}/500
            </span>
          </div>
        </div>
        
        {/* note */}
        <div className='flex gap-2 mt-2'>
          <img src="/images/icons/note.svg" alt="" />
          <p className='text-[#9AA4B2] text-sm font-normal'>{t('Highlighting unique features and nearby landmarks')}</p>
        </div>
        

        {/* Maximum number of guests */}
        <div className='mt-4'>
          <p className='text-sm font-medium mb-4'>
            <span className='text-[#364152] '>{t('Maximum number of guests')} </span>
            <span className=' text-[#F04438]'>*</span>
          </p>
          {/*  */}
          <div className='flex gap-6 w-full'>
            {/* adults */}
            <div className='bg-[#F8FAFC] border border-[#EEF2F6] w-full h-11 rounded-[6px] px-3 flex items-center justify-between'>
              <div className='flex gap-3'>
                <img src="/images/icons/user-group-darkgray.svg" alt="" />
                <p className='text-[#4B5565] text-base font-normal'>{t('adults')}</p>
              </div>
              {/* Right Side (Counter) */}
              <div className='flex items-center gap-3'>
                
                {/* Minus */}
                <button
                  onClick={decreaseAdults}
                  className='w-9 h-9 rounded-[8px] border border-[#E3E8EF] text-[#364152] hover:border-[#C69815] hover:text-[#C69815] flex items-center justify-center transition-all text-lg cursor-pointer'
                >
                  -
                </button>

                {/* Number */}
                <span className='text-[#364152] text-base font-medium w-3 text-center'>
                  {adultsCounter}
                </span>

                {/* Plus */}
                <button
                  onClick={increaseAdults}
                  className='w-9 h-9 rounded-[8px] border border-[#E3E8EF] text-[#364152] hover:border-[#C69815] hover:text-[#C69815] flex items-center justify-center transition-all text-lg cursor-pointer'
                >
                  +
                </button>

              </div>
            </div>
            {/* children */}
            <div className='bg-[#F8FAFC] border border-[#EEF2F6] w-full h-11 rounded-[6px] px-3 flex items-center justify-between'>
              <div className='flex gap-3'>
                <img src="/images/icons/user-group-darkgray.svg" alt="" />
                <p className='text-[#4B5565] text-base font-normal'>{t('children')}</p>
              </div>
              {/* Right Side (Counter) */}
              <div className='flex items-center gap-3'>
                
                {/* Minus */}
                <button
                  onClick={decreaseChildren}
                  className='w-9 h-9 rounded-[8px] border border-[#E3E8EF] text-[#364152] hover:border-[#C69815] hover:text-[#C69815] flex items-center justify-center transition-all text-lg cursor-pointer'
                >
                  -
                </button>

                {/* Number */}
                <span className='text-[#364152] text-base font-medium w-3 text-center'>
                  {childrenCounter}
                </span>

                {/* Plus */}
                <button
                  onClick={increaseChildren}
                  className='w-9 h-9 rounded-[8px] border border-[#E3E8EF] text-[#364152] hover:border-[#C69815] hover:text-[#C69815] flex items-center justify-center transition-all text-lg cursor-pointer'
                >
                  +
                </button>

              </div>
            </div>

          </div>


          {/*  */}
          <div>
            {/* note */}
            <div className='flex gap-2 my-3'>
              <input
                type="checkbox"
                checked={canReplaceAdults}
                onChange={(e) => setCanReplaceAdults(e.target.checked)}
                className="w-5 h-5 appearance-none border rounded-[6px]  border-[#CDD5DF] bg-white  checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex  checked:after:items-center checked:after:justify-center checked:after:text-xs"
              /> 
              <p className='text-[#232323] text-sm font-normal'>{t('Adults can be replaced by a number of children')}</p>      
            </div>
            
            {/*   */}
            {canReplaceAdults && (
              <div className='bg-[#F8FAFC] border border-[#EEF2F6] w-full h-11 rounded-[6px] px-3 flex items-center justify-between'>
                <div className=''>
                  <p className='text-[#4B5565] text-base font-normal'>{t('How many children replace one adult?')}</p>
                </div>
                {/* Right Side (Counter) */}
                <div className='flex items-center gap-3'>
                  
                  {/* Minus */}
                  <button
                    onClick={decreaseReplacement}
                    className='w-9 h-9 rounded-[8px] border border-[#E3E8EF] text-[#364152] hover:border-[#C69815] hover:text-[#C69815] flex items-center justify-center transition-all text-lg cursor-pointer'
                  >
                    -
                  </button>

                  {/* Number */}
                  <span className='text-[#364152] text-base font-medium w-3 text-center'>
                    {childrenReplacementCounter}
                  </span>

                  {/* Plus */}
                  <button
                    onClick={increaseReplacement}
                    className='w-9 h-9 rounded-[8px] border border-[#E3E8EF] text-[#364152] hover:border-[#C69815] hover:text-[#C69815] flex items-center justify-center transition-all text-lg cursor-pointer'
                  >
                    +
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>

        

        {/* Quick tips */}
        <div className='border border-[#FEDF89] bg-[#FFFCF5] rounded-[6px] px-3 py-4 mt-4'>
          <div className='flex gap-2'>
            <img src="/images/icons/ii.svg" alt="" />
            <p className='text-[#364152] text-base font-medium'>{t('Quick tips')}</p>
          </div>
            
          <div className='flex flex-col gap-2   my-4'>
            {QuickTips?.map((items,index)=>(
            <div key={items?.id} className='flex gap-1 w-[95%]  '>
              <img src="/images/icons/true.svg" className="w-6 h-6 " />
              <p className='text-[#4B5565] text-sm font-normal  '>{items?.title}</p>
            </div>
          ))}
          </div>


        </div>





      {/* btn */}
        <div className="flex  mt-6">
          
          <div className='flex gap-2 justify-start w-full '>
            <button
              onClick={handleBack}
              className="btn-ghost h-11 px-6 w-[30%] lg1:w-[15%] cursor-pointer"
            >
              {t('Return')}
            </button>

            <button
              onClick={handleSubmit}
              className="btn-primary h-11 px-6 w-[30%] lg1:w-[15%] rounded-[10px] text-white text-sm font-semibold cursor-pointer"
            >
              {t('Save changes')}
            </button>
          </div>
          
        </div>

      </div>
    </MainLayout>
  )
}

export default function BasicInformationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BasicInformationPageContent />
    </Suspense>
  );
}



