export interface User {
  _id: string;
  firebaseUid: string;
  mobile: string;
  fullName?: string;
  Gender?: "Male" | "Female";
  Married?: "Yes" | "No";
  Dependents?: string;
  Education?: string;
  Self_Employed?: string;
  ApplicantIncome?: number;
  CoapplicantIncome?: number;
  LoanAmount?: number;
  Loan_Amount_Term?: number;
  Credit_History?: number;
  Property_Area?: "Urban" | "Semiurban" | "Rural";
  prediction?: string;
}

export interface LoanFormData { 
  Gender?: "Male" | "Female";
  Married?: "Yes" | "No";
  Dependents?: string;
  Education?: string;
  Self_Employed?: string;
  ApplicantIncome?: number;
  CoapplicantIncome?: number;
  LoanAmount?: number;
  Loan_Amount_Term?: number;
  Credit_History?: number;
  Property_Area?: "Urban" | "Semiurban" | "Rural";
}

export interface PredictionResponse {
  success: boolean;
  prediction: string;
  user: User;
}

export interface RBIInterestRate {
  label: string;
  value: string;
  lastUpdated?: string;
}
