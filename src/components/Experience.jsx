import { useEffect, useRef } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import LogoImage from './LogoImage';
import './Experience.css';

function monogram(name) {
  return name
    .split(' ')
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

const experiences = [
  {
    title: 'Data Scientist',
    company: 'Integrated Travel',
    logo: '/integrated-travel-logo.jpeg',
    location: 'Tempe, Arizona, United States · Remote',
    dates: 'June 2026 — Present',
    bullets: [
      'Researching a community-driven tourism and entertainment discovery platform for Central Alberta, with a focus on local events, attractions, transportation access, and grassroots economic development.',
      'Supporting early-stage research on data sources, geospatial analysis, and AI-assisted workflows to improve tourism visibility for smaller communities.',
    ],
    tags: ['Data Science', 'Geospatial Analysis', 'AI Workflows'],
  },
  {
    title: 'Software Development Engineer Intern',
    company: 'Sentari AI',
    logo: '/sentari-logo.jpeg',
    location: 'New York, United States',
    dates: 'August 2025 — January 2026',
    bullets: [
      'Architected Python backend microservices and REST APIs powering an AI journaling app’s transcription and emotion-analysis pipeline, reducing inference latency by 21% across 30+ concurrent data streams during 200% month-over-month growth.',
      'Shipped a React and Flask dashboard for monitoring Whisper transcription and journaling insight workflows, improving production visibility and cutting incident response time by 35% with input from engineers and QA.',
      'Engineered end-to-end React Native mobile features for the iOS and Android journaling app, implementing entry creation, AI-generated insight views, and session persistence across app restarts.',
      'Built an offline processing pipeline that eliminated data loss in journaling entries during connectivity failures and implemented OAuth2 authentication, improving verification speed by 27%.',
    ],
    tags: ['Python', 'React Native', 'Flask', 'OAuth2'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Plexusnet Services',
    location: 'Ahmedabad, India',
    dates: 'January 2024 — May 2024',
    bullets: [
      'Constructed scalable Python, Django, and PostgreSQL backend services for a documentation platform where field engineers uploaded site images and reports, optimizing SQL indexing and query performance to accelerate response times by 18% across core features.',
      'Streamlined CI/CD pipelines with Docker, Kubernetes, and GitHub Actions, cutting deployment errors by 30% across 5+ services.',
      'Partnered with QA through debugging and unit testing to trace and resolve REST API integration failures between the field-upload and back-office modules, reducing recurring defects by 25%.',
      'Identified inconsistent API specifications across services and proposed structured data schemas, adopted across 5+ services to keep engineer uploads and back-office records in sync.',
    ],
    tags: ['Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Vardhan Insys',
    logo: '/vardhan-insys-logo.jpeg',
    location: 'Ahmedabad, India',
    dates: 'June 2023 — July 2023',
    bullets: [
      'Automated email response workflows using PHP scripting, reducing manual response time by 30% and improving customer query turnaround.',
      'Redesigned and deployed the company website on AWS with SEO optimization strategies using PHP, increasing organic search traffic by 20% and improving site load performance.',
    ],
    tags: ['PHP', 'AWS', 'SEO'],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

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

  return (
    <section id="experience" className="section experience" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">
          <FaBriefcase aria-hidden="true" /> Experience
        </span>
        <h2 className="section-title reveal">Where I have worked</h2>
        <p className="section-desc reveal">
          A journey through companies where I have built, shipped, and made an impact.
        </p>

        <div className="timeline">
          {experiences.map((item, index) => (
            <div key={`${item.company}-${item.title}`} className={`tl-item reveal reveal--delay-${Math.min(index + 1, 4)}`}>
              <div className="tl-card card">
                <div className="tc-head">
                  <LogoImage
                    src={item.logo}
                    alt={item.company}
                    monogram={monogram(item.company)}
                    className={`tc-logo ${item.logo ? 'tc-logo--img' : ''}`}
                  />
                  <div>
                    <div className="tc-co">{item.company}</div>
                    <div className="tc-role">{item.title}</div>
                  </div>
                </div>
                <p className="tc-desc">{item.bullets[0]}</p>
                {item.bullets.slice(1).map((bullet) => (
                  <p key={bullet} className="tc-desc">{bullet}</p>
                ))}
                <div className="tc-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="tl-node">
                <LogoImage
                  src={item.logo}
                  alt={item.company}
                  monogram={monogram(item.company)}
                  className={`tl-dot ${item.logo ? 'tl-dot--img' : ''}`}
                />
                <div className="tl-date">{item.dates}</div>
              </div>
              <div className="tl-gap" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
