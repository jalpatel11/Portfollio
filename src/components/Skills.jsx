import { useEffect, useRef } from 'react';
import './Skills.css';

const categories = [
  {
    label: 'Programming',
    items: [
      { name: 'Python', level: 95 },
      { name: 'SQL', level: 92 },
      { name: 'JavaScript / TypeScript', level: 90 },
      { name: 'Java', level: 84 },
      { name: 'Go', level: 74 },
      { name: 'PHP / C++', level: 78 },
    ],
  },
  {
    label: 'Data & Analytics',
    items: [
      { name: 'Pandas', level: 94 },
      { name: 'Excel', level: 88 },
      { name: 'Statistical Modeling', level: 87 },
      { name: 'Predictive Modeling', level: 85 },
      { name: 'Data Visualization', level: 86 },
      { name: 'Data Mining', level: 80 },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'FastAPI', level: 92 },
      { name: 'Flask', level: 88 },
      { name: 'Django', level: 84 },
      { name: 'Node.js', level: 82 },
      { name: 'PostgreSQL / MongoDB', level: 84 },
      { name: 'OAuth2 / Next.js', level: 80 },
    ],
  },
  {
    label: 'Systems',
    items: [
      { name: 'AWS', level: 86 },
      { name: 'Databricks', level: 80 },
      { name: 'Docker', level: 84 },
      { name: 'Kubernetes', level: 78 },
      { name: 'Kafka', level: 80 },
      { name: 'Spark Streaming', level: 79 },
    ],
  },
  {
    label: 'AI / ML',
    items: [
      { name: 'LangGraph', level: 86 },
      { name: 'PyTorch', level: 88 },
      { name: 'XGBoost', level: 82 },
      { name: 'RAG', level: 80 },
      { name: 'OpenAI', level: 84 },
      { name: 'MLflow / LangSmith / Ollama / MCP', level: 76 },
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
            Technical<br />
            <span>skills.</span>
          </h2>
          <p className="skills__subtext">
            A resume-style snapshot of the tools and systems I use across data, backend, and AI work.
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
          {['Python', 'SQL', 'Pandas', 'FastAPI', 'Django', 'Docker', 'Kubernetes', 'Kafka', 'LangGraph', 'AWS'].map((tech) => (
            <span key={tech} className="skills__logo-tag">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
