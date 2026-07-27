import rootFiveCanon from './root-five-canon.md?raw';

export const ROOT_FIVE_PROGRESS_KEY = 'rootwise_root_five_bridge_progress_v1';

export const rootFiveParts = [
  { number: 'I', title: 'Understanding the Exchange', range: [1, 3] },
  { number: 'II', title: 'The Cost of Borrowing', range: [4, 8] },
  { number: 'III', title: 'Types of Credit and Debt', range: [9, 17] },
  { number: 'IV', title: 'Credit Records and Scoring', range: [18, 22] },
  { number: 'V', title: 'Shared Obligations and Relationships', range: [23, 25] },
  { number: 'VI', title: 'When Debt Becomes Difficult', range: [26, 32] },
  { number: 'VII', title: 'Evaluating and Directing Debt', range: [33, 38] },
];

const workbookTitles = [
  'Borrowing-purpose map', 'Reasons-for-borrowing map', 'Present-benefit and future-claim comparison',
  'Principal, interest, and fee breakdown', 'APR comparison', 'Term comparison',
  'Minimum-payment analysis', 'Cash-price versus financed-price comparison', 'Revolving-credit map',
  'Installment-loan timeline', 'Collateral inventory', 'Buy-now-pay-later calendar',
  'Short-term credit cost review', 'Student-program cost map', 'Total transportation-cost worksheet',
  'Housing-cost comparison', 'Medical-billing review', 'Credit-report checklist',
  'Score-factor map', 'Utilization worksheet', 'Inquiry review', 'Dispute-documentation list',
  'Cosigning-responsibility worksheet', 'Shared-account-role map', 'Family-loan agreement outline',
  'Missed-payment consequence map', 'Collections-document checklist', 'Debt-to-income context map',
  'Approval-versus-affordability worksheet', 'Debt-spiral analysis', 'Professional-help category map',
  'Bankruptcy question map', 'Debt inventory', 'Repayment-approach comparison',
  'Consolidation comparison', 'Settlement question list', 'Savings-versus-debt tradeoff',
  'Future-income map',
];

const sageOpenings = [
  'Borrowed money can create access without becoming income. We will keep the benefit and the obligation in the same frame.',
  'People borrow under very different conditions. Understanding the purpose and pressure is more useful than assigning a moral label.',
  'Every present benefit places a claim somewhere on the future calendar. Let us make both sides visible.',
  'The amount received is only the first number. The contract adds the price of access.',
  'A rate, an APR, and a payment answer different questions. We need the terms before we compare the bridges.',
  'Time can lower a payment while raising the total cost. A shorter path can also be too steep for the traveler.',
  'A minimum keeps the account moving; it does not tell us when the crossing ends or what the crossing costs.',
  'A comfortable payment can hide an uncomfortable price. We will widen the lens before deciding what fits.',
  'Revolving credit can be used, repaid, and used again. That flexibility changes both the opportunity and the risk.',
  'An installment agreement has a scheduled path and ending. The schedule still has to fit the life around it.',
  'Collateral changes what is at risk. Unsecured does not mean consequence-free, and secured does not mean automatically unwise.',
  'Four small payments can be clear alone and crowded together. The calendar—not the sales screen—shows the combined claim.',
  'Urgency can make a short bridge look like the only bridge. We will slow down enough to see the dollar cost and the repeated-cycle risk.',
  'Education debt is tied to a hoped-for future, but the outcome depends on completion, recognition, demand, earnings, and repayment terms.',
  'A vehicle payment is one line inside a much larger transportation cost. Affordability lives in the whole system.',
  'Housing choices involve cash flow, stability, mobility, maintenance, transaction costs, and risk. A slogan cannot carry all of that.',
  'A medical bill may arrive through several organizations and documents. Understanding the path can reveal what still needs explanation.',
  'A credit report is a record assembled from reported information. It is evidence to review, not a description of character.',
  'A score summarizes selected report data for a particular model and moment. It cannot measure the person holding it.',
  'Reported balance, credit limit, available credit, and timing are connected but not interchangeable. We will calculate each clearly.',
  'Not every inquiry means the same thing. The reason, type, and authorization deserve examination before a conclusion.',
  'An unfamiliar item is a question, not yet an answer. We will separate possible fraud, error, naming, roles, and forgotten history.',
  'Cosigning is not merely helping someone qualify. It is accepting contractual responsibility and its possible chain of consequences.',
  'A person can hold different roles across different accounts. The label on the card does not always reveal the legal obligation.',
  'Money inside relationships carries expectations, power, ownership, timing, generosity, and sometimes safety concerns. Clarity protects people.',
  'A contract clock, a fee clock, and a credit-reporting clock may not move together. Two days late and thirty days late are not identical events.',
  'Delinquency, default, charge-off, and collection are related but distinct. The documents and jurisdiction matter.',
  'A lender ratio can be useful without containing the whole household. The expenses it excludes still have to be lived.',
  'Approval answers what a lender may permit. Affordability asks what the household can carry while preserving necessary margin.',
  'A debt spiral is a sequence, not a character flaw. We will find the original pressure and the new obligations that narrowed the next choice.',
  'When the structure no longer works, rearranging dates may hide the problem without solving it. That is a signal to widen the help map.',
  'Bankruptcy is a legal process—not a universal catastrophe and not an effortless reset. Personal evaluation belongs with qualified legal guidance.',
  'A strategy chosen before the inventory is complete is built on missing terms. First we identify what actually exists.',
  'Different payoff approaches protect different things. Cost, cash flow, collateral, delinquency, deadlines, and legal risk can change the priority.',
  'A lower payment can be meaningful, but the new term, fees, rate, collateral, and total repayment decide what was exchanged.',
  'Settlement is a concept, an agreement, and sometimes a marketed service. Those are not the same thing, and no company controls every creditor.',
  'Using savings can reduce a cost and also reduce accessible protection. Keeping every dollar can preserve access and continue the debt cost.',
  'The final map places every required payment onto future income. As obligations end, the visible result is not virtue—it is restored choice.',
];

const recognizeExamples = [
  ['A $1,000 deposit increases cash today while an equal principal obligation remains.', 'A necessary repair becomes possible now, but later paychecks must carry the repayment.'],
  ['Borrowing covers urgent care, essential housing, work access, or a credential.', 'Borrowing also appears when ordinary groceries are repeatedly delayed by a structural shortfall.'],
  ['A vehicle creates immediate work access while the payment claims income for years.', 'The benefit ends early, but the obligation continues.'],
  ['A $10,000 amount becomes principal plus interest, origination cost, add-ons, and possible late charges.', 'Two contracts deliver the same principal with different total costs.'],
  ['One offer advertises a lower rate while another has fewer fees and a different APR.', 'A promotional rate changes later under the contract terms.'],
  ['A longer term produces a lower payment and a higher total repayment.', 'A shorter, cheaper term still fails if the required payment breaks monthly cash flow.'],
  ['A $72 minimum on a $2,400 revolving balance feels manageable while repayment stretches forward.', 'New charges keep the balance moving even when minimums are paid.'],
  ['A dealer preserves the desired payment by extending the term and adding products.', 'A monthly-payment comparison hides cash price, total interest, and obligation length.'],
  ['A card balance falls and can be borrowed again without opening a new fixed loan.', 'The open credit line can support timing or make repeated borrowing easy to overlook.'],
  ['A loan follows a fixed schedule toward a planned ending.', 'A staircase payment is predictable but still competes with changing household needs.'],
  ['A vehicle secures one loan while another obligation relies only on the borrower’s promise.', 'Loss of collateral is one risk; collection, reporting, and legal action can exist without collateral.'],
  ['A $240 purchase becomes four $60 payments.', 'Five separate plans overlap and claim more of the same paydays than any checkout screen showed.'],
  ['A small dollar fee over a very short term produces a high annualized cost.', 'A rollover solves today’s due date while increasing the next claim.'],
  ['A program’s price is clear but completion, recognition, employer demand, and earnings are uncertain.', 'The debt remains even when the credential is unfinished.'],
  ['Payment, insurance, fuel, registration, maintenance, repair, parking, and depreciation share one budget.', 'Negative equity limits the choices available at sale or trade-in.'],
  ['Ownership builds equity in some conditions and creates costs and risk in others.', 'Rent can buy flexibility, services, and risk transfer rather than simply being wasted.'],
  ['An explanation of benefits, provider bill, lab charge, and insurer adjustment show different parts of one event.', 'A document marked as an EOB is reviewed before being treated as a bill.'],
  ['An old closed account can remain part of an accurate record.', 'A wrong balance, duplicate collection, or unfamiliar account calls for investigation.'],
  ['A score changes while kindness, intelligence, income, savings, and human worth remain outside the model.', 'Different scoring models or data moments can produce different numbers.'],
  ['A $2,500 reported balance on a $5,000 limit represents 50% utilization.', 'Current, statement, and reported balances differ because activity and reporting happen at different times.'],
  ['A consumer review, existing-account review, or application can create different inquiry types.', 'Several inquiries are examined before being labeled fraud.'],
  ['An unfamiliar creditor name belongs to a known account under a different reporting name.', 'A truly unauthorized account and an incorrect balance require different evidence.'],
  ['A relative asks for help qualifying and the cosigner becomes liable for the obligation.', 'The missed payment reaches both credit files and the relationship.'],
  ['A joint borrower, joint owner, authorized user, and individual owner each hold different rights and responsibilities.', 'Possessing a card does not by itself identify who owes the debt.'],
  ['An informal family loan is remembered as a gift by one person and a debt by another.', 'Hidden debt, coercion, or restricted access may signal a safety issue beyond budgeting.'],
  ['A payment is two days late under the contract but has not reached a common 30-day reporting point.', 'Fees, grace periods, reporting, and default provisions follow different terms.'],
  ['A collection letter arrives for an old charged-off account.', 'The consumer verifies identity, amount, owner, dates, and jurisdiction before assuming the next step.'],
  ['A lender’s DTI omits groceries, caregiving, repairs, priorities, and irregular costs.', 'A ratio that passes underwriting still leaves the household’s real margin unanswered.'],
  ['A $500 approved payment fits the lender model and removes the household’s medical, school, and repair margin.', 'Income interruption turns a thin approval into a fragile obligation.'],
  ['A grocery shortfall becomes a card charge, then a payment, then another shortfall, then a cash advance and fees.', 'The first shortage and the later debt costs must both be addressed.'],
  ['Statements are avoided while due dates are rearranged to keep every account barely moving.', 'Essential costs and required payments consistently exceed usable income.'],
  ['One person calls bankruptcy permanent ruin while another calls it an easy escape.', 'Eligibility, assets, debt types, exemptions, jurisdiction, and long-term effects require case-specific review.'],
  ['Rates, minimums, status, collateral, owners, deadlines, and promotional dates are missing from a debt list.', 'A strategy looks attractive until a secured or delinquent obligation is discovered.'],
  ['Smallest balance and highest rate approaches produce different early results.', 'Collateral risk, delinquency, legal deadlines, promotions, and cash-flow relief can alter the sequence.'],
  ['A new loan lowers the payment by extending the term.', 'Fees or collateral change what the borrower gives up for the lower payment.'],
  ['An advertisement highlights savings and omits stopped payments, fees, lawsuits, tax questions, and creditor refusal.', 'A direct agreement and a debt-settlement company are separate arrangements.'],
  ['All savings could remove interest and leave no buffer.', 'Keeping all savings preserves access while the debt continues charging cost.'],
  ['Required payments occupy months on a future calendar.', 'An ending obligation releases money that can support later choices.'],
];

const scenarioPrompts = [
  ['A $1,000 bridge opens today. What must stay visible?', 'The access gained and the full repayment obligation', 'Only the cash that arrived', 'A rule that borrowing is always failure'],
  ['Four travelers borrow for different reasons. What comes first?', 'Examine purpose, pressure, alternatives, and repayment capacity', 'Treat every reason as equally safe', 'Judge the borrower before reading the terms'],
  ['A benefit begins now and payments continue for three years. What should the map show?', 'Immediate benefit beside every future claim', 'Only the first payment', 'Only the item received'],
  ['Two contracts provide $10,000. What creates a useful comparison?', 'Principal, interest, fees, add-ons, and total repayment', 'The lender’s logo', 'The deposit amount alone'],
  ['One offer says “low rate.” What should Ivy request next?', 'APR, fees, duration, changes, and exclusions', 'A smaller font disclaimer', 'A promise that the payment never matters'],
  ['A longer term lowers the payment. What remains unresolved?', 'Total cost and whether either payment fits the household', 'Whether longer is always wiser', 'Whether shorter is always cheaper enough to choose'],
  ['A minimum payment is affordable this month. What else belongs in view?', 'Repayment time, interest, new charges, and total cost', 'Only whether the payment posts', 'A moral judgment about the balance'],
  ['A dealer reaches the desired payment by changing the term. What should Eli compare?', 'Cash price, financed amount, term, add-ons, and total repayment', 'Payment size alone', 'Whether approval feels exciting'],
  ['A balance can be borrowed again after repayment. Which structure is this?', 'Revolving credit', 'A fixed-term installment loan', 'Income'],
  ['A fixed schedule leads to a planned ending. Which question matters?', 'Whether the payment and end date remain workable', 'Whether every installment loan is good debt', 'Whether the balance can be reused automatically'],
  ['A vehicle is pledged to a loan. What changes?', 'The creditor may have rights in the collateral under the agreement and law', 'The borrower has no other obligations', 'The loan becomes affordable'],
  ['Five “small” plans overlap. Which view is most honest?', 'One calendar showing every due date and combined amount', 'Five separate checkout screens', 'Only the smallest installment'],
  ['A short-term loan charges a dollar fee. What should be translated?', 'Dollar cost, term, annualized rate, rollover, and available alternatives', 'Only the speed of approval', 'A universal conclusion about the borrower'],
  ['Training is financed. Which uncertainty belongs beside the price?', 'Completion, recognition, demand, earnings, and noncompletion risk', 'Whether education always pays for itself', 'Only the campus appearance'],
  ['A vehicle payment fits. Which cost test is incomplete?', 'The test that excludes insurance, fuel, registration, maintenance, repair, and depreciation', 'The test that includes irregular costs', 'The test that examines negative equity'],
  ['A slogan says rent is wasted. What is the stronger frame?', 'Compare full costs, stability, mobility, responsibility, risk, and goals', 'Ownership always builds wealth', 'Renting can never provide value'],
  ['An EOB and three bills disagree. What is the first useful action?', 'Match services, providers, insurer adjustments, and amounts before concluding', 'Pay every document immediately', 'Assume every mismatch is fraud'],
  ['A report contains an old closed account. What should happen?', 'Check identity, dates, status, balance, and whether the information is accurate', 'Delete every closed account', 'Treat the file as a grade'],
  ['Ivy calls a score a grade. What does Sage separate?', 'The model’s reported-data estimate from intelligence, character, and worth', 'The score from all financial information', 'The person from any ability to learn'],
  ['A card shows $2,500 reported on a $5,000 limit. What is utilization?', 'Reported balance divided by the applicable limit: 50%', 'Balance divided by available credit: 100%', 'Only an overdue-balance measure'],
  ['Several inquiries appear. What prevents a false conclusion?', 'Identify type, date, purpose, and authorization', 'Assume every inquiry is identity theft', 'Ignore every inquiry'],
  ['An account name is unfamiliar. What is the sound investigation?', 'Compare names, roles, history, dates, and documents before choosing a dispute path', 'Declare fraud without checking', 'Assume reporting systems cannot be wrong'],
  ['A relative asks Eli to cosign. What must the explanation include?', 'Full liability and consequences for payment, credit, collection, collateral, and relationship', 'Only the primary borrower’s plan', 'A promise that family prevents default'],
  ['Four people hold cards with different roles. What belongs on the map?', 'Ownership, borrowing liability, access, reporting, and authority for each person', 'Whose name is printed largest', 'Who uses the card most often'],
  ['A family transfer has no written expectations. What can clarify it?', 'Purpose, amount, repayment, timing, ownership, boundaries, and safety', 'A shared assumption that everyone remembers alike', 'Silence to protect the relationship'],
  ['A payment was missed by two days. What should be checked?', 'Contract terms, fees, grace period, reporting timing, and next action', 'A universal 30-day rule for every consequence', 'Whether the borrower deserves the fee'],
  ['A collector contacts Ivy about an old account. What information matters?', 'Collector, owner, amount, dates, validation information, and state-specific limits', 'Whether the voice sounds confident', 'A promise to pay before reviewing anything'],
  ['A lender ratio looks acceptable. What is still missing?', 'The household expenses and priorities the ratio does not include', 'Proof that the loan is affordable', 'A reason to ignore underwriting'],
  ['Ivy is approved for $500 monthly. What decides affordability?', 'Full cash flow, irregular costs, margin, changes, and priorities', 'Approval alone', 'The maximum offered amount'],
  ['The next loan covers the payment created by the last shortfall. What should be traced?', 'The original shortage and every new fee and payment in the sequence', 'Only the newest balance', 'The borrower’s willpower'],
  ['Required payments exceed usable income. What signal deserves attention?', 'The structure may be unsustainable and professional categories may need review', 'More calendar rearranging will always solve it', 'Avoiding statements protects flexibility'],
  ['Someone asks whether to file bankruptcy. What can RootWise responsibly do?', 'Explain general concepts and help prepare questions for qualified legal advice', 'Choose a chapter for the person', 'Promise every debt will be discharged'],
  ['A payoff method is requested before all debts are listed. What is the gate?', 'Complete the inventory of terms, status, roles, collateral, and deadlines', 'Choose the most popular method', 'Start with the account that causes the most shame'],
  ['Two methods produce different tradeoffs. What should comparison include?', 'Cost, momentum, cash-flow relief, status, collateral, deadlines, and risk', 'A universal winner', 'Only the number of accounts'],
  ['Consolidation lowers the payment. What must be revealed?', 'New rate, term, fees, total repayment, collateral, and old-account status', 'Only the new due date', 'A guarantee that debt falls faster'],
  ['A settlement company promises dramatic savings. What deserves verification?', 'Fees, payment handling, creditor participation, legal and credit effects, tax questions, and written terms', 'The advertisement’s largest number', 'Whether the company sounds certain'],
  ['Savings could reduce debt. What makes the comparison honest?', 'Interest avoided beside the accessible protection and margin given up', 'Always drain savings first', 'Never use savings for debt'],
  ['Payments are placed on a 36-month map. What is the purpose?', 'See when income is committed and when choice returns', 'Prove debt payoff is a moral victory', 'Predict life with certainty'],
];

export const sourceLibrary = {
  tila: ['Federal lending disclosures · Regulation Z', 'https://www.consumerfinance.gov/rules-policy/regulations/1026/'],
  apr: ['Interest rate and APR · CFPB', 'https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loan-interest-rate-and-the-apr-en-733/'],
  minimum: ['Credit-card minimum-payment disclosures · CFPB', 'https://www.consumerfinance.gov/rules-policy/regulations/1026/7/'],
  cards: ['Credit cards · CFPB', 'https://www.consumerfinance.gov/consumer-tools/credit-cards/'],
  bnpl: ['Buy now, pay later products · CFPB', 'https://www.consumerfinance.gov/compliance/compliance-resources/consumer-cards-resources/buy-now-pay-later-bnpl-products/'],
  payday: ['Payday loans · CFPB', 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-payday-loan-en-1567/'],
  student: ['Federal student aid payment preparation · U.S. Department of Education', 'https://studentaid.gov/articles/prepare-for-payments/'],
  auto: ['Monthly auto-loan payment · CFPB', 'https://www.consumerfinance.gov/ask-cfpb/what-is-included-in-the-monthly-auto-loan-payment-en-819/'],
  mortgage: ['Loan Estimate · CFPB', 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/'],
  medical: ['Explanation of benefits · CMS', 'https://www.cms.gov/medical-bill-rights/help/guides/explanation-of-benefits'],
  reports: ['Credit reports and scores · CFPB', 'https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/'],
  score: ['Understanding credit scores · CFPB', 'https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/understand-your-credit-score/'],
  inquiries: ['Credit inquiries · CFPB', 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-credit-inquiry-en-1317/'],
  disputes: ['Credit-report error timing · CFPB', 'https://www.consumerfinance.gov/ask-cfpb/how-long-does-it-take-to-repair-an-error-on-my-credit-report-en-1339/'],
  cosign: ['Cosigner notice and Credit Practices Rule · FTC', 'https://www.ftc.gov/business-guidance/resources/complying-credit-practices-rule'],
  collections: ['Debt validation information · Regulation F', 'https://www.consumerfinance.gov/rules-policy/regulations/1006/34/'],
  oldDebt: ['Time-barred debt varies by state · CFPB', 'https://www.consumerfinance.gov/ask-cfpb/can-debt-collectors-collect-a-debt-thats-several-years-old-en-1423/'],
  dti: ['Debt-to-income ratio · CFPB', 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/'],
  bankruptcy: ['Bankruptcy discharge basics · U.S. Courts', 'https://www.uscourts.gov/court-programs/bankruptcy/bankruptcy-basics/discharge-bankruptcy-bankruptcy-basics'],
  settlement: ['Debt-relief services and the Telemarketing Sales Rule · FTC', 'https://www.ftc.gov/business-guidance/resources/debt-relief-services-telemarketing-sales-rule-guide-business'],
  tax: ['Canceled debt and possible tax treatment · IRS', 'https://www.irs.gov/taxtopics/tc431'],
};

const sourceKeysByLesson = [
  ['tila'], ['tila'], ['tila'], ['tila'], ['apr', 'tila'], ['tila'], ['minimum'], ['tila'],
  ['cards'], ['tila'], ['tila'], ['bnpl'], ['payday'], ['student'], ['auto'], ['mortgage'], ['medical'],
  ['reports'], ['score'], ['score'], ['inquiries'], ['reports', 'disputes'], ['cosign'], ['reports'], ['cosign'],
  ['cards'], ['collections', 'oldDebt'], ['dti'], ['dti'], ['cards'], ['collections'], ['bankruptcy'],
  ['collections'], ['cards'], ['tila'], ['settlement', 'tax'], ['cards'], ['tila'],
];

const customChecks = {
  5: ['Which comparison uses the fullest cost picture?', 'APR, fees, rate changes, term length, and contract conditions', 'The advertised rate alone', 'The smallest payment alone', 'The lender name'],
  8: ['Why can a smaller monthly payment be misleading?', 'It may accompany a larger total obligation or longer claim on income', 'It always reduces total interest', 'It removes all fees', 'It guarantees affordability'],
  12: ['What can several BNPL plans hide when viewed separately?', 'Their combined scheduled claim on future income', 'That every plan is revolving credit', 'That no contract exists', 'That every purchase is unaffordable'],
  13: ['Why translate a short-term fee into an annualized rate?', 'A fee on a small amount over a short term can represent a high annualized cost', 'The annualized rate predicts approval', 'Every short-term product has the same fee', 'It removes the need to read the term'],
  15: ['What belongs in a transportation-affordability test beyond the payment?', 'Insurance, fuel, registration, maintenance, repairs, depreciation, and other use costs', 'Only the vehicle color', 'Only the down payment', 'Only the advertised rate'],
  25: ['Why should an informal family debt be clarified?', 'The parties may hold different expectations about repayment, timing, ownership, generosity, and obligation', 'Family transfers are never debts', 'A verbal agreement always means the same thing to everyone', 'Clarity harms relationships'],
  33: ['Why complete an inventory before choosing a strategy?', 'Debts carry different costs, risks, protections, statuses, roles, and consequences', 'The highest balance is always first', 'Every strategy requires the same facts', 'Account status never changes priority'],
  37: ['What tradeoff can appear when savings is used against debt?', 'Debt cost may fall while accessible money for emergencies or interruption also falls', 'Savings can never reduce interest', 'The best choice is always to use all savings', 'The best choice is always to keep all savings'],
  38: ['What does the Future-Income Map make visible?', 'When income is already committed and when obligations return choice', 'Whether the borrower is a good person', 'A guaranteed future income amount', 'One universal payoff order'],
};

const interactiveByLesson = {
  1: 'bridge-contract', 7: 'minimum-tunnel', 8: 'payment-price', 11: 'credit-sort',
  12: 'bnpl-calendar', 15: 'transport-cost', 19: 'score-person', 22: 'report-investigation',
  23: 'cosigner-chain', 29: 'approval-affordability', 30: 'debt-spiral', 33: 'inventory-gate',
  34: 'strategy-compare', 35: 'consolidation-reveal', 38: 'future-income',
};

function section(text, name, nextNames = []) {
  const start = text.indexOf(`### ${name}`);
  if (start < 0) return '';
  const from = start + `### ${name}`.length;
  const candidates = nextNames.map((next) => text.indexOf(`### ${next}`, from)).filter((index) => index >= 0);
  const lessonBoundary = text.indexOf('\n---', from);
  if (lessonBoundary >= 0) candidates.push(lessonBoundary);
  const end = candidates.length ? Math.min(...candidates) : text.length;
  return text.slice(from, end).replace(/^\s+|\s+$/g, '').replace(/\n---\s*$/g, '').trim();
}

function parseCheck(text, lessonNumber) {
  if (customChecks[lessonNumber]) {
    const [prompt, correct, ...wrong] = customChecks[lessonNumber];
    const choices = [correct, ...wrong].map((label, index) => ({ id: String.fromCharCode(97 + index), label, isCorrect: index === 0 }));
    return { prompt, options: choices };
  }
  const block = section(text, 'Knowledge Check');
  const correctLetter = block.match(/\*\*Correct answer:\s*([A-D])\*\*/i)?.[1]?.toLowerCase();
  const firstOption = block.search(/^A\.\s+/m);
  const prompt = (firstOption >= 0 ? block.slice(0, firstOption) : block).trim();
  const options = [...block.matchAll(/^([A-D])\.\s+(.+)$/gm)].map((match) => ({
    id: match[1].toLowerCase(), label: match[2].trim(), isCorrect: match[1].toLowerCase() === correctLetter,
  }));
  return { prompt, options };
}

function partFor(number) {
  return rootFiveParts.find((part) => number >= part.range[0] && number <= part.range[1]);
}

const rawLessons = rootFiveCanon.split(/^# LESSON [^\n]+$/m).slice(1);

export const rootFiveOpening = {
  coreQuestion: rootFiveCanon.match(/### Core Question\s+\*\*(.+?)\*\*/s)?.[1]?.replace(/\s+/g, ' ').trim() || '',
  story: rootFiveCanon.match(/## The Bridge District\s+([\s\S]*?)\n---\s+\n# PART ONE/)?.[1]?.trim() || '',
  promise: rootFiveCanon.match(/# ROOT FIVE LEARNING PROMISE\s+([\s\S]*?)\n---\s+\n# STORY FRAME/)?.[1]?.trim() || '',
};

export const rootFiveLessons = rawLessons.map((raw, index) => {
  const number = index + 1;
  const title = raw.match(/^\s*##\s+(.+)$/m)?.[1]?.trim() || `Lesson ${number}`;
  const reflectionName = raw.includes('### Final Root Reflection') ? 'Final Root Reflection' : 'Learner Reflection';
  const scenario = scenarioPrompts[index];
  const sources = sourceKeysByLesson[index].map((key) => ({ key, label: sourceLibrary[key][0], url: sourceLibrary[key][1] }));
  return {
    key: `bridge-${number}`,
    number,
    displayNumber: String(number).padStart(2, '0'),
    title,
    part: partFor(number),
    story: section(raw, 'Story', ['Financial Connection']),
    financialConnection: section(raw, 'Financial Connection', [reflectionName]),
    reflection: section(raw, reflectionName, ['Knowledge Check']),
    check: parseCheck(raw, number),
    workbookTitle: workbookTitles[index],
    sageOpen: sageOpenings[index],
    recognize: recognizeExamples[index],
    scenario: {
      prompt: scenario[0],
      options: [
        { id: 'consider', label: scenario[1], strength: 'strong', feedback: 'This keeps the benefit, obligation, timing, and consequence in the same decision.' },
        { id: 'shortcut', label: scenario[2], strength: 'partial', feedback: 'This uses a shortcut that leaves important contract or cash-flow information outside the frame.' },
        { id: 'assumption', label: scenario[3], strength: 'partial', feedback: 'This turns a financial structure into a universal assumption. Return to the facts that can be verified.' },
      ],
    },
    interactive: interactiveByLesson[number] || null,
    sources,
    transition: number === 38
      ? 'The Bridge District remains available whenever a future-income commitment needs to be made visible. Root Six continues into Financial Protection & Risk.'
      : `The next crossing leads to Lesson ${number + 1}: ${rawLessons[index + 1]?.match(/^\s*##\s+(.+)$/m)?.[1]?.trim() || 'the next bridge'}.`,
  };
});

export const rootFiveQuickPrompts = [
  'Define this term', 'Compare payment and total cost', 'What information is missing?', 'Help me build a fictional example',
];

export function plainText(markdown) {
  return String(markdown || '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-*]\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/[“”"]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function rootFiveNarration(lesson) {
  return `${lesson.sageOpen} ${plainText(lesson.story)} ${plainText(lesson.financialConnection)}`
    .replace(/\bSage explains\b/g, 'I explain')
    .replace(/\bSage says\b/g, 'I say')
    .replace(/\bSage asks\b/g, 'I ask')
    .replace(/\bSage tells\b/g, 'I tell')
    .replace(/\bSage takes\b/g, 'I take')
    .replace(/\bSage corrects\b/g, 'I correct')
    .replace(/\bSage rejects\b/g, 'I reject')
    .replace(/\bSage stops\b/g, 'I stop')
    .replace(/\bSage\b/g, 'I');
}
