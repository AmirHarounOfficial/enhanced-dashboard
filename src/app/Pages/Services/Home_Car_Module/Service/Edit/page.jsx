"use client";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import MainLayout from "@/app/Components/MainLayout/MainLayout";
import BasicInformationPage from "./BasicInformation/page";
import SchedulePage from "./Schedule/page";
import PricingPage from "./Pricing/page";
import { getServiceByIdThunk, updateServiceThunk } from "@/redux/slice/Services/ServicesSlice";

function EditPageContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("id"); // get ?id=123

  const dispatch = useDispatch();
  const { service } = useSelector((state) => state.services);

  const [openId, setOpenId] = useState("basic");

  // fetch service by ID when page loads
  useEffect(() => {
    if (serviceId) {
      dispatch(getServiceByIdThunk(serviceId));
    }
  }, [serviceId, dispatch]);

  // if (!service) return <p>Loading service...</p>;


  //update service *******************************************/
  const [formData, setFormData] = useState({
    provider_id: '',
    images: [],
    module_id: "",
    category_id: "",
    provider_areas_id: [],
    duration: "",
    long_description: "",
    price: "",
    inspection_price: "",
    price_on_inspection: "",
    pricing_type: "",
    discount: "",
    discount_type: "",
    provider_areas_id: [],
    days: [],
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!service) return;

    setFormData({
      provider_id: service?.provider_id || "",
      images: service?.images || [],
      module_id: service?.module_id || "",
      category_id: service?.category_id || "",
      provider_areas_id: service?.provider_areas_id || [],
      duration: service?.duration || "",
      long_description: service?.long_description || "",
      price: service?.price || "",
      inspection_price: service?.inspection_price || "",
      price_on_inspection: !!service?.price_on_inspection, // convert to boolean
      pricing_type: service?.pricing_type || "",
      discount: service?.discount || "",
      discount_type: service?.discount_type || "",
      days: service?.days || [],
      // provider_areas_id: service.areas.map(area => area.id),
    });
  }, [service]);

  //   const handleSave = () => {
  //   if (!service?.id) return;
  //     dispatch(updateServiceThunk({ id: service.id, formData }))
  //     .unwrap()
  //     .then(() => router.back())
  //     .catch((err) => console.error("Failed to update service:", err));
  // };

  const handleSave = () => {
    if (!service?.id) return;

    const submitFormData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "days") {
          // Serialize days array with nested times for backend
          value.forEach((day, dayIndex) => {
            submitFormData.append(`days[${dayIndex}][day]`, day.day);
            if (day.times && Array.isArray(day.times)) {
              day.times.forEach((time, timeIndex) => {
                submitFormData.append(`days[${dayIndex}][times][${timeIndex}][from]`, time.from);
                submitFormData.append(`days[${dayIndex}][times][${timeIndex}][to]`, time.to);
              });
            }
          });
        } else {
          value.forEach((v) => submitFormData.append(`${key}[]`, v));
        }
      } else if (typeof value === "boolean") {
        submitFormData.append(key, value ? "1" : "0");
      } else if (value !== undefined && value !== null) {
        submitFormData.append(key, value);
      }

    });

    dispatch(updateServiceThunk({ id: service.id, formData: submitFormData }))
      .unwrap()
      .then(() => router.back())
      .catch((err) => console.error("Failed to update service:", err));
  };

  console.log('formData', formData);



  const tabs = [
    { id: "basic", label: t("Basic information"), Component: BasicInformationPage },
    { id: "days", label: t("Available days and times"), Component: SchedulePage },
    { id: "pricing", label: t("Pricing"), Component: PricingPage },
  ];

  const currentIndex = tabs.findIndex((tab) => tab.id === openId);

  const handleNext = () => {
    if (currentIndex < tabs.length - 1) setOpenId(tabs[currentIndex + 1].id);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setOpenId(tabs[currentIndex - 1].id);
  };

  const handleGoBack = () => router.back();

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <section className="mb-4">
          <p className="text-2xl font-medium mb-5">{t("Modify the service.")}</p>
          <p className="text-base font-normal">
            {t("You can modify, update, and improve the service details.")}
          </p>
        </section>

        <section className="w-full mt-4 flex flex-col flex-1 overflow-hidden">
          {/* Tabs */}
          <div className="flex justify-around border-b border-[#CDD5DF]">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`px-4 py-6 w-full text-center text-base cursor-default ${openId === tab.id
                  ? "text-[#C69815] border-b-2 border-[#C69815] font-medium"
                  : "text-[#697586] font-normal"
                  }`}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto mt-6 px-2">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                style={{ display: openId === tab.id ? "block" : "none" }}
              >
                <tab.Component
                  service={service}
                  formData={formData}
                  setFormData={setFormData}
                  handleChange={handleChange}
                  handleSave={handleSave}
                  handleGoBack={handleGoBack}
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                />
              </div>
            ))}

          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default function EditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPageContent />
    </Suspense>
  );
}

