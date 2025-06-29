// src/api/user.api.js
import axiosInstance from "./axiosInstance";

// Update user preferences
export const updateUserPreferences = (prefs) => {
  return axiosInstance.patch("/users/preferences", prefs);
};

// Get specific user by ID
export const getUserById = (id) => {
  return axiosInstance.get(`/users/${id}`);
};

// Get concepts for logged-in user
export const getUserConcepts = () => {
  return axiosInstance.get("/users/concepts");
};
