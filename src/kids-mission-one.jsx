import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, DoorOpen, RotateCcw, Sparkles, Star } from 'lucide-react';
import './kids-mission-one.css';

const PENNY_ART = '/kids-korner/penny-hero.png';
const MISSION_KEY = 'rootwise_kids_mission_one_v1';

const fairChoices = [
  { id: 'ride', name: 'Rocket Ride', cost: 5, icon: '🚀', note: 'One huge ride. Very loud. Excellent screaming potential.' },
  { id: 'slushie', name: 'Rainbow Slushie', cost: 3, icon: '🥤', note: 'Cold, colorful, and almost guaranteed to turn your tongue blue.' },
  { id: 'game', name: 'Mystery Game', cost: 4, icon: '🎯', note: 'You might win a prize. You might win bragging rights. You might win absolutely nothing.' },
  { id: 'stickers', name: 'Sticker Pack', cost: 2, icon: '✨', note: 'Six ridiculous stickers, including one taco wearing sunglasses.' },
];

const reflectionChoices = [
  'I wanted the thing I cared about most.',
  'I wanted more than one kind of fun.',
  'I wanted to keep some tokens for later.',
  'I wanted to try something uncertain.',
];

function GrownUpExit({ go }) {
  return (
    <button className="km-grownup-exit" type="button" onClick={() => go('/crossing')}>
      <DoorOpen aria-hidden="true" /><span><small>Return to RootWise</small>Grown-Up Exit</span>
    </button>
  );
}

export default function KidsMissionOne({ go }) {
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState('You have 10 tokens. Pick anything that fits. I am not choosing for you. Nice try.');
  const [locked, setLocked] = useState(false);
  const [reflection, setReflection] = useState('');

  const spent = useMemo(
    () => fairChoices.filter((choice) => selected.includes(choice.id)).reduce((sum, choice) => sum + choice.cost, 0),
    [selected],
  );
  const remaining = 10 - spent;
  const chosen = fairChoices.filter((choice) => selected.includes(choice.id));
  const skipped = fairChoices.filter((choice) => !selected.includes(choice.id));

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
    const nextRemaining = 10 - (spent + choice.cost);
    setSelected([...selected, choice.id]);
    setMessage(`${choice.name}: in. You still control ${nextRemaining} token${nextRemaining === 1 ? '' : 's'}.`);
  };

  const lockChoice = () => {
    setLocked(true);
    try {
      localStorage.setItem(MISSION_KEY, JSON.stringify({ selected, spent, saved: remaining, completedChoice: true }));
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveReflection = (value) => {
    setReflection(value);
    try {
      const prior = JSON.parse(localStorage.getItem(MISSION_KEY) || '{}');
      localStorage.setItem(MISSION_KEY, JSON.stringify({ ...prior, reflection: value, completed: true }));
    } catch {}
  };

  const reset = () => {
    setSelected([]);
    setLocked(false);
    setReflection('');
    setMessage('Fresh start. Same 10 tokens. Different choice if you want it.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const returnToGrove = () => { window.location.href = '/kids-korner/grove'; };

  return (
    <main className="kids-korner kids-mission-one">
      <div className="km-fair-world" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <header className="km-topbar">
        <button type="button" className="km-back" onClick={returnToGrove}><ArrowLeft aria-hidden="true" /> Back to the Grove</button>
        <div className="km-wordmark"><Star aria-hidden="true" /><span>Kids <strong>Korner</strong></span></div>
        <GrownUpExit go={go} />
      </header>

      <section className="km-shell" aria-labelledby="km-title">
        <header className="km-hero">
          <img src={PENNY_ART} alt="Penny smiling and welcoming you to the School Fair mission" />
          <div className="km-hero-copy">
            <p className="km-kicker"><Sparkles aria-hidden="true" /> Mission One · The School Fair</p>
            <h1 id="km-title">TEN TOKENS.<br /><span>TOO MANY GOOD CHOICES.</span></h1>
            <p>Welcome to the fair. You have exactly <strong>10 tokens</strong>. Nobody is giving you more because you made puppy eyes at Penny.</p>
          </div>
          <div className="km-token-meter" aria-label={`${remaining} tokens remaining`}><span>You have</span><strong>{remaining}</strong><small>tokens left</small></div>
        </header>

        {!locked ? (
          <>
            <div className="km-penny-message" aria-live="polite"><img src={PENNY_ART} alt="" /><p><strong>Penny:</strong> {message}</p></div>

            <section className="km-choice-grid" aria-label="School fair choices">
              {fairChoices.map((choice) => {
                const active = selected.includes(choice.id);
                const blocked = !active && spent + choice.cost > 10;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    className={`km-choice ${active ? 'is-selected' : ''} ${blocked ? 'is-blocked' : ''}`}
                    aria-pressed={active}
                    onClick={() => toggleChoice(choice)}
                  >
                    <span className="km-choice-icon" aria-hidden="true">{choice.icon}</span>
                    <span className="km-choice-copy"><strong>{choice.name}</strong><small>{choice.note}</small></span>
                    <span className="km-cost">{choice.cost}<small>tokens</small></span>
                    <span className="km-choice-action">{active ? 'CHOSEN ✓' : blocked ? 'NEEDS A TRADE' : 'CHOOSE IT'}</span>
                  </button>
                );
              })}
            </section>

            <section className="km-decision-bar" aria-label="Your token decision">
              <div><span>Spent</span><strong>{spent}</strong></div>
              <div><span>Still yours</span><strong>{remaining}</strong></div>
              <p>{remaining > 0 ? `If you stop here, ${remaining} token${remaining === 1 ? '' : 's'} stay with Future You.` : 'You used all 10. That is a choice too.'}</p>
              <button className="km-primary" type="button" onClick={lockChoice}>LOCK MY CHOICE <ArrowRight aria-hidden="true" /></button>
            </section>
          </>
        ) : (
          <section className="km-reveal" aria-live="polite">
            <div className="km-receipt">
              <p className="km-kicker"><BadgeCheck aria-hidden="true" /> Decision receipt</p>
              <h2>YOU CHOSE.</h2>
              <div className="km-receipt-list">
                {chosen.length ? chosen.map((choice) => (
                  <div key={choice.id}><span aria-hidden="true">{choice.icon}</span><strong>{choice.name}</strong><b>{choice.cost}</b></div>
                )) : <div><span aria-hidden="true">🫙</span><strong>Keep every token</strong><b>0</b></div>}
              </div>
              <div className="km-receipt-total"><span>Tokens still yours</span><strong>{remaining}</strong></div>
            </div>

            <div className="km-tradeoff">
              <img src={PENNY_ART} alt="Penny thinking with you about your choice" />
              <div>
                <p className="km-kicker"><Star aria-hidden="true" /> Penny calls this the invisible part</p>
                <h2>Every “yes” quietly creates a “not this time.”</h2>
                <p>You had choices. You had a limit. Choosing one thing changed what was possible for the others.</p>
                {skipped.length > 0 && <p className="km-not-this-time"><strong>Not this time:</strong> {skipped.map((choice) => choice.name).join(', ')}.</p>}
                <p><strong>That is a tradeoff.</strong> It does not mean you chose wrong. It means your choice had a cost beyond the number of tokens.</p>
                <p className="km-capacity">The goal is not “pick the best thing.” The goal is to notice what your choice gives you, what it uses, and what it leaves possible.</p>
              </div>
            </div>

            <section className="km-reflection" aria-labelledby="km-reflect-title">
              <p className="km-kicker"><Sparkles aria-hidden="true" /> Penny asks one more thing</p>
              <h2 id="km-reflect-title">What mattered most when you chose?</h2>
              <p>There is no secret correct button. Pick the one that sounds most like you.</p>
              <div className="km-reflection-options">
                {reflectionChoices.map((option) => <button type="button" key={option} className={reflection === option ? 'is-active' : ''} onClick={() => saveReflection(option)}>{option}</button>)}
              </div>
            </section>

            {reflection && <div className="km-complete"><span aria-hidden="true">🌱</span><div><small>ROOT GROWTH</small><strong>You just practiced making a choice with a limit.</strong><p>That is the beginning of financial decision capacity.</p></div></div>}

            <div className="km-actions">
              <button className="km-primary km-secondary" type="button" onClick={reset}><RotateCcw aria-hidden="true" /> TRY A DIFFERENT CHOICE</button>
              <button className="km-primary" type="button" onClick={returnToGrove} disabled={!reflection}>FINISH MISSION <ArrowRight aria-hidden="true" /></button>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
