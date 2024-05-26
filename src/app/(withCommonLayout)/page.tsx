import { Container } from "@mui/material";
import AboutUs from "./homeComponents/AboutUs";
import HeroSection from "./homeComponents/HeroSection";
import RecentLostItemReports from "./homeComponents/RecentLostItemReports";
import Footer from "@/components/shared/footer/Footer";
import Testimonial from "./homeComponents/Testimonial";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Container>
        <Testimonial />
        <AboutUs />
        <RecentLostItemReports />
      </Container>
      <Footer />
      
    </main>
  );
}
