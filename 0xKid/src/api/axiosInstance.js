// src/api/axiosInstance.js
import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // update this if hosted
  withCredentials: true, // for sending cookies (accessToken, refreshToken)
  headers: {
    "Content-Type": "application/json"
  }
});

// Optional: Global response error handler
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Something went wrong!";
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
