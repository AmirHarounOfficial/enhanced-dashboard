
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { UpdateInSignupThunk } from "@/redux/slice/Auth/AuthSlice";
import { getProfileThunk } from "@/redux/slice/Setting/SettingSlice";

function ContactInformationPage({userData}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [contactData, setContactData] = useState({
    company_phone: userData?.company_phone || "",
    wts_number: userData?.wts_number || ""
  });

  useEffect(() => {
    if (userData) {
      setContactData({
        company_phone: userData?.company_phone || "",
        wts_number: userData?.wts_number || ""
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const formData = {
        company_phone: contactData.company_phone,
        wts_number: contactData.wts_number,
      };

      // 1️⃣ Update backend
      await dispatch(UpdateInSignupThunk(formData)).unwrap();

      // 2️⃣ Fetch updated profile
      const data = await dispatch(getProfileThunk()).unwrap();
      const updatedUserData = data.provider || data;

      if (updatedUserData) {
        // 3️⃣ Sync localStorage
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        window.dispatchEvent(new Event("storage"));
      }

      alert("Changes saved successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to save changes");
    }
  };



  return (
    <div className="border border-[#E3E8EF] rounded-[8px] mb-8 overflow-hidden">
      <Header />

      <section className="p-6">
        

        {/* Company number */}
        <div>
          <p className="text-[#4B5565] text-base font-normal  mb-1.5">{t('Company number')}</p>
          <input 
            type="text"
            name="company_phone"
            value={contactData?.company_phone}
            onChange={handleChange}
            placeholder='0000000000000'            
            className="w-full h-11 px-4 rounded-[10px] border border-[#E3E8EF] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
          />
        </div>

        {/* WhatsApp number */}
        <div className="mt-4"> 
          <p className="text-[#4B5565] text-base font-normal  mb-1.5">{t('WhatsApp number')}</p>
          <input 
            type="text"
            name="wts_number"
            value={contactData?.wts_number}
            onChange={handleChange}
            placeholder='0000000000000'            
            className="w-full h-11 px-4 rounded-[10px] border border-[#E3E8EF] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
          />
        </div>

        
      



        {/* btn */}
        <button 
          onClick={handleSaveChanges}
          className="btn-primary h-11 px-6 w-62.5 rounded-[10px] text-white text-sm font-semibold mt-6 cursor-pointer"
        >
          {t('Save changes')}
        </button>
      </section>

      
    </div>
  );
}

export default ContactInformationPage;


