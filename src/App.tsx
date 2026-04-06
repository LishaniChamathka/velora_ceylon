
// import VeloraCeylonNavbar from "./Layout/navbar";
import HeroSection from "./HomePage/hero-section";
import ContactSection from "./HomePage/contact-section"
import ToursSection from "./HomePage/tours-section"
import TrustedExpertise from "./HomePage/expertise-section";
import TopDestinations from "./HomePage/destinations-section";
import RealFeedback from "./HomePage/review-section";

const App = () => {
  return (
    // <div className="relative">
    //   <VeloraCeylonNavbar />
      <div>
        <HeroSection />
        <ContactSection />
        <ToursSection />
        <TrustedExpertise />
        <TopDestinations />
        <RealFeedback />
      </div>
    // </div>
  );
};

export default App;
