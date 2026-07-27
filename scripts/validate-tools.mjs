import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { moneyDictionary } from '../src/money-dictionary-data.js';
import { slugify } from '../src/root-registry-core.js';
import {
  debtCost, futureClaim, monthlyEquivalent, monthlyReserve, paymentForLoan,
  simulateBalance, TOOL_DISCLAIMER, utilization,
} from '../src/tools-calculations.js';
import { toolCategories, toolRegistry, toolRoute } from '../src/tools-registry.js';

assert.equal(TOOL_DISCLAIMER, 'Educational estimate. Actual terms, calculations, and outcomes may differ.');
assert.equal(paymentForLoan(1000, 0, 10), 100);
assert.ok(Math.abs(paymentForLoan(12000, 12, 48) - 316.01) < 0.02);

const financedFees = debtCost({ principal: 1000, annualRate: 0, months: 10, fees: 100, feeTreatment: 'financed' });
assert.equal(financedFees.financed, 1100);
assert.equal(financedFees.payment, 110);
assert.equal(financedFees.repayment, 1100);
assert.equal(financedFees.borrowingCost, 100);

const upfrontFees = debtCost({ principal: 1000, annualRate: 0, months: 10, fees: 100, feeTreatment: 'upfront' });
assert.equal(upfrontFees.financed, 1000);
assert.equal(upfrontFees.payment, 100);
assert.equal(upfrontFees.repayment, 1100);

const payoff = simulateBalance({ balance: 1000, annualRate: 0, payment: 100 });
assert.equal(payoff.payoff, true);
assert.equal(payoff.months, 10);
assert.equal(payoff.paid, 1000);

const negativeAmortization = simulateBalance({ balance: 1000, annualRate: 24, payment: 10 });
assert.equal(negativeAmortization.payoff, false);
assert.match(negativeAmortization.reason, /does not reduce/);

const continuedCharges = simulateBalance({ balance: 1000, annualRate: 0, payment: 50, monthlyCharge: 50 });
assert.equal(continuedCharges.payoff, false);

const minimum = simulateBalance({ balance: 1000, annualRate: 0, mode: 'minimum', percent: 2, floor: 100, extra: 0 });
assert.equal(minimum.payoff, true);
assert.equal(minimum.months, 10);

assert.deepEqual(utilization(300, 1000), { ratio: 30, available: 700 });
assert.deepEqual(utilization(300, 0), { ratio: null, available: 0 });
assert.deepEqual(monthlyReserve(1200, 0, 12), { remaining: 1200, monthly: 100 });
assert.equal(monthlyEquivalent(1200, 'yearly'), 100);
assert.deepEqual(futureClaim({ benefit: 1000, payment: 100, months: 12, fees: 25 }), { benefit: 1000, totalClaim: 1225, difference: 225 });

const slugs = toolRegistry.map((tool) => tool.slug);
assert.equal(new Set(slugs).size, slugs.length, 'Tool slugs must be unique.');
assert.equal(toolRegistry.length, 18, 'Every approved Tools Center surface must be registered.');
assert.ok(toolRegistry.every((tool) => tool.title && tool.summary && tool.kind && tool.category));
assert.ok(toolRegistry.every((tool) => tool.id && tool.description && tool.status === 'published' && tool.relatedRoots.length));
assert.ok(toolRegistry.every((tool) => toolCategories.some((category) => category.id === tool.category)));
assert.ok(toolRegistry.every((tool) => toolRoute(tool).startsWith('/tools')));
assert.equal(toolRegistry.filter((tool) => tool.kind === 'dictionary').length, 1);

const terms = moneyDictionary.map((entry) => entry.term);
assert.equal(new Set(terms).size, terms.length, 'Dictionary terms must be unique.');
assert.deepEqual(terms, [...terms].sort((a, b) => a.localeCompare(b)), 'Dictionary must remain alphabetical.');
assert.ok(moneyDictionary.every((entry) => entry.term && entry.topic && entry.definition));
const rootFiveCanon = readFileSync(new URL('../src/root-five-canon.md', import.meta.url), 'utf8');
const rootFiveRoutes = new Set([...rootFiveCanon.matchAll(/^# LESSON[^\n]*\r?\n\r?\n##\s+(.+)$/gm)].map((match) => `/roots/five/lessons/${slugify(match[1])}`));
assert.equal(rootFiveRoutes.size, 38, 'Root Five lesson-route index must stay complete.');
assert.ok(moneyDictionary.every((entry) => !entry.lesson || rootFiveRoutes.has(entry.lesson)), 'Every dictionary lesson link must resolve to a canonical Root Five route.');

console.log(`Validated ${toolRegistry.length} tools, ${moneyDictionary.length} dictionary entries, and calculation edge cases.`);
