import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, CircleHelp,
  CloudRain, Menu, MessageCircle, Pause, Play, RefreshCw, Sparkles,
  Sprout, Target, Volume2, VolumeX, Waves, X,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import { reservoirYearEvents, rootFourChapters, rootFourOpening } from './root-four-data';
import './root-four.css';

export const ROOT_FOUR_PROGRESS_KEY = 'rootwise_root_four_reservoir_progress_v1';

function object(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }

function readProgress() {
  try {
    const saved = object(JSON.parse(localStorage.getItem(ROOT_FOUR_PROGRESS_KEY) || '{}'));
    const keys = new Set(rootFourChapters.map((chapter) => chapter.key));
    return {
      activeIndex: Number.isInteger(saved.activeIndex) ? Math.max(0, Math.min(saved.activeIndex, rootFourChapters.length - 1)) : 0,
      visited: Array.isArray(saved.visited) ? saved.visited.filter((key) => keys.has(key)) : [],
      completed: Array.isArray(saved.completed) ? saved.completed.filter((key) => keys.has(key)) : [],
      choices: object(saved.choices), answers: object(saved.answers), reflections: object(saved.reflections),
      pressure: typeof saved.pressure === 'string' ? saved.pressure : '', yearSteps: object(saved.yearSteps),
    };
  } catch { return {}; }
}

function ReservoirBackdrop({ stage }) {
  return <div className={`r4-landscape r4-stage-${stage}`} aria-hidden="true">
    <img src="/root-four-reservoir-valley.png" alt="" />
    <div className="r4-landscape-shade" />
  </div>;
}

function Narration({ lines }) {
  const [state, setState] = useState('idle'); const [muted, setMuted] = useState(false); const [index, setIndex] = useState(0);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const stop = () => { if (supported) window.speechSynthesis.cancel(); setState('idle'); };
  useEffect(() => () => { if (supported) window.speechSynthesis.cancel(); }, [supported]);
  const speakFrom = (start) => {
    if (!supported || muted) return;
    window.speechSynthesis.cancel(); setIndex(start); setState('playing');
    const speakLine = (lineIndex) => {
      if (lineIndex >= lines.length) { setState('idle'); setIndex(0); return; }
      setIndex(lineIndex); const utterance = new SpeechSynthesisUtterance(lines[lineIndex]);
      utterance.rate = 0.92; utterance.pitch = 0.95; utterance.onend = () => speakLine(lineIndex + 1); utterance.onerror = () => setState('idle');
      window.speechSynthesis.speak(utterance);
    }; speakLine(start);
  };
  const pause = () => { window.speechSynthesis.pause(); setState('paused'); };
  const resume = () => { window.speechSynthesis.resume(); setState('playing'); };
  if (!supported) return <p className="r4-audio-note">Narration is unavailable in this browser. Every spoken line is visible below.</p>;
  return <div className="r4-narration" aria-label="Sage narration controls">
    <button type="button" onClick={() => state === 'playing' ? pause() : state === 'paused' ? resume() : speakFrom(index)}>{state === 'playing' ? <Pause /> : <Play />} {state === 'playing' ? 'Pause' : state === 'paused' ? 'Resume' : 'Listen to Sage'}</button>
    <button type="button" onClick={() => speakFrom(0)}><RefreshCw /> Replay</button>
    <button type="button" aria-pressed={muted} onClick={() => { stop(); setMuted((value) => !value); }}>{muted ? <VolumeX /> : <Volume2 />} {muted ? 'Muted' : 'Mute'}</button>
    <span aria-live="polite">{state === 'playing' ? `Playing line ${index + 1} of ${lines.length}` : 'Audio waits for you to start it.'}</span>
  </div>;
}

function Opening({ pressure, onPressure }) {
  return <section className="r4-opening" aria-labelledby="r4-welcome">
    <div className="r4-opening-copy"><p className="r4-eyebrow"><Waves /> The Reservoir Valley</p><h1 id="r4-welcome">{rootFourOpening.title}</h1>{rootFourOpening.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    <div className="r4-opening-sage"><img src="/rootwise-sage-cutout.png" alt="Sage standing beside the reservoir" /><div><p className="r4-eyebrow"><Sparkles /> Sage at the shoreline</p><Narration lines={rootFourOpening.narration} /><div className="r4-spoken-text">{rootFourOpening.narration.map((line) => <p key={line}>“{line}”</p>)}</div></div></div>
    <fieldset className="r4-pressure"><legend>{rootFourOpening.pressurePrompt}</legend><p>There is no right answer. This helps shape your private reflections.</p><div>{rootFourOpening.pressureOptions.map((item) => <button type="button" className={pressure === item ? 'is-selected' : ''} aria-pressed={pressure === item} onClick={() => onPressure(item)} key={item}>{pressure === item ? <Check /> : <ChevronRight />}{item}</button>)}</div></fieldset>
  </section>;
}

function ChapterNav({ activeIndex, completed, visited, onSelect, onClose, closeRef }) {
  return <aside className="r4-chapter-nav"><header><div><p>Root Four</p><h2>Preparedness, Protection &amp; Future Choice</h2></div><button ref={closeRef} type="button" onClick={onClose} aria-label="Close chapter menu"><X /></button></header><nav aria-label="Root Four chapters">{rootFourChapters.map((chapter, index) => <button type="button" className={index === activeIndex ? 'is-active' : ''} aria-current={index === activeIndex ? 'step' : undefined} onClick={() => onSelect(index)} key={chapter.key}><span>{completed.includes(chapter.key) ? <Check /> : visited.includes(chapter.key) ? <Waves /> : chapter.number}</span><span><small>{chapter.season}</small><strong>{chapter.shortTitle}</strong></span><ChevronRight /></button>)}</nav><footer><span>{completed.length} of 10 chapters complete</span><i><b style={{ width: `${completed.length * 10}%` }} /></i></footer></aside>;
}

function YearSimulation({ priority, steps, onStep }) {
  const handled = Object.keys(steps).length;
  const dimensions = {
    preparedness: Object.values(steps).filter((value) => value === 'prepare').length,
    flexibility: Object.values(steps).filter((value) => value === 'adapt').length,
    recovery: Object.values(steps).filter((value) => value === 'recover').length,
  };
  return <section className="r4-card r4-year"><p className="r4-eyebrow"><CloudRain /> Twelve-month simulation</p><h2>The Reservoir Year</h2><p>Choose a response for each month. No response is universally correct; each protects something and asks something else to wait.</p><div className="r4-year-grid">{reservoirYearEvents.map((event, index) => <article className={steps[index] ? 'is-handled' : ''} key={event.month}><header><span>{String(index + 1).padStart(2, '0')}</span><div><small>{event.month}</small><h3>{event.title}</h3></div></header><p>{event.detail}</p><div><button type="button" className={steps[index] === 'prepare' ? 'is-selected' : ''} onClick={() => onStep(index, 'prepare')}>Use preparation</button><button type="button" className={steps[index] === 'adapt' ? 'is-selected' : ''} onClick={() => onStep(index, 'adapt')}>Adapt the plan</button><button type="button" className={steps[index] === 'recover' ? 'is-selected' : ''} onClick={() => onStep(index, 'recover')}>Protect recovery</button></div>{steps[index] && <p className="r4-month-result">This response emphasizes {steps[index] === 'prepare' ? 'readiness already built' : steps[index] === 'adapt' ? 'flexibility under new information' : 'capacity after disruption'}. Another choice could also fit different priorities.</p>}</article>)}</div><div className="r4-year-summary" aria-live="polite"><strong>{handled} of 12 months explored</strong><div><span>Preparedness <b>{dimensions.preparedness}</b></span><span>Flexibility <b>{dimensions.flexibility}</b></span><span>Recovery <b>{dimensions.recovery}</b></span></div><p>Sage: “Your guiding priority is {priority ? priority.replace('-', ' ') : 'still open'}. These dimensions are a map of your choices, not a grade.”</p></div></section>;
}

function Chapter({ chapter, choice, answer, reflection, pressure, yearSteps, onChoice, onAnswer, onReflection, onYearStep }) {
  const chosen = chapter.activity.options.find((item) => item.id === choice); const checked = chapter.check.options.find((item) => item.id === answer);
  return <>
    <section className="r4-promise"><p className="r4-eyebrow"><Target /> Chapter promise</p><h1>{chapter.promise}</h1><span>Chapter {chapter.number} of 10 · {chapter.season}</span></section>
    <section className="r4-card r4-sage-open"><img src="/rootwise-sage-cutout.png" alt="" /><div><p className="r4-eyebrow"><Sparkles /> Sage opens the path</p><blockquote>“{chapter.sageOpen}”</blockquote><Narration lines={[chapter.sageOpen, chapter.close]} /></div></section>
    <section className="r4-card"><p className="r4-eyebrow"><Sprout /> Ivy &amp; Eli</p><h2>{chapter.shortTitle}</h2><div className="r4-story">{chapter.story.map(([speaker, text], index) => speaker === 'narration' ? <p key={index}>{text}</p> : <blockquote className={speaker === 'Sage' ? 'is-sage' : ''} key={index}><cite>{speaker}</cite><p>“{text}”</p></blockquote>)}</div></section>
    <section className="r4-card r4-translation"><p className="r4-eyebrow"><Waves /> Money translation</p><h2>What the story reveals</h2><p>{chapter.translation}</p></section>
    <section className="r4-card r4-deep"><p className="r4-eyebrow"><Waves /> Why it matters</p><h2>Look beneath the surface</h2><div>{chapter.concepts.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className="r4-card r4-activity"><p className="r4-eyebrow"><Target /> Interactive scenario</p><h2>{chapter.activity.prompt}</h2><p>{chapter.activity.setup}</p><div className="r4-options">{chapter.activity.options.map((item) => <button type="button" className={choice === item.id ? 'is-selected' : ''} aria-pressed={choice === item.id} onClick={() => onChoice(item.id)} key={item.id}>{choice === item.id ? <Check /> : <ArrowRight />}{item.label}</button>)}</div>{chosen && <div className="r4-consequence" aria-live="polite"><div><strong>What this protects</strong><p>{chosen.consequence}</p></div><blockquote><strong>Sage asks</strong><p>“{chosen.sage}”</p></blockquote></div>}</section>
    {chapter.activity.type === 'year' && <YearSimulation priority={choice} steps={yearSteps} onStep={onYearStep} />}
    <section className="r4-card r4-reflection"><div><p className="r4-eyebrow"><MessageCircle /> Private reflection</p><h2>Connect the idea to your life</h2>{pressure && <p className="r4-personalized">Earlier, you named <strong>{pressure.toLowerCase()}</strong> as a source of pressure. You can use that lens here—or ignore it.</p>}<p>{chapter.reflection}</p><label htmlFor={`r4-reflection-${chapter.key}`}>Optional response<textarea id={`r4-reflection-${chapter.key}`} value={reflection || ''} rows={5} onChange={(event) => onReflection(event.target.value)} placeholder="Saved only on this device. Do not include sensitive financial details." /></label></div><aside><strong>Privacy note</strong><p>Use ranges, examples, or no written response at all. Exact income, balances, debt, and medical details are not needed.</p></aside></section>
    <section className="r4-card r4-check"><p className="r4-eyebrow"><CircleHelp /> Root check</p><h2>{chapter.check.prompt}</h2><div className="r4-options">{chapter.check.options.map((item) => <button type="button" className={answer === item.id ? 'is-selected' : ''} aria-pressed={answer === item.id} onClick={() => onAnswer(item.id)} key={item.id}>{answer === item.id ? <Check /> : <ChevronRight />}{item.label}</button>)}</div>{checked && <div className={checked.isCorrect ? 'r4-feedback is-strong' : 'r4-feedback'} aria-live="polite"><strong>{checked.isCorrect ? 'That reasoning holds' : 'Look beneath the first answer'}</strong><p>{checked.feedback}</p></div>}</section>
    <section className="r4-next"><Sparkles /><div><p className="r4-eyebrow">Sage closes the chapter</p><blockquote>“{chapter.close}”</blockquote>{chapter.closingLines?.map((line) => <p key={line}>“{line}”</p>)}</div></section>
    {chapter.closingLines && <p className="r4-learner-statement">Every dollar I prepare gives tomorrow one more choice.</p>}
  </>;
}

export default function RootFourValley({ go }) {
  const [saved] = useState(readProgress); const [activeIndex, setActiveIndex] = useState(saved.activeIndex || 0);
  const [visited, setVisited] = useState(saved.visited?.length ? saved.visited : [rootFourChapters[0].key]); const [completed, setCompleted] = useState(saved.completed || []);
  const [choices, setChoices] = useState(saved.choices || {}); const [answers, setAnswers] = useState(saved.answers || {}); const [reflections, setReflections] = useState(saved.reflections || {});
  const [pressure, setPressure] = useState(saved.pressure || ''); const [yearSteps, setYearSteps] = useState(saved.yearSteps || {}); const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef(null); const closeRef = useRef(null); const chapter = rootFourChapters[activeIndex]; const correct = chapter.check.options.find((item) => item.isCorrect)?.id;
  const ready = Boolean(choices[chapter.key] && answers[chapter.key] === correct && (chapter.key !== 'reservoir-year' || Object.keys(yearSteps).length === 12));
  useEffect(() => { localStorage.setItem(ROOT_FOUR_PROGRESS_KEY, JSON.stringify({ activeIndex, visited, completed, choices, answers, reflections, pressure, yearSteps })); }, [activeIndex, visited, completed, choices, answers, reflections, pressure, yearSteps]);
  useEffect(() => { if (!navOpen) return undefined; closeRef.current?.focus(); const onKey = (event) => { if (event.key === 'Escape') { setNavOpen(false); menuRef.current?.focus(); } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [navOpen]);
  const select = (index) => { const next = Math.max(0, Math.min(index, 9)); setActiveIndex(next); setVisited((items) => items.includes(rootFourChapters[next].key) ? items : [...items, rootFourChapters[next].key]); setNavOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toggleComplete = () => setCompleted((items) => items.includes(chapter.key) ? items.filter((key) => key !== chapter.key) : [...items, chapter.key]);
  return <main className="root-four-valley"><ReservoirBackdrop stage={activeIndex} /><header className="r4-topbar"><button type="button" onClick={() => go('dashboard')}><ArrowLeft /> The Grove</button><button type="button" className="r4-brand" onClick={() => go('home')} aria-label="RootWise home"><ApprovedArtwork variant="tree" /><span><strong>Root$Wise</strong><small>Root Four · Preparedness, Protection &amp; Future Choice</small></span></button><button ref={menuRef} type="button" onClick={() => setNavOpen(true)} aria-expanded={navOpen} aria-controls="r4-chapter-navigation"><Menu /> Chapters</button></header><div className="r4-progress" role="progressbar" aria-label="Root Four progress" aria-valuemin={0} aria-valuemax={10} aria-valuenow={completed.length}><i style={{ width: `${completed.length * 10}%` }} /></div>
    {navOpen && <button type="button" className="r4-nav-scrim" onClick={() => setNavOpen(false)} aria-label="Close chapter menu" />}
    <div className="r4-shell"><div id="r4-chapter-navigation" className={navOpen ? 'r4-nav-wrap is-open' : 'r4-nav-wrap'}><ChapterNav activeIndex={activeIndex} completed={completed} visited={visited} onSelect={select} onClose={() => setNavOpen(false)} closeRef={closeRef} /></div><article className="r4-lesson" key={chapter.key}>{activeIndex === 0 && <Opening pressure={pressure} onPressure={setPressure} />}<Chapter chapter={chapter} choice={choices[chapter.key]} answer={answers[chapter.key]} reflection={reflections[chapter.key]} pressure={pressure} yearSteps={yearSteps} onChoice={(value) => setChoices((items) => ({ ...items, [chapter.key]: value }))} onAnswer={(value) => setAnswers((items) => ({ ...items, [chapter.key]: value }))} onReflection={(value) => setReflections((items) => ({ ...items, [chapter.key]: value }))} onYearStep={(index, value) => setYearSteps((items) => ({ ...items, [index]: value }))} /><footer className="r4-footer"><button type="button" onClick={() => select(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft /> Previous</button><button type="button" className={completed.includes(chapter.key) ? 'is-complete' : ''} onClick={toggleComplete} disabled={!completed.includes(chapter.key) && !ready} aria-pressed={completed.includes(chapter.key)}>{completed.includes(chapter.key) ? <Check /> : <CheckCircle2 />}{completed.includes(chapter.key) ? 'Chapter complete' : ready ? 'Complete chapter' : chapter.key === 'reservoir-year' ? 'Explore year & check' : 'Finish scenario & check'}</button><button type="button" onClick={() => activeIndex === 9 ? go('dashboard') : select(activeIndex + 1)}>{activeIndex === 9 ? 'Return to Grove' : 'Next chapter'} <ArrowRight /></button></footer></article></div>
  </main>;
}
