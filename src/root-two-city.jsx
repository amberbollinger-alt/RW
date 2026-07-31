import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, Check, CheckCircle2,
  ChevronRight, CircleHelp, ExternalLink, Eye, FileSearch, Gauge, Landmark,
  LoaderCircle, Menu, MessageCircle, Play, RotateCcw, Route, Scale, Send,
  ShieldCheck, Sparkles, Sprout, TimerReset, Users, X,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import { cancelSageVoice, queueSageVoice } from './sage-voice-events';
import {
  ROOT_TWO_LEGACY_PROGRESS_KEYS, ROOT_TWO_PROGRESS_KEY, rootTwoDistricts,
  rootTwoLessons, rootTwoNarration, rootTwoOpening, rootTwoQuickPrompts,
  rootTwoScanLenses,
} from './root-two-data';
import './root-two.css';

const COMPLETE_STATUS = new Set(['saved', 'skipped']);
const allLensIds = rootTwoScanLenses.map((lens) => lens.id);
const lessonBySlug = new Map(rootTwoLessons.map((lesson, index) => [lesson.slug, { lesson, index }]));
const lessonByLegacyKey = new Map(rootTwoLessons.map((lesson) => [lesson.legacyProgressKey, lesson.slug]));

function safeObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}
function readStored(storage, key) {
  try { return safeObject(JSON.parse(storage.getItem(key) || '{}')); } catch { return {}; }
}
// Root Two Exchange District
function toSlug(value) {
  const key = String(value || '');
  return lessonBySlug.has(key) ? key : lessonByLegacyKey.get(key) || '';
}

function migrateProgress() {
  const empty = { activeIndex: 0, visited: [], completed: [], answers: {}, drills: {}, mirrors: {}, workbooks: {}, scans: {}, growthReviewed: {} };
  try {
    const storage = globalThis.localStorage;
    if (!storage) return empty;
    const legacyV4 = readStored(storage, ROOT_TWO_LEGACY_PROGRESS_KEYS[0]);
    const legacyV3 = readStored(storage, ROOT_TWO_LEGACY_PROGRESS_KEYS[1]);
    const canonical = readStored(storage, ROOT_TWO_PROGRESS_KEY);
    const records = [legacyV3, legacyV4, canonical];
    const completed = new Set(records.flatMap((record) => Array.isArray(record.completed) ? record.completed.map(toSlug).filter(Boolean) : []));
    const answers = {}; const drills = {}; const mirrors = {}; const workbooks = {}; const scans = {}; const growthReviewed = {};

    for (const record of records) {
      for (const [rawKey, rawValue] of Object.entries(safeObject(record.answers))) {
        const slug = toSlug(rawKey); const lesson = lessonBySlug.get(slug)?.lesson;
        if (!lesson) continue;
        answers[slug] = Number.isInteger(rawValue) ? lesson.check.options[rawValue]?.id : String(rawValue || '');
      }
      for (const [rawKey, rawValue] of Object.entries(safeObject(record.drills))) {
        const slug = toSlug(rawKey); if (slug) drills[slug] = String(rawValue || '');
      }
      for (const [rawKey, rawValue] of Object.entries(safeObject(record.mirrors))) {
        const slug = toSlug(rawKey); if (slug) mirrors[slug] = safeObject(rawValue);
      }
      for (const [rawKey, rawValue] of Object.entries(safeObject(record.workbooks))) {
        const slug = toSlug(rawKey); if (slug) workbooks[slug] = safeObject(rawValue);
      }
      for (const [rawKey, rawValue] of Object.entries(safeObject(record.reflections))) {
        const slug = toSlug(rawKey); const text = String(rawValue || '').trim();
        if (slug && text && !workbooks[slug]) workbooks[slug] = { text, status: 'saved' };
      }
      for (const [rawKey, rawValue] of Object.entries(safeObject(record.scans))) {
        const slug = toSlug(rawKey); if (slug && Array.isArray(rawValue)) scans[slug] = rawValue.filter((id) => allLensIds.includes(id));
      }
      for (const [rawKey, rawValue] of Object.entries(safeObject(record.growthReviewed))) {
        const slug = toSlug(rawKey); if (slug) growthReviewed[slug] = Boolean(rawValue);
      }
    }

    for (const slug of completed) {
      const lesson = lessonBySlug.get(slug)?.lesson; if (!lesson) continue;
      answers[slug] ||= lesson.check.options.find((option) => option.isCorrect)?.id;
      drills[slug] ||= 'complete-exchange'; scans[slug] = [...allLensIds]; growthReviewed[slug] = true;
      workbooks[slug] ||= { text: '', status: 'skipped' };
    }

    const legacyActive = [legacyV4, legacyV3].map((record) => rootTwoLessons.findIndex((lesson) => lesson.sourceChapterIndex === record.chapter && lesson.sourceLessonIndex === record.lesson)).find((index) => index >= 0);
    const canonicalActive = toSlug(canonical.lastVisitedSlug || canonical.activeSlug);
    const activeIndex = canonicalActive ? lessonBySlug.get(canonicalActive).index : legacyActive ?? 0;
    const visited = [...new Set([...(Array.isArray(canonical.visited) ? canonical.visited.map(toSlug) : []), rootTwoLessons[activeIndex]?.slug].filter(Boolean))];
    return { activeIndex, visited, completed: [...completed], answers, drills, mirrors, workbooks, scans, growthReviewed };
  } catch { return empty; }
}

function focusableWithin(container) {
  return container?.querySelectorAll('a[href], button:not(:disabled), textarea:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])') || [];
}

function ExchangeBackdrop() {
  return <div className="r2-backdrop" aria-hidden="true"><img src="/root-two-exchange-district.png" alt="" /><div /></div>;
}

function DialogueBeat({ beat }) {
  const speaker = beat.speaker || (beat.type === 'sage' ? 'Sage' : 'District worker');
  const speakerClass = speaker.toLowerCase().replace(/[^a-z]+/g, '-');
  return <blockquote className={`r2-dialogue is-${speakerClass}`}><span className="r2-avatar" aria-hidden="true">{speaker.slice(0, 1)}</span><div><cite>{speaker}</cite><p>“{beat.text}”</p></div></blockquote>;
}

function OpeningExperience() {
  const [answer, setAnswer] = useState('');
  return <section className="r2-opening" aria-labelledby="r2-opening-title">
    <div className="r2-opening-hero"><div><p className="r2-eyebrow"><Landmark /> {rootTwoOpening.eyebrow}</p><h1 id="r2-opening-title">{rootTwoOpening.title}</h1><blockquote>{rootTwoOpening.coreQuestion}</blockquote></div></div>
    <section className="r2-card r2-opening-story"><header><p className="r2-eyebrow"><Sparkles /> Ivy, Eli &amp; Sage arrive</p><h2>The district begins with a problem, not a price.</h2></header><div className="r2-story-flow">{rootTwoOpening.story.map((beat, index) => beat.type === 'narration' ? <p key={index}>{beat.text}</p> : <DialogueBeat beat={beat} key={index} />)}</div></section>
    <fieldset className="r2-card r2-opening-question"><legend>{rootTwoOpening.question}</legend><p>No answer is graded. Keep your first explanation visible while the district adds what it may be missing.</p><div>{rootTwoOpening.options.map((choice) => <button type="button" className={answer === choice ? 'is-selected' : ''} aria-pressed={answer === choice} onClick={() => setAnswer(choice)} key={choice}>{answer === choice ? <Check /> : <ArrowRight />}{choice}</button>)}</div>{answer && <p className="r2-opening-response">“{rootTwoOpening.response}”</p>}</fieldset>
    <details className="r2-card r2-promise"><summary>Open the complete Root Two learning promise</summary><p>{rootTwoOpening.promise}</p><p><strong>RootWise will not assign a universal value to a person, job, career, skill, credential, wage, price, occupation, or type of labor.</strong></p></details>
  </section>;
}

function DistrictNavigation({ activeIndex, visited, completed, onSelect, onClose, closeRef, navRef, modal }) {
  return <aside ref={navRef} className="r2-nav" role={modal ? 'dialog' : undefined} aria-modal={modal || undefined} aria-label="Root Two lesson navigation"><header><div><p>Root Two</p><h2>Value &amp; Earning</h2><small>The Exchange District</small></div><button ref={closeRef} type="button" onClick={onClose} aria-label="Close lesson menu"><X /></button></header><nav aria-label="Root Two lessons">{rootTwoDistricts.map((district) => <section key={district.key}><h3><span>District {district.number}</span>{district.title}</h3>{district.lessons.map((lesson) => { const index = lessonBySlug.get(lesson.slug).index; return <button type="button" className={activeIndex === index ? 'is-active' : ''} onClick={() => onSelect(index)} aria-current={activeIndex === index ? 'step' : undefined} key={lesson.slug}><span>{completed.includes(lesson.slug) ? <Check /> : visited.includes(lesson.slug) ? <Eye /> : lesson.number}</span><strong>{lesson.title}</strong><ChevronRight /></button>; })}</section>)}</nav><footer><span>{completed.length} of {rootTwoLessons.length} lessons rooted</span><i><b style={{ width: `${completed.length / rootTwoLessons.length * 100}%` }} /></i></footer></aside>;
}

function SageOpening({ lesson }) {
  return <section className="r2-card r2-sage-opening"><img src="/rootwise-sage-cutout.png" alt="" /><div><p className="r2-eyebrow"><Sparkles /> Sage opens the exchange</p><blockquote>{lesson.sageOpening}</blockquote><button type="button" onClick={() => queueSageVoice(rootTwoNarration(lesson), `Root Two lesson ${lesson.number} narration is ready.`)}><Play /> Listen to Sage’s opening</button><small>Short mentor narration. Pause, stop, or replay from the Sage voice controls.</small></div></section>;
}

function StoryScene({ lesson }) {
  return <section className="r2-card r2-story"><header><p className="r2-eyebrow"><Users /> The continuing story · Ivy, Eli &amp; Sage</p><h2>{lesson.opening}</h2></header><div className="r2-story-flow">{lesson.story.map((beat, index) => beat.type === 'narration' ? <p key={index}>{beat.text}</p> : <DialogueBeat beat={beat} key={index} />)}</div></section>;
}

function ExchangeScan({ lesson, value = [], onChange }) {
  return <section id={`r2-scan-${lesson.slug}`} className="r2-card r2-scan"><header><p className="r2-eyebrow"><FileSearch /> Exchange Scan</p><h2>Activate all four lenses. The clock and price cannot explain this scene alone.</h2></header><div>{lesson.scanPrompts.map((lens) => { const active = value.includes(lens.id); return <button type="button" className={active ? 'is-selected' : ''} aria-pressed={active} onClick={() => onChange(active ? value.filter((id) => id !== lens.id) : [...value, lens.id])} key={lens.id}><span>{active ? <Check /> : <Scale />}</span><strong>{lens.title}</strong><small>{lens.prompt}</small></button>; })}</div><p className="r2-scan-status" aria-live="polite">{value.length === 4 ? <><Gauge /> The complete exchange is visible.</> : `${value.length} of 4 lenses active.`}</p></section>;
}

function AdultLayers({ lesson }) {
  const layers = [
    ['01', 'Understand · What is it?', lesson.understand.title, lesson.understand.body],
    ['02', 'Recognize · Where does it appear?', lesson.recognize.title, lesson.recognize.body],
    ['03', 'Examine · What is driving the choice?', lesson.examine.title, lesson.examine.body],
  ];
  return <section className="r2-card r2-layers"><header><p className="r2-eyebrow"><Route /> Understand · Recognize · Examine</p><h2>The story remains in view while the exchange becomes clearer.</h2></header><div>{layers.map(([number, label, title, body]) => <article key={number}><span>{number}</span><div><p className="r2-layer-label">{label}</p><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>;
}

function FinancialParallel({ lesson }) {
  return <section className="r2-card r2-parallel"><div><p className="r2-eyebrow"><BriefcaseBusiness /> Financial parallel · return to the scene</p><h2>{lesson.concept.title}</h2><p>{lesson.concept.explanation}</p></div><aside><strong>What the story keeps visible</strong><p>{lesson.tradeoff}</p><blockquote>{lesson.takeaway}</blockquote></aside></section>;
}

function PrivatePanel({ lesson, kind, value, onChange }) {
  const [confirmReset, setConfirmReset] = useState(false);
  const current = value || { text: '', status: '' }; const mirror = kind === 'mirror';
  const prompt = mirror ? lesson.mirrorPrompt : lesson.workbook.prompt;
  return <section className={`r2-card r2-private ${mirror ? 'is-mirror' : ''}`}><div><p className="r2-eyebrow">{mirror ? <Sparkles /> : <BookOpen />} {mirror ? 'Mirror Reflection' : 'Private Workbook · Apply It Now'}</p><h2>{prompt}</h2><p>{mirror ? 'Ivy and Eli are learner mirrors, not decorative examples. Notice your own assumption without grading it.' : 'Use a fictional, approximate, category-level, or redacted example. Keep sensitive workplace and identity details out.'}</p><label htmlFor={`r2-${kind}-${lesson.slug}`}>{mirror ? 'What does this scene reflect back to you?' : 'Your private working note'}<textarea id={`r2-${kind}-${lesson.slug}`} rows={5} maxLength={2200} value={current.text || ''} onChange={(event) => onChange({ text: event.target.value, status: current.status === 'saved' ? '' : current.status })} placeholder={mirror ? 'A version of this assumption appears when…' : lesson.workbook.placeholder} /></label><div className="r2-private-actions"><button type="button" disabled={!String(current.text || '').trim()} onClick={() => onChange({ text: current.text, status: 'saved' })}><CheckCircle2 /> Save on this device</button>{!mirror && <button type="button" onClick={() => onChange({ text: current.text || '', status: 'skipped' })}><TimerReset /> Reflect later</button>}<button type="button" className="is-quiet" onClick={() => setConfirmReset(true)}><RotateCcw /> Reset</button></div>{confirmReset && <div className="r2-reset-confirm" role="alert"><span>Clear this private entry?</span><button type="button" onClick={() => { onChange({ text: '', status: '' }); setConfirmReset(false); }}>Clear entry</button><button type="button" onClick={() => setConfirmReset(false)}>Cancel</button></div>}{(COMPLETE_STATUS.has(current.status) || (mirror && current.status === 'saved')) && <p className="r2-private-status"><Check /> {current.status === 'saved' ? 'Saved privately on this device.' : 'Marked reflect later. You may return at any time.'}</p>}<small>This reflection stays on this device.</small></div><aside><ShieldCheck /><strong>Privacy boundary</strong><p>These entries are stored only in this browser and are never sent to Ask Sage. Do not enter exact employer names, exact wages, pay stubs, tax returns, customer names, confidential agreements, account numbers, Social Security numbers, passwords, verification codes, legal case details, or medical details.</p></aside></section>;
}

function ChoicePanel({ lesson, kind, value, onChange }) {
  const drill = kind === 'drill'; const model = drill ? lesson.decisionDrill : lesson.check;
  const selected = model.options.find((option) => option.id === value);
  const correct = drill ? selected?.strength === 'strong' : selected?.isCorrect;
  return <section className={`r2-card ${drill ? 'r2-drill' : 'r2-check'}`}><p className="r2-eyebrow">{drill ? <Scale /> : <CircleHelp />} {drill ? 'Exchange Decision Drill' : 'Knowledge Check'}</p><h2>{model.prompt}</h2><div className="r2-options" role="radiogroup" aria-label={drill ? 'Decision drill choices' : 'Knowledge check choices'}>{model.options.map((option) => <button type="button" role="radio" aria-checked={value === option.id} className={value === option.id ? 'is-selected' : ''} onClick={() => onChange(option.id)} key={option.id}><span>{value === option.id ? <Check /> : <ArrowRight />}</span>{option.label}</button>)}</div>{selected && <div className={correct ? 'r2-feedback is-correct' : 'r2-feedback'} aria-live="polite"><strong>{correct ? (drill ? 'The complete exchange stays in frame' : 'Rooted') : (drill ? 'A condition is still hidden' : 'Look one step deeper')}</strong><p>{selected.feedback}</p></div>}</section>;
}

function GrowthStatement({ lesson, reviewed, onReview, completed, ready, percent, missing }) {
  const treeStyle = /** @type {import('react').CSSProperties & Record<'--growth', string>} */ ({ '--growth': `${percent}%` });
  return <section className="r2-card r2-growth"><div className="r2-tree-reward" style={treeStyle}><ApprovedArtwork variant="tree" /><span>{percent}%</span></div><div><p className="r2-eyebrow"><Sprout /> Root Growth · Exchange marker</p><h2>“{lesson.growthStatement}”</h2><button type="button" className={reviewed ? 'is-reviewed' : ''} aria-pressed={reviewed} onClick={() => onReview(!reviewed)}>{reviewed ? <CheckCircle2 /> : <Eye />}{reviewed ? 'Growth statement reviewed' : 'I reviewed this statement'}</button><p className="r2-completion-status" aria-live="polite">{completed ? 'This earning capacity is rooted in your Grove.' : ready ? 'The full lesson loop is ready to root.' : `Still needed: ${missing.join(', ')}.`}</p></div></section>;
}

function Sources({ lesson }) {
  return <section id={`r2-sources-${lesson.slug}`} className="r2-card r2-sources"><p className="r2-eyebrow"><FileSearch /> Source Desk</p><h2>Primary public authorities behind this lesson</h2><p>Reviewed against primary public authorities on July 30, 2026. Wages, labor-market demand, occupational requirements, employment protections, and agency guidance can change.</p>{lesson.sourceBoundary && <p className="r2-jurisdiction"><strong>Facts, job duties, documents, jurisdiction, and current rules matter.</strong> This lesson is general education and not a personal wage, employment, discrimination, licensing, or legal conclusion.</p>}<ul>{lesson.sources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer noopener" aria-label={`${source.label} (opens in a new tab)`}>{source.label}<ExternalLink /></a></li>)}</ul></section>;
}

function RightRail({ lesson, district, completed, scans }) {
  const districtDone = district.lessons.filter((item) => completed.includes(item.slug)).length;
  const glance = [
    ['Value Is More Than Time', 'Preparation, judgment, responsibility, and result may sit behind a short visible task.'],
    ['Effort and Results Are Different', 'Tools, systems, access, conditions, and demand shape what effort can produce.'],
    ['Demand Changes the Exchange', 'Need, timing, scarcity, and alternatives affect compensation without defining human worth.'],
    ['Work Exists Inside Systems', 'Authority, training, opportunity, bias, rules, and bargaining power affect outcomes.'],
    ['Pay Is Not Human Worth', 'Compensation describes an exchange. It does not measure dignity or importance.'],
  ];
  return <aside className="r2-support" aria-label="Root Two support rail"><section><p className="r2-eyebrow"><Gauge /> Current district</p><h2>{district.title}</h2><strong>{districtDone} of {district.lessons.length} lessons rooted</strong><i><b style={{ width: `${districtDone / district.lessons.length * 100}%` }} /></i><p>{district.arc}</p></section><section><p className="r2-eyebrow"><FileSearch /> Exchange Scan</p><strong>{scans.length} of 4 lenses active</strong><a href={`#r2-scan-${lesson.slug}`}>Open the scan <ArrowRight /></a></section><section className="r2-glance"><p className="r2-eyebrow"><Eye /> Root Two at a glance</p>{glance.map(([title, text]) => <div key={title}><strong>{title}</strong><p>{text}</p></div>)}</section><section><p className="r2-eyebrow"><Sparkles /> Sage note</p><blockquote>“A price can describe an exchange. It cannot measure a person.”</blockquote><a href={`#r2-sources-${lesson.slug}`}>Open Source Desk <ArrowRight /></a></section></aside>;
}

function AskSage({ lesson, district }) {
  const [threads, setThreads] = useState({}); const [draft, setDraft] = useState(''); const [sending, setSending] = useState(false); const [open, setOpen] = useState(false);
  const toggleRef = useRef(null); const closeRef = useRef(null); const panelRef = useRef(null); const listRef = useRef(null);
  const messages = useMemo(() => threads[lesson.slug] || [{ role: 'assistant', content: `We’re in ${lesson.title}. Ask me to find the work, result, conditions, or complete exchange.` }], [threads, lesson]);
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, sending]);
  useEffect(() => { if (!open) return undefined; closeRef.current?.focus(); const prior = document.body.style.overflow; document.body.style.overflow = 'hidden'; const onKey = (event) => { if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); return; } if (event.key !== 'Tab') return; const nodes = focusableWithin(panelRef.current); if (!nodes.length) return; const first = nodes[0]; const last = nodes[nodes.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }; window.addEventListener('keydown', onKey); return () => { document.body.style.overflow = prior; window.removeEventListener('keydown', onKey); }; }, [open]);
  const send = async (message) => {
    const clean = message.trim(); if (!clean || sending) return; const next = [...messages, { role: 'user', content: clean }]; setThreads((items) => ({ ...items, [lesson.slug]: next })); setDraft(''); setSending(true);
    const controller = new AbortController(); const timeout = window.setTimeout(() => controller.abort(), 22000);
    try {
      const response = await fetch('/api/sage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ root: 'two', message: clean, district: { key: district.key, lesson: lesson.number }, lesson: { title: lesson.title, story: lesson.story.map((beat) => `${beat.speaker ? `${beat.speaker}: ` : ''}${beat.text}`).join('\n'), understand: lesson.understand.body, recognize: lesson.recognize.body, examine: lesson.examine.body, scan: lesson.scanPrompts, application: lesson.workbook.prompt }, history: messages.slice(-9) }), signal: controller.signal });
      const payload = await response.json().catch(() => ({})); if (!response.ok || !payload.reply) throw new Error('unavailable'); queueSageVoice(payload.reply, 'Sage answered your Root Two question.'); setThreads((items) => ({ ...items, [lesson.slug]: [...next, { role: 'assistant', content: payload.reply }] }));
    } catch (error) { setThreads((items) => ({ ...items, [lesson.slug]: [...next, { role: 'assistant', unavailable: true, content: error?.name === 'AbortError' ? 'That took too long. Your question remains here—please try again in a moment.' : 'The conversation service is not reachable right now. The story, Exchange Scan, Source Desk, and private work remain available.' }] })); }
    finally { window.clearTimeout(timeout); setSending(false); }
  };
  return <><button ref={toggleRef} type="button" className="r2-sage-toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="r2-sage-panel"><MessageCircle /> Ask Sage</button>{open && <button type="button" className="r2-sage-scrim" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage" />}<aside ref={panelRef} id="r2-sage-panel" className={open ? 'r2-sage is-open' : 'r2-sage'} role="dialog" aria-modal="true" aria-hidden={!open} aria-label="Ask Sage support"><header><div><Sparkles /><span><strong>Ask Sage</strong><small>{lesson.title}</small></span></div><button ref={closeRef} type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage"><X /></button></header><div ref={listRef} className="r2-sage-messages" aria-live="polite">{messages.map((message, index) => <div className={`${message.role} ${message.unavailable ? 'is-unavailable' : ''}`} key={`${lesson.slug}-${index}`}><strong>{message.role === 'assistant' ? 'Sage' : 'You'}</strong><p>{message.content}</p></div>)}{sending && <div className="assistant"><LoaderCircle className="r2-spin" /><p>Sage is thinking…</p></div>}</div><div className="r2-quick">{rootTwoQuickPrompts.map((prompt) => <button type="button" disabled={sending} onClick={() => send(`${prompt.label} in ${lesson.title}. Keep the Exchange District story and RootWise boundaries in view.`)} key={prompt.key}>{prompt.label}</button>)}</div><form onSubmit={(event) => { event.preventDefault(); send(draft); }}><label htmlFor={`r2-sage-${lesson.slug}`}>Ask about this lesson</label><div><textarea id={`r2-sage-${lesson.slug}`} rows={3} maxLength={700} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What are you trying to understand?" /><button type="submit" disabled={!draft.trim() || sending} aria-label="Send question to Sage"><Send /></button></div></form><footer>Do not share employer names, exact wages, pay stubs, tax returns, confidential agreements, customer identities, account numbers, Social Security numbers, passwords, verification codes, legal case details, or medical details. Sage provides general education—not a personal wage, employment, discrimination, licensing, contract, or legal conclusion.</footer></aside></>;
}

export default function RootTwoCity({ go, initialLessonKey, onLessonChange }) {
  const initialSaved = useMemo(() => migrateProgress(), []);
  const requestedIndex = lessonBySlug.get(initialLessonKey)?.index ?? 0;
  const startingIndex = lessonBySlug.has(initialLessonKey) ? requestedIndex : initialSaved.activeIndex;
  const [activeIndex, setActiveIndex] = useState(startingIndex); const [visited, setVisited] = useState(() => [...new Set([...(initialSaved.visited || []), rootTwoLessons[startingIndex].slug])]); const [completed, setCompleted] = useState(initialSaved.completed || []);
  const [answers, setAnswers] = useState(initialSaved.answers || {}); const [drills, setDrills] = useState(initialSaved.drills || {}); const [mirrors, setMirrors] = useState(initialSaved.mirrors || {}); const [workbooks, setWorkbooks] = useState(initialSaved.workbooks || {}); const [scans, setScans] = useState(initialSaved.scans || {}); const [growthReviewed, setGrowthReviewed] = useState(initialSaved.growthReviewed || {});
  const [navOpen, setNavOpen] = useState(false); const menuRef = useRef(null); const closeRef = useRef(null); const navRef = useRef(null);
  const lesson = rootTwoLessons[activeIndex]; const district = rootTwoDistricts.find((item) => item.lessons.some((entry) => entry.slug === lesson.slug));
  const correctId = lesson.check.options.find((option) => option.isCorrect)?.id; const scanReady = scans[lesson.slug]?.length === 4; const checkReady = answers[lesson.slug] === correctId; const drillReady = Boolean(drills[lesson.slug]); const workbookReady = COMPLETE_STATUS.has(workbooks[lesson.slug]?.status); const growthReady = Boolean(growthReviewed[lesson.slug]); const ready = scanReady && checkReady && drillReady && workbookReady && growthReady;
  const missing = [!scanReady && 'Exchange Scan', !checkReady && 'correct knowledge check', !drillReady && 'decision drill', !workbookReady && 'workbook or reflect later', !growthReady && 'growth statement'].filter(Boolean);
  const percent = Math.round(completed.length / rootTwoLessons.length * 100);

  useEffect(() => { try { localStorage.setItem(ROOT_TWO_PROGRESS_KEY, JSON.stringify({ version: 1, activeSlug: lesson.slug, lastVisitedSlug: lesson.slug, visited, completed, answers, drills, mirrors, workbooks, scans, growthReviewed })); } catch { /* Keep the lesson usable when storage is blocked. */ } }, [lesson.slug, visited, completed, answers, drills, mirrors, workbooks, scans, growthReviewed]);
  useEffect(() => { cancelSageVoice(); }, [lesson.slug]);
  useEffect(() => { if (!navOpen) return undefined; closeRef.current?.focus(); const prior = document.body.style.overflow; document.body.style.overflow = 'hidden'; const onKey = (event) => { if (event.key === 'Escape') { setNavOpen(false); menuRef.current?.focus(); return; } if (event.key !== 'Tab') return; const nodes = focusableWithin(navRef.current); if (!nodes.length) return; const first = nodes[0]; const last = nodes[nodes.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }; window.addEventListener('keydown', onKey); return () => { document.body.style.overflow = prior; window.removeEventListener('keydown', onKey); }; }, [navOpen]);

  const select = (index) => { const next = Math.min(Math.max(index, 0), rootTwoLessons.length - 1); const nextSlug = rootTwoLessons[next].slug; cancelSageVoice(); setNavOpen(false); setVisited((items) => items.includes(nextSlug) ? items : [...items, nextSlug]); if (onLessonChange && next !== activeIndex) { onLessonChange(nextSlug); return; } setActiveIndex(next); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
  const toggleComplete = () => setCompleted((items) => items.includes(lesson.slug) ? items.filter((slug) => slug !== lesson.slug) : ready ? [...items, lesson.slug] : items);

  return <main className="root-two-exchange"><a className="r2-skip-link" href="#r2-lesson-content">Skip to lesson content</a><ExchangeBackdrop /><header className="r2-topbar"><button type="button" onClick={() => go('dashboard')}><ArrowLeft /> The Grove</button><button type="button" className="r2-brand" onClick={() => go('home')} aria-label="RootWise home"><ApprovedArtwork variant="tree" /><span><strong>Root$Wise</strong><small>Root Two · Value &amp; Earning</small></span></button><button ref={menuRef} type="button" onClick={() => setNavOpen(true)} aria-expanded={navOpen} aria-controls="r2-navigation"><Menu /> Lessons</button></header><div className="r2-progress" role="progressbar" aria-label={`Root Two progress: ${completed.length} of ${rootTwoLessons.length} lessons rooted`} aria-valuemin={0} aria-valuemax={rootTwoLessons.length} aria-valuenow={completed.length}><i style={{ width: `${percent}%` }} /></div><div className="r2-mobile-lesson-bar"><span>{lesson.number} · {lesson.title}</span><strong>{activeIndex + 1}/{rootTwoLessons.length}</strong></div>
    <div className="r2-shell">{navOpen && <button type="button" className="r2-nav-scrim" onClick={() => { setNavOpen(false); menuRef.current?.focus(); }} aria-label="Close lesson menu" />}<div id="r2-navigation" className={navOpen ? 'r2-nav-wrap is-open' : 'r2-nav-wrap'}><DistrictNavigation activeIndex={activeIndex} visited={visited} completed={completed} onSelect={select} onClose={() => { setNavOpen(false); menuRef.current?.focus(); }} closeRef={closeRef} navRef={navRef} modal={navOpen} /></div><article id="r2-lesson-content" className="r2-lesson" tabIndex={-1} key={lesson.slug}>{activeIndex === 0 && <OpeningExperience />}<section className="r2-lesson-title"><div><p className="r2-eyebrow">District {district.number} · {district.theme}</p><span>Lesson {lesson.number} · {activeIndex + 1} of {rootTwoLessons.length}</span><h1>{lesson.title}</h1><p>{lesson.focus}</p></div></section><SageOpening lesson={lesson} /><StoryScene lesson={lesson} /><ExchangeScan lesson={lesson} value={scans[lesson.slug] || []} onChange={(value) => setScans((items) => ({ ...items, [lesson.slug]: value }))} /><AdultLayers lesson={lesson} /><FinancialParallel lesson={lesson} /><PrivatePanel lesson={lesson} kind="mirror" value={mirrors[lesson.slug]} onChange={(value) => setMirrors((items) => ({ ...items, [lesson.slug]: value }))} /><PrivatePanel lesson={lesson} kind="workbook" value={workbooks[lesson.slug]} onChange={(value) => setWorkbooks((items) => ({ ...items, [lesson.slug]: value }))} /><ChoicePanel lesson={lesson} kind="check" value={answers[lesson.slug]} onChange={(value) => setAnswers((items) => ({ ...items, [lesson.slug]: value }))} /><ChoicePanel lesson={lesson} kind="drill" value={drills[lesson.slug]} onChange={(value) => setDrills((items) => ({ ...items, [lesson.slug]: value }))} /><GrowthStatement lesson={lesson} reviewed={growthReady} onReview={(value) => setGrowthReviewed((items) => ({ ...items, [lesson.slug]: value }))} completed={completed.includes(lesson.slug)} ready={ready} percent={percent} missing={missing} /><Sources lesson={lesson} /><section className="r2-next"><Landmark /><div><p className="r2-eyebrow">The Exchange District continues</p><p>{lesson.transition}</p></div></section><footer className="r2-footer"><button type="button" onClick={() => select(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft /> Previous</button><button type="button" className={completed.includes(lesson.slug) ? 'is-complete' : ''} onClick={toggleComplete} disabled={!completed.includes(lesson.slug) && !ready} aria-pressed={completed.includes(lesson.slug)}>{completed.includes(lesson.slug) ? <Check /> : <CheckCircle2 />}{completed.includes(lesson.slug) ? 'Lesson rooted' : ready ? 'Root this lesson' : 'Finish the full exchange'}</button><button type="button" onClick={() => activeIndex === rootTwoLessons.length - 1 ? go('/roots/three') : select(activeIndex + 1)}>{activeIndex === rootTwoLessons.length - 1 ? 'Enter Root Three' : 'Next lesson'} <ArrowRight /></button></footer></article><RightRail lesson={lesson} district={district} completed={completed} scans={scans[lesson.slug] || []} /></div><AskSage lesson={lesson} district={district} />
  </main>;
}
