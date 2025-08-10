import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true
  },
  fullName: {
    type: String
  },
  Gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  Married: {
    type: String,
    enum: ['Yes', 'No'],
  },
  Dependents: {
    type: String, // Use String to allow '0', '1', '2', '3+'
  },
  Education: {
    type: String,
    enum: ['Graduate', 'Not Graduate'],
  },
  Self_Employed: {
    type: String,
    enum: ['Yes', 'No'],
  },
  ApplicantIncome: {
    type: Number,
  },
  CoapplicantIncome: {
    type: Number,
    default: 0
  },
  LoanAmount: {
    type: Number,
  },
  Loan_Amount_Term: {
    type: Number,
  },
  Credit_History: {
    type: Number, // 0 or 1 usually
    enum: [0, 1],
  },
  Property_Area: {
    type: String,
    enum: ['Urban', 'Rural', 'Semiurban'],
  },
  prediction: {
    type: String, // Eligible / Not Eligible
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserLoan = mongoose.model('UserLoan', userSchema);

export default UserLoan;
