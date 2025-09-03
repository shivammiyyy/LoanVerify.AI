import axios from "axios";
import { LoanFormData, PredictionResponse, User as BackendUser } from "@/types";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // Important: ensures cookies (for sessions) sent automatically
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// --- API Helper Functions ---

// 1. Phone login: send phone.email user_json_url to backend for verification and session init
export async function phoneLogin(user_json_url: string): Promise<{ success: boolean; user: BackendUser }> {
  const { data } = await api.post("/phone-login", { user_json_url });
  return data;
}

// 2. Save the user's form data before prediction
export async function saveForm(formData: LoanFormData): Promise<{ success: boolean; user: BackendUser }> {
  const { data } = await api.post("/save-form", formData);
  return data;
}

// 3. Ask backend to make a loan eligibility prediction
export async function predictLoan(): Promise<PredictionResponse> {
  const { data } = await api.post("/predict");
  return data;
}

// 4. Get current logged-in user from backend
export async function getCurrentUser(): Promise<{ user: BackendUser }> {
  const { data } = await api.get("/me");
  return data;
}

// 5. Logout (invalidate session)
export async function sessionLogout(): Promise<{ success: boolean }> {
  const { data } = await api.post("/logout");
  return data;
}
