import { ArrowLeft, ArrowRight, BookOpen, Check, Clock3, Construction, Sprout } from 'lucide-react';
import { useMemo } from 'react';
import { readRootProgress, rootActionForProgress } from './root-registry';
import './root-overview.css';

function groupLessons(lessons) {
  return lessons.reduce((groups, lesson) => {
    const key = lesson.group || 'Lessons';
    const existing = groups.find((group) => group.label === key);
    if (existing) existing.lessons.push(lesson);
    else groups.push({ label: key, lessons: [lesson] });
    return groups;
  }, []);
}

export default function RootOverview({ root }) {
  const progress = useMemo(() => readRootProgress(root), [root]);
  const action = rootActionForProgress(root, progress);
  const groups = groupLessons(root.lessons.filter((lesson) => lesson.published));
  const accentStyle = /** @type {import('react').CSSProperties & Record<'--root-accent', string>} */ ({ '--root-accent': root.accent });

  return (
    <main className="root-overview" style={accentStyle}>
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
