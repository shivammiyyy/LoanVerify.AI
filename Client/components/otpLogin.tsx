/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, useEffect, useTransition, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sessionLogin } from "@/libs/apiClient";

function otpLogin() {
   
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [resendCountdown, setResendCountdown] = useState(0);

  // Keep recaptcha instance as a ref so it won't be recreated
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  useEffect(() => {
    // Countdown timer for resend
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  useEffect(() => {
    // Setup invisible recaptcha ONCE
    if (!recaptchaVerifier) {
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
      setRecaptchaVerifier(verifier);
      return () => verifier.clear();
    }
  }, [recaptchaVerifier]);

  // Automatically trigger OTP verification when full OTP entered
  useEffect(() => {
    if (otp.length === 6 && confirmationResult) {
      handleVerifyOtp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  // Request OTP for phone
  const handleRequestOtp = async (e?: FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSuccess("");
    setResendCountdown(60);

    if (!recaptchaVerifier) {
      setError("RecaptchaVerifier not initialized. Please reload page.");
      return;
    }

    startTransition(async () => {
      try {
        const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        setConfirmationResult(confirmation);
        setSuccess("OTP sent successfully ✅");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setResendCountdown(0);
        switch (err.code) {
          case "auth/invalid-phone-number":
            setError("Invalid phone number. Please check the number.");
            break;
          case "auth/too-many-requests":
            setError("Too many requests. Please try again later.");
            break;
          default:
            setError("Failed to send OTP. Please try again.");
        }
      }
    });
  };

  // Verify OTP and establish backend session
  const handleVerifyOtp = async () => {
    setError(null);
    setSuccess("");
    if (!confirmationResult) {
      setError("Please request OTP first.");
      return;
    }
    startTransition(async () => {
      try {
        await confirmationResult.confirm(otp);
        // Firebase session now present
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setError("User not found after verification. Please try again.");
          return;
        }
        const idToken = await currentUser.getIdToken();
        // Start secure backend session as well!
        await sessionLogin(idToken);

        setSuccess("Phone verified and session established! 🎉");
        router.replace("/profile");
       
      } catch (err) {
        console.error("Error verifying OTP:", err);
        setError("Failed to verify OTP. Please check the code.");
      }
    });
  };

  // Loader for async actions
  const loadingIndicator = (
    <div role="status" className="flex justify-center">
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-gray-200 animate-spin fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
      {/* Step 1: Phone Input */}
      {!confirmationResult && (
        <form onSubmit={handleRequestOtp} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Enter Mobile Number
          </label>
          <Input
            placeholder="+91 9876543210"
            className="text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            pattern="^\+\d{1,3}\d{7,13}$"
            required
          />
          <p className="text-xs text-gray-400">
            Please include your country code (e.g., +91 for India).
          </p>
          <Button
            type="submit"
            disabled={
              !phoneNumber ||
              isPending ||
              resendCountdown > 0 ||
              !phoneNumber.match(/^\+\d{10,14}$/)
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            {resendCountdown > 0
              ? `Resend OTP in ${resendCountdown}s`
              : isPending
              ? "Sending OTP..."
              : "Send OTP"}
          </Button>
        </form>
      )}

      {/* Step 2: OTP Input */}
      {confirmationResult && (
        <div className="flex flex-col items-center space-y-4 mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Enter OTP
          </label>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            className="flex justify-center gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            onClick={handleVerifyOtp}
            disabled={otp.length !== 6 || isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
            type="button"
          >
            {isPending ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      )}

      {/* Status messages */}
      <div className="mt-4 text-center">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
      </div>

      {/* Invisible Recaptcha */}
      <div id="recaptcha-container" />

      {/* Loader indicator */}
      {isPending && <div className="mt-4 flex justify-center">{loadingIndicator}</div>}
    </div>
  );
}

export default otpLogin;
