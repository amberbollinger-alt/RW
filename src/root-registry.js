import { ROOT_CATALOG, ROOT_GROUPS } from './root-catalog';
import { createRootRegistry, rootActionForProgress, validateRootRegistry } from './root-registry-core';
import { rootOneIntroduction, rootOneRootsData } from './root-one-roots-data';
import { rootTwoDistricts } from './root-two-data';
import { rootThreeRootsData } from './root-three-roots-data';
import { rootFourRootsData } from './root-four-roots-data';
import { rootFiveLessons, rootFiveOpening } from './root-five-data';
import { rootSixLessons, rootSixOpening } from './root-six-data';
import { rootSevenLessons, rootSevenOpening } from './root-seven-data';

const rootTwoLessons = rootTwoDistricts.flatMap((district) => district.lessons.map((lesson) => ({
  id: lesson.progressKey,
  order: 0,
  number: lesson.number,
  title: lesson.title,
  group: district.title,
  sourceChapterIndex: lesson.sourceChapterIndex,
  sourceLessonIndex: lesson.sourceLessonIndex,
  published: true,
})));
rootTwoLessons.forEach((lesson, index) => { lesson.order = index + 1; });

const lessonSources = {
  one: rootOneRootsData.map((lesson, index) => ({ id: lesson.key, order: index + 1, number: lesson.number, title: lesson.title, group: lesson.theme, published: true })),
  two: rootTwoLessons,
  three: rootThreeRootsData.map((lesson, index) => ({ id: lesson.key, order: index + 1, number: lesson.number, title: lesson.title, group: lesson.theme, published: true })),
  four: rootFourRootsData.map((lesson, index) => ({ id: lesson.key, order: index + 1, number: lesson.number, title: lesson.shortTitle, group: lesson.season, published: true })),
  five: rootFiveLessons.map((lesson) => ({ id: lesson.key, order: lesson.number, number: lesson.displayNumber, title: lesson.title, group: `Part ${lesson.part.number} · ${lesson.part.title}`, published: true })),
  six: rootSixLessons.map((lesson) => ({ id: lesson.key, order: lesson.number, number: lesson.displayNumber, title: lesson.title, group: `Part ${lesson.part.number} · ${lesson.part.title}`, published: true })),
  seven: rootSevenLessons.map((lesson) => ({ id: lesson.key, order: lesson.number, number: lesson.displayNumber, title: lesson.title, group: `Part ${lesson.part.number} · ${lesson.part.title}`, published: true })),
};

const progressKeys = {
  one: ['rootwise_root_one_city_progress'],
  two: ['rootwise_root_two_journey_v4', 'rootwise_root_two_journey_v3'],
  three: ['rootwise_root_three_city_progress_v2'],
  four: ['rootwise_root_four_reservoir_progress_v2'],
  five: ['rootwise_root_five_bridge_progress_v1'],
  six: ['rootwise_root_six_harbor_progress_v1'],
  seven: ['rootwise_root_seven_opportunity_progress_v1'],
};

const registry = createRootRegistry(ROOT_CATALOG, lessonSources, {
  one: rootOneIntroduction.question,
  five: rootFiveOpening.coreQuestion,
  six: rootSixOpening.coreQuestion,
  seven: rootSevenOpening.coreQuestion,
});

export const rootRegistry = Object.freeze(registry.map((root) => Object.freeze({
  ...root,
  progressKeys: Object.freeze(progressKeys[root.slug] || []),
})));

export { ROOT_GROUPS, rootActionForProgress };

const registryErrors = validateRootRegistry(rootRegistry);
if (registryErrors.length) throw new Error(`Invalid RootWise Root registry:\n${registryErrors.join('\n')}`);

export function getRootBySlug(slug) {
  return rootRegistry.find((root) => root.slug === slug) || null;
}

export function getLessonBySlug(root, slug) {
  return root?.lessons.find((lesson) => lesson.slug === slug && lesson.published) || null;
}

export function getLessonById(root, id) {
  return root?.lessons.find((lesson) => lesson.id === id && lesson.published) || null;
}

function safeRecord(raw) {
  try {
    const parsed = JSON.parse(raw || '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function hasProgress(record) {
  return Array.isArray(record.completed) && record.completed.length > 0
    || Array.isArray(record.visited) && record.visited.length > 0
    || Number.isInteger(record.activeIndex) && record.activeIndex > 0
    || Number.isInteger(record.chapter)
    || Object.values(record).some((value) => value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0);
}

export function readRootProgress(root, storage = globalThis.localStorage) {
  if (!root?.lessons.length || !storage) {
    return {
      status: root?.status === 'published' ? 'Not started' : 'In development',
      started: false,
      complete: false,
      completedIds: [],
      completedCount: 0,
      totalCount: root?.lessonCount || 0,
      activeOrder: 1,
      percent: 0,
    };
  }

  const records = root.progressKeys.map((key) => safeRecord(storage.getItem(key)));
  const validIds = new Set(root.lessons.map((lesson) => lesson.id));
  const completedIds = [...new Set(records.flatMap((record) => Array.isArray(record.completed) ? record.completed : []))]
    .filter((id) => validIds.has(id));
  const primary = records.find(hasProgress) || records[0] || {};
  let activeOrder = Number.isInteger(primary.activeIndex) ? primary.activeIndex + 1 : 1;

  if (root.slug === 'two') {
    const activeLesson = root.lessons.find((lesson) => lesson.sourceChapterIndex === primary.chapter && lesson.sourceLessonIndex === primary.lesson);
    activeOrder = activeLesson?.order || 1;
  }

  const started = records.some(hasProgress);
  const complete = root.lessonCount > 0 && completedIds.length === root.lessonCount;
  const status = complete ? 'Complete' : started ? 'In progress' : 'Not started';
  return {
    status,
    started,
    complete,
    completedIds,
    completedCount: completedIds.length,
    totalCount: root.lessonCount,
    activeOrder,
    percent: root.lessonCount ? Math.round(completedIds.length / root.lessonCount * 100) : 0,
  };
}

export function readGroveProgress(storage = globalThis.localStorage) {
  return rootRegistry.map((root) => ({ root, progress: readRootProgress(root, storage) }));
}

export function findJourneyContinuation(entries) {
  const published = entries.filter(({ root }) => root.status === 'published' && root.lessonCount > 0);
  const current = published.find(({ progress }) => progress.started && !progress.complete)
    || published.find(({ progress }) => !progress.started)
    || published[0];
  if (!current) return null;
  return { ...current, action: rootActionForProgress(current.root, current.progress) };
}
