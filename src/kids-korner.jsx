import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BadgeCheck, Compass, DoorOpen, Flag,
  Gamepad2, Gift, Heart, Lock, Map, ShieldCheck, Sparkles, Star,
  TentTree, Ticket, Trees,
} from 'lucide-react';
import './kids-korner.css';

const PENNY_ART = '/kids-korner/penny-hero.png';

function GrownUpExit({ go }) {
  return (
    <button className="kk-grownup-exit" type="button" onClick={() => go('/crossing')}>
      <DoorOpen aria-hidden="true" />
      <span><small>Return to RootWise</small>Grown-Up Exit</span>
    </button>
  );
}

function PennyArt({ compact = false }) {
  return (
    <figure className={`kk-penny ${compact ? 'is-compact' : ''}`}>
      <span className="kk-penny-burst" aria-hidden="true" />
      <img
        src={PENNY_ART}
        alt="Penny, a ten-year-old guide with auburn hair, warm brown eyes, dimples, and an outstretched hand"
      />
      <figcaption><span>Meet</span><strong>Penny!</strong></figcaption>
    </figure>
  );
}

function MissionTicket({ compact = false }) {
  return (
    <article className={`kk-mission-ticket ${compact ? 'is-compact' : ''}`}>
      <div className="kk-ticket-stub" aria-hidden="true"><Ticket /><span>01</span></div>
      <div>
        <p>Mission One</p>
        <h3>The School Fair</h3>
        <span>You’ve got 10 tokens and way too many fun things to choose from. Ready?</span>
      </div>
      <div className="kk-ticket-icons" aria-hidden="true"><TentTree /><Gamepad2 /><Gift /></div>
    </article>
  );
}

function AdultWelcome({ onContinue, go }) {
  return (
    <main className="kids-korner kk-intro kk-adult-stage">
      <div className="kk-adult-sky" aria-hidden="true"><i /><i /><i /></div>
      <header className="kk-entry-bar">
        <a className="kk-wordmark" href="/kids-korner" aria-label="Kids Korner home"><Star aria-hidden="true" /><span>Kids <strong>Korner</strong></span></a>
        <GrownUpExit go={go} />
      </header>

      <section className="kk-adult-hero" aria-labelledby="kk-grownup-title">
        <PennyArt />
        <div className="kk-adult-copy">
          <p className="kk-kicker"><ShieldCheck aria-hidden="true" /> Kids Korner</p>
          <h1 id="kk-grownup-title">Grown-ups, don’t worry. <em>I’ve got this.</em></h1>
          <p className="kk-lead">This is a kid-friendly space where we learn how to think through choices, ask good questions, and have a great time doing it.</p>
          <p className="kk-no-pressure">No pressure. No scary money talk. Just curiosity, confidence, and fun.</p>

          <div className="kk-reassurance" aria-label="What grown-ups should know">
            <article><ShieldCheck aria-hidden="true" /><div><strong>Closed kid space</strong><span>No ads, shopping links, financial products, or adult-course navigation.</span></div></article>
            <article><Compass aria-hidden="true" /><div><strong>Thinking, not telling</strong><span>Kids practice comparing, questioning, and deciding—not following one “right” money choice.</span></div></article>
            <article><BadgeCheck aria-hidden="true" /><div><strong>Curiosity is the point</strong><span>No pressure to share personal details or get everything right.</span></div></article>
          </div>

          <blockquote>“You can stay and watch if you want. Grown-ups are world-class hoverers.”</blockquote>
          <button className="kk-button kk-handoff" type="button" onClick={onContinue}>
            Okay Penny, they’re yours <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </section>
      <aside className="kk-adult-ticket"><MissionTicket compact /></aside>
    </main>
  );
}

function KidReveal({ go, onRestart, onEnterGrove }) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main className="kids-korner kk-intro kk-kid-stage">
      <div className="kk-energy-field" aria-hidden="true">
        <span className="kk-sunburst" />
        {Array.from({ length: 18 }, (_, index) => <i key={index} style={/** @type {import('react').CSSProperties & Record<'--i', number>} */ ({ '--i': index })} />)}
      </div>
      <header className="kk-kid-bar">
        <button className="kk-replay" type="button" onClick={onRestart}><ArrowLeft aria-hidden="true" /> Grown-up intro</button>
        <a className="kk-wordmark" href="/kids-korner" aria-label="Kids Korner home"><Star aria-hidden="true" /><span>Kids <strong>Korner</strong></span></a>
        <GrownUpExit go={go} />
      </header>

      <section className="kk-kid-hero" aria-labelledby="kk-kids-title">
        <PennyArt />
        <div className="kk-kid-copy">
          <p className="kk-kicker"><Sparkles aria-hidden="true" /> Penny turns to you</p>
          <h1 id="kk-kids-title" ref={headingRef} tabIndex={-1}><span>Okay, kids!</span><strong>I’ve been waiting for you!</strong></h1>
          <p className="kk-welcome">Welcome to Kids Korner—where choices become adventures.</p>

          <div className="kk-secret-rule">
            <span aria-hidden="true"><Star /></span>
            <div><small>The secret rule</small><p>You don’t have to get everything right.</p><strong>You do have to be curious.</strong></div>
          </div>

          <button className="kk-button kk-start" type="button" onClick={onEnterGrove}>
            Let’s do this <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="kk-teaser-band" aria-labelledby="kk-mission-title">
        <div className="kk-fair-doodles" aria-hidden="true"><TentTree /><Gamepad2 /><Gift /><Ticket /></div>
        <div><p>Coming up first</p><h2 id="kk-mission-title">Mission One: The School Fair</h2></div>
        <p>You’ve got 10 tokens and way too many fun things to choose from. Ready?</p>
      </section>
    </main>
  );
}

export function KidsKornerIntro({ go }) {
  const [audience, setAudience] = useState('grownups');
  const showKids = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setAudience('kids');
  };
  const enterGrove = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    go('/kids-korner/grove');
  };
  return audience === 'grownups'
    ? <AdultWelcome go={go} onContinue={showKids} />
    : <KidReveal go={go} onEnterGrove={enterGrove} onRestart={() => { window.scrollTo({ top: 0, behavior: 'auto' }); setAudience('grownups'); }} />;
}

function KidsNavigation({ go }) {
  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `/kids-korner/grove#${id}`);
  };
  return (
    <header className="kk-grove-nav">
      <button type="button" className="kk-grove-brand" onClick={() => go('/kids-korner/grove')}><Trees aria-hidden="true" /><span>Kids Korner<strong>Grove</strong></span></button>
      <nav aria-label="Kids Korner">
        <button type="button" onClick={() => jump('penny')}><Heart aria-hidden="true" /> Penny</button>
        <button type="button" onClick={() => jump('adventures')}><Map aria-hidden="true" /> My Adventures</button>
      </nav>
      <GrownUpExit go={go} />
    </header>
  );
}

export function KidsKornerGrove({ go }) {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <main className="kids-korner kk-grove-page">
      <KidsNavigation go={go} />
      <section className="kk-grove-world" aria-labelledby="kk-grove-title">
        <img className="kk-grove-art" src="/kids-korner/kids-grove.png" alt="A giant colorful tree with bright branching paths leading toward a school fair" />
        <div className="kk-grove-wash" aria-hidden="true" />
        <div className="kk-grove-heading">
          <p><Sparkles aria-hidden="true" /> Your world starts here</p>
          <h1 id="kk-grove-title">Every path begins<br />with a choice.</h1>
          <span>Look around. One adventure is ready. The rest of the world will grow with you.</span>
        </div>

        <a className="kk-path-sign kk-fair-sign" href="#mission-one">
          <span><Flag aria-hidden="true" /> Ready now</span>
          <strong>The School Fair</strong>
          <small>Follow the token path</small>
          <ArrowRight aria-hidden="true" />
        </a>
        <div className="kk-path-sign kk-locked-sign" aria-label="A future path is still growing">
          <Lock aria-hidden="true" /><strong>A new path is growing</strong><small>Not open yet</small>
        </div>
        <div className="kk-growth-marker" aria-label="The first adventure path is ready">
          <span className="is-grown" /><span /><span /><span />
          <small>Your adventure tree</small>
        </div>
      </section>

      <section id="penny" className="kk-penny-station" aria-labelledby="kk-penny-station-title">
        <PennyArt compact />
        <div>
          <p className="kk-kicker"><Heart aria-hidden="true" /> Penny’s spot</p>
          <h2 id="kk-penny-station-title">I won’t choose for you.</h2>
          <p>I’ll help you notice what each choice gives you, what it asks from you, and why one option might matter more today.</p>
          <strong>Then you decide what you want to do.</strong>
        </div>
      </section>

      <section id="adventures" className="kk-adventures" aria-labelledby="kk-adventures-title">
        <header><p><Map aria-hidden="true" /> My Adventures</p><h2 id="kk-adventures-title">One path is glowing.</h2></header>
        <div className="kk-adventure-grid">
          <article className="kk-adventure-open">
            <span><Ticket aria-hidden="true" /> Mission One</span>
            <h3>The School Fair</h3>
            <p>Ten tokens. Games, prizes, snacks, and more choices than you can fit in your pockets.</p>
            <a href="#mission-one">See the mission gate <ArrowRight aria-hidden="true" /></a>
          </article>
          <article className="kk-adventure-locked"><Lock aria-hidden="true" /><h3>A future adventure</h3><p>This path is still growing.</p></article>
          <article className="kk-adventure-locked"><Sparkles aria-hidden="true" /><h3>A hidden adventure</h3><p>It will appear when the world is ready.</p></article>
        </div>
      </section>

      <section id="mission-one" className="kk-mission-gate" aria-labelledby="kk-mission-gate-title">
        <div className="kk-gate-lights" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
        <div>
          <p><Flag aria-hidden="true" /> Mission One</p>
          <h2 id="kk-mission-gate-title">The School Fair</h2>
          <strong>You’ve got 10 tokens and way too many fun things to choose from. Ready?</strong>
          <p>The full fair is coming next. For now, the gate is here—and this is where your first adventure will begin.</p>
        </div>
        <div className="kk-token-stack" aria-label="Ten adventure tokens"><span>10</span><small>tokens</small></div>
      </section>

      <footer className="kk-grove-footer"><Star aria-hidden="true" /><strong>Stay curious.</strong><span>Every choice teaches you something.</span><GrownUpExit go={go} /></footer>
    </main>
  );
}
