"use client";

import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoanInfoSection from "@/components/LoanInfoSection";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <main className="px-6 py-10 max-w-5xl mx-auto">
      {/* Intro Section */}
      <LoanInfoSection />

      {/* Login Section */}
      <section className="mt-12 text-center">
        {user ? (
          <>
            <p className="mb-4 text-lg font-medium">
              You are logged in as: <span className="font-bold">{user.phoneNumber}</span>
            </p>
            <Link href="/profile">
              <Button>Go to Profile</Button>
            </Link>
          </>
        ) : (
          <>
            <p className="mb-4">Login to check or predict your loan eligibility.</p>
            <Link href="/login">
              <Button>Login with Phone OTP</Button>
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
