import React from 'react';

export default function MapSection() {
  return (
    <section className="bg-gray-900 pt-10 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="inline-block bg-sky-500/10 text-sky-400 text-xs font-bold px-3 py-1 rounded-xl uppercase tracking-wider mb-2">Find Us</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Visit Our Clinic</h2>
          <p className="text-gray-400 text-sm mt-2">123 Dental Lane, HealthCity, HC 45678</p>
        </div>
        <div className="w-full rounded-xl overflow-hidden border border-gray-700 shadow-2xl" style={{ height: '320px' }}>
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
    </section>
  );
}
