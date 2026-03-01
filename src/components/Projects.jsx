import { useEffect, useRef, useState } from 'react';
import './Projects.css';

const projects = [
  {
    num: '001',
    title: 'FluxDB',
    category: 'Systems / Open Source',
    year: '2024',
    desc: 'A lightweight, append-only key-value store written in Go with a log-structured merge tree. Handles 200k+ ops/sec with tunable consistency guarantees. Includes a custom WAL and bloom filter implementation.',
    tags: ['Go', 'Systems', 'LSM Tree', 'Open Source'],
    accent: '#D94F1E',
    link: '#',
  },
  {
    num: '002',
    title: 'Relay',
    category: 'Full-Stack / SaaS',
    year: '2024',
    desc: 'A real-time collaboration layer for design tools. WebSocket-based CRDT engine with operational transforms. Sub-10ms latency across 3 continents. React + Node + Redis pub/sub.',
    tags: ['React', 'Node', 'WebSocket', 'CRDT'],
    accent: '#1C1C1C',
    link: '#',
  },
  {
    num: '003',
    title: 'Codeframe',
    category: 'Developer Tools',
    year: '2023',
    desc: 'A browser-based code execution environment with a custom sandboxed runtime. Handles untrusted code execution with V8 isolates and a capability-based permission model.',
    tags: ['Node', 'V8', 'Security', 'Sandboxing'],
    accent: '#5A5248',
    link: '#',
  },
  {
    num: '004',
    title: 'Lens',
    category: 'Frontend / Performance',
    year: '2023',
    desc: 'A performance profiling dashboard for React apps. Instruments render cycles, fiber reconciliation time, and memory deltas. Zero-config, drop-in script with a Grafana-style UI.',
    tags: ['React', 'Performance', 'Profiling', 'D3'],
    accent: '#D94F1E',
    link: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects__inner">
        <div className="section-label reveal">
          <span>03</span>
          <span>Work</span>
        </div>

        <h2 className="projects__heading reveal reveal--delay-1">
          Selected<br />
          <em>Projects.</em>
        </h2>

        <div className="projects__list">
          {projects.map((p, i) => (
            <div
              key={p.num}
              className={`project-item reveal reveal--delay-${Math.min(i + 1, 4)} ${activeIdx === i ? 'project-item--active' : ''}`}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              data-hover
            >
              <div className="project-item__left">
                <span className="project-item__num">{p.num}</span>
                <div className="project-item__title-wrap">
                  <h3 className="project-item__title">{p.title}</h3>
                  <span className="project-item__cat">{p.category} — {p.year}</span>
                </div>
              </div>

              <div className="project-item__right">
                <p className="project-item__desc">{p.desc}</p>
                <div className="project-item__tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="project-item__tag">{tag}</span>
                  ))}
                </div>
              </div>

              <a href={p.link} className="project-item__cta" data-hover>
                View →
              </a>

              {/* Hover accent bar */}
              <div
                className="project-item__accent"
                style={{ background: p.accent }}
              />
            </div>
          ))}
        </div>

        <div className="projects__footer reveal reveal--delay-4">
          <a href="#contact" className="projects__more" data-hover>
            Got a project in mind? Let's talk →
          </a>
        </div>
      </div>
    </section>
  );
}
