"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/libs/apiClient";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PredictionTable from "@/components/PredictionTable";

export default function ProfilePage() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(res => {
        setUserData(res.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading profile...</p>;

  if (!userData)
    return (
      <div className="p-6 text-center">
        <p className="mb-4">Please log in to view your profile.</p>
        <Link href="/login"><Button>Login</Button></Link>
      </div>
    );

  return (
    <main className="px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Welcome, {userData.fullName || userData.mobile}</h1>

      {userData.prediction ? (
        <>
          <PredictionTable data={userData} />
          <div className="mt-6 text-center">
            <Link href="/predict">
              <Button>Re-predict Loan Eligibility</Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center mt-6">
          <p className="mb-4">You haven’t made any predictions yet.</p>
          <Link href="/predict">
            <Button>Make Your First Prediction</Button>
          </Link>
        </div>
      )}
    </main>
  );
}
