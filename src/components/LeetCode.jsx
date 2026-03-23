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

function ThreeArcRing({ stats, revealed }) {
  const R = 80, CX = 100, CY = 100;
  const C = 2 * Math.PI * R;
  const GAP = 8;
  const total = stats.totalQuestions || 1;

  const diffs = [
    { key: 'easy', solved: stats.easySolved,   tot: stats.totalEasy,   color: '#00AF9B', track: 'rgba(0,175,155,0.18)'  },
    { key: 'med',  solved: stats.mediumSolved, tot: stats.totalMedium, color: '#FFB800', track: 'rgba(255,184,0,0.18)'   },
    { key: 'hard', solved: stats.hardSolved,   tot: stats.totalHard,   color: '#FF375F', track: 'rgba(255,55,95,0.18)'   },
  ];

  let arcStart = 0;
  const arcs = diffs.map(d => {
    const arcTotal  = Math.max(0, (C * d.tot / total) - GAP);
    const arcFilled = revealed && d.tot > 0 ? arcTotal * (d.solved / d.tot) : 0;
    const offset    = C - arcStart;
    const arc       = { ...d, arcTotal, arcFilled, offset };
    arcStart += arcTotal + GAP;
    return arc;
  });

  return (
    <div className="lc-ring-wrap">
      <svg
        className="lc-ring-svg"
        viewBox="0 0 200 200"
        role="img"
        aria-label={`${stats.totalSolved} of ${stats.totalQuestions} problems solved`}
      >
        {arcs.map(arc => (
          <g key={arc.key}>
            <circle cx={CX} cy={CY} r={R} fill="none"
              stroke={arc.track} strokeWidth="10"
              strokeDasharray={`${arc.arcTotal} ${C}`}
              strokeDashoffset={arc.offset}
              transform="rotate(-90 100 100)"
            />
            <circle cx={CX} cy={CY} r={R} fill="none"
              stroke={arc.color} strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${arc.arcFilled} ${C}`}
              strokeDashoffset={arc.offset}
              transform="rotate(-90 100 100)"
              style={{ transition: 'stroke-dasharray 1.4s cubic-bezier(0.22,1,0.36,1)' }}
            />
          </g>
        ))}
        <text x="100" y="90" textAnchor="middle" dominantBaseline="middle"
          fontFamily="'Bebas Neue', sans-serif" fontSize="44" fill="#1C1C1C" letterSpacing="1">
          {stats.totalSolved}
        </text>
        <text x="100" y="112" textAnchor="middle" dominantBaseline="middle"
          fontFamily="'IBM Plex Mono', monospace" fontSize="11" fill="rgba(28,28,28,0.45)"
          letterSpacing="1">
          /{stats.totalQuestions?.toLocaleString()}
        </text>
        <text x="100" y="132" textAnchor="middle" dominantBaseline="middle"
          fontFamily="'IBM Plex Mono', monospace" fontSize="11" fill="#00AF9B"
          letterSpacing="1">
          ✓ Solved
        </text>
      </svg>
    </div>
  );
}

function DifficultyCards({ stats }) {
  const rows = [
    { label: 'Easy', solved: stats.easySolved,   total: stats.totalEasy,   color: '#00AF9B', bg: 'rgba(0,175,155,0.08)'  },
    { label: 'Med.',  solved: stats.mediumSolved, total: stats.totalMedium, color: '#FFB800', bg: 'rgba(255,184,0,0.08)'   },
    { label: 'Hard', solved: stats.hardSolved,   total: stats.totalHard,   color: '#FF375F', bg: 'rgba(255,55,95,0.08)'   },
  ];
  return (
    <div className="lc-diff-cards">
      {rows.map(row => (
        <div key={row.label} className="lc-diff-card" style={{ background: row.bg }}>
          <span className="lc-diff-card__label" style={{ color: row.color }}>{row.label}</span>
          <span className="lc-diff-card__solved">{row.solved}</span>
          <span className="lc-diff-card__total">/{row.total}</span>
        </div>
      ))}
    </div>
  );
}

function buildGrid(submissionCalendar) {
  const today = new Date();
  const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const start = new Date(todayUTC);
  start.setUTCDate(start.getUTCDate() - 363);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());
  const days = [];
  const cursor = new Date(start);
  while (cursor <= todayUTC) {
    const ts = Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate()) / 1000;
    days.push({
      date: new Date(cursor),
      count: submissionCalendar[ts] || submissionCalendar[String(ts)] || 0,
    });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function Heatmap({ calendar }) {
  const days = buildGrid(calendar.submissionCalendar);
  const monthLabels = [];
  let prevMonth = -1;
  days.forEach((d, i) => {
    const col = Math.floor(i / 7);
    const m = d.date.getUTCMonth();
    if (m !== prevMonth && (d.date.getUTCDate() === 1 || i === 0)) {
      monthLabels.push({ label: MONTHS[m], col });
      prevMonth = m;
    }
    if (m !== prevMonth) prevMonth = m;
  });

  return (
    <div className="lc-heatmap">
      <div className="lc-heatmap__meta">
        <span>{calendar.totalActiveDays} active days</span>
        <span>{calendar.streak} day streak</span>
      </div>
      <div className="lc-heatmap__scroll">
        <div className="lc-heatmap__months">
          {monthLabels.map(ml => (
            <span key={`${ml.label}-${ml.col}`} className="lc-heatmap__month"
              style={{ left: ml.col * 14 + 'px' }}>
              {ml.label}
            </span>
          ))}
        </div>
        <div className="lc-heatmap__grid">
          {days.map(d => (
            <div key={d.date.toISOString().slice(0,10)}
              className="lc-heatmap__cell"
              data-count={Math.min(d.count, 5)}
              title={`${d.date.toISOString().slice(0,10)}: ${d.count} submission${d.count !== 1 ? 's' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
