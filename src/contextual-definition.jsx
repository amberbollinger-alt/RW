import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, CircleHelp } from 'lucide-react';
import { dictionaryEntry } from './money-dictionary-data';
import './contextual-definition.css';

const termByLesson = {
  5: 'Annual percentage rate (APR)',
  7: 'Minimum payment',
  12: 'Buy now, pay later (BNPL)',
  18: 'Credit report',
  19: 'Credit score',
  20: 'Credit utilization',
  23: 'Cosigner',
};

const whyByLesson = {
  5: 'APR belongs beside the rate, term, fees, and repayment picture before Ivy or Eli compares a bridge contract.',
  7: 'The minimum keeps the immediate requirement and the length of the repayment tunnel in the same view.',
  12: 'The definition connects each small installment plan to the combined calendar Ivy and Eli are building.',
  18: 'The report is the record Ivy and Eli are learning to read; every score, unfamiliar item, or dispute begins with information in that record.',
  19: 'A score summarizes selected report data; it cannot measure Ivy, Eli, or any learner as a person.',
  20: 'Utilization explains the relationship between the reported balance and limit used in this lesson’s model.',
  23: 'Cosigning creates a legal obligation, which is why Sage keeps responsibility visible beside the relationship.',
};

export default function ContextualDefinition({ lesson }) {
  const [mount, setMount] = useState(null);
  const number = Number(lesson?.number);
  const entry = dictionaryEntry(termByLesson[number]);
  useEffect(() => {
    if (!entry) return undefined;
    const title = document.querySelector('.r5-lesson-title');
    if (!title) return undefined;
    const node = document.createElement('div');
    node.className = 'r5-context-definition-mount';
    title.insertAdjacentElement('afterend', node);
    const frame = window.requestAnimationFrame(() => setMount(node));
    return () => { window.cancelAnimationFrame(frame); node.remove(); };
  }, [entry]);
  if (!entry || !mount) return null;
  const returnPath = window.location.pathname.startsWith('/roots/') ? window.location.pathname : '';
  const id = entry.term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const dictionaryHref = `/tools/dictionary${returnPath ? `?from=${encodeURIComponent(returnPath)}` : ''}#${id}`;
  return createPortal(<aside className="r5-context-definition" data-narration-exclude="true"><details><summary><CircleHelp /><span><small>Money Dictionary</small><strong>{entry.term}</strong></span></summary><div><p>{entry.definition}</p><strong>Why it matters here</strong><p>{whyByLesson[number]}</p><a href={dictionaryHref}><BookOpen /> Open in Money Dictionary</a></div></details></aside>, mount);
}
