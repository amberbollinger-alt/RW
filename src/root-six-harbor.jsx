import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Anchor, ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronRight,
  CircleHelp, FileSearch, Landmark, LoaderCircle, Menu, MessageCircle, Play,
  Radar, Send, ShieldCheck, Sparkles, Sprout, TimerReset, X,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import { queueSageVoice } from './sage-voice-events';
import {
  ROOT_SIX_PROGRESS_KEY, rootSixLessons, rootSixNarration, rootSixOpening,
  rootSixParts, rootSixQuickPrompts,
} from './root-six-data';
import './root-six.css';

function safeObject(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }

function readProgress() {
  try {
    const parsed = safeObject(JSON.parse(localStorage.getItem(ROOT_SIX_PROGRESS_KEY) || '{}'));
    const valid = new Set(rootSixLessons.map((lesson) => lesson.key));
    const answers = safeObject(parsed.answers); const scenarios = safeObject(parsed.scenarios);
    const mirrors = safeObject(parsed.mirrors); const workbooks = safeObject(parsed.workbooks); const scans = safeObject(parsed.scans);
    const completed = Array.isArray(parsed.completed) ? parsed.completed.filter((key) => {
      const lesson = rootSixLessons.find((item) => item.key === key);
      const correct = lesson?.check.options.find((option) => option.isCorrect)?.id;
      return valid.has(key) && answers[key] === correct && scenarios[key]
        && ['saved', 'skipped'].includes(mirrors[key]?.status)
        && ['saved', 'skipped'].includes(workbooks[key]?.status)
        && Array.isArray(scans[key]) && scans[key].length === 4;
    }) : [];
    return {
      activeIndex: Number.isInteger(parsed.activeIndex) ? Math.min(Math.max(parsed.activeIndex, 0), rootSixLessons.length - 1) : 0,
      visited: Array.isArray(parsed.visited) ? parsed.visited.filter((key) => valid.has(key)) : [],
      answers, scenarios, mirrors, workbooks, scans, completed,
    };
  } catch { return {}; }
}

function HarborBackdrop() {
  return <div className="r6-backdrop" aria-hidden="true"><img src="/root-six-harbor-district.png" alt="" /><div /></div>;
}

function Paragraphs({ items, className = '' }) {
  return <div className={className}>{items.map((item, index) => <p key={`${index}-${item.slice(0, 24)}`}>{item}</p>)}</div>;
}

function LessonNav({ activeIndex, visited, completed, onSelect, onClose, closeRef }) {
  return <aside className="r6-nav">
    <header><div><p>Root Six</p><h2>Financial Protection &amp; Risk</h2></div><button ref={closeRef} type="button" onClick={onClose} aria-label="Close lesson menu"><X /></button></header>
    <nav aria-label="Root Six lessons">{rootSixParts.map((part) => <section key={part.number}>
      <h3><span>Part {part.number}</span>{part.title}</h3>
      {rootSixLessons.filter((lesson) => lesson.part.number === part.number).map((lesson) => {
        const index = lesson.number - 1;
        return <button type="button" className={activeIndex === index ? 'is-active' : ''} onClick={() => onSelect(index)} aria-current={activeIndex === index ? 'step' : undefined} key={lesson.key}>
          <span>{completed.includes(lesson.key) ? <Check /> : visited.includes(lesson.key) ? <Landmark /> : lesson.displayNumber}</span><strong>{lesson.title}</strong><ChevronRight />
        </button>;
      })}
    </section>)}</nav>
    <footer><span>{completed.length} of {rootSixLessons.length} lessons complete</span><i><b style={{ width: `${completed.length / rootSixLessons.length * 100}%` }} /></i></footer>
  </aside>;
}

function Opening() {
  const [answer, setAnswer] = useState('');
  const choices = ['What might happen', 'What I could lose access to', 'Who else would be affected', 'How recovery would work'];
  return <section className="r6-opening">
    <figure className="r6-harbor-scene">
      <img src="/root-six-harbor-district.png" alt="The Harbor District lit against a storm-dark sea" />
    </figure>
    <div className="r6-opening-copy"><p className="r6-eyebrow"><Anchor /> Root Six · The Harbor District</p><h1>Financial Protection &amp; Risk</h1><blockquote>{rootSixOpening.coreQuestion}</blockquote></div>
    <div className="r6-opening-story"><div><p className="r6-eyebrow"><Sparkles /> Ivy, Eli &amp; Sage arrive</p><h2>The harbor is protected because every layer has a different job.</h2><Paragraphs items={rootSixOpening.story} /></div><img src="/rootwise-sage-cutout.png" alt="Sage, the RootWise guide" /></div>
    <fieldset className="r6-opening-choice"><legend>When you hear “financial risk,” what do you notice first?</legend><p>No answer is graded. Root Six will widen the frame around your first instinct.</p><div>{choices.map((choice) => <button type="button" className={answer === choice ? 'is-selected' : ''} onClick={() => setAnswer(choice)} key={choice}>{answer === choice ? <Check /> : <ArrowRight />}{choice}</button>)}</div>{answer && <p className="r6-opening-response">“Keep that in view. Then ask what your first instinct leaves outside the harbor wall.”</p>}</fieldset>
    <details className="r6-promise"><summary>Open the complete Root Six learning promise</summary><p>{rootSixOpening.promise}</p></details>
  </section>;
}

function SageOpening({ lesson }) {
  return <section className="r6-card r6-sage-open"><img src="/rootwise-sage-cutout.png" alt="" /><div><p className="r6-eyebrow"><Sparkles /> Sage</p><blockquote>{lesson.sageOpen}</blockquote><button type="button" onClick={() => queueSageVoice(rootSixNarration(lesson), `Lesson ${lesson.number} narration is ready.`)}><Play /> Listen to this lesson</button><small>Direct mentor narration. Pause, resume, or replay from the Sage voice controls.</small></div></section>;
}

function AdultLevels({ lesson }) {
  return <section className="r6-card r6-levels"><header><p className="r6-eyebrow"><Radar /> Understand · Recognize · Examine</p><h2>Keep the story in the mirror while the protection system becomes visible.</h2></header><div>
    <article><span>01</span><div><p className="r6-level-label">Understand · What is happening?</p><h3>The protection principle</h3><ul>{lesson.understand.map((item) => <li key={item}>{item}</li>)}</ul></div></article>
    <article><span>02</span><div><p className="r6-level-label">Recognize · Where does it appear?</p><h3>Signals outside the Harbor District</h3><ul>{lesson.recognize.map((item) => <li key={item}>{item}</li>)}</ul></div></article>
    <article><span>03</span><div><p className="r6-level-label">Examine · What is directing the response?</p><h3>Questions that keep choice open</h3><ul>{lesson.examine.map((item) => <li key={item}>{item}</li>)}</ul></div></article>
  </div></section>;
}

const scanLayers = [
  ['purpose', 'Purpose', 'What must remain possible?'],
  ['threat', 'Threat', 'What event, access loss, person, or dependency could interrupt it?'],
  ['protection', 'Protection', 'Which layer reduces, transfers, detects, contains, or prepares?'],
  ['gap', 'Remaining gap', 'What cost, duty, exclusion, delay, or authority issue remains?'],
];

function HarborScan({ value = [], onChange }) {
  return <section className="r6-card r6-scan"><p className="r6-eyebrow"><Radar /> Harbor Scan</p><h2>Run all four lenses before you leave the lesson.</h2><div>{scanLayers.map(([id, title, body]) => {
    const active = value.includes(id);
    return <button type="button" className={active ? 'is-selected' : ''} aria-pressed={active} onClick={() => onChange(active ? value.filter((item) => item !== id) : [...value, id])} key={id}><span>{active ? <Check /> : <FileSearch />}</span><strong>{title}</strong><small>{body}</small></button>;
  })}</div>{value.length === 4 && <p className="r6-scan-result"><ShieldCheck /> The full protection frame is visible.</p>}</section>;
}

function DecisionPractice({ lesson, answer, scenario, onAnswer, onScenario }) {
  const checked = lesson.check.options.find((option) => option.id === answer);
  const scenarioChoice = lesson.scenario.options.find((option) => option.id === scenario);
  return <>
    <section className="r6-card r6-check"><p className="r6-eyebrow"><CircleHelp /> Knowledge Check</p><h2>{lesson.check.prompt}</h2><div className="r6-options">{lesson.check.options.map((option) => <button type="button" className={answer === option.id ? 'is-selected' : ''} aria-pressed={answer === option.id} onClick={() => onAnswer(option.id)} key={option.id}><span>{answer === option.id ? <Check /> : <ArrowRight />}</span>{option.label}</button>)}</div>{checked && <div className={checked.isCorrect ? 'r6-feedback is-correct' : 'r6-feedback'} aria-live="polite"><strong>{checked.isCorrect ? 'The full harbor is in frame' : 'One protection layer is still missing'}</strong><p>{checked.isCorrect ? 'This answer keeps purpose, risk, tool, boundary, and recovery connected.' : 'Return to the story and look for the answer that verifies the tool without turning it into a guarantee.'}</p></div>}</section>
    <section className="r6-card r6-scenario"><p className="r6-eyebrow"><Anchor /> Harbor Decision Drill</p><h2>{lesson.scenario.prompt}</h2><div className="r6-options">{lesson.scenario.options.map((option) => <button type="button" className={scenario === option.id ? 'is-selected' : ''} aria-pressed={scenario === option.id} onClick={() => onScenario(option.id)} key={option.id}><span>{scenario === option.id ? <Check /> : <ArrowRight />}</span>{option.label}</button>)}</div>{scenarioChoice && <div className={scenarioChoice.strength === 'strong' ? 'r6-feedback is-correct' : 'r6-feedback'} aria-live="polite"><strong>{scenarioChoice.strength === 'strong' ? 'This preserves informed choice' : 'Pause at the verification gate'}</strong><p>{scenarioChoice.feedback}</p></div>}</section>
  </>;
}

function PrivatePanel({ lesson, kind, value, onChange }) {
  const current = value || { text: '', status: '' };
  const mirror = kind === 'mirror';
  const title = mirror ? 'Mirror Reflection' : `Apply It Now · ${lesson.workbook}`;
  const prompt = mirror ? lesson.mirror : lesson.workbookPrompt;
  return <section className={`r6-card r6-private ${mirror ? 'is-mirror' : ''}`}><div><p className="r6-eyebrow">{mirror ? <Sparkles /> : <BookOpen />} {title}</p><h2>{prompt}</h2><p>{mirror ? 'Ivy and Eli are mirrors, not answers. Notice your own pattern without grading it.' : 'Use approximate values, ranges, fictional examples, or category names. Keep sensitive details out of this workbook.'}</p><label htmlFor={`r6-${kind}-${lesson.key}`}>{mirror ? 'What did the story reveal?' : 'Your private working note'}<textarea id={`r6-${kind}-${lesson.key}`} rows={5} maxLength={2200} value={current.text || ''} onChange={(event) => onChange({ text: event.target.value, status: current.status === 'saved' ? '' : current.status })} placeholder={mirror ? 'A version of this choice appears in my life when…' : 'Build the map in your own words…'} /></label><div><button type="button" disabled={!String(current.text || '').trim()} onClick={() => onChange({ text: current.text, status: 'saved' })}><CheckCircle2 /> Save on this device</button><button type="button" onClick={() => onChange({ text: current.text || '', status: 'skipped' })}><TimerReset /> Intentionally skip</button></div>{['saved', 'skipped'].includes(current.status) && <p className="r6-private-status"><Check /> {current.status === 'saved' ? 'Saved privately on this device.' : 'Intentionally skipped. You may return at any time.'}</p>}</div><aside><ShieldCheck /><strong>Privacy boundary</strong><p>These entries stay in this browser and are never sent to Ask Sage. Never store passwords, security codes, full account or policy numbers, Social Security numbers, legal case identifiers, or identifying medical details here.</p></aside></section>;
}

function Sources({ lesson }) {
  const legal = [10, 11, 13, 14, 20, 21, 22, 23, 24, 25].includes(lesson.number);
  return <section className="r6-card r6-sources"><p className="r6-eyebrow"><FileSearch /> Fact-check Desk</p><h2>Verify the rule behind the protection</h2><p>Reviewed against primary public authorities on July 29, 2026. Terms, laws, product rules, and regulator guidance can change.</p>{legal && <p className="r6-jurisdiction"><strong>Jurisdiction and documents matter.</strong> State law, contracts, account terms, court rules, deadlines, duties, and available protections can differ. This is education, not a case-specific legal, insurance, tax, or investment conclusion.</p>}<ul>{lesson.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ArrowRight /></a></li>)}</ul></section>;
}

function AskSage({ lesson }) {
  const [threads, setThreads] = useState({}); const [draft, setDraft] = useState(''); const [sending, setSending] = useState(false); const [open, setOpen] = useState(false);
  const toggleRef = useRef(null); const closeRef = useRef(null); const listRef = useRef(null);
  const messages = useMemo(() => threads[lesson.key] || [{ role: 'assistant', content: `We’re at ${lesson.title}. Ask me to separate the risk, protection tool, boundary, and remaining gap.` }], [threads, lesson]);
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, sending]);
  useEffect(() => { if (!open) return undefined; closeRef.current?.focus(); const prior = document.body.style.overflow; document.body.style.overflow = 'hidden'; const onKey = (event) => { if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } }; window.addEventListener('keydown', onKey); return () => { document.body.style.overflow = prior; window.removeEventListener('keydown', onKey); }; }, [open]);
  const send = async (message) => {
    const clean = message.trim(); if (!clean || sending) return; const next = [...messages, { role: 'user', content: clean }]; setThreads((items) => ({ ...items, [lesson.key]: next })); setDraft(''); setSending(true);
    const controller = new AbortController(); const timeout = window.setTimeout(() => controller.abort(), 22000);
    try {
      const response = await fetch('/api/sage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ root: 'six', message: clean, lesson: { number: lesson.number, title: lesson.title, story: lesson.story.join(' ').slice(0, 900), connection: lesson.understand.join(' ').slice(0, 900), boundaries: lesson.examine.join(' ').slice(0, 500) }, history: messages.slice(-9) }), signal: controller.signal });
      const payload = await response.json().catch(() => ({})); if (!response.ok || !payload.reply) throw new Error('unavailable'); queueSageVoice(payload.reply, 'Sage answered your Root Six question.'); setThreads((items) => ({ ...items, [lesson.key]: [...next, { role: 'assistant', content: payload.reply }] }));
    } catch (error) { setThreads((items) => ({ ...items, [lesson.key]: [...next, { role: 'assistant', unavailable: true, content: error?.name === 'AbortError' ? 'That took too long. Your question remains here—please try again in a moment.' : 'The conversation service is not reachable right now. The lesson, source links, private work, and narration remain available.' }] })); }
    finally { window.clearTimeout(timeout); setSending(false); }
  };
  return <><button ref={toggleRef} type="button" className="r6-sage-toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="r6-sage-panel"><MessageCircle /> Ask Sage</button>{open && <button type="button" className="r6-sage-scrim" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage" />}<aside id="r6-sage-panel" className={open ? 'r6-sage is-open' : 'r6-sage'} aria-label="Ask Sage support"><header><div><Sparkles /><span><strong>Ask Sage</strong><small>{lesson.title}</small></span></div><button ref={closeRef} type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage"><X /></button></header><div ref={listRef} className="r6-sage-messages" aria-live="polite">{messages.map((message, index) => <div className={`${message.role} ${message.unavailable ? 'is-unavailable' : ''}`} key={`${lesson.key}-${index}`}><strong>{message.role === 'assistant' ? 'Sage' : 'You'}</strong><p>{message.content}</p></div>)}{sending && <div className="assistant"><LoaderCircle className="r6-spin" /><p>Sage is thinking…</p></div>}</div><div className="r6-quick">{rootSixQuickPrompts.map((prompt) => <button type="button" disabled={sending} onClick={() => send(`${prompt} in ${lesson.title}. Keep the Harbor District story and RootWise boundaries in view.`)} key={prompt}>{prompt}</button>)}</div><form onSubmit={(event) => { event.preventDefault(); send(draft); }}><label htmlFor={`r6-sage-${lesson.key}`}>Ask about this lesson</label><div><textarea id={`r6-sage-${lesson.key}`} rows={3} maxLength={700} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What are you trying to understand?" /><button type="submit" disabled={!draft.trim() || sending} aria-label="Send question"><Send /></button></div></form><footer>Do not share passwords, codes, account or policy numbers, Social Security numbers, medical details, or case identifiers. Sage explains concepts and questions—never chooses coverage, drafts legal documents, diagnoses fraud, or replaces a licensed professional.</footer></aside></>;
}

export default function RootSixHarbor({ go, initialLessonKey, onLessonChange }) {
  const saved = useMemo(() => readProgress(), []); const requested = rootSixLessons.findIndex((lesson) => lesson.key === initialLessonKey); const startingIndex = requested >= 0 ? requested : saved.activeIndex || 0;
  const [activeIndex, setActiveIndex] = useState(startingIndex); const [visited, setVisited] = useState(() => [...new Set([...(saved.visited || []), rootSixLessons[startingIndex].key])]); const [completed, setCompleted] = useState(saved.completed || []); const [answers, setAnswers] = useState(saved.answers || {}); const [scenarios, setScenarios] = useState(saved.scenarios || {}); const [mirrors, setMirrors] = useState(saved.mirrors || {}); const [workbooks, setWorkbooks] = useState(saved.workbooks || {}); const [scans, setScans] = useState(saved.scans || {}); const [navOpen, setNavOpen] = useState(false); const menuRef = useRef(null); const closeRef = useRef(null);
  const lesson = rootSixLessons[activeIndex]; const correct = lesson.check.options.find((option) => option.isCorrect)?.id;
  const ready = answers[lesson.key] === correct && Boolean(scenarios[lesson.key]) && ['saved', 'skipped'].includes(mirrors[lesson.key]?.status) && ['saved', 'skipped'].includes(workbooks[lesson.key]?.status) && scans[lesson.key]?.length === 4;
  useEffect(() => { localStorage.setItem(ROOT_SIX_PROGRESS_KEY, JSON.stringify({ activeIndex, visited, completed, answers, scenarios, mirrors, workbooks, scans })); }, [activeIndex, visited, completed, answers, scenarios, mirrors, workbooks, scans]);
  useEffect(() => { if (!navOpen) return undefined; closeRef.current?.focus(); const onKey = (event) => { if (event.key === 'Escape') { setNavOpen(false); menuRef.current?.focus(); } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [navOpen]);
  const select = (index) => { const next = Math.min(Math.max(index, 0), rootSixLessons.length - 1); if (onLessonChange && next !== activeIndex) { onLessonChange(rootSixLessons[next].key); return; } setActiveIndex(next); setVisited((items) => items.includes(rootSixLessons[next].key) ? items : [...items, rootSixLessons[next].key]); setNavOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toggleComplete = () => setCompleted((items) => items.includes(lesson.key) ? items.filter((key) => key !== lesson.key) : ready ? [...items, lesson.key] : items);
  const treePercent = Math.round(completed.length / rootSixLessons.length * 100);
  const treeStyle = /** @type {import('react').CSSProperties & Record<'--growth', string>} */ ({ '--growth': `${treePercent}%` });
  return <main className="root-six-harbor"><HarborBackdrop /><header className="r6-topbar"><button type="button" onClick={() => go('dashboard')}><ArrowLeft /> The Grove</button><button type="button" className="r6-brand" onClick={() => go('home')} aria-label="RootWise home"><ApprovedArtwork variant="tree" /><span><strong>Root$Wise</strong><small>Root Six · Financial Protection &amp; Risk</small></span></button><button ref={menuRef} type="button" onClick={() => setNavOpen(true)} aria-expanded={navOpen} aria-controls="r6-navigation"><Menu /> Lessons</button></header><div className="r6-progress" role="progressbar" aria-label="Root Six progress" aria-valuemin={0} aria-valuemax={rootSixLessons.length} aria-valuenow={completed.length}><i style={{ width: `${treePercent}%` }} /></div>
    <div className="r6-shell">{navOpen && <button type="button" className="r6-nav-scrim" onClick={() => { setNavOpen(false); menuRef.current?.focus(); }} aria-label="Close lesson menu" />}<div id="r6-navigation" className={navOpen ? 'r6-nav-wrap is-open' : 'r6-nav-wrap'}><LessonNav activeIndex={activeIndex} visited={visited} completed={completed} onSelect={select} onClose={() => setNavOpen(false)} closeRef={closeRef} /></div><article className="r6-lesson" key={lesson.key}>{activeIndex === 0 && <Opening />}<section className="r6-lesson-title"><p className="r6-eyebrow">Part {lesson.part.number} · {lesson.part.title}</p><span>Lesson {lesson.displayNumber} of {rootSixLessons.length}</span><h1>{lesson.title}</h1></section><SageOpening lesson={lesson} /><section className="r6-card r6-story"><p className="r6-eyebrow"><Sparkles /> The continuing story · Ivy, Eli &amp; Sage</p><h2>The Harbor District remains the teaching mirror.</h2><Paragraphs items={lesson.story} /></section><AdultLevels lesson={lesson} /><HarborScan value={scans[lesson.key] || []} onChange={(value) => setScans((items) => ({ ...items, [lesson.key]: value }))} /><DecisionPractice lesson={lesson} answer={answers[lesson.key]} scenario={scenarios[lesson.key]} onAnswer={(value) => setAnswers((items) => ({ ...items, [lesson.key]: value }))} onScenario={(value) => setScenarios((items) => ({ ...items, [lesson.key]: value }))} /><PrivatePanel lesson={lesson} kind="mirror" value={mirrors[lesson.key]} onChange={(value) => setMirrors((items) => ({ ...items, [lesson.key]: value }))} /><PrivatePanel lesson={lesson} kind="workbook" value={workbooks[lesson.key]} onChange={(value) => setWorkbooks((items) => ({ ...items, [lesson.key]: value }))} /><Sources lesson={lesson} /><section className="r6-card r6-growth"><div className="r6-tree-reward" style={treeStyle}><ApprovedArtwork variant="tree" /><span>{treePercent}%</span></div><div><p className="r6-eyebrow"><Sprout /> Root Growth · Harbor light {Math.min(completed.length + (ready && !completed.includes(lesson.key) ? 1 : 0), rootSixLessons.length)} of {rootSixLessons.length}</p><h2>{lesson.growth}</h2><p>{completed.includes(lesson.key) ? 'This protection capacity is rooted in your Grove.' : ready ? 'Complete the lesson to add this light to your Root Six tree.' : 'Finish the Harbor Scan, knowledge check, decision drill, mirror, and application panel to root this capacity.'}</p></div></section><section className="r6-next"><Landmark /><div><p className="r6-eyebrow">Next harbor light</p><p>{lesson.transition}</p></div></section><footer className="r6-footer"><button type="button" onClick={() => select(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft /> Previous</button><button type="button" className={completed.includes(lesson.key) ? 'is-complete' : ''} onClick={toggleComplete} disabled={!completed.includes(lesson.key) && !ready} aria-pressed={completed.includes(lesson.key)}>{completed.includes(lesson.key) ? <Check /> : <CheckCircle2 />}{completed.includes(lesson.key) ? 'Lesson rooted' : ready ? 'Root this lesson' : 'Finish the full lesson loop'}</button><button type="button" onClick={() => activeIndex === rootSixLessons.length - 1 ? go('/roots/seven') : select(activeIndex + 1)}>{activeIndex === rootSixLessons.length - 1 ? 'Enter Root Seven' : 'Next lesson'} <ArrowRight /></button></footer></article></div><AskSage lesson={lesson} />
  </main>;
}
