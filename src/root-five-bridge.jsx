import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BookOpen, Calculator, Check, CheckCircle2, ChevronRight,
  CircleHelp, FileSearch, Landmark, Layers3, LoaderCircle, Menu, MessageCircle,
  Play, ReceiptText, Route, Send, ShieldAlert, Sparkles, TimerReset, X,
} from 'lucide-react';
import { ApprovedArtwork } from './approved-artwork';
import { queueSageVoice } from './sage-voice-events';
import {
  ROOT_FIVE_PROGRESS_KEY, plainText, rootFiveLessons, rootFiveNarration,
  rootFiveOpening, rootFiveParts, rootFiveQuickPrompts,
} from './root-five-data';
import './root-five.css';

function safeObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function readProgress() {
  try {
    const parsed = safeObject(JSON.parse(localStorage.getItem(ROOT_FIVE_PROGRESS_KEY) || '{}'));
    const validKeys = new Set(rootFiveLessons.map((lesson) => lesson.key));
    const answers = safeObject(parsed.answers);
    const scenarios = safeObject(parsed.scenarios);
    const workbooks = safeObject(parsed.workbooks);
    const activities = safeObject(parsed.activities);
    const completed = Array.isArray(parsed.completed) ? parsed.completed.filter((key) => {
      const lesson = rootFiveLessons.find((item) => item.key === key);
      const correct = lesson?.check.options.find((option) => option.isCorrect)?.id;
      const workbook = workbooks[key];
      return validKeys.has(key) && answers[key] === correct && scenarios[key]
        && ['saved', 'skipped'].includes(workbook?.status)
        && (!lesson.interactive || activities[key]);
    }) : [];
    return {
      activeIndex: Number.isInteger(parsed.activeIndex) ? Math.min(Math.max(parsed.activeIndex, 0), rootFiveLessons.length - 1) : 0,
      visited: Array.isArray(parsed.visited) ? parsed.visited.filter((key) => validKeys.has(key)) : [],
      answers, scenarios, workbooks, activities, completed,
    };
  } catch {
    return {};
  }
}

function inlineText(text) {
  const match = String(text).match(/^\*\*(.+?)\*\*\s*(.*)$/);
  if (!match) return text;
  return <><strong>{match[1]}</strong>{match[2] ? ` ${match[2]}` : ''}</>;
}

function MarkdownContent({ text, className = '' }) {
  const blocks = String(text || '').split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  return <div className={`r5-markdown ${className}`}>{blocks.map((block, index) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.every((line) => /^[-*]\s+/.test(line))) {
      return <ul key={`${index}-${block.slice(0, 18)}`}>{lines.map((line) => <li key={line}>{inlineText(line.replace(/^[-*]\s+/, ''))}</li>)}</ul>;
    }
    return <p key={`${index}-${block.slice(0, 18)}`}>{inlineText(lines.join(' '))}</p>;
  })}</div>;
}

function BridgeBackdrop() {
  return <div className="r5-backdrop" aria-hidden="true"><img src="/root-five-bridge-district.png" alt="" /><div /></div>;
}

function LessonNav({ activeIndex, visited, completed, onSelect, onClose, closeRef }) {
  return <aside className="r5-nav">
    <header><div><p>Root Five</p><h2>Credit, Debt &amp; Future Income</h2></div><button ref={closeRef} type="button" onClick={onClose} aria-label="Close lesson menu"><X /></button></header>
    <nav aria-label="Root Five lessons">{rootFiveParts.map((part) => <section key={part.number}>
      <h3><span>Part {part.number}</span>{part.title}</h3>
      {rootFiveLessons.filter((lesson) => lesson.part.number === part.number).map((lesson) => {
        const index = lesson.number - 1;
        return <button type="button" className={activeIndex === index ? 'is-active' : ''} onClick={() => onSelect(index)} aria-current={activeIndex === index ? 'step' : undefined} key={lesson.key}>
          <span>{completed.includes(lesson.key) ? <Check /> : visited.includes(lesson.key) ? <Landmark /> : lesson.displayNumber}</span>
          <strong>{lesson.title}</strong><ChevronRight />
        </button>;
      })}
    </section>)}</nav>
    <footer><span>{completed.length} of {rootFiveLessons.length} lessons complete</span><i><b style={{ width: `${completed.length / rootFiveLessons.length * 100}%` }} /></i></footer>
  </aside>;
}

function Opening() {
  const [answer, setAnswer] = useState('');
  return <section className="r5-opening">
    <figure className="r5-bridge-scene">
      <img src="/root-five-bridge-district.png" alt="Ivy and Eli entering the Bridge District beneath the lit span" />
    </figure>
    <div className="r5-opening-copy"><p className="r5-eyebrow"><Route /> Root Five · The Bridge District</p><h1>Credit, Debt &amp; Future Income</h1><blockquote>{rootFiveOpening.coreQuestion}</blockquote></div>
    <div className="r5-opening-story"><div><p className="r5-eyebrow"><Sparkles /> Ivy, Eli &amp; Sage arrive</p><h2>Every bridge creates access—and a future claim.</h2><MarkdownContent text={rootFiveOpening.story} /></div><img src="/rootwise-sage-cutout.png" alt="Sage, the RootWise guide" /></div>
    <fieldset className="r5-opening-choice"><legend>What do you notice first at the bridge entrance?</legend><p>There is no graded answer. This simply makes your first instinct visible before the terms are revealed.</p><div>{['The access it creates', 'The future payment it requires', 'The terms I cannot see yet', 'The reason the traveler needs it'].map((option) => <button type="button" className={answer === option ? 'is-selected' : ''} onClick={() => setAnswer(option)} key={option}>{answer === option ? <Check /> : <ArrowRight />}{option}</button>)}</div>{answer && <p className="r5-opening-response">Sage: “Hold that instinct. Root Five will keep it in the frame while the rest of the bridge becomes visible.”</p>}</fieldset>
    <details className="r5-promise"><summary>Open the complete Root Five learning promise</summary><MarkdownContent text={rootFiveOpening.promise} /></details>
  </section>;
}

function SageOpening({ lesson }) {
  return <section className="r5-card r5-sage-open"><img src="/rootwise-sage-cutout.png" alt="" /><div><p className="r5-eyebrow"><Sparkles /> Sage</p><blockquote>{lesson.sageOpen}</blockquote><button type="button" onClick={() => queueSageVoice(rootFiveNarration(lesson), `Lesson ${lesson.number} narration is ready.`)}><Play /> Listen to this lesson</button><small>Uses Sage’s connected voice with a device-voice backup. Pause, resume, or replay from the voice controls.</small></div></section>;
}

function ThreeLevels({ lesson }) {
  return <section className="r5-card r5-levels"><header><p className="r5-eyebrow"><Layers3 /> Three levels of adult understanding</p><h2>Keep the lesson. Deepen how you use it.</h2></header><div>
    <article><span>01</span><div><p className="r5-level-label">Understand · What is happening here?</p><h3>Read the complete financial connection</h3><MarkdownContent text={lesson.financialConnection} />{lesson.number === 20 && <aside className="r5-accuracy"><strong>Accuracy note</strong><p>Utilization is calculated as the reported revolving balance divided by the applicable credit limit. Available credit is separate: it is the unused portion of the limit.</p></aside>}</div></article>
    <article><span>02</span><div><p className="r5-level-label">Recognize · Where does this appear in adult life?</p><h3>See the bridge outside the lesson</h3><ul>{lesson.recognize.map((item) => <li key={item}>{item}</li>)}</ul></div></article>
    <article><span>03</span><div><p className="r5-level-label">Examine · What is directing the decision?</p><h3>Use the original reflection without losing the story</h3><MarkdownContent text={lesson.reflection} /></div></article>
  </div></section>;
}

const activityNames = {
  'bridge-contract': 'The Bridge Contract', 'minimum-tunnel': 'Minimum-Payment Tunnel',
  'payment-price': 'Payment Versus Price', 'credit-sort': 'Revolving or Installment?',
  'bnpl-calendar': 'Buy-Now-Pay-Later Calendar', 'transport-cost': 'Total Transportation Cost',
  'score-person': 'Score Is Not the Person', 'report-investigation': 'Credit Report Investigation',
  'cosigner-chain': 'Cosigner Consequence Chain', 'approval-affordability': 'Approval Is Not Affordability',
  'debt-spiral': 'The Debt Spiral', 'inventory-gate': 'Inventory Before Strategy',
  'strategy-compare': 'Strategy Comparison', 'consolidation-reveal': 'Consolidation Reveal',
  'future-income': 'Future-Income Map',
};

function RichActivity({ type, done, onComplete }) {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState('');
  const [selected, setSelected] = useState({});
  const touch = (action) => action?.();
  const selectedCount = Object.values(selected).filter(Boolean).length;
  const activityIsComplete = Boolean({
    'bridge-contract': step >= 9 && Boolean(choice),
    'minimum-tunnel': step >= 12,
    'payment-price': Boolean(choice),
    'credit-sort': selectedCount >= 4,
    'bnpl-calendar': selectedCount >= 5,
    'transport-cost': selectedCount >= 8,
    'score-person': selectedCount >= 8,
    'report-investigation': selectedCount >= 7,
    'cosigner-chain': step >= 7,
    'approval-affordability': Boolean(choice),
    'debt-spiral': step >= 7 && Boolean(choice),
    'inventory-gate': selectedCount >= 8,
    'strategy-compare': selectedCount >= 2,
    'consolidation-reveal': step >= 8,
    'future-income': step >= 36,
  }[type]);
  useEffect(() => { if (!done && activityIsComplete) onComplete(); }, [activityIsComplete, done, onComplete]);
  if (!type) return null;
  const title = activityNames[type];
  const frame = (body) => <section className="r5-card r5-activity"><p className="r5-eyebrow"><Calculator /> Interactive bridge model</p><h2>{title}</h2>{body}</section>;

  if (type === 'bridge-contract') {
    const reveals = [['Cash price', '$1,000'], ['Financed amount', '$1,000'], ['Interest rate', '24% fixed'], ['APR', '24% in this no-fee illustration'], ['Term', '12 months'], ['Fees', '$0'], ['Monthly payment', '$94.56'], ['Total repayment', 'About $1,134.72'], ['Collateral and missed-payment terms', 'Unsecured; other consequences depend on the agreement and applicable law']];
    return frame(<><p>Select from the advertised payment, then reveal one contract layer at a time. You may revise the bridge at any point. Figures are rounded from a standard fixed-payment illustration.</p><div className="r5-offers"><button type="button" className={choice === 'low' ? 'is-selected' : ''} onClick={() => touch(() => setChoice('low'))}><small>Bridge A</small><strong>$94.56 / month</strong></button><button type="button" className={choice === 'clear' ? 'is-selected' : ''} onClick={() => touch(() => setChoice('clear'))}><small>Bridge B</small><strong>Show the complete terms before I choose</strong></button></div><div className="r5-reveals">{reveals.slice(0, step).map(([label, value]) => <span key={label}><small>{label}</small><strong>{value}</strong></span>)}</div><button type="button" className="r5-reveal-button" disabled={step === reveals.length} onClick={() => touch(() => setStep((value) => value + 1))}>{step === reveals.length ? 'Complete contract revealed' : `Reveal ${reveals[step][0]}`} <ChevronRight /></button>{choice && <p className="r5-result">Current choice: <strong>{choice === 'low' ? 'Bridge A' : 'request complete terms first'}</strong>. A sound decision is allowed to change as information changes.</p>}</>);
  }
  if (type === 'minimum-tunnel') {
    const month = Math.max(step, 1); const balance = Math.max(0, 2400 - month * 22); const cost = month * 50;
    return frame(<><p>Move through a simplified twelve-month tunnel. The illustration uses a fictional $2,400 revolving balance, a $72 payment, and approximate monthly interest with no new charges.</p><label className="r5-range">Months explored: <strong>{month}</strong><input type="range" min="1" max="12" value={month} onChange={(event) => touch(() => setStep(Number(event.target.value)))} /></label><div className="r5-metrics"><span><small>Approx. paid</small><strong>${month * 72}</strong></span><span><small>Approx. interest</small><strong>${cost}</strong></span><span><small>Approx. balance left</small><strong>${balance}</strong></span></div><p className="r5-result">The minimum can prevent immediate default while the tunnel remains long. Actual results depend on rate, method, fees, payment timing, and new activity.</p></>);
  }
  if (type === 'payment-price') {
    const offers = [{ id: 'long', payment: 248, term: 60, interest: 2880, total: 14880, flexibility: 'More monthly room; obligation lasts five years' }, { id: 'short', payment: 382, term: 36, interest: 1752, total: 13752, flexibility: 'Less monthly room; obligation ends two years earlier' }];
    return frame(<><p>Compare the payment with the price of time. Both offers are fictional.</p><div className="r5-offers">{offers.map((offer) => <button type="button" className={choice === offer.id ? 'is-selected' : ''} onClick={() => touch(() => setChoice(offer.id))} key={offer.id}><small>{offer.term}-month offer</small><strong>${offer.payment} / month</strong><span>Total interest ${offer.interest.toLocaleString()}</span><span>Total repayment ${offer.total.toLocaleString()}</span><span>{offer.flexibility}</span></button>)}</div>{choice && <p className="r5-result">Neither offer is universally better. The lower total cost and the workable monthly cash flow must be evaluated together.</p>}</>);
  }
  if (type === 'credit-sort') {
    const accounts = [['Credit card', 'Revolving · open-ended · usually unsecured'], ['Auto loan', 'Installment · fixed-term · secured'], ['Home-equity line', 'Revolving · open-ended · secured'], ['Personal loan', 'Installment · fixed-term · often unsecured']];
    return frame(<><p>Reveal how one account can belong to more than one category.</p><div className="r5-sort">{accounts.map(([name, answer]) => <button type="button" className={selected[name] ? 'is-selected' : ''} onClick={() => touch(() => setSelected((items) => ({ ...items, [name]: !items[name] })))} key={name}><strong>{name}</strong><span>{selected[name] ? answer : 'Select to classify'}</span></button>)}</div></>);
  }
  if (type === 'bnpl-calendar') {
    const plans = [{ name: 'Shoes', amount: 45, dates: '2, 16' }, { name: 'Tablet', amount: 80, dates: '4, 18' }, { name: 'Groceries', amount: 60, dates: '8, 22' }, { name: 'Tickets', amount: 35, dates: '11, 25' }, { name: 'Repair', amount: 95, dates: '14, 28' }];
    const total = plans.filter((plan) => selected[plan.name]).reduce((sum, plan) => sum + plan.amount * 2, 0);
    return frame(<><p>Add each small plan to the same fictional month.</p><div className="r5-calendar">{plans.map((plan) => <button type="button" className={selected[plan.name] ? 'is-selected' : ''} onClick={() => touch(() => setSelected((items) => ({ ...items, [plan.name]: !items[plan.name] })))} key={plan.name}><Check /><strong>{plan.name}</strong><span>${plan.amount} on days {plan.dates}</span></button>)}</div><p className="r5-total">Combined claim this month <strong>${total}</strong></p></>);
  }
  if (type === 'transport-cost') {
    const costs = /** @type {Array<[string, number]>} */ ([['Payment', 410], ['Insurance', 165], ['Fuel', 150], ['Registration reserve', 24], ['Maintenance reserve', 55], ['Repair reserve', 65], ['Parking', 40], ['Depreciation estimate', 185]]);
    const total = costs.filter(([name]) => selected[name]).reduce((sum, [, value]) => sum + value, 0);
    return frame(<><p>Build the monthly transportation picture. Select every cost you want included.</p><div className="r5-cost-list">{costs.map(([name, value]) => <button type="button" className={selected[name] ? 'is-selected' : ''} onClick={() => touch(() => setSelected((items) => ({ ...items, [name]: !items[name] })))} key={name}><Check /><span>{name}</span><strong>${value}</strong></button>)}</div><p className="r5-total">Visible monthly transportation cost <strong>${total}</strong></p></>);
  }
  if (type === 'score-person') {
    const facts = /** @type {Array<[string, boolean]>} */ ([['Payment history', true], ['Kindness', false], ['Reported balances', true], ['Intelligence', false], ['Account age', true], ['Human worth', false], ['Savings balance', false], ['Income', false]]);
    return frame(<><p>Choose whether each item can be part of a general credit-scoring model or belongs outside what the score can measure.</p><div className="r5-score-grid">{facts.map(([name, model]) => <button type="button" className={selected[name] ? (selected[name] === (model ? 'model' : 'person') ? 'is-correct' : 'is-wrong') : ''} onClick={() => touch(() => setSelected((items) => ({ ...items, [name]: items[name] === 'model' ? 'person' : 'model' })))} key={name}><strong>{name}</strong><span>{selected[name] ? (selected[name] === 'model' ? 'Model data' : 'Not measured by score') : 'Select to sort'}</span></button>)}</div></>);
  }
  if (type === 'report-investigation') {
    const items = ['Unfamiliar account', 'Incorrect balance', 'Authorized-user account', 'Duplicate collection', 'Outdated address', 'Hard inquiry', 'Closed account'];
    const actions = ['Explain', 'Document', 'Dispute'];
    return frame(<><p>Every item deserves review; not every item requires the same response. Cycle through an initial investigation category.</p><div className="r5-investigate">{items.map((item) => <button type="button" onClick={() => touch(() => setSelected((current) => ({ ...current, [item]: actions[(actions.indexOf(current[item]) + 1) % actions.length] })))} key={item}><FileSearch /><strong>{item}</strong><span>{selected[item] || 'Choose first step'}</span></button>)}</div><p className="r5-result">These are investigation labels, not dispute instructions. Actual rights, documentation, and timing depend on the item and applicable law.</p></>);
  }
  if (type === 'cosigner-chain') {
    const chain = ['Primary borrower misses payment', 'Cosigner remains liable', 'Both credit files may be affected', 'Collection may reach either liable party', 'Future borrowing can narrow', 'Relationship pressure can grow', 'Collateral may still be at risk'];
    return frame(<><p>Reveal the consequence chain one link at a time.</p><ol className="r5-chain">{chain.slice(0, step).map((item) => <li key={item}>{item}</li>)}</ol><button type="button" className="r5-reveal-button" disabled={step === chain.length} onClick={() => touch(() => setStep((value) => value + 1))}>{step === chain.length ? 'Full chain visible' : 'Reveal next consequence'} <ChevronRight /></button></>);
  }
  if (type === 'approval-affordability') {
    const base = 4000 - (1550 + 620 + 480 + 350 + 240 + 260); const margin = choice ? base - 500 - (choice === 'interruption' ? 700 : choice === 'medical' ? 260 : 0) : base;
    return frame(<><p>A fictional lender approves Ivy for a $500 payment. Place it into the cash-flow map, then test a change.</p><div className="r5-metrics"><span><small>Usable income</small><strong>$4,000</strong></span><span><small>Existing planned costs</small><strong>$3,500</strong></span><span><small>Approved payment</small><strong>$500</strong></span><span><small>Margin after test</small><strong className={margin < 0 ? 'is-negative' : ''}>${margin}</strong></span></div><div className="r5-options"><button type="button" className={choice === 'medical' ? 'is-selected' : ''} onClick={() => touch(() => setChoice('medical'))}>Add a $260 medical cost</button><button type="button" className={choice === 'interruption' ? 'is-selected' : ''} onClick={() => touch(() => setChoice('interruption'))}>Reduce income by $700</button><button type="button" className={choice === 'none' ? 'is-selected' : ''} onClick={() => touch(() => setChoice('none'))}>Keep the expected month</button></div><p className="r5-result">Approval did not create margin. The household test includes costs and changes the lender may not include.</p></>);
  }
  if (type === 'debt-spiral') {
    const chain = ['Grocery shortfall', 'Credit-card charge', 'New minimum payment', 'Less room next payday', 'Second shortfall', 'Cash advance', 'Fees and another required payment'];
    return frame(<><p>Follow the sequence without assigning shame. The starting pressure and the added obligations are both part of the map.</p><ol className="r5-chain">{chain.slice(0, step).map((item) => <li key={item}>{item}</li>)}</ol><button type="button" className="r5-reveal-button" disabled={step === chain.length} onClick={() => touch(() => setStep((value) => value + 1))}>{step === chain.length ? 'Complete spiral visible' : 'Reveal next turn'} <ChevronRight /></button><div className="r5-options"><button type="button" onClick={() => touch(() => setChoice('timing'))}>Timing</button><button type="button" onClick={() => touch(() => setChoice('income'))}>Income</button><button type="button" onClick={() => touch(() => setChoice('several'))}>Several factors</button></div>{choice && <p className="r5-result">Selected starting lens: <strong>{choice}</strong>. More evidence may change the diagnosis of the fictional pattern.</p>}</>);
  }
  if (type === 'inventory-gate') {
    const fields = ['Balance', 'Rate or cost', 'Minimum', 'Status', 'Collateral', 'Responsible parties', 'Promotional date', 'Legal or collection deadline']; const count = fields.filter((field) => selected[field]).length;
    return frame(<><p>The strategy gate stays closed until every required field in the fictional obligation is identified.</p><div className="r5-cost-list">{fields.map((field) => <button type="button" className={selected[field] ? 'is-selected' : ''} onClick={() => touch(() => setSelected((items) => ({ ...items, [field]: !items[field] })))} key={field}><Check /><span>{field}</span></button>)}</div><p className={count === fields.length ? 'r5-gate is-open' : 'r5-gate'}>{count === fields.length ? 'Strategy comparison unlocked. The inventory is complete enough to begin.' : `${fields.length - count} fields still missing. Strategy remains locked.`}</p></>);
  }
  if (type === 'strategy-compare') {
    const strategies = [['Smallest balance first', 'May create an early closed balance; may not minimize interest'], ['Highest interest first', 'Targets stated cost; may produce slower visible account closure'], ['Cash-flow relief', 'May free required monthly cash; can cost more overall'], ['Highest-risk first', 'Centers collateral, delinquency, legal deadlines, or essential access'], ['Consolidation', 'Creates one new structure with new rate, term, fees, and risks'], ['Negotiated arrangement', 'Depends on creditor agreement and specific terms']];
    return frame(<><p>Select two approaches to compare. No method is labeled the universal winner.</p><div className="r5-strategies">{strategies.map(([name, detail]) => <button type="button" className={selected[name] ? 'is-selected' : ''} disabled={!selected[name] && Object.keys(selected).filter((key) => selected[key]).length >= 2} onClick={() => touch(() => setSelected((items) => ({ ...items, [name]: !items[name] })))} key={name}><strong>{name}</strong><span>{detail}</span></button>)}</div></>);
  }
  if (type === 'consolidation-reveal') {
    const terms = [['Old combined payment', '$620'], ['New payment', '$430'], ['Old remaining time', '30 months'], ['New term', '60 months'], ['New fee', '$480'], ['Rate', 'Variable after month 12'], ['Collateral', 'Vehicle added as security'], ['Old accounts', 'Remain open unless separately closed']];
    return frame(<><p>The payment falls first. Reveal what changed to produce it.</p><div className="r5-reveals">{terms.slice(0, step).map(([label, value]) => <span key={label}><small>{label}</small><strong>{value}</strong></span>)}</div><button type="button" className="r5-reveal-button" disabled={step === terms.length} onClick={() => touch(() => setStep((value) => value + 1))}>{step === terms.length ? 'Full comparison revealed' : `Reveal ${terms[step][0]}`} <ChevronRight /></button></>);
  }
  const obligations = [{ name: 'Card', amount: 180, end: 8 }, { name: 'Vehicle', amount: 410, end: 24 }, { name: 'Student loan', amount: 220, end: 36 }, { name: 'BNPL plans', amount: 145, end: 4 }];
  const month = Math.max(step, 1); const committed = obligations.filter((item) => item.end >= month).reduce((sum, item) => sum + item.amount, 0); const released = obligations.reduce((sum, item) => sum + item.amount, 0) - committed;
  return frame(<><p>Move across a fictional 36-month calendar. Watch committed income become visible again as obligations end.</p><label className="r5-range">Month <strong>{month}</strong><input type="range" min="1" max="36" value={month} onChange={(event) => touch(() => setStep(Number(event.target.value)))} /></label><div className="r5-timeline">{obligations.map((item) => <span className={item.end < month ? 'is-ended' : ''} key={item.name}><strong>{item.name}</strong><small>${item.amount}/month · ends month {item.end}</small></span>)}</div><div className="r5-metrics"><span><small>Still committed</small><strong>${committed}/month</strong></span><span><small>Choice restored</small><strong>${released}/month</strong></span></div><p className="r5-result">The release is future flexibility—not a moral score and not a prediction of how the money must be used.</p></>);
}

function Practice({ lesson, answer, scenario, activityDone, onAnswer, onScenario, onActivity }) {
  const checked = lesson.check.options.find((option) => option.id === answer);
  const scenarioChoice = lesson.scenario.options.find((option) => option.id === scenario);
  return <>
    <section className="r5-card r5-check"><p className="r5-eyebrow"><CircleHelp /> Practical Check</p><h2>{lesson.check.prompt}</h2><div className="r5-options">{lesson.check.options.map((option) => <button type="button" className={answer === option.id ? 'is-selected' : ''} aria-pressed={answer === option.id} onClick={() => onAnswer(option.id)} key={option.id}><span>{answer === option.id ? <Check /> : <ArrowRight />}</span>{option.label}</button>)}</div>{checked && <div className={checked.isCorrect ? 'r5-feedback is-correct' : 'r5-feedback'} aria-live="polite"><strong>{checked.isCorrect ? 'You found the full frame' : 'One layer is still missing'}</strong><p>{checked.isCorrect ? 'The answer keeps the relevant benefit, contract, cost, timing, and consequence visible.' : 'Return to the complete lesson and look for the answer that avoids a universal shortcut.'}</p></div>}</section>
    <RichActivity type={lesson.interactive} done={activityDone} onComplete={onActivity} />
    <section className="r5-card r5-scenario"><p className="r5-eyebrow"><Route /> Apply the model</p><h2>{lesson.scenario.prompt}</h2><div className="r5-options">{lesson.scenario.options.map((option) => <button type="button" className={scenario === option.id ? 'is-selected' : ''} aria-pressed={scenario === option.id} onClick={() => onScenario(option.id)} key={option.id}><span>{scenario === option.id ? <Check /> : <ArrowRight />}</span>{option.label}</button>)}</div>{scenarioChoice && <div className={scenarioChoice.strength === 'strong' ? 'r5-feedback is-correct' : 'r5-feedback'} aria-live="polite"><strong>{scenarioChoice.strength === 'strong' ? 'This keeps the crossing visible' : 'Pause before crossing'}</strong><p>{scenarioChoice.feedback}</p></div>}</section>
  </>;
}

function Workbook({ lesson, value, onChange }) {
  const current = value || { text: '', status: '' };
  return <section className="r5-card r5-workbook"><div><p className="r5-eyebrow"><BookOpen /> Private workbook · {lesson.workbookTitle}</p><h2>Make a private working note</h2><p>Use approximate values, ranges, percentages, fictional accounts, or a sample statement. Do not enter account or card numbers, Social Security numbers, login credentials, legal case identifiers, exact creditor details, or identifying medical information.</p><label htmlFor={`r5-workbook-${lesson.key}`}>Your private note<textarea id={`r5-workbook-${lesson.key}`} rows={6} value={current.text || ''} onChange={(event) => onChange({ text: event.target.value, status: current.status === 'saved' ? '' : current.status })} placeholder={`Begin a ${lesson.workbookTitle.toLowerCase()} using fictional or approximate information…`} /></label><div><button type="button" disabled={!String(current.text || '').trim()} onClick={() => onChange({ text: current.text, status: 'saved' })}><CheckCircle2 /> Save on this device</button><button type="button" onClick={() => onChange({ text: current.text || '', status: 'skipped' })}><TimerReset /> Intentionally skip</button></div>{['saved', 'skipped'].includes(current.status) && <p className="r5-workbook-status"><Check /> {current.status === 'saved' ? 'Private note saved on this device.' : 'Workbook intentionally skipped. You may return at any time.'}</p>}</div><aside><ShieldAlert /><strong>Privacy boundary</strong><p>RootWise stores this workbook only in this browser. It is never sent to Ask Sage.</p></aside></section>;
}

function Sources({ lesson }) {
  const jurisdictionSensitive = [13, 16, 17, 22, 26, 27, 32, 36].includes(lesson.number);
  return <section className="r5-card r5-sources"><p className="r5-eyebrow"><ReceiptText /> Fact-check desk</p><h2>Verify the rule behind the bridge</h2><p>Reviewed against primary public authorities on July 27, 2026. Product terms and laws can change.</p>{jurisdictionSensitive && <p className="r5-jurisdiction"><strong>Jurisdiction matters.</strong> State law, court rules, contract terms, deadlines, exemptions, and available protections can differ. This lesson provides education, not a case-specific legal conclusion.</p>}<ul>{lesson.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ArrowRight /></a></li>)}</ul></section>;
}

function AskSage({ lesson }) {
  const [threads, setThreads] = useState({}); const [draft, setDraft] = useState(''); const [sending, setSending] = useState(false); const [open, setOpen] = useState(false);
  const panelRef = useRef(null); const toggleRef = useRef(null); const closeRef = useRef(null); const listRef = useRef(null);
  const messages = useMemo(() => threads[lesson.key] || [{ role: 'assistant', content: `We’re at ${lesson.title}. Ask me to define a term, compare a payment with total cost, or identify information missing from this bridge.` }], [threads, lesson]);
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, sending]);
  useEffect(() => { if (!open) return undefined; closeRef.current?.focus(); const prior = document.body.style.overflow; document.body.style.overflow = 'hidden'; const key = (event) => { if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } }; window.addEventListener('keydown', key); return () => { document.body.style.overflow = prior; window.removeEventListener('keydown', key); }; }, [open]);
  const send = async (message) => {
    const clean = message.trim(); if (!clean || sending) return; const next = [...messages, { role: 'user', content: clean }]; setThreads((items) => ({ ...items, [lesson.key]: next })); setDraft(''); setSending(true);
    const controller = new AbortController(); const timeout = window.setTimeout(() => controller.abort(), 22000);
    try {
      const response = await fetch('/api/sage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ root: 'five', message: clean, lesson: { number: lesson.number, title: lesson.title, story: plainText(lesson.story).slice(0, 600), connection: plainText(lesson.financialConnection).slice(0, 900) }, history: messages.slice(-9) }), signal: controller.signal });
      const payload = await response.json().catch(() => ({})); if (!response.ok || !payload.reply) throw new Error('unavailable'); queueSageVoice(payload.reply, 'Sage answered your Root Five question.'); setThreads((items) => ({ ...items, [lesson.key]: [...next, { role: 'assistant', content: payload.reply }] }));
    } catch (error) { setThreads((items) => ({ ...items, [lesson.key]: [...next, { role: 'assistant', unavailable: true, content: error?.name === 'AbortError' ? 'That took too long. Your question remains here—please try again in a moment.' : 'The conversation service is not reachable right now. The full lesson, source links, workbook, and voice narration remain available; please try this question again shortly.' }] })); }
    finally { window.clearTimeout(timeout); setSending(false); }
  };
  return <><button ref={toggleRef} type="button" className="r5-sage-toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="r5-sage-panel"><MessageCircle /> Ask Sage</button>{open && <button type="button" className="r5-sage-scrim" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage" />}<aside ref={panelRef} id="r5-sage-panel" className={open ? 'r5-sage is-open' : 'r5-sage'} aria-label="Ask Sage support"><header><div><Sparkles /><span><strong>Ask Sage</strong><small>{lesson.title}</small></span></div><button ref={closeRef} type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close Ask Sage"><X /></button></header><div ref={listRef} className="r5-sage-messages" aria-live="polite">{messages.map((message, index) => <div className={`${message.role} ${message.unavailable ? 'is-unavailable' : ''}`} key={`${lesson.key}-${index}`}><strong>{message.role === 'assistant' ? 'Sage' : 'You'}</strong><p>{message.content}</p></div>)}{sending && <div className="assistant"><LoaderCircle className="r5-spin" /><p>Sage is thinking…</p></div>}</div><div className="r5-quick">{rootFiveQuickPrompts.map((prompt) => <button type="button" disabled={sending} onClick={() => send(`${prompt} for ${lesson.title}. Use the Ivy and Eli bridge story, plain language, and RootWise’s non-directive boundaries.`)} key={prompt}>{prompt}</button>)}</div><form onSubmit={(event) => { event.preventDefault(); send(draft); }}><label htmlFor={`r5-sage-${lesson.key}`}>Ask about this lesson</label><div><textarea id={`r5-sage-${lesson.key}`} rows={3} maxLength={700} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What are you trying to understand?" /><button type="submit" disabled={!draft.trim() || sending} aria-label="Send question"><Send /></button></div></form><footer>Do not share account numbers, passwords, Social Security numbers, medical details, or case identifiers. Sage provides education—not individualized legal, tax, credit-repair, or product advice.</footer></aside></>;
}

export default function RootFiveBridge({ go, initialLessonKey, onLessonChange }) {
  const saved = useMemo(() => readProgress(), []); const requestedIndex = rootFiveLessons.findIndex((lesson) => lesson.key === initialLessonKey); const startingIndex = requestedIndex >= 0 ? requestedIndex : saved.activeIndex || 0; const [activeIndex, setActiveIndex] = useState(startingIndex); const [visited, setVisited] = useState(() => [...new Set([...(saved.visited || []), rootFiveLessons[startingIndex].key])]); const [completed, setCompleted] = useState(saved.completed || []); const [answers, setAnswers] = useState(saved.answers || {}); const [scenarios, setScenarios] = useState(saved.scenarios || {}); const [workbooks, setWorkbooks] = useState(saved.workbooks || {}); const [activities, setActivities] = useState(saved.activities || {}); const [navOpen, setNavOpen] = useState(false); const menuRef = useRef(null); const closeRef = useRef(null);
  const lesson = rootFiveLessons[activeIndex]; const correct = lesson.check.options.find((option) => option.isCorrect)?.id; const workbookReady = ['saved', 'skipped'].includes(workbooks[lesson.key]?.status); const ready = answers[lesson.key] === correct && Boolean(scenarios[lesson.key]) && workbookReady && (!lesson.interactive || activities[lesson.key]);
  useEffect(() => { localStorage.setItem(ROOT_FIVE_PROGRESS_KEY, JSON.stringify({ activeIndex, visited, completed, answers, scenarios, workbooks, activities })); }, [activeIndex, visited, completed, answers, scenarios, workbooks, activities]);
  useEffect(() => { if (!navOpen) return undefined; closeRef.current?.focus(); const key = (event) => { if (event.key === 'Escape') { setNavOpen(false); menuRef.current?.focus(); } }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, [navOpen]);
  const select = (index) => { const next = Math.min(Math.max(index, 0), rootFiveLessons.length - 1); if (onLessonChange && next !== activeIndex) { onLessonChange(rootFiveLessons[next].key); return; } setActiveIndex(next); setVisited((items) => items.includes(rootFiveLessons[next].key) ? items : [...items, rootFiveLessons[next].key]); setNavOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toggleComplete = () => setCompleted((items) => items.includes(lesson.key) ? items.filter((key) => key !== lesson.key) : ready ? [...items, lesson.key] : items);
  return <main className="root-five-bridge"><BridgeBackdrop /><header className="r5-topbar"><button type="button" onClick={() => go('dashboard')}><ArrowLeft /> The Grove</button><button type="button" className="r5-brand" onClick={() => go('home')} aria-label="RootWise home"><ApprovedArtwork variant="tree" /><span><strong>Root$Wise</strong><small>Root Five · Credit, Debt &amp; Future Income</small></span></button><button ref={menuRef} type="button" onClick={() => setNavOpen(true)} aria-expanded={navOpen} aria-controls="r5-navigation"><Menu /> Lessons</button></header><div className="r5-progress" role="progressbar" aria-label="Root Five progress" aria-valuemin={0} aria-valuemax={rootFiveLessons.length} aria-valuenow={completed.length}><i style={{ width: `${completed.length / rootFiveLessons.length * 100}%` }} /></div>
    <div className="r5-shell">{navOpen && <button type="button" className="r5-nav-scrim" onClick={() => { setNavOpen(false); menuRef.current?.focus(); }} aria-label="Close lesson menu" />}<div id="r5-navigation" className={navOpen ? 'r5-nav-wrap is-open' : 'r5-nav-wrap'}><LessonNav activeIndex={activeIndex} visited={visited} completed={completed} onSelect={select} onClose={() => setNavOpen(false)} closeRef={closeRef} /></div><article className="r5-lesson" key={lesson.key}>{activeIndex === 0 && <Opening />}<section className="r5-lesson-title"><p className="r5-eyebrow">Part {lesson.part.number} · {lesson.part.title}</p><span>Lesson {lesson.displayNumber} of 38</span><h1>{lesson.title}</h1></section><SageOpening lesson={lesson} /><section className="r5-card r5-story"><p className="r5-eyebrow"><Sparkles /> The continuing story · Ivy, Eli &amp; Sage</p><h2>The analogy stays intact.</h2><MarkdownContent text={lesson.story} /></section><ThreeLevels lesson={lesson} /><Practice lesson={lesson} answer={answers[lesson.key]} scenario={scenarios[lesson.key]} activityDone={activities[lesson.key]} onAnswer={(value) => setAnswers((items) => ({ ...items, [lesson.key]: value }))} onScenario={(value) => setScenarios((items) => ({ ...items, [lesson.key]: value }))} onActivity={() => setActivities((items) => items[lesson.key] ? items : ({ ...items, [lesson.key]: true }))} /><Workbook lesson={lesson} value={workbooks[lesson.key]} onChange={(value) => setWorkbooks((items) => ({ ...items, [lesson.key]: value }))} /><Sources lesson={lesson} /><section className="r5-card r5-growth"><p className="r5-eyebrow"><CheckCircle2 /> Root Growth</p><h2>{lesson.number === 38 ? 'Future income becomes visible as choice, not destiny.' : 'The bridge is clearer than its advertised payment.'}</h2><p>{lesson.sageOpen}</p></section><section className="r5-next"><ArrowRight /><div><p className="r5-eyebrow">The next bridge</p><p>{lesson.transition}</p></div></section><footer className="r5-footer"><button type="button" onClick={() => select(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft /> Previous</button><button type="button" className={completed.includes(lesson.key) ? 'is-complete' : ''} onClick={toggleComplete} disabled={!completed.includes(lesson.key) && !ready} aria-pressed={completed.includes(lesson.key)}>{completed.includes(lesson.key) ? <Check /> : <CheckCircle2 />}{completed.includes(lesson.key) ? 'Lesson complete' : ready ? 'Complete lesson' : `Finish check, model${lesson.interactive ? ', activity' : ''} & workbook`}</button><button type="button" onClick={() => activeIndex === rootFiveLessons.length - 1 ? go('dashboard') : select(activeIndex + 1)}>{activeIndex === rootFiveLessons.length - 1 ? 'Return to Grove' : 'Next lesson'} <ArrowRight /></button></footer></article></div><AskSage lesson={lesson} />
  </main>;
}
