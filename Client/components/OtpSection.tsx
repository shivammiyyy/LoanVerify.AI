import OtpLogin from "@/components/otpLogin";

export default function OtpSection() {
  return (
    <section
      id="otp"
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-20"
    >
      <div className="mx-auto max-w-3xl px-6 text-center text-white">
        <h2 className="text-3xl font-semibold mb-4">
          Get Started with Mobile Verification
        </h2>
        <p className="text-lg mb-10 text-blue-100">
          Enter your mobile number to verify your identity and access your
          profile.
        </p>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <OtpLogin />
        </div>
      </div>
    </section>
  );
}
