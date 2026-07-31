import { readFile } from 'node:fs/promises';
import { ROOT_CATALOG } from '../src/root-catalog.js';
import {
  createRootRegistry, extractRootFiveLessonIndex, rootActionForProgress, validateRootRegistry,
} from '../src/root-registry-core.js';
import { routeFromPath } from '../src/root-routing.js';
import { rootOneRootsData } from '../src/root-one-roots-data.js';
import { ROOT_TWO_PROGRESS_KEY, rootTwoDistricts, rootTwoScanLenses } from '../src/root-two-data.js';
import { rootThreeRootsData } from '../src/root-three-roots-data.js';
import { rootFourRootsData } from '../src/root-four-roots-data.js';
import { rootSixLessons } from '../src/root-six-data.js';
import { rootSevenLessons } from '../src/root-seven-data.js';

const rootFiveCanon = await readFile(new URL('../src/root-five-canon.md', import.meta.url), 'utf8');
const rootTwoLessons = rootTwoDistricts.flatMap((district) => district.lessons).map((lesson, index) => ({
  id: lesson.slug, slug: lesson.slug, order: index + 1, number: lesson.number, title: lesson.title, published: true,
}));
const registry = createRootRegistry(ROOT_CATALOG, {
  one: rootOneRootsData.map((lesson, index) => ({ id: lesson.key, order: index + 1, title: lesson.title, published: true })),
  two: rootTwoLessons,
  three: rootThreeRootsData.map((lesson, index) => ({ id: lesson.key, order: index + 1, title: lesson.title, published: true })),
  four: rootFourRootsData.map((lesson, index) => ({ id: lesson.key, order: index + 1, title: lesson.shortTitle, published: true })),
  five: extractRootFiveLessonIndex(rootFiveCanon),
  six: rootSixLessons.map((lesson) => ({ id: lesson.key, order: lesson.number, number: lesson.displayNumber, title: lesson.title, published: true })),
  seven: rootSevenLessons.map((lesson) => ({ id: lesson.key, order: lesson.number, number: lesson.displayNumber, title: lesson.title, published: true })),
});

const errors = validateRootRegistry(registry);
const seenRootTwoSlugs = new Set();
for (const [index, lesson] of rootTwoDistricts.flatMap((district) => district.lessons).entries()) {
  if (!lesson.slug || seenRootTwoSlugs.has(lesson.slug)) errors.push(`Root Two lesson ${index + 1} has a missing or duplicate slug.`);
  seenRootTwoSlugs.add(lesson.slug);
  if (lesson.number !== rootTwoLessons[index].number) errors.push(`Root Two lesson numbering drifted at ${lesson.title}.`);
  if (!lesson.understand?.body || !lesson.recognize?.body || !lesson.examine?.body) errors.push(`Root Two ${lesson.title} is missing an adult learning layer.`);
  if (lesson.scanPrompts?.length !== rootTwoScanLenses.length || new Set(lesson.scanPrompts?.map((lens) => lens.id)).size !== 4) errors.push(`Root Two ${lesson.title} does not have four unique Exchange Scan lenses.`);
  if (lesson.check?.options?.filter((option) => option.isCorrect).length !== 1) errors.push(`Root Two ${lesson.title} needs exactly one knowledge-check answer.`);
  if (lesson.decisionDrill?.options?.length < 3 || lesson.decisionDrill.options.filter((option) => option.strength === 'strong').length !== 1) errors.push(`Root Two ${lesson.title} has an invalid decision drill.`);
  if (!lesson.workbook?.prompt || !lesson.mirrorPrompt || !lesson.growthStatement || !lesson.sources?.length || !lesson.transition) errors.push(`Root Two ${lesson.title} is missing a required experience field.`);
}
if (rootTwoLessons.length !== 54) errors.push(`Root Two must preserve 54 lessons; found ${rootTwoLessons.length}.`);
if (ROOT_TWO_PROGRESS_KEY !== 'rootwise_root_two_exchange_progress_v1') errors.push('Root Two canonical progress key changed unexpectedly.');
if (!rootTwoDistricts.flatMap((district) => district.lessons).at(-1)?.transition.includes('Root Three')) errors.push('Root Two final transition must lead to Root Three.');
for (const root of registry) {
  for (const lesson of root.lessons.filter((item) => item.published)) {
    const resolved = routeFromPath(lesson.route);
    if (resolved !== `root-lesson:${root.slug}:${lesson.slug}`) errors.push(`Lesson route does not resolve: ${lesson.route}.`);
  }
  if (routeFromPath(root.overviewRoute) !== `root-overview:${root.slug}`) errors.push(`Root overview does not resolve: ${root.overviewRoute}.`);
}

for (const root of registry.filter((item) => item.lessons.length)) {
  const empty = { started: false, complete: false, completedIds: [], activeOrder: 1 };
  const start = rootActionForProgress(root, empty);
  if (start?.href !== root.lessons[0].route || start?.kind !== 'start') errors.push(`${root.label} Start Root does not resolve to its first lesson.`);
  const firstComplete = { started: true, complete: false, completedIds: [root.lessons[0].id], activeOrder: 1 };
  const next = rootActionForProgress(root, firstComplete);
  if (root.lessons.length > 1 && next?.href !== root.lessons[1].route) errors.push(`${root.label} Continue Root does not resolve to an incomplete lesson.`);
  const complete = { started: true, complete: true, completedIds: root.lessons.map((lesson) => lesson.id), activeOrder: root.lessons.length };
  const review = rootActionForProgress(root, complete);
  if (review?.href !== root.overviewRoute || review?.kind !== 'review') errors.push(`${root.label} Review Root does not resolve to the overview.`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  const lessonCount = registry.reduce((total, root) => total + root.lessons.length, 0);
  console.log(`Root registry valid: ${registry.length} Roots, ${lessonCount} published lesson routes.`);
}
