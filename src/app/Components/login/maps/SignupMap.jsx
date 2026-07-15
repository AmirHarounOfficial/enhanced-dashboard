// "use client";
// import React, { useEffect, useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import dynamic from "next/dynamic";
// import "leaflet/dist/leaflet.css";

// // 🧭 dynamic imports لتفادي الـ SSR فقط للمكونات الكبيرة
// const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
// const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
// const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });

// // 🧭 ده لازم يكون import عادي (مش dynamic)
// import { useMapEvents } from "react-leaflet";

// // 🧩 Leaflet object
// let L;
// if (typeof window !== "undefined") {
//   L = require("leaflet");
// }

// function SignupMap({ formData, setFormData, handleClose, setOpen }) {
// // console.log("typeof setFormData:", typeof setFormData);

// //   const [mapPosition, setMapPosition] = useState([
// //     formData?.latitude ? parseFloat(formData.latitude) : 24.7136,
// //     formData?.longitude ? parseFloat(formData.longitude) : 46.6753,
// //   ]);


// //   // Fix default marker icon issue in Leaflet
// // const markerIcon = new L.Icon({
// //   iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
// //   iconSize: [25, 41],
// //   iconAnchor: [12, 41],
// //   popupAnchor: [1, -34],
// //   shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
// //   shadowSize: [41, 41],
// // });

// //   // ✅ مكون يتحكم في الضغط على الخريطة
// //   function LocationPicker({ position, setPosition }) {
// //   useMapEvents({
// //     click(e) {
// //       setPosition([e.latlng.lat, e.latlng.lng]);
// //     },
// //   });
// //   return position ? <Marker position={position} icon={markerIcon} /> : null;
// // } 

// //   // ✅ دالة جلب العنوان من الإحداثيات
// // const fetchAddressFromCoords = async (latitude, longitude) => {
// //     const apiKey = 'AIzaSyBSf-rM8flnZXMLaXaHpVSVMQBs7Rq8M84';
// //     const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
// //     try {
// //       const response = await fetch(geocodingUrl);
// //       const data = await response.json();
// //       if (data.status === "OK") {
// //         const addressComponents = data.results[0].address_components;
// //         const address = data.results[0].formatted_address;
// //         const getComponent = (type) =>
// //           addressComponents.find((comp) => comp.types.includes(type))?.long_name || "";
// //         const country = getComponent("country");
// //         const state = getComponent("administrative_area_level_1");
// //         const city = getComponent("administrative_area_level_2");
// //         setFormData((prev) => ({
// //           ...prev,
// //           latitude: latitude.toString(),
// //           longitude: longitude.toString(),
// //           address,
// //           country,
// //           state,
// //           city,
// //         }));
// //       } else {
// //         console.error("Geocoding error:", data.status);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching address:", error);
// //     }
// //   };

// //   // ✅ تحديد موقع المستخدم عند فتح الخريطة
// // useEffect(() => {
// //     if (!formData?.latitude && !formData?.longitude && navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           setMapPosition([position.coords.latitude, position.coords.longitude]);
// //         },
// //         () => {}, // ignore error
// //         { enableHighAccuracy: true }
// //       );
// //     }
// //   }, [formData?.latitude, formData?.longitude]);


// //   // ✅ عند تأكيد الموقع
// //   const handleConfirmLocation = () => {
// //     setOpen(false);
// //     fetchAddressFromCoords(mapPosition[0], mapPosition[1]);
// //   };

//   return (

//     <Dialog
//     open={open}
//     onClose={handleClose}
//     aria-labelledby="alert-dialog-title"
//     aria-describedby="alert-dialog-description"
//     >
//       hhhhhhhhhhhhhhhhhhhhhhh
//       <div style={{ padding: 20 }}>
//         <h3 className="mb-4 text-lg font-semibold text-right">اختر موقعك على الخريطة</h3>
//         <div style={{ height: 400 }}>
//           <MapContainer
//             center={mapPosition}
//             zoom={13}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution="&copy; OpenStreetMap contributors"
//             />
//             <LocationPicker position={mapPosition} setPosition={setMapPosition} />
//           </MapContainer>
//         </div>

//         <div className="flex justify-end mt-4 gap-2">
//           <button
//             onClick={handleClose}
//             className="px-4 py-2 bg-gray-300 rounded"
//           >
//             إلغاء
//           </button>
//           <button
//             onClick={handleConfirmLocation}
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             تأكيد الموقع
//           </button>
//         </div>
//       </div>
//     </Dialog>
//   );
// }

// export default SignupMap;
