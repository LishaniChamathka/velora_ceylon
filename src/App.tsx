
import HeroSection from "./HomePage/hero-section";
import ContactSection from "./HomePage/contact-section"
import ToursSection from "./HomePage/tours-section"

const App = () => {
  return (
    <div className="relative">
      {/* <Navbar /> */}
      <HeroSection />
      <ContactSection />
      <ToursSection />
    </div>
  );
};

export default App;
