import { Shield, Zap, CheckCircle } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Secure Verification",
      desc: "Advanced encryption and multi-factor authentication ensure your data remains protected throughout the verification process.",
      icon: <Shield className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Fast Processing",
      desc: "Our AI-powered system reduces verification time from days to minutes, accelerating your loan approval process.",
      icon: <Zap className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "RBI Compliant",
      desc: "Stay up-to-date with all regulatory requirements with our system that automatically adapts to the latest RBI guidelines.",
      icon: <CheckCircle className="w-12 h-12 text-blue-600" />,
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-12">
          Why Choose LoanVerify.AI
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-6">{f.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
