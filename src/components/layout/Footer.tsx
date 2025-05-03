import React from 'react';
import { Instagram, Facebook, Mail, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Escape N Fly</h3>
            <p className="mb-4 text-gray-400">
              Discover the world with our expertly curated travel experiences. 
              Where your journey becomes an unforgettable story.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Linkedin size={20} />
              </a>              
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Home</a>
              </li>
              <li>
                <a href="#destinations" className="text-gray-400 hover:text-teal-500 transition-colors">Destinations</a>
              </li>
              <li>
                <a href="#experiences" className="text-gray-400 hover:text-teal-500 transition-colors">Experiences</a>
              </li>
              <li>
                <a href="#plan-trip" className="text-gray-400 hover:text-teal-500 transition-colors">Plan Trip</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-teal-500 transition-colors">About Us</a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Cancellation Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
            <p className="mb-4 text-gray-400">
              Subscribe to get special offers and travel inspiration.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white" 
              />
              <button className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500">
          <p>© {new Date().getFullYear()} Escape N Fly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;