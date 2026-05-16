import React from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';

const stats = [
  { value: '15+', label: 'Years Experience', icon: <EmojiEventsIcon fontSize="large" className="text-sky-500" /> },
  { value: '8K+', label: 'Happy Patients', icon: <SentimentSatisfiedAltIcon fontSize="large" className="text-sky-500" /> },
  { value: '98%', label: 'Satisfaction Rate', icon: <StarIcon fontSize="large" className="text-sky-500" /> },
  { value: '12', label: 'Expert Dentists', icon: <PeopleIcon fontSize="large" className="text-sky-500" /> },
];

export default function Stats() {
  return (
    <section className="py-6 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((s, i) => (
            <div key={s.label} className="card p-5 md:p-8 text-center border border-gray-100 reveal shadow-sm md:shadow-md" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-2xl md:text-3xl mb-2 md:mb-3 flex justify-center">{s.icon}</div>
              <div className="font-display text-2xl md:text-4xl font-black text-gray-900 mb-0.5 md:mb-1 tracking-tight">{s.value}</div>
              <div className="text-gray-500 text-[10px] md:text-sm font-bold uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
