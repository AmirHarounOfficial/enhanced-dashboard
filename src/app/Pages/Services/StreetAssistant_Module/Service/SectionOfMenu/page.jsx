import React from 'react'
import BatteryOperationPage from './BatteryOperation/page'
import WheelRepairPage from './WheelRepair/page'
import CarTransportPage from './CarTransport/page'
import CarUnlockPage from './CarUnlock/page'
import FuelDeliveryPage from './FuelDelivery/page'
import GeneralMaintenancePage from './GeneralMaintenance/page'

function SectionOfMenuPage({selectedMenu}) {

  const renderContent =()=>{
    switch(selectedMenu){
      case 40:
        return (
          <BatteryOperationPage/>
        )
      case 36:
        return (
          <WheelRepairPage/>
        )
      case 35:
        return(
          <CarTransportPage/>
        )
      case 37:
        return(
          <CarUnlockPage/>
        )
      case 39:
        return(
          <FuelDeliveryPage/>
        )
      case 38:
        return(
          <GeneralMaintenancePage/>
        )
    }
  }
  return (
    <>
    {renderContent()}
    </>
  )
}

export default SectionOfMenuPage