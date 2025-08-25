import { UserPlus, Upload, ShieldCheck, CheckCircle } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Register",
      desc: "Create your account with mobile number verification.",
      icon: <UserPlus className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Submit",
      desc: "Upload required documents for verification.",
      icon: <Upload className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Verify",
      desc: "Our AI system verifies your information quickly and securely.",
      icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Approve",
      desc: "Receive your verification report and approval instantly.",
      icon: <CheckCircle className="w-12 h-12 text-blue-600" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-12">
          How It Works
        </h2>

        <div className="grid gap-10 md:grid-cols-4">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center px-6"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow">
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {s.title}
              </h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
