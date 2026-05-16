import { Link } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HealingIcon from '@mui/icons-material/Healing';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import BiotechIcon from '@mui/icons-material/Biotech';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CheckIcon from '@mui/icons-material/Check';

const detailedServices = [
  {
    id: 'general', Icon: LocalHospitalIcon, title: 'General Dentistry', desc: 'Maintaining peak oral health with preventive protocols and regular maintenance.',
    items: ['Dental Cleanings & Polishing', 'Oral Cancer Screenings', 'Cavity Diagnosis & Fillings', 'Fluoride Treatments'],
    color: 'border-blue-100 bg-blue-50/30', iconColor: 'text-blue-500'
  },
  {
    id: 'cosmetic', Icon: AutoAwesomeIcon, title: 'Cosmetic Dentistry', desc: 'Designing bespoke, dazzling smiles to uplift aesthetics and rebuild confidence.',
    items: ['Laser Teeth Whitening', 'Porcelain Veneers', 'Composite Bonding', 'Gum Recontouring'],
    color: 'border-amber-100 bg-amber-50/30', iconColor: 'text-amber-500'
  },
  {
    id: 'implants', Icon: HealingIcon, title: 'Dental Implants', desc: 'Permanent, robust structural tooth replacements acting and feeling fully natural.',
    items: ['Single & Multi Implants', 'All-on-4 Arch Rehabilitation', 'Bone Grafting Procedures', 'Implant Supported Overdentures'],
    color: 'border-purple-100 bg-purple-50/30', iconColor: 'text-purple-500'
  },
  {
    id: 'ortho', Icon: SentimentVerySatisfiedIcon, title: 'Orthodontics', desc: 'Correcting bite structural malocclusions and building perfectly aligned smiles.',
    items: ['Invisalign Clear Aligners', 'Ceramic / Invisible Braces', 'Traditional Metal Braces', 'Pediatric Preventative Care'],
    color: 'border-green-100 bg-green-50/30', iconColor: 'text-green-500'
  },
  {
    id: 'endo', Icon: BiotechIcon, title: 'Root Canal Treatment', desc: 'Advanced micro-endodontic methods designed to save infected teeth completely painlessly.',
    items: ['Single Visit RCT', 'Microscopic Endodontics', 'Tooth Abscess Resolution', 'Structural Core Reinforcement'],
    color: 'border-indigo-100 bg-indigo-50/30', iconColor: 'text-indigo-500'
  },
  {
    id: 'emergency', Icon: MedicalServicesIcon, title: 'Emergency Dental Care', desc: 'Urgent protocols for prompt acute pain resolution, dental accidents, and relief.',
    items: ['Same Day Pain Resolution', 'Knocked-out Tooth Salvage', 'Chipped/Broken Restoration', 'Severe Toothache Interventions'],
    color: 'border-red-100 bg-red-50/30', iconColor: 'text-red-500'
  },
];

export default function Services() {
  return (
    <main className="pt-24 overflow-hidden">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-sky-50 via-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
          <span className="section-badge">Services</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            High-Quality <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Dental Care</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            From preventative care to full reconstruction, our multi-speciality clinic delivers optimal therapeutic solutions.
          </p>
        </div>
      </section>

      {/* Services detailed grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedServices.map((s, i) => (
              <div key={s.id} className={`card flex flex-col p-8 border border-dashed rounded-2xl transition-all duration-300 hover:border-primary-200 reveal ${s.color}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={`mb-6 ${s.iconColor}`}>
                  <s.Icon style={{ fontSize: 48 }} />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{s.desc}</p>
                
                <ul className="space-y-2.5 mt-auto border-t border-gray-200/50 pt-6">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700 font-medium">
                      <CheckIcon className="text-sky-500 mt-0.5" style={{ fontSize: 16 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & Insurance Banner */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card bg-gradient-to-br from-primary-600 to-primary-800 p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 text-center md:text-left justify-between reveal">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">We Work with Most Major Insurances</h2>
              <p className="text-primary-100 max-w-xl">Direct claim settlements and easy copays. Contact our billing team to verify eligibility.</p>
            </div>
            <Link to="/booking" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 hover:scale-105 px-8 py-4 font-bold shadow-none whitespace-nowrap">
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
