import { Home, Car, Wallet, Building2 } from "lucide-react";

export default function LoanInfoSection() {
  const loans = [
    {
      title: "Home Loans",
      desc: "Affordable and flexible options to help you buy your dream house with ease.",
      icon: <Home className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Auto Loans",
      desc: "Get quick approval for financing your new or used vehicle purchase.",
      icon: <Car className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Personal Loans",
      desc: "Fast approval loans to meet your personal financial needs without hassle.",
      icon: <Wallet className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Business Loans",
      desc: "Boost your business growth with tailor-made financial support.",
      icon: <Building2 className="w-12 h-12 text-blue-600" />,
    },
  ];

  return (
    <section id="loan-info" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-12">
          Loan Categories We Support
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {loans.map((loan, idx) => (
            <div
              key={idx}
              className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-6">{loan.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {loan.title}
              </h3>
              <p className="text-gray-600">{loan.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
