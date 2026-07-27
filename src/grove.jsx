import { ArrowRight, BookOpen, Check, Construction, Sprout } from 'lucide-react';
import { useMemo } from 'react';
import { ApprovedArtwork } from './approved-artwork';
import { rootOneIntroduction } from './root-one-roots-data';
import {
  findJourneyContinuation, readGroveProgress, ROOT_GROUPS, rootActionForProgress,
} from './root-registry';
import './grove.css';

function GroveHeader({ label, action }) {
  return (
    <header className="grove-header">
      <a href="/" className="grove-brand" aria-label="RootWise home">
        <Sprout /><span><strong>Root$Wise</strong><small>{label}</small></span>
      </a>
      <p>{label === 'The Grove' ? 'Before We Enter the City' : 'Your learning journey'}</p>
      <a href={action.href}>{action.label}</a>
    </header>
  );
}

function RootCard({ root, progress }) {
  const action = rootActionForProgress(root, progress);
  const available = root.status === 'published' && root.lessonCount > 0;
  const accentStyle = /** @type {import('react').CSSProperties & Record<'--root-accent', string>} */ ({ '--root-accent': root.accent });
  return (
    <article className={`grove-root-card ${available ? 'is-published' : 'is-developing'}`} style={accentStyle}>
      <div className="grove-root-sequence" aria-hidden="true"><span>{String(root.id).padStart(2, '0')}</span><i /></div>
      <div className="grove-root-card-body">
        <header><p>{root.label}</p><span>{available ? progress.status : 'In development'}</span></header>
        <h3><a href={root.overviewRoute}>{root.displayTitle}</a></h3>
        <strong>{root.purpose}</strong>
        <p>{root.description}</p>
        <div className="grove-root-meta">
          {available ? <><span>{progress.completedCount} of {progress.totalCount} lessons complete</span><div role="progressbar" aria-label={`${root.label} progress`} aria-valuemin={0} aria-valuemax={progress.totalCount} aria-valuenow={progress.completedCount}><i style={{ width: `${progress.percent}%` }} /></div></> : <span><Construction /> Curriculum mapped · lessons in development</span>}
        </div>
        <footer>
          <a href={root.overviewRoute}>{available ? <BookOpen /> : <Sprout />}{available ? 'View lessons' : 'View Root'}</a>
          {action && <a className="grove-root-primary" href={action.href}>{action.label} <ArrowRight /></a>}
        </footer>
      </div>
    </article>
  );
}

function UserGrove({ profile }) {
  const entries = useMemo(() => readGroveProgress(), []);
  const continuation = findJourneyContinuation(entries);
  const published = entries.filter(({ root }) => root.status === 'published' && root.lessonCount > 0);
  const completedRoots = published.filter(({ progress }) => progress.complete).length;
  const name = profile?.firstName;
  return (
    <main className="grove-page grove-user-page">
      <GroveHeader label="Your Grove" action={{ label: 'The Heart of Root$Wise', href: '/#heart' }} />
      <section className="user-grove-hero" aria-labelledby="user-grove-title">
        <img className="user-grove-photo" src="/grove-sunrise-valley.jpg" alt="" />
        <div className="user-grove-shade" />
        <div className="user-grove-tree"><ApprovedArtwork variant="tree" /></div>
        <div className="user-grove-heading">
          <p>Your learning journey</p>
          <h1 id="user-grove-title">{name ? `${name}’s Grove` : 'Your Grove'}</h1>
          <span>Eleven Roots. One connected development arc.</span>
          <div className="grove-arc" aria-label="The complete RootWise development arc">Self <i>→</i> Income <i>→</i> Present Money <i>→</i> Preparedness <i>→</i> Borrowing <i>→</i> Protection <i>→</i> Income Expansion <i>→</i> Consumer Leverage <i>→</i> Ownership <i>→</i> Legacy <i>→</i> Entrepreneurship</div>
          {continuation?.action && <a className="grove-continue" href={continuation.action.href}>{continuation.action.kind === 'start' ? 'Begin the journey' : 'Continue the journey'} <ArrowRight /></a>}
        </div>
        <div className="user-grove-progress" aria-label={`${completedRoots} of ${published.length} published Roots complete`}><strong>{completedRoots}</strong><span>of {published.length} published Roots complete</span><small>Progress is saved on this device.</small></div>
      </section>

      <section className="grove-root-paths" aria-labelledby="root-paths-title">
        <div className="grove-path-heading"><p>The Eleven Adult Roots</p><h2 id="root-paths-title">Financial decision capacity develops in sequence.</h2><span>Roots One through Five are published. Every future Root has a working overview and will gain real lesson links only when its curriculum is ready.</span></div>
        <div className="grove-root-system">
          {ROOT_GROUPS.map((group) => {
            const groupEntries = entries.filter(({ root }) => root.id >= group.range[0] && root.id <= group.range[1]);
            return <section className={`grove-root-group grove-group-${group.id}`} aria-labelledby={`grove-group-${group.id}`} key={group.id}>
              <header><span>{group.label}</span><h3 id={`grove-group-${group.id}`}>{group.description}</h3></header>
              <div>{groupEntries.map(({ root, progress }) => <RootCard root={root} progress={progress} key={root.id} />)}</div>
            </section>;
          })}
        </div>
      </section>
      <footer className="grove-footer"><p><strong>{name ? `${name}, your roots are planted in ideas.` : 'Your roots are planted in ideas.'}</strong><span>Our purpose is understanding. Our goal is choice.</span></p><span><Check /> Eleven Roots connected to one living system.</span></footer>
    </main>
  );
}

function WelcomeGrove() {
  return (
    <main className="grove-page">
      <GroveHeader label="The Grove" action={{ label: 'My journey', href: '/#my-journey' }} />
      <section className="grove-photo-hero" aria-labelledby="grove-title">
        <img className="grove-valley-photo" src="/grove-sunrise-valley.jpg" alt="" />
        <div className="grove-photo-shade" />
        <img className="grove-sage" src="/rootwise-sage-cutout.png" alt="Sage, your RootWise guide, standing at the valley overlook" />
        <div className="grove-welcome-copy"><p>{rootOneIntroduction.eyebrow}</p><h1 id="grove-title">{rootOneIntroduction.question}</h1><div className="grove-welcome-lines"><p>Root One begins beneath the numbers—with the person making the decision. From there, eleven connected Roots develop the capacity to earn, direct, carry forward, protect, expand, own, share, and create value.</p></div></div>
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
      <section className="grove-enter" aria-labelledby="enter-grove-title"><p>Your tree begins today.</p><h2 id="enter-grove-title">Whenever you’re ready, enter your Grove.</h2><span>Your saved progress and the complete eleven-Root map are waiting.</span><a href="/grove">Enter your Grove <ArrowRight /></a></section>
      <footer className="grove-footer"><p><strong>Your roots are planted in ideas.</strong><span>Our purpose is understanding. Our goal is choice.</span></p></footer>
    </main>
  );
}

export default function Grove({ profile, view = 'welcome' }) {
  return view === 'user' ? <UserGrove profile={profile} /> : <WelcomeGrove />;
}
