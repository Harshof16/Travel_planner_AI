import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Trips', href: '/trips' },
    { label: 'About', href: '/about-us' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 
          'bg-white/90 backdrop-blur-md shadow-sm dark:bg-gray-900/90' : 
          'bg-transparent'
        }
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-16 gap-4">
            <div className="cursor-pointer" onClick={() => navigate('/')}>
            <img
                src={(theme === 'dark' || !isScrolled) ? '/src/public/logo/darkLogo.png' : '/src/public/logo/lightLogo.png'}
                alt="Company Logo"
                className="h-48 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`
                  text-md font-medium transition-colors hover:underline underline-offset-4
                  ${isScrolled ?
                      'text-gray-700 hover:text-teal-600 dark:text-gray-200 dark:hover:text-teal-400' :
                      'text-gray-200 hover:text-teal-600 dark:text-gray-100 dark:hover:text-teal-400'
                    }
                `}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? 
                <Sun className="h-5 w-5 text-amber-400" /> : 
                <Moon className="h-5 w-5 text-gray-500" />
              }
            </button>

            {/* Google Rating Badge */}
            <div className="md:flex flex-col items-center space-y-1 p-2 bg-gray-800 dark:bg-gray-800 rounded-md cursor-pointer" onClick={() => window.open('https://www.google.com/search?sca_esv=35dc981465dfcda7&sxsrf=AHTn8zrDvWvMHl5HifheMG352Puv6YLAyw:1746553295797&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzbbK8c1OVNRVD44NTuLFZmVj_Zvpw03MZ5zULxRZKRg_x4utHu1LPG28COPhGdt1nBJbqWyDrnAxD6qgK60RnAqh4eGG&q=Escapenfly+Reviews&sa=X&ved=2ahUKEwib3ZuGso-NAxWk8zgGHbxUAl4Q0bkNegQIIRAE&cshid=1746553382540124&biw=1366&bih=563&dpr=1#lrd=0x390fe9e57a8ebcc3:0x6c755ac036d38fcc,3', '_blank')}>
              <img
                src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
                alt="Google Rating Badge"
                className="h-8 w-auto mt-2"
              />
              <span className="text-sm font-medium text-white dark:text-gray-200">
                4.8 <span className="text-yellow-500">★</span>
              </span>
              <span className="text-xs text-gray-100 dark:text-gray-300">
                (238 reviews)
              </span>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? 
                <X className="h-6 w-6 text-gray-700 dark:text-gray-200" /> : 
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  className="text-base font-medium text-gray-700 hover:text-teal-600 dark:text-gray-200 dark:hover:text-teal-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;