// src/api/auth.api.js
import axiosInstance from "./axiosInstance";

// Register a new user
export const registerUser = (data) => {
  return axiosInstance.post("/users/register", data);
};

// Login user
export const loginUser = (data) => {
  return axiosInstance.post("/users/login", data);
};

// Logout
export const logoutUser = () => {
  return axiosInstance.post("/users/logout");
};

// Get current user
export const getCurrentUser = () => {
  return axiosInstance.get("/users/current-user");
};
