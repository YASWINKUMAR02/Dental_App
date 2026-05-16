import BookingForm from '../components/BookingForm';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Booking() {
  return (
    <main className="pt-24 bg-gradient-to-b from-sky-50/30 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Informative text */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32 animate-fade-up">
            <div>
              <span className="section-badge">Easy Scheduling</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Book Your Visit <span className="text-primary-600">Today</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                Take the first step towards optimal oral health. Our simple booking widget instantly notifies our scheduling experts who will reach out to finalize details within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Instant Coordination', desc: 'Receive prompt scheduling confirmations after booking.', Icon: AccessTimeIcon, color: 'text-blue-500' },
                { title: 'Flexible Rescheduling', desc: 'Modify date or cancel up to 24 hours before slot.', Icon: AutorenewIcon, color: 'text-sky-500' },
                { title: 'Pre-Visit Reminders', desc: 'Automated SMS and Email alerts containing directions.', Icon: SmartphoneIcon, color: 'text-indigo-500' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 bg-white rounded-2xl shadow-card border border-gray-100/60 hover:scale-[1.02] transition-transform">
                  <div className={`flex-shrink-0 ${item.color}`}>
                    <item.Icon style={{ fontSize: 32 }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{item.title}</h4>
                    <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-primary-50 text-primary-800 border border-primary-100 rounded-2xl space-y-3">
              <h4 className="font-bold flex items-center gap-2">
                <MedicalServicesIcon className="text-red-500" fontSize="small" /> Urgent Emergency Care?
              </h4>
              <p className="text-sm leading-relaxed opacity-90">If you're experiencing acute swelling, knocking out a tooth, or immense pain, don't wait. Call our emergency desk instantly.</p>
              <p className="font-display text-xl font-bold text-primary-900 flex items-center gap-2">
                <PhoneIcon fontSize="small" /> +1 (800) BRIGHT-9
              </p>
            </div>
          </div>

          {/* Column 2: Booking form wrapper */}
          <div className="lg:col-span-7 reveal">
            <BookingForm />
          </div>
          
        </div>
      </div>
    </main>
  );
}
