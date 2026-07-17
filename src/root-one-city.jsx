import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Compass,
  Lightbulb,
  LoaderCircle,
  Map,
  Menu,
  MessageCircle,
  Route,
  Send,
  Sparkles,
  Sprout,
  Store,
  Target,
  X,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import { rootOneDistricts, rootOneQuickPrompts } from './root-one-data';
import './root-one.css';

const PROGRESS_KEY = 'rootwise_root_one_city_progress';

const districtIcons = {
  gates: Compass,
  neighborhoods: Building2,
  streets: Route,
  marketplace: Store,
  'city-hall': Map,
  skyline: Target,
};

function readProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(PROGRESS_KEY) || 'null');
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

    const validKeys = new Set(rootOneDistricts.map((district) => district.key));
    const correctAnswers = new globalThis.Map(rootOneDistricts.map((district) => [
      district.key,
      district.recognitionCheck.options.find((option) => option.isCorrect)?.id,
    ]));
    const choices = value.choices && typeof value.choices === 'object' && !Array.isArray(value.choices) ? value.choices : {};
    const checkAnswers = value.checkAnswers && typeof value.checkAnswers === 'object' && !Array.isArray(value.checkAnswers) ? value.checkAnswers : {};
    return {
      activeIndex: Number.isInteger(value.activeIndex)
        ? Math.max(0, Math.min(value.activeIndex, rootOneDistricts.length - 1))
        : 0,
      visited: Array.isArray(value.visited) ? value.visited.filter((key) => validKeys.has(key)) : [],
      completed: Array.isArray(value.completed)
        ? value.completed.filter((key) => validKeys.has(key) && choices[key] && checkAnswers[key] === correctAnswers.get(key))
        : [],
      choices,
      checkAnswers,
      reflections: value.reflections && typeof value.reflections === 'object' && !Array.isArray(value.reflections) ? value.reflections : {},
    };
  } catch {
    return {};
  }
}

function initialSageMessage(district) {
  return {
    role: 'assistant',
    content: `This part of the walk is ${district.title}. ${district.question} You can answer that, give me a situation of your own, or tell me where the idea stops making sense.`,
  };
}

function quickPromptFor(mode, district) {
  if (mode === 'apply') {
    return `Help me apply ${district.title} to my own life. Start by asking me one simple question, and do not assume my income or situation.`;
  }
  if (mode === 'example') {
    return `Show me one realistic, everyday example of ${district.theme.toLowerCase()} and walk me through the tradeoff.`;
  }
  return `Explain the main idea in ${district.title} a different way. Use plain language and a simple analogy.`;
}

function DistrictSidebar({ activeIndex, completed, visited, onSelect, onClose, closeButtonRef }) {
  return (
    <aside className="city-district-nav">
      <header>
        <div>
          <p>Root One</p>
          <h2>The City of Foundations</h2>
        </div>
        <button ref={closeButtonRef} type="button" className="city-nav-close" onClick={onClose} aria-label="Close district menu">
          <X size={20} />
        </button>
      </header>

      <nav aria-label="City districts">
        {rootOneDistricts.map((district, index) => {
          const Icon = districtIcons[district.key] || Compass;
          const isComplete = completed.includes(district.key);
          return (
            <button
              type="button"
              className={activeIndex === index ? 'is-active' : ''}
              onClick={() => onSelect(index)}
              aria-current={activeIndex === index ? 'step' : undefined}
              key={district.key}
            >
              <span className="city-nav-number">
                {isComplete ? <Check size={15} /> : visited.includes(district.key) ? <Icon size={15} /> : district.number}
              </span>
              <span className="city-nav-copy">
                <small>{district.theme}</small>
                <strong>{district.shortTitle}</strong>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          );
        })}
      </nav>

      <footer>
        <span>{completed.length} of {rootOneDistricts.length} districts anchored</span>
        <div className="city-nav-progress" aria-hidden="true">
          <i style={{ width: `${(completed.length / rootOneDistricts.length) * 100}%` }} />
        </div>
      </footer>
    </aside>
  );
}

function ChapterPromise({ district }) {
  return (
    <section className="city-promise">
      <div className="city-promise-label"><Sprout size={17} /> Chapter promise</div>
      <h1>{district.promise}</h1>
      <p>Sage will begin here, so you know exactly what this walk is meant to give you.</p>
    </section>
  );
}

function JourneyScene({ district }) {
  const story = district.journey.story || [
    { type: 'narration', text: district.journey.arrival },
    ...district.journey.sageDialogue.map((text) => ({ type: 'sage', text })),
    { type: 'narration', text: district.journey.event },
  ];

  return (
    <section className="city-journey-shell" aria-labelledby={`story-title-${district.key}`}>
      <div className="city-sage-opening">
        <div className="city-sage-portrait" aria-hidden="true">
          <img src="/rootwise-sage.webp" alt="" />
        </div>
        <div className="city-journey-copy">
          <p className="city-eyebrow"><Sparkles size={15} /> Sage’s Story</p>
          <h2 id={`story-title-${district.key}`} className="city-story-title">{district.title}</h2>
          <div className="city-story-sequence">
            {story.map((block, index) => block.type === 'sage' ? (
              <blockquote className="city-story-sage" key={`${district.key}-story-${index}`}>
                <cite>Sage</cite>
                <p>“{block.text}”</p>
              </blockquote>
            ) : (
              <p className="city-story-narration" key={`${district.key}-story-${index}`}>{block.text}</p>
            ))}
          </div>
          <div className="city-sage-question">
            <CircleHelp size={18} />
            <span>{district.question}</span>
          </div>
        </div>
      </div>
      <aside className="city-district-note" aria-label={`${district.title} district note`}>
        <p className="city-eyebrow"><Map size={15} /> District note</p>
        <h2>What this place represents</h2>
        <p>{district.districtNote}</p>
      </aside>
    </section>
  );
}

function RootRevealed({ district }) {
  return (
    <section className="city-concepts city-root-revealed">
      <header>
        <p className="city-eyebrow"><Sprout size={15} /> The Root Revealed</p>
        <h2>{district.rootRevealed.title}</h2>
        <p>Here is what Maya’s story was really showing you—and how the same pattern works with money.</p>
      </header>
      <div>
        <section>
          <span aria-hidden="true">01</span>
          <p className="city-story-link">The city is the setting. This financial idea is the lesson.</p>
          <p>{district.rootRevealed.body}</p>
        </section>
      </div>
    </section>
  );
}

function ConceptBreakdown({ district }) {
  return (
    <section className="city-concepts">
      <header>
        <p className="city-eyebrow"><Lightbulb size={15} /> Grow Deeper</p>
        <h2>How this one idea works with money</h2>
        <p>Each lens below deepens the same root so you can recognize it in a bank balance, a daily choice, and your own life.</p>
      </header>
      <div>
        {district.concepts.map((concept, index) => (
          <section key={concept.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p className="city-story-link">{concept.storyLink}</p>
            <h3>{concept.title}</h3>
            <p>{concept.body}</p>
            <aside>
              <strong>Where this may show up in your life</strong>
              <p>{concept.recognize}</p>
            </aside>
          </section>
        ))}
      </div>
    </section>
  );
}

function RootCheck({ district, scenarioSelected, onScenarioSelect, recognitionSelected, onRecognitionSelect }) {
  const selectedOption = district.scenario.options.find((option) => option.id === scenarioSelected);
  const selectedRecognition = district.recognitionCheck.options.find((option) => option.id === recognitionSelected);
  const isComplete = Boolean(selectedOption && selectedRecognition?.isCorrect);

  return (
    <section className="city-scenario city-root-check">
      <header>
        <p className="city-eyebrow"><CheckCircle2 size={15} /> Root Check</p>
        <h2>See the root. Then use it.</h2>
        <p>This is not a vocabulary test. First recognize the pattern in Maya’s story, then use the idea in a new situation.</p>
      </header>

      <div className="city-root-check-block">
        <p className="city-eyebrow"><CircleHelp size={15} /> Recognize it</p>
        <h3>{district.recognitionCheck.prompt}</h3>
        <div className="city-scenario-options">
          {district.recognitionCheck.options.map((option) => (
            <button
              type="button"
              className={recognitionSelected === option.id ? 'is-selected' : ''}
              onClick={() => onRecognitionSelect(option.id)}
              aria-pressed={recognitionSelected === option.id}
              key={option.id}
            >
              <span>{recognitionSelected === option.id ? <Check size={16} /> : <ArrowRight size={16} />}</span>
              {option.label}
            </button>
          ))}
        </div>
        {selectedRecognition && (
          <div className={selectedRecognition.isCorrect ? 'city-root-check-feedback is-correct' : 'city-root-check-feedback'} aria-live="polite">
            <strong>{selectedRecognition.isCorrect ? 'That is the root' : 'Look one layer deeper'}</strong>
            <p>{selectedRecognition.feedback}</p>
          </div>
        )}
      </div>

      <div className="city-root-check-divider" aria-hidden="true" />

      <div className="city-root-check-block">
        <p className="city-eyebrow"><Compass size={15} /> Apply it</p>
        <h3>{district.scenario.prompt}</h3>
        <p className="city-root-check-setup">{district.scenario.setup}</p>
        <div className="city-scenario-options">
          {district.scenario.options.map((option) => (
            <button
              type="button"
              className={scenarioSelected === option.id ? 'is-selected' : ''}
              onClick={() => onScenarioSelect(option.id)}
              aria-pressed={scenarioSelected === option.id}
              key={option.id}
            >
              <span>{scenarioSelected === option.id ? <Check size={16} /> : <ArrowRight size={16} />}</span>
              {option.label}
            </button>
          ))}
        </div>

        {selectedOption && (
          <div className="city-consequence" aria-live="polite">
            <div>
              <p className="city-eyebrow">What follows</p>
              <p>{selectedOption.consequence}</p>
            </div>
            <div className="city-consequence-sage">
              <img src="/rootwise-sage.webp" alt="Sage" />
              <p>“{selectedOption.sage}”</p>
            </div>
            <div className="city-course-correction">
              <p className="city-eyebrow"><Route size={15} /> Course correction</p>
              <p>{selectedOption.correction}</p>
            </div>
          </div>
        )}
      </div>

      {isComplete && district.rootCheckRecap && (
        <aside className="city-root-check-recap" aria-live="polite">
          <p className="city-eyebrow"><Sprout size={15} /> This root is taking hold</p>
          <p>{district.rootCheckRecap}</p>
        </aside>
      )}
    </section>
  );
}

function RootConnection({ connection }) {
  return (
    <section className="city-root-connection">
      <div className="city-connection-tree">
        <ApprovedArtwork variant="tree" className="city-approved-tree" />
      </div>
      <div>
        <p className="city-eyebrow"><Sprout size={15} /> The Root Connection</p>
        <h2>One district. One root. One tree.</h2>
        <dl>
          <div><dt>Look back</dt><dd>{connection.lookBack}</dd></div>
          <div><dt>New growth</dt><dd>{connection.newGrowth}</dd></div>
          <div><dt>Whole-tree scenario</dt><dd>{connection.wholeTreeScenario}</dd></div>
          <div><dt>Carry it forward</dt><dd>{connection.carryForward}</dd></div>
        </dl>
      </div>
    </section>
  );
}

function SageCompanion({ district }) {
  const [conversations, setConversations] = useState(() => ({}));
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [compactOpen, setCompactOpen] = useState(false);
  const listRef = useRef(null);
  const companionRef = useRef(null);
  const closeRef = useRef(null);
  const toggleRef = useRef(null);
  const messages = useMemo(
    () => conversations[district.key] || [initialSageMessage(district)],
    [conversations, district],
  );

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, sending]);

  useEffect(() => {
    if (!compactOpen) return undefined;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleDialogKey = (event) => {
      if (event.key === 'Escape') {
        setCompactOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === 'Tab') {
        const focusable = companionRef.current?.querySelectorAll('button:not(:disabled), textarea:not(:disabled)');
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
      }
    };
    window.addEventListener('keydown', handleDialogKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleDialogKey);
    };
  }, [compactOpen]);

  const send = async (message) => {
    const cleanMessage = message.trim();
    if (!cleanMessage || sending) return;

    const nextMessages = [...messages, { role: 'user', content: cleanMessage }];
    setConversations((current) => ({ ...current, [district.key]: nextMessages }));
    setDraft('');
    setSending(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 22_000);

    try {
      const response = await fetch('/api/sage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: cleanMessage,
          district: {
            key: district.key,
          },
          history: messages.slice(-9),
        }),
        signal: controller.signal,
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.reply) throw new Error('Sage is unavailable');

      setConversations((current) => ({
        ...current,
        [district.key]: [...nextMessages, { role: 'assistant', content: payload.reply }],
      }));
    } catch (error) {
      setConversations((current) => ({
        ...current,
        [district.key]: [
          ...nextMessages,
          {
            role: 'assistant',
            content: error?.name === 'AbortError'
              ? 'That took longer than it should. Your question is still here—give me another try in a moment.'
              : 'I’m having trouble reaching our conversation service right now. Your question is still here—please try me again in a moment.',
            unavailable: true,
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
        className="city-sage-mobile-toggle"
        onClick={() => setCompactOpen(true)}
        aria-expanded={compactOpen}
        aria-controls="city-sage-companion"
      >
        <img src="/rootwise-sage.webp" alt="" />
        <span><strong>Ask Sage</strong><small>Talk through this district</small></span>
        <MessageCircle size={19} />
      </button>
      {compactOpen && <button type="button" className="city-sage-scrim" onClick={() => { setCompactOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage" />}
      <aside
        ref={companionRef}
        id="city-sage-companion"
        className={`city-sage-companion ${compactOpen ? 'is-compact-open' : ''}`}
        aria-label="Ask Sage"
        role={compactOpen ? 'dialog' : undefined}
        aria-modal={compactOpen ? 'true' : undefined}
      >
      <header>
        <img src="/rootwise-sage.webp" alt="Sage" />
        <div><span>Walking with you</span><strong>Ask Sage</strong></div>
        <i title="Sage uses the current district as context" />
        <button ref={closeRef} type="button" className="city-sage-collapse" onClick={() => { setCompactOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage">
          <X size={18} />
        </button>
      </header>

      <div className="city-sage-messages" ref={listRef} role="log" aria-live="polite" aria-relevant="additions">
        {messages.map((message, index) => (
          <div className={`city-message city-message--${message.role} ${message.unavailable ? 'is-unavailable' : ''}`} key={`${message.role}-${index}`}>
            {message.content}
          </div>
        ))}
        {sending && <div className="city-message city-message--assistant city-message--loading"><LoaderCircle size={16} /> Sage is thinking…</div>}
      </div>

      <div className="city-quick-prompts">
        {rootOneQuickPrompts.map((prompt) => (
          <button type="button" onClick={() => send(quickPromptFor(prompt.key, district))} disabled={sending} key={prompt.key}>
            {prompt.label}
          </button>
        ))}
      </div>

      <form onSubmit={(event) => { event.preventDefault(); send(draft); }}>
        <label htmlFor="sage-question">Ask about this part of the walk</label>
        <div>
          <textarea
            id="sage-question"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            maxLength={700}
            rows={3}
            placeholder="What are you wondering?"
          />
          <button type="submit" disabled={!draft.trim() || sending} aria-label="Send question to Sage">
            <Send size={17} />
          </button>
        </div>
      </form>
      </aside>
    </>
  );
}

export default function RootOneCity({ go }) {
  const saved = useMemo(() => readProgress(), []);
  const [activeIndex, setActiveIndex] = useState(saved.activeIndex || 0);
  const [visited, setVisited] = useState(saved.visited?.length ? saved.visited : [rootOneDistricts[0].key]);
  const [completed, setCompleted] = useState(saved.completed || []);
  const [choices, setChoices] = useState(saved.choices || {});
  const [checkAnswers, setCheckAnswers] = useState(saved.checkAnswers || {});
  const [reflections, setReflections] = useState(saved.reflections || {});
  const [navOpen, setNavOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const navCloseButtonRef = useRef(null);
  const district = rootOneDistricts[activeIndex];

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ activeIndex, visited, completed, choices, checkAnswers, reflections }));
  }, [activeIndex, visited, completed, choices, checkAnswers, reflections]);

  useEffect(() => {
    if (!navOpen) return undefined;
    navCloseButtonRef.current?.focus();
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setNavOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [navOpen]);

  const selectDistrict = (index) => {
    const next = Math.max(0, Math.min(index, rootOneDistricts.length - 1));
    setActiveIndex(next);
    setVisited((current) => current.includes(rootOneDistricts[next].key) ? current : [...current, rootOneDistricts[next].key]);
    setNavOpen(false);
    if (navOpen) menuButtonRef.current?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleComplete = () => {
    setCompleted((current) => current.includes(district.key)
      ? current.filter((key) => key !== district.key)
      : [...current, district.key]);
  };

  const selectedRecognition = district.recognitionCheck.options.find((option) => option.id === checkAnswers[district.key]);
  const rootCheckComplete = Boolean(choices[district.key] && selectedRecognition?.isCorrect);

  return (
    <main className="city-experience">
      <header className="city-topbar">
        <button type="button" className="city-back" onClick={() => go('dashboard')}>
          <ArrowLeft size={17} /> The Grove
        </button>
        <button type="button" className="city-wordmark" onClick={() => go('home')} aria-label="RootWise home">
          <ApprovedArtwork variant="tree" className="city-wordmark-tree" />
          <span><strong>Root$Wise</strong><small>Root One · The City of Foundations</small></span>
        </button>
        <button
          ref={menuButtonRef}
          type="button"
          className="city-menu"
          onClick={() => setNavOpen(true)}
          aria-expanded={navOpen}
          aria-controls="city-district-navigation"
        >
          <Menu size={18} /> Districts
        </button>
      </header>

      <div
        className="city-completion-bar"
        role="progressbar"
        aria-label="Root One progress"
        aria-valuemin={0}
        aria-valuemax={rootOneDistricts.length}
        aria-valuenow={completed.length}
        aria-valuetext={`${completed.length} of ${rootOneDistricts.length} districts anchored`}
      >
        <i style={{ width: `${(completed.length / rootOneDistricts.length) * 100}%` }} />
      </div>

      {navOpen && <button type="button" className="city-nav-scrim" aria-label="Close district menu" onClick={() => { setNavOpen(false); menuButtonRef.current?.focus(); }} />}

      <div className="city-layout">
        <div id="city-district-navigation" className={navOpen ? 'city-nav-wrap is-open' : 'city-nav-wrap'}>
          <DistrictSidebar
            activeIndex={activeIndex}
            completed={completed}
            visited={visited}
            onSelect={selectDistrict}
            onClose={() => { setNavOpen(false); menuButtonRef.current?.focus(); }}
            closeButtonRef={navCloseButtonRef}
          />
        </div>

        <article className="city-lesson" key={district.key}>
          <ChapterPromise district={district} />
          <JourneyScene district={district} />
          <RootRevealed district={district} />

          <ConceptBreakdown district={district} />

          <RootCheck
            district={district}
            scenarioSelected={choices[district.key]}
            onScenarioSelect={(choice) => setChoices((current) => ({ ...current, [district.key]: choice }))}
            recognitionSelected={checkAnswers[district.key]}
            onRecognitionSelect={(answer) => setCheckAnswers((current) => ({ ...current, [district.key]: answer }))}
          />

          <section className="city-apply">
            <div>
              <p className="city-eyebrow"><MessageCircle size={15} /> Root Check · Make it yours</p>
              <h2>What do you notice in your own life?</h2>
              <p>{district.reflect}</p>
              <label htmlFor={`reflection-${district.key}`}>
                Your private reflection
                <textarea
                  id={`reflection-${district.key}`}
                  rows={4}
                  value={reflections[district.key] || ''}
                  onChange={(event) => setReflections((current) => ({ ...current, [district.key]: event.target.value }))}
                  placeholder="Write as much or as little as is useful. This stays on this device."
                />
              </label>
            </div>
            <aside>
              <p className="city-eyebrow"><CheckCircle2 size={15} /> Apply it today</p>
              <p>{district.action}</p>
            </aside>
          </section>

          <RootConnection connection={district.connection} />

          <section className="city-journey-transition" aria-label="The road ahead">
            <Route size={18} aria-hidden="true" />
            <div>
              <p className="city-eyebrow">The road continues</p>
              <p>{district.journey.transition}</p>
            </div>
          </section>

          <footer className="city-lesson-footer">
            <button type="button" className="city-secondary" onClick={() => selectDistrict(activeIndex - 1)} disabled={activeIndex === 0}>
              <ArrowLeft size={17} /> Previous district
            </button>
            <button
              type="button"
              className={completed.includes(district.key) ? 'city-complete is-complete' : 'city-complete'}
              onClick={toggleComplete}
              disabled={!completed.includes(district.key) && !rootCheckComplete}
              aria-pressed={completed.includes(district.key)}
            >
              {completed.includes(district.key) ? <Check size={17} /> : <Sprout size={17} />}
              {completed.includes(district.key) ? 'District anchored' : rootCheckComplete ? 'Anchor this district' : 'Complete Root Check'}
            </button>
            <button
              type="button"
              className="city-primary"
              onClick={() => activeIndex === rootOneDistricts.length - 1 ? go('dashboard') : selectDistrict(activeIndex + 1)}
            >
              {activeIndex === rootOneDistricts.length - 1 ? 'Return to the Grove' : 'Next district'} <ArrowRight size={17} />
            </button>
          </footer>
        </article>

        <div className="city-sage-rail">
          <SageCompanion district={district} />
        </div>
      </div>
    </main>
  );
}
