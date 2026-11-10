import { useEffect, useRef } from 'react';
import { FaUser, FaGraduationCap, FaMapMarkerAlt, FaBriefcase, FaCodeBranch, FaLinkedin } from 'react-icons/fa';
import './About.css';

const facts = [
  { icon: FaGraduationCap, label: 'Degree', value: 'M.S. Data Science @ ASU' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Tempe, AZ' },
  { icon: FaBriefcase, label: 'Status', value: 'Open to full-time' },
  { icon: FaCodeBranch, label: 'Open Source', value: 'GRASS GIS Contributor' },
];

const interests = ['Machine Learning', 'Data Engineering', 'Systems Design', 'UI Craft', 'Open Source', 'Performance'];

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
    <section id="about" className="section about" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">
          <FaUser aria-hidden="true" /> About
        </span>
        <h2 className="section-title reveal">
          I care about the craft of software.
        </h2>

        <div className="about__grid">
          <div className="about__left reveal reveal--delay-1">
            <p>
              I’m Jal, a recent M.S. Data Science graduate from Arizona State University
              and currently working as a Data Scientist. I build software around data and
              AI systems: backend services, pipelines, dashboards, mobile features, and
              evaluation workflows.
            </p>

            <blockquote className="about__quote">
              "An AI system is only as good as the checks you put around it." — my
              guiding philosophy in engineering.
            </blockquote>

            <p>
              I’ve worked on Python microservices, React and React Native apps, Kafka/Spark
              data pipelines, Databricks recommendation systems, and LangGraph agents for
              CI/CD automation. At Sentari AI, I helped build an AI journaling app that used
              transcription and emotion analysis, with offline processing and monitoring
              built into the product.
            </p>
            <p>
              I like systems that are useful in the real world. Clean APIs, clear
              dashboards, reliable pipelines, and AI outputs that are checked before people
              trust them.
            </p>

            <div className="about__interests">
              {interests.map((item) => (
                <span key={item} className="tag-pill">{item}</span>
              ))}
            </div>

            <a
              href="https://www.linkedin.com/in/jal-patel-swe/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary about__linkedin"
              data-hover
            >
              <FaLinkedin aria-hidden="true" /> Connect on LinkedIn
            </a>
          </div>

          <div className="about__facts reveal reveal--delay-2">
            {facts.map((f) => (
              <div key={f.label} className="card about__fact">
                <div className="about__fact-icon">
                  <f.icon aria-hidden="true" />
                </div>
                <div className="about__fact-label">{f.label}</div>
                <div className="about__fact-value">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
