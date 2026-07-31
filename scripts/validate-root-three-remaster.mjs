import {
  currentLenses,
  rootThreeLessons,
  rootThreeOpening,
  rootThreeParts,
} from '../src/root-three-data.js';

const errors = [];
const fail = (condition, message) => {
  if (!condition) errors.push(message);
};

fail(rootThreeOpening.title === 'Choice, Cash Flow & Spending', 'Root Three title changed.');
fail(
  rootThreeOpening.coreQuestion === 'Where is my money going, what is influencing those choices, and what do those choices make possible—or remove?',
  'Root Three core question changed.',
);
fail(rootThreeOpening.story.length >= 15, 'Opening story is too short to carry the emotional hook.');
fail(rootThreeLessons.length === 24, `Expected 24 bite-sized lessons; found ${rootThreeLessons.length}.`);
fail(currentLenses.length === 4, 'The Current Scan must retain four lenses.');

const keys = new Set();
const sourceHosts = new Set(['www.consumerfinance.gov', 'files.consumerfinance.gov', 'www.fdic.gov', 'ncua.gov', 'consumer.ftc.gov', 'www.ftc.gov']);

rootThreeLessons.forEach((lesson, index) => {
  const prefix = `Lesson ${index + 1} (${lesson?.key || 'missing-key'})`;
  fail(lesson.number === index + 1, `${prefix}: lesson number is not sequential.`);
  fail(Boolean(lesson.key) && !keys.has(lesson.key), `${prefix}: key is missing or duplicated.`);
  keys.add(lesson.key);
  fail(Boolean(lesson.displayNumber), `${prefix}: display number is missing.`);
  fail(Boolean(lesson.title) && Boolean(lesson.promise) && Boolean(lesson.stage), `${prefix}: title, promise, or stage is missing.`);
  fail(Array.isArray(lesson.story) && lesson.story.length >= 8, `${prefix}: story must contain at least eight beats.`);
  fail(lesson.story?.some((beat) => beat.type === 'dialogue'), `${prefix}: story needs character dialogue.`);
  fail(lesson.story?.some((beat) => beat.type === 'sage'), `${prefix}: story needs Sage narration.`);
  fail(Array.isArray(lesson.understand) && lesson.understand.length >= 4, `${prefix}: Understand layer is incomplete.`);
  fail(Array.isArray(lesson.recognize) && lesson.recognize.length >= 4, `${prefix}: Recognize layer is incomplete.`);
  fail(Array.isArray(lesson.examine) && lesson.examine.length >= 4, `${prefix}: Examine layer is incomplete.`);
  fail(lesson.check?.options?.filter((option) => option.isCorrect).length === 1, `${prefix}: knowledge check must have exactly one correct option.`);
  fail(lesson.scenario?.options?.some((option) => option.strength === 'strong'), `${prefix}: decision drill needs a strong option.`);
  fail(Boolean(lesson.mirror), `${prefix}: mirror reflection is missing.`);
  fail(Boolean(lesson.workbook) && Boolean(lesson.workbookPrompt), `${prefix}: workbook application is missing.`);
  fail(Boolean(lesson.growth) && Boolean(lesson.transition), `${prefix}: growth or transition copy is missing.`);
  fail(Array.isArray(lesson.sources) && lesson.sources.length > 0, `${prefix}: source desk is empty.`);
  lesson.sources?.forEach((source) => {
    let host = '';
    try { host = new URL(source.url).host; } catch { errors.push(`${prefix}: invalid source URL ${source.url}`); }
    fail(sourceHosts.has(host), `${prefix}: source is not an approved primary authority (${host || source.url}).`);
  });
});

const partKeys = rootThreeParts.flatMap((part) => part.lessonKeys);
fail(partKeys.length === rootThreeLessons.length, 'Part navigation does not include all lessons.');
fail(partKeys.every((key, index) => key === rootThreeLessons[index].key), 'Part navigation order differs from lesson order.');
fail(rootThreeLessons.some((lesson) => lesson.key === 'group-chat-tax'), 'Belonging and social-pressure lesson is missing.');
fail(rootThreeLessons.some((lesson) => lesson.key === 'math-refuses'), 'Insufficient-income diagnosis lesson is missing.');
fail(rootThreeLessons.some((lesson) => lesson.key === 'shame-bookkeeper'), 'Shame and repair lesson is missing.');
fail(rootThreeLessons.at(-1)?.transition.includes('Root Four'), 'Final lesson must transition to Root Four.');

if (errors.length) {
  console.error(`Root Three remaster validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exit(1);
}

console.log(`Root Three remaster validated: ${rootThreeLessons.length} lessons, ${rootThreeParts.length} parts, ${new Set(rootThreeLessons.flatMap((lesson) => lesson.sources.map((source) => source.url))).size} primary source links.`);
