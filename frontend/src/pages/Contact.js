import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Contact() {
  return (
    <main className="pt-24 bg-gray-50 min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-up">
        
        {/* Contact Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="section-badge">Get In Touch</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">We'd Love to Hear From You</h1>
          <p className="text-gray-500 text-lg">Have any queries, requests, or wish to send dental files? Select a contact mode or drop us a direct query below.</p>
        </div>

        {/* Main Section with Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Info Cards Group */}
          <div className="space-y-6 lg:col-span-1">
            {[
              { title: 'Call Center', desc: 'Talk directly with reception experts.', info: '+1 (800) BRIGHT-1', sub: 'Mon-Sat 8AM - 7PM', Icon: PhoneIcon, bg: 'bg-blue-500' },
              { title: 'E-Mail', desc: 'Send inquiries & digital radiography.', info: 'care@brightsmile.com', sub: 'Response within 4 hours', Icon: EmailIcon, bg: 'bg-sky-500' },
              { title: 'Location', desc: 'Walk-in for scheduling & checkups.', info: '123 Dental Lane', sub: 'HealthCity, HC 45678', Icon: LocationOnIcon, bg: 'bg-indigo-500' }
            ].map((card) => (
              <div key={card.title} className="card p-6 flex gap-5 items-center border border-gray-100/70 hover:scale-[1.02] transition-transform">
                <div className={`w-14 h-14 rounded-xl ${card.bg} flex items-center justify-center flex-shrink-0 text-white shadow-md`}>
                  <card.Icon style={{ fontSize: 24 }} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{card.title}</h3>
                  <p className="text-xs text-gray-500 mb-1">{card.desc}</p>
                  <p className="font-display font-bold text-primary-600 text-base leading-tight">{card.info}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Inquiry Form Container */}
          <div className="lg:col-span-2 reveal flex">
            <form className="card p-8 md:p-10 w-full border border-gray-100" onSubmit={(e) => e.preventDefault()}>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Send Us a Message</h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input type="text" className="input-field" placeholder="Enter your name" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="input-field" placeholder="Enter email" required />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <input type="text" className="input-field" placeholder="General Inquiry, Insurance, Feedback..." required />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea rows="4" className="input-field resize-none" placeholder="Describe your queries in detail..." required />
              </div>

              <button className="btn-primary w-full justify-center py-3.5 mt-8 font-bold">Send Message Now</button>
            </form>
          </div>

        </div>

        {/* Map Snippet Visual Placeholder */}
        <div className="mt-16 card overflow-hidden border-none shadow-hero min-h-[350px] flex items-center justify-center relative reveal">
          <div className="absolute inset-0 bg-[radial-gradient(#3b92f3_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-20"></div>
          <div className="relative z-10 text-center p-8">
            <div className="text-5xl mb-4 animate-bounce text-sky-500 flex justify-center">
              <LocationOnIcon style={{ fontSize: 64 }} />
            </div>
            <h3 className="font-display text-2xl font-bold text-gray-900">Find Us in Downtown HealthCity</h3>
            <p className="text-gray-500 mt-2 mb-6">Ample underground free parking and wheelchair accessible entrances.</p>
            <div className="inline-flex gap-4">
              <button className="btn-primary bg-gray-900 text-white hover:bg-black">Open in Google Maps</button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
