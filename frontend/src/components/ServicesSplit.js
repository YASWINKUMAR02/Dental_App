import React from 'react';
import { Link } from 'react-router-dom';

const specialities = [
  { id: 'surgery', name: 'Oral Surgery', icon: '🦷', desc: 'Expert surgical interventions for complex tooth impactions and reconstructive work.' },
  { id: 'endo', name: 'Endodontic', icon: '🔬', desc: 'State-of-the-art root canal therapies ensuring pain relief and natural tooth preservation.' },
  { id: 'prostho', name: 'Prosthodontics', icon: '🪥', desc: 'Precision designing and placement of biocompatible veneers, crowns, and bridges.' },
  { id: 'apico', name: 'Apicoectomy', icon: '💉', desc: 'Minor microscopic root-end surgical operations to salvage infected structure.' },
];

export default function ServicesSplit() {
  return (
    <section className="py-24 bg-white pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Section Header (Apex Style) */}
        <div className="grid md:grid-cols-2 gap-8 items-end mb-16 reveal">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-[2px] bg-primary-600"></div>
              <span className="text-xs font-extrabold tracking-widest uppercase text-primary-600">
                What kind of service we offer?
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              A World Of <br />Health Services
            </h2>
          </div>
          <div>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md font-medium opacity-90">
              Our comprehensive, technologically integrated practice provides personalized dental diagnostic profiles and clinical solutions to families and professionals globally.
            </p>
          </div>
        </div>

        {/* 2. Split Body Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: 2x2 Service Cards */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-8 gap-y-12 reveal">
            {specialities.map((item) => (
              <div key={item.id} className="flex gap-5 group">
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex-shrink-0 flex items-center justify-center text-2xl group-hover:bg-primary-50 transition-colors duration-300 shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2 tracking-tight group-hover:text-primary-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Blue Schedule Widget */}
          <div className="lg:col-span-4 reveal">
            <div className="bg-primary-600 rounded-2xl p-8 text-white shadow-2xl shadow-primary-900/10 relative overflow-hidden">
              
              {/* Decorative BG subtle circles */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/5"></div>
              
              <h3 className="font-display text-xl font-extrabold mb-6 pb-4 border-b border-white/15 flex items-center gap-2 tracking-tight">
                📅 Workings Schedule
              </h3>

              {/* Hours list */}
              <div className="space-y-3.5 mb-8">
                {[
                  { day: 'Monday to Friday', hours: '8:30am – 10:00pm' },
                  { day: 'Saturday', hours: '9:30am – 7:00pm' },
                  { day: 'Sunday', hours: '9:30am – 4:00pm' },
                ].map((t) => (
                  <div key={t.day} className="flex justify-between items-center text-xs font-medium py-1 border-b border-white/5 last:border-none">
                    <span className="text-white/80">{t.day}</span>
                    <span className="font-bold">{t.hours}</span>
                  </div>
                ))}
              </div>

              {/* Booking Mini CTA */}
              <div className="pt-4 border-t border-white/15 space-y-4">
                <h4 className="font-display text-sm font-bold">Book an Appointment</h4>
                <p className="text-[10px] text-primary-100 leading-relaxed mb-4">
                  Click below to securely reserve your clinical diagnostic scan instantly online.
                </p>
                <Link
                  to="/booking"
                  className="block text-center border border-white/50 hover:bg-white hover:text-primary-600 text-white text-xs font-extrabold tracking-widest py-3.5 px-4 rounded-lg transition-all duration-300 uppercase"
                >
                  Booking
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
