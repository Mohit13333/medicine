import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URI}/api`;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const registerUser = async (userData) => {
  return await api.post("/auth/register", userData);
};

export const loginUser = async (userData) => {
  return await api.post("/auth/login", userData);
};
export const getUser = async (userId) => {
  return await api.get(`/auth/getuser/${userId}`);
};

export const createMedicine = async (medicineData) => {
  return await api.post("/medicine/create", medicineData);
};

export const getMedicines = async () => {
  return await api.get("/medicine/get");
};
export const updateMedicine = async (id, updatedMedicine) => {
  return await api.put(`/medicine/update/${id}`, updatedMedicine);
};

export const deleteMedicine = async (id) => {
  return await api.delete(`/medicine/delete/${id}`);
};

export const createLog = async (logData) => {
  return await api.post("/log/createlogs", logData);
};

export const getAcknowledgmentLogs = async () => {
  return await api.get("/log/getlogs");
};

export const getLogById = async (id) => {
  return await api.get(`/log/getlogs/${id}`);
};

export const updateLog = async (id, logData) => {
  return await api.put(`/log/updatelogs/${id}`, logData);
};

export const deleteLog = async (id) => {
  return await api.delete(`/log/deletelogs/${id}`);
};

export const getFilteredLogs = async (filters) => {
  return await api.get(`/admin/filtered`, { params: filters });
};
export const getAllUsers = async () => {
  return await api.get("/admin");
};
