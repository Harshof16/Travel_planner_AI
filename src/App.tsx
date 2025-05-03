import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import About from './components/home/About';
import Footer from './components/layout/Footer';
import Testimonials from './components/home/Testimonials';
import TravelFeatures from './components/home/TravelFeatures';
import DealsOfTheMonth from './components/home/Deals';
import PartnersSlider from './components/home/PartnersSlider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InternationalDestinations from './components/home/InternationalDestinations';
import IndianDestinations from './components/home/IndianDestinations';
import ExploreWorld from './components/home/ExploreWorld';
import ThemeTravel from './components/home/ThemeTravel';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <TravelFeatures />
          <IndianDestinations />
          <InternationalDestinations />
          <ExploreWorld />
          <ThemeTravel />
          <Testimonials />
          <DealsOfTheMonth />
          <About />
          <PartnersSlider />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;