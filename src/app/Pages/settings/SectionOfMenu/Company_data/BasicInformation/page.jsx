"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { UpdateInSignupThunk } from "@/redux/slice/Auth/AuthSlice";
import { getProfileThunk, updateProfileImageThunk } from "@/redux/slice/Setting/SettingSlice";
import { IMAGE_BASE_URL } from "../../../../../../../config/imageUrl";

function BasicInformationPage({userData}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // image preview only (no backend)
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    company_name: userData?.company_name || "",
    short_bio: userData?.short_bio || "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        company_name: userData.company_name || "",
        short_bio: userData.short_bio || "",
      });
    }
  }, [userData]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "image/webp",
      "image/png",
      "image/svg+xml",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(t("Please select a valid image file (WEBP, PNG, SVG, JPG)"));
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert(t("File size should not exceed 5MB"));
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setSelectedFile(file);
  };

  const handleDeleteFile = () => {
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveChanges = async () => {
    try {
      // 1️⃣ Update Basic Info (Name, Bio)
      const signupData = {
        company_name: formData?.company_name,
        short_bio: formData?.short_bio,
      };

      await dispatch(UpdateInSignupThunk(signupData)).unwrap();

      // 2️⃣ Update Profile Image (if changed)
      if (selectedFile) {
        const imageData = new FormData();
        imageData.append("profile_image", selectedFile);
        await dispatch(updateProfileImageThunk(imageData)).unwrap();
      }

      // 3️⃣ Fetch updated profile
      const data = await dispatch(getProfileThunk()).unwrap();
      const updatedUserData = data.provider || data;

      if (updatedUserData) {
        // 4️⃣ Sync localStorage
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        window.dispatchEvent(new Event("storage"));
      }

      alert("Changes saved successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to save changes");
    }
  };




  console.log(userData);
  return (
    <div className="border border-[#E3E8EF] rounded-[8px] mb-8 overflow-hidden">
      <Header />

      <section className="p-6">
        {/* image*/}
        <div className=" mb-4">
          <p className="text-[#4B5565] text-base font-normal">{t('Company logo')}</p>
          <div className="py-4 px-6 border border-[#E3E8EF] rounded-[8px] mt-1.5 p-4">
            {!imagePreview && !userData?.image ? (
              <>
                <div className="w-full flex justify-center  mb-6">
                  <div className="w-30 h-30  border border-[#E3E8EF] rounded-full flex justify-center items-center">
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={handleFileSelect}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleFileSelect();
                      }}
                    >
                      <img src="/images/Avatar Image.svg" alt="avatar" />
                    </span>
                  </div>
                </div>
                <div className="w-full flex justify-center ">
                  <button
                    type="button"
                    className=" w-[50%] flex justify-center  gap-2 border border-[#E3E8EF] text-[var(--color-primary)] font-medium py-2.5 px-4 rounded-[10px] transition-all hover:border-[#C69815]/50 hover:bg-[#FFFDF8] cursor-pointer"
                    onClick={handleFileSelect}
                  >
                    <span>{t("Image selection")}</span>
                    <img src="/images/upload.svg" alt="upload" />
                  </button>
                </div>

              </>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={imagePreview || `${IMAGE_BASE_URL}/${userData?.image}`}
                  alt="Preview"
                  className="w-[112px] h-[112px] object-cover border border-[#EEF2F6] p-1 rounded-full cursor-pointer"
                />

                <div className="mt-3 ">
                  <button
                    type="button"
                    className="btn-primary w-[150px] h-10 rounded-[10px] text-white text-sm font-semibold cursor-pointer"
                    onClick={handleFileSelect}
                  >
                    {t("replace")}
                  </button>

                
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".webp,.png,.svg,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* company name */}
        <div>
          <p className="text-[#4B5565] text-sm font-medium mb-1.5 text-[#364152]">{t('Company Name')}</p>
          <input 
            type="text"
            name="company_name"
            value={formData?.company_name}
            onChange={handleInputChange}
            placeholder={t('Enter the company name')}             
            className="w-full h-11 px-4 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
          />
        </div>

        {/* company description */}
        <div className="mt-4">
          <p className="text-[#4B5565] text-sm font-medium mb-1.5 text-[#364152]">{t('Company Description')}</p>
          <textarea 
            type="text"
            name="short_bio"
            placeholder={t('Enter the company description')} 
            value={formData?.short_bio}  
            onChange={handleInputChange}           
            className="h-30 min-h-[88px] py-3 px-4 w-full rounded-[10px] border border-[#E3E8EF] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
          />
        </div>
      



        {/* btn */}
        <button 
          onClick={handleSaveChanges}
          className="btn-primary h-11 px-6 w-48 rounded-[10px] text-white text-sm font-semibold"
        >
          {t('Save changes')}
        </button>
      </section>

      
    </div>
  );
}

export default BasicInformationPage;


