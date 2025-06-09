import Hero from './Hero'
import TravelFeatures from './TravelFeatures'
import IndianDestinations from './IndianDestinations'
import InternationalDestinations from './InternationalDestinations'
import ExploreWorld from './ExploreWorld'
import ThemeTravel from './ThemeTravel'
import Testimonials from './Testimonials'
import About from './About'
import PartnersSlider from './PartnersSlider'
import ContactModal from '../others/ContactModal'
import { useState, useEffect } from 'react'
import { getCookie, setCookie } from '../../utils'

const Home = () => {
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    

    // useEffect(() => {
    //     fetchToken();
    // }, []);

    
    useEffect(() => {
        const modalShown = getCookie('contactModalShown');

        if (!modalShown) {
            const testimonialsSection = document.getElementById('testimonials');
            const checkVisibility = () => {
                if (testimonialsSection) {
                    const rect = testimonialsSection.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
                    if (isVisible) {
                        setContactModalOpen(true);
                        setCookie('contactModalShown', 'true', 7);
                        window.removeEventListener('scroll', checkVisibility);
                    }
                }
            };
            window.addEventListener('scroll', checkVisibility);
            checkVisibility();
        }
    }, []);

    useEffect(() => {
       
        const checkScreenSize = () => {
          setIsMobile(window.innerWidth < 768); // Tailwind's `md` breakpoint
        };
    
        checkScreenSize();
    
        window.addEventListener('resize', checkScreenSize);
    
        return () => {
          window.removeEventListener('resize', checkScreenSize);
        };
      }, []);
    

    return (
        <main className='relative overflow-hidden top-0 left-0 right-0 bottom-0'>
            <Hero />
            <TravelFeatures />
            <ExploreWorld />
            <InternationalDestinations />
            <IndianDestinations />
            <ThemeTravel />
            <Testimonials />
            <div className='h-2 dark:bg-gray-900'/>
            {/* <Deals /> */}
            <About isMobile={isMobile} />
            <PartnersSlider />
            <ContactModal isMobile={isMobile} isOpen={contactModalOpen} setIsOpen={setContactModalOpen} />
        </main>
    )
}

export default Home