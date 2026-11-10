import { useEffect, useRef, useState } from 'react';
import { FaRocket, FaGithub } from 'react-icons/fa';
import './Projects.css';

const ACCENTS = ['#0ea5e9', '#2563eb', '#f97316', '#06b6d4'];

function githubOgImage(link) {
  const match = link.match(/github\.com\/([^/]+)\/([^/]+)/);
  return match ? `https://opengraph.githubassets.com/1/${match[1]}/${match[2]}` : null;
}

function ProjectThumb({ project }) {
  const [errored, setErrored] = useState(false);
  const isCustom = Boolean(project.thumbnail);
  const src = project.thumbnail || githubOgImage(project.link);

  if (!src || errored) {
    return <FaGithub className="proj-thumb__icon" aria-hidden="true" />;
  }

  return (
    <img
      className={`proj-thumb__img ${isCustom ? 'proj-thumb__img--top' : 'proj-thumb__img--center'}`}
      src={src}
      alt={`${project.title} preview`}
      onError={() => setErrored(true)}
    />
  );
}

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'AI / ML', value: 'ai' },
  { label: 'Web', value: 'web' },
  { label: 'Data', value: 'data' },
  { label: 'Systems', value: 'systems' },
];

const projects = [
  {
    num: '001',
    title: 'IFRPM System',
    category: 'Full-Stack / ML',
    filterCategory: ['ai', 'web'],
    year: '2026',
    desc: 'Intelligent Fleet Risk and Predictive Maintenance System. Features a FastAPI backend with a dynamic multi-model ensemble for Remaining Useful Life (RUL) prediction. Automatically ingests and aggregates predictions across Keras (.h5) and Scikit-Learn (.pkl) models for robust fleet health monitoring.',
    detailedDesc: 'The Intelligent Fleet Risk and Predictive Maintenance System (IFRPM) aggregates telemetry and sensor data to predict Remaining Useful Life (RUL) of fleet vehicles. The backend is powered by FastAPI, serving a dynamic ensemble of Keras (.h5) and Scikit-Learn (.pkl) models. The React frontend presents a dashboard with real-time risk scoring, predictive alerts, and interactive visualizations, enabling proactive maintenance scheduling and reducing downtime.',
    tags: ['Python', 'FastAPI', 'TensorFlow', 'Scikit-Learn', 'Machine Learning'],
    link: 'https://github.com/jalpatel11/IFRPM',
  },
  {
    num: '002',
    title: 'Self-Healing SRE',
    category: 'AI Agents / DevOps',
    filterCategory: ['ai', 'systems'],
    year: '2026',
    desc: 'Autonomous SRE system that detects production failures, performs root cause analysis, generates code fixes, and opens pull requests — without human intervention. Two-agent LangGraph workflow (Investigator + Mechanic) powered by Llama 3.3-70B with AST-based code validation and a self-correcting loop achieving 95% success rate.',
    detailedDesc: 'This autonomous SRE platform leverages a multi-agent LangGraph architecture to monitor Kubernetes clusters and resolve production incidents. An "Investigator" agent performs root-cause analysis on logs and metrics, while a "Mechanic" agent proposes and tests code fixes using AST validation. Once verified, the system can automatically deploy patches or open pull requests for human review, dramatically reducing mean time to recovery (MTTR).',
    tags: ['Python', 'LangGraph', 'Groq', 'GitHub Actions', 'LangSmith'],
    link: 'https://github.com/jalpatel11/Self-Healing-SRE-Agent',
  },
  {
    num: '003',
    title: 'Calmindra',
    category: 'Full-Stack / AI',
    thumbnail: '/calmindra-screenshot.png',
    filterCategory: ['ai', 'web'],
    year: '2025',
    desc: 'Full-stack mental health chatbot built with Next.js and FastAPI, backed by a Neo4j database and JWT-authenticated REST APIs. Containerized with Docker and deployed on GCP, running a LoRA fine-tuned Ollama model that reaches 91% accuracy at sub-500ms latency.',
    detailedDesc: 'Calmindra is a full-stack mental health companion with a Next.js frontend and a FastAPI backend exposing JWT-authenticated REST APIs, backed by a Neo4j graph database. The service is containerized with a Dockerfile and deployed on GCP cloud infrastructure for scalable, always-on inference in a customer-facing environment. The underlying Ollama model was fine-tuned using LoRA and evaluated against a curated benchmark, reaching 91% accuracy at sub-500ms latency.',
    tags: ['Next.js', 'FastAPI', 'Neo4j', 'Ollama', 'LoRA', 'GCP'],
    link: 'https://github.com/jalpatel11/calmindra',
    demoLink: 'https://calmindra.jalpatel.dev/',
  },
  {
    num: '004',
    title: 'Phoenix LandCover',
    category: 'ML / Computer Vision',
    filterCategory: ['ai', 'data'],
    year: '2025',
    desc: 'Deep learning pipeline for pixel-wise land use classification over Central Phoenix using Sentinel-2 satellite imagery. Custom U-Net in TensorFlow/Keras across 9 land cover classes — achieving 95.95% pixel accuracy, 95.50% weighted F1, and 92.79% mean IoU. Patch-based training with full-image reconstruction.',
    detailedDesc: 'A deep learning computer vision pipeline designed for pixel-wise land use classification. Utilizing Sentinel-2 satellite imagery from Google Earth Engine, a custom U-Net model was trained in TensorFlow/Keras to segment Central Phoenix into 9 distinct land cover classes. The system includes patch-based training optimizations and full-image inference reconstruction.',
    tags: ['Python', 'TensorFlow', 'U-Net', 'Google Earth Engine', 'Sentinel-2'],
    link: 'https://github.com/jalpatel11/phoenix-landcover-segmentation',
  },
  {
    num: '005',
    title: 'Book Recommender',
    category: 'Data Science / ML',
    filterCategory: ['ai', 'data'],
    year: '2025',
    desc: 'User-based collaborative filtering recommender system using the Book Crossing dataset. Identifies similar users based on rating patterns to generate personalized book title suggestions.',
    detailedDesc: 'A collaborative filtering machine learning system trained on the Book Crossing dataset to provide personalized reading recommendations. The engine computes cosine similarity across user rating vectors to identify behavioral clusters. It cleans sparse data and applies nearest-neighbor search to surface relevant book titles tailored to individual reading preferences.',
    tags: ['Python', 'Data Analysis', 'Cosine Similarity', 'Recommender System'],
    link: 'https://github.com/jalpatel11/book-recommender-system',
  },
  {
    num: '006',
    title: 'SafeBite Blockchain',
    category: 'Web3 / Blockchain',
    filterCategory: ['web'],
    year: '2025',
    desc: 'Blockchain-based food traceability system designed to track the journey of food products from farm to table. Ensures data integrity and transparency using decentralized ledger technology.',
    detailedDesc: 'SafeBite is a decentralized supply chain application designed to enhance food traceability. Utilizing Web3 technologies and smart contracts, the system records each step of a food product\'s journey on an immutable blockchain ledger. This transparent approach ensures data integrity, prevents counterfeiting, and allows end-consumers to verify the origin and safety of their food.',
    tags: ['JavaScript', 'Blockchain', 'Smart Contracts', 'Web3'],
    link: 'https://github.com/jalpatel11/SafeBite-Blockchain-Food-Traceability',
  },
  {
    num: '007',
    title: 'Student Performance',
    category: 'Desktop App',
    filterCategory: ['systems', 'data'],
    year: '2023',
    desc: 'A comprehensive performance review system built with a Tkinter graphical user interface for user interaction. Leverages an SQLite database for efficient student data storage and retrieval.',
    detailedDesc: 'A desktop analytics application built for educational institutions to monitor and analyze student metrics. Developed in Python, it features a Tkinter-based graphical user interface that allows administrators to interact with data seamlessly. An integrated SQLite database handles efficient data storage and retrieval, while Pandas powers the underlying correlation analysis and predictive modeling.',
    tags: ['Python', 'Tkinter', 'SQLite', 'GUI'],
    link: 'https://github.com/jalpatel11/Student_performance_review_system',
  },
  {
    num: '008',
    title: 'GUI Scheduling Algorithms',
    category: 'Web App',
    thumbnail: '/gui-scheduling-screenshot.png',
    filterCategory: ['web', 'systems'],
    year: '2024',
    desc: 'A web-based application demonstrating various CPU scheduling algorithms, complete with interactive visuals for performance evaluation and comparison.',
    detailedDesc: 'An educational web utility built with Streamlit designed to simulate and visualize various CPU scheduling algorithms, including FCFS, SJF, and Round Robin. Written in Python, the interactive GUI allows users to input custom process parameters, run simulations, and visually compare performance metrics like turnaround time and waiting time through dynamic Gantt charts.',
    tags: ['Python', 'Streamlit', 'Algorithms', 'Operating Systems'],
    link: 'https://github.com/jalpatel11/GUI_Scheduling_algorithms',
    demoLink: 'https://jalpatel11-gui-scheduling-algorithms-app-yfyzch.streamlit.app',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleProjects = projects
    .map((p, i) => ({ ...p, i }))
    .filter((p) => activeFilter === 'all' || p.filterCategory.includes(activeFilter));

  const toggleExpand = (idx, e) => {
    e.preventDefault();
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

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
    <section id="projects" className="section projects" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">
          <FaRocket aria-hidden="true" /> Work
        </span>
        <h2 className="section-title reveal">Things I have built</h2>
        <p className="section-desc reveal">
          Projects spanning AI, machine learning, web development, and data engineering.
        </p>

        <div className="proj-filter reveal" role="group" aria-label="Filter projects by category">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`fbtn ${activeFilter === f.value ? 'fbtn--active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="proj-grid">
          {visibleProjects.map((p) => (
            <div
              key={p.num}
              className="card proj-card proj-card--enter"
              style={{ '--proj-accent': ACCENTS[p.i % ACCENTS.length] }}
              data-hover
            >
              <div className="proj-thumb">
                <ProjectThumb project={p} />
                <div className="proj-overlay">
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="ov-link" data-hover onClick={(e) => e.stopPropagation()}>
                    <FaGithub aria-hidden="true" /> GitHub
                  </a>
                </div>
              </div>

              <div className="proj-card__body">
                <div className="proj-card__top">
                  <span className="proj-card__num">{p.num}</span>
                  <span className="proj-card__year">{p.year}</span>
                </div>

                <h3 className="proj-card__title">{p.title}</h3>
                <span className="proj-card__cat">{p.category}</span>

                <p className="proj-card__desc">{p.desc}</p>

                {p.detailedDesc && (
                  <div className="proj-card__more-wrap">
                    <button className="proj-card__read-more" onClick={(e) => toggleExpand(p.i, e)}>
                      {expandedIdx === p.i ? 'Read less' : 'Read more'}
                    </button>
                    {expandedIdx === p.i && (
                      <p className="proj-card__detailed-desc">{p.detailedDesc}</p>
                    )}
                  </div>
                )}

                <div className="proj-card__tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>

                <div className="proj-card__links">
                  {p.demoLink && (
                    <a href={p.demoLink} target="_blank" rel="noopener noreferrer" className="proj-card__link" data-hover>
                      Live demo →
                    </a>
                  )}
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-card__link" data-hover>
                    GitHub →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects__footer reveal reveal--delay-4">
          <a href="https://github.com/jalpatel11" target="_blank" rel="noopener noreferrer" className="btn btn-outline" data-hover>
            View all projects on GitHub →
          </a>
          <a href="#contact" className="btn btn-outline" data-hover>
            Got a project in mind? Let's talk →
          </a>
        </div>
      </div>
    </section>
  );
}
