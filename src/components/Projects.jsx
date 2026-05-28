import { useEffect, useRef, useState } from 'react';
import './Projects.css';

const projects = [
  {
    num: '001',
    title: 'IFRPM System',
    category: 'Full-Stack / ML',
    year: '2026',
    desc: 'Intelligent Fleet Risk and Predictive Maintenance System. Features a FastAPI backend with a dynamic multi-model ensemble for Remaining Useful Life (RUL) prediction. Automatically ingests and aggregates predictions across Keras (.h5) and Scikit-Learn (.pkl) models for robust fleet health monitoring.',
    detailedDesc: 'The Intelligent Fleet Risk and Predictive Maintenance System (IFRPM) aggregates telemetry and sensor data to predict Remaining Useful Life (RUL) of fleet vehicles. The backend is powered by FastAPI, serving a dynamic ensemble of Keras (.h5) and Scikit-Learn (.pkl) models. The React frontend presents a dashboard with real-time risk scoring, predictive alerts, and interactive visualizations, enabling proactive maintenance scheduling and reducing downtime.',
    tags: ['Python', 'FastAPI', 'TensorFlow', 'Scikit-Learn', 'Machine Learning'],
    accent: '#D94F1E',
    link: 'https://github.com/jalpatel11/IFRPM',
  },
  {
    num: '002',
    title: 'Self-Healing SRE',
    category: 'AI Agents / DevOps',
    year: '2026',
    desc: 'Autonomous SRE system that detects production failures, performs root cause analysis, generates code fixes, and opens pull requests — without human intervention. Two-agent LangGraph workflow (Investigator + Mechanic) powered by Llama 3.3-70B with AST-based code validation and a self-correcting loop achieving 95% success rate.',
    detailedDesc: 'This autonomous SRE platform leverages a multi-agent LangGraph architecture to monitor Kubernetes clusters and resolve production incidents. An "Investigator" agent performs root-cause analysis on logs and metrics, while a "Mechanic" agent proposes and tests code fixes using AST validation. Once verified, the system can automatically deploy patches or open pull requests for human review, dramatically reducing mean time to recovery (MTTR).',
    tags: ['Python', 'LangGraph', 'Groq', 'GitHub Actions', 'LangSmith'],
    accent: '#1C1C1C',
    link: 'https://github.com/jalpatel11/Self-Healing-SRE-Agent',
  },
  {
    num: '003',
    title: 'Calmindra',
    category: 'Full-Stack / AI',
    year: '2025',
    desc: 'Dockerized full-stack mental health chatbot with a Next.js/TypeScript frontend, FastAPI backend, and a locally hosted Ollama model for empathetic, context-aware conversations. Fully self-contained — no external API calls, all inference runs on-device.',
    detailedDesc: 'Calmindra is a privacy-first, full-stack mental health companion. The frontend is built in Next.js and TypeScript, communicating with a FastAPI backend that orchestrates conversations via a local Ollama instance. By running all inference locally on-device, Calmindra ensures that sensitive, empathetic conversations remain completely private without relying on external cloud APIs.',
    tags: ['TypeScript', 'Next.js', 'FastAPI', 'Ollama', 'Docker'],
    accent: '#D94F1E',
    link: 'https://github.com/jalpatel11/calmindra',
  },
  {
    num: '004',
    title: 'Phoenix LandCover',
    category: 'ML / Computer Vision',
    year: '2025',
    desc: 'Deep learning pipeline for pixel-wise land use classification over Central Phoenix using Sentinel-2 satellite imagery. Custom U-Net in TensorFlow/Keras across 9 land cover classes — achieving 95.95% pixel accuracy, 95.50% weighted F1, and 92.79% mean IoU. Patch-based training with full-image reconstruction.',
    detailedDesc: 'A deep learning computer vision pipeline designed for pixel-wise land use classification. Utilizing Sentinel-2 satellite imagery from Google Earth Engine, a custom U-Net model was trained in TensorFlow/Keras to segment Central Phoenix into 9 distinct land cover classes. The system includes patch-based training optimizations and full-image inference reconstruction.',
    tags: ['Python', 'TensorFlow', 'U-Net', 'Google Earth Engine', 'Sentinel-2'],
    accent: '#1C1C1C',
    link: 'https://github.com/jalpatel11/phoenix-landcover-segmentation',
  },
  {
    num: '005',
    title: 'Book Recommender',
    category: 'Data Science / ML',
    year: '2025',
    desc: 'User-based collaborative filtering recommender system using the Book Crossing dataset. Identifies similar users based on rating patterns to generate personalized book title suggestions.',
    detailedDesc: 'A collaborative filtering machine learning system trained on the Book Crossing dataset to provide personalized reading recommendations. The engine computes cosine similarity across user rating vectors to identify behavioral clusters. It cleans sparse data and applies nearest-neighbor search to surface relevant book titles tailored to individual reading preferences.',
    tags: ['Python', 'Data Analysis', 'Cosine Similarity', 'Recommender System'],
    accent: '#D94F1E',
    link: 'https://github.com/jalpatel11/book-recommender-system',
  },
  {
    num: '006',
    title: 'SafeBite Blockchain',
    category: 'Web3 / Blockchain',
    year: '2025',
    desc: 'Blockchain-based food traceability system designed to track the journey of food products from farm to table. Ensures data integrity and transparency using decentralized ledger technology.',
    detailedDesc: 'SafeBite is a decentralized supply chain application designed to enhance food traceability. Utilizing Web3 technologies and smart contracts, the system records each step of a food product\'s journey on an immutable blockchain ledger. This transparent approach ensures data integrity, prevents counterfeiting, and allows end-consumers to verify the origin and safety of their food.',
    tags: ['JavaScript', 'Blockchain', 'Smart Contracts', 'Web3'],
    accent: '#1C1C1C',
    link: 'https://github.com/jalpatel11/SafeBite-Blockchain-Food-Traceability',
  },
  {
    num: '007',
    title: 'Student Performance',
    category: 'Desktop App',
    year: '2023',
    desc: 'A comprehensive performance review system built with a Tkinter graphical user interface for user interaction. Leverages an SQLite database for efficient student data storage and retrieval.',
    detailedDesc: 'A desktop analytics application built for educational institutions to monitor and analyze student metrics. Developed in Python, it features a Tkinter-based graphical user interface that allows administrators to interact with data seamlessly. An integrated SQLite database handles efficient data storage and retrieval, while Pandas powers the underlying correlation analysis and predictive modeling.',
    tags: ['Python', 'Tkinter', 'SQLite', 'GUI'],
    accent: '#D94F1E',
    link: 'https://github.com/jalpatel11/Student_performance_review_system',
  },
  {
    num: '008',
    title: 'GUI Scheduling Algorithms',
    category: 'Web App',
    year: '2024',
    desc: 'A web-based application demonstrating various CPU scheduling algorithms, complete with interactive visuals for performance evaluation and comparison.',
    detailedDesc: 'An educational web utility built with Streamlit designed to simulate and visualize various CPU scheduling algorithms, including FCFS, SJF, and Round Robin. Written in Python, the interactive GUI allows users to input custom process parameters, run simulations, and visually compare performance metrics like turnaround time and waiting time through dynamic Gantt charts.',
    tags: ['Python', 'Streamlit', 'Algorithms', 'Operating Systems'],
    accent: '#1C1C1C',
    link: 'https://github.com/jalpatel11/GUI_Scheduling_algorithms',
    demoLink: 'https://jalpatel11-gui-scheduling-algorithms-app-yfyzch.streamlit.app',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [expandedDescIdx, setExpandedDescIdx] = useState(null);

  const toggleExpand = (idx, e) => {
    e.preventDefault();
    setExpandedDescIdx(expandedDescIdx === idx ? null : idx);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            // Reveal non-project-item elements (heading, label)
            e.target.querySelectorAll('.section-label, .projects__heading, .projects__footer')
              .forEach((el) => el.classList.add('visible'));
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
              className={`project-item reveal reveal--delay-${Math.min(i + 1, 4)} ${revealed ? 'visible' : ''} ${activeIdx === i ? 'project-item--active' : ''}`}
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
                {p.detailedDesc && (
                  <div className="project-item__more-wrap" style={{ marginTop: '1.5rem' }}>
                    <button 
                      className="project-item__read-more" 
                      onClick={(e) => toggleExpand(i, e)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '4px',
                        cursor: 'pointer',
                        padding: 0,
                        fontFamily: 'inherit',
                        fontSize: '0.85rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        opacity: 0.8,
                        transition: 'opacity 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = 1}
                      onMouseLeave={(e) => e.target.style.opacity = 0.8}
                    >
                      {expandedDescIdx === i ? 'Read Less' : 'Read More'}
                    </button>
                    {expandedDescIdx === i && (
                      <div className="project-item__detailed-desc" style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: '1.6', color: 'inherit', opacity: 0.85 }}>
                        {p.detailedDesc}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="project-item__links">
                {p.demoLink && (
                  <a href={p.demoLink} target="_blank" rel="noopener noreferrer" className="project-item__cta" data-hover>
                    Live Demo →
                  </a>
                )}
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-item__cta" data-hover>
                  GitHub →
                </a>
              </div>

              {/* Hover accent bar */}
              <div
                className="project-item__accent"
                style={{ background: p.accent }}
              />
            </div>
          ))}
        </div>

        <div className="projects__footer reveal reveal--delay-4" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://github.com/jalpatel11" target="_blank" rel="noopener noreferrer" className="projects__more" data-hover>
            View all projects on GitHub →
          </a>
          <a href="#contact" className="projects__more" data-hover>
            Got a project in mind? Let's talk →
          </a>
        </div>
      </div>
    </section>
  );
}
