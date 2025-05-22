import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import AboutUs from './components/others/AboutUs';
import Terms from './components/others/Terms';
import PrivacyPolicy from './components/others/PrivacyPolicy';
import RefundPolicy from './components/others/RefundPolicy';
import Feedback from './components/others/Feedback';
import Contact from './components/others/Contact';
import TripDetails from './components/details/TripDetails';
import { TokenProvider } from './context/TokenProvider';
import ChatbotButton from './components/layout/chatbot';

function App() {
  return (
    <TokenProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trips" element={<TripDetails />} />
                <Route path="/about-us" element={<AboutUs/>} />
                <Route path="/terms-of-use" element={<Terms />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <ChatbotButton />
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </TokenProvider>
  );
}

export default App;