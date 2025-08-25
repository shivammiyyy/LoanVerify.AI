import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gray-900 text-gray-300 py-12 mt-20 w-full"
    >
      <div className="mx-auto max-w-7xl px-6 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            LoanVerify.<span className="text-blue-400">AI</span>
          </h2>
          <p className="text-sm text-gray-400">
            Secure, fast, and RBI-compliant loan verification powered by AI.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#features" className="hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link href="#how-it-works" className="hover:text-white">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="#loan-info" className="hover:text-white">
                Loan Info
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="hover:text-white">
                Testimonials
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@loanverify.ai</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: Bangalore, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LoanVerify.AI. All rights reserved.
      </div>
    </footer>
  );
}
