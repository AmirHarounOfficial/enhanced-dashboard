"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ViewHome_Car_Street_ModulePage from "@/app/Pages/requests/Home_Car_Street_Module/Views/Home_Car_Street_Module/View/page";
import { getBookingByIDThunk } from "@/redux/slice/Requests/RequestsSlice";

const avatarColors = [
  "bg-[#C69815]/15 text-[#C69815]",
  "bg-[#067647]/15 text-[#067647]",
  "bg-[#004EEB]/15 text-[#004EEB]",
  "bg-[var(--color-primary)]/15 text-[var(--color-primary)]",
  "bg-[#F79009]/15 text-[#DC6803]",
  "bg-[#D92D20]/15 text-[#D92D20]",
];

const getAvatarColor = (name) => {
  if (!name) return "bg-[#EEF2F6] text-[#697586]";
  return avatarColors[name.charCodeAt(0) % avatarColors.length];
};

function HaveReviewsPage({ reviews }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { bookingDetails } = useSelector((state) => state.requests);

  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleClickOpen = (id) => {
    setSelectedBookingId(id);
    dispatch(getBookingByIDThunk(id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBookingId(null);
  };

  const toggleExpanded = (index) => {
    setExpandedIndexes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const maxLength = 90;

  return (
    <>
      <div className="divide-y divide-[#E3E8EF]">
        {reviews?.data?.map((rating, index) => {
          const text = rating?.review || "";
          const isLong = text.length > maxLength;
          const expanded = expandedIndexes[index] || false;

          return (
            <div className="p-5" key={rating?.booking_id}>
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className={"w-10 h-10 flex justify-center items-center rounded-full text-sm font-semibold flex-shrink-0 " + getAvatarColor(rating?.user_name)}>
                    {rating?.user_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#364152] text-sm font-semibold">{rating?.user_name}</p>
                    <p className="text-[#697586] text-xs mt-0.5">
                      {new Date(rating.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <button
                    className="text-sm font-medium text-[#C69815] hover:underline cursor-pointer"
                    onClick={() => handleClickOpen(rating?.booking_id)}
                  >
                    #{rating?.booking_id}
                  </button>
                  <div className="flex items-center gap-1">
                    <img src="/images/icons/star.svg" className="w-3.5 h-3.5" />
                    <span className="text-[#FDB022] text-sm font-medium">{rating?.rating}</span>
                  </div>
                </div>
              </div>

              {text && (
                <p className="mt-3 text-[#4B5565] text-sm leading-relaxed">
                  {expanded || !isLong ? text : text.slice(0, maxLength) + "... "}
                  {isLong && (
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="text-[#C69815] text-sm font-medium cursor-pointer hover:underline"
                    >
                      {expanded ? t("Show less") : t("Read more")}
                    </button>
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <ViewHome_Car_Street_ModulePage
        open={open}
        handleClose={handleClose}
        bookingId={selectedBookingId}
        bookingDetails={bookingDetails}
      />
    </>
  );
}

export default HaveReviewsPage;
