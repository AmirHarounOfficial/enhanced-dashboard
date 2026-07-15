// import React from 'react'

// function Map() {
//   return (
//     <>


//     </>
//   )
// }

// export default Map
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

export default function Map({ openMap, handleClose, onSelectLocation }) {
  const [mapPosition, setMapPosition] = useState([24.7136, 46.6753]); // Default Riyadh

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }
  }, []);

const handleConfirm = () => {
  if (typeof onSelectLocation === "function") {
    onSelectLocation(mapPosition[0].toFixed(5), mapPosition[1].toFixed(5));
  }
  handleClose(); 
};

  return (
    <Dialog open={openMap} onClose={handleClose} PaperProps={{ className: "ServicePage-dialog" }}>
      <div style={{ padding: 20 }}>
        <h3 className="mb-4 text-lg font-semibold text-right">اختر موقعك على الخريطة</h3>
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
          <button onClick={handleClose} className="px-4 py-2 bg-[#E3E8EF] rounded-[6px]">
            إلغاء
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-[6px]">
            تأكيد الموقع
          </button>
        </div>
      </div>
    </Dialog>
  );
}
