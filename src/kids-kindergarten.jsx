import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Check, DoorOpen, Lock, Pause,
  Play, RotateCcw, Settings, Sparkles, Star, Volume2,
} from 'lucide-react';
import {
  capstoneStations, getKindergartenRoot, kindergartenRoots,
  KINDERGARTEN_PROGRESS_KEY, nextKindergartenPath, phaseLabels,
} from './kids-kindergarten-data';
import './kids-kindergarten.css';

const PENNY_ART = '/kids-korner/penny-hero.png';
const GROVE_ART = '/kids-korner/kids-grove.png';
const phaseDirections = {
  story: 'Look at the coin picture and clues. Tap the answer that matches.',
  play: 'Count aloud with Penny. Then tap the count or coin that reaches the value.',
  challenge: 'Check the coin and the cent number. Tap the match, then choose what helped you solve it.',
};

const coinFacts = {
  penny: { name: 'Penny', value: 1 },
  nickel: { name: 'Nickel', value: 5 },
  dime: { name: 'Dime', value: 10 },
  quarter: { name: 'Quarter', value: 25 },
};

function CoinFace({ coin }) {
  const fact = coinFacts[coin];
  if (!fact) return null;
  return <span className={`kg-coin is-${coin}`} aria-hidden="true"><small>{fact.name}</small><strong>{fact.value}¢</strong></span>;
}

function CountTrack({ values }) {
  return <span className="kg-count-track" aria-hidden="true">{values.map((value) => <i key={value}>{value}</i>)}</span>;
}

function ChoiceVisual({ item }) {
  if (item.pair) return <span className="kg-coin-pair" aria-hidden="true"><CoinFace coin={item.pair[0]} /><b>=</b><span className="kg-value-card">{item.pair[1]}¢</span></span>;
  if (item.coin) return <CoinFace coin={item.coin} />;
  if (item.value) return <span className="kg-value-card" aria-hidden="true">{item.value}¢</span>;
  if (item.count) return <CountTrack values={item.count} />;
  return <span aria-hidden="true">{item.icon}</span>;
}

function LessonVisual({ lesson }) {
  const countValues = [];
  if (lesson.value && lesson.countBy) {
    for (let value = lesson.countBy; value <= lesson.value; value += lesson.countBy) countValues.push(value);
  }
  return <div className="kg-money-model" aria-label={`Money model showing ${lesson.value} cents`}>
    {lesson.price && <div className="kg-price-tag"><small>Price</small><strong>{lesson.price}¢</strong></div>}
    {lesson.coin && <CoinFace coin={lesson.coin} />}
    {lesson.group && <div className="kg-coin-group">{lesson.group.map((coin, index) => <CoinFace coin={coin} key={`${coin}-${index}`} />)}</div>}
    {countValues.length > 0 && <div className="kg-count-model"><small>Count to the value</small><CountTrack values={countValues} /></div>}
  </div>;
}

const blankProgress = {
  orientation: { complete: false, choices: [], reflection: '' },
  phases: {}, roots: {}, reflections: {},
  capstone: { station: 0, complete: false },
  preferences: { sensoryCalm: false },
};

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(KINDERGARTEN_PROGRESS_KEY) || '{}');
    return {
      ...blankProgress, ...saved,
      orientation: { ...blankProgress.orientation, ...saved.orientation },
      capstone: { ...blankProgress.capstone, ...saved.capstone },
      preferences: { ...blankProgress.preferences, ...saved.preferences },
      phases: saved.phases || {}, roots: saved.roots || {}, reflections: saved.reflections || {},
    };
  } catch { return blankProgress; }
}

function useKindergartenProgress() {
  const [progress, setProgress] = useState(loadProgress);
  const update = (recipe) => {
    setProgress((current) => {
      const next = typeof recipe === 'function' ? recipe(current) : { ...current, ...recipe };
      try { localStorage.setItem(KINDERGARTEN_PROGRESS_KEY, JSON.stringify(next)); } catch { /* Local play still works. */ }
      return next;
    });
  };
  return [progress, update];
}

function GrownUpExit({ go }) {
  return <button className="kg-grownup-exit" type="button" aria-label="Grown-Up Exit" onClick={() => go('/crossing')}><DoorOpen aria-hidden="true" /><span>Grown-Up Exit</span></button>;
}

function preferredPennyDeviceVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const preferredNames = [
    /Microsoft (Aria|Jenny|Ava)/i,
    /Samantha/i,
    /Google US English/i,
    /Microsoft Zira/i,
    /\b(Victoria|Karen|Tessa|Moira|Fiona)\b/i,
  ];
  for (const pattern of preferredNames) {
    const match = voices.find((voice) => /^en[-_]/i.test(voice.lang) && pattern.test(voice.name));
    if (match) return match;
  }
  return voices.find((voice) => /^en[-_]/i.test(voice.lang) && /female|woman/i.test(voice.name))
    || voices.find((voice) => /^en[-_]/i.test(voice.lang))
    || voices[0]
    || null;
}

function ReadAloud({ text, label = 'Read this aloud' }) {
  const [status, setStatus] = useState('idle');
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);
  const voiceRef = useRef(null);
  const urlRef = useRef('');
  const playbackTokenRef = useRef(0);

  useEffect(() => {
    const loadVoice = () => { voiceRef.current = preferredPennyDeviceVoice(); };
    loadVoice();
    window.speechSynthesis?.addEventListener?.('voiceschanged', loadVoice);
    return () => {
      playbackTokenRef.current += 1;
      audioRef.current?.pause();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      window.speechSynthesis?.removeEventListener?.('voiceschanged', loadVoice);
    };
  }, []);

  const stop = () => {
    playbackTokenRef.current += 1;
    audioRef.current?.pause();
    audioRef.current = null;
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = '';
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setStatus('idle');
  };

  const speakWithDeviceVoice = (token) => {
    if (token !== playbackTokenRef.current || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      setStatus('idle');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(String(text));
    const voice = voiceRef.current || preferredPennyDeviceVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || 'en-US';
    utterance.rate = 0.96;
    utterance.pitch = 1.12;
    utterance.volume = 1;
    utterance.onstart = () => { if (token === playbackTokenRef.current) setStatus('playing'); };
    utterance.onend = () => { if (token === playbackTokenRef.current) setStatus('idle'); };
    utterance.onerror = () => { if (token === playbackTokenRef.current) setStatus('idle'); };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const start = async () => {
    const token = playbackTokenRef.current + 1;
    playbackTokenRef.current = token;
    setStatus('loading');
    try {
      const response = await fetch('/api/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
        body: JSON.stringify({ text: String(text), persona: 'penny' }),
      });
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok || !contentType.toLowerCase().startsWith('audio/')) throw new Error('unavailable');
      if (token !== playbackTokenRef.current) return;
      const url = URL.createObjectURL(await response.blob());
      urlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      let fallbackStarted = false;
      const fallback = () => {
        if (fallbackStarted || token !== playbackTokenRef.current) return;
        fallbackStarted = true;
        audio.pause();
        audioRef.current = null;
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = '';
        speakWithDeviceVoice(token);
      };
      audio.onplay = () => { if (token === playbackTokenRef.current) setStatus('playing'); };
      audio.onended = () => { if (token === playbackTokenRef.current) stop(); };
      audio.onerror = fallback;
      try { await audio.play(); } catch { fallback(); }
    } catch {
      speakWithDeviceVoice(token);
    }
  };

  const reading = status !== 'idle';
  const toggle = () => reading ? stop() : start();

  return (
    <button className={`kg-read-aloud ${reading ? 'is-reading' : ''}`} type="button" onClick={toggle} aria-pressed={reading} aria-label={reading ? 'Stop Penny read aloud' : label}>
      {reading ? <Pause aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
      <span>{status === 'loading' ? 'Getting Penny…' : reading ? 'Stop' : 'Hear Penny'}</span>
    </button>
  );
}

function KindergartenHeader({ go, progress, updateProgress, back = '/kids-korner/kindergarten' }) {
  const calm = progress.preferences.sensoryCalm;
  return (
    <header className="kg-header">
      <button className="kg-back" type="button" onClick={() => go(back)}><ArrowLeft aria-hidden="true" /> Sprout Grove</button>
      <a className="kg-brand" href="/kids-korner/kindergarten"><span>🌱</span><strong>Penny’s Sprout Grove</strong></a>
      <div className="kg-header-actions">
        <button className="kg-calm" type="button" aria-label={calm ? 'Turn sensory calm off' : 'Turn sensory calm on'} aria-pressed={calm} onClick={() => updateProgress({ ...progress, preferences: { ...progress.preferences, sensoryCalm: !calm } })}>
          <Settings aria-hidden="true" /><span>{calm ? 'Calm on' : 'Sensory calm'}</span>
        </button>
        <GrownUpExit go={go} />
      </div>
    </header>
  );
}

function PhaseDots({ root, progress }) {
  return <div className="kg-phase-dots" aria-label={`${root.shortTitle} progress`}>{['story', 'play', 'challenge'].map((phase) => <span key={phase} className={progress.phases[`${root.slug}:${phase}`] ? 'is-complete' : ''}>{progress.phases[`${root.slug}:${phase}`] ? <Check aria-hidden="true" /> : null}<small>{phaseLabels[phase]}</small></span>)}</div>;
}

function Grove({ go, progress, updateProgress }) {
  const completedCount = Object.values(progress.roots).filter(Boolean).length;
  const nextRoot = kindergartenRoots.find((root) => !progress.roots[root.slug]) || kindergartenRoots[0];
  const capstoneReady = completedCount === kindergartenRoots.length;
  return (
    <main className={`kids-kindergarten kg-grove ${progress.preferences.sensoryCalm ? 'is-calm' : ''}`}>
      <KindergartenHeader go={go} progress={progress} updateProgress={updateProgress} back="/kids-korner" />
      <section className="kg-grove-scene" aria-labelledby="kg-grove-title">
        <img className="kg-grove-art" src={GROVE_ART} alt="A huge sunlit tree surrounded by seven colorful paths in Penny’s Sprout Grove" />
        <div className="kg-grove-depth" aria-hidden="true"><i /><i /><i /><i /></div>
        <header className="kg-grove-copy">
          <p>Penny’s Sprout Grove · Kindergarten</p>
          <h1 id="kg-grove-title">LITTLE CHOICES.<br /><span>BIG ROOTS.</span></h1>
          <strong>Every path has something to notice.<br />Every choice helps your tree grow.</strong>
          <ReadAloud text="Little choices. Big Roots. Every path has something to notice. Every choice helps your tree grow." />
        </header>

        <figure className="kg-grove-penny"><img src={PENNY_ART} alt="Penny pointing toward the colorful paths in Sprout Grove" /><figcaption><small>Penny’s Pick for Next</small><strong>{nextRoot.setting}</strong></figcaption></figure>

        <nav className="kg-root-map" aria-label="Seven Kindergarten Roots">
          {kindergartenRoots.map((root) => {
            const complete = Boolean(progress.roots[root.slug]);
            const suggested = nextRoot.slug === root.slug && !complete;
            return (
              <a key={root.slug} className={`kg-root-place is-${root.zone} ${complete ? 'is-grown' : ''} ${suggested ? 'is-suggested' : ''}`} href={`/kids-korner/kindergarten/roots/${root.slug}/story`} style={/** @type {import('react').CSSProperties & Record<'--root-color', string>} */ ({ '--root-color': root.color })} aria-label={`${root.setting}. ${root.shortTitle}. ${complete ? 'Root grown; replayable' : 'Ready to explore'}`}>
                <span className="kg-root-icon" aria-hidden="true">{root.icon}</span>
                <small>{complete ? 'Root grown' : suggested ? 'Penny’s Pick' : `Root ${root.id}`}</small>
                <strong>{root.setting}</strong>
              </a>
            );
          })}
        </nav>

        <aside className="kg-grove-ledger" aria-label="Kindergarten Grove progress"><span><b>{completedCount}</b> of 7 Roots grown</span><div>{kindergartenRoots.map((root) => <i key={root.id} className={progress.roots[root.slug] ? 'is-grown' : ''} />)}</div></aside>

        <a className={`kg-capstone-gate ${capstoneReady ? 'is-ready' : ''}`} href={capstoneReady ? '/kids-korner/kindergarten/capstone' : undefined} aria-disabled={!capstoneReady}>
          {capstoneReady ? <Star aria-hidden="true" /> : <Lock aria-hidden="true" />}
          <span><small>{capstoneReady ? 'All seven Roots are glowing' : `${7 - completedCount} Roots still growing`}</small><strong>Penny’s Big Grove Day</strong></span>
        </a>
      </section>
    </main>
  );
}

const fairChoices = [
  { id: 'bubbles', label: 'Bubble Wand', icon: '🫧', cost: 2, result: 'Colorful bubbles float across the fair.' },
  { id: 'carousel', label: 'Tiny Carousel', icon: '🎠', cost: 3, result: 'The tiny carousel turns slowly.' },
  { id: 'prize', label: 'Prize Game', icon: '🎯', cost: 4, result: 'A covered shape opens to reveal a starry sticker.' },
];

const fairReflections = ['I picked my favorite.', 'I wanted two things.', 'I kept some tickets.', 'I changed my mind.', 'I wanted to try another way.'];

function Orientation({ go, progress, updateProgress }) {
  const saved = progress.orientation;
  const [selected, setSelected] = useState(saved.complete ? saved.choices : []);
  const [locked, setLocked] = useState(saved.complete);
  const [reflection, setReflection] = useState(saved.reflection || '');
  const [message, setMessage] = useState('I’ll help you notice. You still get to choose.');
  const spent = fairChoices.filter((choice) => selected.includes(choice.id)).reduce((total, choice) => total + choice.cost, 0);
  const left = 5 - spent;
  const toggle = (choice) => {
    if (locked) return;
    if (selected.includes(choice.id)) { setSelected(selected.filter((id) => id !== choice.id)); setMessage('Changed your mind? You can try another way.'); return; }
    if (spent + choice.cost > 5) { setMessage('Oop. Your five tickets cannot stretch that far. If you want that one, something else has to wait. What would you trade?'); return; }
    setSelected([...selected, choice.id]);
    setMessage(`${choice.label} can happen. Let’s see what your tickets can still do.`);
  };
  const lock = () => {
    setLocked(true);
    updateProgress({ ...progress, orientation: { complete: true, choices: selected, reflection } });
  };
  const reflect = (value) => {
    setReflection(value);
    updateProgress({ ...progress, orientation: { complete: true, choices: selected, reflection: value } });
  };
  const replay = () => { setSelected([]); setLocked(false); setReflection(''); setMessage('Five fresh tickets. You can choose a new way.'); };
  const spoken = `Welcome to the fair! You have five tickets and three fun things looking right at you. Your tickets can say yes to some things. They cannot say yes to everything. ${message}`;
  return (
    <main className={`kids-kindergarten kg-orientation ${progress.preferences.sensoryCalm ? 'is-calm' : ''}`}>
      <KindergartenHeader go={go} progress={progress} updateProgress={updateProgress} />
      <section className="kg-fair-stage" aria-labelledby="kg-fair-title">
        <div className="kg-fair-sky" aria-hidden="true"><i /><i /><i /></div>
        <figure className="kg-fair-penny"><img src={PENNY_ART} alt="Penny welcoming you to the five-ticket School Fair" /></figure>
        <header className="kg-fair-intro">
          <p>Mission Zero</p><h1 id="kg-fair-title">PENNY’S<br />SCHOOL FAIR</h1>
          <p>“Welcome to the fair! You have five tickets and three fun things looking right at you.”</p>
          <ReadAloud text={spoken} />
        </header>
        <div className="kg-ticket-pouch" aria-label={`${left} tickets still held`}><span>{left}</span><small>tickets</small></div>
        <div className="kg-penny-message" aria-live="polite"><img src={PENNY_ART} alt="" /><p>{message}</p><ReadAloud text={message} label="Hear Penny’s message" /></div>
        {!locked ? <>
          <div className="kg-fair-choices" aria-label="School Fair choices">{fairChoices.map((choice) => {
            const active = selected.includes(choice.id);
            const cannotFit = !active && spent + choice.cost > 5;
            return <div className="kg-fair-choice" key={choice.id}><button type="button" className={`${active ? 'is-selected' : ''} ${cannotFit ? 'cannot-fit' : ''}`} aria-pressed={active} onClick={() => toggle(choice)}><span aria-hidden="true">{choice.icon}</span><strong>{choice.label}</strong><small>{choice.cost} tickets</small></button><ReadAloud text={`${choice.label}. Costs ${choice.cost} tickets.`} label={`Hear ${choice.label}`} /></div>;
          })}</div>
          <button className="kg-primary kg-lock-choice" type="button" onClick={lock}>Lock my choice <ArrowRight aria-hidden="true" /></button>
        </> : <section className="kg-fair-result" aria-labelledby="kg-result-title">
          <div><p>Penny says</p><h2 id="kg-result-title">You chose.</h2><p>That choice gave you something, used some tickets, and changed what else could happen. That is what we do here. We notice.</p><ReadAloud text="You chose. That choice gave you something, used some tickets, and changed what else could happen. That is what we do here. We notice." /></div>
          <ul>{fairChoices.map((choice) => <li key={choice.id} className={selected.includes(choice.id) ? 'is-chosen' : ''}><span>{choice.icon}</span><strong>{choice.label}</strong><small>{selected.includes(choice.id) ? choice.result : 'Not this time'}</small></li>)}</ul>
          <p className="kg-tickets-left"><strong>{left}</strong> tickets still with you</p>
          <div className="kg-reflections"><h3>What mattered to you?</h3>{fairReflections.map((item) => <div className="kg-reflection-option" key={item}><button type="button" className={reflection === item ? 'is-selected' : ''} onClick={() => reflect(item)}>{item}</button><ReadAloud text={item} label={`Hear ${item}`} /></div>)}</div>
          {reflection && <div className="kg-awake"><span>🌱</span><strong>You made a choice with a limit. Your first little root is awake.</strong></div>}
          <div className="kg-result-actions"><button type="button" className="kg-secondary" onClick={replay}><RotateCcw aria-hidden="true" /> Try another way</button><button type="button" className="kg-primary" disabled={!reflection} onClick={() => go('/kids-korner/kindergarten')}>Enter Sprout Grove <ArrowRight aria-hidden="true" /></button></div>
        </section>}
      </section>
    </main>
  );
}

function MissionScreen({ go, progress, updateProgress, root, phase }) {
  const details = root.phases[phase];
  const phaseKey = `${root.slug}:${phase}`;
  const [choice, setChoice] = useState('');
  const [reflection, setReflection] = useState(progress.reflections[phaseKey] || '');
  const selected = details.choices.find((item) => item.id === choice);
  const isChallenge = phase === 'challenge';
  const finish = () => {
    if (!choice || (isChallenge && !reflection)) return;
    updateProgress((current) => ({
      ...current,
      phases: { ...current.phases, [phaseKey]: true },
      roots: isChallenge ? { ...current.roots, [root.slug]: true } : current.roots,
      reflections: reflection ? { ...current.reflections, [phaseKey]: reflection } : current.reflections,
    }));
    go(nextKindergartenPath(root, phase));
  };
  return (
    <main className={`kids-kindergarten kg-mission is-${root.zone} ${progress.preferences.sensoryCalm ? 'is-calm' : ''}`} style={/** @type {import('react').CSSProperties & Record<'--root-color', string>} */ ({ '--root-color': root.color })}>
      <KindergartenHeader go={go} progress={progress} updateProgress={updateProgress} />
      <section className="kg-mission-world" aria-labelledby="kg-mission-title">
        <div className="kg-zone-landscape" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <header className="kg-mission-heading">
          <p>Root {root.id} · {root.setting}</p>
          <span>{phaseLabels[phase]} · Mission {details.id}</span>
          <h1 id="kg-mission-title">{details.title}</h1>
          <ReadAloud text={`${root.setting}. ${phaseLabels[phase]}. ${details.title}. ${details.story.join(' ')} Your activity: ${details.instruction} ${phaseDirections[phase]} This matters with money because ${root.moneyConnection}`} />
        </header>
        <figure className="kg-mission-penny"><img src={PENNY_ART} alt={`Penny exploring ${root.setting} with you`} /><figcaption><span className="kg-thinking-fingers" aria-hidden="true"><i /><i /><i /><i /><i /></span><p>{details.story[0]}<br /><strong>{details.story[1]}</strong></p></figcaption></figure>
        <section className="kg-play-space" aria-label={details.accessibilityLabel}>
          <div className="kg-activity-title"><small>{phaseLabels[phase]} activity</small><h2>{details.instruction}</h2><ReadAloud text={`${details.instruction} ${phaseDirections[phase]}`} label="Hear the instruction" /></div>
          <LessonVisual lesson={details.lesson} />
          <div className="kg-activity-brief">
            <div><small>The situation</small><p>{details.story.join(' ')}</p></div>
            <div><small>What to do</small><p>{phaseDirections[phase]}</p></div>
            <div className="is-money"><small>Why this matters with money</small><p>{root.moneyConnection}</p><ReadAloud text={`Why this matters with money. ${root.moneyConnection}`} label="Hear the money connection" /></div>
          </div>
          <div className="kg-choice-prompt"><strong>Step 1 · Choose one</strong><span>Tap a choice below. The activity will show what changes.</span></div>
          <div className="kg-object-choices">{details.choices.map((item) => <div className="kg-object-choice" key={item.id}><button type="button" className={choice === item.id ? 'is-selected' : ''} aria-pressed={choice === item.id} onClick={() => setChoice(item.id)}><ChoiceVisual item={item} /><strong>{item.label}</strong></button><ReadAloud text={item.label} label={`Hear ${item.label}`} /></div>)}</div>
          {selected && <div className="kg-visible-result" aria-live="polite"><ChoiceVisual item={selected} /><div><small>What Penny sees</small><p>{selected.effect}</p></div><ReadAloud text={`${selected.effect} ${details.feedback}`} label="Hear what Penny sees" /></div>}
          {selected && <div className="kg-penny-notices"><img src={PENNY_ART} alt="" /><p><small>Penny notices</small>{details.feedback}</p></div>}
          {selected && isChallenge && <div className="kg-reflections"><h3>Step 2 · What did you notice?</h3>{details.reflection.map((item) => <div className="kg-reflection-option" key={item}><button type="button" className={reflection === item ? 'is-selected' : ''} onClick={() => setReflection(item)}>{item}</button><ReadAloud text={item} label={`Hear ${item}`} /></div>)}</div>}
          {!choice && <p className="kg-next-help">Choose one answer above to unlock the next part.</p>}
          {choice && isChallenge && !reflection && <p className="kg-next-help">Now choose what you noticed in Step 2.</p>}
          <div className="kg-mission-actions"><button type="button" className="kg-secondary" disabled={!choice} onClick={() => { setChoice(''); setReflection(''); }}><RotateCcw aria-hidden="true" /> Try another way</button><button type="button" className="kg-primary" disabled={!choice || (isChallenge && !reflection)} onClick={finish}>{isChallenge ? 'Grow this Root' : 'Next part'} <ArrowRight aria-hidden="true" /></button></div>
        </section>
        <PhaseDots root={root} progress={progress} />
      </section>
    </main>
  );
}

function Capstone({ go, progress, updateProgress }) {
  const unlocked = kindergartenRoots.every((root) => progress.roots[root.slug]);
  const initial = Math.min(progress.capstone.station || 0, capstoneStations.length - 1);
  const [station, setStation] = useState(initial);
  const [choice, setChoice] = useState('');
  if (!unlocked) return <main className="kids-kindergarten kg-locked"><KindergartenHeader go={go} progress={progress} updateProgress={updateProgress} /><section><Lock aria-hidden="true" /><h1>Penny’s Big Grove Day is still growing.</h1><p>Visit all seven Roots first. Every Root can be replayed.</p><button className="kg-primary" type="button" onClick={() => go('/kids-korner/kindergarten')}>Return to Sprout Grove</button></section></main>;
  const current = capstoneStations[station];
  const chooseNext = () => {
    if (!choice) return;
    if (station === capstoneStations.length - 1) {
      updateProgress({ ...progress, capstone: { station: 7, complete: true } });
      go('/kids-korner/kindergarten/complete');
      return;
    }
    const next = station + 1;
    updateProgress({ ...progress, capstone: { station: next, complete: false } });
    setStation(next); setChoice('');
  };
  return <main className={`kids-kindergarten kg-capstone ${progress.preferences.sensoryCalm ? 'is-calm' : ''}`}><KindergartenHeader go={go} progress={progress} updateProgress={updateProgress} /><section className="kg-capstone-stage"><header><p>Kindergarten Capstone · Station {station + 1} of 7</p><h1>PENNY’S BIG COIN DAY</h1><p>Look, count, and match. No score. No rush.</p><ReadAloud text={`Penny’s Big Coin Day. Station ${station + 1} of seven. ${current.prompt}`} /></header><div className="kg-capstone-roots" aria-label={`${station + 1} of 7 stations`} >{kindergartenRoots.map((root, index) => <span key={root.id} className={index < station ? 'is-complete' : index === station ? 'is-current' : ''}>{root.icon}</span>)}</div><figure><img src={PENNY_ART} alt="Penny beside the seven-station coin path" /><figcaption><small>{current.icon} {current.title}</small><strong>{current.prompt}</strong></figcaption></figure><div className="kg-object-choices">{current.choices.map((item) => <div className="kg-object-choice" key={item.id}><button type="button" className={choice === item.id ? 'is-selected' : ''} onClick={() => setChoice(item.id)}><ChoiceVisual item={item} /><strong>{item.label}</strong></button><ReadAloud text={item.label} /></div>)}</div>{choice && <div className="kg-visible-result"><p>{current.choices.find((item) => item.id === choice)?.effect}</p></div>}<button className="kg-primary" type="button" disabled={!choice} onClick={chooseNext}>{station === 6 ? 'Light all seven Roots' : 'Next station'} <ArrowRight aria-hidden="true" /></button></section></main>;
}

function Complete({ go, progress, updateProgress }) {
  return <main className={`kids-kindergarten kg-complete ${progress.preferences.sensoryCalm ? 'is-calm' : ''}`}><KindergartenHeader go={go} progress={progress} updateProgress={updateProgress} /><section><div className="kg-complete-tree" aria-hidden="true"><span>🌳</span>{kindergartenRoots.map((root, index) => <i key={root.id} style={/** @type {import('react').CSSProperties & Record<'--i', number>} */ ({ '--i': index })}>{root.icon}</i>)}</div><figure><img src={PENNY_ART} alt="Penny celebrating the seven glowing Kindergarten Roots" /></figure><div className="kg-complete-copy"><p>Seven strong little Roots</p><h1>YOUR KINDERGARTEN<br /><span>GROVE IS GROWING!</span></h1><strong>You learned the penny, nickel, dime, and quarter—and counted their values.</strong><p>You matched coin pictures to cent numbers, counted coin groups, and chose coins for simple prices. Those are real building blocks for understanding money.</p><blockquote>“Curiosity did all that.<br />Well, curiosity and you.”</blockquote><ReadAloud text="Your Kindergarten Grove is growing! You learned the penny, nickel, dime, and quarter. You matched their values, counted coin groups, and chose coins for simple prices. Curiosity did all that. Well, curiosity and you." /></div><nav aria-label="Kindergarten completion choices"><a href="/kids-korner/kindergarten/orientation"><RotateCcw aria-hidden="true" /> Replay School Fair</a><a href="/kids-korner/kindergarten"><Star aria-hidden="true" /> Visit any Root</a><a href="/kids-korner/kindergarten/capstone"><Play aria-hidden="true" /> Replay capstone</a><button type="button" onClick={() => go('/kids-korner/kindergarten')}>Return to Sprout Grove</button></nav><div className="kg-grade-one-future"><Lock aria-hidden="true" /><span><small>Grade 1 Grove</small><strong>A new path is growing</strong></span></div></section></main>;
}

function PhaseOrderRedirect({ go, path }) {
  useEffect(() => { go(path); }, [go, path]);
  return <main className="kids-kindergarten kg-locked"><section><Sparkles aria-hidden="true" /><h1>Start with the Story Spark.</h1><p>Penny is opening the first part of this Root.</p></section></main>;
}

export default function KidsKindergarten({ route, go }) {
  const [progress, updateProgress] = useKindergartenProgress();
  const subpath = String(route || '').replace(/^kids-kindergarten:?/, '').replace(/^\/+/, '');
  const rootMatch = subpath.match(/^roots\/([^/]+)\/(story|play|challenge)$/);
  const root = rootMatch ? getKindergartenRoot(rootMatch[1]) : null;
  const phase = rootMatch?.[2];
  if (subpath === 'orientation') return <Orientation go={go} progress={progress} updateProgress={updateProgress} />;
  if (subpath === 'capstone') return <Capstone go={go} progress={progress} updateProgress={updateProgress} />;
  if (subpath === 'complete') return <Complete go={go} progress={progress} updateProgress={updateProgress} />;
  if (root && phase) {
    const storyDone = progress.phases[`${root.slug}:story`];
    const playDone = progress.phases[`${root.slug}:play`];
    if (phase === 'play' && !storyDone) return <PhaseOrderRedirect go={go} path={`/kids-korner/kindergarten/roots/${root.slug}/story`} />;
    if (phase === 'challenge' && !playDone) return <PhaseOrderRedirect go={go} path={`/kids-korner/kindergarten/roots/${root.slug}/${storyDone ? 'play' : 'story'}`} />;
    return <MissionScreen key={`${root.slug}-${phase}`} go={go} progress={progress} updateProgress={updateProgress} root={root} phase={phase} />;
  }
  return <Grove go={go} progress={progress} updateProgress={updateProgress} />;
}
