"use client"
import React, { useEffect, useState } from 'react'
import Company_dataPage from './Company_data/page'
import Personal_dataPage from './Personal_data/page'
import Marketer_PanelPage from './Marketer_Panel/page'
import BasicInformationPage from './Company_data/BasicInformation/page'
import YourFilesPage from './Company_data/YourFiles/page'
import ContactInformationPage from './Company_data/ContactInformation/page'
import ChangePasswordPage from './Company_data/ChangePassword/page'
import CompanyAddressPage from './Company_data/CompanyAddress/page'

function SectionOfMenuPage({ selectedMenu }) {
  const [userData, setUserData] =useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData({
        id: parsedUser?.id,
        firstname: parsedUser?.firstname,
        lastname: parsedUser?.lastname,
        national_id: parsedUser?.national_id,
        gender: parsedUser?.gender,
        nationality: parsedUser?.nationality,
        email: parsedUser?.email,
        phone: parsedUser?.phone,
        country_code: parsedUser?.country_code,

        company_name: parsedUser?.company_name,
        short_bio:  parsedUser?.short_bio,
        image : parsedUser?.image,

        company_phone:parsedUser?.company_phone,
        wts_number: parsedUser?.wts_number,

        address:parsedUser?.address,
        famous_sign:parsedUser?.famous_sign,
        street:parsedUser?.street,
        block_no: parsedUser?.block_no,
        apt_no: parsedUser?.apt_no,

        commercial_register: parsedUser?.commercial_register,
        tax_card: parsedUser?.tax_card,
        id_front: parsedUser?.id_front,
        id_back: parsedUser?.id_back,
        cr_end_date: parsedUser?.cr_end_date,
        tax_card_end_date: parsedUser?.tax_card_end_date,
        id_end_date: parsedUser?.id_end_date,

        middlename: parsedUser?.middlename,
      });
    }
  }, []);



  const renderContent = () => {
    switch(selectedMenu) {
      case 'Company_data':
        return (
          <Company_dataPage />
        )
      case 'BasicInformation':
        return (
          <BasicInformationPage userData={userData} />
        )
      case 'YourFiles':
        return (
          <YourFilesPage userData={userData} />
        )
      case 'ContactInformation':
        return (
          <ContactInformationPage userData={userData} />
        )
      case 'ChangePassword':
        return (
          <ChangePasswordPage  />
        )
      case 'CompanyAddress':
        return (
          <CompanyAddressPage userData={userData}/>
        )
      case 'Personal_data':
        return (
        <Personal_dataPage userData={userData} />
        )
      case 'Marketer_Panel':
        return (
          <Marketer_PanelPage userData={userData}/>
        )
    
    
    }
  }

  return (
    <div>{renderContent()}</div>
  )
}

export default SectionOfMenuPage