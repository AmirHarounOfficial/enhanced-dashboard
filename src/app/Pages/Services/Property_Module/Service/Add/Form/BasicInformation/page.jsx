"use client"
import { addBasicInfoThunk, getPropertyTypesThunk } from '@/redux/slice/Services/ServicesSlice';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';

function BasicInformationPage({prevStep , nextStep }) {
  const {t} = useTranslation();
  
  //api
  const dispatch = useDispatch()
  const {getPropertyTypes} = useSelector((state)=>state.services)
  useEffect(()=>{
    dispatch(getPropertyTypesThunk())
  },[dispatch])


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

  const [count, setCount] = useState(0);

  const [adultsCounter, setAdultsCounter] = useState(1);
  const [childrenCounter, setChildrenCounter] = useState(1);
  const [childrenReplacementCounter, setChildrenReplacementCounter] = useState(1);
  const [canReplaceAdults, setCanReplaceAdults] = useState(false);

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

  //api
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type_id:"",
    max_children:"",
    max_adults:"",
    children_equivalent_to_adult:"",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const errors = {};
    if (!formData?.title.trim()) errors.title = true;
    if (!formData?.description.trim()) errors.description = true;
    if (!formData?.property_type_id) errors.property_type_id = true;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    try {
      const data = new FormData();
      data.append("title", formData?.title);
      data.append("description", formData?.description);
      data.append("property_type_id", formData?.property_type_id);
      data.append("max_children", childrenCounter);
      data.append("max_adults", adultsCounter);
      data.append("children_equivalent_to_adult", canReplaceAdults ? childrenReplacementCounter : 1);

      await dispatch(addBasicInfoThunk(data)).unwrap();
      nextStep();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className='border border-[#E6E6E6] p-8 rounded-[6px]'>

      <div>
        <p className='text-[#364152] text-xl font-medium mb-3'>
          <span>{t('Step')} 1 :</span>
          <span>{t('Basic Information')}</span>
        </p>
        <p className='text-[#697586] text-base font-normal'>{t('Enter the basic property details to begin adding them.')}</p>
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
            name='title'
            placeholder='مثال : - فيلا حي الروابي' 
            className={`w-full h-11 px-4 border rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] ${fieldErrors.title ? 'border-[#F04438]' : 'border-[#E3E8EF]'}`}
            onChange={(e)=>{
              setFormData({...formData, title: e.target.value});
              if (e.target.value.trim()) setFieldErrors(prev => ({...prev, title: false}));
            }}
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
                value={searchValue1 || selected1 || ""}
                onChange={(e) => {
                  setSearchValue1(e.target.value);
                  setOpen1(true);
                  setSelected1(null);
                }}

                className={`w-full h-11 px-4 border rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] ${fieldErrors.property_type_id ? 'border-[#F04438]' : 'border-[#E3E8EF]'}`}
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
                        setSelected1(opt?.name);
                        setSearchValue1("");
                        setOpen1(false);
                        setFormData({ ...formData, property_type_id: opt?.id });
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
            onChange={(e) => {
              setCount(e.target.value.length);
              setFormData({ ...formData, description: e.target.value });
              if (e.target.value.trim()) setFieldErrors(prev => ({...prev, description: false}));
            }}
            placeholder={t("Write a brief description of the property.")}
            maxLength={500}
            className={`w-full min-h-[88px] px-4 py-3 border rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] ${fieldErrors.description ? 'border-[#F04438]' : 'border-[#E3E8EF]'}`}
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


        {/* children replace one adult  */}
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
          
          {/* children equivalent to adult */}
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
      <div className="flex justify-between mt-10">
        <div className='w-full '>
          <button
            onClick={prevStep}
            className="btn-ghost h-11 px-6 w-[50%] lg1:w-[15%] cursor-pointer"
          >
            {t('the previous')}
          </button>
        </div>

        <div className='flex gap-2 justify-end w-full '>
          <button
            className="btn-ghost h-11 px-6 w-[50%] lg1:w-[15%] cursor-pointer"
          >
            {t('Save draft')}
          </button>

          <button
            onClick={handleSubmit}
            className="btn-primary h-11 px-6 w-[50%] lg1:w-[15%] rounded-[10px] text-white text-sm font-semibold cursor-pointer"
          >
            {t('the next')}
          </button>
        </div>
        
      </div>

    </div>
    
  
    </>
  )
}

export default BasicInformationPage



