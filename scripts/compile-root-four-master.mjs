import { readFileSync, writeFileSync } from 'node:fs';

const source = readFileSync(new URL('../../Root-Four-Master-Copy-Paste-Package.md', import.meta.url), 'utf8');
const manuscript = source.split('## COMPLETE TWENTY-TWO-LESSON MANUSCRIPT')[1].split('## ROOT FOUR CLOSING EXPERIENCE')[0];
const chunks = manuscript.split(/\n(?=# Part \d+ — )/).filter((chunk) => /## Lesson \d+/.test(chunk));

const textAfter = (body, heading, next) => {
  const start = body.indexOf(heading);
  if (start < 0) return '';
  const rest = body.slice(start + heading.length).trim();
  const end = next ? rest.search(next) : -1;
  return (end >= 0 ? rest.slice(0, end) : rest).trim();
};
const clean = (value) => value.replace(/\*\*/g, '').trim();
const storyLines = (body) => textAfter(body, '### The continuing story', /\n### Level 01/).split(/\n\n+/).filter(Boolean).map((block) => {
  const match = block.match(/^> \*\*(.+?):\*\* “([\s\S]+)”$/);
  return match ? { speaker: match[1], text: match[2], type: 'dialogue' } : { type: 'narration', text: clean(block) };
});
const parseLevel = (body, number, next) => {
  const section = textAfter(body, `### Level 0${number} —`, next);
  const lines = section.split('\n').filter(Boolean);
  const guiding = clean((lines.find((line) => line.startsWith('**Guiding question:**')) || '').replace('**Guiding question:**', ''));
  const titleIndex = lines.findIndex((line) => line.startsWith('#### '));
  const title = titleIndex >= 0 ? lines[titleIndex].slice(5) : '';
  const content = lines.slice(titleIndex + 1).filter((line) => !line.startsWith('**Guiding question:**'));
  const paragraphs = [];
  const details = [];
  let current = null;
  for (const line of content) {
    if (/^\*\*.+\*\*$/.test(line)) {
      current = { title: clean(line), body: '' };
      details.push(current);
    } else if (line.startsWith('- ')) {
      (current || (current = { title: 'Questions', items: [] })).items ??= [];
      current.items.push(line.slice(2));
      if (!details.includes(current)) details.push(current);
    } else if (current && !current.items) current.body += `${current.body ? ' ' : ''}${line}`;
    else paragraphs.push(line);
  }
  return { number, guiding, title, paragraphs, details };
};
const optionBlocks = (section, prefix) => [...section.matchAll(new RegExp(`\\*\\*${prefix}[^:]*: ([^*]+)\\*\\*\\n\\n- \\*\\*What follows:\\*\\* ([^\\n]+)\\n- \\*\\*Sage:\\*\\* “([^”]+)”`, 'g'))]
  .map((match, index) => ({ id: `option-${index + 1}`, label: match[1].trim(), consequence: match[2].trim(), sage: match[3].trim() }));

const lessons = chunks.map((body) => {
  const part = body.match(/^# Part (\d+) — ([^\n]+)/);
  const lesson = body.match(/## Lesson (\d+) — ([^\n]+)/);
  const drill = textAfter(body, '### Reservoir Decision Drill', /\n### Private Mirror Reflection/);
  const check = textAfter(body, '### Knowledge Check', /\n### Reservoir Decision Drill/);
  const checkLines = check.split('\n\n').filter(Boolean);
  const checkOptions = [...check.matchAll(/\*\*([A-C])\. ([^*]+)\*\*\n\n- \*\*Answer key:\*\* (Correct|Not correct)\n- \*\*Feedback:\*\* ([^\n]+)/g)]
    .map((match) => ({ id: match[1].toLowerCase(), label: match[2].trim(), isCorrect: match[3] === 'Correct', feedback: match[4].trim() }));
  const scan = textAfter(body, '### Reservoir Scan', /\n### Knowledge Check/);
  const lenses = [...scan.matchAll(/\*\*([^*]+) gate\*\*\n\n([^\n]+)/g)].map((match) => ({ id: match[1].toLowerCase(), title: `${match[1]} gate`, body: match[2].trim() }));
  const workbook = textAfter(body, '### Private Apply It Now', /\n### Source Desk/);
  const sources = [...textAfter(body, '### Source Desk', /\n### Root Growth/).matchAll(/- \[([^\]]+)\]\(([^)]+)\)\n  - ([^\n]+)/g)]
    .map((match) => ({ title: match[1], url: match[2], note: match[3] }));
  const growth = textAfter(body, '### Root Growth', /\n### Story transition/);
  return {
    key: body.match(/\*\*Route key:\*\* `([^`]+)`/)?.[1],
    number: lesson[1],
    title: lesson[2].trim(),
    part: Number(part[1]),
    partTitle: part[2].trim(),
    season: body.match(/\*\*Season marker:\*\* ([^\n]+)/)?.[1],
    promise: body.match(/\*\*Lesson promise:\*\* ([^\n]+)/)?.[1],
    sageOpen: body.match(/### Sage opens the path\n\n> \*\*Sage:\*\* “([^”]+)”/)?.[1],
    story: storyLines(body),
    levels: [
      parseLevel(body, 1, /\n### Level 02/),
      parseLevel(body, 2, /\n### Level 03/),
      parseLevel(body, 3, /\n### Reservoir Scan/),
    ],
    lenses,
    check: { prompt: checkLines[0], options: checkOptions },
    drill: { prompt: drill.split('\n\n')[0], setup: drill.split('\n\n')[1], options: optionBlocks(drill, 'Option') },
    mirror: textAfter(body, '### Private Mirror Reflection', /\n### Private Apply It Now/).split('\n\n')[0],
    workbook: {
      title: workbook.match(/^#### ([^\n]+)/)?.[1] || 'Apply it now',
      intro: workbook.split('\n\n')[1] || '',
      prompts: [...workbook.matchAll(/^- ([^:]+): ([^\n]+)/gm)].map((match) => ({ label: match[1], prompt: match[2] })),
    },
    sources,
    growth: {
      capacity: growth.match(/\*\*Capacity statement:\*\* ([^\n]+)/)?.[1] || '',
      truth: growth.split('\n\n').at(-1),
    },
    transition: textAfter(body, '### Story transition', /\n---/).trim(),
  };
});

if (lessons.length !== 22 || lessons.some((lesson) => lesson.lenses.length !== 4 || lesson.check.options.length !== 3 || lesson.drill.options.length !== 3)) {
  throw new Error('Root Four manuscript compilation failed completeness checks.');
}
writeFileSync(new URL('../src/root-four-master-data.json', import.meta.url), `${JSON.stringify(lessons, null, 2)}\n`);
console.log(`Compiled ${lessons.length} locked Root Four lessons.`);
