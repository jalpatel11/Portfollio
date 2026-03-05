import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const ROLES = [
  'ML Engineer',
  'Full-Stack Developer',
  'Data Scientist',
  'Systems Thinker',
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const [time, setTime] = useState('');
  const tickerRef = useRef(null);

  // Cycle roles with glitch
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setGlitching(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-US', { hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="hero">
      {/* Big background text */}
      <div className="hero__bg-text" aria-hidden="true">
        JAL<br />PATEL
      </div>

      <div className="hero__content">
        <div className="hero__meta">
          <span className="hero__meta-label">Based in USA</span>
          <span className="hero__meta-dot" />
          <span className="hero__meta-label">{time}</span>
        </div>

        <h1 className="hero__name">
          <span className="hero__name-first">Jal</span>
          <span className="hero__name-last">Patel</span>
        </h1>

        <div className="hero__role-wrap">
          <span className="hero__role-bar" aria-hidden="true" />
          <p className={`hero__role ${glitching ? 'hero__role--glitch' : ''}`}>
            {ROLES[roleIdx]}
          </p>
        </div>

        <p className="hero__tagline">
          I build things that are fast, honest,<br />
          and alive at the edges.
        </p>

        <div className="hero__ctas">
          <a href="#projects" className="hero__cta hero__cta--primary" data-hover>
            See my work
          </a>
          <a href="#contact" className="hero__cta hero__cta--ghost" data-hover>
            Say hello →
          </a>
        </div>
      </div>

      {/* Diagonal accent line */}
      <div className="hero__rule" aria-hidden="true" />

      {/* Marquee ticker */}
      <div className="hero__ticker" aria-hidden="true">
        <div className="hero__ticker-track" ref={tickerRef}>
          {[...Array(3)].map((_, i) => (
            <span key={i} className="hero__ticker-item">
              Python &nbsp;·&nbsp; PyTorch &nbsp;·&nbsp; TensorFlow &nbsp;·&nbsp; React &nbsp;·&nbsp; FastAPI &nbsp;·&nbsp; TypeScript &nbsp;·&nbsp; PostgreSQL &nbsp;·&nbsp; Docker &nbsp;·&nbsp; AWS &nbsp;·&nbsp; LangGraph &nbsp;·&nbsp; HuggingFace &nbsp;·&nbsp; scikit-learn &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
