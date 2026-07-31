import {
  ROOT_TWO_LEGACY_PROGRESS_KEYS, ROOT_TWO_PROGRESS_KEY, rootTwoDistricts,
  rootTwoLessons, rootTwoOpening, rootTwoScanLenses,
} from '../src/root-two-data.js';
import { readFile } from 'node:fs/promises';

const errors = [];
const slugs = new Set();

if (rootTwoDistricts.length !== 12) errors.push(`Expected 12 Exchange District sections; found ${rootTwoDistricts.length}.`);
if (rootTwoLessons.length !== 54) errors.push(`Expected 54 approved Root Two lessons; found ${rootTwoLessons.length}.`);
if (ROOT_TWO_PROGRESS_KEY !== 'rootwise_root_two_exchange_progress_v1') errors.push('Canonical Root Two progress key changed.');
if (!ROOT_TWO_LEGACY_PROGRESS_KEYS.includes('rootwise_root_two_journey_v4') || !ROOT_TWO_LEGACY_PROGRESS_KEYS.includes('rootwise_root_two_journey_v3')) errors.push('Legacy Root Two migration keys are incomplete.');
if (rootTwoScanLenses.map((lens) => lens.id).join('|') !== 'work|result|conditions|complete-exchange') errors.push('Exchange Scan lens identity or order changed.');
if (!rootTwoOpening.story.some((beat) => beat.speaker === 'Nicole') || !rootTwoOpening.story.some((beat) => beat.text.includes('laundress'))) errors.push('The approved opening repair sequence is incomplete.');

for (const [index, lesson] of rootTwoLessons.entries()) {
  if (!lesson.slug || slugs.has(lesson.slug)) errors.push(`Lesson ${index + 1} has a missing or duplicate slug.`);
  slugs.add(lesson.slug);
  if (lesson.story.length < 5) errors.push(`${lesson.slug} shortened the cumulative story.`);
  if (!lesson.story.some((beat) => ['Ivy', 'Eli', 'Sage'].includes(beat.speaker))) errors.push(`${lesson.slug} lost the learner-mirror characters.`);
  if (!lesson.understand?.body || !lesson.recognize?.body || !lesson.examine?.body) errors.push(`${lesson.slug} is missing an adult learning layer.`);
  if (lesson.scanPrompts?.length !== 4 || new Set(lesson.scanPrompts.map((lens) => lens.id)).size !== 4) errors.push(`${lesson.slug} has an invalid Exchange Scan.`);
  if (lesson.check.options.filter((option) => option.isCorrect).length !== 1) errors.push(`${lesson.slug} has an invalid knowledge check.`);
  const strong = lesson.decisionDrill.options.filter((option) => option.strength === 'strong');
  if (lesson.decisionDrill.options.length < 3 || strong.length !== 1) errors.push(`${lesson.slug} has an invalid decision drill.`);
  if (strong[0] && strong[0].label.length === Math.max(...lesson.decisionDrill.options.map((option) => option.label.length))) errors.push(`${lesson.slug} signals the strong drill answer only by length.`);
  if (!lesson.mirrorPrompt || !lesson.workbook?.prompt || !lesson.growthStatement.startsWith('I can ') || !lesson.sources?.length || !lesson.transition) errors.push(`${lesson.slug} is missing a required application field.`);
}

if (!rootTwoLessons.at(-1)?.transition.includes('Root Three')) errors.push('The final Root Two transition does not name Root Three.');

const componentSource = await readFile(new URL('../src/root-two-city.jsx', import.meta.url), 'utf8');
const sageSource = await readFile(new URL('../api/sage.js', import.meta.url), 'utf8');
if (!componentSource.includes("root: 'two'") || !componentSource.includes('lesson: { title: lesson.title, story:')) errors.push('Ask Sage does not send the complete Root Two lesson context.');
if (!componentSource.includes("go('/roots/three')")) errors.push('The Root Two UI does not route to Root Three.');
if (!componentSource.includes('event.key === \'Escape\'') || !componentSource.includes("event.key !== 'Tab'")) errors.push('Root Two drawer and dialog keyboard handling is incomplete.');
if (!sageSource.includes('function buildRootTwoInstructions') || !sageSource.includes('Never assign a dollar value to the learner')) errors.push('Root Two Sage boundaries are incomplete.');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Root Two revamp valid: ${rootTwoLessons.length} lessons, ${slugs.size} stable slugs, complete Exchange Scan and lesson-loop fields.`);
}
