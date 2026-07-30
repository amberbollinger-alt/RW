import { decisionRootLenses, rootOneRootsData } from './root-one-roots-data.js';

const COMPLETE_STATES = new Set(['saved', 'skipped', 'completed']);
const ALL_LENSES = decisionRootLenses.map((lens) => lens.id);

export function safeRecord(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

export function safeString(value) {
  return typeof value === 'string' ? value : '';
}

export function normalizeRootOneProgress(input) {
  const raw = safeRecord(input);
  const validKeys = new Set(rootOneRootsData.map((lesson) => lesson.key));
  const completed = Array.isArray(raw.completed) ? raw.completed.filter((key) => validKeys.has(key)) : [];
  const visited = Array.isArray(raw.visited) ? raw.visited.filter((key) => validKeys.has(key)) : [];
  const choices = safeRecord(raw.choices);
  const checkAnswers = safeRecord(raw.checkAnswers);
  const knowledgeAnswers = safeRecord(raw.knowledgeAnswers);
  const reflections = safeRecord(raw.reflections);
  const applicationStatus = safeRecord(raw.applicationStatus);
  const rootScans = { ...safeRecord(raw.rootScans) };
  const mirrors = { ...safeRecord(raw.mirrors) };
  const mirrorStatus = { ...safeRecord(raw.mirrorStatus) };
  const workbooks = { ...safeRecord(raw.workbooks) };
  const workbookStatus = { ...safeRecord(raw.workbookStatus) };

  for (const key of validKeys) {
    if (!mirrors[key] && safeString(reflections[key])) mirrors[key] = reflections[key];
  }

  for (const key of completed) {
    rootScans[key] = Object.fromEntries(ALL_LENSES.map((lensId) => [lensId, true]));
    if (!COMPLETE_STATES.has(mirrorStatus[key])) {
      mirrorStatus[key] = safeString(mirrors[key]).trim() ? 'saved' : 'skipped';
    }
    if (!COMPLETE_STATES.has(workbookStatus[key])) {
      const legacyStatus = applicationStatus[key];
      workbookStatus[key] = legacyStatus === 'completed' || safeString(workbooks[key]).trim() ? 'saved' : 'skipped';
    }
  }

  return {
    raw,
    activeIndex: Number.isInteger(raw.activeIndex)
      ? Math.max(0, Math.min(raw.activeIndex, rootOneRootsData.length - 1))
      : 0,
    visited,
    completed,
    choices,
    checkAnswers,
    knowledgeAnswers,
    reflections,
    applicationStatus,
    rootScans,
    mirrors,
    mirrorStatus,
    workbooks,
    workbookStatus,
    openingChoice: safeString(raw.openingChoice),
  };
}
