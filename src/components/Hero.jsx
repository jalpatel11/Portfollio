import { useEffect, useState } from 'react';
import { FaPaperPlane, FaGithub, FaCodeBranch, FaBriefcase } from 'react-icons/fa';
import './Hero.css';

const ROLES = [
  'AI Engineer',
  'Full-Stack Developer',
  'Data Scientist',
  'Systems Thinker',
];

const STATS = [
  { val: '3+', label: 'Years building' },
  { val: '15+', label: 'Projects shipped' },
  { val: '5', label: 'Companies worked' },
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setFading(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const role = ROLES[roleIdx];
  const [firstWord, ...rest] = role.split(' ');

  return (
    <section id="hero" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>
      <div className="hero__grid" aria-hidden="true" />

      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__badge hero__anim hero__anim--d0">
            <span className="hero__badge-dot" />
            Available for full-time opportunities · May 2026
          </div>

          <h1 className="hero__name hero__anim hero__anim--d1">
            Hi, I am <span className="hero__name-highlight">Jal</span>
          </h1>

          <div className="hero__role-wrap hero__anim hero__anim--d2">
            <span className={`hero__role ${fading ? 'hero__role--fade' : ''}`}>
              <span className="hero__role-highlight">{firstWord}</span> {rest.join(' ')}
            </span>
          </div>

          <p className="hero__desc hero__anim hero__anim--d3">
            I build software around data and AI systems — backend services, pipelines,
            dashboards, and evaluation workflows. M.S. Data Science @ ASU. Open-source
            contributor to GRASS GIS.
          </p>

          <div className="hero__ctas hero__anim hero__anim--d4">
            <a href="#contact" className="btn btn-primary" data-hover>
              <FaPaperPlane /> Let's Connect
            </a>
            <a
              href="https://github.com/jalpatel11"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              data-hover
            >
              <FaGithub /> View GitHub
            </a>
          </div>

          <div className="hero__stats hero__anim hero__anim--d4">
            {STATS.map((s) => (
              <div key={s.label} className="hero__stat">
                <div className="hero__stat-val">{s.val}</div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo-frame">
            <div className="hero__photo-ring" aria-hidden="true" />
            <div className="hero__photo-ring-bg" aria-hidden="true" />
            <div className="hero__photo-img">
              {!photoError ? (
                <img src="/jal.jpeg" alt="Jal Patel" onError={() => setPhotoError(true)} />
              ) : (
                <div className="hero__photo-placeholder">JP</div>
              )}
            </div>
          </div>

          <div className="hero__float-card hero__float-card--1">
            <span className="hero__float-icon"><FaCodeBranch aria-hidden="true" /></span>
            <div>
              <div className="hero__float-title">Open Source</div>
              <div className="hero__float-sub">GRASS GIS Contributor</div>
            </div>
          </div>

          <div className="hero__float-card hero__float-card--2">
            <span className="hero__float-icon"><FaBriefcase aria-hidden="true" /></span>
            <div>
              <div className="hero__float-title">Experience</div>
              <div className="hero__float-sub">5 companies worked</div>
            </div>
          </div>
        </div>

        <a href="#about" className="scroll-hint" aria-label="Scroll to About section">
          <span className="scroll-wheel" aria-hidden="true">
            <span className="scroll-dot" />
          </span>
          Scroll
        </a>
      </div>
    </section>
  );
}
