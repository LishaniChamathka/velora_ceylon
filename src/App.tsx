import { BrowserRouter, Routes, Route } from "react-router-dom";
import VeloraCeylonNavbar from "./Layout/navbar";

import HeroSection from "./HomePage/hero-section";
import ContactSection from "./HomePage/contact-section";
import ToursSection from "./HomePage/tours-section";
import TrustedExpertise from "./HomePage/expertise-section";
import TopDestinations from "./HomePage/destinations-section";
import RealFeedback from "./HomePage/review-section";
import LearnMoreSection from "./HomePage/learnmore-section";
import InquireSection from "./HomePage/inquire-section";
import Footer from "./Layout/footer";

import AboutUs from "./About/about";
import ToursPage from "./Tours/tours";
import TourDetailsPage from "./Tours/tourDetail";
import ContactUsPage from "./Contact/contact";

import ScrollToTop from "./ScrollToTop"; 

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
        <ScrollToTop /> 
        <VeloraCeylonNavbar />
        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/about-us"   element={<AboutUs />} />
          <Route path="/tours"      element={<ToursPage />} />
          <Route path="/tours/:id" element={<TourDetailsPage />} />
           {/* <Route path="/faq"        element={<Faq />} /> */}
          <Route path="/contact-us" element={<ContactUsPage />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;