
// import VeloraCeylonNavbar from "./Layout/navbar";
import HeroSection from "./HomePage/hero-section";
import ContactSection from "./HomePage/contact-section"
import ToursSection from "./HomePage/tours-section"
import TrustedExpertise from "./HomePage/expertise-section";
import TopDestinations from "./HomePage/destinations-section";
import RealFeedback from "./HomePage/review-section";
import LearnMoreSection from "./HomePage/learnmore-section";
import InquireSection from "./HomePage/inquire-section";
import Footer from "./Layout/footer";

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
        <LearnMoreSection />
        <InquireSection />
        {/* <Footer /> */}
      </div>
    // </div>
  );
};

export default App;
