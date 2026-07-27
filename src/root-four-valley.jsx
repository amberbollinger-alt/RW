import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, CircleHelp,
  CloudRain, Menu, MessageCircle, Play, Sparkles, Sprout, Target, Waves, X,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import { reservoirYearEvents, rootFourRootsData as rootFourChapters, rootFourOpening } from './root-four-roots-data';
import { queueSageVoice } from './sage-voice-events';
import './root-four.css';

export const ROOT_FOUR_PROGRESS_KEY = 'rootwise_root_four_reservoir_progress_v2';

function object(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }

function readProgress() {
  try {
    const saved = object(JSON.parse(localStorage.getItem(ROOT_FOUR_PROGRESS_KEY) || '{}'));
    const keys = new Set(rootFourChapters.map((chapter) => chapter.key));
    const choices = object(saved.choices); const answers = object(saved.answers); const reflections = object(saved.reflections);
    const applicationStatus = object(saved.applicationStatus); const yearSteps = object(saved.yearSteps);
    const completed = Array.isArray(saved.completed) ? saved.completed.filter((key) => {
      const chapter = rootFourChapters.find((item) => item.key === key);
      const correct = chapter?.check.options.find((item) => item.isCorrect)?.id;
      const applicationDone = applicationStatus[key] === 'written' || applicationStatus[key] === 'skipped';
      const yearDone = chapter?.activity.type !== 'year' || Object.keys(yearSteps).length === 12;
      return keys.has(key) && choices[key] && answers[key] === correct && applicationDone && yearDone;
    }) : [];
    return {
      activeIndex: Number.isInteger(saved.activeIndex) ? Math.max(0, Math.min(saved.activeIndex, rootFourChapters.length - 1)) : 0,
      visited: Array.isArray(saved.visited) ? saved.visited.filter((key) => keys.has(key)) : [],
      completed, choices, answers, reflections, applicationStatus,
      pressure: typeof saved.pressure === 'string' ? saved.pressure : '', yearSteps,
    };
  } catch { return {}; }
}

function ReservoirBackdrop({ stage }) {
  return <div className={`r4-landscape r4-stage-${stage}`} aria-hidden="true">
    <img src="/root-four-reservoir-valley.png" alt="" />
    <div className="r4-landscape-shade" />
  </div>;
}

function Learning({ chapter }) {
  return <section className="r4-card r4-learning">
    <header><p className="r4-eyebrow"><Waves /> Three levels of adult understanding</p><h2>Keep the lesson. Deepen how you use it.</h2><p>The Reservoir Valley now carries each lesson through three connected levels: understand what is happening, recognize it in adult financial life, then examine what is directing the decision.</p></header>
    <div>{chapter.adultLevels.map((level) => <article className="r4-understanding-level" key={level.number}><span>{level.number}</span><div><p className="r4-level-question">Level {Number(level.number)} · {level.name} · {level.question}</p><h3>{level.title}</h3>{level.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{level.details?.length ? <div className="r4-level-details">{level.details.map((detail) => <section key={detail.title}><strong>{detail.title}</strong><p>{detail.body}</p></section>)}</div> : null}{level.examples?.length ? <ul className="r4-level-list">{level.examples.map((item) => <li key={item}>{item}</li>)}</ul> : null}{level.prompts?.length ? <ol className="r4-level-list r4-level-prompts">{level.prompts.map((item) => <li key={item}>{item}</li>)}</ol> : null}</div></article>)}</div>
  </section>;
}

function Narration({ lines }) {
  return <div className="r4-narration" aria-label="Sage narration controls">
    <button type="button" onClick={() => queueSageVoice(lines.join(' '), 'Root Four narration is ready.')}><Play /> Listen to Sage</button>
    <span>Opens the shared Sage player. Audio waits for you to start it.</span>
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
  return <aside className="r4-chapter-nav"><header><div><p>Root Four</p><h2>Saving, Preparedness &amp; Resilience</h2></div><button ref={closeRef} type="button" onClick={onClose} aria-label="Close lesson menu"><X /></button></header><nav aria-label="Root Four lessons">{rootFourChapters.map((chapter, index) => <button type="button" className={index === activeIndex ? 'is-active' : ''} aria-current={index === activeIndex ? 'step' : undefined} onClick={() => onSelect(index)} key={chapter.key}><span>{completed.includes(chapter.key) ? <Check /> : visited.includes(chapter.key) ? <Waves /> : chapter.number}</span><span><small>{chapter.season}</small><strong>{chapter.shortTitle}</strong></span><ChevronRight /></button>)}</nav><footer><span>{completed.length} of {rootFourChapters.length} lessons complete</span><i><b style={{ width: `${completed.length / rootFourChapters.length * 100}%` }} /></i></footer></aside>;
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

function Chapter({ chapter, choice, answer, reflection, applicationStatus, pressure, yearSteps, onChoice, onAnswer, onReflection, onApplicationStatus, onYearStep }) {
  const chosen = chapter.activity.options.find((item) => item.id === choice); const checked = chapter.check.options.find((item) => item.id === answer);
  return <>
    <section className="r4-promise"><p className="r4-eyebrow"><Target /> Lesson promise</p><h1>{chapter.promise}</h1><span>Lesson {chapter.number} of {rootFourChapters.length} · {chapter.season}</span></section>
    <section className="r4-card r4-sage-open"><img src="/rootwise-sage-cutout.png" alt="" /><div><p className="r4-eyebrow"><Sparkles /> Sage opens the path</p><blockquote>“{chapter.sageOpen}”</blockquote><Narration lines={[chapter.sageOpen]} /></div></section>
    <section className="r4-card"><p className="r4-eyebrow"><Sprout /> Ivy, Eli &amp; Sage</p><h2>{chapter.storyTitle}</h2><div className="r4-story">{chapter.story.map(([speaker, text], index) => speaker === 'narration' ? <p key={index}>{text}</p> : <blockquote className={speaker === 'Sage' ? 'is-sage' : ''} key={index}><cite>{speaker}</cite><p>“{text}”</p></blockquote>)}</div></section>
    <Learning chapter={chapter} />
    <section className="r4-card r4-check"><p className="r4-eyebrow"><CircleHelp /> Practical Check</p><h2>{chapter.check.prompt}</h2><div className="r4-options">{chapter.check.options.map((item) => <button type="button" className={answer === item.id ? 'is-selected' : ''} aria-pressed={answer === item.id} onClick={() => onAnswer(item.id)} key={item.id}>{answer === item.id ? <Check /> : <ChevronRight />}{item.label}</button>)}</div>{checked && <div className={checked.isCorrect ? 'r4-feedback is-strong' : 'r4-feedback'} aria-live="polite"><strong>{checked.isCorrect ? 'That reasoning holds' : 'Look beneath the first answer'}</strong><p>{checked.feedback}</p></div>}</section>
    <section className="r4-card r4-activity"><p className="r4-eyebrow"><Target /> Apply It Now</p><h2>{chapter.activity.prompt}</h2><p>{chapter.activity.setup}</p><div className="r4-options">{chapter.activity.options.map((item) => <button type="button" className={choice === item.id ? 'is-selected' : ''} aria-pressed={choice === item.id} onClick={() => onChoice(item.id)} key={item.id}>{choice === item.id ? <Check /> : <ArrowRight />}{item.label}</button>)}</div>{chosen && <div className="r4-consequence" aria-live="polite"><div><strong>What follows</strong><p>{chosen.consequence}</p></div><blockquote><strong>Sage</strong><p>“{chosen.sage}”</p></blockquote></div>}</section>
    {chapter.activity.type === 'year' && <YearSimulation priority={choice} steps={yearSteps} onStep={onYearStep} />}
    <section className="r4-card r4-reflection"><div><p className="r4-eyebrow"><MessageCircle /> Apply It Now · Private reflection</p><h2>Connect the lesson to your life</h2>{pressure && <p className="r4-personalized">Earlier, you named <strong>{pressure.toLowerCase()}</strong> as a source of pressure. You can use that lens here—or ignore it.</p>}<p>{chapter.reflection}</p><label htmlFor={`r4-reflection-${chapter.key}`}>Your private reflection<textarea id={`r4-reflection-${chapter.key}`} value={reflection || ''} rows={5} onChange={(event) => { onReflection(event.target.value); if (applicationStatus) onApplicationStatus(''); }} placeholder="Saved only on this device. Do not include sensitive financial details." /></label><div className="r4-application-actions"><button type="button" disabled={!String(reflection || '').trim()} onClick={() => onApplicationStatus('written')}><Check /> Save reflection</button><button type="button" onClick={() => onApplicationStatus('skipped')}>Continue without writing</button></div>{applicationStatus && <p className="r4-application-status" aria-live="polite"><CheckCircle2 /> {applicationStatus === 'written' ? 'Reflection saved for this lesson.' : 'Intentional skip saved. You can return at any time.'}</p>}</div><aside><strong>Privacy note</strong><p>Use ranges, fictional examples, or no written response at all. Exact income, balances, debt, and medical details are not needed.</p></aside></section>
    <section className="r4-card r4-root-growth"><p className="r4-eyebrow"><CheckCircle2 /> Root Growth</p><h2>{chapter.growth}</h2><p>{chapter.canonicalTruth}</p></section>
    {chapter.closingLines?.length ? <section className="r4-card r4-closing-lines"><p className="r4-eyebrow"><Waves /> At the overlook</p>{chapter.closingLines.map((line) => <p key={line}>{line}</p>)}</section> : null}
    <section className="r4-next"><Waves /><div><p className="r4-eyebrow">The water continues</p><p>{chapter.transition}</p></div></section>
  </>;
}

export default function RootFourValley({ go }) {
  const [saved] = useState(readProgress); const [activeIndex, setActiveIndex] = useState(saved.activeIndex || 0);
  const [visited, setVisited] = useState(saved.visited?.length ? saved.visited : [rootFourChapters[0].key]); const [completed, setCompleted] = useState(saved.completed || []);
  const [choices, setChoices] = useState(saved.choices || {}); const [answers, setAnswers] = useState(saved.answers || {}); const [reflections, setReflections] = useState(saved.reflections || {});
  const [applicationStatus, setApplicationStatus] = useState(saved.applicationStatus || {}); const [pressure, setPressure] = useState(saved.pressure || ''); const [yearSteps, setYearSteps] = useState(saved.yearSteps || {}); const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef(null); const closeRef = useRef(null); const chapter = rootFourChapters[activeIndex]; const correct = chapter.check.options.find((item) => item.isCorrect)?.id;
  const applicationDone = applicationStatus[chapter.key] === 'written' || applicationStatus[chapter.key] === 'skipped';
  const ready = Boolean(choices[chapter.key] && answers[chapter.key] === correct && applicationDone && (chapter.activity.type !== 'year' || Object.keys(yearSteps).length === 12));
  useEffect(() => { localStorage.setItem(ROOT_FOUR_PROGRESS_KEY, JSON.stringify({ activeIndex, visited, completed, choices, answers, reflections, applicationStatus, pressure, yearSteps })); }, [activeIndex, visited, completed, choices, answers, reflections, applicationStatus, pressure, yearSteps]);
  useEffect(() => { if (!navOpen) return undefined; closeRef.current?.focus(); const onKey = (event) => { if (event.key === 'Escape') { setNavOpen(false); menuRef.current?.focus(); } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [navOpen]);
  const select = (index) => { const next = Math.max(0, Math.min(index, rootFourChapters.length - 1)); setActiveIndex(next); setVisited((items) => items.includes(rootFourChapters[next].key) ? items : [...items, rootFourChapters[next].key]); setNavOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toggleComplete = () => setCompleted((items) => items.includes(chapter.key) ? items.filter((key) => key !== chapter.key) : [...items, chapter.key]);
  return <main className="root-four-valley"><ReservoirBackdrop stage={Math.round(activeIndex * 9 / (rootFourChapters.length - 1))} /><header className="r4-topbar"><button type="button" onClick={() => go('dashboard')}><ArrowLeft /> The Grove</button><button type="button" className="r4-brand" onClick={() => go('home')} aria-label="RootWise home"><ApprovedArtwork variant="tree" /><span><strong>Root$Wise</strong><small>Root Four · Saving, Preparedness &amp; Resilience</small></span></button><button ref={menuRef} type="button" onClick={() => setNavOpen(true)} aria-expanded={navOpen} aria-controls="r4-chapter-navigation"><Menu /> Lessons</button></header><div className="r4-progress" role="progressbar" aria-label="Root Four progress" aria-valuemin={0} aria-valuemax={rootFourChapters.length} aria-valuenow={completed.length}><i style={{ width: `${completed.length / rootFourChapters.length * 100}%` }} /></div>
    <div className="r4-shell">
      {navOpen && <button type="button" className="r4-nav-scrim" onClick={() => { setNavOpen(false); menuRef.current?.focus(); }} aria-label="Close chapter menu" />}
      <div id="r4-chapter-navigation" className={navOpen ? 'r4-nav-wrap is-open' : 'r4-nav-wrap'}><ChapterNav activeIndex={activeIndex} completed={completed} visited={visited} onSelect={select} onClose={() => setNavOpen(false)} closeRef={closeRef} /></div>
      <article className="r4-lesson" key={chapter.key}>
        {activeIndex === 0 && <Opening pressure={pressure} onPressure={setPressure} />}
        <Chapter chapter={chapter} choice={choices[chapter.key]} answer={answers[chapter.key]} reflection={reflections[chapter.key]} applicationStatus={applicationStatus[chapter.key]} pressure={pressure} yearSteps={yearSteps} onChoice={(value) => setChoices((items) => ({ ...items, [chapter.key]: value }))} onAnswer={(value) => setAnswers((items) => ({ ...items, [chapter.key]: value }))} onReflection={(value) => setReflections((items) => ({ ...items, [chapter.key]: value }))} onApplicationStatus={(value) => setApplicationStatus((items) => ({ ...items, [chapter.key]: value }))} onYearStep={(index, value) => setYearSteps((items) => ({ ...items, [index]: value }))} />
        <footer className="r4-footer"><button type="button" onClick={() => select(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft /> Previous</button><button type="button" className={completed.includes(chapter.key) ? 'is-complete' : ''} onClick={toggleComplete} disabled={!completed.includes(chapter.key) && !ready} aria-pressed={completed.includes(chapter.key)}>{completed.includes(chapter.key) ? <Check /> : <CheckCircle2 />}{completed.includes(chapter.key) ? 'Lesson complete' : ready ? 'Complete lesson' : chapter.activity.type === 'year' ? 'Finish check, choice, year & application' : 'Finish check, choice & application'}</button><button type="button" onClick={() => activeIndex === rootFourChapters.length - 1 ? go('dashboard') : select(activeIndex + 1)}>{activeIndex === rootFourChapters.length - 1 ? 'Return to Grove' : 'Next lesson'} <ArrowRight /></button></footer>
      </article>
    </div>
  </main>;
}
