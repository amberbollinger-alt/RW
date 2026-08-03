import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronRight,
  ExternalLink, Eye, EyeOff, LoaderCircle, Menu, MessageCircle, Play, Send,
  Sparkles, Waves, X,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import lessons from './root-four-master-data.json';
import { queueSageVoice } from './sage-voice-events';
import './root-four.css';

export const ROOT_FOUR_PROGRESS_KEY = 'rootwise_root_four_reservoir_progress_v3';
const CONTENT_NOTE = 'This Root includes the sudden death of a parent, grief, alcohol misuse and dependence, job loss, and recovery. Nothing graphic is shown. Pause, return later, or use the concept-first view at any time.';
const openingFeelings = ['Relief — something may be there when life changes', 'Restriction — today loses something so tomorrow can have it', 'Pride — the balance feels like proof I am doing well', 'Fear — no amount feels safe enough', 'Impossibility — current life already uses what is available', 'I am not sure yet'];
const blank = { activeIndex: 0, visited: [], completed: [], answers: {}, decisions: {}, lenses: {}, mirrors: {}, mirrorStatus: {}, workbooks: {}, workbookStatus: {}, conceptFirst: false, feeling: '' };
const safeObject = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : {};

function readProgress() {
  try {
    const value = { ...blank, ...safeObject(JSON.parse(localStorage.getItem(ROOT_FOUR_PROGRESS_KEY) || '{}')) };
    const keys = new Set(lessons.map((lesson) => lesson.key));
    value.activeIndex = Math.max(0, Math.min(Number(value.activeIndex) || 0, lessons.length - 1));
    value.visited = (value.visited || []).filter((key) => keys.has(key));
    value.completed = (value.completed || []).filter((key) => keys.has(key));
    return value;
  } catch { return blank; }
}

function Narration({ lesson }) {
  const lines = [lesson.sageOpen, ...lesson.story.map((line) => line.speaker ? `${line.speaker}: ${line.text}` : line.text)];
  return <div className="r4-narration"><button type="button" onClick={() => queueSageVoice(lines.join(' '), 'Root Four narration is ready.')}><Play /> Listen to Sage</button><span>Pause, resume, and replay in the shared Sage player.</span></div>;
}

function Story({ lesson, hidden }) {
  if (hidden) return <section className="r4-card r4-concept-note"><EyeOff /><div><h2>Concept-first view is on</h2><p>The complete story remains available. Turn story view back on whenever you are ready.</p></div></section>;
  return <section className="r4-card"><p className="r4-eyebrow"><BookOpen /> The continuing story</p><h2>{lesson.title}</h2><div className="r4-story">{lesson.story.map((line, index) => line.type === 'dialogue' ? <blockquote className={line.speaker === 'Sage' ? 'is-sage' : ''} key={index}><cite>{line.speaker}</cite><p>“{line.text}”</p></blockquote> : <p key={index}>{line.text}</p>)}</div></section>;
}

function Levels({ lesson }) {
  const names = ['Understand', 'Recognize', 'Examine'];
  return <section className="r4-card r4-learning"><header><p className="r4-eyebrow"><Waves /> Three levels of adult understanding</p><h2>Keep the lesson. Deepen how you use it.</h2></header>{lesson.levels.map((level, index) => <article className="r4-understanding-level" key={level.number}><span>0{level.number}</span><div><p className="r4-level-question">Level {level.number} · {names[index]} · {level.guiding}</p><h3>{level.title}</h3>{level.paragraphs.map((text) => <p key={text}>{text}</p>)}{level.details.map((detail) => <section key={detail.title}><strong>{detail.title}</strong>{detail.body && <p>{detail.body}</p>}{detail.items && <ul>{detail.items.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}</div></article>)}</section>;
}

function PrivatePanel({ kind, title, prompt, value, status, onValue, onStatus, children = null }) {
  return <section className="r4-card r4-reflection"><div><p className="r4-eyebrow"><MessageCircle /> {kind} · Private on this device</p><h2>{title}</h2><p>{prompt}</p>{children}<label>Your private entry<textarea value={value || ''} rows={6} onChange={(event) => { onValue(event.target.value); onStatus(''); }} placeholder="Use ranges, categories, a fictional example, or leave this blank." /></label><div className="r4-application-actions"><button type="button" disabled={!String(value || '').trim()} onClick={() => onStatus('saved')}><Check /> Save privately</button><button type="button" onClick={() => onStatus('skipped')}>Continue without writing</button>{value && <button type="button" onClick={() => { onValue(''); onStatus(''); }}>Clear entry</button>}</div>{status && <p className="r4-application-status" aria-live="polite"><CheckCircle2 /> {status === 'saved' ? 'Saved only on this device.' : 'Intentional skip saved. You may return later.'}</p>}</div><aside><strong>Privacy note</strong><p>Exact financial, health, employment, bereavement, or substance-use information is never required and is not sent to Ask Sage.</p></aside></section>;
}

function AskSage({ lesson }) {
  const welcome = `We’re at ${lesson.title}. Ask me to separate the reservoir’s purpose, access, tradeoff, limit, or rebuilding path.`;
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: welcome }]);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const send = async (message) => {
    const clean = message.trim();
    if (!clean || sending) return;
    const next = [...messages, { role: 'user', content: clean }];
    setMessages(next);
    setDraft('');
    setSending(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 22000);
    try {
      const response = await fetch('/api/sage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          root: 'four',
          message: clean,
          lesson: {
            number: lesson.number,
            title: lesson.title,
            story: lesson.story.map((line) => `${line.speaker ? `${line.speaker}: ` : ''}${line.text}`).join(' ').slice(0, 1200),
            connection: lesson.levels.flatMap((level) => level.paragraphs).join(' ').slice(0, 900),
            boundaries: lesson.lenses.map((lens) => `${lens.title}: ${lens.body}`).join(' ').slice(0, 600),
          },
          history: messages.slice(-9),
        }),
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.reply) throw new Error('unavailable');
      setMessages([...next, { role: 'assistant', content: payload.reply }]);
      queueSageVoice(payload.reply, 'Sage answered your Root Four question.');
    } catch {
      setMessages([...next, { role: 'assistant', unavailable: true, content: 'The conversation service is not reachable right now. The lesson, sources, private work, and narration remain available.' }]);
    } finally {
      window.clearTimeout(timeout);
      setSending(false);
    }
  };
  return <>
    <button ref={toggleRef} type="button" className="r4-sage-toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="r4-sage-panel"><MessageCircle /> Ask Sage</button>
    {open && <button type="button" className="r4-sage-scrim" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage" />}
    <aside id="r4-sage-panel" className={open ? 'r4-sage is-open' : 'r4-sage'} role="dialog" aria-modal="true" aria-hidden={!open} aria-label="Ask Sage support">
      <header><div><Sparkles /><span><strong>Ask Sage</strong><small>{lesson.title}</small></span></div><button ref={closeRef} type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage"><X /></button></header>
      <div className="r4-sage-messages" aria-live="polite">{messages.map((message, index) => <div className={`${message.role} ${message.unavailable ? 'is-unavailable' : ''}`} key={`${lesson.key}-${index}`}><strong>{message.role === 'assistant' ? 'Sage' : 'You'}</strong><p>{message.content}</p></div>)}{sending && <div className="assistant"><LoaderCircle className="r4-spin" /><p>Sage is thinking…</p></div>}</div>
      <div className="r4-quick">{['Name the purpose', 'Show the access tradeoff', 'Separate grief from the math', 'Map the rebuilding path'].map((prompt) => <button type="button" disabled={sending} onClick={() => send(`${prompt} in ${lesson.title}. Keep the Reservoir Valley story and RootWise boundaries in view.`)} key={prompt}>{prompt}</button>)}</div>
      <form onSubmit={(event) => { event.preventDefault(); send(draft); }}><label htmlFor={`r4-sage-${lesson.key}`}>Ask about this lesson</label><div><textarea id={`r4-sage-${lesson.key}`} rows={3} maxLength={700} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What are you trying to understand?" /><button type="submit" disabled={!draft.trim() || sending} aria-label="Send question"><Send /></button></div></form>
      <footer>Do not share exact financial, health, employment, bereavement, substance-use, identity, or location details. Sage provides education and reflection support—not diagnosis, treatment, crisis care, or individualized financial direction.</footer>
    </aside>
  </>;
}

function Lesson({ lesson, state, setField }) {
  const answer = state.answers[lesson.key];
  const decision = state.decisions[lesson.key];
  const checked = lesson.check.options.find((item) => item.id === answer);
  const chosen = lesson.drill.options.find((item) => item.id === decision);
  const activeLenses = state.lenses[lesson.key] || [];
  return <>
    <section className="r4-promise"><p className="r4-eyebrow">Part {lesson.part} · {lesson.partTitle}</p><h1>{lesson.title}</h1><p>{lesson.promise}</p><span>Lesson {lesson.number} of 22 · {lesson.season}</span></section>
    <section className="r4-card r4-sage-open"><img src="/rootwise-sage-cutout.png" alt="" /><div><p className="r4-eyebrow"><Sparkles /> Sage opens the path</p><blockquote>“{lesson.sageOpen}”</blockquote><Narration lesson={lesson} /></div></section>
    <Story lesson={lesson} hidden={state.conceptFirst} />
    <Levels lesson={lesson} />
    <section className="r4-card r4-scan"><p className="r4-eyebrow"><Waves /> Reservoir Scan</p><h2>Open all four gates</h2><div className="r4-lens-grid">{lesson.lenses.map((lens) => <button type="button" className={activeLenses.includes(lens.id) ? 'is-selected' : ''} aria-pressed={activeLenses.includes(lens.id)} onClick={() => setField('lenses', [...new Set([...activeLenses, lens.id])])} key={lens.id}><strong>{activeLenses.includes(lens.id) && <Check />} {lens.title}</strong><span>{lens.body}</span></button>)}</div></section>
    <section className="r4-card r4-check"><p className="r4-eyebrow">Knowledge Check</p><h2>{lesson.check.prompt}</h2><div className="r4-options">{lesson.check.options.map((item) => <button type="button" className={answer === item.id ? 'is-selected' : ''} onClick={() => setField('answers', item.id)} key={item.id}>{answer === item.id ? <Check /> : <ChevronRight />}{item.label}</button>)}</div>{checked && <div className={checked.isCorrect ? 'r4-feedback is-strong' : 'r4-feedback'} aria-live="polite"><strong>{checked.isCorrect ? 'That reasoning holds' : 'Look beneath the first answer'}</strong><p>{checked.feedback}</p></div>}</section>
    <section className="r4-card r4-activity"><p className="r4-eyebrow">Reservoir Decision Drill</p><h2>{lesson.drill.prompt}</h2><p>{lesson.drill.setup}</p><div className="r4-options">{lesson.drill.options.map((item) => <button type="button" className={decision === item.id ? 'is-selected' : ''} onClick={() => setField('decisions', item.id)} key={item.id}>{decision === item.id ? <Check /> : <ArrowRight />}{item.label}</button>)}</div>{chosen && <div className="r4-consequence"><div><strong>What follows</strong><p>{chosen.consequence}</p></div><blockquote><strong>Sage</strong><p>“{chosen.sage}”</p></blockquote></div>}</section>
    <PrivatePanel kind="Private Mirror Reflection" title="Ivy is a mirror, not a diagnosis" prompt={lesson.mirror} value={state.mirrors[lesson.key]} status={state.mirrorStatus[lesson.key]} onValue={(value) => setField('mirrors', value)} onStatus={(value) => setField('mirrorStatus', value)} />
    <PrivatePanel kind="Private Apply It Now" title={lesson.workbook.title} prompt={lesson.workbook.intro} value={state.workbooks[lesson.key]} status={state.workbookStatus[lesson.key]} onValue={(value) => setField('workbooks', value)} onStatus={(value) => setField('workbookStatus', value)}>{lesson.workbook.prompts.length > 0 && <ul>{lesson.workbook.prompts.map((item) => <li key={item.label}><strong>{item.label}:</strong> {item.prompt}</li>)}</ul>}</PrivatePanel>
    <section className="r4-card r4-sources"><p className="r4-eyebrow">Source Desk</p><h2>Follow the evidence</h2>{lesson.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span><strong>{source.title}</strong><small>{source.note}</small></span><ExternalLink /></a>)}</section>
    <section className="r4-card r4-root-growth"><p className="r4-eyebrow"><CheckCircle2 /> Root Growth</p><h2>{lesson.growth.capacity}</h2><p>{lesson.growth.truth}</p></section>
    <section className="r4-next"><Waves /><div><p className="r4-eyebrow">The water continues</p><p>{lesson.transition}</p></div></section>
  </>;
}

export default function RootFourValley({ go, initialLessonKey, onLessonChange }) {
  const requested = lessons.findIndex((lesson) => lesson.key === initialLessonKey);
  const [state, setState] = useState(() => {
    const saved = readProgress();
    const index = requested >= 0 ? requested : saved.activeIndex;
    return { ...saved, activeIndex: index, visited: [...new Set([...saved.visited, lessons[index].key])] };
  });
  const activeIndex = requested >= 0 ? requested : state.activeIndex;
  const lesson = lessons[activeIndex];
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef(null);
  const closeMenuRef = useRef(null);
  useEffect(() => localStorage.setItem(ROOT_FOUR_PROGRESS_KEY, JSON.stringify(state)), [state]);
  useEffect(() => {
    if (!navOpen) return undefined;
    closeMenuRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setNavOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);
  const keyed = (field, value) => setState((current) => ({ ...current, [field]: { ...current[field], [lesson.key]: value } }));
  const correct = lesson.check.options.find((item) => item.isCorrect)?.id;
  const ready = (state.lenses[lesson.key] || []).length === 4 && state.answers[lesson.key] === correct && Boolean(state.decisions[lesson.key]) && ['saved', 'skipped'].includes(state.mirrorStatus[lesson.key]) && ['saved', 'skipped'].includes(state.workbookStatus[lesson.key]);
  const select = (index) => {
    const next = Math.max(0, Math.min(index, lessons.length - 1));
    setNavOpen(false);
    if (onLessonChange) onLessonChange(lessons[next].key);
    else setState((current) => ({ ...current, activeIndex: next, visited: [...new Set([...current.visited, lessons[next].key])] }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const complete = () => setState((current) => ({ ...current, completed: [...new Set([...current.completed, lesson.key])] }));
  return <main className={navOpen ? 'root-four-valley is-nav-open' : 'root-four-valley'}><div className={`r4-landscape r4-stage-${Math.floor(activeIndex / 5)}`} aria-hidden="true"><img src="/root-four-weathered-reservoir.jpg" alt="" /><div className="r4-landscape-shade" /></div>
    <header className="r4-topbar"><button type="button" onClick={() => go('dashboard')}><ArrowLeft /> The Grove</button><button type="button" className="r4-brand" onClick={() => go('home')}><ApprovedArtwork variant="tree" /><span><strong>Root$Wise</strong><small>Root Four · Saving, Preparedness &amp; Resilience</small></span></button><button ref={menuRef} type="button" onClick={() => setNavOpen(true)} aria-expanded={navOpen} aria-controls="r4-chapter-navigation"><Menu /> Lessons</button></header>
    <div className="r4-progress" role="progressbar" aria-label="Root Four progress" aria-valuemin={0} aria-valuemax={22} aria-valuenow={state.completed.length}><i style={{ width: `${state.completed.length / 22 * 100}%` }} /></div>
    <div className="r4-content-note"><strong>Content note</strong><p>{CONTENT_NOTE}</p><button type="button" onClick={() => setState((current) => ({ ...current, conceptFirst: !current.conceptFirst }))}>{state.conceptFirst ? <Eye /> : <EyeOff />}{state.conceptFirst ? 'Show complete story' : 'Use concept-first view'}</button></div>
    {activeIndex === 0 && <section className="r4-opening"><div className="r4-opening-copy"><p className="r4-eyebrow">Root Four · Reservoir Valley</p><h1>Saving, Preparedness &amp; Resilience</h1><blockquote>How can I carry present money forward so future disruptions, needs, and goals do not take every choice away?</blockquote><h2>Ivy thought saving meant keeping money. Reservoir Valley asks what the money is keeping <em>for</em>.</h2></div><fieldset className="r4-pressure"><legend>When you hear “saving,” which feeling arrives first?</legend><div>{openingFeelings.map((feeling) => <button type="button" className={state.feeling === feeling ? 'is-selected' : ''} onClick={() => setState((current) => ({ ...current, feeling }))} key={feeling}>{state.feeling === feeling ? <Check /> : <ChevronRight />}{feeling}</button>)}</div></fieldset></section>}
    <div className="r4-shell">{navOpen && <button type="button" className="r4-nav-scrim" onClick={() => { setNavOpen(false); menuRef.current?.focus(); }} aria-label="Close lesson menu" />}<aside id="r4-chapter-navigation" className={navOpen ? 'r4-nav-wrap is-open' : 'r4-nav-wrap'}><div className="r4-chapter-nav"><header><div><p>Root Four</p><h2>Reservoir Valley</h2></div><button ref={closeMenuRef} type="button" onClick={() => { setNavOpen(false); menuRef.current?.focus(); }} aria-label="Close lesson menu"><X /></button></header><nav aria-label="Root Four lessons">{lessons.map((item, index) => <button type="button" className={index === activeIndex ? 'is-active' : ''} aria-current={index === activeIndex ? 'step' : undefined} onClick={() => select(index)} key={item.key}><span>{state.completed.includes(item.key) ? <Check /> : item.number}</span><span><small>Part {item.part} · {item.season}</small><strong>{item.title}</strong></span><ChevronRight /></button>)}</nav><footer>{state.completed.length} of 22 lessons complete</footer></div></aside>
      <article className="r4-lesson"><Lesson lesson={lesson} state={state} setField={keyed} /><footer className="r4-footer"><button type="button" disabled={activeIndex === 0} onClick={() => select(activeIndex - 1)}><ArrowLeft /> Previous</button><button type="button" disabled={!ready} className={state.completed.includes(lesson.key) ? 'is-complete' : ''} onClick={complete}><CheckCircle2 />{state.completed.includes(lesson.key) ? 'Lesson complete' : ready ? 'Complete lesson' : 'Finish all lesson steps'}</button><button type="button" onClick={() => activeIndex === 21 ? go('/roots/five') : select(activeIndex + 1)}>{activeIndex === 21 ? 'Enter Root Five' : 'Next lesson'} <ArrowRight /></button></footer></article>
    </div>
    <AskSage key={lesson.key} lesson={lesson} />
  </main>;
}
