import { useEffect, useRef } from 'react';
import './Experience.css';

const experiences = [
  {
    title: 'Data Scientist',
    company: 'Integrated Travel',
    location: 'Tempe, Arizona, United States · Remote',
    dates: 'June 2026 — Present',
    bullets: [
      'Researching a community-driven tourism and entertainment discovery platform for Central Alberta, with a focus on local events, attractions, transportation access, and grassroots economic development.',
      'Supporting early-stage research on data sources, geospatial analysis, and AI-assisted workflows to improve tourism visibility for smaller communities.',
    ],
  },
  {
    title: 'Software Development Engineer Intern',
    company: 'Sentari AI',
    location: 'New York, United States',
    dates: 'August 2025 — January 2026',
    bullets: [
      'Architected Python backend microservices and REST APIs powering an AI journaling app’s transcription and emotion-analysis pipeline, reducing inference latency by 21% across 30+ concurrent data streams during 200% month-over-month growth.',
      'Shipped a React and Flask dashboard for monitoring Whisper transcription and journaling insight workflows, improving production visibility and cutting incident response time by 35% with input from engineers and QA.',
      'Engineered end-to-end React Native mobile features for the iOS and Android journaling app, implementing entry creation, AI-generated insight views, and session persistence across app restarts.',
      'Built an offline processing pipeline that eliminated data loss in journaling entries during connectivity failures and implemented OAuth2 authentication, improving verification speed by 27%.',
    ],
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
  },
  {
    title: 'Software Engineer Intern',
    company: 'Vardhan Insys',
    location: 'Ahmedabad, India',
    dates: 'June 2023 — July 2023',
    bullets: [
      'Automated email response workflows using PHP scripting, reducing manual response time by 30% and improving customer query turnaround.',
      'Redesigned and deployed the company website on AWS with SEO optimization strategies using PHP, increasing organic search traffic by 20% and improving site load performance.',
    ],
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
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="experience__inner">
        <div className="section-label reveal">
          <span>03</span>
          <span>Experience</span>
        </div>

        <div className="experience__header reveal reveal--delay-1">
          <h2 className="experience__heading">
            Professional<br />
            <em>work experience.</em>
          </h2>
        </div>

        <div className="experience__list">
          {experiences.map((item, index) => (
            <article key={`${item.company}-${item.title}`} className={`experience__item reveal reveal--delay-${Math.min(index + 1, 4)}`}>
              <div className="experience__topline">
                <div className="experience__title-wrap">
                  <h3 className="experience__role">{item.title}</h3>
                  <div className="experience__company-row">
                    <span className="experience__company">{item.company}</span>
                    <span className="experience__location">{item.location}</span>
                  </div>
                </div>
                <div className="experience__dates">{item.dates}</div>
              </div>

              <ul className="experience__bullets">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="experience__bullet">
                    <span className="experience__bullet-mark" aria-hidden="true">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}