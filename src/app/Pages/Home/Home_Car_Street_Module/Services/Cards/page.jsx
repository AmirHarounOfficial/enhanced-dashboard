'use client';
import React from 'react'
import HomeAndCarServiceCardPages from './HomeAndCarServiceCard/pages'
import StreetAssistantServiceCardPage from './StreetAssistantServiceCard/page';
import NoModuleAvailableWithoutSidebar from '@/app/Components/DaialogsOfNavbar/NoModuleAvailableWithoutSidebar';

function CardsPage({ current_module_key }) {
  let content;

  if (current_module_key === 'car_services' ||current_module_key === 'home_services' ) {
    content = <HomeAndCarServiceCardPages current_module_key={current_module_key}/>;
  } else if (current_module_key === 'street_assistant') {
    content = <StreetAssistantServiceCardPage current_module_key={current_module_key}/>;
  } else {
    content = <NoModuleAvailableWithoutSidebar/>
  }

  return (
    <>
      {content}
    </>
  )
}

export default CardsPage