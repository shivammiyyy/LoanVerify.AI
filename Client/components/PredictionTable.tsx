import { User } from "@/types";

export default function PredictionTable({ data }: { data: User }) {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Field</th>
            <th className="p-3 border">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="p-3 border">Full Name</td><td className="p-3 border">{data.fullName}</td></tr>
          <tr><td className="p-3 border">Gender</td><td className="p-3 border">{data.Gender}</td></tr>
          <tr><td className="p-3 border">Married</td><td className="p-3 border">{data.Married}</td></tr>
          <tr><td className="p-3 border">Dependents</td><td className="p-3 border">{data.Dependents}</td></tr>
          <tr><td className="p-3 border">Education</td><td className="p-3 border">{data.Education}</td></tr>
          <tr><td className="p-3 border">Self Employed</td><td className="p-3 border">{data.Self_Employed}</td></tr>
          <tr><td className="p-3 border">Applicant Income</td><td className="p-3 border">{data.ApplicantIncome}</td></tr>
          <tr><td className="p-3 border">Co-applicant Income</td><td className="p-3 border">{data.CoapplicantIncome}</td></tr>
          <tr><td className="p-3 border">Loan Amount</td><td className="p-3 border">{data.LoanAmount}</td></tr>
          <tr><td className="p-3 border">Loan Term</td><td className="p-3 border">{data.Loan_Amount_Term}</td></tr>
          <tr><td className="p-3 border">Credit History</td><td className="p-3 border">{data.Credit_History}</td></tr>
          <tr><td className="p-3 border">Property Area</td><td className="p-3 border">{data.Property_Area}</td></tr>
          <tr><td className="p-3 border font-bold">Prediction</td><td className="p-3 border font-bold">{data.prediction}</td></tr>
        </tbody>
      </table>
    </div>
  );
}
