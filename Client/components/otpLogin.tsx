"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { phoneLogin } from "@/libs/apiClient";

declare global {
  interface Window {
    phoneEmailListener?: (userObj: { user_json_url: string }) => void;
  }
}

const OtpLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    // Prevent duplicate script injection
    if (!document.getElementById("phone-email-script")) {
      const script = document.createElement("script");
      script.id = "phone-email-script";
      script.src = "https://www.phone.email/sign_in_button_v1.js";
      script.async = true;
      buttonRef.current.appendChild(script);
    }

    window.phoneEmailListener = async function (userObj) {
      setLoading(true);
      setError(null);
      try {
        const data = await phoneLogin(userObj.user_json_url);
        if (data.success) {
          router.push("/profile"); // Change route as needed
        } else {
          setError("Login failed");
        }
      } catch (err) {
        console.error("Phone login error:", err);
        setError("An error occurred during login.");
      } finally {
        setLoading(false);
      }
    };

    return () => {
      window.phoneEmailListener = undefined;
    };
  }, [router]);

  return (
    <div>
      {/* Container for the phone.email button */}
      <div
        ref={buttonRef}
        className="pe_signin_button flex flex-center fixed"
        data-client-id="15695407177920574360"
      ></div>

      {/* Show loading and error messages */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default OtpLogin;
