import ClientSection from "@/components/ClientSection";
import FAQ from "@/components/edit/FAQEdit";
import Features from "@/components/edit/FeatureEdit";
import EditNavbar from "@/components/edit/NavbarEdit";
import Testimonial from "@/components/edit/TestimonialEdit";
import Footer from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import Offer from "@/components/Offer";

function page() {
  return (
    <div>
      <EditNavbar />
      <HeroSection />
      <ClientSection />
      <Features />
      <Testimonial />
      <FAQ />
      <Offer />
      <Footer />
    </div>
  );
}

export default page;
