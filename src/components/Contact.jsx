import { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaFileAlt, FaRegCopy, FaCheck } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import './Contact.css';

const links = [
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/jalpatel11' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/jal1102/' },
  { icon: SiLeetcode, label: 'LeetCode', href: 'https://leetcode.com/u/jal_patel/' },
  { icon: FaFileAlt, label: 'Resume', href: 'https://drive.google.com/file/d/1SqFRcR2uMSuvDH0b_0zgAInENHv889Vw/view?usp=sharing' },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('contact@jalpatel.dev');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">
          <FaEnvelope aria-hidden="true" /> Contact
        </span>
        <h2 className="section-title reveal">Let's build something worth shipping</h2>
        <p className="section-desc reveal">
          I'm open to full-time roles, freelance projects, and interesting conversations
          about systems, performance, or anything in between.
        </p>

        <button className="btn btn-primary contact__email-btn reveal reveal--delay-1" onClick={handleCopy} data-hover>
          {copied ? <FaCheck /> : <FaRegCopy />}
          {copied ? 'Copied!' : 'contact@jalpatel.dev'}
        </button>

        <div className="contact__links">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card contact__link reveal reveal--delay-${Math.min(i + 2, 4)}`}
              data-hover
            >
              <l.icon className="contact__link-icon" aria-hidden="true" />
              <span className="contact__link-label">{l.label}</span>
              <span className="contact__link-arrow">→</span>
            </a>
          ))}
        </div>
      </div>

      <div className="contact__footer">
        <span className="contact__footer-name">Jal Patel</span>
        <span className="contact__footer-copy">Designed &amp; built with intent — {new Date().getFullYear()}</span>
        <button className="contact__footer-scroll" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-hover>
          Back to top ↑
        </button>
      </div>
    </section>
  );
}
