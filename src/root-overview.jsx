import { ArrowLeft, ArrowRight, BookOpen, Check, Clock3, Construction, Sprout } from 'lucide-react';
import { useMemo } from 'react';
import { readRootProgress, rootActionForProgress } from './root-registry';
import './root-overview.css';
import './root-four-overview.css';

function groupLessons(lessons) {
  return lessons.reduce((groups, lesson) => {
    const key = lesson.group || 'Lessons';
    const existing = groups.find((group) => group.label === key);
    if (existing) existing.lessons.push(lesson);
    else groups.push({ label: key, lessons: [lesson] });
    return groups;
  }, []);
}

function RootFourOverview({ root, progress, action, groups }) {
  return (
    <main className="root-four-overview">
      <header className="r4o-header">
        <a href="/grove"><ArrowLeft /> The Grove</a>
        <a href="/" className="r4o-brand" aria-label="RootWise home"><Sprout /><span><strong>Root$Wise</strong><small>The eleven-Root journey</small></span></a>
        <span>{root.label}</span>
      </header>

      <section className="r4o-hero" aria-labelledby="root-overview-title">
        <div className="r4o-copy">
          <span className="r4o-number" aria-hidden="true">04</span>
          <p className="r4o-kicker">{root.label} · {root.status === 'published' ? 'Published' : 'In development'}</p>
          <h1 id="root-overview-title">{root.displayTitle}</h1>
          <strong>{root.purpose}</strong>
          <p>{root.description}</p>
          {root.note && <aside>{root.note}</aside>}
          <div className="r4o-actions">
            {action && <a className="r4o-primary" href={action.href}>{action.label} <ArrowRight /></a>}
            <a href="/grove">Return to Grove</a>
          </div>
        </div>

        <figure className="r4o-weather" aria-hidden="true">
          <img src="/root-four-weathered-reservoir.jpg" alt="" />
          <div />
          <figcaption>Reservoir Valley · after the weather</figcaption>
        </figure>

        <aside className="r4o-ledger" aria-label={`${progress.completedCount} of ${progress.totalCount} lessons complete`}>
          <div><p>Recovery ledger</p><span>{root.status === 'published' ? progress.status : 'In development'}</span></div>
          {root.status === 'published' ? <>
            <strong>{String(progress.completedCount).padStart(2, '0')}<small> / {progress.totalCount}</small></strong>
            <div role="progressbar" aria-label={`${root.label} progress`} aria-valuemin={0} aria-valuemax={progress.totalCount} aria-valuenow={progress.completedCount}><i style={{ width: `${progress.percent}%` }} /></div>
            <p>Progress is saved on this device.</p>
          </> : <><Construction /><p>The Root is mapped here now. Lesson links will appear only when the full curriculum is published.</p></>}
        </aside>
      </section>

      <section className="r4o-capacity" aria-labelledby="root-capacity-title">
        <p>Financial decision capacity</p>
        <h2 id="root-capacity-title">{root.capacity}</h2>
        {root.coreQuestion && <blockquote>{root.coreQuestion}</blockquote>}
      </section>

      <section className="r4o-lessons" aria-labelledby="root-lessons-title">
        <header>
          <div><p>{root.status === 'published' ? `${root.lessonCount} published lessons` : 'Curriculum status'}</p><h2 id="root-lessons-title">The recovery ledger</h2></div>
          {root.status === 'published' && <BookOpen />}
        </header>
        {groups.length ? groups.map((group, groupIndex) => (
          <section className="r4o-lesson-group" key={group.label}>
            <div className="r4o-season"><span>{String(groupIndex + 1).padStart(2, '0')}</span><h3>{group.label}</h3></div>
            <ol>
              {group.lessons.map((lesson) => {
                const complete = progress.completedIds.includes(lesson.id);
                const current = progress.started && !progress.complete && lesson.order === progress.activeOrder;
                return <li className={complete ? 'is-complete' : current ? 'is-current' : ''} key={lesson.id}>
                  <a href={lesson.route} aria-current={current ? 'step' : undefined}>
                    <span>{complete ? <Check /> : lesson.number || String(lesson.order).padStart(2, '0')}</span>
                    <strong>{lesson.title}</strong>
                    <small>{complete ? 'Complete' : current ? 'Current lesson' : 'Open lesson'}</small>
                    <ArrowRight />
                  </a>
                </li>;
              })}
            </ol>
          </section>
        )) : (
          <div className="r4o-development"><Clock3 /><div><strong>No placeholder lessons</strong><p>This overview will remain the reliable home for {root.label}. Real lesson routes will appear automatically when curriculum data is added to the central registry.</p></div></div>
        )}
      </section>
    </main>
  );
}


function RootFiveOverview({ root, progress, action, groups }) {
  return (
    <main className="root-five-overview">
      <div className="r5o-backdrop" aria-hidden="true">
        <img src="/root-five-bridge-hero-v2.jpg" alt="" />
        <div />
      </div>
      <header className="r5o-header">
        <a href="/grove"><ArrowLeft /> The Grove</a>
        <a href="/" className="r5o-brand" aria-label="RootWise home"><Sprout /><span><strong>Root$Wise</strong><small>The eleven-Root journey</small></span></a>
        <span>{root.label}</span>
      </header>

      <section className="r5o-hero" aria-labelledby="root-five-title">
        <div className="r5o-copy">
          <p className="r5o-kicker"><span>05</span> {root.label} · Published</p>
          <h1 id="root-five-title">Credit, Debt <em>&amp;</em><br />Future Income</h1>
          <strong>{root.purpose}</strong>
          <p>{root.description}</p>
          {root.note && <aside>{root.note}</aside>}
          <div className="r5o-actions">
            {action && <a className="r5o-primary" href={action.href}>{action.label} <ArrowRight /></a>}
            <a href="/grove">Return to Grove</a>
          </div>
          <div className="r5o-route-markers" aria-hidden="true"><span>ACCESS</span><i>CLAIM</i><b>CONSEQUENCE</b></div>
        </div>

        <figure className="r5o-scene">
          <img src="/root-five-bridge-hero-v2.jpg" alt="Ivy and Eli entering the illuminated Bridge District" />
          <figcaption><span>THE BRIDGE DISTRICT</span><strong>Every bridge creates access—and a future claim.</strong></figcaption>
        </figure>
      </section>

      <section className="r5o-capacity" aria-labelledby="root-five-capacity-title">
        <div><p>Financial decision capacity</p><h2 id="root-five-capacity-title">{root.capacity}</h2>{root.coreQuestion && <blockquote>{root.coreQuestion}</blockquote>}</div>
        <aside><span>ROOT FIVE / READ THE TERMS</span><strong>What becomes possible—and what becomes owed?</strong><small>Credit is access with a structure attached. Root Five makes the structure visible.</small></aside>
      </section>

      <section className="r5o-lessons" aria-labelledby="root-five-lessons-title">
        <header><div><p>{root.lessonCount} published lessons</p><h2 id="root-five-lessons-title">Crossings through the Bridge District</h2></div><BookOpen /></header>
        {groups.map((group, groupIndex) => (
          <section className="r5o-lesson-group" key={group.label}>
            <div className="r5o-season"><span>{String(groupIndex + 1).padStart(2, '0')}</span><h3>{group.label}</h3></div>
            <ol>
              {group.lessons.map((lesson) => {
                const complete = progress.completedIds.includes(lesson.id);
                const current = progress.started && !progress.complete && lesson.order === progress.activeOrder;
                return <li className={complete ? 'is-complete' : current ? 'is-current' : ''} key={lesson.id}>
                  <a href={lesson.route} aria-current={current ? 'step' : undefined}>
                    <span>{complete ? <Check /> : lesson.number || String(lesson.order).padStart(2, '0')}</span>
                    <strong>{lesson.title}</strong>
                    <small>{complete ? 'Complete' : current ? 'Current crossing' : 'Open crossing'}</small>
                    <ArrowRight />
                  </a>
                </li>;
              })}
            </ol>
          </section>
        ))}
      </section>
    </main>
  );
}

export default function RootOverview({ root }) {
  const progress = useMemo(() => readRootProgress(root), [root]);
  const action = rootActionForProgress(root, progress);
  const groups = groupLessons(root.lessons.filter((lesson) => lesson.published));
  const accentStyle = /** @type {import('react').CSSProperties & Record<'--root-accent', string>} */ ({ '--root-accent': root.accent });
  const isRootTwo = root.slug === 'two';

  if (root.slug === 'four') return <RootFourOverview root={root} progress={progress} action={action} groups={groups} />;
  if (root.slug === 'five') return <RootFiveOverview root={root} progress={progress} action={action} groups={groups} />;

  return (
    <main className={`root-overview ${isRootTwo ? 'root-overview-two' : ''}`} style={accentStyle}>
      {isRootTwo && <div className="root-overview-two-backdrop" aria-hidden="true"><img src="/root-two-exchange-district.png" alt="" /><div /></div>}
      <header className="root-overview-header">
        <a href="/grove"><ArrowLeft /> The Grove</a>
        <a href="/" className="root-overview-brand" aria-label="RootWise home"><Sprout /><span><strong>Root$Wise</strong><small>The eleven-Root journey</small></span></a>
        <span>{root.label}</span>
      </header>

      <section className="root-overview-hero" aria-labelledby="root-overview-title">
        <div className="root-overview-number" aria-hidden="true">{String(root.id).padStart(2, '0')}</div>
        <div className="root-overview-copy">
          <p>{root.label} · {root.status === 'published' ? 'Published' : 'In development'}</p>
          <h1 id="root-overview-title">{root.displayTitle}</h1>
          <strong>{root.purpose}</strong>
          <p>{root.description}</p>
          {root.note && <aside>{root.note}</aside>}
          <div className="root-overview-actions">
            {action && <a className="root-overview-primary" href={action.href}>{action.label} <ArrowRight /></a>}
            <a href="/grove">Return to Grove</a>
          </div>
        </div>
        <aside className="root-overview-progress" aria-label={`${progress.completedCount} of ${progress.totalCount} lessons complete`}>
          <span>{root.status === 'published' ? progress.status : 'In development'}</span>
          {root.status === 'published' ? <>
            <strong>{progress.completedCount}<small> / {progress.totalCount}</small></strong>
            <div role="progressbar" aria-label={`${root.label} progress`} aria-valuemin={0} aria-valuemax={progress.totalCount} aria-valuenow={progress.completedCount}><i style={{ width: `${progress.percent}%` }} /></div>
            <p>Progress is saved on this device.</p>
          </> : <><Construction /><p>The Root is mapped here now. Lesson links will appear only when the full curriculum is published.</p></>}
        </aside>
      </section>

      <section className="root-overview-capacity" aria-labelledby="root-capacity-title">
        <p>Financial decision capacity</p>
        <h2 id="root-capacity-title">{root.capacity}</h2>
        {root.coreQuestion && <blockquote>{root.coreQuestion}</blockquote>}
      </section>

      <section className="root-lesson-index" aria-labelledby="root-lessons-title">
        <header>
          <div><p>{root.status === 'published' ? `${root.lessonCount} published lessons` : 'Curriculum status'}</p><h2 id="root-lessons-title">{root.status === 'published' ? 'Root lesson index' : 'Lessons are in development'}</h2></div>
          {root.status === 'published' && <BookOpen />}
        </header>
        {groups.length ? groups.map((group) => (
          <section className="root-lesson-group" key={group.label}>
            <h3>{group.label}</h3>
            <ol>
              {group.lessons.map((lesson) => {
                const complete = progress.completedIds.includes(lesson.id);
                const current = progress.started && !progress.complete && lesson.order === progress.activeOrder;
                return <li className={complete ? 'is-complete' : current ? 'is-current' : ''} key={lesson.id}>
                  <a href={lesson.route} aria-current={current ? 'step' : undefined}>
                    <span>{complete ? <Check /> : lesson.number || String(lesson.order).padStart(2, '0')}</span>
                    <strong>{lesson.title}</strong>
                    <small>{complete ? 'Complete' : current ? 'Current lesson' : 'Open lesson'}</small>
                    <ArrowRight />
                  </a>
                </li>;
              })}
            </ol>
          </section>
        )) : (
          <div className="root-development-note"><Clock3 /><div><strong>No placeholder lessons</strong><p>This overview will remain the reliable home for {root.label}. Real lesson routes will appear automatically when curriculum data is added to the central registry.</p></div></div>
        )}
      </section>
    </main>
  );
}
