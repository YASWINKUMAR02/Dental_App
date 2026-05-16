import React from 'react';
import Hero from '../components/Hero';
import FeatureStrip from '../components/FeatureStrip';
import Stats from '../components/Stats';
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
      <Stats />
      <Doctors />
      <Testimonials />

      {/* Booking + Map Side by Side */}
      <section className="py-12 bg-gradient-to-b from-white to-sky-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-8 reveal">
            <span className="section-badge">Book Now</span>
            <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 leading-tight tracking-tight mb-2 text-center mx-auto">Start Your Journey to a Healthier Smile</h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start reveal">

            {/* Left: Booking Form */}
            <div>
              <BookingForm />
            </div>

            {/* Right: Map */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-6 pt-5 pb-3 flex items-center gap-2">
                  <LocationOnIcon className="text-sky-500" fontSize="small" />
                  <div>
                    <h3 className="font-display font-bold text-gray-900 text-lg">Visit Our Clinic</h3>
                    <p className="text-gray-500 text-sm">123 Dental Lane, HealthCity, HC 45678</p>
                  </div>
                </div>
                <div style={{ height: '360px' }}>
                  <iframe
                    title="BrightSmile Dental Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019408437789!2d-122.41941548468153!3d37.77492997975884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4233%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Quick Contact Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-sky-50 rounded-lg flex items-center justify-center">
                    <PhoneIcon className="text-sky-500" fontSize="small" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Call Us</p>
                    <p className="text-sm font-bold text-gray-800">+1 (800) BRIGHT-1</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-sky-50 rounded-lg flex items-center justify-center">
                    <AccessTimeIcon className="text-sky-500" fontSize="small" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Hours</p>
                    <p className="text-sm font-bold text-gray-800">Mon–Fri: 8AM – 7PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                    <MedicalServicesIcon className="text-red-500" fontSize="small" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Emergency</p>
                    <p className="text-sm font-bold text-gray-800">24/7 Available</p>
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

