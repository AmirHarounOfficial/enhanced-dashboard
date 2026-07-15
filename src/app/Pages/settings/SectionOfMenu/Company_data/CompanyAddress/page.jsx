"use client";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import MapDialog from "./MapDialog";
import { useDispatch } from "react-redux";
import { UpdateInSignupThunk } from "@/redux/slice/Auth/AuthSlice";
import { getProfileThunk } from "@/redux/slice/Setting/SettingSlice";

function CompanyAddressPage({userData }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  //map
  const [address, setAddress] = useState(userData?.address);
  const [street, setStreet] = useState(userData?.street || "");
  const [famousSign, setFamousSign] = useState(userData?.famous_sign || "");
  const [blockNo, setBlockNo] = useState(userData?.block_no || "");
  const [aptNo, setAptNo] = useState(userData?.apt_no || "");
  const [open, setOpen] = useState(false);

  const handleConfirm = (newAddress) => {
    setAddress(newAddress);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      const formData = {
        address,
        street,
        famous_sign: famousSign,
        block_no: blockNo,
        apt_no: aptNo,
      };

      // 1️⃣
      await dispatch(UpdateInSignupThunk(formData)).unwrap();

      // 2️⃣
      const data = await dispatch(getProfileThunk()).unwrap();
      const userData = data.provider || data;

      if (userData) {
        // 3️⃣
        localStorage.setItem("user", JSON.stringify(userData));
        window.dispatchEvent(new Event("storage"));
      }

      setAddress(userData?.address || "");
      setStreet(userData?.street || "");
      setFamousSign(userData?.famous_sign || "");
      setBlockNo(userData?.block_no || "");
      setAptNo(userData?.apt_no || "");

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
      {/*  Location  */}
        <div className="flex flex-col mb-4">
          <label className="text-[#4B5565] text-base font-normal mb-1.5">
            {t("Location")}
          </label>
          <div className="relative">
            <div
              onClick={handleClickOpen}
              className="h-14 p-3 w-full rounded-[6px] border border-[#E3E8EF] shadow-xm outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal" 
            >
              <span
                className={`text-sm ${
                  address ? "text-black" : "text-[#9A9A9A]"
                }`}
              >
                {address || t("Enter the address")}
              </span>
            </div>
            <img
              src="/images/icons/locationDarkBlack.svg"
              alt="location"
              className="absolute left-3 top-4 pointer-events-none"
            />
          </div>
        </div>

        {/*street */}
        <div>
          <p className="text-[#4B5565] text-base font-normal  mb-1.5">{t('street')}</p>
          <input 
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="h-14 p-3 w-full rounded-[6px] border border-[#E3E8EF] shadow-xm outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal" 
          />
        </div>
        
        {/*famous sign */}
        <div className="mt-4">
          <p className="text-[#4B5565] text-base font-normal  mb-1.5">{t('famous sign')}</p>
          <input 
            type="text"
            value={famousSign}
            onChange={(e) => setFamousSign(e.target.value)}
            className="h-14 p-3 w-full rounded-[6px] border border-[#E3E8EF] shadow-xm outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal" 
          />
        </div>

        <div className="flex gap-4 mt-4  w-full">
          {/* Property number */}
          <div className="w-full">
            <p className="text-[#4B5565] text-base font-normal  mb-1.5">{t('Property number')}</p>
            <input 
              type="text"
              value={blockNo}
              onChange={(e) => setBlockNo(e.target.value)}
              className="h-14 p-3 w-full rounded-[6px] border border-[#E3E8EF] shadow-xm outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal" 
            />
          </div>

          {/*Apartment number */}
          <div className="w-full">
            <p className="text-[#4B5565] text-base font-normal  mb-1.5">{t('Apartment number')}</p>
            <input 
              type="text"
              value={aptNo}
              onChange={(e) => setAptNo(e.target.value)}
              className="h-14 p-3 w-full rounded-[6px] border border-[#E3E8EF] shadow-xm outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal" 
            />
          </div>
        </div>


        {/* btn */}
        <button 
          onClick={handleSaveChanges}
          className="bg-[var(--color-primary)] h-11 w-62.5 mt-6 text-[#fff] text-base font-medium rounded-[6px]">
          {t('Save changes')}
        </button>
      </section>

      


      {/* 🗺️ Map Dialog Component */}
            <MapDialog
              open={open}
              handleClose={handleClose}
              onConfirm={handleConfirm}
            />
    </div>
    
  );
}

export default CompanyAddressPage;


