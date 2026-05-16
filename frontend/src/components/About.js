import React from 'react';
import './About.css';

const team = [
  { name: 'Dr. Sarah Mitchell', role: 'Chief Dental Officer', emoji: '👩‍⚕️', exp: '18 years' },
  { name: 'Dr. James Patel', role: 'Orthodontist', emoji: '👨‍⚕️', exp: '12 years' },
  { name: 'Dr. Emily Chen', role: 'Cosmetic Specialist', emoji: '👩‍⚕️', exp: '10 years' },
];

const values = [
  { icon: '🏆', title: 'Excellence', desc: 'We uphold the highest standards in dental care and continuously invest in training and technology.' },
  { icon: '❤️', title: 'Compassion', desc: 'Every patient is treated with kindness, respect, and personalized attention from the moment they walk in.' },
  { icon: '🔬', title: 'Innovation', desc: 'We leverage cutting-edge dental technology to deliver more accurate, comfortable, and effective treatments.' },
];

const About = () => (
  <section className="section about-section" id="about">
    <div className="container">
      <div className="about-grid">
        {/* Left col */}
        <div className="about-text reveal">
          <span className="section-badge">About Us</span>
          <h2 className="section-title">A Legacy of Healthy, Beautiful Smiles</h2>
          <p className="about-desc">
            Founded in 2009, BrightSmile Dental has been the trusted dental home for thousands of families.
            Our modern clinic combines a relaxing environment with the latest dental technology to make every
            visit comfortable, efficient, and effective.
          </p>
          <p className="about-desc">
            Our team of board-certified specialists is dedicated to providing personalized care tailored to
            each patient's unique needs — from routine cleanings to full smile makeovers.
          </p>

          <div className="values-grid">
            {values.map((v) => (
              <div className="value-item" key={v.title}>
                <span className="value-icon">{v.icon}</span>
                <div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div className="about-visual reveal">
          <div className="about-main-card card">
            <h3>Meet Our Expert Team</h3>
            <p>World-class specialists dedicated to your oral health</p>
            <div className="team-list">
              {team.map((m) => (
                <div className="team-member" key={m.name}>
                  <div className="member-avatar">{m.emoji}</div>
                  <div className="member-info">
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </div>
                  <div className="member-exp">{m.exp}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-badge-cards">
            <div className="badge-card">
              <span className="bc-icon">🏅</span>
              <div><strong>ADA Certified</strong><small>American Dental Association</small></div>
            </div>
            <div className="badge-card">
              <span className="bc-icon">🌍</span>
              <div><strong>ISO Accredited</strong><small>International Standards</small></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
