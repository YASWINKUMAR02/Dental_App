import React from 'react';
import { Link } from 'react-router-dom';
import MedicationIcon from '@mui/icons-material/Medication';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

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
    icon: <AirportShuttleIcon fontSize="inherit" />,
    title: '24 HOURS EMERGENCY SERVICES',
    desc: 'Equipped with an exclusive weekend acute intervention desk to quickly resolve trauma, sudden aches, and repair needs.',
  },
  {
    icon: <HealthAndSafetyIcon fontSize="inherit" />,
    title: 'STRICT STERILIZATION',
    desc: 'Adhering to the highest global standards of hygiene and infection control for your complete safety and peace of mind.',
  },
];

export default function FeatureStrip() {
  return (
    <section className="py-6 md:py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 text-center">
          {features.map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center p-4 md:p-4 bg-gray-50/50 md:bg-transparent rounded-2xl border border-gray-100 md:border-none reveal shadow-sm md:shadow-none" style={{ transitionDelay: `${idx * 100}ms` }}>
              {/* Cyan Icon */}
              <div className="text-sky-500 text-4xl md:text-[56px] hover:text-sky-600 hover:scale-105 transition-all duration-300 mb-3 md:mb-6 cursor-default">
                {feat.icon}
              </div>
              
              {/* Heading */}
              <h3 className="font-display text-[10px] md:text-[13px] font-black tracking-widest text-gray-900 mb-1 md:mb-4 uppercase font-sans leading-tight">
                {feat.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-400 text-[8px] md:text-xs leading-relaxed mb-2 md:mb-5 max-w-[280px] mx-auto hidden md:block">
                {feat.desc}
              </p>
              
              {/* Link */}
              <Link to="/services" className="text-[8px] md:text-[10px] font-extrabold tracking-widest text-gray-500 hover:text-sky-500 transition-colors uppercase font-sans hidden md:block">
                Read more ›
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
