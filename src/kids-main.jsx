import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowRight, BadgeCheck, Heart, RotateCcw, ShieldCheck, Sparkles, Star } from 'lucide-react';
import './kids-korner.css';
import './kids-korner-v2.css';

const KIDS_PROGRESS_KEY = 'rootwise_kids_korner_intro_v1';
const MISSION_ONE_KEY = 'rootwise_kids_korner_mission_one_v1';

const FAIR_CHOICES = [
  { id: 'ride', name: 'Rocket Ride', cost: 5, icon: '🚀', note: 'One huge ride. Very loud. Extremely worth screaming about.' },
  { id: 'slushie', name: 'Rainbow Slushie', cost: 3, icon: '🥤', note: 'Cold, colorful, and guaranteed to turn your tongue a suspicious color.' },
  { id: 'game', name: 'Mystery Game', cost: 4, icon: '🎯', note: 'You might win a prize. You might win bragging rights. You might win absolutely nothing.' },
  { id: 'stickers', name: 'Sticker Pack', cost: 2, icon: '✨', note: 'Six ridiculous stickers, including one taco wearing sunglasses.' },
];

function Penny({ excited = false, thinking = false }) {
  return (
    <div className={`penny-character ${excited ? 'is-excited' : ''} ${thinking ? 'is-thinking' : ''}`} aria-label="Penny, your Kids Korner guide">
      <div className="penny-halo" aria-hidden="true"><span>★</span><span>✦</span><span>★</span></div>
      <div className="penny-person" aria-hidden="true">
        <div className="penny-hair-back" />
        <div className="penny-head">
          <div className="penny-hair"><span className="penny-curl c-one"/><span className="penny-curl c-two"/><span className="penny-curl c-three"/></div>
          <div className="penny-brow penny-brow-left"/><div className="penny-brow penny-brow-right"/>
          <div className="penny-eye penny-eye-left"><i /></div>
          <div className="penny-eye penny-eye-right"><i /></div>
          <div className="penny-nose" />
          <div className="penny-smile" />
          <div className="penny-freckles freckles-left">···</div><div className="penny-freckles freckles-right">···</div>
        </div>
        <div className="penny-neck" />
        <div className="penny-body">
          <div className="penny-hood"><span>$</span></div>
          <div className="penny-shirt">ROOTS<br/><strong>&amp; ROUTES</strong></div>
          <div className="penny-arm penny-arm-left"><div className="penny-hand hand-left"><i/><i/><i/><i/></div></div>
          <div className="penny-arm penny-arm-right"><div className="penny-hand hand-right"><i/><i/><i/><i/></div></div>
        </div>
      </div>
      <div className="penny-name-tag"><strong>PENNY</strong><span>your Kids Korner buddy</span></div>
      {thinking && <div className="penny-thinking-note">pinky → thumb → repeat</div>}
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
        <Penny thinking />
        <div className="penny-dialogue adult-dialogue">
          <p className="kk-eyebrow"><ShieldCheck size={18} /> A quick word for the grown-ups</p>
          <h1 id="penny-grownups-title">Hi. I’m Penny. You can relax—I’ve got this part.</h1>
          <p>
            I know handing a kid over to an app can feel a little weird. So before you go, here’s the deal:
            <strong> Kids Korner is a closed learning space being built just for young learners.</strong>
          </p>
          <p>
            We learn about money through stories, games, choices, questions, and a whole lot of trying things out.
            I’m not here to tell kids what to think or what choice to make. I’m here to help them learn <em>how</em> to think through a choice.
          </p>
          <div className="grownup-promises" aria-label="Kids Korner design promises">
            <div><ShieldCheck size={20} /><span><strong>Kid territory.</strong> No social feed, shopping, or adult-course navigation inside this experience.</span></div>
            <div><Heart size={20} /><span><strong>No shame.</strong> Wrong answers are part of learning, not something to be embarrassed about.</span></div>
            <div><BadgeCheck size={20} /><span><strong>Guardrails first.</strong> If something does not belong in Kids Korner, I don’t pretend that it does.</span></div>
          </div>
          <p className="penny-aside">
            So yes—you can hover if you want. Grown-ups are world-class hoverers. But they’re safe with me, and we’re about to have a pretty great time.
          </p>
          <button className="kk-primary adult-handoff" type="button" onClick={onContinue}>
            Okay Penny, they’re yours <ArrowRight size={19} />
          </button>
          <small>A grown-up exit stays visible throughout Kids Korner.</small>
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
        <Penny excited />
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
            And then figure out what happened and why.
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

function MissionOne() {
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState('You have 10 tokens. You can pick anything that fits. I am not picking for you. Nice try.');
  const [locked, setLocked] = useState(false);

  const spent = useMemo(() => FAIR_CHOICES.filter((choice) => selected.includes(choice.id)).reduce((sum, choice) => sum + choice.cost, 0), [selected]);
  const remaining = 10 - spent;
  const selectedChoices = FAIR_CHOICES.filter((choice) => selected.includes(choice.id));
  const skippedChoices = FAIR_CHOICES.filter((choice) => !selected.includes(choice.id));

  const toggleChoice = (choice) => {
    if (locked) return;
    if (selected.includes(choice.id)) {
      setSelected(selected.filter((id) => id !== choice.id));
      setMessage(`Changed your mind about the ${choice.name}? Totally legal. You get those ${choice.cost} tokens back.`);
      return;
    }
    if (spent + choice.cost > 10) {
      setMessage(`You want the ${choice.name}. I get it. But your 10 tokens just said “not unless something else goes.” What would you trade?`);
      return;
    }
    setSelected([...selected, choice.id]);
    setMessage(`${choice.name}: in. You still control ${10 - (spent + choice.cost)} token${10 - (spent + choice.cost) === 1 ? '' : 's'}.`);
  };

  const lockChoice = () => {
    setLocked(true);
    try {
      localStorage.setItem(MISSION_ONE_KEY, JSON.stringify({ selected, spent, saved: remaining, completed: true, updatedAt: new Date().toISOString() }));
    } catch {}
  };

  const reset = () => {
    setSelected([]);
    setLocked(false);
    setMessage('Fresh start. Same 10 tokens. Different choice if you want it.');
  };

  return (
    <main className="kids-korner fair-mission">
      <div className="fair-sky" aria-hidden="true"><span className="fair-flag f1"/><span className="fair-flag f2"/><span className="fair-flag f3"/><span className="fair-flag f4"/><span className="fair-flag f5"/></div>
      <button className="grownup-exit kid-exit" type="button" onClick={() => { window.location.href = '/'; }}>
        <ArrowLeft size={16} /> Grown-up exit
      </button>

      <section className="fair-shell" aria-labelledby="mission-one-title">
        <header className="fair-header">
          <div className="fair-penny"><Penny excited={!locked} thinking={locked} /></div>
          <div>
            <p className="kk-eyebrow"><Sparkles size={18} /> Mission One · The School Fair</p>
            <h1 id="mission-one-title">TEN TOKENS.<br/><span>TOO MANY GOOD CHOICES.</span></h1>
            <p>Welcome to the fair. You have exactly <strong>10 tokens</strong>. Nobody is giving you more because you made puppy eyes at Penny.</p>
          </div>
          <div className="token-meter" aria-label={`${remaining} tokens remaining`}>
            <span>YOU HAVE</span><strong>{remaining}</strong><small>TOKENS LEFT</small>
          </div>
        </header>

        {!locked ? (
          <>
            <div className="penny-message"><span className="penny-mini">P</span><p><strong>Penny:</strong> {message}</p></div>
            <div className="fair-grid">
              {FAIR_CHOICES.map((choice) => {
                const active = selected.includes(choice.id);
                const blocked = !active && spent + choice.cost > 10;
                return (
                  <button key={choice.id} type="button" className={`fair-choice ${active ? 'is-selected' : ''} ${blocked ? 'is-blocked' : ''}`} onClick={() => toggleChoice(choice)} aria-pressed={active}>
                    <span className="fair-icon">{choice.icon}</span>
                    <span className="fair-choice-copy"><strong>{choice.name}</strong><small>{choice.note}</small></span>
                    <span className="fair-cost">{choice.cost}<small>tokens</small></span>
                    <span className="fair-choice-action">{active ? 'CHOSEN ✓' : blocked ? 'NEEDS A TRADE' : 'CHOOSE IT'}</span>
                  </button>
                );
              })}
            </div>

            <div className="decision-bar">
              <div><span>Spent</span><strong>{spent}</strong></div>
              <div><span>Still yours</span><strong>{remaining}</strong></div>
              <p>{remaining > 0 ? `If you stop here, ${remaining} token${remaining === 1 ? '' : 's'} stay with Future You.` : 'You used all 10. That is a choice too.'}</p>
              <button className="kk-primary" type="button" onClick={lockChoice}>LOCK MY CHOICE <ArrowRight size={19}/></button>
            </div>
          </>
        ) : (
          <section className="choice-reveal" aria-live="polite">
            <div className="choice-receipt">
              <p className="kk-eyebrow"><BadgeCheck size={18}/> Decision receipt</p>
              <h2>YOU CHOSE.</h2>
              <div className="receipt-list">
                {selectedChoices.length ? selectedChoices.map((choice) => <div key={choice.id}><span>{choice.icon}</span><strong>{choice.name}</strong><b>{choice.cost}</b></div>) : <div><span>🫙</span><strong>Keep every token</strong><b>0</b></div>}
              </div>
              <div className="receipt-total"><span>Tokens still yours</span><strong>{remaining}</strong></div>
            </div>

            <div className="tradeoff-card">
              <Penny thinking />
              <div>
                <p className="kk-eyebrow"><Star size={18}/> Penny calls this the invisible part</p>
                <h2>Every “yes” quietly creates a “not this time.”</h2>
                <p>You had choices. You had a limit. So choosing one thing changed what was possible for the others.</p>
                {skippedChoices.length > 0 && <p className="not-this-time"><strong>Not this time:</strong> {skippedChoices.map((choice) => choice.name).join(', ')}.</p>}
                <p><strong>That is a tradeoff.</strong> It does not mean you chose wrong. It means your choice had a cost beyond the number of tokens.</p>
                <p className="mission-capacity">The goal is not “pick the best thing.” The goal is to notice what your choice gives you, what it uses, and what it leaves possible.</p>
              </div>
            </div>

            <div className="mission-complete">
              <span>🌱</span>
              <div><small>ROOT GROWTH</small><strong>You just practiced making a choice with a limit.</strong><p>That is the beginning of financial decision capacity.</p></div>
            </div>

            <div className="mission-actions">
              <button className="kk-primary secondary-kid" type="button" onClick={reset}><RotateCcw size={18}/> TRY A DIFFERENT CHOICE</button>
              <button className="kk-primary" type="button" onClick={() => { window.location.hash = ''; }}>BACK TO KIDS KORNER <ArrowRight size={18}/></button>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function KidsKorner() {
  const [audience, setAudience] = useState('grownups');
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (route === '#mission-one') return <MissionOne />;
  if (audience === 'kids') return <KidWelcome onRestart={() => setAudience('grownups')} />;
  return <GrownUpWelcome onContinue={() => setAudience('kids')} />;
}

createRoot(document.getElementById('root')).render(<KidsKorner />);
