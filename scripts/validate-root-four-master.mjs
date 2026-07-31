import lessons from '../src/root-four-master-data.json' with { type: 'json' };

const errors = [];
if (lessons.length !== 22) errors.push(`Expected 22 lessons, found ${lessons.length}.`);
lessons.forEach((lesson, index) => {
  const expected = `reserve-${index + 1}`;
  if (lesson.key !== expected) errors.push(`Lesson ${index + 1}: expected key ${expected}, found ${lesson.key}.`);
  if (!lesson.story.length) errors.push(`${expected}: missing story.`);
  if (lesson.levels.length !== 3) errors.push(`${expected}: missing adult learning level.`);
  if (lesson.lenses.length !== 4) errors.push(`${expected}: missing Reservoir Scan gate.`);
  if (lesson.check.options.length !== 3 || lesson.check.options.filter((item) => item.isCorrect).length !== 1) errors.push(`${expected}: invalid knowledge check.`);
  if (lesson.drill.options.length !== 3) errors.push(`${expected}: invalid decision drill.`);
  if (!lesson.mirror || !lesson.workbook.title || !lesson.sources.length || !lesson.growth.capacity || !lesson.transition) errors.push(`${expected}: incomplete lesson loop.`);
});
const requiredLines = [
  'I saved for a future she is not in.',
  'I can love you without lying for you.',
  'The worst part of losing her job was the relief.',
  'The reservoir was never supposed to keep your mother alive.',
];
const payload = JSON.stringify(lessons);
requiredLines.forEach((line) => { if (!payload.includes(line)) errors.push(`Missing locked line: ${line}`); });
if (errors.length) throw new Error(`Root Four validation failed:\n${errors.join('\n')}`);
console.log('Root Four master valid: 22 lessons, locked story spine, and complete lesson loops.');
