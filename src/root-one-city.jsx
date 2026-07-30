import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Compass,
  ExternalLink,
  Eye,
  FileText,
  Lightbulb,
  LoaderCircle,
  LockKeyhole,
  Menu,
  MessageCircle,
  Play,
  Route,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Volume2,
  X,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import { queueSageVoice } from './sage-voice-events';
import { normalizeRootOneProgress, safeRecord, safeString } from './root-one-progress';
import {
  decisionRootLenses,
  rootOneIntroduction,
  ROOT_ONE_PARTS,
  rootOneRootsData as rootOneLessons,
  rootOneRootsQuickPrompts,
  rootOneSources,
} from './root-one-roots-data';
import './root-one.css';

const PROGRESS_KEY = 'rootwise_root_one_city_progress';
const PROGRESS_VERSION = 3;
const COMPLETE_STATES = new Set(['saved', 'skipped', 'completed']);
const ALL_LENSES = decisionRootLenses.map((lens) => lens.id);

function readProgress() {
  try {
    return normalizeRootOneProgress(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'));
  } catch {
    return normalizeRootOneProgress({});
  }
}

function storyNarrationText(lesson) {
  return [
    lesson.sageOpening,
    ...lesson.story.map((block) => {
      if (block.type === 'dialogue') return `${block.speaker} says, “${block.text}”`;
      if (block.type === 'sage') return `“${block.text}”`;
      return block.text;
    }),
  ].join('\n\n');
}

function openingNarrationText() {
  return rootOneIntroduction.story.map((block) => {
    if (block.type === 'dialogue') return `${block.speaker} says, “${block.text}”`;
    if (block.type === 'sage') return `“${block.text}”`;
    return block.text;
  }).join('\n\n');
}

function initialSageMessage(lesson) {
  return {
    role: 'assistant',
    content: `We’re examining ${lesson.title}. Ask me to separate a fact from a story, translate a label into behavior, map a pattern, or build a useful pause question.`,
  };
}

function lessonAnswer(knowledgeAnswers, lesson) {
  return safeRecord(knowledgeAnswers[lesson.key])[lesson.knowledgeCheck.id];
}

function StorySequence({ blocks, idPrefix }) {
  return (
    <div className="r1-story-sequence">
      {blocks.map((block, index) => {
        const key = `${idPrefix}-${index}`;
        if (block.type === 'sage') {
          return (
            <blockquote className="r1-story-voice r1-story-voice--sage" key={key}>
              <cite>Sage</cite>
              <p>“{block.text}”</p>
            </blockquote>
          );
        }
        if (block.type === 'dialogue') {
          return (
            <blockquote className="r1-story-voice" key={key}>
              <cite>{block.speaker}</cite>
              <p>“{block.text}”</p>
            </blockquote>
          );
        }
        return <p className="r1-story-narration" key={key}>{block.text}</p>;
      })}
    </div>
  );
}

function NarrationControls({ lesson = null, opening = false }) {
  const fullStory = opening ? openingNarrationText() : storyNarrationText(lesson);
  const currentSection = opening
    ? rootOneIntroduction.story.slice(0, 8).map((block) => block.text).join(' ')
    : lesson.story.map((block) => block.text).join(' ');
  const summary = opening
    ? `${rootOneIntroduction.promise} ${rootOneIntroduction.outcome}`
    : lesson.summary;

  return (
    <div className="r1-narration" aria-label="Sage narration choices" data-narration-exclude>
      <div>
        <Volume2 size={18} />
        <span><strong>Narration</strong><small>Full story is the default</small></span>
      </div>
      <button type="button" className="is-default" onClick={() => queueSageVoice(fullStory, opening ? 'Full Root One opening' : `Full story · ${lesson.title}`)}>
        <Play size={15} /> Full story
      </button>
      <button type="button" onClick={() => queueSageVoice(currentSection, opening ? 'Current opening section' : `Current story section · ${lesson.title}`)}>
        Current section
      </button>
      <button type="button" onClick={() => queueSageVoice(summary, opening ? 'Root One opening summary' : `Lesson summary · ${lesson.title}`)}>
        Summary
      </button>
    </div>
  );
}

function OpeningExperience({ openingChoice, onChoose }) {
  return (
    <section className="r1-opening" aria-labelledby="r1-opening-title">
      <figure className="r1-opening-art">
        <img
          src="/root-one-city-beneath-the-decision.png"
          alt="Ivy, Eli, and Sage beneath the old oak overlooking the City Beneath the City at twilight"
        />
        <figcaption>The City Beneath the City · Ivy, Eli, and Sage begin beneath the old oak</figcaption>
      </figure>
      <div className="r1-opening-copy">
        <p className="r1-eyebrow">{rootOneIntroduction.eyebrow}</p>
        <h1 id="r1-opening-title">{rootOneIntroduction.title}</h1>
        <p className="r1-core-question">{rootOneIntroduction.coreQuestion}</p>
        <div className="r1-promise-strip">
          <span><Target size={18} /></span>
          <div><strong>Root One learning promise</strong><p>{rootOneIntroduction.promise}</p></div>
        </div>
        <NarrationControls opening />
        <StorySequence blocks={rootOneIntroduction.story} idPrefix="opening" />
        <div className="r1-opening-question">
          <p className="r1-eyebrow"><Compass size={15} /> Before you enter</p>
          <h2>{rootOneIntroduction.learnerQuestion}</h2>
          <div className="r1-choice-grid">
            {rootOneIntroduction.learnerOptions.map((item) => (
              <button
                type="button"
                className={openingChoice === item ? 'is-selected' : ''}
                aria-pressed={openingChoice === item}
                onClick={() => onChoose(item)}
                key={item}
              >
                <span>{openingChoice === item ? <Check size={16} /> : <ChevronRight size={16} />}</span>
                {item}
              </button>
            ))}
          </div>
          {openingChoice && <p className="r1-opening-response" aria-live="polite">“{rootOneIntroduction.response}”</p>}
        </div>
        <div className="r1-outcome"><ShieldCheck size={20} /><p>{rootOneIntroduction.outcome}</p></div>
      </div>
    </section>
  );
}

function LessonNavigation({ activeIndex, completed, visited, onSelect, navOpen, onClose, navRef, closeRef }) {
  return (
    <aside
      ref={navRef}
      id="r1-lesson-navigation"
      className={`r1-sidebar ${navOpen ? 'is-open' : ''}`}
      aria-label="Root One lesson navigation"
      role={navOpen ? 'dialog' : undefined}
      aria-modal={navOpen ? 'true' : undefined}
    >
      <header>
        <div>
          <p>Root One</p>
          <h2>The Story Beneath the Decision</h2>
        </div>
        <button ref={closeRef} type="button" className="r1-sidebar-close" onClick={onClose} aria-label="Close lesson navigation">
          <X size={19} />
        </button>
      </header>
      <nav aria-label="Root One lessons">
        {ROOT_ONE_PARTS.map((part) => (
          <section className="r1-nav-part" key={part.number}>
            <p><span>Part {part.number}</span>{part.title}</p>
            {part.lessonKeys.map((key) => {
              const index = rootOneLessons.findIndex((lesson) => lesson.key === key);
              const lesson = rootOneLessons[index];
              const isComplete = completed.includes(key);
              const isVisited = visited.includes(key);
              return (
                <button
                  type="button"
                  className={activeIndex === index ? 'is-active' : ''}
                  onClick={() => onSelect(index)}
                  aria-current={activeIndex === index ? 'step' : undefined}
                  key={key}
                >
                  <span className="r1-nav-number">{isComplete ? <Check size={15} /> : lesson.number}</span>
                  <span><strong>{lesson.shortTitle}</strong><small>{isComplete ? 'Complete' : isVisited ? 'In progress' : lesson.theme}</small></span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              );
            })}
          </section>
        ))}
      </nav>
      <footer>
        <span>{completed.length} of {rootOneLessons.length} lessons complete</span>
        <div aria-hidden="true"><i style={{ width: `${completed.length / rootOneLessons.length * 100}%` }} /></div>
      </footer>
    </aside>
  );
}

function LessonHeader({ lesson }) {
  return (
    <header className="r1-lesson-header">
      <div className="r1-lesson-meta">
        <span>Lesson {lesson.number}</span>
        <span>Part {lesson.part.number} · {lesson.part.title}</span>
      </div>
      <p className="r1-eyebrow">Root One · The City Beneath the City</p>
      <h1>{lesson.title}</h1>
      <p>{lesson.promise}</p>
    </header>
  );
}

function SageOpening({ lesson }) {
  return (
    <section className="r1-sage-opening">
      <img src="/rootwise-sage.webp" alt="Sage" />
      <div>
        <p className="r1-eyebrow"><Sparkles size={15} /> Sage opens the lesson</p>
        <blockquote>“{lesson.sageOpening}”</blockquote>
      </div>
    </section>
  );
}

function LessonStory({ lesson }) {
  return (
    <section className="r1-story-panel" aria-labelledby={`r1-story-${lesson.key}`}>
      <header>
        <div>
          <p className="r1-eyebrow"><BookOpen size={15} /> The continuing story</p>
          <h2 id={`r1-story-${lesson.key}`}>{lesson.setting}</h2>
        </div>
        <span>Full narrative</span>
      </header>
      <NarrationControls lesson={lesson} />
      <StorySequence blocks={lesson.story} idPrefix={lesson.key} />
    </section>
  );
}

function LearningLayers({ lesson }) {
  const layers = [
    { number: '01', label: 'Understand · What is it?', icon: Lightbulb, items: lesson.understand },
    { number: '02', label: 'Recognize · Where does it appear?', icon: Eye, items: lesson.recognize },
    { number: '03', label: 'Examine · What is driving the choice?', icon: Search, items: lesson.examine },
  ];
  return (
    <section className="r1-layers" aria-labelledby={`r1-layers-${lesson.key}`}>
      <header>
        <p className="r1-eyebrow"><Compass size={15} /> Three adult learning layers</p>
        <h2 id={`r1-layers-${lesson.key}`}>Understand the concept. Recognize it. Examine the choice.</h2>
      </header>
      <div className="r1-layer-grid">
        {layers.map((layer) => {
          const Icon = layer.icon;
          return (
            <section className="r1-layer" key={layer.number}>
              <header><span>{layer.number}</span><Icon size={20} /></header>
              <h3>{layer.label}</h3>
              <ul>{layer.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}

function DecisionRootsScan({ lesson, scans, onToggle }) {
  const lessonScan = safeRecord(scans[lesson.key]);
  const count = decisionRootLenses.filter((lens) => lessonScan[lens.id]).length;
  return (
    <section className="r1-scan" aria-labelledby={`r1-scan-${lesson.key}`}>
      <header>
        <div>
          <p className="r1-eyebrow"><Compass size={15} /> Decision Roots Scan</p>
          <h2 id={`r1-scan-${lesson.key}`}>Look through all four lenses</h2>
          <p>No typing. Activate each lens to make the complete decision visible.</p>
        </div>
        <strong>{count}/4</strong>
      </header>
      <div className="r1-scan-grid">
        {decisionRootLenses.map((lens, index) => {
          const active = Boolean(lessonScan[lens.id]);
          return (
            <button
              type="button"
              className={active ? 'is-active' : ''}
              aria-pressed={active}
              onClick={() => onToggle(lens.id)}
              key={lens.id}
            >
              <span>{active ? <Check size={18} /> : index + 1}</span>
              <strong>{lens.label}</strong>
              <p>{lens.prompt}</p>
            </button>
          );
        })}
      </div>
      {count === 4 && <p className="r1-scan-complete" aria-live="polite">“The decision is no longer hiding beneath the reaction.”</p>}
    </section>
  );
}

function KnowledgeAndDecision({ lesson, knowledgeAnswer, decisionAnswer, onKnowledge, onDecision }) {
  const selectedKnowledge = lesson.knowledgeCheck.options.find((item) => item.id === knowledgeAnswer);
  const selectedDecision = lesson.decisionDrill.options.find((item) => item.id === decisionAnswer);
  return (
    <section className="r1-checks">
      <article className="r1-knowledge">
        <header>
          <p className="r1-eyebrow"><CircleHelp size={15} /> Knowledge check</p>
          <h2>{lesson.knowledgeCheck.prompt}</h2>
        </header>
        <div className="r1-option-list">
          {lesson.knowledgeCheck.options.map((item) => (
            <button
              type="button"
              className={knowledgeAnswer === item.id ? 'is-selected' : ''}
              aria-pressed={knowledgeAnswer === item.id}
              onClick={() => onKnowledge(item.id)}
              key={item.id}
            >
              <span>{knowledgeAnswer === item.id ? <Check size={16} /> : <ChevronRight size={16} />}</span>
              {item.label}
            </button>
          ))}
        </div>
        {selectedKnowledge && (
          <div className={`r1-feedback ${selectedKnowledge.isCorrect ? 'is-correct' : ''}`} aria-live="polite">
            <strong>{selectedKnowledge.isCorrect ? 'Correct—the concept is visible.' : 'Look one layer deeper.'}</strong>
            <p>{lesson.knowledgeCheck.explanation}</p>
          </div>
        )}
      </article>
      <article className="r1-decision-drill">
        <header>
          <p className="r1-eyebrow"><Route size={15} /> Decision drill</p>
          <h2>{lesson.decisionDrill.prompt}</h2>
        </header>
        <div className="r1-option-list">
          {lesson.decisionDrill.options.map((item) => (
            <button
              type="button"
              className={decisionAnswer === item.id ? 'is-selected' : ''}
              aria-pressed={decisionAnswer === item.id}
              onClick={() => onDecision(item.id)}
              key={item.id}
            >
              <span>{decisionAnswer === item.id ? <Check size={16} /> : <ArrowRight size={16} />}</span>
              {item.label}
            </button>
          ))}
        </div>
        {selectedDecision && (
          <div className={`r1-feedback ${selectedDecision.strength === 'strong' ? 'is-correct' : ''}`} aria-live="polite">
            <strong>{selectedDecision.strength === 'strong' ? 'Strong reasoning' : 'Developing reasoning'}</strong>
            <p>{selectedDecision.feedback}</p>
            <div><Route size={16} /><p><b>Course correction:</b> {selectedDecision.correction}</p></div>
          </div>
        )}
      </article>
    </section>
  );
}

function PrivatePanel({
  type,
  title,
  prompt,
  fields = [],
  note = '',
  value,
  status,
  onChange,
  onSave,
  onSkip,
}) {
  const isMirror = type === 'mirror';
  return (
    <section className={`r1-private-panel r1-private-panel--${type}`}>
      <header>
        <span>{isMirror ? <Eye size={20} /> : <FileText size={20} />}</span>
        <div>
          <p className="r1-eyebrow">{isMirror ? 'Mirror Reflection' : 'Apply It Now'}</p>
          <h2>{title}</h2>
        </div>
        <LockKeyhole size={18} aria-label="Private on this device" />
      </header>
      <p>{prompt}</p>
      {fields.length > 0 && <ul>{fields.map((item) => <li key={item}>{item}</li>)}</ul>}
      {note && <p className="r1-private-note">{note}</p>}
      <label>
        <span>{isMirror ? 'Your private reflection' : 'Your private workbook notes'}</span>
        <textarea
          rows={isMirror ? 5 : 7}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={isMirror ? 'Notice what is useful. You do not need to explain or diagnose it.' : 'Complete only the parts that support your learning.'}
        />
      </label>
      <div className="r1-private-actions">
        <button type="button" className="r1-save" disabled={!value.trim()} onClick={onSave}>
          <CheckCircle2 size={16} /> Save privately
        </button>
        <button type="button" className="r1-skip" onClick={onSkip}>Intentionally skip</button>
      </div>
      <p className="r1-private-status" aria-live="polite">
        {status === 'saved'
          ? 'Saved in this browser. You can return and edit it.'
          : status === 'skipped'
            ? 'Skipped intentionally. You can return whenever it becomes useful.'
            : 'This stays in this browser and is never sent to Ask Sage.'}
      </p>
    </section>
  );
}

function SourceDesk({ lesson }) {
  return (
    <section className="r1-source-desk">
      <header>
        <p className="r1-eyebrow"><BookOpen size={15} /> Root One Source Desk</p>
        <h2>Public resources behind the lesson</h2>
      </header>
      <div>
        {lesson.sourceIds.map((sourceId) => {
          const source = rootOneSources[sourceId];
          return (
            <a href={source.url} target="_blank" rel="noreferrer" key={sourceId}>
              <span>{source.label}</span><ExternalLink size={16} />
            </a>
          );
        })}
      </div>
      <p>Reviewed against public financial-well-being resources and relevant research on July 29, 2026. Research can describe patterns across groups; it cannot diagnose an individual learner or determine the meaning of one personal experience.</p>
      {lesson.contextNote && (
        <aside>
          Context matters. Financial pressure, hardship, access, behavior, and emotional responses interact differently across people and situations. This lesson is education, not a psychological diagnosis or therapy.
        </aside>
      )}
    </section>
  );
}

function LessonConnection({ lesson }) {
  return (
    <section className="r1-connection">
      <header>
        <p className="r1-eyebrow"><Route size={15} /> Chapter connection</p>
        <h2>Carry the idea forward without losing the person.</h2>
      </header>
      <dl>
        <div><dt>Look back</dt><dd>{lesson.connection.lookBack}</dd></div>
        <div><dt>What changed</dt><dd>{lesson.connection.newGrowth}</dd></div>
        <div><dt>Use it together</dt><dd>{lesson.connection.useTogether}</dd></div>
        <div><dt>What comes next</dt><dd>{lesson.connection.carryForward}</dd></div>
      </dl>
    </section>
  );
}

function SageCompanion({ lesson }) {
  const [conversations, setConversations] = useState({});
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const toggleRef = useRef(null);
  const messages = useMemo(
    () => conversations[lesson.key] || [initialSageMessage(lesson)],
    [conversations, lesson],
  );

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, sending]);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('r1-sage-open');
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll('button:not(:disabled), textarea:not(:disabled)');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove('r1-sage-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const send = async (message) => {
    const cleanMessage = message.trim();
    if (!cleanMessage || sending) return;
    const nextMessages = [...messages, { role: 'user', content: cleanMessage }];
    setConversations((current) => ({ ...current, [lesson.key]: nextMessages }));
    setDraft('');
    setSending(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 22_000);

    try {
      const response = await fetch('/api/sage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          root: 'one',
          message: cleanMessage,
          district: { key: lesson.key },
          history: messages.slice(-9),
        }),
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.reply) throw new Error('unavailable');
      queueSageVoice(payload.reply, 'Sage answered your Root One question');
      setConversations((current) => ({
        ...current,
        [lesson.key]: [...nextMessages, { role: 'assistant', content: payload.reply }],
      }));
    } catch (error) {
      setConversations((current) => ({
        ...current,
        [lesson.key]: [
          ...nextMessages,
          {
            role: 'assistant',
            unavailable: true,
            content: error?.name === 'AbortError'
              ? 'That took longer than it should. Your question is still here—try me again in a moment.'
              : 'I cannot reach our conversation service right now. Your question is still here—please try again in a moment.',
          },
        ],
      }));
    } finally {
      window.clearTimeout(timeout);
      setSending(false);
    }
  };

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="r1-sage-toggle"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="r1-sage-dialog"
        aria-label="Ask Sage"
      >
        <img src="/rootwise-sage.webp" alt="" />
        <span><strong>Ask Sage</strong><small>Talk through this lesson</small></span>
        <MessageCircle size={20} />
      </button>
      {open && <button type="button" className="r1-dialog-scrim" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage" />}
      <aside
        ref={dialogRef}
        id="r1-sage-dialog"
        className={`r1-sage-dialog ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Ask Sage about Root One"
      >
        <header>
          <img src="/rootwise-sage.webp" alt="Sage" />
          <div><span>Root One guide</span><strong>Ask Sage</strong></div>
          <button ref={closeRef} type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage">
            <X size={19} />
          </button>
        </header>
        <div className="r1-sage-messages" ref={listRef} role="log" aria-live="polite" aria-relevant="additions">
          {messages.map((message, index) => (
            <div className={`r1-message r1-message--${message.role} ${message.unavailable ? 'is-unavailable' : ''}`} key={`${message.role}-${index}`}>
              {message.content}
            </div>
          ))}
          {sending && <div className="r1-message r1-message--assistant r1-message--loading"><LoaderCircle size={16} /> Sage is thinking…</div>}
        </div>
        <div className="r1-sage-prompts">
          {rootOneRootsQuickPrompts.map((prompt) => (
            <button type="button" onClick={() => send(prompt.label)} disabled={sending} key={prompt.key}>{prompt.label}</button>
          ))}
        </div>
        <form onSubmit={(event) => { event.preventDefault(); send(draft); }}>
          <label htmlFor="r1-sage-question">Ask about the lesson—not your private workbook</label>
          <div>
            <textarea
              id="r1-sage-question"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={700}
              rows={3}
              placeholder="Use broad or fictional examples when privacy matters."
            />
            <button type="submit" disabled={!draft.trim() || sending} aria-label="Send question to Sage">
              <Send size={18} />
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

export default function RootOneCity({ go, initialLessonKey, onLessonChange }) {
  const saved = useMemo(() => readProgress(), []);
  const requestedIndex = rootOneLessons.findIndex((lesson) => lesson.key === initialLessonKey);
  const startingIndex = requestedIndex >= 0 ? requestedIndex : saved.activeIndex;
  const [activeIndex, setActiveIndex] = useState(startingIndex);
  const [visited, setVisited] = useState(() => [...new Set([...saved.visited, rootOneLessons[startingIndex].key])]);
  const [completed, setCompleted] = useState(saved.completed);
  const [choices, setChoices] = useState(saved.choices);
  const [knowledgeAnswers, setKnowledgeAnswers] = useState(saved.knowledgeAnswers);
  const [rootScans, setRootScans] = useState(saved.rootScans);
  const [mirrors, setMirrors] = useState(saved.mirrors);
  const [mirrorStatus, setMirrorStatus] = useState(saved.mirrorStatus);
  const [workbooks, setWorkbooks] = useState(saved.workbooks);
  const [workbookStatus, setWorkbookStatus] = useState(saved.workbookStatus);
  const [openingChoice, setOpeningChoice] = useState(saved.openingChoice);
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef(null);
  const navToggleRef = useRef(null);
  const navCloseRef = useRef(null);
  const lesson = rootOneLessons[activeIndex];

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      ...saved.raw,
      version: PROGRESS_VERSION,
      activeIndex,
      visited,
      completed,
      choices,
      checkAnswers: saved.checkAnswers,
      knowledgeAnswers,
      reflections: saved.reflections,
      applicationStatus: saved.applicationStatus,
      rootScans,
      mirrors,
      mirrorStatus,
      workbooks,
      workbookStatus,
      openingChoice,
    }));
  }, [
    activeIndex,
    choices,
    completed,
    knowledgeAnswers,
    mirrorStatus,
    mirrors,
    openingChoice,
    rootScans,
    saved,
    visited,
    workbookStatus,
    workbooks,
  ]);

  useEffect(() => {
    if (!navOpen) return undefined;
    navCloseRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setNavOpen(false);
        navToggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = navRef.current?.querySelectorAll('button:not(:disabled)');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [navOpen]);

  const selectLesson = (index) => {
    const next = Math.max(0, Math.min(index, rootOneLessons.length - 1));
    setNavOpen(false);
    if (onLessonChange && next !== activeIndex) {
      onLessonChange(rootOneLessons[next].key);
      return;
    }
    setActiveIndex(next);
    setVisited((current) => current.includes(rootOneLessons[next].key) ? current : [...current, rootOneLessons[next].key]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scan = safeRecord(rootScans[lesson.key]);
  const scanComplete = ALL_LENSES.every((lensId) => scan[lensId]);
  const currentKnowledgeAnswer = lessonAnswer(knowledgeAnswers, lesson);
  const knowledgeComplete = lesson.knowledgeCheck.options.find((item) => item.id === currentKnowledgeAnswer)?.isCorrect === true;
  const decisionComplete = Boolean(choices[lesson.key]);
  const mirrorComplete = COMPLETE_STATES.has(mirrorStatus[lesson.key]);
  const workbookComplete = COMPLETE_STATES.has(workbookStatus[lesson.key]);
  const lessonReady = scanComplete && knowledgeComplete && decisionComplete && mirrorComplete && workbookComplete;
  const lessonComplete = completed.includes(lesson.key);

  const markComplete = () => {
    if (!lessonReady || lessonComplete) return;
    setCompleted((current) => [...new Set([...current, lesson.key])]);
  };

  const toggleLens = (lensId) => {
    setRootScans((current) => ({
      ...current,
      [lesson.key]: {
        ...safeRecord(current[lesson.key]),
        [lensId]: !safeRecord(current[lesson.key])[lensId],
      },
    }));
  };

  const setKnowledge = (answerId) => {
    setKnowledgeAnswers((current) => ({
      ...current,
      [lesson.key]: {
        ...safeRecord(current[lesson.key]),
        [lesson.knowledgeCheck.id]: answerId,
      },
    }));
  };

  const closeNav = () => {
    setNavOpen(false);
    navToggleRef.current?.focus();
  };

  return (
    <main className="r1-experience">
      <div className="r1-backdrop" aria-hidden="true" />
      <header className="r1-topbar">
        <button type="button" className="r1-back" onClick={() => go('dashboard')}>
          <ArrowLeft size={17} /> The Grove
        </button>
        <button type="button" className="r1-wordmark" onClick={() => go('home')} aria-label="RootWise home">
          <ApprovedArtwork variant="tree" />
          <span><strong>Root$Wise</strong><small>Root One · The Story Beneath the Decision</small></span>
        </button>
        <button
          ref={navToggleRef}
          type="button"
          className="r1-nav-toggle"
          onClick={() => setNavOpen(true)}
          aria-expanded={navOpen}
          aria-controls="r1-lesson-navigation"
        >
          <Menu size={18} /> Lessons
        </button>
        <span className="r1-topbar-count">{completed.length}/{rootOneLessons.length} complete</span>
      </header>
      <div
        className="r1-completion-bar"
        role="progressbar"
        aria-label="Root One progress"
        aria-valuemin={0}
        aria-valuemax={rootOneLessons.length}
        aria-valuenow={completed.length}
        aria-valuetext={`${completed.length} of ${rootOneLessons.length} lessons complete`}
      >
        <i style={{ width: `${completed.length / rootOneLessons.length * 100}%` }} />
      </div>
      {navOpen && <button type="button" className="r1-nav-scrim" onClick={closeNav} aria-label="Close lesson navigation" />}
      <div className="r1-shell">
        <LessonNavigation
          activeIndex={activeIndex}
          completed={completed}
          visited={visited}
          onSelect={selectLesson}
          navOpen={navOpen}
          onClose={closeNav}
          navRef={navRef}
          closeRef={navCloseRef}
        />
        <article className="r1-lesson" key={lesson.key}>
          {activeIndex === 0 && <OpeningExperience openingChoice={openingChoice} onChoose={setOpeningChoice} />}
          <LessonHeader lesson={lesson} />
          <SageOpening lesson={lesson} />
          <LessonStory lesson={lesson} />
          <LearningLayers lesson={lesson} />
          <DecisionRootsScan lesson={lesson} scans={rootScans} onToggle={toggleLens} />
          <KnowledgeAndDecision
            lesson={lesson}
            knowledgeAnswer={currentKnowledgeAnswer}
            decisionAnswer={choices[lesson.key]}
            onKnowledge={setKnowledge}
            onDecision={(answerId) => setChoices((current) => ({ ...current, [lesson.key]: answerId }))}
          />
          <div className="r1-private-grid">
            <PrivatePanel
              type="mirror"
              title="Notice without grading or diagnosing"
              prompt={lesson.mirror.prompt}
              value={safeString(mirrors[lesson.key])}
              status={mirrorStatus[lesson.key]}
              onChange={(value) => setMirrors((current) => ({ ...current, [lesson.key]: value }))}
              onSave={() => setMirrorStatus((current) => ({ ...current, [lesson.key]: 'saved' }))}
              onSkip={() => setMirrorStatus((current) => ({ ...current, [lesson.key]: 'skipped' }))}
            />
            <PrivatePanel
              type="workbook"
              title={lesson.workbook.title}
              prompt={lesson.workbook.intro}
              fields={lesson.workbook.fields}
              note={lesson.workbook.note}
              value={safeString(workbooks[lesson.key])}
              status={workbookStatus[lesson.key]}
              onChange={(value) => setWorkbooks((current) => ({ ...current, [lesson.key]: value }))}
              onSave={() => setWorkbookStatus((current) => ({ ...current, [lesson.key]: 'saved' }))}
              onSkip={() => setWorkbookStatus((current) => ({ ...current, [lesson.key]: 'skipped' }))}
            />
          </div>
          <SourceDesk lesson={lesson} />
          <LessonConnection lesson={lesson} />
          <section className="r1-growth">
            <span><Sparkles size={22} /></span>
            <div>
              <p className="r1-eyebrow">Root growth</p>
              <h2>“{lesson.growthStatement}”</h2>
            </div>
          </section>
          <section className="r1-transition">
            <Route size={20} />
            <div><p className="r1-eyebrow">The road continues</p><p>{lesson.transition}</p></div>
          </section>
          <footer className="r1-footer">
            <button type="button" className="r1-secondary" disabled={activeIndex === 0} onClick={() => selectLesson(activeIndex - 1)}>
              <ArrowLeft size={17} /> Previous lesson
            </button>
            <button
              type="button"
              className={`r1-complete ${lessonComplete ? 'is-complete' : ''}`}
              disabled={!lessonComplete && !lessonReady}
              onClick={markComplete}
              aria-pressed={lessonComplete}
            >
              {lessonComplete ? <Check size={18} /> : <CheckCircle2 size={18} />}
              {lessonComplete
                ? 'Lesson complete'
                : lessonReady
                  ? 'Confirm this growth'
                  : 'Complete the scan, checks, and private panels'}
            </button>
            <button
              type="button"
              className="r1-primary"
              onClick={() => activeIndex === rootOneLessons.length - 1 ? go('/roots/two') : selectLesson(activeIndex + 1)}
            >
              {activeIndex === rootOneLessons.length - 1 ? 'Continue to Root Two' : 'Next lesson'} <ArrowRight size={17} />
            </button>
          </footer>
        </article>
      </div>
      <SageCompanion lesson={lesson} />
    </main>
  );
}
