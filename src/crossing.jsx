import { useState } from 'react';
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, Compass,
  Leaf, LockKeyhole, Sparkles, Sprout,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import './crossing.css';
import './crossing-branches.css';

const CAPACITIES = [
  ['01', 'See the pattern', 'Notice what is happening beneath the number.'],
  ['02', 'Name the pressure', 'Identify the force trying to make the choice for you.'],
  ['03', 'Understand the cost', 'Keep the tradeoff visible before the decision moves.'],
  ['04', 'Question the script', 'Separate inherited messages from present reality.'],
  ['05', 'Evaluate the tradeoff', 'Compare what a choice creates with what it claims.'],
  ['06', 'Recognize the risk', 'See exposure, dependence, and responsibility clearly.'],
  ['07', 'Widen the options', 'Find more than one possible route forward.'],
  ['08', 'Choose with intention', 'Move from reaction toward a decision you can explain.'],
  ['09', 'Protect what matters', 'Prepare for disruption without pretending it will not happen.'],
  ['10', 'Build toward the future', 'Carry today’s resources toward tomorrow’s choices.'],
  ['11', 'Decide what comes next', 'Keep growing without handing your judgment away.'],
];

export default function Crossing({ go }) {
  const [reflection, setReflection] = useState(() => {
    try { return localStorage.getItem('rootwise_crossing_reflection') || ''; } catch { return ''; }
  });
  const [saved, setSaved] = useState(false);
  const saveReflection = () => {
    try { localStorage.setItem('rootwise_crossing_reflection', reflection.trim()); } catch { /* local-only preview */ }
    setSaved(true);
  };

  return (
    <main className="crossing-page">
      <header className="crossing-topbar">
        <button type="button" onClick={() => go('dashboard')}><ArrowLeft /> The Grove</button>
        <button type="button" className="crossing-brand" onClick={() => go('home')} aria-label="RootWise home">
          <ApprovedArtwork variant="tree" />
          <span><strong>Root$Wise</strong><small>Recognition · The Crossing</small></span>
        </button>
        <span className="crossing-status"><Sparkles /> 11 Roots established</span>
      </header>

      <section className="crossing-hero" aria-labelledby="crossing-title">
        <div className="crossing-hero-image" aria-hidden="true" />
        <div className="crossing-hero-glow" aria-hidden="true" />
        <div className="crossing-hero-copy">
          <p className="crossing-kicker"><Sprout /> The Grove recognizes the work</p>
          <p className="crossing-overline">You made it to the other side of knowing</p>
          <h1 id="crossing-title">You didn’t just learn more.<br /><em>You built the capacity to move.</em></h1>
          <p className="crossing-lead">Knowledge can explain a problem. Capacity gives you a way to face it.</p>
          <div className="crossing-hero-actions">
            <a href="#recognition" className="crossing-primary">See what you built <ArrowRight /></a>
            <a href="#reflection" className="crossing-secondary">Take a moment <ChevronDown /></a>
          </div>
        </div>
        <div className="crossing-light-line" aria-hidden="true"><span>THE GAP BETWEEN KNOWLEDGE AND ACTION</span></div>
      </section>

      <section id="recognition" className="crossing-recognition">
        <div className="crossing-section-heading">
          <p className="crossing-kicker"><Compass /> Financial decision capacity</p>
          <h2>Established.</h2>
          <p>You are not being recognized because life is now easy. You are being recognized because you can see more clearly inside the difficulty—and you have a way to work with what you see.</p>
        </div>
        <div className="crossing-capacity-grid">
          {CAPACITIES.map(([number, title, detail]) => <article key={number}>
            <span className="crossing-capacity-mark"><Check /></span>
            <div><small>{number}</small><h3>{title}</h3><p>{detail}</p></div>
          </article>)}
        </div>
      </section>

      <section className="crossing-sage" aria-label="Sage's recognition">
        <div className="crossing-sage-image" aria-hidden="true"><img src="/rootwise-sage-cutout.png" alt="" /></div>
        <div className="crossing-sage-copy">
          <p className="crossing-kicker"><Sparkles /> Sage says</p>
          <blockquote>
            “You were never missing intelligence.<br />
            You were missing a way to turn what you knew into something you could use.”
          </blockquote>
          <p>There is now more room between pressure and reaction. More language. Better questions. A clearer view of the choice in front of you.</p>
          <strong>That room matters. That is where choice begins.</strong>
        </div>
      </section>

      <section id="reflection" className="crossing-reflection">
        <div>
          <p className="crossing-kicker"><Leaf /> Keep this part private</p>
          <h2>What is possible for you now that was harder to see before?</h2>
          <p>This is not a test answer. It is a marker in your own words. Write as much or as little as you want.</p>
        </div>
        <div className="crossing-reflection-form">
          <label htmlFor="crossing-reflection">Your reflection</label>
          <textarea id="crossing-reflection" value={reflection} maxLength={1800} onChange={(event) => { setReflection(event.target.value); setSaved(false); }} placeholder={'I used to believe…\n\nNow I understand…\n\nThe choice I am more prepared to face is…'} />
          <div className="crossing-reflection-actions">
            <button type="button" className="crossing-save" onClick={saveReflection} disabled={!reflection.trim()}><LockKeyhole /> {saved ? 'Saved on this device' : 'Save privately'}</button>
            <span>Stored locally in this browser.</span>
          </div>
        </div>
      </section>

      <section className="crossing-next">
        <div className="crossing-next-copy">
          <p className="crossing-kicker"><Sprout /> The Grove is open</p>
          <h2>This is not the end of growth.</h2>
          <p>You did not arrive here as a finished person. Neither did the tree. You now have more choice about what you return to, what you build next, and what you are ready to question.</p>
        </div>
        <div className="crossing-next-actions">
          <button type="button" className="crossing-branch crossing-kids" disabled aria-label="Kids Corner, coming soon">
            <span className="crossing-branch-title">Kids Corner</span>
            <small>Coming soon</small>
          </button>
          <button type="button" className="crossing-branch crossing-business" disabled aria-label="Business Hub, coming soon">
            <span className="crossing-branch-title">Business Hub</span>
            <small>Coming soon</small>
          </button>
        </div>
      </section>

      <footer className="crossing-footer"><ApprovedArtwork variant="tree" /><span><strong>Root$Wise</strong><small>Grow financial wisdom at the root.</small></span><p>Knowledge is no longer the end of the road.<br /><b>It is the beginning of your next choice.</b></p></footer>
    </main>
  );
}
