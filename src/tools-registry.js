export const toolCategories = [
  { id: 'borrowing', label: 'Borrowing & Debt', description: 'Make the payment, time, and total claim visible.' },
  { id: 'cash-flow', label: 'Cash Flow & Preparedness', description: 'Place timing, reserves, and irregular costs into view.' },
  { id: 'credit', label: 'Credit', description: 'Examine reported information without treating a score as the person.' },
  { id: 'major-costs', label: 'Major Costs', description: 'Compare the connected costs around a large commitment.' },
  { id: 'decisions', label: 'Decision Tools', description: 'Slow a choice down long enough to see its tradeoffs.' },
  { id: 'dictionary', label: 'Money Dictionary', description: 'Translate financial language into plain, usable meaning.' },
];

const toolDefinitions = [
  { slug: 'debt-cost-calculator', category: 'borrowing', title: 'Debt Cost Calculator', summary: 'Estimate the payment, total repayment, and borrowing cost of a fixed-rate offer.', kind: 'debt-cost', featured: true },
  { slug: 'payment-vs-total-cost', category: 'borrowing', title: 'Payment vs Total Cost Comparator', summary: 'Place two offers side by side without treating the lower payment as the lower price.', kind: 'offer-compare', featured: true },
  { slug: 'minimum-payment-simulator', category: 'borrowing', title: 'Minimum-Payment Simulator', summary: 'Explore how a percentage, floor, extra payment, and new charges can change a payoff path.', kind: 'minimum-payment', featured: true },
  { slug: 'future-income-map', category: 'borrowing', title: 'Future-Income Map', summary: 'Map the monthly claims that have already been placed on future income.', kind: 'future-income' },
  { slug: 'bnpl-calendar', category: 'borrowing', title: 'BNPL Calendar', summary: 'Bring small installment dates into one calendar and one monthly total.', kind: 'bnpl' },
  { slug: 'debt-spiral-simulator', category: 'borrowing', title: 'Debt-Spiral Simulator', summary: 'Test whether continued charges and a chosen payment reduce or expand a revolving balance.', kind: 'debt-spiral' },
  { slug: 'cash-flow-calendar', category: 'cash-flow', title: 'Cash-Flow Calendar', summary: 'Compare the timing of monthly income and bills, not only their totals.', kind: 'cash-flow' },
  { slug: 'irregular-expense-planner', category: 'cash-flow', title: 'Irregular-Expense Planner', summary: 'Translate a nonmonthly expense into a monthly planning amount.', kind: 'irregular' },
  { slug: 'reserve-sinking-fund-planner', category: 'cash-flow', title: 'Reserve / Sinking-Fund Planner', summary: 'Estimate the monthly amount needed to reach a reserve target by a chosen month.', kind: 'reserve' },
  { slug: 'credit-utilization-explorer', category: 'credit', title: 'Credit Utilization Explorer', summary: 'See the relationship between a reported revolving balance and its credit limit.', kind: 'utilization' },
  { slug: 'credit-report-review-checklist', category: 'credit', title: 'Credit Report Review Checklist', summary: 'Use a structured review list without entering account numbers or other identifiers.', kind: 'checklist' },
  { slug: 'approval-vs-affordability', category: 'credit', title: 'Approval vs Affordability', summary: 'Place an approved payment into the household cash-flow picture.', kind: 'affordability' },
  { slug: 'total-transportation-cost', category: 'major-costs', title: 'Total Transportation Cost', summary: 'Combine payment, insurance, fuel, maintenance, parking, and other transportation costs.', kind: 'transportation' },
  { slug: 'housing-cost-comparison', category: 'major-costs', title: 'Housing Cost Comparison', summary: 'Compare two housing choices using their visible monthly and upfront costs.', kind: 'housing' },
  { slug: 'education-cost-map', category: 'major-costs', title: 'Education Cost Map', summary: 'Place tuition, supplies, living costs, aid, and borrowing into one estimate.', kind: 'education' },
  { slug: 'present-benefit-future-claim', category: 'decisions', title: 'Present-Benefit / Future-Claim Comparison', summary: 'Compare what becomes available now with the total future claim created.', kind: 'future-claim' },
  { slug: 'rootwise-decision-map', category: 'decisions', title: 'RootWise Decision Map', summary: 'Work through understanding, recognition, and examination before recording a next question.', kind: 'decision-map' },
  { slug: 'dictionary', category: 'dictionary', title: 'Money Dictionary', summary: 'Search plain-language financial definitions and return to a connected lesson.', kind: 'dictionary', route: '/tools/dictionary' },
];

export const toolRegistry = toolDefinitions.map((tool) => ({
  ...tool,
  id: `rootwise-${tool.slug}`,
  description: tool.summary,
  status: 'published',
  relatedRoots: ['borrowing', 'credit', 'major-costs'].includes(tool.category) ? [5] : tool.category === 'cash-flow' ? [3, 4] : [1, 5],
}));

export function toolRoute(tool) {
  const route = tool.route || `/tools/${tool.slug}`;
  const from = typeof globalThis.location === 'object' ? new URLSearchParams(globalThis.location.search).get('from') : '';
  return from?.startsWith('/roots/') ? `${route}?from=${encodeURIComponent(from)}` : route;
}
export function getTool(slug) { return toolRegistry.find((tool) => tool.slug === slug); }
