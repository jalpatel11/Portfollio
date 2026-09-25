import { useEffect, useRef } from 'react';
import { FaQuoteLeft, FaLinkedin } from 'react-icons/fa';
import './Recommendation.css';

const LINKEDIN_RECS_URL = 'https://www.linkedin.com/in/jal-patel-swe/details/recommendations/?detailScreenTabIndex=0';

const recommendations = [
  {
    name: 'Prateek Sharma',
    title: 'Sr. Java Full Stack Developer · 9+ yrs in Software Development',
    relation: 'Managed Jal directly at Sentari AI',
    date: 'Jan 9, 2026',
    quote:
      "I worked closely with Jal Patel during his time as a Software Development Engineer Intern at Sentari AI. Jal made strong contributions to our iOS application using React Native, integrating backend services, authentication workflows, and AI-driven features with care and attention to detail. One of Jal's standout contributions was building an offline recording pipeline that improved data reliability in real-world usage. He was proactive, receptive to feedback, and consistently followed best engineering practices while collaborating effectively with the team.",
  },
  {
    name: 'Victor Bian',
    title: 'Founder, Semper Signum',
    relation: 'Managed Jal directly at Sentari AI',
    date: 'Jan 7, 2026',
    quote:
      'Jal worked as a software engineer intern for Sentari. He was able to complete both of the works assigned to him. During his time with us, he worked on our iOS app and our web app, where he was helping us implement features for our journaling functionalities.',
  },
];

export default function Recommendation() {
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
    <section id="recommendation" className="section recommendation" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">
          <FaQuoteLeft aria-hidden="true" /> Recommendation
        </span>
        <h2 className="section-title reveal">What people say</h2>
        <p className="section-desc reveal">Real LinkedIn recommendations from managers I've worked with.</p>

        <div className="rec-grid">
          {recommendations.map((r, i) => (
            <div key={r.name} className={`card rec-card reveal reveal--delay-${i + 1}`}>
              <FaQuoteLeft className="rec-card__icon" aria-hidden="true" />
              <p className="rec-card__quote">{r.quote}</p>
              <div className="rec-card__footer">
                <div className="rec-card__name">{r.name}</div>
                <div className="rec-card__title">{r.title}</div>
                <div className="rec-card__relation">{r.relation} · {r.date}</div>
              </div>
              <a href={LINKEDIN_RECS_URL} target="_blank" rel="noopener noreferrer" className="rec-card__link" data-hover>
                <FaLinkedin aria-hidden="true" /> View on LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
