const dictionaryDefinitions = [
  { term: 'Annual percentage rate (APR)', topic: 'Borrowing', definition: 'A yearly measure of the price of borrowing that includes the interest rate and certain additional loan fees. The exact charges included depend on the credit product and required disclosures.', lesson: '/roots/five/lessons/interest-rates-and-apr', lessonLabel: 'Root Five · Interest Rates and APR' },
  { term: 'Available credit', topic: 'Credit', definition: 'The unused part of a revolving credit limit: the limit minus the current balance, subject to pending activity and the issuer’s records.', lesson: '/roots/five/lessons/utilization-and-available-credit', lessonLabel: 'Root Five · Utilization and Available Credit' },
  { term: 'Balance', topic: 'Borrowing', definition: 'The amount currently shown as owed on an account. A payoff amount can differ because of interest, fees, pending activity, or timing.' },
  { term: 'Buy now, pay later (BNPL)', topic: 'Borrowing', definition: 'An arrangement that divides a purchase into scheduled payments. Several small plans can overlap and create a larger combined claim on the same pay period.', lesson: '/roots/five/lessons/buy-now-pay-later-and-point-of-sale-financing', lessonLabel: 'Root Five · Buy Now, Pay Later' },
  { term: 'Cash flow', topic: 'Cash Flow', definition: 'The amount and timing of money entering and leaving. A month can have enough money in total and still have a timing gap.' },
  { term: 'Collateral', topic: 'Borrowing', definition: 'Property connected to a secured debt that may be taken under the agreement and applicable law if the obligation is not met.' },
  { term: 'Compound interest', topic: 'Borrowing', definition: 'Interest calculated on a balance that can include earlier interest. The frequency and method depend on the account terms.' },
  { term: 'Cosigner', topic: 'Borrowing', definition: 'A person who agrees to be legally responsible for a debt with or for another borrower. Cosigning is an obligation, not a character reference.', lesson: '/roots/five/lessons/cosigning', lessonLabel: 'Root Five · Cosigning' },
  { term: 'Credit limit', topic: 'Credit', definition: 'The maximum revolving amount an issuer currently permits on an account. It can change under the account terms and applicable law.' },
  { term: 'Credit report', topic: 'Credit', definition: 'A record assembled by a consumer reporting company from information it receives about accounts, inquiries, identifying information, and certain public records.', lesson: '/roots/five/lessons/credit-reports', lessonLabel: 'Root Five · Credit Reports' },
  { term: 'Credit score', topic: 'Credit', definition: 'A number produced by a scoring model from information in a credit report. Different models, report data, and timing can produce different scores.', lesson: '/roots/five/lessons/credit-scores', lessonLabel: 'Root Five · Credit Scores' },
  { term: 'Credit utilization', topic: 'Credit', definition: 'A comparison between a reported revolving balance and the applicable credit limit, usually expressed as a percentage. Reporting timing matters.', lesson: '/roots/five/lessons/utilization-and-available-credit', lessonLabel: 'Root Five · Utilization and Available Credit' },
  { term: 'Debt', topic: 'Borrowing', definition: 'An obligation to repay money or value under agreed terms.' },
  { term: 'Default', topic: 'Borrowing', definition: 'Failure to meet an obligation as defined by the agreement. The consequences depend on the product, terms, and applicable law.' },
  { term: 'Delinquency', topic: 'Credit', definition: 'A payment status showing that an amount was not paid by its due date. Reporting and consequences depend on timing and account terms.' },
  { term: 'Depreciation', topic: 'Major Costs', definition: 'A decrease in an asset’s value over time. It can be part of the real economic cost even when it is not a monthly bill.' },
  { term: 'Discretionary expense', topic: 'Cash Flow', definition: 'A cost that has more room for timing, amount, or choice than a fixed obligation, even though it may still matter to the household.' },
  { term: 'Emergency reserve', topic: 'Cash Flow', definition: 'Money set aside to absorb an unexpected cost or income interruption. The useful amount depends on the household’s own risks and obligations.' },
  { term: 'Fixed interest rate', topic: 'Borrowing', definition: 'An interest rate that does not change during the fixed period described by the agreement.' },
  { term: 'Grace period', topic: 'Borrowing', definition: 'A period in which a payment or interest treatment may differ if stated conditions are met. The details come from the agreement.' },
  { term: 'Gross income', topic: 'Income', definition: 'Income before taxes and other deductions.' },
  { term: 'Installment credit', topic: 'Borrowing', definition: 'Credit generally repaid through scheduled payments over a defined term, such as many auto or personal loans.' },
  { term: 'Interest', topic: 'Borrowing', definition: 'A price charged for the use of borrowed money, calculated according to the account’s rate and method.' },
  { term: 'Interest rate', topic: 'Borrowing', definition: 'The percentage used to calculate interest. It is not always the same as APR because APR can include certain fees.' },
  { term: 'Irregular expense', topic: 'Cash Flow', definition: 'A cost that does not arrive in the same amount every month, such as annual registration, seasonal utilities, or periodic repairs.' },
  { term: 'Minimum payment', topic: 'Borrowing', definition: 'The smallest payment required for a billing cycle under the account terms. Paying only that amount can extend repayment, and new charges can change the path.', lesson: '/roots/five/lessons/minimum-payments', lessonLabel: 'Root Five · Minimum Payments' },
  { term: 'Net income', topic: 'Income', definition: 'Income remaining after taxes and other deductions—the amount more closely connected to usable cash flow.' },
  { term: 'Principal', topic: 'Borrowing', definition: 'The amount borrowed or the remaining amount on which interest may be calculated, depending on the product.' },
  { term: 'Revolving credit', topic: 'Credit', definition: 'Open-ended credit that can generally be used, repaid, and used again up to an available limit, subject to the agreement.' },
  { term: 'Secured debt', topic: 'Borrowing', definition: 'Debt connected to collateral.' },
  { term: 'Sinking fund', topic: 'Cash Flow', definition: 'Money accumulated in planned increments for a known future cost.' },
  { term: 'Term', topic: 'Borrowing', definition: 'The length of time or number of scheduled periods described for an obligation.' },
  { term: 'Total cost', topic: 'Major Costs', definition: 'The combined cost of a choice across relevant categories and time—not only its advertised payment or sticker price.' },
  { term: 'Total repayment', topic: 'Borrowing', definition: 'The estimated amount paid across scheduled payments and included upfront charges under the stated assumptions.' },
  { term: 'Unsecured debt', topic: 'Borrowing', definition: 'Debt not directly backed by identified collateral, though nonpayment can still have contractual and legal consequences.' },
  { term: 'Variable interest rate', topic: 'Borrowing', definition: 'An interest rate that can change according to the agreement, often in relation to an index. A static estimate cannot predict future changes.' },
];

const whyByTopic = {
  Borrowing: 'It helps make the obligation, its price, or its consequences easier to see before comparing choices.',
  Credit: 'It helps interpret reported credit information without treating a report or score as a judgment of the person.',
  'Cash Flow': 'It helps connect the amount of money with its timing and the household’s ability to absorb change.',
  'Major Costs': 'It helps bring costs outside the advertised payment or sticker price into the same picture.',
  Income: 'It helps distinguish the income named on paper from the amount available inside a real decision.',
};

const examplesByTerm = {
  'Annual percentage rate (APR)': 'Two loans can show the same interest rate and different APRs when covered fees differ.',
  'Buy now, pay later (BNPL)': 'Three small installment plans can place payments in the same week even when each purchase looked separate.',
  'Credit report': 'A learner may compare the accounts, dates, balances, and inquiries shown with records they recognize.',
  'Credit score': 'Two lenders can show different scores because the model, bureau data, or date differs.',
  'Credit utilization': 'A $300 reported balance on a $1,000 limit represents 30% utilization for that account.',
  Cosigner: 'If the primary borrower misses a payment, the cosigner can still be responsible under the agreement.',
  'Minimum payment': 'A required payment can keep an account current while the remaining balance continues into later months.',
};

const relatedByTerm = {
  'Annual percentage rate (APR)': ['Interest rate', 'Fees', 'Total repayment'],
  'Credit score': ['Credit report', 'Credit utilization', 'Hard inquiry'],
  'Credit utilization': ['Available credit', 'Credit limit', 'Balance'],
  'Minimum payment': ['Balance', 'Interest', 'Total repayment'],
};

export const moneyDictionary = dictionaryDefinitions.map((entry) => ({
  ...entry,
  slug: entry.term.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  category: entry.topic,
  whyItMatters: whyByTopic[entry.topic],
  example: examplesByTerm[entry.term] || `A learner may see “${entry.term}” in an agreement, statement, report, or planning conversation.`,
  relatedTerms: relatedByTerm[entry.term] || [],
  rootId: entry.lesson ? 5 : undefined,
  lessonSlug: entry.lesson?.split('/').pop(),
})).sort((a, b) => a.term.localeCompare(b.term));

export const lessonDefinitionMap = {
  'bridge-contract': 'Annual percentage rate (APR)',
  'minimum-tunnel': 'Minimum payment',
  'bnpl-calendar': 'Buy now, pay later (BNPL)',
  'credit-utilization': 'Credit utilization',
  'score-person': 'Credit score',
  'report-investigation': 'Credit report',
  'cosigner-chain': 'Cosigner',
};

export function dictionaryEntry(term) { return moneyDictionary.find((entry) => entry.term === term); }
