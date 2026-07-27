import { rootThreeDistricts as narrativeDistricts, rootThreeQuickPrompts } from './root-three-data.js';

const coverageByDistrict = {
  crossroads: [
    {
      title: 'Opportunity Cost: Every Choice Changes What Remains',
      body: 'Opportunity cost is the value of the strongest alternative given up. It turns “Can I pay for this?” into “What will this money no longer do if I say yes?”',
      recognize: 'A purchase can fit the visible balance and still delay safety, rest, a relationship, or another priority.',
      examine: 'What is the strongest path this choice asks to wait—and is that tradeoff acceptable now?',
    },
  ],
  transit: [
    {
      title: 'Money Moves Through Time',
      body: 'Income is money received. Cash flow is the timing and movement of money in and out. A positive monthly total can still contain a difficult Tuesday.',
      recognize: 'A month that works in total can fail when rent leaves before the income meant to cover it arrives.',
      examine: 'On which exact dates does money become usable, and which obligations arrive first?',
    },
    {
      title: 'Where Money Lives',
      body: 'Cash, bank accounts, credit-union accounts, prepaid tools, and payment apps differ in access, records, fees, security, and protections. No one location is best for every job.',
      recognize: 'Money that is easy to spend, difficult to withdraw, fee-bearing, or poorly documented behaves differently even when the amount is identical.',
      examine: 'What access, record, fee, and protection does this location provide—and what does it not provide?',
    },
    {
      title: 'Ownership, Access & Authority',
      body: 'Account ownership, permission to transact, authorized-user status, custodial control, and beneficiary status are different legal and practical relationships. Access does not automatically equal ownership.',
      recognize: 'A person may be able to use an account without owning its funds, or own funds while another person has limited authority to act.',
      examine: 'Who owns the money, who may direct it now, who receives it later, and where are those terms documented?',
    },
    {
      title: 'Deposit Insurance & Account Protection',
      body: 'FDIC insurance protects eligible deposits at FDIC-insured banks; NCUA share insurance protects eligible deposits at federally insured credit unions. The standard amount is $250,000 per depositor or member-owner, per insured institution, for each ownership category. Same-category funds at the same institution are generally combined, and investments are not deposit-insurance products.',
      recognize: 'A bank or credit-union name, app screen, or account label is not enough: the institution, product type, ownership category, and total held there all matter.',
      examine: 'Is the institution federally insured, is this an eligible deposit or share account, and how are same-category balances at that institution combined?',
    },
    {
      title: 'How Money Enters and Leaves an Account',
      body: 'Cash deposits, ACH transfers, cards, checks, payment apps, wires, and automatic drafts use different payment routes. They vary in speed, reversibility, fees, records, authorization, and fraud protections.',
      recognize: 'Two payments for the same amount may post on different schedules and offer different ways to dispute an error.',
      examine: 'Which route is moving the money, when is it final, what record remains, and what protection applies if something goes wrong?',
    },
    {
      title: 'Current, Available & Pending',
      body: 'Current balance, available balance, pending authorizations, posted transactions, reversals, and deposit holds describe different moments in settlement. A visible dollar may not yet be free for another use.',
      recognize: 'A card authorization can reduce available funds before the transaction posts, while a deposit can appear before every dollar is available.',
      examine: 'Which number reflects money usable now, and which pending items or holds could still change it?',
    },
    {
      title: 'Holds, Declines, Overdrafts & Fees',
      body: 'Holds reserve funds, declines stop authorization, and overdrafts occur when transactions exceed available funds under the account’s rules. Transaction timing, ordering, and fees can deepen the pressure.',
      recognize: 'A hotel hold, delayed deposit, card purchase, and automatic draft can collide even when a later deposit is expected.',
      examine: 'What reserved the funds, which transaction posted first, what rule applied, and what can prevent the same collision next time?',
    },
    {
      title: 'Reconciliation: Match the Story to the Record',
      body: 'Reconciliation compares your expected activity with the institution record. It explains differences, catches missing or duplicate activity, and updates what is truly available for future decisions.',
      recognize: 'Receipts, transfers, checks, subscriptions, deposits, and pending items should tell the same story as the account record once timing is accounted for.',
      examine: 'Which item creates the difference, is it pending or posted, and does it require a correction or an updated personal record?',
    },
  ],
  'city-hall': [
    {
      title: 'The Account Balance Is Not the Spending Plan',
      body: 'A balance reports account activity. A spending plan also includes future obligations, timing, irregular costs, and priorities. Present in the account does not mean unassigned.',
      recognize: 'Rent, food, transportation, and an annual renewal can already have claims on money that still looks available.',
      examine: 'How much of the visible balance is already committed, and when will each claim arrive?',
    },
    {
      title: 'Fixed, Variable, Irregular & Periodic Expenses',
      body: 'Fixed and variable describe how amounts behave; irregular and periodic describe timing. Irregular does not always mean unexpected, and nonmonthly costs still belong in the plan.',
      recognize: 'Rent may stay stable, utilities vary, repairs arrive irregularly, and registration returns on a known cycle.',
      examine: 'Is the uncertainty about amount, date, frequency, or all three—and what evidence can narrow it?',
    },
    {
      title: 'Build a Spending Plan',
      body: 'A spending plan directs usable income through time. It can reveal tradeoffs and shortfalls, but it cannot create income or prescribe identical categories for every life.',
      recognize: 'A draft that assigns 118% of usable income is not a character failure; it is a decision map that still needs choices.',
      examine: 'Do the amounts add up, do the dates work, and does the final sequence protect the priorities you actually chose?',
    },
  ],
  'values-market': [
    {
      title: 'Obligations, Needs, Wants & Priorities',
      body: 'These are decision categories, not permanent moral labels. Housing, work, health, family, safety, access, and values can change the function of the same expense.',
      recognize: 'The same ride can be convenience, transportation, safety, or several things at once depending on the person and hour.',
      examine: 'What job does the expense perform here, what does it protect, and what workable alternatives exist?',
    },
    {
      title: 'The Cost of Convenience',
      body: 'Convenience can purchase time, energy, safety, access, reliability, or relief while adding financial cost. Its value and consequence deserve examination without shame.',
      recognize: 'Delivery, prepared food, nearby options, rush service, and payment plans may solve a real constraint as well as charge for convenience.',
      examine: 'What is the added price buying, how often is it needed, and is there another option that still works on the hardest day?',
    },
  ],
  comparison: [
    {
      title: 'Small, Large & Repeated Spending Patterns',
      body: 'Financial impact depends on amount, frequency, timing, available margin, and what the spending displaces. Small pleasures are not a universal explanation for hardship, and a large purchase is not automatically unworkable.',
      recognize: 'One small purchase may barely change a month while repetition does; one large purchase may be planned while another removes essential flexibility.',
      examine: 'What is the full amount over time, when does it leave, and which obligation or option loses room?',
    },
  ],
  subscriptions: [
    {
      title: 'Recurring Spending & the Invisible Default',
      body: 'Automatic renewal turns an earlier choice into an ongoing default. Review asks what is used, what changed, what cancellation costs, and whether the charge still serves a chosen purpose.',
      recognize: 'A trial, annual renewal, or small monthly charge can keep moving after attention has gone elsewhere.',
      examine: 'Would you knowingly choose this service, price, and renewal term again today?',
    },
  ],
  impulse: [
    {
      title: 'Advertising, Persuasion & Manufactured Urgency',
      body: 'Countdowns, scarcity claims, personalized ads, bundles, anchors, and “free” trials can shorten reflection time. Seeing the influence restores choice; it does not require pretending influence never works.',
      recognize: 'The offer makes delay feel expensive before price, purpose, or consequences have been fully examined.',
      examine: 'Which part of the offer changes if you wait, and which part only tries to make waiting feel dangerous?',
    },
    {
      title: 'Social Pressure, Comparison & Belonging',
      body: 'Spending can answer belonging, identity, generosity, status, or fear of embarrassment—not only demand for the product. The social need may be real even when the financial consequence is difficult.',
      recognize: 'A group trip, celebration, clothing expectation, or public comparison can turn a purchase into a test of acceptance.',
      examine: 'What need for belonging is present, and what other response could honor it without hiding the financial limit?',
    },
    {
      title: 'Emotional & Situational Spending',
      body: 'Emotion is information, not proof of failure. Mapping situation, feeling, story, impulse, behavior, and consequence reveals what a purchase is trying to provide in that moment.',
      recognize: 'Stress, conflict, exhaustion, celebration, payday, or a difficult call can change the job the same purchase seems to perform.',
      examine: 'What happened just before the urge, what relief or reward is being requested, and what choice protects both the present need and the later consequence?',
    },
  ],
  'income-docks': [
    {
      title: 'Spending Plans for Irregular Income',
      body: 'Irregular-income plans use ranges, cautious assumptions, priority order, review points, and rules for higher or lower months. They do not pretend a variable pattern is a fixed paycheck.',
      recognize: 'An average can be mathematically correct and still unsafe when low months or late payments carry the greatest consequence.',
      examine: 'What amount has the strongest evidence of arriving on time, what must that floor protect first, and how will additional income be handled when it arrives?',
    },
  ],
  'sinking-funds': [],
  'joy-square': [],
  'repair-garage': [
    {
      title: 'When the Numbers Do Not Work',
      body: 'A shortfall may come from timing, spending, insufficient income, high essential costs, unstable work, debt obligations, or a combination. A plan diagnoses; it does not manufacture money.',
      recognize: 'If essential obligations still exceed usable income after flexible spending is reduced, “try harder” does not solve the arithmetic.',
      examine: 'Is the primary pressure timing, spending, income, essential cost, an earlier obligation, or several of these together?',
    },
    {
      title: 'Adjust Without Erasing Real Life',
      body: 'Adjustment can change timing, scope, frequency, provider, expectation, or priority while protecting essentials and human needs. A workable plan remains revisable when reality changes.',
      recognize: 'The strongest repair may reduce pressure without automatically treating every source of rest, culture, joy, or connection as the problem.',
      examine: 'Which change creates meaningful room, which value does it preserve, and when should the plan be reviewed again?',
    },
    {
      title: 'Direct Money Without Judging Yourself',
      body: 'A spending plan is a decision tool, not a character report. Observable behavior, cause, consequence, and next information are more useful than shame.',
      recognize: 'A missed category or unplanned purchase can become evidence for revision instead of proof that a person is responsible or careless.',
      examine: 'What happened, what did it change, what information was missing, and what small system change would help next time?',
    },
  ],
  observatory: [
    {
      title: 'From Present Choices to Future Protection',
      body: 'Future protection begins with knowing what is actually available after present commitments. Root Four uses cash-flow clarity to prepare for irregular costs, disruption, and future choice.',
      recognize: 'Money cannot protect a future interruption if the same money is already claimed by current bills, pending transactions, or recurring defaults.',
      examine: 'After every present commitment is named, what amount and timing can honestly begin serving future protection?',
    },
  ],
};

const growthByDistrict = {
  crossroads: 'You can name the strongest alternative a choice asks to wait without turning the decision into a moral verdict.',
  transit: 'You can trace where money lives, how it moves, what is protected, and when a visible balance becomes truly usable.',
  'city-hall': 'You can build a plan that adds up, fits the calendar, and gives priorities an honest sequence.',
  'values-market': 'You can examine the real job an expense performs without using needs, wants, or convenience as shame labels.',
  comparison: 'You can compare full cost, repeated impact, useful life, and terms instead of letting one price tell the whole story.',
  subscriptions: 'You can replace automatic continuation with recurring consent.',
  impulse: 'You can recognize urgency, belonging, and emotion as influences while keeping the final choice in your hands.',
  'income-docks': 'You can plan from a stable floor and make rules for variable income without pretending uncertainty is certainty.',
  'sinking-funds': 'You can turn a known future cost into smaller present set-asides instead of calling its arrival a surprise.',
  'joy-square': 'You can give joy and generosity an honest amount, timing, and boundary without erasing their meaning.',
  'repair-garage': 'You can diagnose a shortfall, recover from sunk cost, and revise the system without turning the result into an identity.',
  observatory: 'You can hold timing, priorities, influence, repair, and review in one flexible system that makes room for being human.',
};

export const rootThreeRootsData = narrativeDistricts.map((district) => {
  const expandedTopics = coverageByDistrict[district.key] || [];
  return {
    ...district,
    expandedTopics,
    adultLevels: [
      {
        number: '01',
        name: 'Understand',
        question: 'What is happening here?',
        title: 'See the financial system beneath the choice',
        body: [district.parallel],
        details: expandedTopics.map(({ title, body }) => ({ title, body })),
      },
      {
        number: '02',
        name: 'Recognize',
        question: 'Where does this appear in adult financial life?',
        title: 'Recognize the pattern before it makes the decision for you',
        body: ['The story becomes useful when you can identify the same structure inside ordinary accounts, bills, purchases, work rhythms, relationships, and moments of pressure.'],
        examples: [
          ...district.concepts.map(([title, body]) => `${title}: ${body}`),
          ...expandedTopics.map(({ recognize }) => recognize),
        ],
      },
      {
        number: '03',
        name: 'Examine',
        question: 'What is directing the decision?',
        title: 'Examine timing, purpose, constraints, and consequences together',
        body: [district.scenario.setup],
        prompts: [
          ...expandedTopics.map(({ examine }) => examine),
          ...district.reflection,
        ],
      },
    ],
    growth: growthByDistrict[district.key],
  };
});

export { rootThreeQuickPrompts };
