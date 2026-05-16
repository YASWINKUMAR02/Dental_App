import React, { useState } from 'react';
import './Booking.css';

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

const Booking = () => {
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

  return (
    <section className="section booking-section" id="booking">
      <div className="container">
        <div className="booking-grid">
          {/* Left info */}
          <div className="booking-info reveal">
            <span className="section-badge">Appointments</span>
            <h2 className="section-title">Book Your Visit Today</h2>
            <p className="section-subtitle" style={{ marginBottom: '40px' }}>
              Ready for a healthier smile? Fill in the form and our team will confirm your appointment within 24 hours.
            </p>

            <div className="booking-features">
              {[
                { icon: '📅', title: 'Flexible Scheduling', desc: 'Morning, afternoon, and evening slots available' },
                { icon: '📞', title: 'Confirmation Call', desc: 'We call to confirm your appointment details' },
                { icon: '💳', title: 'Insurance Accepted', desc: 'We work with most major insurance providers' },
                { icon: '🚗', title: 'Free Parking', desc: 'Ample free parking at our clinic location' },
              ].map((f) => (
                <div className="booking-feature" key={f.title}>
                  <span className="bf-icon">{f.icon}</span>
                  <div>
                    <strong>{f.title}</strong>
                    <small>{f.desc}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-quick">
              <span>📍 123 Dental Lane, HealthCity</span>
              <span>📞 +1 (800) BRIGHT-1</span>
              <span>🕒 Mon–Sat: 8AM – 7PM</span>
            </div>
          </div>

          {/* Form */}
          <div className="booking-form-wrap reveal">
            {status === 'success' ? (
              <div className="success-state">
                <div className="success-icon">🎉</div>
                <h3>Appointment Booked!</h3>
                <p>{serverMsg}</p>
                <button className="btn btn-primary" onClick={() => setStatus('idle')}>
                  Book Another
                </button>
              </div>
            ) : (
              <form className="booking-form card" onSubmit={handleSubmit} noValidate>
                <h3 className="form-title">Schedule an Appointment</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="patientName">Full Name *</label>
                    <input
                      id="patientName" name="patientName" type="text"
                      placeholder="John Doe"
                      value={form.patientName} onChange={handleChange}
                      className={errors.patientName ? 'error' : ''}
                    />
                    {errors.patientName && <span className="error-msg">{errors.patientName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="john@example.com"
                      value={form.email} onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone" name="phone" type="tel"
                      placeholder="+1 234 567 8900"
                      value={form.phone} onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-msg">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="appointmentDate">Preferred Date *</label>
                    <input
                      id="appointmentDate" name="appointmentDate" type="date"
                      min={today}
                      value={form.appointmentDate} onChange={handleChange}
                      className={errors.appointmentDate ? 'error' : ''}
                    />
                    {errors.appointmentDate && <span className="error-msg">{errors.appointmentDate}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Select Service *</label>
                  <select
                    id="service" name="service"
                    value={form.service} onChange={handleChange}
                    className={errors.service ? 'error' : ''}
                  >
                    <option value="">-- Choose a service --</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <span className="error-msg">{errors.service}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Additional Notes (optional)</label>
                  <textarea
                    id="message" name="message" rows="3"
                    placeholder="Any specific concerns or questions..."
                    value={form.message} onChange={handleChange}
                  />
                </div>

                {status === 'error' && (
                  <div className="form-error-banner">{serverMsg}</div>
                )}

                <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <><span className="spinner"></span> Booking...</>
                  ) : (
                    <>📅 Confirm Appointment</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
