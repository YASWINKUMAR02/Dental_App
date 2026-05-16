import Doctors from '../components/Doctors';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BiotechIcon from '@mui/icons-material/Biotech';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const values = [
  { Icon: WorkspacePremiumIcon, title: 'Uncompromising Excellence', desc: 'We adhere to the absolute highest standards in dental practices, continuous staff training, and sterilized instrumentation.', color: 'text-amber-500' },
  { Icon: FavoriteIcon, title: 'Compassionate Treatment', desc: 'Our gentle dentists understand dental anxiety. We offer a warm and supportive environment customized for each and every patient.', color: 'text-red-500' },
  { Icon: BiotechIcon, title: 'Cutting-Edge Innovation', desc: 'We constantly invest in top-tier dental lasers, digital scanners, and 3D imaging systems for highly precise treatment.', color: 'text-sky-500' },
  { Icon: AutoAwesomeIcon, title: 'Integrity & Transparency', desc: 'No hidden costs or unnecessary procedures. We explain treatments clearly and help you make informed choices.', color: 'text-purple-500' },
];

export default function About() {
  return (
    <main className="pt-24 overflow-hidden">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-sky-50 via-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
          <span className="section-badge">Our Story</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Dedicated to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Healthy Smile</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Founded in 2009, BrightSmile Dental combines state-of-the-art infrastructure with the human touch to make dental care smooth, pain-free, and high-quality.
          </p>
        </div>
      </section>

      {/* Story and stats */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 reveal">
              <h2 className="font-display text-3xl font-bold text-gray-900 leading-tight">
                Over 15 Years of Dental Excellence
              </h2>
              <p className="text-gray-600 leading-relaxed">
                BrightSmile was born from the vision of delivering a radically better dental experience. We wanted to eliminate the classic dental anxiety by focusing on modern painless techniques, high comfort, and clear client transparency.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Over the decade, we've evolved into a multi-specialty center housing orthodontics, cosmetic experts, and oral surgeons, serving thousands of happy patients. We utilize 100% digital workflows and the highest grades of biocompatible materials.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="text-3xl font-bold text-gray-900">15k+</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">Successful Cases</p>
                </div>
                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="text-3xl font-bold text-gray-900">98%</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">Client Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end reveal">
              <div className="w-full aspect-square max-w-md bg-gradient-to-br from-primary-100 to-sky-50 rounded-3xl p-8 relative overflow-hidden flex items-center justify-center">
                <div className="text-sky-500 animate-float">
                  <LocalHospitalIcon style={{ fontSize: 160 }} />
                </div>
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg">
                  <h4 className="font-bold text-gray-900 mb-1">World-Class Facility</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Equipped with AI diagnostics and advanced laser therapies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="section-badge">Why Choose Us</span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle mx-auto">The philosophy that guides our practice, treatments, and operations daily.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((val, i) => (
              <div key={val.title} className="card p-8 border border-gray-100 reveal flex gap-5" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={`flex-shrink-0 ${val.color}`}>
                  <val.Icon style={{ fontSize: 40 }} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{val.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Doctors />
    </main>
  );
}
