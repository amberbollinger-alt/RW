import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowRight, BadgeCheck, Heart, ShieldCheck, Sparkles, Star } from 'lucide-react';
import './kids-korner.css';

const KIDS_PROGRESS_KEY = 'rootwise_kids_korner_intro_v1';

function PennyMascot({ excited = false }) {
  return (
    <div className={`penny-mascot ${excited ? 'is-excited' : ''}`} aria-label="Penny, your Kids Korner guide">
      <div className="penny-coin" aria-hidden="true">
        <div className="penny-shine" />
        <div className="penny-face">
          <span className="penny-eye penny-eye-left" />
          <span className="penny-eye penny-eye-right" />
          <span className="penny-smile" />
        </div>
        <strong>P</strong>
      </div>
      <div className="penny-name">PENNY</div>
    </div>
  );
}

function GrownUpWelcome({ onContinue }) {
  return (
    <main className="kids-korner adult-welcome">
      <div className="kk-sky kk-sky-adult" aria-hidden="true" />
      <button className="grownup-exit" type="button" onClick={() => { window.location.href = '/'; }}>
        <ArrowLeft size={16} /> Back to RootWise
      </button>

      <section className="adult-stage" aria-labelledby="penny-grownups-title">
        <PennyMascot />
        <div className="penny-dialogue adult-dialogue">
          <p className="kk-eyebrow"><ShieldCheck size={18} /> A quick word for the grown-ups</p>
          <h1 id="penny-grownups-title">Hi. I’m Penny. You can relax—I’ve got this part.</h1>
          <p>
            I know handing a kid over to an app can feel a little weird. So before you go, here’s the deal:
            <strong> Kids Korner is being built as a closed learning space made just for young learners.</strong>
          </p>
          <p>
            We’ll learn about money through stories, games, choices, questions, and a whole lot of trying things out.
            I’m not here to tell kids what to think or what choice to make. I’m here to help them learn <em>how</em> to think through a choice.
          </p>
          <div className="grownup-promises" aria-label="Kids Korner design promises">
            <div><ShieldCheck size={20} /><span><strong>Kid territory.</strong> No social feed, shopping, or adult-course navigation inside this experience.</span></div>
            <div><Heart size={20} /><span><strong>No shame.</strong> Wrong answers are part of learning, not something to be embarrassed about.</span></div>
            <div><BadgeCheck size={20} /><span><strong>Guardrails first.</strong> If something does not belong in Kids Korner, Penny does not pretend that it does.</span></div>
          </div>
          <p className="penny-aside">
            So yes—you can hover if you want. Grown-ups are world-class hoverers. But I promise, we’re about to have a pretty great time.
          </p>
          <button className="kk-primary adult-handoff" type="button" onClick={onContinue}>
            Okay Penny, they’re yours <ArrowRight size={19} />
          </button>
          <small>Grown-up exit stays available from Kids Korner.</small>
        </div>
      </section>
    </main>
  );
}

function KidWelcome({ onRestart }) {
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setBurst(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  const startMission = () => {
    try { localStorage.setItem(KIDS_PROGRESS_KEY, JSON.stringify({ introComplete: true, updatedAt: new Date().toISOString() })); } catch {}
    window.location.hash = 'mission-one';
  };

  return (
    <main className={`kids-korner kid-welcome ${burst ? 'is-live' : ''}`}>
      <div className="kk-sky kk-sky-kid" aria-hidden="true">
        <span className="cloud c1" /><span className="cloud c2" /><span className="cloud c3" />
        <span className="star-pop s1">★</span><span className="star-pop s2">★</span><span className="star-pop s3">★</span>
      </div>

      <button className="grownup-exit kid-exit" type="button" onClick={() => { window.location.href = '/'; }}>
        <ArrowLeft size={16} /> Grown-up exit
      </button>

      <section className="kid-stage" aria-labelledby="penny-kids-title">
        <PennyMascot excited />
        <div className="kid-copy">
          <p className="kk-eyebrow kid-eyebrow"><Sparkles size={18} /> GROWN-UPS: HANDOFF COMPLETE</p>
          <h1 id="penny-kids-title"><span>OKAY, KIDS.</span><br />I HAVE BEEN WAITING FOR YOU.</h1>
          <p className="kid-joke">The grown-ups are gone. Well… probably standing right behind you. Grown-ups do that.</p>
          <div className="kids-korner-logo" aria-label="Kids Korner">
            <span>KIDS</span><span>KORNER!</span>
          </div>
          <p className="kid-lead">
            This is where money stops acting like a boring grown-up subject and starts acting like what it really is:
            <strong> a giant game of choices.</strong>
          </p>
          <p>
            You’re going to make decisions. Spend pretend money. Save some. Change your mind. Make a spectacularly questionable choice once in a while.
            And figure out what happens next.
          </p>

          <div className="kid-promise-cards">
            <article><span>🧠</span><strong>Think</strong><small>There is usually more than one possible choice.</small></article>
            <article><span>🎯</span><strong>Choose</strong><small>You decide what matters in the mission.</small></article>
            <article><span>🔄</span><strong>Try Again</strong><small>Mistakes are information. We use them.</small></article>
            <article><span>🌱</span><strong>Grow</strong><small>Every choice teaches your brain something new.</small></article>
          </div>

          <div className="penny-rule">
            <Star size={24} />
            <div><strong>PENNY RULE #1</strong><span>You do not have to get everything right. You do have to be curious.</span></div>
          </div>

          <button className="kk-primary kid-start" type="button" onClick={startMission}>
            LET’S DO THIS <ArrowRight size={22} />
          </button>
          <button className="tiny-reset" type="button" onClick={onRestart}>Replay Penny’s grown-up intro</button>
        </div>
      </section>
    </main>
  );
}

function MissionOneTeaser() {
  return (
    <main className="kids-korner mission-teaser">
      <button className="grownup-exit kid-exit" type="button" onClick={() => { window.location.href = '/'; }}>
        <ArrowLeft size={16} /> Grown-up exit
      </button>
      <section className="mission-card">
        <PennyMascot excited />
        <p className="kk-eyebrow"><Sparkles size={18} /> Mission One</p>
        <h1>THE SCHOOL FAIR</h1>
        <p>You’ve got <strong>10 tokens</strong>, more things you want than tokens to spend, and zero chance Penny is choosing for you.</p>
        <p className="mission-line">Next up: wants, tradeoffs, saving, and the tiny problem of wanting everything at the same time.</p>
        <button className="kk-primary" type="button" onClick={() => { window.location.hash = ''; }}>Back to Penny <ArrowLeft size={18} /></button>
      </section>
    </main>
  );
}

function KidsKorner() {
  const [audience, setAudience] = useState('grownups');
  const isMission = window.location.hash === '#mission-one';

  useEffect(() => {
    const onHash = () => setAudience((value) => value);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (isMission) return <MissionOneTeaser />;
  if (audience === 'kids') return <KidWelcome onRestart={() => setAudience('grownups')} />;
  return <GrownUpWelcome onContinue={() => setAudience('kids')} />;
}

createRoot(document.getElementById('root')).render(<KidsKorner />);
