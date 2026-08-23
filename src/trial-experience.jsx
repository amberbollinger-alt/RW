import { useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, Eye,
  Lightbulb, LockKeyhole, Sparkles, Sprout, Target,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import { rootOneIntroduction, rootOneRootsData } from './root-one-roots-data';
import './trial-experience.css';

const firstLesson = rootOneRootsData[0];

function Story({ blocks }) {
  return (
    <div className="trial-story">
      {blocks.map((block, index) => {
        if (block.type === 'sage') {
          return <blockquote className="trial-voice trial-voice--sage" key={index}><cite>Sage</cite><p>“{block.text}”</p></blockquote>;
        }
        if (block.type === 'dialogue') {
          return <blockquote className="trial-voice" key={index}><cite>{block.speaker}</cite><p>“{block.text}”</p></blockquote>;
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}

export default function TrialExperience({ go }) {
  const [stage, setStage] = useState(0);
  const [openingChoice, setOpeningChoice] = useState('');
  const [answer, setAnswer] = useState('');
  const selected = useMemo(
    () => firstLesson.knowledgeCheck.options.find((option) => option.id === answer),
    [answer],
  );
  const stages = ['The question', 'The city beneath', 'See the pattern', 'The full journey'];

  const next = () => {
    setStage((current) => Math.min(current + 1, stages.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const previous = () => {
    setStage((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="trial-page">
      <div className="trial-backdrop" aria-hidden="true" />
      <header className="trial-topbar">
        <button type="button" onClick={() => go('home')}><ArrowLeft size={17} /> RootWise home</button>
        <div className="trial-brand"><ApprovedArtwork variant="tree" /><span><strong>Root$Wise</strong><small>Free trial experience</small></span></div>
        <span>{stage + 1} / {stages.length}</span>
      </header>
      <div className="trial-progress" aria-label="Trial progress"><i style={{ width: `${(stage + 1) / stages.length * 100}%` }} /></div>

      <section className="trial-shell">
        <nav aria-label="Trial chapters">
          {stages.map((label, index) => (
            <button type="button" className={index === stage ? 'is-active' : ''} onClick={() => setStage(index)} key={label}>
              <span>{index + 1}</span>{label}
            </button>
          ))}
        </nav>

        <article className="trial-content">
          {stage === 0 && (
            <>
              <figure className="trial-hero">
                <img src="/root-one-city-beneath-the-decision.png" alt="Ivy, Eli, and Sage beneath the old oak overlooking the city at twilight" />
                <figcaption>A taste of Root One · The Story Beneath the Decision</figcaption>
              </figure>
              <section className="trial-panel trial-intro">
                <p className="trial-eyebrow"><Sprout size={15} /> Begin beneath the decision</p>
                <h1>{rootOneIntroduction.title}</h1>
                <p className="trial-lead">{rootOneIntroduction.coreQuestion}</p>
                <div className="trial-promise"><Target size={21} /><p>{rootOneIntroduction.promise}</p></div>
                <Story blocks={rootOneIntroduction.story.slice(0, 12)} />
                <div className="trial-question">
                  <p className="trial-eyebrow"><Eye size={15} /> Notice your first instinct</p>
                  <h2>{rootOneIntroduction.learnerQuestion}</h2>
                  <div className="trial-options">
                    {rootOneIntroduction.learnerOptions.map((item) => (
                      <button type="button" className={openingChoice === item ? 'is-selected' : ''} onClick={() => setOpeningChoice(item)} key={item}>
                        <span>{openingChoice === item ? <Check size={16} /> : <ChevronRight size={16} />}</span>{item}
                      </button>
                    ))}
                  </div>
                  {openingChoice && <p className="trial-response">There is no score attached to that answer. The purpose is to notice what appears first.</p>}
                </div>
              </section>
            </>
          )}

          {stage === 1 && (
            <section className="trial-panel">
              <p className="trial-eyebrow"><BookOpen size={15} /> A scene from Root One</p>
              <h1>{firstLesson.title}</h1>
              <p className="trial-lead">{firstLesson.promise}</p>
              <div className="trial-sage-opening">
                <img src="/rootwise-sage.webp" alt="Sage" />
                <blockquote>“{firstLesson.sageOpening}”</blockquote>
              </div>
              <Story blocks={firstLesson.story.slice(0, 18)} />
              <p className="trial-editorial-break">Neither memory was false. Neither memory contained the entire financial world.</p>
            </section>
          )}

          {stage === 2 && (
            <section className="trial-panel">
              <p className="trial-eyebrow"><Lightbulb size={15} /> Understand, then recognize</p>
              <h1>Money does something. Experience teaches it to mean something.</h1>
              <p className="trial-lead">RootWise begins by separating the financial function from the human meaning attached to it.</p>
              <div className="trial-learning-grid">
                <section>
                  <span>01</span><h2>Understand · What is it?</h2>
                  <ul>{firstLesson.understand.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section>
                  <span>02</span><h2>Recognize · Where can it appear?</h2>
                  <ul>{firstLesson.recognize.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </div>
              <div className="trial-knowledge">
                <p className="trial-eyebrow">One knowledge check</p>
                <h2>{firstLesson.knowledgeCheck.prompt}</h2>
                <div className="trial-options">
                  {firstLesson.knowledgeCheck.options.map((option) => (
                    <button type="button" className={answer === option.id ? 'is-selected' : ''} onClick={() => setAnswer(option.id)} key={option.id}>
                      <span>{answer === option.id ? <Check size={16} /> : <ChevronRight size={16} />}</span>{option.label}
                    </button>
                  ))}
                </div>
                {selected && <div className={`trial-feedback ${selected.isCorrect ? 'is-correct' : ''}`}><strong>{selected.isCorrect ? 'Correct—the distinction is visible.' : 'Look one layer deeper.'}</strong><p>{firstLesson.knowledgeCheck.explanation}</p></div>}
              </div>
              <div className="trial-locked-preview">
                <LockKeyhole size={24} />
                <div><strong>The implementation layer begins inside membership.</strong><p>The Examine layer, Decision Roots Scan, private mirror, decision drill, workbook, saved Money Roots Map, and full Sage coaching are intentionally not part of this trial.</p></div>
              </div>
            </section>
          )}

          {stage === 3 && (
            <section className="trial-panel trial-conversion">
              <p className="trial-eyebrow"><Sparkles size={15} /> You have seen the pattern</p>
              <h1>Knowing is the beginning. Capacity is what changes what happens next.</h1>
              <p className="trial-lead">The complete RootWise journey connects knowledge to action across eleven Roots—without making the decision for you.</p>
              <div className="trial-root-map">
                {['The Story Beneath the Decision','Work, Value & Income','Money Flow & Spending','Saving & Resilience','Credit, Debt & Future Income','Financial Protection & Risk','Earning Expansion','Ownership & Investing','Building Financial Freedom','Family & Legacy','Business & Value Creation'].map((title, index) => (
                  <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong></div>
                ))}
              </div>
              <blockquote className="trial-choice-line">RootWise is for one outcome and only one—<strong>CHOICE.</strong> Money is just what it costs.</blockquote>
              <div className="trial-cta">
                <button type="button" onClick={() => go('contact')}>Join the full journey <ArrowRight size={18} /></button>
                <small>Membership checkout and account access are coming next. This button currently opens contact.</small>
              </div>
            </section>
          )}

          <footer className="trial-footer">
            <button type="button" onClick={previous} disabled={stage === 0}><ArrowLeft size={16} /> Previous</button>
            {stage < stages.length - 1
              ? <button type="button" className="trial-primary" onClick={next}>Continue <ArrowRight size={16} /></button>
              : <button type="button" className="trial-primary" onClick={() => go('home')}>Return home</button>}
          </footer>
        </article>
      </section>
    </main>
  );
}
