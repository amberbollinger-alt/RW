import { ArrowRight, LockKeyhole, Sprout } from 'lucide-react';
import { rootOneIntroduction, rootOneRootsData as rootOneLessons } from './root-one-roots-data';
import { rootTwoDistricts } from './root-two-data';
import { rootThreeDistricts } from './root-three-data';
import { rootFourChapters } from './root-four-data';
import './grove.css';

const groveRoutes = [
  { key: 'literacy', number: '01', label: 'The Story Beneath the Decision', description: 'Recognize what is influencing a financial choice while a choice is still available.', ready: true },
  { key: 'value', number: '02', label: 'Value & Earning', description: 'Understand work, income, value, and opportunity.', ready: true },
  { key: 'choice', number: '03', label: 'Choice, Cash Flow & Spending', description: 'Practice spending, tradeoffs, and conscious choice.', ready: true },
  { key: 'preparedness', number: '04', label: 'Preparedness, Protection & Future Choice', description: 'Use today’s money to protect tomorrow’s freedom.', ready: true },
  { key: 'business', number: '05', label: 'Business', description: 'Build value beyond a paycheck.', ready: false },
  { key: 'family', number: '06', label: 'Family', description: 'Grow wisdom across relationships and generations.', ready: false },
  { key: 'educators', number: '07', label: 'Educators', description: 'Help financial wisdom take root in others.', ready: false },
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
  const rootOneKeys = new Set(rootOneLessons.map((item) => item.key));
  const rootTwoKeys = new Set(rootTwoDistricts.flatMap((district) => district.lessons.map((item) => item.progressKey)));
  const rootThreeKeys = new Set(rootThreeDistricts.map((district) => district.key));
  const rootFourKeys = new Set(rootFourChapters.map((chapter) => chapter.key));
  return [
    safeCompleted('rootwise_root_one_city_progress', rootOneKeys) === rootOneKeys.size,
    safeCompleted('rootwise_root_two_journey_v3', rootTwoKeys) === rootTwoKeys.size,
    safeCompleted('rootwise_root_three_city_progress_v1', rootThreeKeys) === rootThreeKeys.size,
    safeCompleted('rootwise_root_four_reservoir_progress_v1', rootFourKeys) === rootFourKeys.size,
  ].filter(Boolean).length;
}

function enterRoot(key, go) {
  if (key === 'value') go('roots/two');
  else if (key === 'choice') go('roots/three');
  else if (key === 'preparedness') go('roots/four');
  else go('roots/one');
}

function GroveHeader({ go, label, action }) {
  return (
    <header className="grove-header">
      <button type="button" onClick={() => go('home')} className="grove-brand" aria-label="RootWise home">
        <Sprout /><span><strong>Root$Wise</strong><small>{label}</small></span>
      </button>
      <p>{label === 'The Grove' ? 'Before We Enter the City' : 'Your learning journey'}</p>
      <button type="button" onClick={action.onClick}>{action.label}</button>
    </header>
  );
}

function UserGrove({ profile, go }) {
  const completedRoots = readRootProgress();
  const name = profile?.firstName;
  return (
    <main className="grove-page grove-user-page">
      <GroveHeader go={go} label="Your Grove" action={{ label: 'The Heart of Root$Wise', onClick: () => go('heart') }} />
      <section className="user-grove-hero" aria-labelledby="user-grove-title">
        <img className="user-grove-photo" src="/grove-sunrise-valley.jpg" alt="" />
        <div className="user-grove-shade" />
        <div className="user-grove-heading"><p>Your learning journey</p><h1 id="user-grove-title">{name ? `${name}’s Grove` : 'Your Grove'}</h1><span>Understanding grows one Root at a time.</span></div>
        <div className="user-grove-progress" aria-label={`${completedRoots} of 4 open Roots completed`}><strong>{completedRoots}</strong><span>of 4 open Roots completed</span><small>Progress is saved on this device.</small></div>
      </section>
      <section className="grove-root-paths" aria-labelledby="root-paths-title">
        <div className="grove-path-heading"><p>The Seven Roots</p><h2 id="root-paths-title">Choose the Root you want to strengthen.</h2><span>Roots One through Four are open. The remaining Roots will grow here as they become available.</span></div>
        <div className="grove-route-grid">
          {groveRoutes.map((route) => route.ready ? (
            <button type="button" className="grove-route is-ready" onClick={() => enterRoot(route.key, go)} key={route.key}>
              <span>{route.number}</span><div><strong>{route.label}</strong><small>{route.description}</small></div><ArrowRight />
            </button>
          ) : (
            <article className="grove-route" aria-label={`${route.label} is not yet available`} key={route.key}>
              <span>{route.number}</span><div><strong>{route.label}</strong><small>{route.description}</small></div><LockKeyhole />
            </article>
          ))}
        </div>
      </section>
      <footer className="grove-footer"><p><strong>{name ? `${name}, your roots are planted in ideas.` : 'Your roots are planted in ideas.'}</strong><span>Our purpose is understanding. Our goal is choice.</span></p></footer>
    </main>
  );
}

function WelcomeGrove({ go }) {
  return (
    <main className="grove-page">
      <GroveHeader go={go} label="The Grove" action={{ label: 'My journey', onClick: () => go('my-journey') }} />
      <section className="grove-photo-hero" aria-labelledby="grove-title">
        <img className="grove-valley-photo" src="/grove-sunrise-valley.jpg" alt="" />
        <div className="grove-photo-shade" />
        <img className="grove-sage" src="/rootwise-sage-cutout.png" alt="Sage, your RootWise guide, standing at the valley overlook" />
        <div className="grove-welcome-copy"><p>{rootOneIntroduction.eyebrow}</p><h1 id="grove-title">{rootOneIntroduction.question}</h1><div className="grove-welcome-lines"><p>Root One begins by looking beneath the numbers—at the person making the decision.</p></div></div>
      </section>
      <section className="grove-root-one-intro" aria-labelledby="grove-root-one-title">
        <div className="grove-root-one-copy">
          <p className="grove-intro-label">Sage</p>
          <h2 id="grove-root-one-title">{rootOneIntroduction.title}</h2>
          {rootOneIntroduction.sage.map((paragraph, index) => <p className={paragraph === rootOneIntroduction.question ? 'grove-intro-question' : ''} key={`${paragraph}-${index}`}>{paragraph}</p>)}
        </div>
        <div className="grove-method-grid" aria-label="The RootWise learning method">
          {rootOneIntroduction.method.map((level, index) => <article key={level.title}><span>0{index + 1}</span><small>{level.question}</small><h3>{level.title}</h3><p>{level.body}</p></article>)}
        </div>
        <blockquote>{rootOneIntroduction.principle}</blockquote>
      </section>
      <section className="grove-enter" aria-labelledby="enter-grove-title"><p>Your tree begins today.</p><h2 id="enter-grove-title">Whenever you’re ready, enter your Grove.</h2><span>Your saved progress and the Seven Roots are waiting on the next page.</span><button type="button" onClick={() => go('dashboard')}>Enter your Grove <ArrowRight /></button></section>
      <footer className="grove-footer"><p><strong>Your roots are planted in ideas.</strong><span>Our purpose is understanding. Our goal is choice.</span></p></footer>
    </main>
  );
}

export default function Grove({ profile, go, view = 'welcome' }) {
  return view === 'user' ? <UserGrove profile={profile} go={go} /> : <WelcomeGrove go={go} />;
}
