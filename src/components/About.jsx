import { useEffect, useRef } from 'react';
import './About.css';

export default function About() {
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
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__inner">
        {/* Section label */}
        <div className="section-label reveal">
          <span>01</span>
          <span>About</span>
        </div>

        <div className="about__grid">
          <div className="about__left">
            <h2 className="about__heading reveal reveal--delay-1">
              I care about the<br />
              <em>craft</em> of software.
            </h2>

            <p className="about__body reveal reveal--delay-2">
              I’m Jal, a recent M.S. Data Science graduate from Arizona State University and currently working as a Data Scientist. I build software around data and AI systems: backend services, pipelines, dashboards, mobile features, and evaluation workflows.
            </p>

            <p className="about__body reveal reveal--delay-3">
              I’ve worked on Python microservices, React and React Native apps, Kafka/Spark data pipelines, Databricks recommendation systems, and LangGraph agents for CI/CD automation. At Sentari AI, I helped build an AI journaling app that used transcription and emotion analysis, with offline processing and monitoring built into the product.
            </p>

            <p className="about__body reveal reveal--delay-4">
              I like systems that are useful in the real world. Clean APIs, clear dashboards, reliable pipelines, and AI outputs that are checked before people trust them.
            </p>

            <div className="about__stats reveal reveal--delay-4">
              <div className="about__stat">
                <span className="about__stat-num">3+</span>
                <span className="about__stat-label">Years building</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-num">15+</span>
                <span className="about__stat-label">Projects shipped</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-num">∞</span>
                <span className="about__stat-label">Tab debt</span>
              </div>
            </div>
          </div>

          <div className="about__right reveal reveal--delay-2">
            <div className="about__card">
              <div className="about__card-header">
                <span className="about__card-dot" />
                <span className="about__card-dot" />
                <span className="about__card-dot" />
              </div>
              <pre className="about__code">
{`const jal = {
  based: "Tempe, AZ",
  stack: ["Python", "React", "FastAPI"],
  obsessions: [
    "ML pipelines",
    "clean APIs",
    "good typography",
  ],
  currentlyReading:
    "SICP (again)",
  available: true,
};`}
              </pre>
            </div>

            <div className="about__interests">
              {['Machine Learning', 'Data Engineering', 'Systems Design', 'UI Craft', 'Open Source', 'Performance'].map((item) => (
                <span key={item} className="about__interest-tag">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
