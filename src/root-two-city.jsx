import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BookOpen, Building2, Bus, CarFront, Check,
  CheckCircle2, ChevronRight, CircleHelp, Landmark, Lightbulb, LoaderCircle,
  Menu, MessageCircle, Route, Send, Sparkles, Target, Users, X,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import { queueSageVoice } from './sage-voice-events';
import { rootTwoDistricts, rootTwoQuickPrompts } from './root-two-data';
import './root-two.css';

const PROGRESS_KEY = 'rootwise_root_two_journey_v3';
const allLessons = rootTwoDistricts.flatMap((district, districtIndex) =>
  district.lessons.map((lesson, lessonIndex) => ({ districtIndex, lessonIndex, lesson })),
);

function object(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function readProgress() {
  try {
    const saved = object(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'));
    const active = allLessons.findIndex(({ lesson }) =>
      lesson.sourceChapterIndex === saved.chapter && lesson.sourceLessonIndex === saved.lesson,
    );
    const validKeys = new Set(allLessons.map(({ lesson }) => lesson.progressKey));
    return {
      active: active >= 0 ? active : 0,
      completed: Array.isArray(saved.completed) ? saved.completed.filter((key) => validKeys.has(key)) : [],
      answers: object(saved.answers),
      reflections: object(saved.reflections),
    };
  } catch {
    return { active: 0, completed: [], answers: {}, reflections: {} };
  }
}

function DistrictNavigation({ activeDistrict, completed, onSelect, onClose, closeRef }) {
  return (
    <aside className="r2-district-nav">
      <header>
        <div><p>Root Two</p><h2>Value &amp; Earning</h2></div>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close district menu"><X size={19} /></button>
      </header>
      <nav aria-label="Root Two districts">
        {rootTwoDistricts.map((district, index) => {
          const complete = district.lessons.every((lesson) => completed.includes(lesson.progressKey));
          return (
            <button type="button" className={index === activeDistrict ? 'is-active' : ''} onClick={() => onSelect(index)} aria-current={index === activeDistrict ? 'step' : undefined} key={district.key}>
              <span>{complete ? <Check size={14} /> : district.number}</span>
              <span><small>{district.theme}</small><strong>{district.title}</strong></span>
              <ChevronRight size={15} />
            </button>
          );
        })}
      </nav>
      <footer><span>{completed.length} of {allLessons.length} lessons rooted</span><i><b style={{ width: `${completed.length / allLessons.length * 100}%` }} /></i></footer>
    </aside>
  );
}

function LessonNavigation({ district, lessonIndex, completed, onSelect }) {
  return (
    <section className="r2-card r2-lesson-map" aria-label={`${district.title} lessons`}>
      <p className="r2-eyebrow"><BookOpen size={15} /> District lessons</p>
      <div>{district.lessons.map((lesson, index) => (
        <button type="button" className={index === lessonIndex ? 'is-active' : ''} onClick={() => onSelect(index)} aria-current={index === lessonIndex ? 'step' : undefined} key={lesson.progressKey}>
          <span>{completed.includes(lesson.progressKey) ? <Check size={14} /> : lesson.number}</span><strong>{lesson.title}</strong>
        </button>
      ))}</div>
    </section>
  );
}

function Story({ lesson }) {
  return (
    <section className="r2-card r2-story">
      <p className="r2-eyebrow"><Sparkles size={15} /> Ivy, Eli &amp; Sage</p>
      <h2>{lesson.opening}</h2>
      <div className="r2-story-flow">{lesson.story.map((beat, index) => beat.type === 'narration' ? (
        <p key={`${lesson.progressKey}-story-${index}`}>{beat.text}</p>
      ) : (
        <blockquote className={beat.type === 'sage' ? 'is-sage' : ''} key={`${lesson.progressKey}-story-${index}`}><cite>{beat.speaker || 'Sage'}</cite><p>“{beat.text}”</p></blockquote>
      ))}</div>
    </section>
  );
}

function Learning({ lesson }) {
  return (
    <>
      <section className="r2-card r2-parallel"><p className="r2-eyebrow"><Lightbulb size={15} /> Financial parallel</p><h2>{lesson.concept.title}</h2><p>{lesson.concept.explanation}</p></section>
      <section className="r2-card r2-deep-dive"><p className="r2-eyebrow"><Route size={15} /> Deeper explanation</p><h2>What changes when you use the full picture</h2><div><article><span>01</span><h3>Consequence &amp; tradeoff</h3><p>{lesson.tradeoff}</p></article><article><span>02</span><h3>Recognize it in your life</h3><p>{lesson.connection}</p></article></div></section>
    </>
  );
}

function Practice({ lesson, answer, reflection, onAnswer, onReflection }) {
  const selected = answer === undefined ? null : lesson.check.options[answer];
  return (
    <>
      <section className="r2-card r2-scenario">
        <p className="r2-eyebrow"><Target size={15} /> Interactive scenario</p>
        <h2>{lesson.application.prompt}</h2>
        <label htmlFor={`r2-reflection-${lesson.progressKey}`}>Your private response<textarea id={`r2-reflection-${lesson.progressKey}`} rows={5} value={reflection || ''} onChange={(event) => onReflection(event.target.value)} placeholder={lesson.application.placeholder} /></label>
        <small>This response stays on this device.</small>
      </section>
      <section className="r2-card r2-check">
        <p className="r2-eyebrow"><CircleHelp size={15} /> Knowledge check</p><h2>{lesson.check.prompt}</h2>
        <div className="r2-options">{lesson.check.options.map((option, index) => (
          <button type="button" className={answer === index ? 'is-selected' : ''} aria-pressed={answer === index} onClick={() => onAnswer(index)} key={`${lesson.progressKey}-answer-${index}`}><span>{answer === index ? <Check size={15} /> : <ArrowRight size={15} />}</span>{option.label}</button>
        ))}</div>
        {selected && <div className={selected.correct ? 'r2-feedback is-correct' : 'r2-feedback'} aria-live="polite"><strong>{selected.correct ? 'Rooted' : 'Look one step deeper'}</strong><p>{selected.feedback}</p></div>}
      </section>
      <section className="r2-card r2-carry"><p className="r2-eyebrow"><CheckCircle2 size={15} /> What you carry forward</p><blockquote>{lesson.takeaway}</blockquote></section>
    </>
  );
}

function AskSage({ district, lesson }) {
  const [threads, setThreads] = useState({});
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null); const toggleRef = useRef(null); const closeRef = useRef(null); const listRef = useRef(null);
  const messages = useMemo(() => threads[lesson.progressKey] || [{ role: 'assistant', content: `We’re in ${lesson.title}. Ask me about the story, the financial idea, or how it works in real life.` }], [threads, lesson]);

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, sending]);
  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus(); const previous = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
      if (event.key === 'Tab') {
        const nodes = panelRef.current?.querySelectorAll('button:not(:disabled), textarea:not(:disabled)');
        if (!nodes?.length) return; const first = nodes[0]; const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); };
  }, [open]);

  const send = async (message) => {
    const clean = message.trim(); if (!clean || sending) return;
    const next = [...messages, { role: 'user', content: clean }];
    setThreads((current) => ({ ...current, [lesson.progressKey]: next })); setDraft(''); setSending(true);
    const controller = new AbortController(); const timeout = window.setTimeout(() => controller.abort(), 22000);
    try {
      const response = await fetch('/api/sage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ root: 'two', message: clean, district: { key: district.key, lesson: lesson.number }, history: messages.slice(-9) }), signal: controller.signal });
      const payload = await response.json().catch(() => ({})); if (!response.ok || !payload.reply) throw new Error('unavailable');
      queueSageVoice(payload.reply, 'Sage answered your question.');
      setThreads((current) => ({ ...current, [lesson.progressKey]: [...next, { role: 'assistant', content: payload.reply }] }));
    } catch (error) {
      setThreads((current) => ({ ...current, [lesson.progressKey]: [...next, { role: 'assistant', unavailable: true, content: error?.name === 'AbortError' ? 'That took too long. Your question is saved here—please try again in a moment.' : 'I can’t reach the conversation service right now. Use the financial parallel as your guide, and try me again shortly.' }] }));
    } finally { window.clearTimeout(timeout); setSending(false); }
  };
  const quick = (label) => `${label} for ${lesson.title}. Connect it to Ivy and Eli, use plain language, and stay focused on value and earning.`;

  return <>
    <button ref={toggleRef} type="button" className="r2-sage-toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="r2-sage-panel"><MessageCircle size={18} /> Ask Sage</button>
    {open && <button type="button" className="r2-sage-scrim" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage" />}
    <aside ref={panelRef} id="r2-sage-panel" className={open ? 'r2-sage is-open' : 'r2-sage'} aria-label="Ask Sage support">
      <header><div><Sparkles size={18} /><span><strong>Ask Sage</strong><small>{lesson.title}</small></span></div><button ref={closeRef} type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage"><X size={19} /></button></header>
      <div className="r2-sage-messages" ref={listRef} aria-live="polite">{messages.map((message, index) => <div className={`${message.role} ${message.unavailable ? 'is-unavailable' : ''}`} key={`${lesson.progressKey}-message-${index}`}><strong>{message.role === 'assistant' ? 'Sage' : 'You'}</strong><p>{message.content}</p></div>)}{sending && <div className="assistant"><LoaderCircle className="r2-spin" size={17} /><p>Sage is thinking…</p></div>}</div>
      <div className="r2-quick">{rootTwoQuickPrompts.map((prompt) => <button type="button" disabled={sending} onClick={() => send(quick(prompt.label))} key={prompt.key}>{prompt.label}</button>)}</div>
      <form onSubmit={(event) => { event.preventDefault(); send(draft); }}><label htmlFor={`r2-sage-question-${lesson.progressKey}`}>Ask about this lesson</label><div><textarea id={`r2-sage-question-${lesson.progressKey}`} rows={3} maxLength={700} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What are you wondering?" /><button type="submit" disabled={!draft.trim() || sending} aria-label="Send question to Sage"><Send size={17} /></button></div></form>
    </aside>
  </>;
}

function GuideRail({ district, lesson, completed, activeIndex, onNext }) {
  const districtDone = district.lessons.filter((item) => completed.includes(item.progressKey)).length;
  const next = allLessons[activeIndex + 1]?.lesson;
  return (
    <div className="r2-guide-cards">
      <section><ApprovedArtwork variant="sage" /><div><small>Sage the Guide</small><strong>{lesson.focus}</strong><p>{district.arc}</p></div></section>
      <section><Users size={19} /><div><small>Ivy &amp; Eli</small><strong>The story continues</strong><p>{lesson.opening}</p></div></section>
      <section><Building2 size={19} /><div><small>District progress</small><strong>{districtDone} of {district.lessons.length} lessons</strong><i><b style={{ width: `${districtDone / district.lessons.length * 100}%` }} /></i></div></section>
      {next && <button type="button" onClick={onNext}><Route size={19} /><span><small>Up next</small><strong>{next.title}</strong></span><ChevronRight size={16} /></button>}
    </div>
  );
}

export default function RootTwoCity({ go }) {
  const saved = useMemo(() => readProgress(), []);
  const [activeIndex, setActiveIndex] = useState(saved.active || 0);
  const [completed, setCompleted] = useState(saved.completed || []);
  const [answers, setAnswers] = useState(saved.answers || {});
  const [reflections, setReflections] = useState(saved.reflections || {});
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef(null); const closeRef = useRef(null);
  const current = allLessons[activeIndex]; const district = rootTwoDistricts[current.districtIndex]; const lesson = current.lesson;
  const selectedAnswer = answers[lesson.progressKey]; const correct = selectedAnswer !== undefined && lesson.check.options[selectedAnswer]?.correct;

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ chapter: lesson.sourceChapterIndex, lesson: lesson.sourceLessonIndex, completed, answers, reflections }));
  }, [lesson, completed, answers, reflections]);
  useEffect(() => {
    if (!navOpen) return undefined; closeRef.current?.focus();
    const onKey = (event) => { if (event.key === 'Escape') { setNavOpen(false); menuRef.current?.focus(); } };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  const selectGlobal = (index) => { setActiveIndex(Math.max(0, Math.min(index, allLessons.length - 1))); setNavOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const selectDistrict = (districtIndex) => selectGlobal(allLessons.findIndex((item) => item.districtIndex === districtIndex));
  const selectLesson = (lessonIndex) => selectGlobal(allLessons.findIndex((item) => item.districtIndex === current.districtIndex && item.lessonIndex === lessonIndex));
  const toggleComplete = () => setCompleted((items) => items.includes(lesson.progressKey) ? items.filter((key) => key !== lesson.progressKey) : [...items, lesson.progressKey]);

  return (
    <main className="root-two-city">
      <div className="root-two-backdrop" aria-hidden="true"><div className="r2-city-hall"><Landmark /><span>City Hall</span></div><div className="r2-traffic"><Bus /><CarFront /><CarFront /></div></div>
      <header className="r2-topbar"><button type="button" onClick={() => go('dashboard')}><ArrowLeft size={17} /> The Grove</button><button type="button" className="r2-brand" onClick={() => go('home')} aria-label="RootWise home"><ApprovedArtwork variant="tree" /><span><strong>Root$Wise</strong><small>Root Two · Value &amp; Earning</small></span></button><button ref={menuRef} type="button" onClick={() => setNavOpen(true)} aria-expanded={navOpen} aria-controls="r2-district-navigation"><Menu size={18} /> Districts</button></header>
      <div className="r2-progress" role="progressbar" aria-label="Root Two progress" aria-valuemin={0} aria-valuemax={allLessons.length} aria-valuenow={completed.length}><i style={{ width: `${completed.length / allLessons.length * 100}%` }} /></div>
      {navOpen && <button type="button" className="r2-nav-scrim" aria-label="Close district menu" onClick={() => { setNavOpen(false); menuRef.current?.focus(); }} />}
      <div className="r2-layout">
        <div id="r2-district-navigation" className={navOpen ? 'r2-nav-wrap is-open' : 'r2-nav-wrap'}><DistrictNavigation activeDistrict={current.districtIndex} completed={completed} onSelect={selectDistrict} onClose={() => { setNavOpen(false); menuRef.current?.focus(); }} closeRef={closeRef} /></div>
        <article className="r2-lesson" key={lesson.progressKey}>
          <section className="r2-promise"><p className="r2-eyebrow"><Target size={15} /> District {district.number} · {district.theme}</p><h1>{lesson.title}</h1><p>{lesson.focus}</p><span>Lesson {lesson.number} · {activeIndex + 1} of {allLessons.length}</span></section>
          <LessonNavigation district={district} lessonIndex={current.lessonIndex} completed={completed} onSelect={selectLesson} />
          <Story lesson={lesson} /><Learning lesson={lesson} />
          <Practice lesson={lesson} answer={selectedAnswer} reflection={reflections[lesson.progressKey]} onAnswer={(answer) => setAnswers((items) => ({ ...items, [lesson.progressKey]: answer }))} onReflection={(reflection) => setReflections((items) => ({ ...items, [lesson.progressKey]: reflection }))} />
          <footer className="r2-lesson-footer"><button type="button" onClick={() => selectGlobal(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft size={17} /> Previous</button><button type="button" className={completed.includes(lesson.progressKey) ? 'is-complete' : ''} onClick={toggleComplete} disabled={!completed.includes(lesson.progressKey) && !correct} aria-pressed={completed.includes(lesson.progressKey)}>{completed.includes(lesson.progressKey) ? <Check size={17} /> : <CheckCircle2 size={17} />}{completed.includes(lesson.progressKey) ? 'Lesson rooted' : correct ? 'Root this lesson' : 'Complete the check'}</button><button type="button" onClick={() => activeIndex === allLessons.length - 1 ? go('dashboard') : selectGlobal(activeIndex + 1)}>{activeIndex === allLessons.length - 1 ? 'Return to Grove' : 'Next lesson'} <ArrowRight size={17} /></button></footer>
        </article>
        <aside className="r2-right-rail"><GuideRail district={district} lesson={lesson} completed={completed} activeIndex={activeIndex} onNext={() => selectGlobal(activeIndex + 1)} /><AskSage district={district} lesson={lesson} /></aside>
      </div>
    </main>
  );
}
