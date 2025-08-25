import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/Navbar";

export const metadata: Metadata = {
  title: "LoanVerify.AI",
  description: "Secure loan verification made simple",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
