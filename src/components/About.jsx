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
              I'm Jal — a software engineer who grew up on the belief that
              code should be both fast and honest. I care about what happens
              under the hood: memory layouts, cache misses, the 12ms that
              separates a good user experience from a great one.
            </p>

            <p className="about__body reveal reveal--delay-3">
              I've worked across the stack — from React UIs that need to feel
              alive, to APIs handling millions of requests, to data pipelines
              that can't afford to fail. I think in systems, I design in
              constraints, and I ship things that hold up.
            </p>

            <div className="about__stats reveal reveal--delay-4">
              <div className="about__stat">
                <span className="about__stat-num">4+</span>
                <span className="about__stat-label">Years building</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-num">20+</span>
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
  based: "United States",
  stack: ["React", "Node", "Go"],
  obsessions: [
    "render perf",
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
              {['Systems Design', 'Performance', 'Compilers', 'Type Theory', 'UI Craft', 'Open Source'].map((item) => (
                <span key={item} className="about__interest-tag">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
