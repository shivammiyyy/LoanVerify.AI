export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rohit Sharma",
      role: "Home Loan Applicant",
      quote:
        "LoanVerify.AI made my home loan verification seamless. The process was so much faster than I expected!",
    },
    {
      name: "Priya Mehta",
      role: "Entrepreneur",
      quote:
        "I needed a quick business loan. The verification took minutes instead of days. Highly recommend!",
    },
    {
      name: "Arjun Verma",
      role: "Car Buyer",
      quote:
        "The auto loan verification was quick and secure. The AI-driven system saved me so much hassle.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-12">
          Trusted by Thousands
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center hover:shadow-lg transition"
            >
              <p className="text-gray-700 italic mb-6">“{t.quote}”</p>
              <h3 className="text-lg font-semibold text-gray-900">
                {t.name}
              </h3>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
