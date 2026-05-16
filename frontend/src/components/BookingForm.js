import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import EventIcon from '@mui/icons-material/Event';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DescriptionIcon from '@mui/icons-material/Description';

const SERVICES = [
  'General Checkup & Cleaning',
  'Teeth Whitening',
  'Dental Implants',
  'Orthodontics / Braces',
  'Cosmetic Dentistry',
  'Emergency Care',
  'Root Canal Treatment',
  'Tooth Extraction',
];

const initialForm = {
  patientName: '', email: '', phone: '',
  appointmentDate: '', service: '', message: '',
};

export default function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState('');

  const validate = () => {
    const e = {};
    if (!form.patientName.trim()) e.patientName = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim() || !/^[0-9+\-\s()]{7,15}$/.test(form.phone)) e.phone = 'Valid phone number is required';
    if (!form.appointmentDate) e.appointmentDate = 'Please select a date';
    else if (new Date(form.appointmentDate) < new Date()) e.appointmentDate = 'Date must be in the future';
    if (!form.service) e.service = 'Please select a service';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');
    try {
      const res = await fetch('http://localhost:8080/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setServerMsg(data.message);
        setForm(initialForm);
      } else {
        setStatus('error');
        setServerMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setServerMsg('Unable to connect to the server. Please try again later.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (status === 'success') {
    return (
      <div className="bg-white border border-gray-100 rounded-none p-10 md:p-16 text-center max-w-xl mx-auto shadow-2xl reveal">
        <div className="w-24 h-24 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircleIcon style={{ fontSize: 64 }} />
        </div>
        <h3 className="font-display text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Request Received</h3>
        <p className="text-gray-500 mb-10 leading-relaxed">{serverMsg}</p>
        <button onClick={() => setStatus('idle')} className="btn-primary w-full justify-center py-4 text-sm tracking-widest uppercase font-black">
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white px-5 py-6 md:p-10 max-w-2xl mx-auto border-t-4 border-sky-400 shadow-2xl" noValidate>
      <div className="mb-6 text-center md:text-left">
        <h3 className="font-display text-xl md:text-2xl font-black text-gray-900 mb-1.5 uppercase tracking-tight">Schedule an Appointment</h3>
        <p className="text-gray-500 text-[10px] md:text-xs font-medium leading-relaxed">Please provide your details below and our clinical coordinator will contact you to finalize the schedule.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-5">
        <div>
          <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest" htmlFor="patientName">
            <PersonIcon style={{ fontSize: 13 }} className="text-sky-400" /> Full Name *
          </label>
          <input
            id="patientName" name="patientName" type="text"
            placeholder="John Doe"
            value={form.patientName} onChange={handleChange}
            className={`input-field border-gray-200 !bg-white !rounded-none !py-2.5 text-xs md:text-sm ${errors.patientName ? 'border-red-400 focus:ring-red-50' : ''}`}
          />
          {errors.patientName && <p className="text-red-500 text-[9px] mt-0.5 font-bold uppercase tracking-tighter">{errors.patientName}</p>}
        </div>
        <div>
          <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest" htmlFor="email">
            <EmailIcon style={{ fontSize: 13 }} className="text-sky-400" /> Email Address *
          </label>
          <input
            id="email" name="email" type="email"
            placeholder="mail@example.com"
            value={form.email} onChange={handleChange}
            className={`input-field border-gray-200 !bg-white !rounded-none !py-2.5 text-xs md:text-sm ${errors.email ? 'border-red-400 focus:ring-red-50' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-[9px] mt-0.5 font-bold uppercase tracking-tighter">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-5 mt-3 md:mt-5">
        <div>
          <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest" htmlFor="phone">
            <PhoneIcon style={{ fontSize: 13 }} className="text-sky-400" /> Phone Number *
          </label>
          <input
            id="phone" name="phone" type="tel"
            placeholder="(000) 000-0000"
            value={form.phone} onChange={handleChange}
            className={`input-field border-gray-200 !bg-white !rounded-none !py-2.5 text-xs md:text-sm ${errors.phone ? 'border-red-400 focus:ring-red-50' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-[9px] mt-0.5 font-bold uppercase tracking-tighter">{errors.phone}</p>}
        </div>
        <div>
          <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest" htmlFor="appointmentDate">
            <EventIcon style={{ fontSize: 13 }} className="text-sky-400" /> Preferred Date *
          </label>
          <input
            id="appointmentDate" name="appointmentDate"
            type={form.appointmentDate ? 'date' : 'text'}
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => !form.appointmentDate && (e.target.type = 'text')}
            placeholder="Select Date"
            min={today}
            value={form.appointmentDate} onChange={handleChange}
            className={`input-field border-gray-200 !bg-white !rounded-none !py-2.5 text-xs md:text-sm ${errors.appointmentDate ? 'border-red-400 focus:ring-red-50' : ''}`}
          />
          {errors.appointmentDate && <p className="text-red-500 text-[9px] mt-0.5 font-bold uppercase tracking-tighter">{errors.appointmentDate}</p>}
        </div>
      </div>

      <div className="mt-3 md:mt-5">
        <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest" htmlFor="service">
          <MedicalServicesIcon style={{ fontSize: 13 }} className="text-sky-400" /> Select Service *
        </label>
        <select
          id="service" name="service"
          value={form.service} onChange={handleChange}
          className={`input-field border-gray-200 !bg-white !rounded-none !py-2.5 text-xs md:text-sm appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat ${errors.service ? 'border-red-400 focus:ring-red-50' : ''}`}
        >
          <option value="">-- Choose a service --</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.service && <p className="text-red-500 text-[9px] mt-0.5 font-bold uppercase tracking-tighter">{errors.service}</p>}
      </div>

      <div className="mt-3 md:mt-5 mb-4 md:mb-6">
        <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest" htmlFor="message">
          <DescriptionIcon style={{ fontSize: 13 }} className="text-sky-400" /> Additional Notes (optional)
        </label>
        <textarea
          id="message" name="message" rows="2"
          placeholder="Concerns or medical history..."
          value={form.message} onChange={handleChange}
          className="input-field border-gray-200 !bg-white !rounded-none resize-none !py-2.5"
        />
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg text-sm mb-6 font-medium flex items-center gap-2">
          <WarningIcon fontSize="small" /> {serverMsg}
        </div>
      )}

      <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 md:py-4 font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-xl hover:-translate-y-1 active:scale-95 disabled:bg-gray-400 disabled:pointer-events-none" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Validating...
          </span>
        ) : (
          'Confirm Appointment'
        )}
      </button>
    </form>
  );
}
