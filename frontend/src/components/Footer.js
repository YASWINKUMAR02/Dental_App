import React from 'react';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';

const footerLinks = {
  'Services': ['General Dentistry', 'Teeth Whitening', 'Dental Implants', 'Orthodontics', 'Cosmetic Dentistry', 'Emergency Care'],
  'Company': ['About Us', 'Our Team', 'Careers', 'Blog', 'Privacy Policy'],
  'Quick Links': [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
    { label: 'Book Appointment', path: '/booking' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-sky-500 rounded-none flex items-center justify-center text-white shadow-lg">
                <LocalHospitalIcon fontSize="small" />
              </div>
              <span className="font-display font-black text-2xl text-white tracking-tight uppercase">
                Bright<span className="text-sky-400 font-light">Smile</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner for premium dental care. Combining cutting-edge technology with compassionate treatment.
            </p>
            <div className="flex gap-2">
              {['f', 'in', 'tw', 'yt'].map((s) => (
                <a key={s} href="#!" className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-none flex items-center justify-center text-xs font-black text-gray-400 hover:text-white transition-all duration-300 shadow-md">
                  {s.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Links Section Wrapper for 2-column mobile view */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 lg:col-span-2">
            {/* Services */}
            <div>
              <h4 className="font-display text-[11px] font-black text-white mb-6 uppercase tracking-widest border-l-2 border-sky-400 pl-3">Services</h4>
              <ul className="space-y-3">
                {footerLinks['Services'].map((s) => (
                  <li key={s}><a href="/services" className="text-xs text-gray-400 hover:text-sky-400 transition-colors font-medium">{s}</a></li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-[11px] font-black text-white mb-6 uppercase tracking-widest border-l-2 border-sky-400 pl-3">Quick Links</h4>
              <ul className="space-y-3">
                {footerLinks['Quick Links'].map((l) => (
                  <li key={l.label}><Link to={l.path} className="text-xs text-gray-400 hover:text-sky-400 transition-colors font-medium">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-[11px] font-black text-white mb-6 uppercase tracking-widest border-l-2 border-sky-400 pl-3">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <LocationOnIcon className="text-sky-500 mt-0.5" style={{ fontSize: 18 }} />
                <span className="text-sm text-gray-400">123 Dental Lane, HealthCity, HC 45678</span>
              </div>
              <div className="flex items-start gap-3">
                <PhoneIcon className="text-sky-500 mt-0.5" style={{ fontSize: 18 }} />
                <span className="text-sm text-gray-400">+1 (800) BRIGHT-1</span>
              </div>
              <div className="flex items-start gap-3">
                <EmailIcon className="text-sky-500 mt-0.5" style={{ fontSize: 18 }} />
                <span className="text-sm text-gray-400">care@brightsmile.com</span>
              </div>
              <div className="mt-6 p-5 bg-sky-500 rounded-none border border-sky-400 shadow-2xl scale-[1.02]">
                <p className="text-[10px] font-black text-white mb-3 uppercase tracking-widest">Opening Hours</p>
                {[['Mon – Fri', '8:00 AM – 7:00 PM'], ['Saturday', '9:00 AM – 5:00 PM'], ['Sunday', 'By Appointment']].map(([d, h]) => (
                  <div key={d} className="flex justify-between text-[11px] py-1.5 text-sky-100 border-b border-white/20 last:border-0">
                    <span className="font-medium">{d}</span><span className="text-white font-bold">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Bottom */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} BrightSmile Dental. All rights reserved.</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Designed with <FavoriteIcon className="text-red-500" style={{ fontSize: 14 }} /> for healthy smiles
          </p>
        </div>
      </div>
    </footer>
  );
}
