import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Building2, Bus, CarFront, Check, CheckCircle2,
  ChevronRight, CircleHelp, Landmark, Lightbulb, LoaderCircle, Menu,
  MessageCircle, Route, Send, Sparkles, Target, CarTaxiFront, X,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import { queueSageVoice } from './sage-voice-events';
import { rootThreeDistricts, rootThreeQuickPrompts } from './root-three-data';
import './root-three.css';

const PROGRESS_KEY = 'rootwise_root_three_city_progress_v1';

function readProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(PROGRESS_KEY) || 'null');
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    const keys = new Set(rootThreeDistricts.map((district) => district.key));
    const object = (candidate) => candidate && typeof candidate === 'object' && !Array.isArray(candidate) ? candidate : {};
    const choices = object(value.choices);
    const answers = object(value.answers);
    const completed = Array.isArray(value.completed) ? value.completed.filter((key) => {
      const district = rootThreeDistricts.find((item) => item.key === key);
      const correct = district?.check.options.find((option) => option.isCorrect)?.id;
      return keys.has(key) && choices[key] && answers[key] === correct;
    }) : [];
    return {
      activeIndex: Number.isInteger(value.activeIndex) ? Math.max(0, Math.min(value.activeIndex, rootThreeDistricts.length - 1)) : 0,
      visited: Array.isArray(value.visited) ? value.visited.filter((key) => keys.has(key)) : [],
      completed,
      choices,
      answers,
      reflections: object(value.reflections),
    };
  } catch {
    return {};
  }
}

function CityBackdrop() {
  return (
    <div className="root-three-backdrop" aria-hidden="true">
      <div className="rt-sun" />
      <div className="rt-skyline rt-skyline-left"><i /><i /><i /><i /></div>
      <div className="rt-city-hall"><Landmark /><span>City Hall</span></div>
      <div className="rt-skyline rt-skyline-right"><i /><i /><i /><i /></div>
      <div className="rt-road rt-road-a"><CarFront /><Bus /><CarTaxiFront /></div>
      <div className="rt-road rt-road-b"><CarTaxiFront /><CarFront /><Bus /></div>
    </div>
  );
}

function DistrictNav({ activeIndex, completed, visited, onSelect, onClose, closeRef }) {
  return (
    <aside className="rt-district-nav">
      <header>
        <div><p>Root Three</p><h2>Choice, Cash Flow &amp; Spending</h2></div>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close district menu"><X size={19} /></button>
      </header>
      <nav aria-label="Root Three districts">
        {rootThreeDistricts.map((district, index) => (
          <button type="button" className={activeIndex === index ? 'is-active' : ''} onClick={() => onSelect(index)} aria-current={activeIndex === index ? 'step' : undefined} key={district.key}>
            <span>{completed.includes(district.key) ? <Check size={14} /> : visited.includes(district.key) ? <Building2 size={14} /> : district.number}</span>
            <span><small>{district.theme}</small><strong>{district.shortTitle}</strong></span>
            <ChevronRight size={15} />
          </button>
        ))}
      </nav>
      <footer><span>{completed.length} of 12 districts complete</span><i><b style={{ width: `${completed.length / 12 * 100}%` }} /></i></footer>
    </aside>
  );
}

function Story({ district }) {
  return (
    <section className="rt-card rt-story" aria-labelledby={`rt-story-${district.key}`}>
      <p className="rt-eyebrow"><Sparkles size={15} /> Sage’s story</p>
      <h2 id={`rt-story-${district.key}`}>{district.title}</h2>
      <p className="rt-setting">{district.setting}</p>
      <div className="rt-story-flow">
        {district.story.map((block, index) => block.speaker ? (
          <blockquote className={block.speaker === 'Sage' ? 'is-sage' : ''} key={`${district.key}-${index}`}><cite>{block.speaker}</cite><p>“{block.text}”</p></blockquote>
        ) : <p key={`${district.key}-${index}`}>{block.text}</p>)}
      </div>
    </section>
  );
}

function Learning({ district }) {
  return (
    <>
      <section className="rt-card rt-parallel">
        <p className="rt-eyebrow"><Lightbulb size={15} /> The financial parallel</p>
        <h2>What the district reveals about money</h2>
        <p>{district.parallel}</p>
      </section>
      <section className="rt-card rt-deep-dive">
        <header><p className="rt-eyebrow"><Route size={15} /> Deeper explanation</p><h2>How to recognize and use the idea</h2></header>
        <div>{district.concepts.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>
    </>
  );
}

function Practice({ district, choice, answer, reflection, onChoice, onAnswer, onReflection }) {
  const chosen = district.scenario.options.find((option) => option.id === choice);
  const checked = district.check.options.find((option) => option.id === answer);
  return (
    <>
      <section className="rt-card rt-scenario">
        <p className="rt-eyebrow"><Target size={15} /> Interactive scenario</p>
        <h2>{district.scenario.prompt}</h2><p>{district.scenario.setup}</p>
        <div className="rt-options">{district.scenario.options.map((option) => <button type="button" className={choice === option.id ? 'is-selected' : ''} aria-pressed={choice === option.id} onClick={() => onChoice(option.id)} key={option.id}><span>{choice === option.id ? <Check size={15} /> : <ArrowRight size={15} />}</span>{option.label}</button>)}</div>
        {chosen && <div className="rt-consequence" aria-live="polite"><div><strong>What follows</strong><p>{chosen.consequence}</p></div><blockquote><strong>Sage</strong><p>“{chosen.sage}”</p></blockquote><div><strong>Course correction</strong><p>{chosen.correction}</p></div></div>}
      </section>
      <section className="rt-card rt-check">
        <p className="rt-eyebrow"><CircleHelp size={15} /> Knowledge check</p>
        <h2>{district.check.prompt}</h2>
        <div className="rt-options">{district.check.options.map((option) => <button type="button" className={answer === option.id ? 'is-selected' : ''} aria-pressed={answer === option.id} onClick={() => onAnswer(option.id)} key={option.id}><span>{answer === option.id ? <Check size={15} /> : <ArrowRight size={15} />}</span>{option.label}</button>)}</div>
        {checked && <div className={checked.isCorrect ? 'rt-feedback is-correct' : 'rt-feedback'} aria-live="polite"><strong>{checked.isCorrect ? 'You’ve got it' : 'Look one step deeper'}</strong><p>{checked.isCorrect ? 'You identified the idea and can now carry it into the scenario.' : 'Return to the financial parallel, then try again. The strongest answer uses the full decision—not a shortcut or universal rule.'}</p></div>}
      </section>
      <section className="rt-card rt-reflection">
        <div><p className="rt-eyebrow"><MessageCircle size={15} /> Reflection</p><h2>Make this district yours</h2><ul>{district.reflection.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul><label htmlFor={`rt-reflection-${district.key}`}>Your private reflection<textarea id={`rt-reflection-${district.key}`} rows={5} value={reflection || ''} onChange={(event) => onReflection(event.target.value)} placeholder="This stays on this device." /></label></div>
        <aside><p className="rt-eyebrow"><CheckCircle2 size={15} /> Apply it today</p><p>{district.action}</p></aside>
      </section>
    </>
  );
}

function AskSage({ district }) {
  const [threads, setThreads] = useState({});
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const listRef = useRef(null);
  const messages = useMemo(() => threads[district.key] || [{ role: 'assistant', content: `We’re in ${district.title}. Ask me about the story, the numbers, or how the idea works in real life.` }], [threads, district]);

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, sending]);
  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
      if (event.key === 'Tab') {
        const nodes = panelRef.current?.querySelectorAll('button:not(:disabled), textarea:not(:disabled)');
        if (!nodes?.length) return;
        const first = nodes[0]; const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); };
  }, [open]);

  const send = async (message) => {
    const clean = message.trim();
    if (!clean || sending) return;
    const next = [...messages, { role: 'user', content: clean }];
    setThreads((current) => ({ ...current, [district.key]: next })); setDraft(''); setSending(true);
    const controller = new AbortController(); const timeout = window.setTimeout(() => controller.abort(), 22000);
    try {
      const response = await fetch('/api/sage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ root: 'three', message: clean, district: { key: district.key }, history: messages.slice(-9) }), signal: controller.signal });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.reply) throw new Error('unavailable');
      queueSageVoice(payload.reply, 'Sage answered your question.');
      setThreads((current) => ({ ...current, [district.key]: [...next, { role: 'assistant', content: payload.reply }] }));
    } catch (error) {
      setThreads((current) => ({ ...current, [district.key]: [...next, { role: 'assistant', unavailable: true, content: error?.name === 'AbortError' ? 'That took too long. Your question is saved here—please try again in a moment.' : 'I can’t reach the conversation service right now. Use the district’s financial parallel as your guide, and try me again shortly.' }] }));
    } finally { window.clearTimeout(timeout); setSending(false); }
  };
  const quick = (label) => `${label} for ${district.title}. Connect it to Ivy and Eli, use plain language, and stay focused on choice, cash flow, or spending.`;

  return <>
    <button ref={toggleRef} type="button" className="rt-sage-toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="rt-sage-panel"><MessageCircle size={18} /> Ask Sage</button>
    {open && <button type="button" className="rt-sage-scrim" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage" />}
    <aside ref={panelRef} id="rt-sage-panel" className={open ? 'rt-sage is-open' : 'rt-sage'} aria-label="Ask Sage support">
      <header><div><Sparkles size={18} /><span><strong>Ask Sage</strong><small>{district.shortTitle}</small></span></div><button ref={closeRef} type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage"><X size={19} /></button></header>
      <div className="rt-sage-messages" ref={listRef} aria-live="polite">{messages.map((message, index) => <div className={`${message.role} ${message.unavailable ? 'is-unavailable' : ''}`} key={`${district.key}-message-${index}`}><strong>{message.role === 'assistant' ? 'Sage' : 'You'}</strong><p>{message.content}</p></div>)}{sending && <div className="assistant"><LoaderCircle className="rt-spin" size={17} /><p>Sage is thinking…</p></div>}</div>
      <div className="rt-quick">{rootThreeQuickPrompts.map((prompt) => <button type="button" disabled={sending} onClick={() => send(quick(prompt.label))} key={prompt.key}>{prompt.label}</button>)}</div>
      <form onSubmit={(event) => { event.preventDefault(); send(draft); }}><label htmlFor={`rt-sage-question-${district.key}`}>Ask about this district</label><div><textarea id={`rt-sage-question-${district.key}`} rows={3} maxLength={700} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What are you wondering?" /><button type="submit" disabled={!draft.trim() || sending} aria-label="Send question to Sage"><Send size={17} /></button></div></form>
    </aside>
  </>;
}

export default function RootThreeCity({ go }) {
  const saved = useMemo(() => readProgress(), []);
  const [activeIndex, setActiveIndex] = useState(saved.activeIndex || 0);
  const [visited, setVisited] = useState(saved.visited?.length ? saved.visited : [rootThreeDistricts[0].key]);
  const [completed, setCompleted] = useState(saved.completed || []);
  const [choices, setChoices] = useState(saved.choices || {});
  const [answers, setAnswers] = useState(saved.answers || {});
  const [reflections, setReflections] = useState(saved.reflections || {});
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef(null); const closeRef = useRef(null);
  const district = rootThreeDistricts[activeIndex];
  const correct = district.check.options.find((option) => option.isCorrect)?.id;
  const ready = Boolean(choices[district.key] && answers[district.key] === correct);

  useEffect(() => { localStorage.setItem(PROGRESS_KEY, JSON.stringify({ activeIndex, visited, completed, choices, answers, reflections })); }, [activeIndex, visited, completed, choices, answers, reflections]);
  useEffect(() => {
    if (!navOpen) return undefined;
    closeRef.current?.focus();
    const onKey = (event) => { if (event.key === 'Escape') { setNavOpen(false); menuRef.current?.focus(); } };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);
  const select = (index) => {
    const next = Math.max(0, Math.min(index, rootThreeDistricts.length - 1));
    setActiveIndex(next); setVisited((current) => current.includes(rootThreeDistricts[next].key) ? current : [...current, rootThreeDistricts[next].key]);
    setNavOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const toggleComplete = () => setCompleted((current) => current.includes(district.key) ? current.filter((key) => key !== district.key) : [...current, district.key]);

  return <main className="root-three-city">
    <CityBackdrop />
    <header className="rt-topbar"><button type="button" onClick={() => go('dashboard')}><ArrowLeft size={17} /> The Grove</button><button type="button" className="rt-brand" onClick={() => go('home')} aria-label="RootWise home"><ApprovedArtwork variant="tree" /><span><strong>Root$Wise</strong><small>Root Three · Choice, Cash Flow &amp; Spending</small></span></button><button ref={menuRef} type="button" onClick={() => setNavOpen(true)} aria-expanded={navOpen} aria-controls="rt-district-navigation"><Menu size={18} /> Districts</button></header>
    <div className="rt-progress" role="progressbar" aria-label="Root Three progress" aria-valuemin={0} aria-valuemax={12} aria-valuenow={completed.length}><i style={{ width: `${completed.length / 12 * 100}%` }} /></div>
    {navOpen && <button type="button" className="rt-nav-scrim" aria-label="Close district menu" onClick={() => { setNavOpen(false); menuRef.current?.focus(); }} />}
    <div className="rt-layout">
      <div id="rt-district-navigation" className={navOpen ? 'rt-nav-wrap is-open' : 'rt-nav-wrap'}><DistrictNav activeIndex={activeIndex} completed={completed} visited={visited} onSelect={select} onClose={() => { setNavOpen(false); menuRef.current?.focus(); }} closeRef={closeRef} /></div>
      <article className="rt-lesson" key={district.key}>
        <section className="rt-promise"><p className="rt-eyebrow"><Target size={15} /> District promise</p><h1>{district.promise}</h1><span>District {district.number} of 12 · {district.theme}</span></section>
        <Story district={district} /><Learning district={district} />
        <Practice district={district} choice={choices[district.key]} answer={answers[district.key]} reflection={reflections[district.key]} onChoice={(choice) => setChoices((current) => ({ ...current, [district.key]: choice }))} onAnswer={(answer) => setAnswers((current) => ({ ...current, [district.key]: answer }))} onReflection={(reflection) => setReflections((current) => ({ ...current, [district.key]: reflection }))} />
        <section className="rt-next"><Route size={18} /><div><p className="rt-eyebrow">The road continues</p><p>{district.next}</p></div></section>
        <footer className="rt-lesson-footer"><button type="button" onClick={() => select(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft size={17} /> Previous</button><button type="button" className={completed.includes(district.key) ? 'is-complete' : ''} onClick={toggleComplete} disabled={!completed.includes(district.key) && !ready} aria-pressed={completed.includes(district.key)}>{completed.includes(district.key) ? <Check size={17} /> : <CheckCircle2 size={17} />}{completed.includes(district.key) ? 'District complete' : ready ? 'Complete district' : 'Finish scenario & check'}</button><button type="button" onClick={() => activeIndex === 11 ? go('dashboard') : select(activeIndex + 1)}>{activeIndex === 11 ? 'Return to Grove' : 'Next district'} <ArrowRight size={17} /></button></footer>
      </article>
      <div className="rt-sage-rail"><AskSage district={district} /></div>
    </div>
  </main>;
}
