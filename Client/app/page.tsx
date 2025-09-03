import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import LoanInfoSection from "@/components/LoanInfoSection";
import NavBar from "@/components/Navbar";
import OtpSection from "@/components/OtpSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <NavBar />
      <HeroSection />
      <FeaturesSection/>
      <HowItWorksSection />
      <LoanInfoSection />
      <OtpSection />
      <TestimonialsSection />
      <Footer/>
    </main>
  );
}
