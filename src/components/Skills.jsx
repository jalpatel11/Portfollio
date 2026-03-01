import { useEffect, useRef } from 'react';
import './Skills.css';

const categories = [
  {
    label: 'Frontend',
    items: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'CSS / Animation', level: 88 },
      { name: 'WebGL / Canvas', level: 65 },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'Go', level: 75 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'Redis', level: 80 },
    ],
  },
  {
    label: 'Infrastructure',
    items: [
      { name: 'Docker / K8s', level: 78 },
      { name: 'AWS / GCP', level: 72 },
      { name: 'CI/CD Pipelines', level: 82 },
      { name: 'Observability', level: 70 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
            // Animate bars
            barsRef.current.forEach((bar) => {
              if (bar) {
                const level = bar.dataset.level;
                setTimeout(() => {
                  bar.style.width = `${level}%`;
                }, 400);
              }
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  let barIndex = 0;

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="skills__inner">
        <div className="section-label reveal">
          <span>02</span>
          <span>Skills</span>
        </div>

        <div className="skills__header reveal reveal--delay-1">
          <h2 className="skills__heading">
            Tools I<br />
            <span>reach for.</span>
          </h2>
          <p className="skills__subtext">
            Not a skill collector — I go deep on what I use and I'm honest about what I'm still learning.
          </p>
        </div>

        <div className="skills__grid">
          {categories.map((cat, ci) => (
            <div key={cat.label} className={`skills__category reveal reveal--delay-${ci + 1}`}>
              <div className="skills__cat-label">{cat.label}</div>
              <div className="skills__items">
                {cat.items.map((item) => {
                  const idx = barIndex++;
                  return (
                    <div key={item.name} className="skills__item">
                      <div className="skills__item-top">
                        <span className="skills__item-name">{item.name}</span>
                        <span className="skills__item-pct">{item.level}%</span>
                      </div>
                      <div className="skills__bar-track">
                        <div
                          className="skills__bar-fill"
                          data-level={item.level}
                          ref={(el) => (barsRef.current[idx] = el)}
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Tech logos row */}
        <div className="skills__logos reveal reveal--delay-3">
          {['React', 'Node', 'TypeScript', 'Go', 'Postgres', 'Redis', 'Docker', 'AWS'].map((tech) => (
            <span key={tech} className="skills__logo-tag">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
