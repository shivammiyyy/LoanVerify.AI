// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRtM23Qcd10Xn5p3XybDaU9TdjeFv7-Ec",
  authDomain: "loanverify-ai.firebaseapp.com",
  projectId: "loanverify-ai",
  storageBucket: "loanverify-ai.firebasestorage.app",
  messagingSenderId: "988853385508",
  appId: "1:988853385508:web:5ee8a9e195ee2766badbb1",
  measurementId: "G-CTQJF1Q1BP"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig):getApp();

const auth = getAuth(app);
auth.useDeviceLanguage();

export {auth};