import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-16 md:pt-24 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero-bg.png')" }}>

      {/* Semi-transparent white overlay to ensure text readability against the background image */}
      <div className="absolute inset-0 pointer-events-none bg-white/30"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 gap-4 md:gap-12 items-end min-h-[300px] md:min-h-[550px] pt-6 md:pt-20 pb-0">

          {/* 1. Left Side: Doctor Photographic Showcase */}
          <div className="flex justify-center self-end reveal w-full">
            <div className="relative w-full max-w-[500px] flex items-end justify-center select-none animate-fade-in">



              {/* Real Dentist Stock Image - Transparent */}
              <div className="relative w-full h-full flex items-end justify-center group">
                <img
                  src="/dentist-hero-removebg-preview.png"
                  alt="Lead Dentist Specialist"
                  className="w-full h-full object-contain object-bottom drop-shadow-2xl scale-[1.5] md:scale-100 origin-bottom"
                />
              </div>

              {/* Top Left Icon Mock Badge */}
              <div className="absolute left-0 md:-left-2 bottom-0 md:top-12 md:bottom-auto bg-white px-2 py-1 md:px-5 md:py-2.5 rounded-none shadow-xl flex items-center gap-2 border border-gray-100">
                <span className="text-[8px] md:text-xs font-extrabold text-gray-900 uppercase tracking-widest whitespace-nowrap">Dr. Sarah Mitchell</span>
              </div>

            </div>
          </div>

          {/* 2. Right Side: Typography Heading & CTAs */}
          <div className="space-y-3 md:space-y-6 text-left animate-fade-up pb-8 md:pb-24 self-center">

            <div className="inline-flex flex-col">
              <h1 className="font-display text-xl md:text-5xl font-extrabold text-gray-900 leading-none flex flex-col">
                <span className="text-sky-500 tracking-tight text-lg md:text-3xl font-medium uppercase font-sans">BrightSmile</span>
                <span className="text-gray-600 font-bold uppercase tracking-tight mt-1 leading-tight text-sm md:text-5xl">Perfect For Care</span>
              </h1>
            </div>

            <p className="text-gray-500 text-[9px] md:text-sm leading-relaxed max-w-lg">
              Premium clinical diagnostics and advanced painless dental treatments for your perfect smile.
            </p>

            {/* Dual Action Cluster */}
            <div className="pt-2 md:pt-4 flex flex-col md:flex-row justify-start items-start md:items-center gap-2 md:gap-4">
              <Link
                to="/about"
                className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white text-[10px] font-extrabold tracking-widest px-6 py-3 rounded-none shadow-md transition-all active:scale-95 uppercase"
              >
                Know More
              </Link>
              <Link
                to="/booking"
                className="w-full sm:w-auto bg-sky-400 hover:bg-sky-500 text-white text-[10px] font-extrabold tracking-widest px-6 py-3 rounded-none shadow-md shadow-sky-200 transition-all active:scale-95 uppercase"
              >
                Make Appointment
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
