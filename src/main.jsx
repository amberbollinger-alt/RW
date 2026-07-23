import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, BookOpen, BriefcaseBusiness, Calculator, ChevronLeft,
  GraduationCap, Lock, Menu, Sparkles, Sprout, User, Users, X,
  CreditCard, Landmark, TrendingUp, HomeIcon, School
} from 'lucide-react';
import { ApprovedArtwork, ApprovedLandingArtwork } from './approved-artwork';
import Grove from './grove';
import RootOneCity from './root-one-city';
import RootThreeCity from './root-three-city';
import './styles.css';

const STORAGE_KEY = 'rootwise_sprint_003_profile';

const roots = [
  {
    key: 'literacy',
    icon: Sprout,
    title: 'Financial Literacy Foundation',
    short: 'Start by learning the language of money.',
    audience: 'For anyone who wants money explained clearly before being asked to make bigger decisions.',
    promise: 'Sage discovers your starting point instead of assuming one.',
    topics: ['How money works', 'Banking', 'Budgeting', 'Saving', 'Spending', 'Interest', 'Inflation', 'Taxes', 'Insurance', 'Consumer rights'],
    free: ['What money really does', 'Budgeting without shame', 'Interest in plain English'],
  },
  {
    key: 'credit',
    icon: CreditCard,
    title: 'Credit',
    short: 'Understand the system before trying to improve the score.',
    audience: 'For users who want stronger borrowing power, cleaner reports, and less confusion.',
    promise: 'We teach what credit means, how it works, and what options exist.',
    topics: ['Credit reports', 'FICO', 'VantageScore', 'Utilization', 'Payment history', 'Collections', 'Disputes', 'Credit cards', 'Auto loans', 'Mortgages', 'Identity theft'],
    free: ['Credit report tour', 'What affects a score', 'Utilization basics'],
  },
  {
    key: 'debt',
    icon: Landmark,
    title: 'Debt',
    short: 'Debt is a tool, a burden, or both. Learn the difference.',
    audience: 'For users who feel trapped, overwhelmed, or unsure which debt decision comes next.',
    promise: 'No shame. No panic. Just understanding and options.',
    topics: ['Good debt vs bad debt', 'Interest', 'Minimum payments', 'Debt snowball', 'Debt avalanche', 'Consolidation', 'Settlements', 'Collections', 'Bankruptcy basics', 'Medical debt', 'Student loans'],
    free: ['Debt vocabulary', 'Minimum payment trap', 'Snowball vs avalanche'],
  },
  {
    key: 'investing',
    icon: TrendingUp,
    title: 'Investing',
    short: 'Explore the avenues before choosing a road.',
    audience: 'For users who want to grow but need the map before taking risk.',
    promise: 'Sage explains choices and trade-offs without pretending to choose for the user.',
    topics: ['Stocks', 'Bonds', 'ETFs', 'Mutual funds', 'Index funds', 'Dividends', 'Retirement accounts', 'Real estate', 'REITs', 'CDs', 'Treasuries', 'Crypto basics', 'Risk tolerance'],
    free: ['What investing is', 'Risk vs reward', 'Index funds in plain language'],
  },
  {
    key: 'business',
    icon: BriefcaseBusiness,
    title: 'Business',
    short: 'A separate branch for owners, builders, and future entrepreneurs.',
    audience: 'For users who own or want to own something bigger than a paycheck.',
    promise: 'Business has different rules. Root$Wise treats it as its own branch.',
    topics: ['Entity basics', 'EIN', 'LLCs', 'Business credit', 'Fundability', 'DUNS', 'Vendors', 'Cash flow', 'Bookkeeping', 'Taxes', 'Payroll', 'Commercial lending', 'SBA basics'],
    free: ['Business vs hobby', 'Fundability checklist', 'DUNS before Net-30'],
  },
  {
    key: 'family',
    icon: HomeIcon,
    title: 'Family Matters',
    short: 'Money is never just math. It lives in relationships.',
    audience: 'For parents, couples, caregivers, and anyone building a legacy.',
    promise: 'We help families talk about money with clarity instead of fear.',
    topics: ['Money conversations', 'Marriage', 'Children', 'Allowance', 'College planning', 'Aging parents', 'Estate planning', 'Wills', 'Trusts', 'Family meetings', 'Generational wealth'],
    free: ['How to talk about money', 'Kids and money basics', 'Family money meeting'],
  },
  {
    key: 'educators',
    icon: School,
    title: 'Educators',
    short: 'A separate branch for teaching financial wisdom to others.',
    audience: 'For teachers, schools, nonprofits, and programs that need curriculum support.',
    promise: 'Educators are not just users. They are partners in the mission.',
    topics: ['Classroom curriculum', 'Teacher guides', 'Student dashboards', 'Parent portal', 'Lesson plans', 'Assignments', 'Assessments', 'Standards alignment', 'Pilot programs'],
    free: ['Curriculum overview', 'Sample lesson', 'Pilot interest form'],
  },
];

const paths = roots.map((r) => ({ key: r.key, icon: r.icon, title: r.title, text: r.short }));

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
  ['Dashboard', 'dashboard'], ['Learn', 'learn'], ['Assessment', 'assessment'], ['Tools', 'tools'], ['Schools', 'schools'], ['My Journey', 'journey']
];

function saveProfile(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function loadProfile() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; } }
function routeFromLocation() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (path === 'roots/one' || path === 'roots/three') return path;
  const hashRoute = window.location.hash.replace(/^#\/?/, '');
  return hashRoute || (path || 'home');
}
function go(page) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const destination = page === 'roots/one' || page === 'roots/three'
    ? `/${page}`
    : page === 'home'
      ? '/'
      : `/#/${page}`;
  window.history.pushState(null, '', destination);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
function normalize(value) { return Array.isArray(value) ? value : value ? [value] : []; }

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
  const updateProfile = (next) => { const merged = { ...(profile || {}), ...next }; setProfile(merged); saveProfile(merged); };
  return (
    <>
      {route === 'home' && <Home />}
      {route === 'journey' && <Journey updateProfile={updateProfile} />}
      {route === 'signup' && <Signup profile={profile} updateProfile={updateProfile} />}
      {route === 'assessment' && <AssessmentFlow profile={profile} updateProfile={updateProfile} />}
      {route === 'dashboard' && <Dashboard profile={profile} />}
      {route === 'learn' && <Learn />}
      {route === 'tools' && <Tools />}
      {route === 'schools' && <Schools />}
      {route === 'my-journey' && <MyJourney profile={profile} />}
      {route === 'roots/one' && <RootOneCity go={go} />}
      {route === 'roots/three' && <RootThreeCity go={go} />}
      {!['home', 'roots/one', 'roots/three', 'dashboard'].includes(route) && <StickyNav />}
    </>
  );
}

function StickyNav() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  React.useEffect(() => {
    if (!open) return undefined;
    closeButtonRef.current?.focus();
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);
  return (
    <>
      <button ref={menuButtonRef} className="mobile-menu" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open} aria-controls="rootwise-mobile-navigation"><Menu size={22}/></button>
      <div id="rootwise-mobile-navigation" className={`drawer ${open ? 'show' : ''}`}>
        <button ref={closeButtonRef} className="drawer-close" aria-label="Close navigation" onClick={() => { setOpen(false); menuButtonRef.current?.focus(); }}><X size={22}/></button>
        {navItems.map(([label, page]) => <button key={page} onClick={() => { setOpen(false); go(page === 'journey' ? 'my-journey' : page); }}>{label}</button>)}
        <button className="drawer-sign" onClick={() => { setOpen(false); go('signup'); }}><User size={18}/> Sign In</button>
      </div>
    </>
  );
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
          <button type="button" className="landing-primary-cta" onClick={() => go('dashboard')}>
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
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>Accessibility</span>
          <span>FAQ</span>
          <span>Contact Us</span>
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
  return <header className="topbar"><button className="wordmark" onClick={() => go('home')}><ApprovedArtwork variant="tree" className="topbar-approved-tree"/><span>Root$Wise</span></button><nav>{navItems.map(([label, page]) => <button key={page} onClick={() => go(page === 'journey' ? 'my-journey' : page)}>{label}</button>)}</nav><button className="signin" onClick={() => go('signup')}>Sign In</button></header>;
}

function Journey({ updateProfile }) {
  return <PageShell kicker="Meet Sage" title="Choose the root you most want to strengthen first." lead="This is not a box. It is a starting point. The assessment will still listen across every area.">
    <div className="principle-box"><strong>Root$Wise principle:</strong> We discover the user's starting point. We do not assume one.</div>
    <div className="path-choice-grid seven">{paths.map(({ key, icon: Icon, title, text }) => <button className="choice-card" key={key} onClick={() => { updateProfile({ path: key, pathTitle: title }); go('signup'); }}><Icon size={28}/><h3>{title}</h3><p>{text}</p></button>)}</div>
  </PageShell>;
}

function Signup({ profile, updateProfile }) {
  const [form, setForm] = useState({ firstName: profile?.firstName || '', email: profile?.email || '', password: '' });
  return <PageShell kicker="Create My Root System" title="Tell me a little about yourself." lead="Just enough to personalize the experience. Sage does not need your whole financial life on day one.">
    <form className="signup-card" onSubmit={(e) => { e.preventDefault(); updateProfile({ firstName: form.firstName, email: form.email }); go('assessment'); }}>
      <label>First Name<input required value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}/></label>
      <label>Email Address<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/></label>
      <label>Password<input type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}/></label>
      <label className="check-row"><input type="checkbox"/> Keep me signed in</label>
      <button>Create My Root System <ArrowRight size={17}/></button>
    </form>
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
  if (path === 'business') score += 4;
  if (normalize(answers.rootInterests).length > 2) score += 3;
  return Math.min(96, Math.max(28, score));
}

function inferRoots(answers, path) {
  const selected = new Set([path].filter(Boolean));
  const buckets = {
    literacy: ['Financial literacy foundation', 'Not knowing where to begin', "I'm not sure yet", "I'm not sure"],
    credit: ['Credit', 'Credit cards', 'credit'],
    debt: ['Debt', 'Collections', 'Medical debt', 'Student loans', 'Debt payoff methods'],
    investing: ['Investing', 'Stocks', 'ETFs or index funds', 'Retirement accounts', 'Real estate'],
    business: ['Business', 'Business stability', 'Starting or growing a business', 'Business credit or funding'],
    family: ['Family matters', 'My children or family', 'Teaching my children', 'Family legacy planning'],
    educators: ['Educators or classroom', 'Classroom or school curriculum'],
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
  return <Grove profile={profile} go={go} />;
}

function Learn() {
  const [active, setActive] = useState(roots[0].key);
  const root = roots.find((r) => r.key === active) || roots[0];
  const Icon = root.icon;
  return <PageShell kicker="Learn" title="The Seven Roots of Financial Wisdom" lead="This is the curriculum foundation. Each root becomes a full branch of lessons, tools, and Sage-guided understanding.">
    <div className="root-layout">
      <div className="root-list">{roots.map((r) => { const RIcon = r.icon; return <button key={r.key} className={active === r.key ? 'active' : ''} onClick={() => setActive(r.key)}><RIcon size={20}/><span>{r.title}</span></button>; })}</div>
      <article className="root-detail">
        <div className="root-detail-head"><Icon size={34}/><div><h2>{root.title}</h2><p>{root.short}</p></div></div>
        <div className="principle-box"><strong>Who this serves:</strong> {root.audience}</div>
        <p className="root-promise"><strong>Sage's promise:</strong> {root.promise}</p>
        <h3>Concepts inside this root</h3>
        <div className="topic-cloud">{root.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
        <h3>Free starter lessons</h3>
        <div className="free-lesson-row">{root.free.map((lesson) => <div key={lesson} className="free-lesson"><BookOpen size={18}/><span>{lesson}</span></div>)}</div>
        {root.key === 'literacy'
          ? <div className="root-open-routes"><button type="button" className="root-enter-button" onClick={() => go('roots/one')}>Enter Root One: The City of Foundations <ArrowRight size={17}/></button><button type="button" className="root-enter-button root-three-enter" onClick={() => go('roots/three')}>Enter Root Three: Choice, Cash Flow &amp; Spending <ArrowRight size={17}/></button></div>
          : <div className="premium-preview"><Lock size={18}/><span>This path is still taking shape. Root One is the current teaching experience.</span></div>}
      </article>
    </div>
  </PageShell>;
}

function Tools() {
  const tools = ['Budget Builder', 'Debt Snowball', 'Credit Readiness', 'Emergency Fund Planner', 'Business Fundability Tracker', 'Goal Planner'];
  return <PageShell kicker="Tools" title="Useful tools, not noisy widgets." lead="Each tool will help users make one clearer decision. For this sprint, these are wired placeholders ready for buildout.">
    <div className="card-grid lessons">{tools.map(t => <article className="image-card" key={t}><Calculator/><h3>{t}</h3><p>Coming next: interactive calculator and saved results.</p></article>)}</div>
  </PageShell>;
}

function Schools() {
  return <PageShell kicker="Educators Branch" title="Bring Root$Wise to the classroom." lead="Educators are a separate branch because teaching others has different needs than learning for yourself.">
    <div className="split"><div className="school-card"><GraduationCap size={32}/><h3>School Curriculum Preview</h3><p>K–12 financial wisdom with age-appropriate language, Penny for younger learners, and Sage for older students.</p><button>Request Pilot Preview</button></div><div className="school-card"><Users size={32}/><h3>Parent + Home Study</h3><p>For families who want to talk about money at home without shame, fear, or confusion.</p><button>Join Family Preview</button></div></div>
  </PageShell>;
}

function MyJourney({ profile }) {
  return <PageShell kicker="My Journey" title="Your Root$Wise profile starts here." lead="This replaces a generic profile with a living record of the person the user is becoming.">
    <div className="profile-card"><h3>{profile?.firstName || 'Your'} Root System</h3><p><strong>Path:</strong> {profile?.pathTitle || 'Not selected yet'}</p><p><strong>Assessment:</strong> {profile?.completedAssessment ? 'Complete' : 'Not complete'}</p><p><strong>Root Score:</strong> {profile?.rootScore || 'Pending'}</p><button onClick={() => go('journey')}>Update My Path</button></div>
  </PageShell>;
}

createRoot(document.getElementById('root')).render(<App />);
