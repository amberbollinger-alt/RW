import assert from 'node:assert/strict';
import { decisionRootLenses, rootOneRootsData } from '../src/root-one-roots-data.js';
import { normalizeRootOneProgress } from '../src/root-one-progress.js';

const expectedKeys = [
  'money-real',
  'inherited-messages',
  'behavior-not-identity',
  'protective-patterns',
  'triggers',
  'conditions',
  'the-pause',
  'carry-roots',
];

assert.deepEqual(rootOneRootsData.map((lesson) => lesson.key), expectedKeys);

const legacy = {
  activeIndex: 99,
  visited: ['money-real', 'unknown-lesson'],
  completed: ['money-real', 'unknown-lesson'],
  choices: { 'money-real': 'observe' },
  checkAnswers: { 'money-real': 'strength-blindspot' },
  knowledgeAnswers: { 'money-real': { exchange: 'b' } },
  reflections: { 'money-real': 'A reflection that must survive migration.' },
  applicationStatus: { 'money-real': 'completed' },
  unknownFutureField: { keep: true },
};
const migrated = normalizeRootOneProgress(legacy);

assert.equal(migrated.activeIndex, 7);
assert.deepEqual(migrated.visited, ['money-real']);
assert.deepEqual(migrated.completed, ['money-real']);
assert.equal(migrated.choices['money-real'], 'observe');
assert.equal(migrated.checkAnswers['money-real'], 'strength-blindspot');
assert.equal(migrated.knowledgeAnswers['money-real'].exchange, 'b');
assert.equal(migrated.mirrors['money-real'], legacy.reflections['money-real']);
assert.equal(migrated.mirrorStatus['money-real'], 'saved');
assert.equal(migrated.workbookStatus['money-real'], 'saved');
assert.ok(decisionRootLenses.every((lens) => migrated.rootScans['money-real'][lens.id]));
assert.deepEqual(migrated.raw.unknownFutureField, { keep: true });

const corrupt = normalizeRootOneProgress({
  completed: 'money-real',
  visited: null,
  choices: [],
  rootScans: 'invalid',
});
assert.deepEqual(corrupt.completed, []);
assert.deepEqual(corrupt.visited, []);
assert.deepEqual(corrupt.choices, {});
assert.deepEqual(corrupt.rootScans, {});

console.log('Root One progress migration valid: eight stable keys, legacy completion preserved, corrupt fields fail safely.');
