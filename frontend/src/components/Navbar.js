import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const navLinks = [
  { label: 'HOME', path: '/' },
  { label: 'DOCTORS', path: '/about' },
  { label: 'SERVICES', path: '/services' },
  { label: 'CONTACT', path: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
      scrolled ? 'shadow-md py-1 md:py-3' : 'shadow-sm py-2 md:py-4 border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo Section (JollyMedic Inspired) */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-sm group-hover:rotate-6 transition-transform duration-300">
            <LocalHospitalIcon fontSize="small" />
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight text-gray-900">
            BRIGHT<span className="text-sky-500 font-light">SMILE</span>
          </span>
        </Link>

        {/* Navigation Links Section */}
        <div className="hidden md:flex items-center gap-1.5">
          <ul className="flex items-center gap-1 mr-6">
            {navLinks.map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <li key={path}>
                  <Link
                    to={path}
                    className={`px-4 py-2 text-xs font-bold tracking-widest hover:text-sky-500 transition-colors ${
                      isActive ? 'text-sky-500' : 'text-gray-600'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Highlighted Action Button */}
          {location.pathname === '/' ? (
            <button 
              onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-sky-500 hover:bg-sky-600 text-white text-[11px] font-extrabold tracking-widest px-6 py-2.5 rounded-none transition-all shadow-sm shadow-sky-200 uppercase"
            >
              Make Appointment
            </button>
          ) : (
            <Link 
              to="/booking" 
              className="bg-sky-500 hover:bg-sky-600 text-white text-[11px] font-extrabold tracking-widest px-6 py-2.5 rounded-none transition-all shadow-sm shadow-sky-200 uppercase"
            >
              Make Appointment
            </Link>
          )}
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-sky-500 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

      </div>

      {/* Mobile Dropdown Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-50 ${
        menuOpen ? 'max-h-72 shadow-lg' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-4 flex flex-col gap-2 text-center">
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`block py-3 text-xs font-extrabold tracking-wider hover:bg-gray-50 hover:text-sky-500 ${
                location.pathname === path ? 'text-sky-500' : 'text-gray-600'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link 
            to="/booking" 
            className="mt-2 block py-3 bg-sky-500 text-white text-xs font-extrabold tracking-wider rounded-none shadow-md uppercase"
          >
            Make Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}
