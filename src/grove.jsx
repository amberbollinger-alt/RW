import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  LockKeyhole,
  Map,
  Sun,
  ShieldCheck,
  Sparkles,
  Sprout,
  X,
} from 'lucide-react';
import { rootOneDistricts } from './root-one-data';
import { rootTwoDistricts } from './root-two-data';
import { rootThreeDistricts } from './root-three-data';
import './grove.css';

const WELCOME_KEY = 'rootwise_grove_welcome_seen_v1';
const cssVar = (name, value) => ({ [name]: value });

const groveRoutes = [
  { key: 'literacy', number: '01', label: 'Foundations', description: 'Learn the language beneath every money decision.', ready: true },
  { key: 'value', number: '02', label: 'Value & Earning', description: 'Understand work, income, value, and opportunity.', ready: true },
  { key: 'choice', number: '03', label: 'Choice, Cash Flow & Spending', description: 'Practice spending, tradeoffs, and conscious choice.', ready: true },
  { key: 'investing', number: '04', label: 'Investing', description: 'Explore growth, time, and risk.', ready: false },
  { key: 'business', number: '05', label: 'Business', description: 'Build value beyond a paycheck.', ready: false },
  { key: 'family', number: '06', label: 'Family', description: 'Grow wisdom across relationships and generations.', ready: false },
  { key: 'educators', number: '07', label: 'Educators', description: 'Help financial wisdom take root in others.', ready: false },
];

const welcomeSections = [
  {
    heading: 'The Heart of Root$Wise',
    subheading: 'Welcome to the Grove',
    paragraphs: [
      'Every tree begins as a seed.',
      'The Grove is a reminder that growth is never instant, never identical, and never finished. Every tree represents a journey. Every journey begins with a choice.',
      'Your tree begins today.',
      'It will not grow because time passes.',
      'It will grow because understanding does.',
    ],
  },
];

const monumentContent = {
  principles: {
    label: 'The Root$Wise Principles',
    icon: BookOpen,
    sections: [
      { heading: 'What We Believe', paragraphs: ['Money is important.', 'It pays bills.', 'Creates opportunities.', 'Removes barriers.', 'Supports families.', 'Builds communities.', 'But money has never been the destination.', 'Money is a tool.', 'The destination is choice.'] },
      { heading: 'Our Promise', paragraphs: ['Root$Wise will never tell you what to buy.', 'We will never tell you what to invest in.', 'We will never tell you what decision is "right."', 'Those decisions belong to you.', 'Our responsibility is different.', 'We explain principles.', 'We explore consequences.', 'We compare possibilities.', 'We ask better questions.', 'Because independent thinking is more valuable than borrowed opinions.'] },
      { heading: 'The Seven Roots', paragraphs: ['Wisdom does not grow all at once.', 'It grows one root at a time.', 'Each Root strengthens the next.', 'Each lesson builds on the one before it.', 'Not to create experts.', 'To create understanding.', 'Because strong trees are not built from taller branches.', 'They are built from deeper roots.'] },
      { heading: 'Our Standard', paragraphs: ['Every lesson should answer three questions.', 'What is this?', 'Why does it matter?', 'How does it change the choices available to me?', 'If it cannot answer all three, it is not finished.'] },
      { heading: 'The Measure of Success', paragraphs: ['Success is not measured by how much someone earns.', 'It is measured by how clearly they understand the decisions in front of them.', 'Knowledge creates confidence.', 'Confidence creates better choices.', 'Better choices create more options.', 'That is the growth we measure.'] },
      { heading: 'The Heart of Root$Wise', paragraphs: ['Our roots are planted in ideas.', 'Our purpose is understanding.', 'Our measure is wisdom.', 'Our promise is independence.', 'Our goal is choice.', 'Welcome to the Grove.', "Let's plant your tree."] },
    ],
  },
  mission: {
    label: 'Our Mission',
    icon: Sun,
    sections: [
      { heading: 'Why Root$Wise Exists', paragraphs: ['Most people were expected to understand money long before anyone taught them how it works.', "That isn't a personal failure. It is an educational gap.", 'Root$Wise exists to close that gap.', 'Not by giving answers to memorize.', 'By building understanding that lasts.', 'Because knowledge can be forgotten.', 'Understanding becomes part of how you think.'] },
      { heading: 'What Financial Freedom Really Means', paragraphs: ['Financial freedom is not a number.', 'Financial freedom is options.', 'The option to stay.', 'The option to leave.', 'The option to build.', 'The option to recover.', 'The option to help.', 'The option to begin again.', 'Money simply expands those options.'] },
      { heading: 'The Script You Never Wrote', paragraphs: ['Every person inherits a financial story.', 'Some inherit confidence.', 'Some inherit fear.', 'Some inherit scarcity.', 'Some inherit abundance.', 'Most inherit beliefs they never chose.', 'Root$Wise cannot change your past.', 'It can help you examine it.', 'Understanding your story is the first step toward writing the next chapter yourself.'] },
      { heading: 'Our Mission', paragraphs: ['Root$Wise exists to level the financial playing field through understanding.', 'To teach financial concepts without fear.', 'To encourage independent thinking without influence.', 'To replace confusion with clarity.', 'To replace helplessness with possibility.', 'To help people grow beyond the script they never wrote.'] },
    ],
  },
  ads: {
    label: 'Why You’ll Never See Ads',
    icon: ShieldCheck,
    sections: [
      { heading: 'Why There Are No Advertisements', paragraphs: ['Attention is valuable.', 'Trust is even more valuable.', 'Advertising creates competing interests.', 'Root$Wise was built to serve one audience:', 'The learner.', 'We do not sell attention.', 'We do not sell influence.', 'We do not accept payment to recommend financial products or shape educational content.', 'If a concept belongs here, it belongs because it helps you understand the world—not because someone paid for the space.'] },
      { heading: 'Why We Never Endorse Financial Products', paragraphs: ['Every financial decision depends on the person making it.', 'Their goals.', 'Their circumstances.', 'Their values.', 'One answer cannot fit every life.', 'Root$Wise teaches frameworks, not prescriptions.', 'The decision will always remain yours.'] },
    ],
  },
  premium: {
    label: 'Why Premium Exists',
    icon: Sprout,
    sections: [
      { heading: 'Why Premium Exists', paragraphs: ['Education has a cost.', 'Servers.', 'Development.', 'Research.', 'Writers.', 'Designers.', 'Teachers.', 'Accessibility.', 'Security.', 'Premium allows Root$Wise to be supported by the people it serves instead of advertisers, sponsors, or paid influence.', 'That independence protects the integrity of everything you learn here.'] },
    ],
  },
};

function safeCompleted(key, validKeys) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || '{}');
    if (!Array.isArray(parsed.completed)) return 0;
    return new Set(parsed.completed.filter((item) => validKeys.has(item))).size;
  } catch {
    return 0;
  }
}

function readRootProgress() {
  const rootOneKeys = new Set(rootOneDistricts.map((district) => district.key));
  const rootTwoKeys = new Set(rootTwoDistricts.flatMap((district) => district.lessons.map((lesson) => lesson.progressKey)));
  const rootThreeKeys = new Set(rootThreeDistricts.map((district) => district.key));
  const completed = [
    safeCompleted('rootwise_root_one_city_progress', rootOneKeys) === rootOneKeys.size,
    safeCompleted('rootwise_root_two_journey_v3', rootTwoKeys) === rootTwoKeys.size,
    safeCompleted('rootwise_root_three_city_progress_v1', rootThreeKeys) === rootThreeKeys.size,
  ];
  return completed.filter(Boolean).length;
}

function enterRoot(route, go) {
  if (route.key === 'value') go('roots/two');
  else if (route.key === 'choice') go('roots/three');
  else go('roots/one');
}

function MonumentDialog({ monument, onClose }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const content = monumentContent[monument];

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="grove-dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={dialogRef} className="grove-dialog" role="dialog" aria-modal="true" aria-labelledby="grove-dialog-title">
        <header>
          <p>From the Heart of Root$Wise</p>
          <h2 id="grove-dialog-title">{content.label}</h2>
          <button ref={closeRef} type="button" onClick={onClose} aria-label={`Close ${content.label}`}><X /></button>
        </header>
        <div className="grove-dialog-copy">
          {content.sections.map((section) => (
            <article key={section.heading}>
              <h3>{section.heading}</h3>
              {section.paragraphs.map((paragraph, index) => <p key={`${section.heading}-${index}`}>{paragraph}</p>)}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function SunriseValley({ compact = false }) {
  return (
    <div className={compact ? 'sunrise-valley is-compact' : 'sunrise-valley'} aria-hidden="true">
      <span className="grove-sun" />
      <span className="grove-rays" />
      <span className="grove-birds">⌁  ⌁      ⌁</span>
      <span className="grove-mountain mountain-far" />
      <span className="grove-mountain mountain-near" />
      <span className="grove-valley-floor" />
      <span className="grove-particles" />
    </div>
  );
}

function SageWelcome({ onFinish }) {
  const [phase, setPhase] = useState('arrival');
  useEffect(() => {
    const timer = window.setTimeout(() => setPhase('speaking'), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className={`grove-intro is-${phase}`} aria-label="Welcome to the Grove">
      <SunriseValley />
      <div className="grove-intro-sage"><img src="/rootwise-sage.webp" alt="Sage, your RootWise guide" /></div>
      {phase === 'speaking' && (
        <div className="grove-intro-copy">
          {welcomeSections.map((section) => (
            <div key={section.heading}>
              <p className="grove-intro-kicker">{section.heading}</p>
              <h1>{section.subheading}</h1>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
          <button type="button" onClick={onFinish}>Whenever you’re ready, let’s plant your tree. <ArrowRight /></button>
        </div>
      )}
    </section>
  );
}

export default function Grove({ profile, go }) {
  const [showWelcome, setShowWelcome] = useState(() => window.localStorage.getItem(WELCOME_KEY) !== 'true');
  const [activeMonument, setActiveMonument] = useState(null);
  const [completedRoots, setCompletedRoots] = useState(readRootProgress);
  const previousFocus = useRef(null);
  const name = profile?.firstName || 'Your';
  const treeLabel = profile?.firstName ? `${profile.firstName}’s tree` : 'Your tree';
  const treeLeaves = useMemo(() => 7 + completedRoots * 6, [completedRoots]);

  useEffect(() => {
    const refresh = () => setCompletedRoots(readRootProgress());
    window.addEventListener('focus', refresh);
    window.addEventListener('storage', refresh);
    return () => { window.removeEventListener('focus', refresh); window.removeEventListener('storage', refresh); };
  }, []);

  const finishWelcome = () => {
    window.localStorage.setItem(WELCOME_KEY, 'true');
    setShowWelcome(false);
  };
  const openMonument = (key) => {
    previousFocus.current = document.activeElement;
    setActiveMonument(key);
  };
  const closeMonument = () => {
    setActiveMonument(null);
    window.setTimeout(() => previousFocus.current?.focus(), 0);
  };

  if (showWelcome) return <SageWelcome onFinish={finishWelcome} />;

  return (
    <main className="grove-page">
      <SunriseValley />
      <header className="grove-header">
        <button type="button" onClick={() => go('home')} className="grove-brand" aria-label="RootWise home">
          <Sprout /><span><strong>Root$Wise</strong><small>The Grove</small></span>
        </button>
        <p>A place for understanding to take root.</p>
        <div><button type="button" onClick={() => setShowWelcome(true)}>Replay Sage’s welcome</button><button type="button" onClick={() => go('my-journey')}>My journey</button></div>
      </header>

      <section className="grove-clearing" aria-labelledby="grove-title">
        <div className="grove-clearing-heading">
          <p><Sparkles /> The Heart of Root$Wise</p>
          <h1 id="grove-title">Welcome to the Grove.</h1>
          <span>Every tree begins as a seed. Your understanding gives it roots.</span>
        </div>

        <div className="grove-landscape" id="roots">
          <div className={`grove-user-tree growth-${completedRoots}`} aria-label={`${treeLabel}: ${completedRoots} of 3 available Roots complete. Progress is saved on this device.`}>
            <div className="tree-crown">
              {Array.from({ length: treeLeaves }, (_, index) => <i key={index} style={cssVar('--leaf', index)} />)}
            </div>
            <span className="tree-trunk" />
            <span className="tree-roots" />
            <div className="tree-plaque"><strong>{treeLabel}</strong><span>{completedRoots} of 3 open Roots complete</span></div>
          </div>

          <div className="symbolic-forest" aria-hidden="true">
            {Array.from({ length: 13 }, (_, index) => <span key={index} style={cssVar('--tree', index)}><i /></span>)}
          </div>

          <div className="grove-monuments" aria-label="The heart of RootWise">
            {Object.entries(monumentContent).map(([key, monument]) => {
              const Icon = monument.icon;
              return <button type="button" key={key} className={`monument monument-${key}`} onClick={() => openMonument(key)}><Icon /><span>{monument.label}</span><small>Open monument</small></button>;
            })}
          </div>
        </div>

        <p className="grove-truth-note">The surrounding trees symbolize possibility—not live member accounts. Your tree reflects completed Roots, with progress saved only on this device.</p>
      </section>

      <section className="grove-root-paths" aria-labelledby="root-paths-title">
        <div className="grove-path-heading"><p><Map /> The Seven Roots</p><h2 id="root-paths-title">Choose the root you want to strengthen.</h2><span>Each Root strengthens the next. Open Roots remember your progress on this device.</span></div>
        <div className="grove-route-ring">
          <div className="route-ring-center"><Sprout /><strong>{name} tree</strong><span>{completedRoots ? `${completedRoots} Root${completedRoots === 1 ? '' : 's'} grown` : 'Ready to grow'}</span></div>
          {groveRoutes.map((route, index) => (
            <button
              type="button"
              className={route.ready ? 'grove-route is-ready' : 'grove-route'}
              onClick={() => route.ready && enterRoot(route, go)}
              disabled={!route.ready}
              key={route.key}
              style={cssVar('--route', index)}
            >
              <span>{route.number}</span>
              <div><strong>{route.label}</strong><small>{route.description}</small></div>
              {route.ready ? <ArrowRight /> : <LockKeyhole />}
            </button>
          ))}
        </div>
      </section>

      <footer className="grove-footer">
        <Sprout />
        <p><strong>Our roots are planted in ideas.</strong><span>Our purpose is understanding. Our goal is choice.</span></p>
        <button type="button" onClick={() => go('roots/one')}>Begin with Root One <ArrowRight /></button>
      </footer>

      {activeMonument && <MonumentDialog monument={activeMonument} onClose={closeMonument} />}
    </main>
  );
}
