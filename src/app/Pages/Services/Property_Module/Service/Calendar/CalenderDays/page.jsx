"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import DetailsOfDay from "../Modules/DetailsOfDay";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyCalendarThunk } from "@/redux/slice/Services/ServicesSlice";
import { useParams, useSearchParams } from "next/navigation";

function CalenderDaysContent() {
  const { t } = useTranslation();

  const days = [
    t("Saturday"),
    t("Sunday"),
    t("Monday"),
    t("Tuesday"),
    t("Wednesday"),
    t("Thursday"),
    t("Friday"),
  ];

  // redux
  const dispatch = useDispatch();
  const { getCalendar } = useSelector((state) => state.services);
  const calendarData = getCalendar?.data || [];

  // params
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id || searchParams.get("id");

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthString = `${year}-${String(month + 1).padStart(2, "0")}`;

  // API call
  useEffect(() => {
    if (id) {
      dispatch(getPropertyCalendarThunk({ id, month: monthString }));
    }
  }, [id, monthString, dispatch]);

  // calendar logic
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startDay = (firstDay + 1) % 7;

  const calendarDays = [];

  for (let i = 0; i < startDay; i++) {
    calendarDays.push("");
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // helpers
  const formatDate = (year, month, day) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  const getDayStatus = (year, month, day) => {
    if (!calendarData.length) return null;

    const currentDateStr = formatDate(year, month, day);

    for (const range of calendarData) {
      if (
        currentDateStr >= range.start_date &&
        currentDateStr <= range.end_date
      ) {
        return range.status?.toLowerCase();
      }
    }

    return null;
  };

  const getStatusColor = (day) => {
    if (!day) return "";

    const status = getDayStatus(year, month, day);

    if (status === "booked") return "bg-[#F04438] text-white";
    if (status === "blocked") return "bg-[var(--color-primary)] text-white";
    if (status === "available") return "bg-[#17B26A] text-white";

    return "text-[#9AA4B2]";
  };

  // navigation
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // click
  const handleDayClick = (day) => {
    if (!day) return;

    const apiStatus = getDayStatus(year, month, day);

    let statusLabel = t("Unspecified");
    let statusDetails = t("Unspecified");
    let colorClass = "bg-[#9AA4B2]";

    if (apiStatus === "booked") {
      statusLabel = t("Forbidden");
      statusDetails = t("This date is restricted and unavailable.");
      colorClass = "bg-[#F04438]";
    } else if (apiStatus === "blocked") {
      statusLabel = t("reserved");
      statusDetails = t("This date is already booked by a guest.");
      colorClass = "bg-[var(--color-primary)]";
    } else if (apiStatus === "available") {
      statusLabel = t("Available");
      statusDetails = t("This date is available for booking.");
      colorClass = "bg-[#17B26A]";
    }

    setSelectedDayInfo({
      date: new Date(year, month, day).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: statusLabel,
      statusDetails,
      colorClass,
    });
  };

  // لو مفيش id
  if (!id) {
    return <div className="text-center p-6">No Property ID</div>;
  }

  return (
    <div className="w-full p-4 bg-white border border-[#E3E8EF]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-[#F8FAFC] border p-3">
        <button onClick={prevMonth}>{"<"}</button>

        <h2 className="font-medium text-base text-[#364152]">
          {currentDate.toLocaleString("ar-EG", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button onClick={nextMonth}>{">"}</button>
      </div>

      {/* Calendar */}
      <div className="bg-[#F8FAFC] p-6">
        {/* Days */}
        <div className="grid grid-cols-7 text-center text-sm font-medium text-[#364152] mb-2">
          {days.map((day, i) => (
            <div key={i}>{day}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, i) => (
            <div
              key={i}
              className={`h-10 flex items-center justify-center rounded text-sm
              ${
                day
                  ? getStatusColor(day) +
                    " cursor-pointer hover:opacity-80"
                  : ""
              }`}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 text-sm">
        <Legend color="bg-[#17B26A]" label={t("Available")} />
        <Legend color="bg-[#F04438]" label={t("Forbidden")} />
        <Legend
          color="bg-[var(--color-primary)]"
          label={t("reserved")}
        />
      </div>

      {/* Note */}
      <div className="text-[#DC6803] border bg-[#FFFCF5] rounded p-3 my-4">
        <p>{t("Click on any date to see detailed status information.")}</p>
      </div>

      <DetailsOfDay
        selectedDayInfo={selectedDayInfo}
        onClose={() => setSelectedDayInfo(null)}
      />
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2 border px-3 py-2 rounded">
      <span className={`w-4 h-4 ${color} rounded`}></span>
      {label}
    </div>
  );
}

export default function CalenderDaysPage() {
  return (
    <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
      <CalenderDaysContent />
    </Suspense>
  );
}