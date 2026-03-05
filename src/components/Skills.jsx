import { useEffect, useRef } from 'react';
import './Skills.css';

const categories = [
  {
    label: 'ML / AI',
    items: [
      { name: 'Python', level: 95 },
      { name: 'PyTorch / TensorFlow', level: 85 },
      { name: 'scikit-learn / HuggingFace', level: 82 },
      { name: 'LangChain / LangGraph', level: 78 },
    ],
  },
  {
    label: 'Full-Stack',
    items: [
      { name: 'React / Next.js', level: 90 },
      { name: 'FastAPI / Node.js', level: 85 },
      { name: 'TypeScript', level: 88 },
      { name: 'PostgreSQL / MongoDB', level: 82 },
    ],
  },
  {
    label: 'Infrastructure',
    items: [
      { name: 'Docker', level: 82 },
      { name: 'AWS', level: 72 },
      { name: 'GitHub Actions / CI/CD', level: 80 },
      { name: 'Data Pipelines / ETL', level: 78 },
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
          {['Python', 'PyTorch', 'TensorFlow', 'React', 'FastAPI', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'].map((tech) => (
            <span key={tech} className="skills__logo-tag">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
