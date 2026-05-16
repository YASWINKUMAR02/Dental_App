import React from 'react';
import { Link } from 'react-router-dom';
import MedicationIcon from '@mui/icons-material/Medication';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const features = [
  {
    icon: <MedicationIcon fontSize="inherit" />,
    title: 'AMAZING MEDICAL FACILITY',
    desc: 'Operating on modern, 100% digitally scanner workflows for quick diagnostics and painless, minimally invasive treatments.',
  },
  {
    icon: <MonitorHeartIcon fontSize="inherit" />,
    title: 'WORLD CLASS HEALTHCARE',
    desc: 'Highly individualized, transparent care protocols delivered by globally recognized dental surgeons and hygienists.',
  },
  {
    icon: <EventAvailableIcon fontSize="inherit" />,
    title: 'FLEXIBLE APPOINTMENTS',
    desc: 'Convenient scheduling options including early morning and evening slots to fit your busy lifestyle perfectly.',
  },
  {
    icon: <AccessTimeIcon fontSize="inherit" />,
    title: 'OPENING HOURS',
    isHours: true,
    schedule: [
      { d: 'Mon – Fri', h: '8:00 AM – 7:00 PM' },
      { d: 'Saturday', h: '9:00 AM – 5:00 PM' },
      { d: 'Sunday', h: 'By Appointment' }
    ]
  },
];

export default function FeatureStrip() {
  return (
    <section className="pt-6 pb-4 md:pt-10 md:pb-6 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 text-center">
          {features.map((feat, idx) => (
            <div key={idx} className={`flex flex-col items-center p-3 md:p-4 rounded-2xl border reveal shadow-sm md:shadow-none transition-all duration-300 ${
              feat.isHours 
                ? 'bg-sky-500 border-sky-400 md:shadow-xl md:scale-[1.02] z-10' 
                : 'bg-gray-50/50 md:bg-transparent border-gray-100 md:border-none'
            }`} style={{ transitionDelay: `${idx * 100}ms` }}>
              {/* Cyan Icon */}
              <div className={`${feat.isHours ? 'text-white' : 'text-sky-500'} text-3xl md:text-[56px] hover:scale-105 transition-all duration-300 mb-2 md:mb-6 cursor-default`}>
                {feat.icon}
              </div>
              
              {/* Heading */}
              <h3 className={`font-display text-[9px] md:text-[13px] font-black tracking-widest mb-1 md:mb-4 uppercase font-sans leading-tight ${feat.isHours ? 'text-white' : 'text-gray-900'}`}>
                {feat.title}
              </h3>
              
              {/* Description */}
              {feat.isHours ? (
                <div className="w-full space-y-0.5 mt-0.5 md:mt-0">
                  {feat.schedule.map((row, i) => (
                    <div key={i} className="flex justify-between text-[7px] md:text-[11px] text-sky-100 border-b border-white/10 last:border-0 pb-0.5">
                      <span className="font-medium">{row.d}</span>
                      <span className="text-white font-bold ml-1">{row.h}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-[8px] md:text-xs leading-relaxed mb-2 md:mb-5 max-w-[280px] mx-auto hidden md:block">
                  {feat.desc}
                </p>
              )}
              
              {/* Link */}
              {!feat.isHours && (
                <Link to="/services" className="text-[8px] md:text-[10px] font-extrabold tracking-widest text-gray-500 hover:text-sky-500 transition-colors uppercase font-sans hidden md:block">
                  Read more ›
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
