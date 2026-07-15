'use client';
import { getBookingNewThunk } from "@/redux/slice/Home/HomeSlice";
import { UpdateBookingThunk } from "@/redux/slice/Requests/RequestsSlice";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../../../../../../../../config/imageUrl";

function NewOrdersPage({ orders = [], layout = "list", current_module_key }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookingNewThunk());
  }, [dispatch]);

  const handleAcceptBooking = (booking_id) => {
    if (!booking_id) return;
    dispatch(UpdateBookingThunk({ id: booking_id, formData: { status: "accepted" } }))
      .unwrap()
      .then(() => dispatch(getBookingNewThunk()))
      .catch((err) => console.error("Failed to accept booking:", err));
  };

  const handleRejectedBooking = (booking_id) => {
    if (!booking_id) return;
    dispatch(UpdateBookingThunk({ id: booking_id, formData: { status: "rejected" } }))
      .unwrap()
      .then(() => dispatch(getBookingNewThunk()))
      .catch((err) => console.error("Failed to reject booking:", err));
  };

  return (
    <div className="border border-[#E3E8EF] rounded-[8px] p-6 h-[500px] overflow-y-auto">
      <p className="text-[#364152] text-base font-semibold mb-4">{t("New orders")}</p>

      <div className={layout === "grid" ? "grid grid-cols-2 gap-4" : `grid lg1:grid-cols-1 ${orders.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        {orders?.map((order, index) => (
          <div
            key={order?.booking_id || index}
            className="border border-[#E3E8EF] bg-white rounded-[8px] p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            {/* Service header */}
            <div className="flex gap-2 items-center">
              <img
                src={order?.service_icon ? `${IMAGE_BASE_URL}${order.service_icon}` : "/images/icons/renewable-energy.svg"}
                alt="service"
                className="w-6 h-6 mt-1 rounded"
              />
              <p>
                <span className="text-[#364152] text-base font-semibold">{order?.service_name} -</span>{" "}
                <span className="text-[#697586] text-sm">{order?.username}</span>
              </p>
            </div>

            <hr className="border-[#E3E8EF] my-3" />

            {/* Price & Distance */}
            <div className="flex justify-between">
              <div className="flex gap-1.5 items-center">
                <img src="/images/icons/price.svg" alt="price" />
                <p className="text-[var(--color-primary)] text-sm font-semibold">{order?.price} جنية</p>
              </div>
              <div className="flex gap-1.5 items-center">
                <img src="/images/icons/route.svg" alt="distance" />
                <p className="text-[#697586] text-sm">{t('Working distance')} {order?.total_distance_km} {t('kilometers')}</p>
              </div>
            </div>

            <hr className="border-[#E3E8EF] my-3" />

            {/* Location / Car */}
            {current_module_key === 'home_services' && (
              <div className="flex gap-2 items-center">
                <img src="/images/icons/location-bluee.svg" alt="location" />
                <p className="text-[#364152] text-sm">{order?.address}</p>
              </div>
            )}
            {current_module_key === 'car_services' && (
              <div className="flex gap-2 items-center">
                <img src="/images/icons/car-alert_gray.svg" alt="car" />
                <p className="text-[#364152] text-sm">{order?.car?.brand} {order?.car?.model} - {order?.car?.year}</p>
              </div>
            )}

            <hr className="border-[#E3E8EF] my-3" />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleAcceptBooking(order?.booking_id)}
                className="btn-primary bg-[#079455] text-white text-sm font-semibold w-[70%] h-11 rounded-[6px] cursor-pointer"
              >
                {t("Application accepted")}
              </button>
              <button
                onClick={() => handleRejectedBooking(order?.booking_id)}
                className="border border-[#F04438] text-[#F04438] text-sm font-medium w-[30%] h-11 rounded-[6px] cursor-pointer
                           transition-colors duration-150 hover:bg-[#FEF3F2] active:scale-[0.97]"
              >
                {t("to reject")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewOrdersPage;
