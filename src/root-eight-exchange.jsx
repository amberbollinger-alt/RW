import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronRight,
  CircleHelp, FileSearch, Gauge, Landmark, LoaderCircle, MapPinned, Menu,
  MessageCircle, Play, Route, Send, ShieldCheck, Sparkles, Sprout,
  TimerReset, TrainFront, X,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import { queueSageVoice } from './sage-voice-events';
import {
  ROOT_EIGHT_PROGRESS_KEY, rootEightLessons, rootEightNarration, rootEightOpening,
  rootEightParts, rootEightQuickPrompts,
} from './root-eight-data';
import './root-eight.css';

function safeObject(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }

function readProgress() {
  try {
    const parsed = safeObject(JSON.parse(localStorage.getItem(ROOT_EIGHT_PROGRESS_KEY) || '{}'));
    const valid = new Set(rootEightLessons.map((lesson) => lesson.key));
    const answers = safeObject(parsed.answers); const scenarios = safeObject(parsed.scenarios);
    const mirrors = safeObject(parsed.mirrors); const workbooks = safeObject(parsed.workbooks); const scans = safeObject(parsed.scans);
    const completed = Array.isArray(parsed.completed) ? parsed.completed.filter((key) => {
      const lesson = rootEightLessons.find((item) => item.key === key);
      const correct = lesson?.check.options.find((option) => option.isCorrect)?.id;
      return valid.has(key) && answers[key] === correct && scenarios[key]
        && ['saved', 'skipped'].includes(mirrors[key]?.status)
        && ['saved', 'skipped'].includes(workbooks[key]?.status)
        && Array.isArray(scans[key]) && scans[key].length === 4;
    }) : [];
    return {
      activeIndex: Number.isInteger(parsed.activeIndex) ? Math.min(Math.max(parsed.activeIndex, 0), rootEightLessons.length - 1) : 0,
      visited: Array.isArray(parsed.visited) ? parsed.visited.filter((key) => valid.has(key)) : [],
      answers, scenarios, mirrors, workbooks, scans, completed,
    };
  } catch { return {}; }
}

function ExchangeBackdrop() {
  return <div className="r8-backdrop" aria-hidden="true"><img src="/root-eight-ownership-exchange.jpg" alt="" /><div /></div>;
}

function Paragraphs({ items, className = '' }) {
  return <div className={className}>{items.map((item, index) => <p key={`${index}-${item.slice(0, 24)}`}>{item}</p>)}</div>;
}

function LessonNav({ activeIndex, visited, completed, onSelect, onClose, closeRef }) {
  return <aside className="r8-nav">
    <header><div><p>Root Eight</p><h2>Ownership, Investing &amp; the Future</h2></div><button ref={closeRef} type="button" onClick={onClose} aria-label="Close lesson menu"><X /></button></header>
    <nav aria-label="Root Eight lessons">{rootEightParts.map((part) => <section key={part.number}>
      <h3><span>Part {part.number}</span>{part.title}</h3>
      {rootEightLessons.filter((lesson) => lesson.part.number === part.number).map((lesson) => {
        const index = lesson.number - 1;
        return <button type="button" className={activeIndex === index ? 'is-active' : ''} onClick={() => onSelect(index)} aria-current={activeIndex === index ? 'step' : undefined} key={lesson.key}>
          <span>{completed.includes(lesson.key) ? <Check /> : visited.includes(lesson.key) ? <Landmark /> : lesson.displayNumber}</span><strong>{lesson.title}</strong><ChevronRight />
        </button>;
      })}
    </section>)}</nav>
    <footer><span>{completed.length} of {rootEightLessons.length} lessons complete</span><i><b style={{ width: `${completed.length / rootEightLessons.length * 100}%` }} /></i></footer>
  </aside>;
}

function Opening() {
  const [answer, setAnswer] = useState('');
  const choices = ['Protect a future goal', 'Understand what I would own', 'Keep money available when I need it', 'Accept uncertainty without pretending it is certainty', 'I am not sure what the money needs to do yet'];
  return <section className="r8-opening">
    <figure className="r8-exchange-scene">
      <img src="/root-eight-ownership-exchange.jpg" alt="Ivy and Eli at Ownership Exchange beneath the city lights" />
    </figure>
    <div className="r8-opening-copy"><p className="r8-eyebrow"><MapPinned /> Root Eight · The Ownership Exchange</p><h1>Ownership, Investing &amp; the Future</h1><blockquote>{rootEightOpening.coreQuestion}</blockquote></div>
    <div className="r8-opening-story"><div><p className="r8-eyebrow"><Sparkles /> Ivy, Eli &amp; Sage arrive</p><h2>Every future claim is advertising at once. The useful route survives purpose, evidence, risk, and responsibility.</h2><Paragraphs items={rootEightOpening.story} /></div><img src="/rootwise-sage-cutout.png" alt="Sage, the RootWise guide" /></div>
    <fieldset className="r8-opening-choice"><legend>When you imagine owning or investing for the future, which question appears first?</legend><p>No answer is graded. Root Eight will test what your first answer solves, costs, and leaves untouched.</p><div>{choices.map((choice) => <button type="button" className={answer === choice ? 'is-selected' : ''} onClick={() => setAnswer(choice)} key={choice}>{answer === choice ? <Check /> : <ArrowRight />}{choice}</button>)}</div>{answer && <p className="r8-opening-response">“Keep that answer. Root Eight will help you see what it solves, what it costs, and what it leaves untouched.”</p>}</fieldset>
    <details className="r8-promise"><summary>Open the complete Root Eight learning promise</summary><p>{rootEightOpening.promise}</p></details>
  </section>;
}

function SageOpening({ lesson }) {
  return <section className="r8-card r8-sage-open"><img src="/rootwise-sage-cutout.png" alt="" /><div><p className="r8-eyebrow"><Sparkles /> Sage</p><blockquote>{lesson.sageOpen}</blockquote><button type="button" onClick={() => queueSageVoice(rootEightNarration(lesson), `Lesson ${lesson.number} narration is ready.`)}><Play /> Listen to this lesson</button><small>Direct mentor narration. Pause, resume, or replay from the Sage voice controls.</small></div></section>;
}

function AdultLevels({ lesson }) {
  return <section className="r8-card r8-levels"><header><p className="r8-eyebrow"><Route /> Understand · Recognize · Examine</p><h2>Keep the Exchange story in view while the complete ownership route becomes visible.</h2></header><div>
    <article><span>01</span><div><p className="r8-level-label">Understand · What is it?</p><h3>The ownership concept</h3><ul>{lesson.understand.map((item) => <li key={item}>{item}</li>)}</ul></div></article>
    <article><span>02</span><div><p className="r8-level-label">Recognize · Where does it appear?</p><h3>Where the route appears in real life</h3><ul>{lesson.recognize.map((item) => <li key={item}>{item}</li>)}</ul></div></article>
    <article><span>03</span><div><p className="r8-level-label">Examine · What is driving the choice?</p><h3>What may be directing the decision</h3><ul>{lesson.examine.map((item) => <li key={item}>{item}</li>)}</ul></div></article>
  </div></section>;
}

const scanLayers = [
  ['purpose', 'Purpose', 'What future job is this money meant to perform, and when might it be needed?'],
  ['claim', 'Claim', 'What exactly is owned, lent, pooled, rented, or promised?'],
  ['risk', 'Risk & Return', 'What can change the value, repayment, purchasing power, or access path?'],
  ['load', 'Cost & Capacity', 'What fees, taxes, dependence, time, responsibility, and exit conditions come with it?'],
];

function OwnershipScan({ value = [], onChange }) {
  return <section className="r8-card r8-scan"><p className="r8-eyebrow"><Route /> Ownership Scan</p><h2>Activate all four lenses before you leave the lesson.</h2><div>{scanLayers.map(([id, title, body]) => {
    const active = value.includes(id);
    return <button type="button" className={active ? 'is-selected' : ''} aria-pressed={active} onClick={() => onChange(active ? value.filter((item) => item !== id) : [...value, id])} key={id}><span>{active ? <Check /> : <FileSearch />}</span><strong>{title}</strong><small>{body}</small></button>;
  })}</div>{value.length === 4 && <p className="r8-scan-result"><Gauge /> The complete ownership map is visible.</p>}</section>;
}

function DecisionPractice({ lesson, answer, scenario, onAnswer, onScenario }) {
  const checked = lesson.check.options.find((option) => option.id === answer);
  const scenarioChoice = lesson.scenario.options.find((option) => option.id === scenario);
  return <>
    <section className="r8-card r8-check"><p className="r8-eyebrow"><CircleHelp /> Knowledge Check</p><h2>{lesson.check.prompt}</h2><div className="r8-options">{lesson.check.options.map((option) => <button type="button" className={answer === option.id ? 'is-selected' : ''} aria-pressed={answer === option.id} onClick={() => onAnswer(option.id)} key={option.id}><span>{answer === option.id ? <Check /> : <ArrowRight />}</span>{option.label}</button>)}</div>{checked && <div className={checked.isCorrect ? 'r8-feedback is-correct' : 'r8-feedback'} aria-live="polite"><strong>{checked.isCorrect ? 'The full ownership claim is in frame' : 'One part of the route is still hidden'}</strong><p>{checked.isCorrect ? 'This answer keeps purpose, claim, cost, access, capacity, and uncertainty connected.' : 'Return to the story and choose the answer that keeps the complete claim and tradeoff visible.'}</p></div>}</section>
    <section className="r8-card r8-scenario"><p className="r8-eyebrow"><TrainFront /> Ownership Decision Drill</p><h2>{lesson.scenario.prompt}</h2><div className="r8-options">{lesson.scenario.options.map((option) => <button type="button" className={scenario === option.id ? 'is-selected' : ''} aria-pressed={scenario === option.id} onClick={() => onScenario(option.id)} key={option.id}><span>{scenario === option.id ? <Check /> : <ArrowRight />}</span>{option.label}</button>)}</div>{scenarioChoice && <div className={scenarioChoice.strength === 'strong' ? 'r8-feedback is-correct' : 'r8-feedback'} aria-live="polite"><strong>{scenarioChoice.strength === 'strong' ? 'This preserves informed choice' : 'An Exchange gate still needs attention'}</strong><p>{scenarioChoice.feedback}</p></div>}</section>
  </>;
}

function PrivatePanel({ lesson, kind, value, onChange }) {
  const current = value || { text: '', status: '' };
  const mirror = kind === 'mirror';
  const title = mirror ? 'Mirror Reflection' : `Apply It Now · ${lesson.workbook}`;
  const prompt = mirror ? lesson.mirror : lesson.workbookPrompt;
  return <section className={`r8-card r8-private ${mirror ? 'is-mirror' : ''}`}><div><p className="r8-eyebrow">{mirror ? <Sparkles /> : <BookOpen />} {title}</p><h2>{prompt}</h2><p>{mirror ? 'Ivy and Eli are mirrors, not answers. Notice your own pattern without grading it.' : 'Use approximate values, ranges, fictional examples, or category names. Keep sensitive details out of this workbook.'}</p><label htmlFor={`r8-${kind}-${lesson.key}`}>{mirror ? 'What did the story reveal?' : 'Your private working note'}<textarea id={`r8-${kind}-${lesson.key}`} rows={5} maxLength={2200} value={current.text || ''} onChange={(event) => onChange({ text: event.target.value, status: current.status === 'saved' ? '' : current.status })} placeholder={mirror ? 'A version of this choice appears in my life when…' : 'Build the map in your own words…'} /></label><div><button type="button" disabled={!String(current.text || '').trim()} onClick={() => onChange({ text: current.text, status: 'saved' })}><CheckCircle2 /> Save on this device</button><button type="button" onClick={() => onChange({ text: current.text || '', status: 'skipped' })}><TimerReset /> Intentionally skip</button></div>{['saved', 'skipped'].includes(current.status) && <p className="r8-private-status"><Check /> {current.status === 'saved' ? 'Saved privately on this device.' : 'Intentionally skipped. You may return at any time.'}</p>}</div><aside><ShieldCheck /><strong>Privacy boundary</strong><p>These entries stay in this browser and are never sent to Ask Sage. Never store Social Security or tax identification numbers, account numbers, exact employer names, confidential agreements, customer identities, tax returns, pay stubs, passwords, verification codes, or private legal case details here.</p></aside></section>;
}

function Sources({ lesson }) {
  const legal = [8, 13, 14, 17, 18].includes(lesson.number);
  return <section className="r8-card r8-sources"><p className="r8-eyebrow"><FileSearch /> Source Desk</p><h2>Verify the rule behind the ownership claim</h2><p>Reviewed against primary public authorities on August 3, 2026. Investment products, account rules, taxes, provider standards, market conditions, and agency guidance can change.</p>{legal && <p className="r8-jurisdiction"><strong>Facts, documents, jurisdiction, and current rules matter.</strong> This lesson is general education and not a personal investment, legal, tax, insurance, or provider conclusion.</p>}<ul>{lesson.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ArrowRight /></a></li>)}</ul></section>;
}

function AskSage({ lesson }) {
  const [threads, setThreads] = useState({}); const [draft, setDraft] = useState(''); const [sending, setSending] = useState(false); const [open, setOpen] = useState(false);
  const toggleRef = useRef(null); const closeRef = useRef(null); const listRef = useRef(null);
  const messages = useMemo(() => threads[lesson.key] || [{ role: 'assistant', content: `We’re at ${lesson.title}. Ask me to separate the purpose, ownership claim, risk, cost, access, and capacity.` }], [threads, lesson]);
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, sending]);
  useEffect(() => { if (!open) return undefined; closeRef.current?.focus(); const prior = document.body.style.overflow; document.body.style.overflow = 'hidden'; const onKey = (event) => { if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } }; window.addEventListener('keydown', onKey); return () => { document.body.style.overflow = prior; window.removeEventListener('keydown', onKey); }; }, [open]);
  const send = async (message) => {
    const clean = message.trim(); if (!clean || sending) return; const next = [...messages, { role: 'user', content: clean }]; setThreads((items) => ({ ...items, [lesson.key]: next })); setDraft(''); setSending(true);
    const controller = new AbortController(); const timeout = window.setTimeout(() => controller.abort(), 22000);
    try {
  const response = await fetch('/api/sage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ root: 'eight', message: clean, lesson: { number: lesson.number, title: lesson.title, story: lesson.story.join(' ').slice(0, 900), connection: lesson.understand.join(' ').slice(0, 900), boundaries: lesson.examine.join(' ').slice(0, 500) }, history: messages.slice(-9) }), signal: controller.signal });
      const payload = await response.json().catch(() => ({})); if (!response.ok || !payload.reply) throw new Error('unavailable'); queueSageVoice(payload.reply, 'Sage answered your Root Eight question.'); setThreads((items) => ({ ...items, [lesson.key]: [...next, { role: 'assistant', content: payload.reply }] }));
    } catch (error) { setThreads((items) => ({ ...items, [lesson.key]: [...next, { role: 'assistant', unavailable: true, content: error?.name === 'AbortError' ? 'That took too long. Your question remains here—please try again in a moment.' : 'The conversation service is not reachable right now. The lesson, source links, private work, and narration remain available.' }] })); }
    finally { window.clearTimeout(timeout); setSending(false); }
  };
  return <><button ref={toggleRef} type="button" className="r8-sage-toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="r8-sage-panel"><MessageCircle /> Ask Sage</button>{open && <button type="button" className="r8-sage-scrim" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage" />}<aside id="r8-sage-panel" className={open ? 'r8-sage is-open' : 'r8-sage'} aria-label="Ask Sage support"><header><div><Sparkles /><span><strong>Ask Sage</strong><small>{lesson.title}</small></span></div><button ref={closeRef} type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage"><X /></button></header><div ref={listRef} className="r8-sage-messages" aria-live="polite">{messages.map((message, index) => <div className={`${message.role} ${message.unavailable ? 'is-unavailable' : ''}`} key={`${lesson.key}-${index}`}><strong>{message.role === 'assistant' ? 'Sage' : 'You'}</strong><p>{message.content}</p></div>)}{sending && <div className="assistant"><LoaderCircle className="r8-spin" /><p>Sage is thinking…</p></div>}</div><div className="r8-quick">{rootEightQuickPrompts.map((prompt) => <button type="button" disabled={sending} onClick={() => send(`${prompt} in ${lesson.title}. Keep the Ownership Exchange story and RootWise boundaries in view.`)} key={prompt}>{prompt}</button>)}</div><form onSubmit={(event) => { event.preventDefault(); send(draft); }}><label htmlFor={`r8-sage-${lesson.key}`}>Ask about this lesson</label><div><textarea id={`r8-sage-${lesson.key}`} rows={3} maxLength={700} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What are you trying to understand?" /><button type="submit" disabled={!draft.trim() || sending} aria-label="Send question"><Send /></button></div></form><footer>Do not share Social Security or tax identification numbers, account numbers, exact employer names, confidential agreements, customer identities, tax returns, pay stubs, passwords, verification codes, or private legal case details. Sage explains the ownership decision; she never chooses an investment, account, provider, asset, platform, or personal tax position.</footer></aside></>;
}

export default function RootEightExchange({ go, initialLessonKey, onLessonChange }) {
  const saved = useMemo(() => readProgress(), []); const requested = rootEightLessons.findIndex((lesson) => lesson.key === initialLessonKey); const startingIndex = requested >= 0 ? requested : saved.activeIndex || 0;
  const [activeIndex, setActiveIndex] = useState(startingIndex); const [visited, setVisited] = useState(() => [...new Set([...(saved.visited || []), rootEightLessons[startingIndex].key])]); const [completed, setCompleted] = useState(saved.completed || []); const [answers, setAnswers] = useState(saved.answers || {}); const [scenarios, setScenarios] = useState(saved.scenarios || {}); const [mirrors, setMirrors] = useState(saved.mirrors || {}); const [workbooks, setWorkbooks] = useState(saved.workbooks || {}); const [scans, setScans] = useState(saved.scans || {}); const [navOpen, setNavOpen] = useState(false); const menuRef = useRef(null); const closeRef = useRef(null);
  const lesson = rootEightLessons[activeIndex]; const correct = lesson.check.options.find((option) => option.isCorrect)?.id;
  const ready = answers[lesson.key] === correct && Boolean(scenarios[lesson.key]) && ['saved', 'skipped'].includes(mirrors[lesson.key]?.status) && ['saved', 'skipped'].includes(workbooks[lesson.key]?.status) && scans[lesson.key]?.length === 4;
  useEffect(() => { localStorage.setItem(ROOT_EIGHT_PROGRESS_KEY, JSON.stringify({ activeIndex, visited, completed, answers, scenarios, mirrors, workbooks, scans })); }, [activeIndex, visited, completed, answers, scenarios, mirrors, workbooks, scans]);
  useEffect(() => { if (!navOpen) return undefined; closeRef.current?.focus(); const onKey = (event) => { if (event.key === 'Escape') { setNavOpen(false); menuRef.current?.focus(); } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [navOpen]);
  const select = (index) => { const next = Math.min(Math.max(index, 0), rootEightLessons.length - 1); if (onLessonChange && next !== activeIndex) { onLessonChange(rootEightLessons[next].key); return; } setActiveIndex(next); setVisited((items) => items.includes(rootEightLessons[next].key) ? items : [...items, rootEightLessons[next].key]); setNavOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toggleComplete = () => setCompleted((items) => items.includes(lesson.key) ? items.filter((key) => key !== lesson.key) : ready ? [...items, lesson.key] : items);
  const treePercent = Math.round(completed.length / rootEightLessons.length * 100);
  const treeStyle = /** @type {import('react').CSSProperties & Record<'--growth', string>} */ ({ '--growth': `${treePercent}%` });
  return <main className="root-eight-exchange"><ExchangeBackdrop /><header className="r8-topbar"><button type="button" onClick={() => go('dashboard')}><ArrowLeft /> The Grove</button><button type="button" className="r8-brand" onClick={() => go('home')} aria-label="RootWise home"><ApprovedArtwork variant="tree" /><span><strong>Root$Wise</strong><small>Root Eight · Ownership, Investing &amp; the Future</small></span></button><button ref={menuRef} type="button" onClick={() => setNavOpen(true)} aria-expanded={navOpen} aria-controls="r8-navigation"><Menu /> Lessons</button></header><div className="r8-progress" role="progressbar" aria-label="Root Eight progress" aria-valuemin={0} aria-valuemax={rootEightLessons.length} aria-valuenow={completed.length}><i style={{ width: `${treePercent}%` }} /></div>
    <div className="r8-shell">{navOpen && <button type="button" className="r8-nav-scrim" onClick={() => { setNavOpen(false); window.setTimeout(() => menuRef.current?.focus(), 0); }} aria-label="Close lesson menu" />}<div id="r8-navigation" className={navOpen ? 'r8-nav-wrap is-open' : 'r8-nav-wrap'}><LessonNav activeIndex={activeIndex} visited={visited} completed={completed} onSelect={select} onClose={() => { setNavOpen(false); window.setTimeout(() => menuRef.current?.focus(), 0); }} closeRef={closeRef} /></div><article className="r8-lesson" key={lesson.key}>{activeIndex === 0 && <Opening />}<section className="r8-lesson-title"><p className="r8-eyebrow">Part {lesson.part.number} · {lesson.part.title}</p><span>Lesson {lesson.displayNumber} of {rootEightLessons.length}</span><h1>{lesson.title}</h1></section><SageOpening lesson={lesson} /><section className="r8-card r8-story"><p className="r8-eyebrow"><Sparkles /> The continuing story · Ivy, Eli &amp; Sage</p><h2>Ownership Exchange remains the teaching mirror.</h2><Paragraphs items={lesson.story} /></section><AdultLevels lesson={lesson} /><OwnershipScan value={scans[lesson.key] || []} onChange={(value) => setScans((items) => ({ ...items, [lesson.key]: value }))} /><DecisionPractice lesson={lesson} answer={answers[lesson.key]} scenario={scenarios[lesson.key]} onAnswer={(value) => setAnswers((items) => ({ ...items, [lesson.key]: value }))} onScenario={(value) => setScenarios((items) => ({ ...items, [lesson.key]: value }))} /><PrivatePanel lesson={lesson} kind="mirror" value={mirrors[lesson.key]} onChange={(value) => setMirrors((items) => ({ ...items, [lesson.key]: value }))} /><PrivatePanel lesson={lesson} kind="workbook" value={workbooks[lesson.key]} onChange={(value) => setWorkbooks((items) => ({ ...items, [lesson.key]: value }))} /><Sources lesson={lesson} /><section className="r8-card r8-growth"><div className="r8-tree-reward" style={treeStyle}><ApprovedArtwork variant="tree" /><span>{treePercent}%</span></div><div><p className="r8-eyebrow"><Sprout /> Root Growth · Exchange route {Math.min(completed.length + (ready && !completed.includes(lesson.key) ? 1 : 0), rootEightLessons.length)} of {rootEightLessons.length}</p><h2>{lesson.growth}</h2><p>{completed.includes(lesson.key) ? 'This ownership capacity is rooted in your Grove.' : ready ? 'Complete the lesson to add this route to your Root Eight tree.' : 'Finish the Ownership Scan, knowledge check, decision drill, mirror, and application panel to root this capacity.'}</p></div></section><section className="r8-next"><Landmark /><div><p className="r8-eyebrow">Next Exchange route</p><p>{lesson.transition}</p></div></section><footer className="r8-footer"><button type="button" onClick={() => select(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft /> Previous</button><button type="button" className={completed.includes(lesson.key) ? 'is-complete' : ''} onClick={toggleComplete} disabled={!completed.includes(lesson.key) && !ready} aria-pressed={completed.includes(lesson.key)}>{completed.includes(lesson.key) ? <Check /> : <CheckCircle2 />}{completed.includes(lesson.key) ? 'Lesson rooted' : ready ? 'Root this lesson' : 'Finish the full lesson loop'}</button><button type="button" onClick={() => activeIndex === rootEightLessons.length - 1 ? go('/roots/nine') : select(activeIndex + 1)}>{activeIndex === rootEightLessons.length - 1 ? 'Enter Root Nine' : 'Next lesson'} <ArrowRight /></button></footer></article></div><AskSage lesson={lesson} />
  </main>;
}
