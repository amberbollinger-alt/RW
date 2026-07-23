import { ArrowRight, LockKeyhole, Map, Sparkles } from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import './grove.css';

const groveRoutes = [
  { key: 'literacy', number: '01', label: 'Foundations', angle: '-90deg', ready: true },
  { key: 'value', number: '02', label: 'Value & Earning', angle: '-38deg', ready: true },
  { key: 'choice', number: '03', label: 'Choice & Cash Flow', angle: '14deg', ready: true },
  { key: 'investing', number: '04', label: 'Investing', angle: '66deg' },
  { key: 'business', number: '05', label: 'Business', angle: '118deg' },
  { key: 'family', number: '06', label: 'Family', angle: '170deg' },
  { key: 'educators', number: '07', label: 'Educators', angle: '222deg' },
];

const ROOT_TWO_URL = 'https://rootwise-root-two-value-earning.amber-bollinger.chatgpt.site';

export default function Grove({ profile, go }) {
  const name = profile?.firstName || 'Friend';

  return (
    <main className="grove-page">
      <header className="grove-header">
        <button type="button" onClick={() => go('home')} className="grove-brand">
          <ApprovedArtwork variant="tree" />
          <span><strong>Root$Wise</strong><small>The Grove</small></span>
        </button>
        <button type="button" onClick={() => go('my-journey')} className="grove-profile">My journey</button>
      </header>

      <section className="grove-intro">
        <p><Sparkles size={15} /> Welcome back, {name}</p>
        <h1>Every road begins at the tree.</h1>
        <span>Choose a path. Lessons begin only after you enter a root.</span>
      </section>

      <section className="grove-radial" aria-label="The seven RootWise paths">
        <div className="grove-rings" aria-hidden="true"><i /><i /><i /></div>
        <div className="grove-tree">
          <ApprovedArtwork variant="tree" />
          <div><strong>Your tree</strong><span>One root at a time</span></div>
        </div>

        {groveRoutes.map((route) => (
          <button
            type="button"
            className={route.ready ? 'grove-route is-ready' : 'grove-route'}
            style={/** @type {import('react').CSSProperties} */ ({ '--route-angle': route.angle })}
            onClick={() => {
              if (!route.ready) return;
              if (route.key === 'value') window.location.assign(ROOT_TWO_URL);
              else if (route.key === 'choice') go('roots/three');
              else go('roots/one');
            }}
            disabled={!route.ready}
            key={route.key}
          >
            <span>{route.number}</span>
            <strong>{route.label}</strong>
            {route.ready ? <ArrowRight size={15} /> : <LockKeyhole size={13} />}
          </button>
        ))}
      </section>

      <footer className="grove-next">
        <Map size={18} />
        <div><strong>Roots One, Two, and Three are open</strong><span>Continue into Choice, Cash Flow &amp; Spending.</span></div>
        <button type="button" onClick={() => go('roots/three')}>Enter Root Three <ArrowRight size={16} /></button>
      </footer>
    </main>
  );
}
