export function preprocess(formData) {
  return [
    formData.Gender === "Male" ? 1 : 0,
    formData.Married === "Yes" ? 1 : 0,
    formData.Education === "Graduate" ? 1 : 0,
    formData.Self_Employed === "Yes" ? 1 : 0,
    Number(formData.ApplicantIncome) || 0,
    Number(formData.CoapplicantIncome) || 0,
    Number(formData.LoanAmount) || 0,
    Number(formData.Loan_Amount_Term) || 0,
    Number(formData.Credit_History) || 0,
    formData.Property_Area === "Urban" ? 2 :
    formData.Property_Area === "Semiurban" ? 1 : 0
  ];
}
