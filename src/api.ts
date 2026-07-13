// @ts-nocheck
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to inject the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// --- AUTH ---
export const sendOtp = async (mobileNum: string) => {
  try {
    const response = await api.post(`/auth/send-otp`, { mobileNum });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const verifyOtp = async (mobileNum: string, otpVal: string) => {
  try {
    const response = await api.post(`/auth/verify-otp`, { mobileNum, otpVal });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const register = async (userData: any) => {
  try {
    const response = await api.post(`/auth/register`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const login = async (mobile: string, password: string = '1234') => {
  try {
    const response = await api.post(`/auth/login`, { mobile, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// --- LOADS ---
export const getLoads = async () => {
  try {
    const response = await api.get(`/loads`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const createLoad = async (loadData: any) => {
  try {
    const response = await api.post(`/loads`, loadData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// --- TRUCKS ---
export const getTrucks = async () => {
  try {
    const response = await api.get(`/trucks`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const createTruck = async (truckData: any) => {
  try {
    const response = await api.post(`/trucks`, truckData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// --- BUS CARGO ---
export const getBusSpaces = async () => {
  try {
    const response = await api.get(`/bus`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const createBusSpace = async (busData: any) => {
  try {
    const response = await api.post(`/bus`, busData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// --- CORPORATE DEMANDS ---
export const getDemands = async () => {
  try {
    const response = await api.get(`/corporate`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const createDemand = async (demandData: any) => {
  try {
    const response = await api.post(`/corporate`, demandData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const placeBid = async (demandId: string, amount: number) => {
  try {
    const response = await api.post(`/corporate/${demandId}/bid`, { amount });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export default api;
