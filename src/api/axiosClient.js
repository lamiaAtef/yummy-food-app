import axios from "axios";
// import AuthService from "./AuthService"; // service layer مسؤول عن token/refresh
import { baseURL } from "./apiURLs";
const axiosClient = axios.create({
  baseURL,
  timeout: 5000,
 
});

axiosClient.interceptors.request.use(
  (config) => {
    // const token = AuthService.getAccessToken(); 
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      // Axios لا يعمل refresh لوحده
      // بس يبلغ AuthService / Context علشان يتصرف
      // return AuthService.handleUnauthorized(error);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
