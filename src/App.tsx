import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import Destinations from './components/home/Destinations';
import Experiences from './components/home/Experiences';
import About from './components/home/About';
import Footer from './components/layout/Footer';
import Testimonials from './components/home/Testimonials';
import TravelFeatures from './components/home/TripPlanner';
import Explore from './components/home/Explore';
import PersonalizedExperience from './components/home/PersonalizedExperience';
import DealsOfTheMonth from './components/home/DealsOfTheMonth';
import PartnersSlider from './components/home/PartnersSlider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <TravelFeatures />
          <Destinations />
          <Experiences />
          <Explore />
          <PersonalizedExperience />
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