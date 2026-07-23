import { ArrowRight, LockKeyhole, Sprout } from 'lucide-react';
import { rootOneDistricts } from './root-one-data';
import { rootTwoDistricts } from './root-two-data';
import { rootThreeDistricts } from './root-three-data';
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

const groveStatement = [
  {
    heading: 'Why Root$Wise Exists',
    paragraphs: [
      'Most people were expected to understand money long before anyone taught them how it works.',
      "That isn't a personal failure. It is an educational gap.",
      'Root$Wise exists to close that gap.',
      'Not by giving answers to memorize.',
      'By building understanding that lasts.',
      'Because knowledge can be forgotten.',
      'Understanding becomes part of how you think.',
    ],
  },
  {
    heading: 'What We Believe',
    paragraphs: ['Money is important.', 'It pays bills.', 'Creates opportunities.', 'Removes barriers.', 'Supports families.', 'Builds communities.', 'But money has never been the destination.', 'Money is a tool.', 'The destination is choice.'],
  },
  {
    heading: 'What Financial Freedom Really Means',
    paragraphs: ['Financial freedom is not a number.', 'Financial freedom is options.', 'The option to stay.', 'The option to leave.', 'The option to build.', 'The option to recover.', 'The option to help.', 'The option to begin again.', 'Money simply expands those options.'],
  },
  {
    heading: 'The Script You Never Wrote',
    paragraphs: ['Every person inherits a financial story.', 'Some inherit confidence.', 'Some inherit fear.', 'Some inherit scarcity.', 'Some inherit abundance.', 'Most inherit beliefs they never chose.', 'Root$Wise cannot change your past.', 'It can help you examine it.', 'Understanding your story is the first step toward writing the next chapter yourself.'],
  },
  {
    heading: 'Our Promise',
    paragraphs: ['Root$Wise will never tell you what to buy.', 'We will never tell you what to invest in.', 'We will never tell you what decision is "right."', 'Those decisions belong to you.', 'Our responsibility is different.', 'We explain principles.', 'We explore consequences.', 'We compare possibilities.', 'We ask better questions.', 'Because independent thinking is more valuable than borrowed opinions.'],
  },
  {
    heading: 'Why There Are No Advertisements',
    paragraphs: ['Attention is valuable.', 'Trust is even more valuable.', 'Advertising creates competing interests.', 'Root$Wise was built to serve one audience:', 'The learner.', 'We do not sell attention.', 'We do not sell influence.', 'We do not accept payment to recommend financial products or shape educational content.', 'If a concept belongs here, it belongs because it helps you understand the world—not because someone paid for the space.'],
  },
  {
    heading: 'Why We Never Endorse Financial Products',
    paragraphs: ['Every financial decision depends on the person making it.', 'Their goals.', 'Their circumstances.', 'Their values.', 'One answer cannot fit every life.', 'Root$Wise teaches frameworks, not prescriptions.', 'The decision will always remain yours.'],
  },
  {
    heading: 'Why Premium Exists',
    paragraphs: ['Education has a cost.', 'Servers.', 'Development.', 'Research.', 'Writers.', 'Designers.', 'Teachers.', 'Accessibility.', 'Security.', 'Premium allows Root$Wise to be supported by the people it serves instead of advertisers, sponsors, or paid influence.', 'That independence protects the integrity of everything you learn here.'],
  },
  {
    heading: 'The Seven Roots',
    paragraphs: ['Wisdom does not grow all at once.', 'It grows one root at a time.', 'Each Root strengthens the next.', 'Each lesson builds on the one before it.', 'Not to create experts.', 'To create understanding.', 'Because strong trees are not built from taller branches.', 'They are built from deeper roots.'],
  },
  {
    heading: 'Our Standard',
    paragraphs: ['Every lesson should answer three questions.', 'What is this?', 'Why does it matter?', 'How does it change the choices available to me?', 'If it cannot answer all three, it is not finished.'],
  },
  {
    heading: 'The Measure of Success',
    paragraphs: ['Success is not measured by how much someone earns.', 'It is measured by how clearly they understand the decisions in front of them.', 'Knowledge creates confidence.', 'Confidence creates better choices.', 'Better choices create more options.', 'That is the growth we measure.'],
  },
  {
    heading: 'Our Mission',
    paragraphs: ['Root$Wise exists to level the financial playing field through understanding.', 'To teach financial concepts without fear.', 'To encourage independent thinking without influence.', 'To replace confusion with clarity.', 'To replace helplessness with possibility.', 'To help people grow beyond the script they never wrote.'],
  },
  {
    heading: 'The Heart of Root$Wise',
    paragraphs: ['Our roots are planted in ideas.', 'Our purpose is understanding.', 'Our measure is wisdom.', 'Our promise is independence.', 'Our goal is choice.', 'Welcome to the Grove.', "Let's plant your tree."],
  },
];

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
  return [
    safeCompleted('rootwise_root_one_city_progress', rootOneKeys) === rootOneKeys.size,
    safeCompleted('rootwise_root_two_journey_v3', rootTwoKeys) === rootTwoKeys.size,
    safeCompleted('rootwise_root_three_city_progress_v1', rootThreeKeys) === rootThreeKeys.size,
  ].filter(Boolean).length;
}

function enterRoot(route, go) {
  if (route.key === 'value') go('roots/two');
  else if (route.key === 'choice') go('roots/three');
  else go('roots/one');
}

export default function Grove({ profile, go, view = 'welcome' }) {
  const completedRoots = readRootProgress();
  const name = profile?.firstName;

  if (view === 'user') {
    return (
      <main className="grove-page grove-user-page">
        <header className="grove-header">
          <button type="button" onClick={() => go('home')} className="grove-brand" aria-label="RootWise home">
            <Sprout /><span><strong>Root$Wise</strong><small>Your Grove</small></span>
          </button>
          <p>{name ? `${name}’s Grove` : 'Your Grove'}</p>
          <button type="button" onClick={() => go('heart')}>The Heart of Root$Wise</button>
        </header>

        <section className="user-grove-hero" aria-labelledby="user-grove-title">
          <img className="user-grove-photo" src="/grove-sunrise-valley.jpg" alt="" />
          <div className="user-grove-shade" />
          <div className="user-grove-heading">
            <p>Your learning journey</p>
            <h1 id="user-grove-title">{name ? `${name}’s Grove` : 'Your Grove'}</h1>
            <span>Understanding grows one Root at a time.</span>
          </div>
          <div className="user-grove-progress" aria-label={`${completedRoots} of 3 open Roots completed`}>
            <strong>{completedRoots}</strong><span>of 3 open Roots completed</span><small>Progress is saved on this device.</small>
          </div>
        </section>

        <section className="grove-root-paths" aria-labelledby="root-paths-title">
          <div className="grove-path-heading">
            <p>The Seven Roots</p>
            <h2 id="root-paths-title">Choose the Root you want to strengthen.</h2>
            <span>Roots One, Two, and Three are open. The remaining Roots will grow here as they become available.</span>
          </div>
          <div className="grove-route-grid">
            {groveRoutes.map((route) => (
              <button type="button" className={route.ready ? 'grove-route is-ready' : 'grove-route'} onClick={() => route.ready && enterRoot(route, go)} disabled={!route.ready} key={route.key}>
                <span>{route.number}</span>
                <div><strong>{route.label}</strong><small>{route.description}</small></div>
                {route.ready ? <ArrowRight /> : <LockKeyhole />}
              </button>
            ))}
          </div>
        </section>

        <footer className="grove-footer">
          <p><strong>{name ? `${name}, your roots are planted in ideas.` : 'Your roots are planted in ideas.'}</strong><span>Our purpose is understanding. Our goal is choice.</span></p>
          <button type="button" onClick={() => go('roots/one')}>Begin with Root One <ArrowRight /></button>
        </footer>
      </main>
    );
  }

  return (
    <main className="grove-page">
      <header className="grove-header">
        <button type="button" onClick={() => go('home')} className="grove-brand" aria-label="RootWise home">
          <Sprout /><span><strong>Root$Wise</strong><small>The Grove</small></span>
        </button>
        <p>The Heart of Root$Wise</p>
        <button type="button" onClick={() => go('my-journey')}>My journey</button>
      </header>

      <section className="grove-photo-hero" aria-labelledby="grove-title">
        <img className="grove-valley-photo" src="/grove-sunrise-valley.jpg" alt="" />
        <div className="grove-photo-shade" />
        <img className="grove-sage" src="/rootwise-sage-cutout.png" alt="Sage, your RootWise guide, standing at the valley overlook" />
        <div className="grove-welcome-copy">
          <p>The Heart of Root$Wise</p>
          <h1 id="grove-title">Welcome to the Grove</h1>
          <div className="grove-welcome-lines">
            <p>Every tree begins as a seed.</p>
            <p>The Grove is a reminder that growth is never instant, never identical, and never finished. Every tree represents a journey. Every journey begins with a choice.</p>
            <p>Your tree begins today.</p>
            <p>It will not grow because time passes.</p>
            <p>It will grow because understanding does.</p>
          </div>
          <a href="#heart-statement">Continue <ArrowRight /></a>
        </div>
      </section>

      <section className="grove-statement" id="heart-statement" aria-label="The Heart of RootWise">
        <div className="grove-statement-column">
          {groveStatement.map((section) => (
            <article key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => <p key={`${section.heading}-${index}`}>{paragraph}</p>)}
            </article>
          ))}
        </div>
      </section>

      <section className="grove-enter" aria-labelledby="enter-grove-title">
        <p>Your tree begins today.</p>
        <h2 id="enter-grove-title">Whenever you’re ready, enter your Grove.</h2>
        <span>Your saved progress and the Seven Roots are waiting on the next page.</span>
        <button type="button" onClick={() => go('dashboard')}>Enter your Grove <ArrowRight /></button>
      </section>

      <footer className="grove-footer">
        <p><strong>{name ? `${name}, your roots are planted in ideas.` : 'Your roots are planted in ideas.'}</strong><span>Our purpose is understanding. Our goal is choice.</span></p>
        <button type="button" onClick={() => go('roots/one')}>Begin with Root One <ArrowRight /></button>
      </footer>
    </main>
  );
}
