import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, BookOpen, ChevronLeft,
  GraduationCap, Lock, Sparkles, Sprout, Users,
} from 'lucide-react';
import { ApprovedArtwork, ApprovedLandingArtwork } from './approved-artwork';
import ContextualDefinition from './contextual-definition';
import Grove from './grove';
import RootOneCity from './root-one-city';
import RootTwoCity from './root-two-city';
import RootThreeCity from './root-three-city';
import RootFourValley from './root-four-valley';
import RootFiveBridge from './root-five-bridge';
import RootSixHarbor from './root-six-harbor';
import RootSevenJunction from './root-seven-junction';
import RootEightExchange from './root-eight-exchange';
import RootFinalExperience from './root-final';
import Crossing from './crossing';
import RootOverview from './root-overview';
import { getLessonById, getLessonBySlug, getRootBySlug, rootRegistry } from './root-registry';
import { destinationForPage, routeFromPath } from './root-routing';
import SageVoice from './sage-voice';
import { MoneyDictionary, ToolDetail, ToolsCenter } from './tools-center';
import './styles.css';
import './roots-vivid-shared.css';

const STORAGE_KEY = 'rootwise_sprint_003_profile';

const paths = rootRegistry.map((root) => ({ key: root.slug, title: root.displayTitle, text: root.purpose }));

const assessmentQuestions = [
  {
    id: 'rootInterests',
    type: 'multi',
    question: 'Which money areas feel important to you right now? Select all that apply.',
    sage: 'It is completely normal if more than one fits. People are rarely in one neat box.',
    options: ['Financial literacy foundation', 'Credit', 'Debt', 'Investing', 'Business', 'Family matters', 'Educators or classroom', 'All of these apply', "I'm not sure yet"],
  },
  {
    id: 'relationship',
    type: 'choice',
    question: 'Which statement feels most true today?',
    sage: 'This is not a label. It simply helps me understand how money feels from where you are standing.',
    options: ['I feel overwhelmed.', "I'm surviving.", "I'm stable.", "I'm growing.", "I'm thriving.", "I'm not sure yet."],
  },
  {
    id: 'worry',
    type: 'multi',
    question: 'What worries you most right now? Select all that apply.',
    sage: 'Worry often points toward the first root we need to strengthen.',
    options: ['Debt', 'Credit', 'Bills', 'Retirement', 'Business stability', 'My children or family', 'Not knowing where to begin', 'All of these apply'],
  },
  {
    id: 'confidence',
    type: 'slider',
    question: 'How confident do you feel making financial decisions?',
    sage: 'Confidence tells me how fast to move, not how smart you are.',
    left: 'Not confident',
    right: 'Very confident',
  },
  {
    id: 'goal',
    type: 'text',
    question: "What's one financial goal you'd love to accomplish this year?",
    sage: 'Use your own words. This helps me hear what matters to you, not just what fits a button.',
    placeholder: 'Example: fix my credit, save $1,000, buy a home, start a business, teach my child...',
  },
  {
    id: 'education',
    type: 'choice',
    question: 'How much personal finance education have you actually received?',
    sage: 'Most people were expected to know money without ever being taught money. That is not a character flaw.',
    options: ['None that I remember', 'A little', 'Some, but not enough', 'Quite a bit', 'Professionally', "I'm not sure"],
  },
  {
    id: 'creditComfort',
    type: 'choice',
    question: 'How comfortable are you reading or understanding a credit report?',
    sage: 'Credit is one of the places where people are often told what to do before anyone explains what they are looking at.',
    options: ['Not comfortable at all', 'I know a few basics', 'I can read some of it', 'I understand most of it', 'I could explain it to someone else'],
  },
  {
    id: 'debtPicture',
    type: 'multi',
    question: 'Which debt-related topics would you want explained clearly? Select all that apply.',
    sage: 'Debt has options. Understanding those options comes before choosing a strategy.',
    options: ['Credit cards', 'Collections', 'Student loans', 'Medical debt', 'Car loans', 'Mortgage debt', 'Debt payoff methods', 'Bankruptcy basics', 'All of these apply', 'None right now'],
  },
  {
    id: 'investingPicture',
    type: 'multi',
    question: 'Which investing avenues are you curious about? Select all that apply.',
    sage: 'Exploring is not the same as choosing. We learn the map before picking a road.',
    options: ['Stocks', 'ETFs or index funds', 'Retirement accounts', 'Real estate', 'Bonds or treasuries', 'Dividends', 'Crypto basics', 'Precious metals', 'All of these apply', "I'm not ready for investing yet"],
  },
  {
    id: 'businessFamilyEducation',
    type: 'multi',
    question: 'Which bigger branches may matter to you later? Select all that apply.',
    sage: 'This helps me avoid assuming your journey ends with personal finance.',
    options: ['Starting or growing a business', 'Business credit or funding', 'Teaching my children', 'Family legacy planning', 'Classroom or school curriculum', 'Not sure yet', 'None right now'],
  },
  {
    id: 'style',
    type: 'multi',
    question: 'How do you learn best? Select all that apply.',
    sage: 'Good teaching adapts to the learner. That is the point of asking.',
    options: ['Short lessons', 'Step-by-step checklists', 'Stories and examples', 'Tools and calculators', 'Talking it out with Sage', 'Worksheets', 'Videos', 'All of these apply'],
  },
  {
    id: 'feeling',
    type: 'multi',
    question: 'How do you want to feel after using Root$Wise for 30 days? Select all that apply.',
    sage: 'This helps me build the experience around the result you actually want.',
    options: ['Relieved', 'Confident', 'Organized', 'Less embarrassed', 'In control', 'Ready to grow', 'Able to teach someone else', 'All of these apply'],
  },
];

const navItems = [
  ['Dashboard', 'dashboard'], ['Learn', 'learn'], ['Assessment', 'assessment'], ['Tools', 'tools'], ['Schools', 'schools']
];

function saveProfile(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function loadProfile() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; } }
function routeFromLocation() {
  return routeFromPath(window.location.pathname, window.location.hash);
}
function go(page) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const destination = destinationForPage(page);
  window.history.pushState(null, '', destination);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
function normalize(value) { return Array.isArray(value) ? value : value ? [value] : []; }

function RootLessonExperience({ root, lesson }) {
  const openLesson = (lessonId) => {
    const next = getLessonById(root, lessonId);
    if (next) go(next.route);
  };
  const shared = { go, initialLessonKey: lesson.id, onLessonChange: openLesson };
  if (root.id === 1) return <RootOneCity key={lesson.id} {...shared} />;
  if (root.id === 2) return <RootTwoCity key={lesson.id} {...shared} />;
  if (root.id === 3) return <RootThreeCity key={lesson.id} {...shared} />;
  if (root.id === 4) return <RootFourValley key={lesson.id} {...shared} />;
  if (root.id === 5) return <RootFiveBridge key={lesson.id} {...shared} />;
  if (root.id === 6) return <RootSixHarbor key={lesson.id} {...shared} />;
  if (root.id === 7) return <RootSevenJunction key={lesson.id} {...shared} />;
  if (root.id === 8) return <RootEightExchange key={lesson.id} {...shared} />;
  if (root.id >= 9 && root.id <= 11) return <RootFinalExperience key={lesson.id} root={root} {...shared} />;
  return <RootOverview root={root} />;
}

function App() {
  const [route, setRoute] = useState(routeFromLocation());
  const [profile, setProfile] = useState(loadProfile());
  React.useEffect(() => {
    const onRoute = () => setRoute(routeFromLocation());
    window.addEventListener('popstate', onRoute);
    window.addEventListener('hashchange', onRoute);
    return () => {
      window.removeEventListener('popstate', onRoute);
      window.removeEventListener('hashchange', onRoute);
    };
  }, []);
  React.useEffect(() => {
    if (route !== 'legacy-my-journey' && route !== 'legacy-tools') return;
    const destination = route === 'legacy-my-journey' ? '/grove' : '/tools';
    window.history.replaceState(null, '', destination);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, [route]);
  const [routeKind, rootSlug, lessonSlug] = route.split(':');
  const currentRoot = routeKind === 'root-overview' || routeKind === 'root-lesson' ? getRootBySlug(rootSlug) : null;
  const currentLesson = routeKind === 'root-lesson' && currentRoot ? getLessonBySlug(currentRoot, lessonSlug) : null;
  const knownRoutes = ['home', 'journey', 'profile', 'assessment', 'heart', 'dashboard', 'crossing', 'learn', 'tools', 'tool-dictionary', 'schools', 'privacy', 'terms', 'accessibility', 'faq', 'contact', 'legacy-my-journey', 'legacy-tools'];
  const routeMissing = !knownRoutes.includes(route) && !currentRoot && routeKind !== 'tool';
  React.useEffect(() => {
    const titles = {
      home: 'Root$Wise',
      heart: 'Before We Enter the City · Root$Wise',
      dashboard: 'Your Grove · Root$Wise',
      crossing: 'The Crossing · Root$Wise',
      learn: 'The Eleven Roots · Root$Wise',
      assessment: 'Financial Roots Assessment · Root$Wise',
      tools: 'Tools · Root$Wise',
      'tool-dictionary': 'Money Dictionary · Root$Wise',
      schools: 'Schools · Root$Wise',
      profile: 'Your Grove Profile · Root$Wise',
      privacy: 'Privacy · Root$Wise',
      terms: 'Terms of Use · Root$Wise',
      accessibility: 'Accessibility · Root$Wise',
      faq: 'Frequently Asked Questions · Root$Wise',
      contact: 'Contact · Root$Wise',
    };
    document.title = currentRoot
      ? `${currentLesson?.title || currentRoot.displayTitle} · Root$Wise`
      : titles[route] || 'Root$Wise';
  }, [route, currentRoot, currentLesson]);
  const updateProfile = (next) => { const merged = { ...(profile || {}), ...next }; setProfile(merged); saveProfile(merged); };
  const groveNarration = route === 'heart'
    ? 'Before we enter the city, I want to ask you a question. When did money become real to you? Not when you learned what a dollar was. When did money begin to mean something? Most financial decisions look as though they begin with numbers. They rarely do. Before we examine where money goes, we have to understand who is making the decision. That is where Root One begins.'
    : route === 'dashboard'
      ? `Welcome${profile?.firstName ? `, ${profile.firstName}` : ''}, to your Grove. This is where your RootWise journey connects. Your progress is not a grade, and the order is not a judgment. Choose an available Root when you are ready. Each Root will return you here with a stronger understanding of how money, choices, and life connect.`
      : '';
  return (
    <>
      {route === 'home' && <Home />}
      {route === 'journey' && <Journey updateProfile={updateProfile} />}
      {route === 'profile' && <LocalProfile profile={profile} updateProfile={updateProfile} />}
      {route === 'assessment' && <AssessmentFlow profile={profile} updateProfile={updateProfile} />}
      {route === 'heart' && <Grove profile={null} view="welcome" />}
      {route === 'dashboard' && <Dashboard profile={profile} />}
      {route === 'crossing' && <Crossing go={go} />}
      {route === 'learn' && <Learn />}
      {route === 'tools' && <ToolsCenter />}
      {route === 'tool-dictionary' && <MoneyDictionary />}
      {routeKind === 'tool' && <ToolDetail slug={rootSlug} />}
      {route === 'schools' && <Schools />}
      {route === 'privacy' && <Privacy />}
      {route === 'terms' && <Terms />}
      {route === 'accessibility' && <Accessibility />}
      {route === 'faq' && <Faq />}
      {route === 'contact' && <Contact />}
      {routeKind === 'root-overview' && currentRoot && <RootOverview root={currentRoot} />}
      {routeKind === 'root-lesson' && currentRoot && currentLesson && <RootLessonExperience root={currentRoot} lesson={currentLesson} />}
      {routeKind === 'root-lesson' && currentRoot?.id === 5 && currentLesson && <ContextualDefinition lesson={currentLesson} />}
      {routeKind === 'root-lesson' && currentRoot && !currentLesson && <RootOverview root={currentRoot} />}
      {routeMissing && <RouteNotFound />}
      <SageVoice key={route} pageText={groveNarration} />
    </>
  );
}

function RouteNotFound() {
  return <PageShell kicker="RootWise" title="This path is not part of the current Grove." lead="Return to the Grove to choose a published Root or review a Root still in development."><button type="button" onClick={() => go('dashboard')}>Return to the Grove <ArrowRight size={16} /></button></PageShell>;
}

function Home() {
  return (
    <main className="landing-page">
      <section className="approved-hero" aria-label="RootWise approved landing page">
        <ApprovedLandingArtwork />
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">Grow financial wisdom at the root</p>
          <h1>Stop guessing with money. Build roots by learning.</h1>
          <p className="landing-support">
            RootWise teaches what money is, what it does, the concepts behind it,
            and how to apply that knowledge to the choices you make in real life.
          </p>
          <button type="button" className="landing-primary-cta" onClick={() => go('heart')}>
            Begin Your Journey <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
        <blockquote className="landing-sage-quote">
          <p>“Financial clarity isn’t about how much you make, it’s about understanding where to apply it. Clarity grows one root at a time.”</p>
          <cite>— Sage</cite>
        </blockquote>
      </section>
      <footer className="landing-legal-footer">
        <div className="landing-legal-brand"><ApprovedArtwork variant="tree" /><span><strong>Root$Wise</strong><small>Grow financial wisdom at the root.</small></span></div>
        <div className="landing-legal-links" aria-label="Legal information">
          <a href={destinationForPage('privacy')}>Privacy Policy</a>
          <a href={destinationForPage('terms')}>Terms of Use</a>
          <a href={destinationForPage('accessibility')}>Accessibility</a>
          <a href={destinationForPage('faq')}>FAQ</a>
          <a href={destinationForPage('contact')}>Contact Us</a>
        </div>
        <small>© 2026 Root$Wise. All rights reserved.</small>
      </footer>
    </main>
  );
}

function PageShell({ kicker, title, lead, children, back = true }) {
  return (
    <main className="app-page">
      <TopBar />
      <section className="paper-section page-hero">
        <div className="section-shell">
          {back && <button className="back-btn" onClick={() => go('home')}><ChevronLeft size={16}/> Back to Home</button>}
          <div className="section-kicker">{kicker}</div>
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
      </section>
    </main>
  );
}

function TopBar() {
  return <header className="topbar"><button className="wordmark" onClick={() => go('home')}><ApprovedArtwork variant="tree" className="topbar-approved-tree"/><span>Root$Wise</span></button><nav>{navItems.map(([label, page]) => <button key={page} onClick={() => go(page)}>{label}</button>)}</nav><button className="signin" onClick={() => go('profile')}>My Grove</button></header>;
}

function Journey({ updateProfile }) {
  return <PageShell kicker="Meet Sage" title="Choose the root you most want to strengthen first." lead="This is not a box. It is a starting point. The assessment will still listen across every area.">
    <div className="principle-box"><strong>Root$Wise principle:</strong> We discover the user's starting point. We do not assume one.</div>
    <div className="path-choice-grid eleven">{paths.map(({ key, title, text }) => <button className="choice-card" key={key} onClick={() => { updateProfile({ path: key, pathTitle: title }); go('assessment'); }}><Sprout size={28}/><h3>{title}</h3><p>{text}</p></button>)}</div>
  </PageShell>;
}

function LocalProfile({ profile, updateProfile }) {
  const [firstName, setFirstName] = useState(profile?.firstName || '');
  return <PageShell kicker="Your Grove" title="Personalize this device." lead="RootWise does not create an online account here. Your name and learning progress stay in this browser unless a feature clearly tells you otherwise.">
    <form className="signup-card" onSubmit={(event) => { event.preventDefault(); updateProfile({ firstName: firstName.trim() }); go('dashboard'); }}>
      <label>First name or nickname<input value={firstName} maxLength={60} onChange={(event) => setFirstName(event.target.value)} /></label>
      <p className="principle-box"><strong>Private by default:</strong> You may leave this blank. Never enter account numbers, passwords, Social Security numbers, or other sensitive information.</p>
      <button>Save on this device <ArrowRight size={17}/></button>
    </form>
  </PageShell>;
}

function Privacy() {
  return <PageShell kicker="Privacy" title="Your learning should not require your financial identity." lead="RootWise is designed to teach with category-level, approximate, fictional, or redacted examples.">
    <div className="legal-copy"><h2>Information stored on this device</h2><p>Your optional Grove name, assessment answers, lesson progress, workbook entries, and reflections are stored in this browser’s local storage. Clearing browser data may remove them.</p><h2>Ask Sage and narration</h2><p>Text you intentionally submit to Ask Sage and lesson text requested for connected narration are sent to RootWise server functions to produce a response. Private workbook and reflection entries are not automatically sent to Sage.</p><h2>Keep sensitive information out</h2><p>Do not enter account numbers, Social Security numbers, passwords, verification codes, exact financial records, medical details, legal case details, or confidential employer or customer information.</p><h2>Payments and accounts</h2><p>This version does not create an online user account or collect payment information. Any future account or payment feature must identify its own data practices before collecting information.</p></div>
  </PageShell>;
}

function Terms() {
  return <PageShell kicker="Terms of Use" title="RootWise is financial education—not a command." lead="Use RootWise to understand choices, questions, systems, and consequences.">
    <div className="legal-copy"><h2>Educational purpose</h2><p>RootWise provides general financial education. It does not provide individualized financial, investment, tax, legal, insurance, employment, medical, or substance-use advice.</p><h2>Your decisions remain yours</h2><p>Examples, tools, and calculations simplify real situations. Verify current facts, agreements, laws, eligibility rules, fees, rates, and professional qualifications before acting.</p><h2>Responsible use</h2><p>Do not use RootWise to submit unlawful, harmful, deceptive, confidential, or sensitive identifying information. Do not rely on Ask Sage for emergencies or professional diagnosis or treatment.</p><h2>Availability</h2><p>Curriculum, tools, and connected services may change as RootWise improves. Locally stored progress can be lost if browser storage is cleared or unavailable.</p></div>
  </PageShell>;
}

function Accessibility() {
  return <PageShell kicker="Accessibility" title="Financial understanding should be reachable." lead="RootWise is being built for keyboard, screen-reader, mobile, reduced-motion, and readable-text access.">
    <div className="legal-copy"><h2>Current support</h2><p>Core pages use semantic headings, labeled controls, keyboard-operable actions, visible focus treatment, responsive layouts, text alternatives for meaningful images, and reduced-motion preferences where animation appears.</p><h2>Need another format?</h2><p>If a lesson, tool, narration control, contrast choice, or interaction creates a barrier, use the Contact page to describe the page and what you were trying to do. Do not include private financial or medical details.</p></div>
  </PageShell>;
}

function Faq() {
  return <PageShell kicker="FAQ" title="Questions about how RootWise works." lead="The short version: learn the system, see yourself in the story, and practice without surrendering your judgment.">
    <div className="legal-copy"><h2>Does RootWise tell me what financial decision to make?</h2><p>No. It teaches concepts, makes tradeoffs visible, and asks questions that help you evaluate your own decision.</p><h2>Are workbook entries private?</h2><p>They are stored on this device and are not automatically sent to Ask Sage. Each Root also provides specific privacy boundaries.</p><h2>Do I have to complete Roots in order?</h2><p>The curriculum builds in sequence, but the Grove lets you inspect any published Root. Progress is not a grade or judgment.</p><h2>Why are some Roots marked in development?</h2><p>RootWise publishes complete learning experiences—not placeholder lessons. Their overviews preserve the full eleven-Root map until the curriculum is ready.</p><h2>Is Ask Sage professional advice?</h2><p>No. Sage provides general education and reflection support within RootWise boundaries.</p></div>
  </PageShell>;
}

function Contact() {
  return <PageShell kicker="Contact" title="Tell us where the experience needs attention." lead="RootWise does not currently collect contact messages inside the app.">
    <div className="legal-copy"><h2>Protect your privacy</h2><p>When reporting a problem, note the page or Root, the device or browser, and what happened. Do not include account numbers, Social Security numbers, passwords, verification codes, exact financial records, legal case details, or medical information.</p><h2>Current status</h2><p>A public support address or contact form will appear here only after it is connected, tested, and ready to receive messages securely.</p></div>
  </PageShell>;
}

function AssessmentFlow({ profile, updateProfile }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(profile?.answers || {});
  const q = assessmentQuestions[step];
  const pct = Math.round(((step + 1) / assessmentQuestions.length) * 100);
  const setAnswer = (value) => setAnswers({ ...answers, [q.id]: value });
  const toggleAnswer = (opt) => {
    const current = normalize(answers[q.id]);
    const next = current.includes(opt) ? current.filter((x) => x !== opt) : [...current, opt];
    setAnswer(next);
  };
  const current = answers[q.id];
  const canContinue = Array.isArray(current) ? current.length > 0 : current !== undefined && current !== '';
  const finish = () => {
    const score = calculateScore(answers, profile?.path);
    const suggestedRoots = inferRoots(answers, profile?.path);
    updateProfile({ answers, rootScore: score, suggestedRoots, completedAssessment: true });
    go('dashboard');
  };
  return <PageShell kicker="Financial Roots Assessment" title={q.question} lead="Answer honestly. Sage uses this to shape your first dashboard.">
    <div className="sage-aside"><Sparkles size={18}/><p>{q.sage}</p></div>
    <div className="progress-wrap"><div className="progress-label"><span>Question {step + 1} of {assessmentQuestions.length}</span><strong>{pct}%</strong></div><div className="progress-track"><div style={{ width: `${pct}%` }} /></div></div>
    <div className="assessment-panel">
      {q.type === 'choice' && <div className="answer-list big">{q.options.map(opt => <button className={answers[q.id] === opt ? 'answer active' : 'answer'} key={opt} onClick={() => setAnswer(opt)}><span>✓</span>{opt}</button>)}</div>}
      {q.type === 'multi' && <div className="answer-list big multi">{q.options.map(opt => <button className={normalize(answers[q.id]).includes(opt) ? 'answer active' : 'answer'} key={opt} onClick={() => toggleAnswer(opt)}><span>✓</span>{opt}</button>)}</div>}
      {q.type === 'slider' && <div className="slider-card"><input type="range" min="0" max="100" value={answers[q.id] ?? 50} onChange={(e) => setAnswer(e.target.value)}/><div><span>{q.left}</span><strong>{answers[q.id] ?? 50}</strong><span>{q.right}</span></div></div>}
      {q.type === 'text' && <textarea value={answers[q.id] || ''} placeholder={q.placeholder} onChange={(e) => setAnswer(e.target.value)} />}
    </div>
    <div className="flow-actions"><button className="secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button><button disabled={!canContinue} onClick={() => step === assessmentQuestions.length - 1 ? finish() : setStep(step + 1)}>{step === assessmentQuestions.length - 1 ? 'Build My Root System' : 'Next'} <ArrowRight size={16}/></button></div>
  </PageShell>;
}

function calculateScore(answers, path) {
  let score = 54;
  const relationship = answers.relationship || '';
  if (relationship.includes('stable')) score += 10;
  if (relationship.includes('growing')) score += 16;
  if (relationship.includes('thriving')) score += 21;
  if (answers.confidence) score += Math.round(Number(answers.confidence) / 8);
  if (answers.education && !answers.education.includes('None')) score += 6;
  if (path === 'eleven') score += 4;
  if (normalize(answers.rootInterests).length > 2) score += 3;
  return Math.min(96, Math.max(28, score));
}

function inferRoots(answers, path) {
  const selected = new Set([path].filter(Boolean));
  const buckets = {
    one: ['Financial literacy foundation', 'Not knowing where to begin', "I'm not sure yet", "I'm not sure"],
    five: ['Credit', 'Credit cards', 'Debt', 'Collections', 'Medical debt', 'Student loans', 'Debt payoff methods'],
    nine: ['Investing', 'Stocks', 'ETFs or index funds', 'Retirement accounts', 'Real estate'],
    eleven: ['Business', 'Business stability', 'Starting or growing a business', 'Business credit or funding'],
    ten: ['Family matters', 'My children or family', 'Teaching my children', 'Family legacy planning'],
  };
  Object.entries(answers).forEach(([, value]) => {
    normalize(value).forEach((v) => {
      Object.entries(buckets).forEach(([key, terms]) => {
        if (terms.some((term) => String(v).toLowerCase().includes(term.toLowerCase()))) selected.add(key);
      });
    });
  });
  return Array.from(selected).slice(0, 4);
}

function Dashboard({ profile }) {
  return <Grove profile={profile} view="user" />;
}

function Learn() {
  const [active, setActive] = useState(rootRegistry[0].slug);
  const root = getRootBySlug(active) || rootRegistry[0];
  const publishedLessons = root.lessons.filter((lesson) => lesson.published);
  return <PageShell kicker="Learn" title="The Eleven Roots of Financial Decision Capacity" lead="Each Root builds on the capacity developed before it. The Grove is the central map; this view lets you examine one Root at a time.">
    <div className="root-layout">
      <div className="root-list">{rootRegistry.map((item) => <button key={item.slug} className={active === item.slug ? 'active' : ''} onClick={() => setActive(item.slug)}><Sprout size={20}/><span>{item.label}: {item.displayTitle}</span></button>)}</div>
      <article className="root-detail">
        <div className="root-detail-head"><Sprout size={34}/><div><h2>{root.displayTitle}</h2><p>{root.purpose}</p></div></div>
        <div className="principle-box"><strong>Financial decision capacity:</strong> {root.capacity}</div>
        <p className="root-promise">{root.description}</p>
        {publishedLessons.length ? <><h3>Published lesson path</h3><div className="free-lesson-row">{publishedLessons.slice(0, 3).map((lesson) => <a href={lesson.route} key={lesson.id} className="free-lesson"><BookOpen size={18}/><span>{lesson.title}</span></a>)}</div><a className="root-enter-button" href={root.overviewRoute}>View {root.label} and all {root.lessonCount} lessons <ArrowRight size={17}/></a></>
          : <><div className="premium-preview"><Lock size={18}/><span>Lessons are in development. The Root overview contains the canonical purpose and will add real lesson links automatically when publication begins.</span></div><a className="root-enter-button" href={root.overviewRoute}>View {root.label} overview <ArrowRight size={17}/></a></>}
      </article>
    </div>
  </PageShell>;
}

function Schools() {
  return <PageShell kicker="Educators Branch" title="Bring Root$Wise to the classroom." lead="Educators are a separate branch because teaching others has different needs than learning for yourself.">
    <div className="split"><div className="school-card"><GraduationCap size={32}/><h3>School Curriculum Preview</h3><p>K–12 financial wisdom with age-appropriate language, Penny for younger learners, and Sage for older students.</p><span className="lock-pill"><Lock size={15}/> Information preview</span></div><div className="school-card"><Users size={32}/><h3>Parent + Home Study</h3><p>For families who want to talk about money at home without shame, fear, or confusion.</p><span className="lock-pill"><Lock size={15}/> Information preview</span></div></div>
  </PageShell>;
}

createRoot(document.getElementById('root')).render(<App />);
