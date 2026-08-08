import { useEffect, useRef } from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import LogoImage from './LogoImage';
import './Education.css';

const education = [
  {
    monogram: 'AS',
    logo: '/asu-logo.png',
    school: 'Arizona State University',
    degree: 'M.S. Data Science, Analytics and Engineering',
    dates: 'Aug 2024 – May 2026',
    activities: 'Data Science Club',
    desc: 'Specializing in machine learning, data processing at scale, and software engineering. Coursework includes Statistical Machine Learning, Big Data Analytics, and Cloud Computing. Active participant in data science hackathons and research meetups, collaborating on projects that bridge AI, cloud, and GIS technologies.',
    tags: ['Machine Learning', 'Big Data', 'Cloud Computing', 'GIS'],
  },
  {
    monogram: 'NU',
    logo: '/nirma-logo.png',
    school: 'Nirma University',
    degree: 'B.Tech, Computer Science and Engineering',
    dates: 'Oct 2020 – Aug 2024',
    desc: 'B.Tech in Computer Science & Engineering, with a foundation in CS fundamentals, data structures, algorithms, and software development.',
    tags: ['CS Fundamentals', 'Data Structures', 'Algorithms', 'Software Development'],
  },
];

export default function Education() {
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
    <section id="education" className="section education" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">
          <FaGraduationCap aria-hidden="true" /> Education
        </span>
        <h2 className="section-title reveal">Academic journey</h2>
        <p className="section-desc reveal">
          Building the foundation to tackle tomorrow's hardest problems.
        </p>

        <div className="timeline">
          {education.map((item, index) => (
            <div key={item.school} className={`tl-item reveal reveal--delay-${Math.min(index + 1, 4)}`}>
              <div className="tl-card card">
                <div className="tc-head">
                  <LogoImage src={item.logo} alt={item.school} monogram={item.monogram} className="tc-logo tc-logo--img" />
                  <div>
                    <div className="tc-co">{item.school}</div>
                    <div className="tc-role">{item.degree}</div>
                  </div>
                </div>
                <p className="tc-desc">
                  {item.desc}
                  {item.activities && (
                    <>
                      <br />
                      <strong>Activities:</strong> {item.activities}
                    </>
                  )}
                </p>
                <div className="tc-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="tl-node">
                <LogoImage src={item.logo} alt={item.school} monogram={item.monogram} className="tl-dot tl-dot--img" />
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
