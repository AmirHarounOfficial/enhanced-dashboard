"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

function PersonalDataPage({handleNext , handleGoBack ,formData ,setFormData ,handleChange }) {
  const { t } = useTranslation();

  // images
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/webp", "image/png", "image/svg+xml", "image/jpeg"];
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

    // ⭐ ربط الصورة بالـ formData
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };


  const handleDeleteFile = () => {
  setImagePreview(null);
  if (fileInputRef.current) fileInputRef.current.value = "";

  // ⭐ مسح الصورة من formData
  setFormData((prev) => ({
    ...prev,
    image: null,
  }));
};


  //
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rules, setRules] = useState({
    uppercase: false,
    symbol: false,
    number: false,
    length: false,
  });

  // ✅ Handle password input and update rules
  const handlePasswordChange = (e) => {
  const value = e.target.value;
  setFormData(prev => ({ ...prev, password: value }));

  setRules({
    uppercase: /[A-Z]/.test(value),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    number: /[0-9]/.test(value),
    length: value.length >= 8,
  });
};

const handleConfirmPasswordChange = (e) => {
  setFormData(prev => ({ ...prev, password_confirmation: e.target.value }));
};


  // ✅ Check if passwords match
  const passwordsMatch =
    formData?.password_confirmation.length > 0 &&
    formData?.password === formData?.password_confirmation;

  return (
    <>
      {/* image */}
      <div className="  w-[30%] mb-8">
        <div className="py-4 px-6">
          {!imagePreview ? (
            <>
              <div className="w-full flex justify-center mb-6">
                <div className="w-38 h-38  border border-[#E3E8EF] rounded-[138px] flex justify-center items-center ">
                    <span
                      className=" "
                      onClick={handleFileSelect}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handleFileSelect();
                      }}
                    >
                      <img src="/images/Avatar Image.svg" alt="" />
                    </span>
                </div>
              </div>

              <div className=" ">
                <button
                  type="button"
                  className="w-full flex  justify-center gap-2 border border-[#E3E8EF] text-[var(--color-primary)] font-medium py-2.5 px-4 rounded-[10px] transition-all hover:border-[#C69815]/50 hover:bg-[#FFFDF8] cursor-pointer"
                  onClick={handleFileSelect}
                >
                <span>{t("Image selection")}</span>  
                <span><img src="/images/upload.svg" alt="" /></span>
                </button>
              </div>
            </>




          ) : (
            <div className="flex flex-col items-center">
              <img
                src={imagePreview}
                alt="Company Logo"
                className="w-[112px] h-[112px] object-cover border border-[#EEF2F6] p-1 rounded-full"
              />

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="w-[150px] h-10 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[10px] font-medium hover:bg-[#C69815]/8 transition-colors cursor-pointer"
                  onClick={handleFileSelect}
                >
                  {t("replace")}
                </button>
                <button
                  type="button"
                  className="w-[150px] h-10 border border-[#F04438] text-[#F04438] rounded-[10px] font-medium hover:bg-[#FEF3F2] transition-colors cursor-pointer"
                  onClick={handleDeleteFile}
                >
                  {t("delete")}
                </button>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            name="image"
            type="file"
            accept=".webp,.png,.svg,.jpg,.jpeg,image/webp,image/png,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <form action="" className="grid grid-cols-2 gap-6 mb-6">
        {/* first name */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal">{t('First Name')}</label>
          <input 
            type="text"
            name='firstname' 
            value={formData?.firstname}
            onChange={handleChange}
            placeholder={t('Enter first name')}
            className="w-full h-11 px-4 mt-3 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]" />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal">{t('Last Name')}</label>
          <input 
            type="text" 
            name='lastname'
            value={formData?.lastname}
            onChange={handleChange}
            placeholder={t('Enter last name/family name')}
            className="w-full h-11 px-4 mt-3 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]" />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal">{t('Email')}</label>
          <input 
            type="text" 
            name='email'
            value={formData?.email}
            onChange={handleChange}
            placeholder={t('Enter your email')}
            className="w-full h-11 px-4 mt-3 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]" />
        </div>

        {/* Mobile number */}
        <div className="flex flex-col ">
          <label className="text-[#364152] text-base font-normal mb-3 block">
            {t("Mobile number")}
          </label>

          <div className="relative">
            <PhoneInput
              country={"sa"}
              value={formData?.phone}  
              onChange={(value, country) => {
                setFormData({
                  ...formData,
                  phone: value,               
                  country_code: country.dialCode  
                });
              }}
              placeholder="000000000"
              containerClass="!w-full"
              inputClass="!w-full !h-11 !border !border-[#E3E8EF] !rounded-[10px] !pl-24 !text-left !text-sm !text-[#364152] placeholder-[#9AA4B2] focus:!border-[#C69815] focus:!shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] outline-none transition-all duration-150"
              buttonClass="!absolute !left-0 !top-0 !h-full !px-3 !flex !items-center !gap-2 !bg-transparent !border-r-0"
              dropdownClass="!absolute !left-0 !top-full !mt-1 !z-50  !border !border-[#C8C8C8] !rounded-md !shadow-sm"
          
            />

            
          </div>
        </div>
    
        {/* New Password */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal">
            {t("password")}
          </label>

          <div className="relative mt-3">
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <img src="/images/icons/eyeClose.svg" alt="Hide password" />
              ) : (
                <img src="/images/icons/eyeOpen.svg" alt="Show password" />
              )}
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={formData?.password}
              placeholder={t("Enter your password")}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handlePasswordChange}
              className="w-full h-11 py-3 pe-4 ps-10 rounded-[10px] border border-[#E3E8EF] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
            />
          
          </div>

          {/* Show rules only when focused */}
          {isFocused && (
            <ul className="mt-3 mb-6 space-y-1 text-sm">
              <li
                className={
                  rules.uppercase
                    ? "text-[#067647] list-none flex gap-2"
                    : "text-[#697586] list-disc mx-5"
                }
              >
                <span>
                  {rules.uppercase && <img src="/images/icons/true.svg" alt="" />}
                </span>
                <span>{t("Use at least one uppercase letter")}</span>
              </li>

              <li
                className={
                  rules.symbol
                    ? "text-[#067647] list-none flex gap-2"
                    : "text-[#697586] list-disc mx-5"
                }
              >
                <span>
                  {rules.symbol && <img src="/images/icons/true.svg" alt="" />}
                </span>
                <span>{t("Use at least one symbol")}</span>
              </li>

              <li
                className={
                  rules.number
                    ? "text-[#067647] list-none flex gap-2"
                    : "text-[#697586] list-disc mx-5"
                }
              >
                <span>
                  {rules.number && <img src="/images/icons/true.svg" alt="" />}
                </span>
                <span>{t("Use at least one number")}</span>
              </li>

              <li
                className={
                  rules.length
                    ? "text-[#067647] list-none flex gap-2"
                    : "text-[#697586] list-disc mx-5"
                }
              >
                <span>
                  {rules.length && <img src="/images/icons/true.svg" alt="" />}
                </span>
                <span>{t("Your password must be at least 8 characters long")}</span>
              </li>
            </ul>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col ">
          <label className="text-[#364152] text-base font-normal">
            {t("Confirm password")}
          </label>

          <div className="relative mt-3">
            <span
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPasswordConfirm ? (
                <img src="/images/icons/eyeClose.svg" alt="Hide password" />
              ) : (
                <img src="/images/icons/eyeOpen.svg" alt="Show password" />
              )}
            </span>
              <input
                type={showPasswordConfirm ? "text" : "password"}
                value={formData?.password_confirmation}
                placeholder={t("Re-enter your password")}
                onChange={handleConfirmPasswordChange}
                className={`w-full h-11 py-3 pe-4 ps-10 rounded-[10px] border text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] ${
                  formData?.password_confirmation
                    ? formData?.password === formData?.password_confirmation
                      ? "border-[#067647]"
                      : "border-[#F04438]"
                    : "border-[#E3E8EF]"
                }`}
              />
          
          </div>

          {confirmPassword.length > 0 && (
            <p
              className={`mt-2 text-sm ${
                passwordsMatch ? "text-[#067647]" : "text-[#F04438]"
              }`}
            >
              {passwordsMatch
                ? t("Passwords match") 
                : t("Passwords do not match")}
            </p>
          )}
        </div>

      </form>
        {/* National ID number */}
        <div className="flex flex-col w-full mb-6">
          <label className="text-[#364152] text-base font-normal">{t('National ID number')}</label>
          <input 
            type="text" 
            name="national_id"
            value={formData?.national_id}
            onChange={handleChange}
            placeholder={t('Enter your national ID number')}
            className="w-full h-11 px-4 mt-3 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]" />
        </div>

      
    {/* btns */}
    <div className="my-12 flex gap-3">

      <button
        onClick={handleGoBack}
        className="btn-ghost w-48 h-11 px-6 rounded-[10px] text-sm font-medium cursor-pointer">
          {t('cancel')}
      </button>

      <button
        onClick={handleNext}
        className="btn-primary w-58 h-11 px-6 rounded-[10px] text-white text-sm font-semibold cursor-pointer">
          {t('the next')}
      </button>

    </div>
    </>
  );
}

export default PersonalDataPage;





