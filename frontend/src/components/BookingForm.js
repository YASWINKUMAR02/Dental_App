import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

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
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 md:p-12 text-center max-w-xl mx-auto shadow-md reveal">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircleIcon style={{ fontSize: 48 }} />
        </div>
        <h3 className="font-display text-2xl font-bold text-emerald-900 mb-3">Appointment Booked!</h3>
        <p className="text-emerald-700 mb-8">{serverMsg}</p>
        <button onClick={() => setStatus('idle')} className="btn-primary bg-emerald-600 hover:bg-emerald-700">
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5 md:p-7 max-w-2xl mx-auto border border-gray-100" noValidate>
      <div className="mb-5 text-center md:text-left">
        <h3 className="font-display text-lg font-bold text-gray-900 mb-1">Schedule an Appointment</h3>
        <p className="text-gray-500 text-xs">Fill in your details and we'll confirm your time slot shortly.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="patientName">Full Name *</label>
          <input
            id="patientName" name="patientName" type="text"
            placeholder="John Doe"
            value={form.patientName} onChange={handleChange}
            className={`input-field ${errors.patientName ? 'border-red-400 focus:ring-red-100' : ''}`}
          />
          {errors.patientName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.patientName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">Email Address *</label>
          <input
            id="email" name="email" type="email"
            placeholder="john@example.com"
            value={form.email} onChange={handleChange}
            className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-100' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="phone">Phone Number *</label>
          <input
            id="phone" name="phone" type="tel"
            placeholder="+1 (234) 567-8900"
            value={form.phone} onChange={handleChange}
            className={`input-field ${errors.phone ? 'border-red-400 focus:ring-red-100' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="appointmentDate">Preferred Date *</label>
          <input
            id="appointmentDate" name="appointmentDate" type="date"
            min={today}
            value={form.appointmentDate} onChange={handleChange}
            className={`input-field ${errors.appointmentDate ? 'border-red-400 focus:ring-red-100' : ''}`}
          />
          {errors.appointmentDate && <p className="text-red-500 text-xs mt-1 font-medium">{errors.appointmentDate}</p>}
        </div>
      </div>

      <div className="mt-3">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="service">Select Service *</label>
        <select
          id="service" name="service"
          value={form.service} onChange={handleChange}
          className={`input-field appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat ${errors.service ? 'border-red-400 focus:ring-red-100' : ''}`}
        >
          <option value="">-- Choose a service --</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.service && <p className="text-red-500 text-xs mt-1 font-medium">{errors.service}</p>}
      </div>

      <div className="mt-3 mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="message">Additional Notes (optional)</label>
        <textarea
          id="message" name="message" rows="2"
          placeholder="Let us know any specific concerns..."
          value={form.message} onChange={handleChange}
          className="input-field resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg text-sm mb-6 font-medium flex items-center gap-2">
          <WarningIcon fontSize="small" /> {serverMsg}
        </div>
      )}

      <button type="submit" className="btn-primary w-full justify-center py-2.5 font-bold text-sm shadow-primary-200 shadow-md hover:shadow-lg" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Confirm Appointment'
        )}
      </button>
    </form>
  );
}
