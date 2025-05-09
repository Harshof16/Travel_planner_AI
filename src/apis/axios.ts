import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_TOKEN}`
  },
});

// Attach token from localStorage (runtime) to every request
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default API;
