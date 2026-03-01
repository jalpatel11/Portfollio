import { useEffect, useRef, useState } from 'react';
import './Projects.css';

const projects = [
  {
    num: '001',
    title: 'Self-Healing SRE',
    category: 'AI Agents / DevOps',
    year: '2026',
    desc: 'Autonomous SRE system that detects production failures, performs root cause analysis, generates code fixes, and opens pull requests — without human intervention. Two-agent LangGraph workflow (Investigator + Mechanic) powered by Llama 3.3-70B with AST-based code validation and a self-correcting loop achieving 95% success rate.',
    tags: ['Python', 'LangGraph', 'Groq', 'GitHub Actions', 'LangSmith'],
    accent: '#D94F1E',
    link: 'https://github.com/jalpatel11/Self-Healing-SRE-Agent',
  },
  {
    num: '002',
    title: 'Calmindra',
    category: 'Full-Stack / AI',
    year: '2025',
    desc: 'Dockerized full-stack mental health chatbot with a Next.js/TypeScript frontend, FastAPI backend, and a locally hosted Ollama model for empathetic, context-aware conversations. Fully self-contained — no external API calls, all inference runs on-device.',
    tags: ['TypeScript', 'Next.js', 'FastAPI', 'Ollama', 'Docker'],
    accent: '#1C1C1C',
    link: 'https://github.com/jalpatel11/calmindra',
  },
  {
    num: '003',
    title: 'SafeBite',
    category: 'Blockchain / Web3',
    year: '2025',
    desc: 'Decentralized food supply chain traceability platform on Ethereum. Producers, distributors, and consumers track products farm-to-table via immutable ledger. Uses blockchain event logs instead of on-chain storage arrays — cutting gas costs by ~95% while maintaining full provenance history.',
    tags: ['Solidity', 'React', 'Hardhat', 'MetaMask', 'Express'],
    accent: '#5A5248',
    link: 'https://github.com/jalpatel11/SafeBite-Blockchain-Food-Traceability',
  },
  {
    num: '004',
    title: 'Windborne Tracker',
    category: 'Frontend / Data Viz',
    year: '2025',
    desc: 'Interactive map visualizing WindBorne Systems\' weather balloon fleet — 24 hours of real-time position data overlaid with live weather conditions (temperature, wind, humidity, pressure). Time slider for scrubbing through hourly positions, serverless CORS proxies via Netlify Functions, and 5-minute weather caching with rate-limit detection.',
    tags: ['TypeScript', 'React', 'Leaflet', 'Netlify Functions', 'Open-Meteo'],
    accent: '#D94F1E',
    link: 'https://github.com/jalpatel11/windborne-constellation-tracker',
  },
  {
    num: '005',
    title: 'Phoenix LandCover',
    category: 'ML / Computer Vision',
    year: '2025',
    desc: 'Deep learning pipeline for pixel-wise land use classification over Central Phoenix using Sentinel-2 satellite imagery. Custom U-Net in TensorFlow/Keras across 9 land cover classes — achieving 95.95% pixel accuracy, 95.50% weighted F1, and 92.79% mean IoU. Patch-based training with full-image reconstruction.',
    tags: ['Python', 'TensorFlow', 'U-Net', 'Google Earth Engine', 'Sentinel-2'],
    accent: '#1C1C1C',
    link: 'https://github.com/jalpatel11/phoenix-landcover-segmentation',
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
