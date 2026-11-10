import { useState, useEffect } from 'react';
import { FaGithub, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/useTheme';
import './Nav.css';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Education', href: '#education' },
  { label: 'Recommendation', href: '#recommendation' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
        >
          <span className="nav-logo-mark">JP</span>
          Jal Patel
        </a>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.label}>
              <button onClick={() => handleNavClick(l.href)}>{l.label}</button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <a
            href="https://github.com/jalpatel11"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            <FaGithub /> GitHub
          </a>
          <button
            className="hamburger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <nav className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`} aria-label="Mobile navigation">
        {links.map((l) => (
          <button key={l.label} onClick={() => handleNavClick(l.href)}>
            {l.label}
          </button>
        ))}
        <a href="https://github.com/jalpatel11" target="_blank" rel="noopener noreferrer" className="mobile-nav__cta">
          <FaGithub /> GitHub
        </a>
      </nav>
    </>
  );
}
