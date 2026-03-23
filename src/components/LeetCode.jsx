import { useEffect, useRef, useState } from 'react';
import './LeetCode.css';

const API = 'https://leetcode-api-faisalshohag.vercel.app/jal_patel';

function LoadingSkeleton() {
  return (
    <div className="lc-skeleton-wrap">
      <div className="lc-skeleton lc-skeleton--ring" />
      <div className="lc-skeleton lc-skeleton--cards" />
      <div className="lc-skeleton lc-skeleton--heatmap" />
    </div>
  );
}

function ErrorState() {
  return (
    <div className="lc-error">
      <span>// stats unavailable — </span>
      <a href="https://leetcode.com/u/jal_patel/" target="_blank" rel="noreferrer">
        visit profile
      </a>
    </div>
  );
}

function ThreeArcRing({ stats, revealed }) { return null; }
function DifficultyCards({ stats }) { return null; }
function Heatmap({ calendar }) { return null; }

export default function LeetCode() {
  const sectionRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [stats, setStats] = useState(null);
  const [calendar, setCalendar] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    fetch(API)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => {
        const sub = data.submissionCalendar ?? {};
        const totalActiveDays = Object.values(sub).reduce((s, v) => s + (v > 0 ? 1 : 0), 0);
        let streak = 0;
        const today = new Date();
        const cursor = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
        while (true) {
          const ts = cursor.getTime() / 1000;
          if (sub[ts] || sub[String(ts)]) {
            streak++;
            cursor.setUTCDate(cursor.getUTCDate() - 1);
          } else break;
        }
        setStats(data);
        setCalendar({ submissionCalendar: sub, totalActiveDays, streak });
        setStatus('ok');
      })
      .catch(() => setStatus('error'));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
          setRevealed(true);
        }
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [status]);

  return (
    <section id="leetcode" className="leetcode" ref={sectionRef}>
      <div className="leetcode__inner">
        <div className="section-label reveal">
          <span>04</span>
          <span>LeetCode</span>
        </div>
        <div className="leetcode__header reveal reveal--delay-1">
          <h2 className="leetcode__heading">Problems<br /><span>solved.</span></h2>
          <p className="leetcode__sub">
            Consistent practice across data structures, algorithms, and problem-solving.
          </p>
          <a
            className="leetcode__link"
            href="https://leetcode.com/u/jal_patel/"
            target="_blank"
            rel="noreferrer"
          >
            View on LeetCode →
          </a>
        </div>

        {status === 'loading' && <LoadingSkeleton />}
        {status === 'error'   && <ErrorState />}
        {status === 'ok' && (
          <div className="leetcode__body reveal reveal--delay-2">
            <ThreeArcRing stats={stats} revealed={revealed} />
            <DifficultyCards stats={stats} />
            <Heatmap calendar={calendar} />
          </div>
        )}
      </div>
    </section>
  );
}
