import axios from "axios";

const API = axios.create({
  baseURL: "https://api.zetime.co/api",
   headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("✅ Token sent in header:", config.headers.Authorization);
    } else {
      console.log("❌ No token found in localStorage");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
