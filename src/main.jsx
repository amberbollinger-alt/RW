import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, BookOpen, BriefcaseBusiness, Calculator, CheckCircle2, ChevronLeft,
  GraduationCap, Heart, Leaf, Lock, Mail, Menu, PiggyBank,
  ShieldCheck, Sparkles, Sprout, Target, TreePine, Trophy, User, Users, X,
  CreditCard, Landmark, TrendingUp, HomeIcon, School, WalletCards
} from 'lucide-react';
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
function go(page) { window.scrollTo({ top: 0, behavior: 'smooth' }); window.history.replaceState(null, '', `#/${page}`); window.dispatchEvent(new HashChangeEvent('hashchange')); }
function routeFromHash() { const raw = window.location.hash.replace('#/', ''); return raw || 'home'; }
function normalize(value) { return Array.isArray(value) ? value : value ? [value] : []; }

function App() {
  const [route, setRoute] = useState(routeFromHash());
  const [profile, setProfile] = useState(loadProfile());
  React.useEffect(() => { const onHash = () => setRoute(routeFromHash()); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash); }, []);
  const updateProfile = (next) => { const merged = { ...(profile || {}), ...next }; setProfile(merged); saveProfile(merged); };
  return (
    <>
      {route === 'home' && <Home profile={profile} />}
      {route === 'journey' && <Journey profile={profile} updateProfile={updateProfile} />}
      {route === 'signup' && <Signup profile={profile} updateProfile={updateProfile} />}
      {route === 'assessment' && <AssessmentFlow profile={profile} updateProfile={updateProfile} />}
      {route === 'dashboard' && <Dashboard profile={profile} />}
      {route === 'learn' && <Learn profile={profile} />}
      {route === 'tools' && <Tools />}
      {route === 'schools' && <Schools />}
      {route === 'my-journey' && <MyJourney profile={profile} />}
      <StickyNav />
    </>
  );
}

function StickyNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="mobile-menu" onClick={() => setOpen(true)}><Menu size={22}/></button>
      <div className={`drawer ${open ? 'show' : ''}`}>
        <button className="drawer-close" onClick={() => setOpen(false)}><X size={22}/></button>
        {navItems.map(([label, page]) => <button key={page} onClick={() => { setOpen(false); go(page === 'journey' ? 'my-journey' : page); }}>{label}</button>)}
        <button className="drawer-sign" onClick={() => { setOpen(false); go('signup'); }}><User size={18}/> Sign In</button>
      </div>
    </>
  );
}

function Home() {
  return (
    <main>
      <section className="approved-hero" aria-label="RootWise approved landing page">
        <img src="/rootwise-approved-home.png" alt="RootWise homepage with Sage, money-paper background, rooted tree logo, books, assessment invitation, and green vintage design." />
        <button className="hot nav-dashboard" onClick={() => go('dashboard')} aria-label="Dashboard"></button>
        <button className="hot nav-learn" onClick={() => go('learn')} aria-label="Learn"></button>
        <button className="hot nav-tools" onClick={() => go('tools')} aria-label="Tools"></button>
        <button className="hot nav-about" onClick={() => go('journey')} aria-label="About"></button>
        <button className="hot nav-support" onClick={() => go('schools')} aria-label="Support"></button>
        <button className="hot nav-profile" onClick={() => go('my-journey')} aria-label="Profile"></button>
        <button className="hot nav-signin" onClick={() => go('signup')} aria-label="Sign in"></button>
        <button className="hot cta-main" onClick={() => go('journey')} aria-label="Begin your journey"></button>
        <button className="hot cta-journey" onClick={() => go('journey')} aria-label="Start your journey"></button>
        <button className="hot cta-footer" onClick={() => go('journey')} aria-label="Begin free assessment"></button>
        <button className="hot card-learn" onClick={() => go('learn')} aria-label="Explore lessons"></button>
        <button className="hot card-tools" onClick={() => go('tools')} aria-label="Use tools"></button>
        <button className="hot card-support" onClick={() => go('schools')} aria-label="School preview"></button>
        <button className="hot card-about" onClick={() => go('my-journey')} aria-label="My journey"></button>
      </section>
      <section className="paper-section locked-note">
        <div className="section-shell split">
          <div>
            <div className="section-kicker"><Sparkles size={16}/> The Seven Roots are live</div>
            <h2>Root$Wise now has its curriculum architecture.</h2>
            <p className="lead">Financial Literacy, Credit, Debt, Investing, Business, Family Matters, and Educators now shape the journey, the assessment, and the learning center.</p>
          </div>
          <div className="sage-card"><h3>Sage says:</h3><p>“I won’t assume where you are. I’ll listen first, then help you understand your options.”</p><button onClick={() => go('learn')}>Explore the Roots <ArrowRight size={16}/></button></div>
        </div>
      </section>
      <Footer />
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
  return <header className="topbar"><button className="wordmark" onClick={() => go('home')}><TreePine size={25}/><span>Root$Wise</span></button><nav>{navItems.map(([label, page]) => <button key={page} onClick={() => go(page === 'journey' ? 'my-journey' : page)}>{label}</button>)}</nav><button className="signin" onClick={() => go('signup')}>Sign In</button></header>;
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
    <form className="signup-card" onSubmit={(e) => { e.preventDefault(); updateProfile(form); go('assessment'); }}>
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
  const name = profile?.firstName || 'Friend';
  const score = profile?.rootScore || 62;
  const suggested = profile?.suggestedRoots?.length ? profile.suggestedRoots : [profile?.path || 'literacy', 'credit', 'debt'];
  const suggestedRoots = suggested.map((key) => roots.find((r) => r.key === key)).filter(Boolean);
  return <PageShell kicker="My Root System" title={`Good to see you, ${name}.`} lead="This dashboard now reflects the seven-root curriculum architecture." back={false}>
    <div className="dashboard-grid">
      <div className="dash-card wide"><h3>Sage</h3><p>I listened for what you said and what your answers suggested. These are not instructions. They are starting points we can explore together.</p><div className="mood-row"><button>🙂 Confident</button><button>😐 Okay</button><button>😟 Stressed</button><button>😔 Overwhelmed</button></div></div>
      <div className="dash-card score"><div className="score-ring"><span>{score}</span></div><h3>Root Score</h3><p>Starter preview</p></div>
      <div className="dash-card wide"><h3>Your suggested roots</h3><div className="mini-root-list">{suggestedRoots.map((r) => <button key={r.key} onClick={() => go('learn')}><r.icon size={18}/>{r.title}</button>)}</div></div>
      <div className="dash-card"><h3>Today’s Lesson</h3><p>Financial wisdom starts with understanding options, not obeying instructions.</p><button onClick={() => go('learn')}>Start Lesson</button></div>
      <div className="dash-card"><h3>Today’s Action</h3><p>Write down the one money question you’ve been avoiding.</p><button>Mark Complete</button></div>
    </div>
  </PageShell>;
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
        <div className="premium-preview"><Lock size={18}/><span>Full branch coming soon: guided lessons, worksheets, quizzes, calculators, and Sage conversations.</span></div>
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

function Footer() { return <footer className="site-footer"><div className="legal"><span>© 2026 Root$Wise</span><span>Privacy</span><span>Terms</span><span>Contact</span></div></footer>; }

createRoot(document.getElementById('root')).render(<App />);
