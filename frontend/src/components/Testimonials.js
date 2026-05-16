import React, { useState, useEffect, useRef, useCallback } from 'react';
import StarIcon from '@mui/icons-material/Star';

const testimonials = [
  { name: 'Jennifer Adams', role: 'Patient since 2018', rating: 5, text: 'BrightSmile completely transformed my smile! The team is incredibly professional and the results are beyond what I expected. I finally feel confident smiling again.' },
  { name: 'Robert Kim', role: 'Implant Patient', rating: 5, text: 'Had dental implants done here and the experience was seamless. Dr. Torres and the team made me feel at ease throughout the whole process. Highly recommend!' },
  { name: 'Maria Gonzalez', role: 'Orthodontics Patient', rating: 5, text: 'My teenage daughter was nervous about braces, but the staff made the whole journey so positive. Couldn\'t be happier with the results — her smile is perfect!' },
  { name: 'David Thompson', role: 'Whitening Patient', rating: 5, text: 'Quick, professional, and the whitening results were incredible. My teeth are 8 shades brighter! The friendly environment makes every visit enjoyable.' },
  { name: 'Priya Sharma', role: 'General Patient', rating: 5, text: 'Finally found a dental clinic where I actually look forward to my appointments. The modern technology means everything is faster and pain-free.' },
  { name: 'James Wilson', role: 'Emergency Patient', rating: 5, text: 'Had a dental emergency on a Saturday and they saw me within hours. Incredible response time and the care was outstanding. True lifesavers!' },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const timerRef = useRef(null);

  const updateVisibleItems = useCallback(() => {
    if (window.innerWidth >= 1024) setVisibleItems(3.2);
    else if (window.innerWidth >= 640) setVisibleItems(2.2);
    else setVisibleItems(1.2);
  }, []);

  useEffect(() => {
    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, [updateVisibleItems]);

  const maxIndex = Math.ceil(testimonials.length - visibleItems);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(nextSlide, 5000);
  }, [nextSlide]);

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer]);

  const handleNext = () => { stopTimer(); nextSlide(); startTimer(); };
  const handlePrev = () => { stopTimer(); prevSlide(); startTimer(); };
  const handleDotClick = (i) => { stopTimer(); setCurrentIndex(i); startTimer(); };

  // Guard against index overflow when visible items count changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  return (
    <section className="pt-6 pb-4 md:pt-12 md:pb-8 bg-gradient-to-br from-primary-600 to-primary-800 overflow-hidden relative">
      {/* Background Accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-6 md:mb-10 reveal">
          <span className="inline-block bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-none uppercase tracking-wider mb-2">
            Testimonials
          </span>
          <h2 className="font-display text-xl md:text-3xl font-bold text-white mb-2">
            What Our Patients Say
          </h2>
          <p className="text-primary-100 text-[13px] md:text-base max-w-xl mx-auto">
            Hear first-hand from thousands of patients who trust us with their smiles daily.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group reveal" onMouseEnter={stopTimer} onMouseLeave={startTimer}>
          
          {/* Overflow wrapper */}
          <div className="overflow-hidden -mx-3">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
              }}
            >
              {testimonials.map((t, i) => (
                <div 
                  key={i} 
                  className="px-3 w-full shrink-0 transition-opacity duration-300"
                  style={{ width: `${100 / visibleItems}%` }}
                >
                  <div className="h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-none p-4 md:p-6 hover:bg-white/15 transition-colors duration-300 flex flex-col justify-between shadow-lg select-none">
                    <div>
                      <div className="flex gap-1 mb-3 md:mb-4">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <StarIcon key={j} className="text-yellow-400" style={{ fontSize: 14 }} />
                        ))}
                      </div>
                      <p className="text-white/90 text-[12px] md:text-[14px] leading-relaxed mb-3 md:mb-4 italic font-medium font-sans">
                        "{t.text}"
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-3 border-t border-white/10 pt-3 md:pt-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 text-white rounded-none flex items-center justify-center font-display font-bold text-sm md:text-base shadow-sm">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="text-white font-bold font-display text-[12px] md:text-sm tracking-tight leading-tight mb-0.5">{t.name}</p>
                        <p className="text-primary-200 text-[9px] md:text-xs font-medium">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Chevrons */}
          <button 
            onClick={handlePrev}
            className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 border border-white/20 backdrop-blur text-white hover:bg-white hover:text-primary-700 rounded-none flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 border border-white/20 backdrop-blur text-white hover:bg-white hover:text-primary-700 rounded-none flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Active Indicators (Dots) */}
        <div className="flex justify-center gap-2.5 mt-6 md:mt-8 reveal">
          {Array.from({ length: testimonials.length - Math.floor(visibleItems) + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-2 transition-all duration-300 rounded-none ${
                currentIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
