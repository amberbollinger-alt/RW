import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileSearch,
  Landmark,
  LoaderCircle,
  Menu,
  MessageCircle,
  Play,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
  TimerReset,
  Waves,
  X,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import { queueSageVoice } from './sage-voice-events';
import {
  currentLenses,
  ROOT_THREE_PROGRESS_KEY,
  rootThreeLessons,
  rootThreeNarration,
  rootThreeOpening,
  rootThreeParts,
  rootThreeQuickPrompts,
} from './root-three-data';
import './root-three.css';

const COMPLETE_STATES = new Set(['saved', 'skipped']);

function safeObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function readProgress() {
  try {
    const parsed = safeObject(JSON.parse(localStorage.getItem(ROOT_THREE_PROGRESS_KEY) || '{}'));
    const valid = new Set(rootThreeLessons.map((lesson) => lesson.key));
    const answers = safeObject(parsed.answers);
    const scenarios = safeObject(parsed.scenarios);
    const mirrors = safeObject(parsed.mirrors);
    const workbooks = safeObject(parsed.workbooks);
    const scans = safeObject(parsed.scans);
    const completed = Array.isArray(parsed.completed)
      ? parsed.completed.filter((key) => {
        const lesson = rootThreeLessons.find((item) => item.key === key);
        const correct = lesson?.check.options.find((item) => item.isCorrect)?.id;
        return valid.has(key)
          && answers[key] === correct
          && Boolean(scenarios[key])
          && COMPLETE_STATES.has(mirrors[key]?.status)
          && COMPLETE_STATES.has(workbooks[key]?.status)
          && Array.isArray(scans[key])
          && scans[key].length === currentLenses.length;
      })
      : [];

    return {
      activeIndex: Number.isInteger(parsed.activeIndex)
        ? Math.min(Math.max(parsed.activeIndex, 0), rootThreeLessons.length - 1)
        : 0,
      visited: Array.isArray(parsed.visited) ? parsed.visited.filter((key) => valid.has(key)) : [],
      answers,
      scenarios,
      mirrors,
      workbooks,
      scans,
      completed,
    };
  } catch {
    return {};
  }
}

function CurrentBackdrop() {
  return (
    <div className="r3-backdrop" aria-hidden="true">
      <img src="/root-three-current-district-v2.jpg" alt="" />
      <div />
    </div>
  );
}

function StorySequence({ blocks, prefix }) {
  return (
    <div className="r3-story-sequence">
      {blocks.map((block, index) => {
        const key = `${prefix}-${index}-${block.text.slice(0, 18)}`;
        if (block.type === 'dialogue') {
          return (
            <blockquote className="r3-dialogue" key={key}>
              <cite>{block.speaker}</cite>
              <p>“{block.text}”</p>
            </blockquote>
          );
        }
        if (block.type === 'sage') {
          return (
            <blockquote className="r3-dialogue is-sage" key={key}>
              <cite>Sage</cite>
              <p>“{block.text}”</p>
            </blockquote>
          );
        }
        return <p key={key}>{block.text}</p>;
      })}
    </div>
  );
}

function LessonNav({ activeIndex, visited, completed, onSelect, onClose, closeRef }) {
  return (
    <aside className="r3-nav">
      <header>
        <div>
          <p>Root Three</p>
          <h2>Choice, Cash Flow &amp; Spending</h2>
        </div>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close lesson menu"><X /></button>
      </header>
      <nav aria-label="Root Three lessons">
        {rootThreeParts.map((part) => (
          <section key={part.number}>
            <h3><span>Part {part.number}</span>{part.title}</h3>
            {rootThreeLessons.filter((lesson) => lesson.part.number === part.number).map((lesson) => {
              const index = lesson.number - 1;
              return (
                <button
                  type="button"
                  className={activeIndex === index ? 'is-active' : ''}
                  onClick={() => onSelect(index)}
                  aria-current={activeIndex === index ? 'step' : undefined}
                  key={lesson.key}
                >
                  <span>{completed.includes(lesson.key) ? <Check /> : visited.includes(lesson.key) ? <Waves /> : lesson.displayNumber}</span>
                  <strong>{lesson.title}</strong>
                  <ChevronRight />
                </button>
              );
            })}
          </section>
        ))}
      </nav>
      <footer>
        <span>{completed.length} of {rootThreeLessons.length} lessons complete</span>
        <i><b style={{ width: `${completed.length / rootThreeLessons.length * 100}%` }} /></i>
      </footer>
    </aside>
  );
}

function Opening() {
  const [answer, setAnswer] = useState('');
  const [promiseOpen, setPromiseOpen] = useState(false);

  return (
    <section className="r3-opening">
      <figure className="r3-current-scene">
        <img src="/root-three-current-district-v2.jpg" alt="The rain-lit Current District with amber routes moving through the city" />
      </figure>
      <div className="r3-opening-copy">
        <p className="r3-eyebrow"><Waves /> Root Three · {rootThreeOpening.setting}</p>
        <h1>{rootThreeOpening.title}</h1>
        <blockquote>{rootThreeOpening.coreQuestion}</blockquote>
      </div>
      <section className="r3-opening-story" aria-labelledby="r3-opening-story-title">
        <div>
          <p className="r3-eyebrow"><Sparkles /> Ivy, Eli &amp; Sage arrive</p>
          <h2 id="r3-opening-story-title">The card declined. The real cost was not printed on the receipt.</h2>
          <StorySequence blocks={rootThreeOpening.story} prefix="opening" />
        </div>
        <img src="/rootwise-sage-cutout.png" alt="Sage, the RootWise guide" />
      </section>
      <fieldset className="r3-opening-choice">
        <legend>{rootThreeOpening.learnerQuestion}</legend>
        <p>No answer is graded. Keep the first honest reaction; the Current District will show where it enters the flow.</p>
        <div>
          {rootThreeOpening.learnerOptions.map((choice) => (
            <button type="button" className={answer === choice ? 'is-selected' : ''} onClick={() => setAnswer(choice)} key={choice}>
              {answer === choice ? <Check /> : <ArrowRight />}
              {choice}
            </button>
          ))}
        </div>
        {answer && <p className="r3-opening-response">{rootThreeOpening.response}</p>}
      </fieldset>
      <section className="r3-promise">
        <button type="button" aria-expanded={promiseOpen} onClick={() => setPromiseOpen((open) => !open)}>
          <span>Open the complete Root Three learning promise</span>
          <ChevronRight className={promiseOpen ? 'is-open' : ''} />
        </button>
        {promiseOpen && <p>{rootThreeOpening.promise}</p>}
      </section>
    </section>
  );
}

function SageOpening({ lesson }) {
  return (
    <section className="r3-card r3-sage-open">
      <img src="/rootwise-sage-cutout.png" alt="" />
      <div>
        <p className="r3-eyebrow"><Sparkles /> Sage</p>
        <blockquote>{lesson.sageOpen}</blockquote>
        <button type="button" onClick={() => queueSageVoice(rootThreeNarration(lesson), `Lesson ${lesson.number} narration is ready.`)}>
          <Play /> Listen to this lesson
        </button>
        <small>Direct mentor narration. Pause, resume, or replay from the Sage voice controls.</small>
      </div>
    </section>
  );
}

function AdultLevels({ lesson }) {
  const levels = [
    { number: '01', label: 'Understand · What is true?', title: 'See the financial system beneath the moment', items: lesson.understand },
    { number: '02', label: 'Recognize · Where does it appear?', title: 'Find the pattern in adult financial life', items: lesson.recognize },
    { number: '03', label: 'Examine · What is directing the choice?', title: 'Keep the pressure and the consequence in frame', items: lesson.examine },
  ];

  return (
    <section className="r3-card r3-levels">
      <header>
        <p className="r3-eyebrow"><Route /> Understand · Recognize · Examine</p>
        <h2>The story is the mirror. These three levels expose the complete money movement beneath it.</h2>
      </header>
      <div>
        {levels.map((level) => (
          <article key={level.number}>
            <span>{level.number}</span>
            <div>
              <p className="r3-level-label">{level.label}</p>
              <h3>{level.title}</h3>
              <ul>{level.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CurrentScan({ value = [], onChange }) {
  return (
    <section className="r3-card r3-scan">
      <p className="r3-eyebrow"><Waves /> Current Scan</p>
      <h2>Activate all four lenses before the money moves out of sight.</h2>
      <div>
        {currentLenses.map((lens) => {
          const active = value.includes(lens.id);
          return (
            <button
              type="button"
              className={active ? 'is-selected' : ''}
              aria-pressed={active}
              onClick={() => onChange(active ? value.filter((id) => id !== lens.id) : [...value, lens.id])}
              key={lens.id}
            >
              <span>{active ? <Check /> : <FileSearch />}</span>
              <strong>{lens.label}</strong>
              <small>{lens.prompt}</small>
            </button>
          );
        })}
      </div>
      {value.length === currentLenses.length && <p className="r3-scan-result"><CheckCircle2 /> The complete present-money movement is visible.</p>}
    </section>
  );
}

function DecisionPractice({ lesson, answer, scenario, onAnswer, onScenario }) {
  const checked = lesson.check.options.find((option) => option.id === answer);
  const scenarioChoice = lesson.scenario.options.find((option) => option.id === scenario);

  return (
    <>
      <section className="r3-card r3-check">
        <p className="r3-eyebrow"><CircleHelp /> Knowledge Check</p>
        <h2>{lesson.check.prompt}</h2>
        <div className="r3-options">
          {lesson.check.options.map((option) => (
            <button type="button" className={answer === option.id ? 'is-selected' : ''} aria-pressed={answer === option.id} onClick={() => onAnswer(option.id)} key={option.id}>
              <span>{answer === option.id ? <Check /> : <ArrowRight />}</span>
              {option.label}
            </button>
          ))}
        </div>
        {checked && (
          <div className={checked.isCorrect ? 'r3-feedback is-correct' : 'r3-feedback'} aria-live="polite">
            <strong>{checked.isCorrect ? 'The complete movement is in frame' : 'One claim is still hiding'}</strong>
            <p>{checked.isCorrect ? 'This answer keeps the amount, timing, claim, influence, and remaining choice connected.' : 'Return to the story and choose the answer that preserves every relevant part of the decision.'}</p>
          </div>
        )}
      </section>
      <section className="r3-card r3-scenario">
        <p className="r3-eyebrow"><Clock3 /> Current Decision Drill</p>
        <h2>{lesson.scenario.prompt}</h2>
        <div className="r3-options">
          {lesson.scenario.options.map((option) => (
            <button type="button" className={scenario === option.id ? 'is-selected' : ''} aria-pressed={scenario === option.id} onClick={() => onScenario(option.id)} key={option.id}>
              <span>{scenario === option.id ? <Check /> : <ArrowRight />}</span>
              {option.label}
            </button>
          ))}
        </div>
        {scenarioChoice && (
          <div className={scenarioChoice.strength === 'strong' ? 'r3-feedback is-correct' : 'r3-feedback'} aria-live="polite">
            <strong>{scenarioChoice.strength === 'strong' ? 'This preserves informed choice' : 'A pressure point still controls the frame'}</strong>
            <p>{scenarioChoice.feedback}</p>
          </div>
        )}
      </section>
    </>
  );
}

function PrivatePanel({ lesson, kind, value, onChange }) {
  const current = value || { text: '', status: '' };
  const mirror = kind === 'mirror';
  const title = mirror ? 'Mirror Reflection' : `Apply It Now · ${lesson.workbook}`;
  const prompt = mirror ? lesson.mirror : lesson.workbookPrompt;

  return (
    <section className={`r3-card r3-private ${mirror ? 'is-mirror' : ''}`}>
      <div>
        <p className="r3-eyebrow">{mirror ? <Sparkles /> : <BookOpen />} {title}</p>
        <h2>{prompt}</h2>
        <p>{mirror ? 'Ivy and Eli are mirrors, not answers. Notice your own pressure without grading it.' : 'Use ranges, broad categories, or fictional values. Exact financial details are not required for the learning to work.'}</p>
        <label htmlFor={`r3-${kind}-${lesson.key}`}>
          {mirror ? 'What did the story reveal?' : 'Your private working note'}
          <textarea
            id={`r3-${kind}-${lesson.key}`}
            rows={5}
            maxLength={2200}
            value={current.text || ''}
            onChange={(event) => onChange({ text: event.target.value, status: current.status === 'saved' ? '' : current.status })}
            placeholder={mirror ? 'A version of this pressure appears in my life when…' : 'Build the map in your own words…'}
          />
        </label>
        <div>
          <button type="button" disabled={!String(current.text || '').trim()} onClick={() => onChange({ text: current.text, status: 'saved' })}><CheckCircle2 /> Save on this device</button>
          <button type="button" onClick={() => onChange({ text: current.text || '', status: 'skipped' })}><TimerReset /> Intentionally skip</button>
        </div>
        {COMPLETE_STATES.has(current.status) && (
          <p className="r3-private-status"><Check /> {current.status === 'saved' ? 'Saved privately on this device.' : 'Intentionally skipped. You may return at any time.'}</p>
        )}
      </div>
      <aside>
        <ShieldCheck />
        <strong>Privacy boundary</strong>
        <p>These entries stay in this browser and are never sent to Ask Sage. Do not enter account or card numbers, login credentials, access codes, Social Security or tax identification numbers, exact institution names, exact addresses, private health details, or confidential family and legal information.</p>
      </aside>
    </section>
  );
}

function Sources({ lesson }) {
  return (
    <section className="r3-card r3-sources">
      <p className="r3-eyebrow"><FileSearch /> Source Desk</p>
      <h2>Verify the rule beneath the money movement</h2>
      <p>Reviewed against primary federal public authorities on July 30, 2026. Account terms, payment practices, consumer protections, agency guidance, and applicable law can change.</p>
      <p className="r3-jurisdiction"><strong>Facts and documents matter.</strong> Root Three is general financial education, not a personal banking, legal, tax, benefits, contract, or dispute conclusion. Review the current account agreement and authoritative guidance for the situation in front of you.</p>
      <ul>
        {lesson.sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noreferrer">{source.label}<ArrowRight /></a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AskSage({ lesson }) {
  const [threads, setThreads] = useState({});
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const listRef = useRef(null);
  const messages = useMemo(
    () => threads[lesson.key] || [{ role: 'assistant', content: `We’re at ${lesson.title}. Ask me to trace the arrival, hidden claim, influence, tradeoff, or remaining choice.` }],
    [lesson, threads],
  );

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, sending]);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const send = async (message) => {
    const clean = message.trim();
    if (!clean || sending) return;
    const next = [...messages, { role: 'user', content: clean }];
    setThreads((current) => ({ ...current, [lesson.key]: next }));
    setDraft('');
    setSending(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 22000);

    try {
      const response = await fetch('/api/sage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          root: 'three',
          message: clean,
          lesson: {
            number: lesson.number,
            title: lesson.title,
            story: lesson.story.map((block) => `${block.speaker ? `${block.speaker}: ` : ''}${block.text}`).join(' ').slice(0, 1200),
            connection: lesson.understand.join(' ').slice(0, 900),
            boundaries: lesson.examine.join(' ').slice(0, 600),
          },
          history: messages.slice(-9),
        }),
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.reply) throw new Error('unavailable');
      queueSageVoice(payload.reply, 'Sage answered your Root Three question.');
      setThreads((current) => ({ ...current, [lesson.key]: [...next, { role: 'assistant', content: payload.reply }] }));
    } catch (error) {
      setThreads((current) => ({
        ...current,
        [lesson.key]: [...next, {
          role: 'assistant',
          unavailable: true,
          content: error?.name === 'AbortError'
            ? 'That took too long. Your question remains here—please try again in a moment.'
            : 'The conversation service is not reachable right now. The lesson, source links, private work, and narration remain available.',
        }],
      }));
    } finally {
      window.clearTimeout(timeout);
      setSending(false);
    }
  };

  return (
    <>
      <button ref={toggleRef} type="button" className="r3-sage-toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="r3-sage-panel"><MessageCircle /> Ask Sage</button>
      {open && <button type="button" className="r3-sage-scrim" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage" />}
      <aside id="r3-sage-panel" className={open ? 'r3-sage is-open' : 'r3-sage'} aria-label="Ask Sage support">
        <header>
          <div><Sparkles /><span><strong>Ask Sage</strong><small>{lesson.title}</small></span></div>
          <button ref={closeRef} type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage"><X /></button>
        </header>
        <div ref={listRef} className="r3-sage-messages" aria-live="polite">
          {messages.map((message, index) => (
            <div className={`${message.role} ${message.unavailable ? 'is-unavailable' : ''}`} key={`${lesson.key}-${index}`}>
              <strong>{message.role === 'assistant' ? 'Sage' : 'You'}</strong>
              <p>{message.content}</p>
            </div>
          ))}
          {sending && <div className="assistant"><LoaderCircle className="r3-spin" /><p>Sage is tracing the current…</p></div>}
        </div>
        <div className="r3-quick">
          {rootThreeQuickPrompts.map((prompt) => (
            <button type="button" disabled={sending} onClick={() => send(`${prompt} in ${lesson.title}. Keep the Current District story and RootWise boundaries in view.`)} key={prompt}>{prompt}</button>
          ))}
        </div>
        <form onSubmit={(event) => { event.preventDefault(); send(draft); }}>
          <label htmlFor={`r3-sage-${lesson.key}`}>Ask about this lesson</label>
          <div>
            <textarea id={`r3-sage-${lesson.key}`} rows={3} maxLength={700} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What are you trying to understand?" />
            <button type="submit" disabled={!draft.trim() || sending} aria-label="Send question"><Send /></button>
          </div>
        </form>
        <footer>Do not share account or card numbers, login credentials, access codes, Social Security or tax identification numbers, exact institution names, exact addresses, private health details, or confidential family and legal information. Sage explains the decision; she does not choose purchases, accounts, providers, payment methods, dispute positions, or personal spending priorities.</footer>
      </aside>
    </>
  );
}

export default function RootThreeCity({ go, initialLessonKey, onLessonChange }) {
  const saved = useMemo(() => readProgress(), []);
  const requested = rootThreeLessons.findIndex((lesson) => lesson.key === initialLessonKey);
  const startingIndex = requested >= 0 ? requested : saved.activeIndex || 0;
  const [activeIndex, setActiveIndex] = useState(startingIndex);
  const [visited, setVisited] = useState(() => [...new Set([...(saved.visited || []), rootThreeLessons[startingIndex].key])]);
  const [completed, setCompleted] = useState(saved.completed || []);
  const [answers, setAnswers] = useState(saved.answers || {});
  const [scenarios, setScenarios] = useState(saved.scenarios || {});
  const [mirrors, setMirrors] = useState(saved.mirrors || {});
  const [workbooks, setWorkbooks] = useState(saved.workbooks || {});
  const [scans, setScans] = useState(saved.scans || {});
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef(null);
  const closeRef = useRef(null);
  const lesson = rootThreeLessons[activeIndex];
  const correct = lesson.check.options.find((option) => option.isCorrect)?.id;
  const ready = answers[lesson.key] === correct
    && Boolean(scenarios[lesson.key])
    && COMPLETE_STATES.has(mirrors[lesson.key]?.status)
    && COMPLETE_STATES.has(workbooks[lesson.key]?.status)
    && scans[lesson.key]?.length === currentLenses.length;

  useEffect(() => {
    localStorage.setItem(ROOT_THREE_PROGRESS_KEY, JSON.stringify({
      activeIndex,
      visited,
      completed,
      answers,
      scenarios,
      mirrors,
      workbooks,
      scans,
    }));
  }, [activeIndex, answers, completed, mirrors, scenarios, scans, visited, workbooks]);

  useEffect(() => {
    if (!navOpen) return undefined;
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setNavOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  const select = (index) => {
    const next = Math.min(Math.max(index, 0), rootThreeLessons.length - 1);
    if (onLessonChange && next !== activeIndex) {
      onLessonChange(rootThreeLessons[next].key);
      return;
    }
    setActiveIndex(next);
    setVisited((current) => current.includes(rootThreeLessons[next].key) ? current : [...current, rootThreeLessons[next].key]);
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleComplete = () => {
    setCompleted((current) => {
      if (current.includes(lesson.key)) return current.filter((key) => key !== lesson.key);
      return ready ? [...current, lesson.key] : current;
    });
  };

  const rootPercent = Math.round(completed.length / rootThreeLessons.length * 100);
  const rootStyle = /** @type {import('react').CSSProperties & Record<'--growth', string>} */ ({ '--growth': `${rootPercent}%` });

  return (
    <main className="root-three-city">
      <CurrentBackdrop />
      <header className="r3-topbar">
        <button type="button" onClick={() => go('dashboard')}><ArrowLeft /> The Grove</button>
        <button type="button" className="r3-brand" onClick={() => go('home')} aria-label="RootWise home">
          <ApprovedArtwork variant="tree" />
          <span><strong>Root$Wise</strong><small>Root Three · Choice, Cash Flow &amp; Spending</small></span>
        </button>
        <button ref={menuRef} type="button" onClick={() => setNavOpen(true)} aria-expanded={navOpen} aria-controls="r3-navigation"><Menu /> Lessons</button>
      </header>
      <div className="r3-progress" role="progressbar" aria-label="Root Three progress" aria-valuemin={0} aria-valuemax={rootThreeLessons.length} aria-valuenow={completed.length}>
        <i style={{ width: `${rootPercent}%` }} />
      </div>

      <div className="r3-shell">
        {navOpen && <button type="button" className="r3-nav-scrim" onClick={() => { setNavOpen(false); window.setTimeout(() => menuRef.current?.focus(), 0); }} aria-label="Close lesson menu" />}
        <div id="r3-navigation" className={navOpen ? 'r3-nav-wrap is-open' : 'r3-nav-wrap'}>
          <LessonNav
            activeIndex={activeIndex}
            visited={visited}
            completed={completed}
            onSelect={select}
            onClose={() => { setNavOpen(false); window.setTimeout(() => menuRef.current?.focus(), 0); }}
            closeRef={closeRef}
          />
        </div>
        <article className="r3-lesson" key={lesson.key}>
          {activeIndex === 0 && <Opening />}
          <section className="r3-lesson-title">
            <p className="r3-eyebrow">Part {lesson.part.number} · {lesson.part.title}</p>
            <span>Lesson {lesson.displayNumber} · {lesson.number} of {rootThreeLessons.length}</span>
            <h1>{lesson.title}</h1>
            <p>{lesson.promise}</p>
          </section>
          <SageOpening lesson={lesson} />
          <section className="r3-card r3-story">
            <p className="r3-eyebrow"><Sparkles /> The continuing story · Ivy, Eli &amp; Sage</p>
            <h2>{lesson.stage}</h2>
            <StorySequence blocks={lesson.story} prefix={lesson.key} />
          </section>
          <AdultLevels lesson={lesson} />
          <CurrentScan value={scans[lesson.key] || []} onChange={(value) => setScans((current) => ({ ...current, [lesson.key]: value }))} />
          <DecisionPractice
            lesson={lesson}
            answer={answers[lesson.key]}
            scenario={scenarios[lesson.key]}
            onAnswer={(value) => setAnswers((current) => ({ ...current, [lesson.key]: value }))}
            onScenario={(value) => setScenarios((current) => ({ ...current, [lesson.key]: value }))}
          />
          <PrivatePanel lesson={lesson} kind="mirror" value={mirrors[lesson.key]} onChange={(value) => setMirrors((current) => ({ ...current, [lesson.key]: value }))} />
          <PrivatePanel lesson={lesson} kind="workbook" value={workbooks[lesson.key]} onChange={(value) => setWorkbooks((current) => ({ ...current, [lesson.key]: value }))} />
          <Sources lesson={lesson} />
          <section className="r3-card r3-growth">
            <div className="r3-tree-reward" style={rootStyle}>
              <ApprovedArtwork variant="tree" />
              <span>{rootPercent}%</span>
            </div>
            <div>
              <p className="r3-eyebrow"><Sprout /> Root Growth · Current route {Math.min(completed.length + (ready && !completed.includes(lesson.key) ? 1 : 0), rootThreeLessons.length)} of {rootThreeLessons.length}</p>
              <h2>{lesson.growth}</h2>
              <p>{completed.includes(lesson.key) ? 'This financial decision capacity is rooted in your Grove.' : ready ? 'Complete the lesson to add this capacity to your Root Three tree.' : 'Finish the Current Scan, knowledge check, decision drill, mirror, and application panel to root this capacity.'}</p>
            </div>
          </section>
          <section className="r3-next">
            <Landmark />
            <div><p className="r3-eyebrow">The current keeps moving</p><p>{lesson.transition}</p></div>
          </section>
          <footer className="r3-footer">
            <button type="button" onClick={() => select(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft /> Previous</button>
            <button type="button" className={completed.includes(lesson.key) ? 'is-complete' : ''} onClick={toggleComplete} disabled={!completed.includes(lesson.key) && !ready} aria-pressed={completed.includes(lesson.key)}>
              {completed.includes(lesson.key) ? <Check /> : <CheckCircle2 />}
              {completed.includes(lesson.key) ? 'Lesson rooted' : ready ? 'Root this lesson' : 'Finish the full lesson loop'}
            </button>
            <button type="button" onClick={() => activeIndex === rootThreeLessons.length - 1 ? go('/roots/four') : select(activeIndex + 1)}>
              {activeIndex === rootThreeLessons.length - 1 ? 'Enter Root Four' : 'Next lesson'} <ArrowRight />
            </button>
          </footer>
        </article>
      </div>
      <AskSage lesson={lesson} />
    </main>
  );
}
