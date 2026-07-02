import { useState, useEffect } from 'react';
import './Nav.css';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Side rail */}
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <a href="#hero" className="nav__logo" onClick={() => handleNavClick('#hero')}>
          <span className="nav__logo-text">JP</span>
        </a>

        <div className="nav__side-links">
          {links.map((l) => (
            <button
              key={l.label}
              className="nav__side-link"
              onClick={() => handleNavClick(l.href)}
            >
              <span>{l.label}</span>
            </button>
          ))}
        </div>

        <button
          className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Full-screen overlay menu (mobile) */}
      <div className={`nav__overlay ${open ? 'nav__overlay--open' : ''}`}>
        <div className="nav__overlay-inner">
          {links.map((l, i) => (
            <button
              key={l.label}
              className="nav__overlay-link"
              style={{ '--i': i }}
              onClick={() => handleNavClick(l.href)}
            >
              <span className="nav__overlay-num">0{i + 1}</span>
              {l.label}
            </button>
          ))}
        </div>
        <div className="nav__overlay-footer">
          <span>Based in — USA</span>
          <span>Available for work</span>
        </div>
      </div>
    </>
  );
}
