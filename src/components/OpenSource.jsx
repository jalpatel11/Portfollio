import { useEffect, useRef } from 'react';
import { FaCodeBranch } from 'react-icons/fa';
import './OpenSource.css';

const contributions = [
  {
    monogram: 'GG',
    title: 'lib/datetime',
    subtitle: 'Add pytest unit tests for datetime_scan and datetime_format',
    org: 'GRASS GIS · OSGeo/grass',
    date: 'Sep 2026',
    desc: 'Added a 107-test ctypes unit test suite for the lib/datetime C library, the engine behind G_format_timestamp and G_scan_timestamp used by r.timestamp, v.timestamp, r3.timestamp, and the t.* modules.',
    tags: ['GRASS GIS', 'Open Source', 'Python', 'pytest', 'ctypes'],
    link: 'https://github.com/OSGeo/grass/pull/7871',
  },
  {
    monogram: 'GG',
    title: 'g.gisenv',
    subtitle: 'Add pytest test suite',
    org: 'GRASS GIS · OSGeo/grass',
    date: 'Aug 2026',
    desc: 'Contributed to open-source GRASS GIS development, adding test coverage for the g.gisenv module used by researchers worldwide.',
    tags: ['GRASS GIS', 'Open Source', 'Python', 'pytest'],
    link: 'https://github.com/OSGeo/grass/pull/7803',
  },
  {
    monogram: 'GG',
    title: 'r.timestamp',
    subtitle: 'Add pytest test suite',
    org: 'GRASS GIS · OSGeo/grass',
    date: 'Aug 2026',
    desc: 'Contributed to open-source GRASS GIS development, improving test coverage and software quality for the r.timestamp module used by researchers worldwide.',
    tags: ['GRASS GIS', 'Open Source', 'Python', 'pytest', 'Geospatial'],
    link: 'https://github.com/OSGeo/grass/pull/7802',
  },
];

export default function OpenSource() {
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
    <section id="open-source" className="section opensource" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">
          <FaCodeBranch aria-hidden="true" /> Open Source
        </span>
        <h2 className="section-title reveal">Open source contributions</h2>
        <p className="section-desc reveal">
          Contributing test coverage and tooling to GRASS GIS, the open-source geospatial
          engine used by researchers worldwide.
        </p>

        <div className="timeline">
          {contributions.map((item, index) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className={`tl-item reveal reveal--delay-${Math.min(index + 1, 4)}`}
            >
              <div className="tl-card card">
                <div className="tc-head">
                  <div className="tc-logo">{item.monogram}</div>
                  <div>
                    <div className="tc-co">
                      {item.title} <span className="opensource__subtitle">— {item.subtitle}</span>
                    </div>
                    <div className="tc-role">{item.org}</div>
                  </div>
                </div>
                <p className="tc-desc">{item.desc}</p>
                <div className="tc-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="tl-node">
                <div className="tl-dot">{item.monogram}</div>
                <div className="tl-date">{item.date}</div>
              </div>
              <div className="tl-gap" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
