import { Link } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HealingIcon from '@mui/icons-material/Healing';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import StarIcon from '@mui/icons-material/Star';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const services = [
  { Icon: LocalHospitalIcon, title: 'General Dentistry', desc: 'Comprehensive checkups, cleanings, and preventive care to keep your teeth healthy for life.', color: 'bg-blue-50 text-blue-600' },
  { Icon: AutoAwesomeIcon, title: 'Teeth Whitening', desc: 'Professional-grade whitening treatments that deliver dramatic, safe, and comfortable results.', color: 'bg-yellow-50 text-yellow-600' },
  { Icon: HealingIcon, title: 'Dental Implants', desc: 'Permanent, natural-looking tooth replacements that restore your smile and confidence.', color: 'bg-purple-50 text-purple-600' },
  { Icon: SentimentVerySatisfiedIcon, title: 'Orthodontics', desc: 'Straighten teeth with modern braces or invisible aligners for a perfectly aligned smile.', color: 'bg-green-50 text-green-600' },
  { Icon: StarIcon, title: 'Cosmetic Dentistry', desc: 'Veneers, bonding, and complete smile makeovers to transform your appearance.', color: 'bg-pink-50 text-pink-600' },
  { Icon: MedicalServicesIcon, title: 'Emergency Care', desc: 'Immediate pain relief and urgent dental treatment available when you need it most.', color: 'bg-red-50 text-red-600' },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="section-badge">What We Offer</span>
          <h2 className="section-title mx-auto">Comprehensive Dental Services</h2>
          <p className="section-subtitle mx-auto text-center">
            From routine cleanings to complete smile transformations — everything your smile needs under one roof.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={s.title} className="card p-8 border border-gray-100 reveal group cursor-default" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className={`w-14 h-14 ${s.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                <s.Icon style={{ fontSize: 28 }} />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="btn-primary">View All Services →</Link>
        </div>
      </div>
    </section>
  );
}
