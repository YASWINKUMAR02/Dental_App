import React from 'react';

const stats = [
  { value: '15+', label: 'Years Experience', icon: '🏆' },
  { value: '8K+', label: 'Happy Patients', icon: '😊' },
  { value: '98%', label: 'Satisfaction Rate', icon: '⭐' },
  { value: '12', label: 'Expert Dentists', icon: '👨‍⚕️' },
];

export default function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="card p-8 text-center border border-gray-100 reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="font-display text-4xl font-bold text-primary-600 mb-1">{s.value}</div>
              <div className="text-gray-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
