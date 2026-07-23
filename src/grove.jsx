import {
  ArrowRight,
  BookOpen,
  Check,
  HeartHandshake,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Sprout,
  Trees,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import './grove.css';

const groveRoutes = [
  { key: 'literacy', number: '01', label: 'Foundations', description: 'Learn the language beneath every money decision.', ready: true },
  { key: 'value', number: '02', label: 'Value & Earning', description: 'Understand work, income, value, and opportunity.', ready: true },
  { key: 'choice', number: '03', label: 'Choice, Cash Flow & Spending', description: 'Practice spending, tradeoffs, and conscious choice.', ready: true },
  { key: 'investing', number: '04', label: 'Investing', description: 'Explore growth, time, and risk.', ready: false },
  { key: 'business', number: '05', label: 'Business', description: 'Build value beyond a paycheck.', ready: false },
  { key: 'family', number: '06', label: 'Family', description: 'Grow wisdom across relationships and generations.', ready: false },
  { key: 'educators', number: '07', label: 'Educators', description: 'Help financial wisdom take root in others.', ready: false },
];

const principles = [
  'Knowledge before judgment.',
  'Options before instructions.',
  'Understanding before action.',
  'No shame, fear, or false urgency.',
  'Money is a tool—not a measure of human worth.',
  'The learner remains the author of their life.',
];

function enterRoot(route, go) {
  if (route.key === 'value') go('roots/two');
  else if (route.key === 'choice') go('roots/three');
  else go('roots/one');
}

export default function Grove({ profile, go }) {
  const name = profile?.firstName || 'friend';

  return (
    <main className="grove-page">
      <header className="grove-header">
        <button type="button" onClick={() => go('home')} className="grove-brand" aria-label="RootWise home">
          <ApprovedArtwork variant="tree" />
          <span><strong>Root$Wise</strong><small>The Grove</small></span>
        </button>
        <nav aria-label="Grove navigation">
          <a href="#roots">Explore roots</a>
          <a href="#principles">Our principles</a>
          <a href="#why-paid">Why subscriptions</a>
        </nav>
        <button type="button" onClick={() => go('my-journey')} className="grove-profile">My journey</button>
      </header>

      <section className="grove-welcome" aria-labelledby="grove-title">
        <div className="grove-forest" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => <span key={index}><Trees /></span>)}
        </div>
        <div className="grove-sage-arrival">
          <img src="/rootwise-sage.webp" alt="Sage, the RootWise guide, walking into the Grove" />
          <div className="grove-sage-shadow" />
        </div>
        <div className="grove-welcome-copy">
          <p className="grove-eyebrow"><Sparkles size={15} /> Sage welcomes you</p>
          <h1 id="grove-title">Welcome to the Grove, {name}.</h1>
          <blockquote>
            <p>&ldquo;Every tree you see represents another person learning, questioning, and growing. No two trees take the same shape, because no two lives begin in the same soil.</p>
            <p>RootWise exists for one purpose: to level the financial playing field with knowledge of financial concepts, a deeper understanding of the relationship you have with money, and&mdash;most importantly&mdash;the ability to grow beyond the script you never wrote.</p>
            <p>Financial freedom is having options. Money is simply a tool we use to exchange value. RootWise exists to help fill the gap between living a life that gets chosen for you and becoming the person you choose to be. Our roots are planted in ideas. The fruit of understanding is wisdom.&rdquo;</p>
          </blockquote>
          <p>
            The Grove is a visual picture of many learners growing side by side, not a live community roster. The tree you are planting is your own: one root, one lesson, and one reclaimed choice at a time.
          </p>
          <div className="grove-welcome-actions">
            <button type="button" onClick={() => document.querySelector('#roots')?.scrollIntoView({ behavior: 'smooth' })}>
              Plant your next root <ArrowRight size={17} />
            </button>
            <a href="#mission">Why RootWise exists</a>
          </div>
        </div>
      </section>

      <section className="grove-mission" id="mission" aria-labelledby="mission-title">
        <div className="grove-section-label"><Sprout size={17} /> Our purpose</div>
        <h2 id="mission-title">Financial freedom is having options.</h2>
        <p className="grove-mission-lead">
          RootWise exists for one purpose: to level the financial playing field through knowledge of financial concepts, a deeper understanding of the relationship we have with money, and—most importantly—the ability to grow beyond the script we never wrote.
        </p>
        <div className="grove-belief-grid">
          <article>
            <span>01</span>
            <h3>Money is a tool</h3>
            <p>Money is something we use to exchange value. It can create access and choices, but it does not define intelligence, dignity, character, or worth.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Knowledge creates options</h3>
            <p>Understanding the system makes more paths visible. RootWise teaches the map so each person can decide which road fits their life.</p>
          </article>
          <article>
            <span>03</span>
            <h3>You choose who you become</h3>
            <p>We work to fill the gap between living a life that gets chosen for you and becoming the person you choose to be.</p>
          </article>
        </div>
      </section>

      <section className="grove-roots" id="roots" aria-labelledby="roots-title">
        <div className="grove-roots-heading">
          <div>
            <div className="grove-section-label"><Trees size={17} /> Your growing tree</div>
            <h2 id="roots-title">Choose the root you want to strengthen.</h2>
          </div>
          <p>There is no single correct order. Begin where understanding would give you the most useful options today.</p>
        </div>
        <div className="grove-root-system">
          <div className="grove-personal-tree">
            <ApprovedArtwork variant="tree" />
            <div><strong>{profile?.firstName ? `${profile.firstName}’s tree` : 'Your tree'}</strong><span>Growing one lesson at a time</span></div>
          </div>
          <div className="grove-route-grid">
            {groveRoutes.map((route) => (
              <button
                type="button"
                className={route.ready ? 'grove-route is-ready' : 'grove-route'}
                onClick={() => route.ready && enterRoot(route, go)}
                disabled={!route.ready}
                key={route.key}
              >
                <span>{route.number}</span>
                <div><strong>{route.label}</strong><small>{route.description}</small></div>
                {route.ready ? <ArrowRight size={17} /> : <LockKeyhole size={15} />}
              </button>
            ))}
          </div>
        </div>
        <p className="grove-progress-note">Roots One, Two, and Three are open. Lesson progress is saved on this device.</p>
      </section>

      <section className="grove-principles" id="principles" aria-labelledby="principles-title">
        <div className="grove-principles-copy">
          <div className="grove-section-label"><BookOpen size={17} /> The RootWise principles</div>
          <h2 id="principles-title">The roots beneath everything we teach.</h2>
          <p>
            These principles are our working Bible. They protect the learner’s agency and keep every lesson focused on clarity, dignity, context, and choice.
          </p>
        </div>
        <div className="grove-principle-list">
          {principles.map((principle) => <div key={principle}><Check size={16} /><span>{principle}</span></div>)}
        </div>
      </section>

      <section className="grove-trust" id="why-paid" aria-labelledby="trust-title">
        <div className="grove-section-label"><ShieldCheck size={17} /> How we sustain the work</div>
        <h2 id="trust-title">Paid by learners. Never steered by advertisers.</h2>
        <div className="grove-trust-grid">
          <article>
            <HeartHandshake size={25} />
            <h3>Why RootWise has paid subscriptions</h3>
            <p>
              Thoughtful curriculum, accessible tools, private progress, and responsible guidance take people and resources to build. Subscriptions allow RootWise to serve the learner—not a sponsor—and to keep improving the education itself.
            </p>
          </article>
          <article className="grove-no-ads">
            <ShieldCheck size={25} />
            <h3>Our permanent no-ads promise</h3>
            <p>
              RootWise will never sell attention, endorse financial products for payment, or fill lessons with advertising. Financial education should not quietly become a sales funnel. Your learning will never be shaped by who paid to be placed in front of you.
            </p>
          </article>
        </div>
      </section>

      <footer className="grove-footer">
        <ApprovedArtwork variant="tree" />
        <p><strong>Our roots are planted in ideas.</strong><span>The fruit of understanding is wisdom. The freedom it creates is choice.</span></p>
        <button type="button" onClick={() => go('roots/one')}>Begin with Root One <ArrowRight size={16} /></button>
      </footer>
    </main>
  );
}
