"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Dialog from "@mui/material/Dialog";
import { useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { addAreaThunk, getWorkplacesThunk } from "@/redux/slice/Setting/SettingSlice";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });

let L;
let markerIcon;

if (typeof window !== "undefined") {
  L = require("leaflet");
  markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
}

// Helper to reverse geocode coordinates
async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`
    );
    const data = await res.json();
    return {
      city: data.address?.city || data.address?.town || data.address?.village || "",
      state: data.address?.state || "",
      country: data.address?.country || "",
    };
  } catch {
    return { city: "", state: "", country: "" };
  }
}

// ✅ Handles map click
function LocationPicker({ position, setPosition, setLocationInfo }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      const info = await reverseGeocode(lat, lng);
      setLocationInfo(info);
    },
  });

  return position && markerIcon ? <Marker position={position} icon={markerIcon} /> : null;
}

export default function MapDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.setting);

  const [mapPosition, setMapPosition] = useState([24.7136, 46.6753]); // Default to Riyadh
  const [locationInfo, setLocationInfo] = useState({ city: "", state: "", country: "" });

  // ✅ Detect user location initially + reverse geocode default position
  useEffect(() => {
    const initLocation = async (lat, lng) => {
      setMapPosition([lat, lng]);
      const info = await reverseGeocode(lat, lng);
      setLocationInfo(info);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          initLocation(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          // Fallback: reverse geocode the default Riyadh position
          initLocation(24.7136, 46.6753);
        },
        { enableHighAccuracy: true }
      );
    } else {
      initLocation(24.7136, 46.6753);
    }
  }, []);

  const handleConfirm = async () => {
    const formData = {
      city: locationInfo.city,
      state: locationInfo.state,
      country: locationInfo.country,
      latitude: String(mapPosition[0]),
      longitude: String(mapPosition[1]),
    };

    const result = await dispatch(addAreaThunk(formData));
    if (addAreaThunk.fulfilled.match(result)) {
      dispatch(getWorkplacesThunk());
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ className: "AddFuel-dialog" }}>
      <div style={{ padding: 20 }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[#364152] text-lg font-bold">اختر موقعك على الخريطة</h3>
          </div>
          <button onClick={handleClose} className="modal-close" aria-label="إلغاء">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div style={{ height: 400 }}>
          <MapContainer center={mapPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationPicker position={mapPosition} setPosition={setMapPosition} setLocationInfo={setLocationInfo} />
          </MapContainer>
        </div>

        {locationInfo.city && (
          <p className="text-[#697586] text-sm mt-1 text-right">
            {locationInfo.city} - {locationInfo.state} - {locationInfo.country}
          </p>
        )}

        <div className="flex justify-end mt-4 gap-2">
          <button onClick={handleClose} disabled={loading} className="btn-ghost h-11 px-6 disabled:opacity-50">
            إلغاء
          </button>
          <button onClick={handleConfirm} disabled={loading} className="btn-primary h-11 px-6 rounded-[10px] text-white text-sm font-semibold disabled:opacity-50">
            {loading ? "جاري الحفظ..." : "تأكيد الموقع"}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

