'use client'
import React, { useEffect, useState } from 'react'
import Home_Car_Module from './Home_Car_Module/Service/page';
import StreetAssistant_Module from './StreetAssistant_Module/Service/page';
import Property_Module from './Property_Module/Service/page';
import NoModuleAvailable from '@/app/Components/DaialogsOfNavbar/NoModuleAvailable';


function Servicespage() {
  const [current_module_key, setCurrentModuleKey] = useState(null)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setCurrentModuleKey(userData?.current_module_key ?? null)
  }, [])


  let content;

  if (current_module_key === 'car_services' || current_module_key === 'home_services' ) {
    content = <Home_Car_Module />;
  } else if (current_module_key === 'street_assistant') {
    content = <StreetAssistant_Module />;
  }else if (current_module_key === 'property_rental') {
    content = <Property_Module/>;

  } else {
    content = <NoModuleAvailable/>
  }
  return (
    <>
      {content}
    </>
  )
}

export default Servicespage
