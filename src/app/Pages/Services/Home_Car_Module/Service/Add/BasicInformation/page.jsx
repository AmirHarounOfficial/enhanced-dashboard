"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import dayjs from 'dayjs';
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllAreasThunk, getCategoriesThunk, getmodulesThunk } from "@/redux/slice/Services/ServicesSlice";


function BasicInformationPage({handleGoBack ,handleNext ,formData,handleChange}) {
  const { t } = useTranslation();

  const dispatch = useDispatch()
  const {getmodules ,getCategories , getAreas } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getmodulesThunk());
    dispatch(getCategoriesThunk());
    dispatch(getAllAreasThunk())
  }, [dispatch]);


  // upload images
  const fileInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);
  const MAX_IMAGES = 7;

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);

    if ((formData.images?.length || 0) + files.length > MAX_IMAGES) {
      alert(`${t("Maximum number of photos")} ${MAX_IMAGES}`);
      return;
    }

    setPreviewImages((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    handleChange("images", [...(formData.images || []), ...files]);
  };

  const handleDelete = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    handleChange(
      "images",
      formData.images.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    dispatch(getmodulesThunk());
  }, [dispatch]);

  // =========================
  // Main Classification (1)
  // =========================
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const optionMainClassification = getmodules || [];

  useEffect(() => {
    if (selected1?.id) {
      dispatch(getCategoriesThunk(selected1.id));
      // ⭐ Reset dropdown 2 + 3 when changing main category
      setSelected2(null);
      setSearchValue2("");
      setSelected3(null);
      setSearchValue3("");
    }
  }, [selected1, dispatch]);

  // =========================
  // Subcategory (2)
  // =========================
  const [open2, setOpen2] = useState(false);
  const [selected2, setSelected2] = useState(null);
  const [searchValue2, setSearchValue2] = useState("");
  const dropdownRef2 = useRef(null);
  const optionSubcategory = getCategories || [];

  // =========================
  // Sub-service (3)
  // =========================
  const [open3, setOpen3] = useState(false);
  const [selected3, setSelected3] = useState(null);
  const [searchValue3, setSearchValue3] = useState("");
  const dropdownRef3 = useRef(null);

  // ⭐ ONLY children of selected category
  const optionSubService = selected2?.children || [];

  
  // ServiceActivityLocation 4
  const [open4, setOpen4] = useState(false);
  const [selected4, setSelected4] = useState("");
  const [searchValue4, setSearchValue4] = useState("");
  const dropdownRef4 = useRef(null);
  const optionServiceActivityLocation =
    getAreas?.areas?.map((area) => ({
      id: area.id, 
      city: area.city,
    })) || [];

  const handleSelectArea = (option) => {
    if (!formData.provider_areas_id.some((a) => a.id === option.id)) {
      const updated = [...formData.provider_areas_id, option];
      handleChange("provider_areas_id", updated);
    }
    setOpen4(false);
  };

  const handleRemoveArea = (index) => {
    const updated = formData.provider_areas_id.filter((_, i) => i !== index);
    handleChange("provider_areas_id", updated);
  };

  // Time 5
  const [open5, setOpen5] = useState(false);
  const [tempTime, setTempTime] = useState(null); 
  const [confirmedTime, setConfirmedTime] = useState(
    formData?.duration ? dayjs(formData.duration, "HH:mm") : null
  );

  const formattedTime = confirmedTime ? dayjs(confirmedTime).format("HH:mm") : "";

  const handleOkClick = () => {
    setConfirmedTime(tempTime);
    setOpen5(false);
  const formatted = dayjs(tempTime).format("HH:mm");
  handleChange("duration", formatted);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
      if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) setOpen3(false);
      if (dropdownRef4.current && !dropdownRef4.current.contains(event.target)) setOpen4(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [text, setText] = useState("");


  return (
    <>
    {/* upload image */}
    <div className="flex flex-col gap-6">
      <div
        onClick={() => fileInputRef.current.click()}
        className="w-full p-8 border-2 border-dashed border-[#E3E8EF] rounded-[12px] hover:border-[#C69815]/50 hover:bg-[#FFFDF8] transition-all cursor-pointer"
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept=".svg,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleFilesChange}
        />

        {previewImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-[#E3E8EF] w-14 h-14 rounded-full flex items-center justify-center">
              <div className="bg-[#EEF2F6] w-12 h-12 rounded-full flex items-center justify-center">
                <img src="/images/icons/upload images.svg" alt="upload" />
              </div>
            </div>
            <p className="text-center text-sm">
              <span className="font-semibold text-[#364152]">{t("Click to upload")}</span>{" "}
              <span className="font-medium text-[#9AA4B2]">{t("Or drag and drop files")}</span>
            </p>
            <p className="text-[#494C4D] text-sm font-normal">
              ({t("Maximum")} 15MB) SVG, PNG, JPG
            </p>
            <p className="text-sm font-normal">
              <span className="text-[#9AA4B2]">{t("Maximum number of photos")} :</span>{" "}
              <span className="text-[#202939]">{MAX_IMAGES} {t("Photos")}</span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-4">
            {previewImages.map((src, idx) => (
              <div key={idx} className="relative w-32.5 h-27.5 border border-[#E3E8EF] rounded-[10px] overflow-hidden flex items-center justify-center">
                <img src={src} alt={`uploaded-${idx}`} className="w-full h-full object-cover" />
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(idx); }}
                  className="absolute top-2 left-2 bg-[#FEE4E2] border border-[#F04438] rounded-[6px] p-1"
                >
                  <img src="/images/icons/delete Red.svg" alt="delete" />
                </button>
              </div>
            ))}

            {previewImages.length < MAX_IMAGES && (
              <button
                onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}
                className="w-28 h-28 border border-[#E3E8EF] bg-[#F8FAFC] rounded-[6px] flex items-center justify-center"
              >
                <img src="/images/icons/AddGrayIcon.svg" alt="add" />
              </button>
            )}
          </div>
        )}

        {previewImages.length >= MAX_IMAGES && (
          <div className="flex gap-2 mt-4 bg-[#FFFCF5] border border-[#FEC84B] rounded-md px-3 py-1.5 text-sm">
            <img src="/images/icons/i.svg" alt="info" />
            <p>{t("You have reached the maximum number of image uploads (7 images). If you want to upload a new image, please delete an existing image first.")}</p>
          </div>
        )}
      </div>

    
    </div>

    <form className="mt-8">
      <section className="grid lg768:grid-cols-2 lg1:grid-cols-2 gap-6">
        
        {/* ==========  Main classification 1  ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("Main classification")}
          </label>

          <div className="relative w-full" ref={dropdownRef1}>
            <div
              className="relative flex items-center border border-[#E3E8EF] rounded-[10px] bg-white transition-all duration-150 hover:border-[#C69815]/40 focus-within:border-[#C69815] focus-within:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] cursor-pointer"
              onClick={() => setOpen1(!open1)}
            >
              <input
                type="text"
                placeholder={t("Select the main category")}
                value={searchValue1 || selected1?.name || ""}
                onChange={(e) => {
                  setSearchValue1(e.target.value);
                  setOpen1(true);
                  setSelected1(null);
                }}
                className="h-11 p-3 w-full text-[#364152] focus:outline-none"
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
                {optionMainClassification
                  .filter((opt) =>
                    opt.name?.toLowerCase().includes(searchValue1.toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt.id}
                      onClick={() => {
                        setSelected1(opt);
                        setSearchValue1("");
                        setOpen1(false);
                        handleChange("module_id", opt.id);
                      }}
                      className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                    >
                      {opt.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* ========== Subcategory 2 ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("Subcategory")}
          </label>

          <div className="relative w-full" ref={dropdownRef2}>
            <div
              className="relative flex items-center border border-[#E3E8EF] rounded-[10px] bg-white transition-all duration-150 hover:border-[#C69815]/40 focus-within:border-[#C69815] focus-within:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] cursor-pointer"
              onClick={() => {
                if (!selected1) return; 
                setOpen2(!open2);
              }}
            >
              <input
                type="text"
                placeholder={
                  selected1
                    ? t("Select a subcategory")
                    : t("Select main category first")
                }
                disabled={!selected1}
                value={searchValue2 || selected2?.title || ""}
                onChange={(e) => {
                  setSearchValue2(e.target.value);
                  setOpen2(true);
                  setSelected2(null);
                }}
                className="h-11 p-3  w-full text-[#364152] focus:outline-none"
              />

              <span className="absolute left-3 pointer-events-none">
                {open2 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="up" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="down" />
                )}
              </span>
            </div>

            {open2 && selected1 && (
              <ul className="absolute left-0 right-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10 max-h-48 overflow-y-auto">
                {optionSubcategory
                  .filter((option) =>
                    option.title
                      ?.toLowerCase()
                      .includes(searchValue2.toLowerCase())
                  )
                  .map((option) => (
                    <li
                      key={option.id}
                      onClick={() => {
                        setSelected2(option);
                        setSearchValue2("");
                        setOpen2(false);
                        // reset dropdown 3
                        setSelected3(null);
                        setSearchValue3("");
                      }}
                      className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                    >
                      {option.title}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* ========== Sub-Service 3 ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("Sub-service name")}
          </label>

          <div className="relative w-full" ref={dropdownRef3}>
            <div
              className="relative flex items-center border border-[#E3E8EF] rounded-[10px] bg-white transition-all duration-150 hover:border-[#C69815]/40 focus-within:border-[#C69815] focus-within:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] cursor-pointer"
              onClick={() => {
                if (!selected2) return;
                setOpen3(!open3);
              }}
            >
              <input
                type="text"
                placeholder={
                  selected2
                    ? t("Select the sub-service")
                    : t("Select subcategory first")
                }
                disabled={!selected2}
                value={searchValue3 || selected3?.title || ""}
                onChange={(e) => {
                  setSearchValue3(e.target.value);
                  setOpen3(true);
                  setSelected3(null);
                }}
                className="h-11 p-3 w-full text-[#364152] focus:outline-none"
              />

              <span className="absolute left-3 pointer-events-none">
                {open3 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="up" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="down" />
                )}
              </span>
            </div>

            {open3 && selected2 && (
              <ul className="absolute left-0 right-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10 max-h-48 overflow-y-auto">
                {optionSubService
                  .filter((opt) =>
                    opt.title
                      ?.toLowerCase()
                      .includes(searchValue3.toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt.id}
                      onClick={() => {
                        setSelected3(opt);
                        setOpen3(false);
                        setSearchValue3("");
                        handleChange("category_id", opt.id);
                      }}
                      className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                    >
                      {opt.title}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>


        {/* ==========  Service Activity Location 4  ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("Service Activity Location")}
          </label>

          <div className="relative w-full" ref={dropdownRef4}>
            <div
              onClick={() => setOpen4(!open4)}
              className="p-2 min-h-11 border border-[#E3E8EF] rounded-[10px] bg-white transition-all duration-150 hover:border-[#C69815]/40 cursor-pointer flex items-center flex-wrap gap-2"
            >
              {/* Selected tags */}
              {formData?.provider_areas_id.length > 0 ? (
                formData?.provider_areas_id.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1.5 h-10 w-fit bg-[#FEF0C7] border border-[#E2E2E2] text-[#505050] text-sm px-3 py-1 rounded-full"
                  >
                    {item.city}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveArea(index);
                      }}
                      className="text-[#364152]"
                    >
                      <img src="/images/icons/x.svg" alt="" className="w-3 h-3" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-[#9A9A9A]">{t("Select City")}</span>
              )}

              {/* Arrow icon */}
              <span className="absolute left-3">
                {open4 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="" />
                )}
              </span>
            </div>

            {/* Dropdown options */}
            {open4 && (
              <ul className="absolute left-0 right-0 border border-[#E3E8EF] bg-white rounded-[10px] shadow-md z-10 max-h-48 overflow-y-auto">
                {optionServiceActivityLocation.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectArea(option)}
                    className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {option.city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>


        {/* ==========  Average length of service 5  ========== */}
        <div className="flex flex-col mb-6">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("Average length of service")}
          </label>

          {/* Clickable box */}
          <div
            onClick={() => setOpen5(true)}
            className="h-11 px-4 border border-[#E3E8EF] rounded-[10px] bg-white transition-all duration-150 hover:border-[#C69815]/40 cursor-pointer flex items-center justify-between"
          >
            <span className={formattedTime ? "text-[#364152]" : "text-[#9A9A9A]"}>
              {formattedTime || t("Average length of service")}
            </span>
            <span className="ml-2">
              <img src="/images/icons/timepicker.svg" alt="" />
            </span>
          </div>

          {/* Calendar Popup (Dialog) */}
          <Dialog open={open5} onClose={() => setOpen5(false)}>
            <div className="bg-[#eef2f6] p-4 w-[320px]">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MultiSectionDigitalClock
                  value={tempTime}
                  onChange={(newValue) => setTempTime(newValue)}
                  ampm={false}
                  timeSteps={{ minutes: 15 }}
                  sx={{
                    width: "100%",
                    "& .MuiMultiSectionDigitalClock-root": { width: "100%" },
                    "& .MuiMultiSectionDigitalClockSection-root": { flex: 1 },
                  }}
                />
              </LocalizationProvider>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleOkClick}
                  className="bg-[var(--color-primary)] text-white px-4 py-1 rounded-[6px] cursor-pointer"
                >
                  {t("Add")}
                </button>
              </div>
            </div>
          </Dialog>
        </div>


      </section>

      {/* ==========  Service Description  ========== */}
      <div className="flex flex-col">
        <label className="text-[#364152] text-base font-normal mb-3">
          {t("Service Description")}
        </label>
        <div className="relative w-full">
          <textarea
            value={formData?.long_description || ""}
            onChange={(e) => handleChange("long_description", e.target.value)} 
            placeholder={t("Write a description of the service.")}
            maxLength={5000}
            className="w-full h-41.5 border border-[#E3E8EF] rounded-[10px] px-4 py-3 text-sm text-[#364152] bg-white placeholder-[#9AA4B2] resize-none outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8]"
          />
          {/* counter inside the box */}
          <span className="absolute bottom-3 left-3 text-[#9A9A9A] text-sm">
            5000/{formData?.long_description?.length || 0}
          </span>
        </div>
      </div>
      
    </form>






    {/* btns */}
    <div className="my-12 flex gap-3">

      <button 
        onClick={handleGoBack} 
        className="btn-ghost h-11 px-6 w-48 cursor-pointer">
          {t('cancel')}
      </button>

      <button 
        onClick={handleNext} 
        className="btn-primary h-11 px-6 w-58 rounded-[10px] text-white text-sm font-semibold cursor-pointer">
          {t('the next')}
      </button>

    </div>
        
    </>
  );
}

export default BasicInformationPage;




