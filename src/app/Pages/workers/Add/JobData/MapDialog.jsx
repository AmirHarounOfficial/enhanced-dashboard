"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Dialog from "@mui/material/Dialog";
import { useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

// ✅ Handles map click
function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position && markerIcon ? <Marker position={position} icon={markerIcon} /> : null;
}

export default function MapDialog({ open, handleClose, formData, setFormData }) {
  const [mapPosition, setMapPosition] = useState([
    formData?.latitude ? parseFloat(formData.latitude) : 24.7136,
    formData?.longitude ? parseFloat(formData.longitude) : 46.6753,
  ]);

  // ✅ Detect user location initially
  useEffect(() => {
    if (!formData?.latitude && !formData?.longitude && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }
  }, [formData?.latitude, formData?.longitude]);

  // ✅ Reverse Geocoding
  const fetchAddressFromCoords = async (latitude, longitude) => {
    const apiKey = "AIzaSyBSf-rM8flnZXMLaXaHpVSVMQBs7Rq8M84";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "OK") {
        const addressComponents = data.results[0].address_components;
        const address = data.results[0].formatted_address;
        const getComp = (type) =>
          addressComponents.find((c) => c.types.includes(type))?.long_name || "";

        setFormData((prev) => ({
          ...prev,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          address,
          country: getComp("country"),
          state: getComp("administrative_area_level_1"),
          city: getComp("administrative_area_level_2"),
        }));
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleConfirm = () => {
    fetchAddressFromCoords(mapPosition[0], mapPosition[1]);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ className: "ServicePage-dialog" }}>
      <div style={{ padding: 20 }}>
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-[#364152] text-lg font-bold">اختر موقعك على الخريطة</h3>
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
            <LocationPicker position={mapPosition} setPosition={setMapPosition} />
          </MapContainer>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button onClick={handleClose} className="btn-ghost h-11 px-6">
            إلغاء
          </button>
          <button onClick={handleConfirm} className="btn-primary h-11 px-6 rounded-[10px] text-white text-sm font-semibold">
            تأكيد الموقع
          </button>
        </div>
      </div>
    </Dialog>
  );
}
