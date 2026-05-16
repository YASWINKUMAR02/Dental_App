import React from 'react';
import { Link } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ForumIcon from '@mui/icons-material/Forum';

const posts = [
  {
    id: 1,
    title: 'Patient and Visitor Guide',
    desc: 'Understand security protocols, appointment procedures, and safety policies active during visit hours.',
    date: 'April 05, 2026',
    comments: 12,
    bg: 'from-blue-600 to-sky-400',
    icon: '📋'
  },
  {
    id: 2,
    title: 'Nutritional Personal Consultation',
    desc: 'Comprehensive review on dietary protocols to sustain optimal enamel structural integrity.',
    date: 'March 28, 2026',
    comments: 8,
    bg: 'from-sky-500 to-emerald-400',
    icon: '🍎'
  },
  {
    id: 3,
    title: 'Center for Medical Technology',
    desc: 'Showcasing the newly integrated AI radiographic processing suites and scanning facilities.',
    date: 'March 15, 2026',
    comments: 24,
    bg: 'from-indigo-600 to-blue-500',
    icon: '🔬'
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-5 mb-12 reveal">
          <h2 className="font-display text-xl font-extrabold tracking-widest text-gray-900 uppercase font-sans">
            LATEST HEALTH TIPS & NEWS
          </h2>
          
          {/* Mock Slider Arrows */}
          <div className="hidden sm:flex gap-1.5">
            <button className="w-8 h-8 rounded-none bg-white border border-gray-200 text-gray-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 flex items-center justify-center text-xs font-bold transition-colors" aria-label="Prev">
              ‹
            </button>
            <button className="w-8 h-8 rounded-none bg-white border border-gray-200 text-gray-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 flex items-center justify-center text-xs font-bold transition-colors" aria-label="Next">
              ›
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div key={post.id} className="card flex flex-col overflow-hidden border border-gray-200 bg-white p-0 transition-all reveal" style={{ transitionDelay: `${idx * 80}ms` }}>
              
              {/* Stylized Mock Image Container */}
              <div className={`h-48 bg-gradient-to-br ${post.bg} relative flex items-center justify-center text-6xl overflow-hidden select-none`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
                <span className="drop-shadow-lg hover:scale-110 transition-transform duration-500 z-10">
                  {post.icon}
                </span>
              </div>
              
              {/* Body Content */}
              <div className="p-6 flex-grow flex flex-col">
                
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-4">
                  <div className="flex items-center gap-1">
                    <CalendarTodayIcon style={{ fontSize: 12 }} className="text-sky-400" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ForumIcon style={{ fontSize: 12 }} className="text-sky-400" />
                    <span>{post.comments} COMMENTS</span>
                  </div>
                </div>

                <h3 className="font-display text-[15px] font-extrabold text-gray-800 mb-3 tracking-tight leading-tight group-hover:text-sky-500">
                  {post.title}
                </h3>
                
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {post.desc}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link to="/about" className="text-[10px] font-extrabold tracking-widest text-sky-500 hover:text-sky-600 transition-colors uppercase font-sans">
                    Read more ›
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
