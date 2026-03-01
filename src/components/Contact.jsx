import { useEffect, useRef, useState } from 'react';
import './Contact.css';

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
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact__inner">
        <div className="section-label reveal">
          <span>04</span>
          <span>Contact</span>
        </div>

        <div className="contact__grid">
          <div className="contact__left">
            <h2 className="contact__heading reveal reveal--delay-1">
              Let's build<br />
              something<br />
              <em>worth shipping.</em>
            </h2>

            <p className="contact__body reveal reveal--delay-2">
              I'm open to full-time roles, freelance projects, and
              interesting conversations about systems, performance,
              or anything in between.
            </p>

            <div className="contact__links reveal reveal--delay-3">
              <button className="contact__email-btn" onClick={handleCopy} data-hover>
                <span className="contact__email-text">contact@jalpatel.dev</span>
                <span className="contact__email-action">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="contact__right reveal reveal--delay-2">
            <div className="contact__social-stack">
              <a href="https://github.com/jalpatel11" className="contact__social-link" data-hover target="_blank" rel="noreferrer">
                <span className="contact__social-num">01</span>
                <span className="contact__social-name">GitHub</span>
                <span className="contact__social-arrow">→</span>
              </a>
              <a href="https://www.linkedin.com/in/jal1102/" className="contact__social-link" data-hover target="_blank" rel="noreferrer">
                <span className="contact__social-num">02</span>
                <span className="contact__social-name">LinkedIn</span>
                <span className="contact__social-arrow">→</span>
              </a>

              <a href="https://drive.google.com/file/d/17820325457890123456789012345678/view?usp=sharing" className="contact__social-link" data-hover target="_blank" rel="noreferrer">
                <span className="contact__social-num">03</span>
                <span className="contact__social-name">Resume</span>
                <span className="contact__social-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="contact__footer">
        <span className="contact__footer-name">Jal Patel</span>
        <span className="contact__footer-copy">Designed & built with intent — {new Date().getFullYear()}</span>
        <span className="contact__footer-scroll">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-hover>
            Back to top ↑
          </button>
        </span>
      </div>
    </section>
  );
}
