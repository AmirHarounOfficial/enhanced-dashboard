"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Property_Module from './Property_Module/page';
import Home_Car_Street_Module from './Home_Car_Street_Module/page';


function settingsPage() {
  const {t} = useTranslation();
  const [current_module_key, setCurrentModuleKey] = useState(null)
  useEffect(() => {
    const fetchUserData = () => {
      const userData = JSON.parse(localStorage.getItem('user'))
      setCurrentModuleKey(userData?.current_module_key ?? null)
    }

    fetchUserData()
    window.addEventListener('user_updated', fetchUserData)
    window.addEventListener('storage', fetchUserData)
    
    return () => {
      window.removeEventListener('user_updated', fetchUserData)
      window.removeEventListener('storage', fetchUserData)
    }
  }, [])
  
  let content ;

    if (current_module_key === 'home_services' || current_module_key === 'car_services' || current_module_key === 'street_assistant') {
      content = <Home_Car_Street_Module />
    } else if (current_module_key === 'property_rental') {
      content = <Property_Module />
    } else {
      content =(
        <MainLayout>
          <div className='flex justify-center items-center text-[#F04438] text-2xl'>
            {t('No data for')}  ({t(current_module_key)})
          </div>
        </MainLayout>
      ) 
    }
  return (
    <>
      {content}
    </>
  )
}

export default settingsPage
