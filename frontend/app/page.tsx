import ClientSection from "@/components/ClientSection";
import Features from "@/components/Features";
import Footer from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import Offer from "@/components/Offer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ClientSection />
      <Features />
      <Offer/>
      <Footer />
    </div>
  );
}
