import React from 'react';
import Hero from '../components/Hero';
import FeatureStrip from '../components/FeatureStrip';

import Doctors from '../components/Doctors';
import Testimonials from '../components/Testimonials';
import BookingForm from '../components/BookingForm';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <FeatureStrip />

      <Doctors />
      <Testimonials />

      {/* Booking + Map Side by Side */}
      <section id="booking-section" className="pt-4 pb-12 md:pt-10 md:pb-20 bg-gradient-to-b from-white to-sky-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-4 md:mb-10 reveal">
            <span className="section-badge">Book Now</span>
            <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 leading-tight tracking-tight mb-2 text-center mx-auto">Start Your Journey to a Healthier Smile</h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start reveal">

            {/* Left: Booking Form */}
            <div>
              <BookingForm />
            </div>

            {/* Right: Map */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-none shadow-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LocationOnIcon className="text-sky-400" fontSize="small" />
                    <h3 className="font-display font-black text-white text-sm uppercase tracking-widest">Visit Our Clinic</h3>
                  </div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">123 Dental Lane, HealthCity</p>
                </div>
                <div style={{ height: '360px' }}>
                  <iframe
                    title="BrightSmile Dental Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019408437789!2d-122.41941548468153!3d37.77492997975884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4233%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(10%) contrast(1.1)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Quick Contact Info */}
              <div className="bg-white rounded-none shadow-xl border border-gray-100 px-3 md:px-6 py-4 md:py-6 grid grid-cols-3 gap-2 md:gap-6">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-900 text-white rounded-none flex items-center justify-center shadow-lg shrink-0">
                    <PhoneIcon style={{ fontSize: 14 }} className="md:!text-[18px]" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest mb-0.5 whitespace-nowrap">Call Us</p>
                    <p className="text-[9px] md:text-sm font-black text-gray-900 leading-tight">+1 (800) BRIGHT-1</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 md:gap-4 bg-sky-500 p-1.5 md:p-3 border border-sky-400 shadow-xl md:scale-[1.05] z-10">
                  <div className="w-6 h-6 md:w-10 md:h-10 bg-white/20 text-white rounded-none flex items-center justify-center shadow-lg shrink-0">
                    <AccessTimeIcon style={{ fontSize: 12 }} className="md:!text-[18px]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[7px] md:text-[10px] text-sky-100 font-black uppercase tracking-widest mb-0.5 truncate">Hours</p>
                    <p className="text-[8px] md:text-sm font-black text-white leading-tight truncate">Mon–Fri: 8–7</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-sky-500 text-white rounded-none flex items-center justify-center shadow-lg shrink-0">
                    <MedicalServicesIcon style={{ fontSize: 14 }} className="md:!text-[18px]" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] text-sky-400 font-black uppercase tracking-widest mb-0.5 whitespace-nowrap">Priority</p>
                    <p className="text-[9px] md:text-sm font-black text-gray-900 leading-tight">Same-Day Slots</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

