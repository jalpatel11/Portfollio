import { useEffect, useRef } from 'react';
import { FaLayerGroup } from 'react-icons/fa';
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
    <section id="skills" className="section skills" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">
          <FaLayerGroup aria-hidden="true" /> Skills
        </span>
        <h2 className="section-title reveal">My tech stack &amp; expertise</h2>
        <p className="section-desc reveal">
          Tools and technologies I use to build robust, scalable, and intelligent systems.
        </p>

        <div className="skills__grid">
          {categories.map((cat, ci) => (
            <div key={cat.label} className={`card skills__category reveal reveal--delay-${ci + 1}`}>
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

        <div className="skills__logos reveal reveal--delay-3">
          {['Python', 'SQL', 'Pandas', 'FastAPI', 'Django', 'Docker', 'Kubernetes', 'Kafka', 'LangGraph', 'AWS'].map((tech) => (
            <span key={tech} className="tag-pill">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
