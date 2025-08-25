import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-blue-50" id="hero">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Secure Loan Verification <br className="hidden md:block" /> Made Simple
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
            LoanVerify.AI uses advanced AI technology to streamline your loan
            verification process, ensuring compliance with RBI guidelines while
            saving you time and resources.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link href="/#otp">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
            <a
              href="#features"
              className="bg-white border px-6 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Image/Card */}
        <div className="flex justify-center">
          <div className="bg-white shadow-lg rounded-xl p-6 w-[320px]">
            <h3 className="text-gray-800 font-semibold mb-4">Loan Approval Rate</h3>
            <Image
              src="/vercel.svg" // placeholder, replace with chart image or custom chart later
              alt="Loan Approval Chart"
              width={280}
              height={160}
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
