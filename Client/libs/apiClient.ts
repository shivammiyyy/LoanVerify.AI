// src/lib/apiClient.ts
import axios from 'axios';

// By default, use environment variable for base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true, // Important: send/receive cookies for session
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// API helper functions

import { LoanFormData, PredictionResponse, User } from '../types';

export const sessionLogin = async (idToken: string) => {
  const { data } = await api.post<{ success: boolean; user: User }>('/sessionLogin', { idToken });
  return data;
};

export const saveForm = async (formData: LoanFormData) => {
  const { data } = await api.post<{ success: boolean; user: User }>('/save-form', formData);
  return data;
};

export const predictLoan = async () => {
  const { data } = await api.post<PredictionResponse>('/predict');
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get<{ user: User }>('/me');
  return data;
};
