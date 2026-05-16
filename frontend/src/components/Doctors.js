import React from 'react';

const doctors = [
  { name: 'Dr. Sarah Mitchell', role: 'Chief Dental Officer', exp: '18 yrs', image: '/dr_sarah.png', speciality: 'General & Preventive Dentistry' },
  { name: 'Dr. James Patel', role: 'Orthodontist', exp: '12 yrs', image: '/dr_james.png', speciality: 'Braces & Aligners' },
  { name: 'Dr. Emily Chen', role: 'Cosmetic Specialist', exp: '10 yrs', image: '/dr_emily.png', speciality: 'Veneers & Smile Design' },
  { name: 'Dr. Michael Torres', role: 'Implant Surgeon', exp: '14 yrs', image: '/dr_michael.png', speciality: 'Implants & Oral Surgery' },
];

export default function Doctors() {
  return (
    <section className="pt-4 pb-12 md:pt-10 md:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 reveal">
          <span className="section-badge">Our Team</span>
          <h2 className="section-title">Meet Our Expert Dentists</h2>
          <p className="section-subtitle mx-auto">
            Board-certified specialists with decades of combined experience dedicated to your oral health.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {doctors.map((d, i) => (
            <div key={d.name} className="card border border-gray-100/50 overflow-hidden text-center reveal group shadow-sm hover:shadow-md transition-shadow" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 h-32 md:h-56 overflow-hidden relative">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-3 md:p-6">
                <h3 className="font-display font-black text-gray-900 text-[11px] md:text-xl leading-tight mb-0.5 md:mb-1">{d.name}</h3>
                <p className="text-sky-600 text-[9px] md:text-sm font-bold mb-1 uppercase tracking-tight">{d.role}</p>
                <p className="text-gray-400 text-[8px] md:text-xs mb-2 md:mb-4 hidden md:block">{d.speciality}</p>
                <div className="inline-block bg-sky-50 text-sky-700 text-[8px] md:text-xs font-black px-2 py-0.5 md:px-3 md:py-1 rounded-none border border-sky-100 uppercase">
                  {d.exp} Exp
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
