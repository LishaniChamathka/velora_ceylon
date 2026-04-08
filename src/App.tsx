import { BrowserRouter, Routes, Route } from "react-router-dom";
import VeloraCeylonNavbar from "./Layout/navbar";

// Home page sections
import HeroSection from "./HomePage/hero-section";
import ContactSection from "./HomePage/contact-section";
import ToursSection from "./HomePage/tours-section";
import TrustedExpertise from "./HomePage/expertise-section";
import TopDestinations from "./HomePage/destinations-section";
import RealFeedback from "./HomePage/review-section";
import LearnMoreSection from "./HomePage/learnmore-section";
import InquireSection from "./HomePage/inquire-section";
import Footer from "./Layout/footer";

// Pages (create these files if they don't exist yet)
import AboutUs from "./About/about";
// import Tours from "./Pages/tours";
// import Faq from "./Pages/faq";
// import ContactUs from "./Pages/contact-us";

// Home page assembled
const HomePage = () => (
  <>
    <HeroSection />
    <ContactSection />
    <ToursSection />
    <TrustedExpertise />
    <TopDestinations />
    <RealFeedback />
    <LearnMoreSection />
    <InquireSection />
    <Footer />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative">
        <VeloraCeylonNavbar />
        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/about-us"   element={<AboutUs />} />
          {/* <Route path="/tours"      element={<Tours />} />
          <Route path="/faq"        element={<Faq />} />
          <Route path="/contact-us" element={<ContactUs />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;