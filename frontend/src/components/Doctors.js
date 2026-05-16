import React from 'react';

const doctors = [
  { name: 'Dr. Sarah Mitchell', role: 'Chief Dental Officer', exp: '18 yrs', image: '/dr_sarah.png', speciality: 'General & Preventive Dentistry' },
  { name: 'Dr. James Patel', role: 'Orthodontist', exp: '12 yrs', image: '/dr_james.png', speciality: 'Braces & Aligners' },
  { name: 'Dr. Emily Chen', role: 'Cosmetic Specialist', exp: '10 yrs', image: '/dr_emily.png', speciality: 'Veneers & Smile Design' },
  { name: 'Dr. Michael Torres', role: 'Implant Surgeon', exp: '14 yrs', image: '/dr_michael.png', speciality: 'Implants & Oral Surgery' },
];

export default function Doctors() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="section-badge">Our Team</span>
          <h2 className="section-title">Meet Our Expert Dentists</h2>
          <p className="section-subtitle mx-auto">
            Board-certified specialists with decades of combined experience dedicated to your oral health.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((d, i) => (
            <div key={d.name} className="card border border-gray-100 overflow-hidden text-center reveal group" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 h-48 overflow-hidden relative">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-gray-900 text-lg mb-1">{d.name}</h3>
                <p className="text-primary-600 text-sm font-semibold mb-1">{d.role}</p>
                <p className="text-gray-400 text-xs mb-3">{d.speciality}</p>
                <span className="inline-block bg-primary-50 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-md">
                  {d.exp} experience
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
