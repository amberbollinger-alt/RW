export const rootOneDistricts = [
  {
    key: 'gates',
    number: '01',
    title: 'Through the Gates',
    shortTitle: 'The Gates',
    theme: 'Orientation',
    promise: 'You will stop seeing money as something that simply happens to you and start seeing the choices you can shape.',
    sageOpening: 'Before we decide where your money should go, let’s get our bearings. A new city is confusing until someone shows you how the streets connect. Money is no different.',
    question: 'When money enters your life, what jobs is it already being asked to do?',
    concepts: [
      {
        title: 'Money is a tool, not a destination',
        body: 'Money helps move time, work, needs, and choices from one place to another. It matters, but it is never the whole story. What matters most is what you ask it to do.',
      },
      {
        title: 'Every dollar arrives with possibilities',
        body: 'A dollar can solve a need, create a little joy, protect tomorrow, or open a future option. Choosing one job usually means postponing another. That is a tradeoff—not a failure.',
      },
      {
        title: 'Start with what is true today',
        body: 'A useful plan begins with what is actually coming in, what is actually going out, and what is already promised. No shame. No pretending. Just a clear starting point.',
      },
    ],
    scenario: {
      setup: 'You arrive in the city with $200. You need food for the week, a ride to work, and a safe place to sleep tonight. A friend also invited you to a concert.',
      prompt: 'What do you do first?',
      options: [
        {
          id: 'list',
          label: 'List every need and price before spending',
          consequence: 'You trade a little time now for a clearer view of the whole week. The concert may still fit—but now it has to compete with real numbers.',
          sage: 'That is orientation. You did not say no to fun. You made sure fun knew what else was on the map.',
        },
        {
          id: 'urgent',
          label: 'Handle tonight first, then reassess',
          consequence: 'You protect the most immediate need. Tomorrow’s choices are still open, but you may have less flexibility because the full picture is not mapped yet.',
          sage: 'Urgency is real. The useful question is whether “urgent” and “important” are pointing to the same thing.',
        },
        {
          id: 'concert',
          label: 'Buy the concert ticket before it sells out',
          consequence: 'You lock in the experience, but fewer dollars remain for needs you already know are coming. The ticket did not become wrong—it became expensive in more than one way.',
          sage: 'The price was printed on the ticket. The tradeoff was not. Learning to see both is a financial skill.',
        },
      ],
    },
    reflect: 'What is one money decision that feels less confusing when you name every job competing for the same dollars?',
    action: 'Look at the last three things you bought. Beside each one, write the job it did: need, joy, convenience, protection, or future growth.',
    connection: {
      lookBack: 'This is the first root, so your starting point is simple: notice before you decide.',
      newGrowth: 'You can now separate money itself from the decisions made with it.',
      wholeTreeScenario: 'A surprise $75 arrives while groceries, transportation, and one small want are all competing for it. Before choosing, name every job the money could do and what each choice would postpone.',
      carryForward: 'Next, we will see how ordinary decisions become habits—and how habits slowly shape the neighborhood around you.',
    },
  },
  {
    key: 'neighborhoods',
    number: '02',
    title: 'The Neighborhoods',
    shortTitle: 'Neighborhoods',
    theme: 'Needs, wants, and habits',
    promise: 'You will recognize how repeated choices shape your financial life long before any single dramatic decision does.',
    sageOpening: 'Neighborhoods do not change because of one Tuesday. They change because the same kinds of choices keep showing up. Your money habits build the same way.',
    question: 'Which of your choices are occasional visitors—and which ones have moved in?',
    concepts: [
      {
        title: 'Needs and wants can change places',
        body: 'Food is a need. A particular restaurant is a choice. Transportation may be a need. The newest car may be a preference. The point is not to judge the choice; it is to see the layers clearly.',
      },
      {
        title: 'Small repeats become large patterns',
        body: 'A $6 purchase is rarely life-changing. A $6 habit repeated five times a week is a different decision. Frequency is often more important than price.',
      },
      {
        title: 'Saving is a habit before it is an amount',
        body: 'Waiting for “extra money” makes saving depend on luck. A small, repeatable amount teaches your money that tomorrow has a place in today’s plan.',
      },
    ],
    scenario: {
      setup: 'You notice that weekday lunches are costing about $70 a week. You enjoy the break, the food, and the time with coworkers. You also want to build a $500 emergency cushion.',
      prompt: 'How would you change the pattern without pretending the lunches have no value?',
      options: [
        {
          id: 'cut-all',
          label: 'Stop buying lunch completely',
          consequence: 'The goal grows faster, but the plan asks for a sharp lifestyle change. It may work—or rebound if it feels like punishment.',
          sage: 'Fast is useful only when it is repeatable. A plan you hate has a very short lease.',
        },
        {
          id: 'two-days',
          label: 'Bring lunch two days and save the difference',
          consequence: 'You keep part of the social ritual and redirect roughly $25–$30 a week. The emergency cushion grows more slowly, but the habit may last.',
          sage: 'You did not remove the neighborhood. You changed the route you take through it.',
        },
        {
          id: 'leave-it',
          label: 'Keep the lunches and find savings elsewhere',
          consequence: 'You protect something you value, but the emergency goal now depends on finding a real alternative—not an imaginary “later.”',
          sage: 'That can be a thoughtful choice. Just give the replacement savings a name and a number.',
        },
      ],
    },
    reflect: 'Which repeated purchase gives you enough value to keep—and which one has become background noise?',
    action: 'Choose one repeat purchase this week. Keep it, reduce it, or replace it on purpose. Move any savings immediately so the choice has somewhere to land.',
    connection: {
      lookBack: 'At the Gates, you learned to name the jobs competing for your money.',
      newGrowth: 'Now you can see how repeated choices turn those jobs into habits.',
      wholeTreeScenario: 'You want to save $300, but one weekly purchase matters to you. Use what you learned at the Gates to name its job, then redesign the habit without pretending it has no value.',
      carryForward: 'Habits still need direction. In the Streets, we will give every dollar a route without turning your life into a spreadsheet.',
    },
  },
  {
    key: 'streets',
    number: '03',
    title: 'The Streets',
    shortTitle: 'The Streets',
    theme: 'Budgeting and cash flow',
    promise: 'You will learn why people can earn enough and still feel lost—and how a flexible budget gives money directions.',
    sageOpening: 'A budget is not a fence around your life. It is a street map. It shows what is coming, where it needs to turn, and which roads are already under construction.',
    question: 'If every dollar followed its current route, where would you end up by the end of the month?',
    concepts: [
      {
        title: 'Income is arrival; cash flow is timing',
        body: 'Two people can earn the same amount and feel completely different pressure because bills and paydays land on different dates. Amount matters. Timing matters too.',
      },
      {
        title: 'Give categories a job and a limit',
        body: 'Start with money coming in. Protect essentials. Make room for future needs, flexible spending, and joy. A limit is not a punishment; it is the point where another priority gets a turn.',
      },
      {
        title: 'Detours belong in the map',
        body: 'Car repairs, school costs, birthdays, and annual bills are not moral emergencies. Some are unpredictable; many are simply irregular. A useful budget expects movement.',
      },
    ],
    scenario: {
      setup: 'Your monthly plan balances perfectly. Then a $180 tire repair appears halfway through the month. You have $100 in flexible spending, $250 in savings, and two weeks until payday.',
      prompt: 'Which route do you take?',
      options: [
        {
          id: 'flex-first',
          label: 'Use flexible spending, then $80 from savings',
          consequence: 'The repair is covered without new debt. The rest of the month becomes tighter, and savings needs a refill plan.',
          sage: 'That is what flexible categories and savings are for. The next step is not guilt—it is rebuilding the lane you used.',
        },
        {
          id: 'credit',
          label: 'Put the repair on a credit card',
          consequence: 'You preserve cash today but commit future income. The real cost depends on how quickly the balance is repaid and the interest rate.',
          sage: 'Credit can create breathing room. It can also make next month pay for this month. Both facts belong on the map.',
        },
        {
          id: 'delay',
          label: 'Ask whether the repair can safely wait',
          consequence: 'You gather information before spending. If it is safe to delay, timing improves. If it is not, delay could make the problem more expensive.',
          sage: 'Good financial questions often begin outside finance: “What happens if I wait?”',
        },
      ],
    },
    reflect: 'Where does timing—not total income—create the most pressure in your month?',
    action: 'Put your next two paydays and your five largest bills on one calendar. Look for a traffic jam before it arrives.',
    connection: {
      lookBack: 'The Gates taught you to see competing jobs. The Neighborhoods showed how those choices repeat.',
      newGrowth: 'The Streets connect those habits to timing, limits, and a working monthly plan.',
      wholeTreeScenario: 'A regular habit and an irregular bill land in the same week. Decide which jobs come first, which habit can bend, and how your calendar changes the answer.',
      carryForward: 'A map helps you navigate, but the Marketplace is designed to make you change direction. Next we will study the stories competing for your money.',
    },
  },
  {
    key: 'marketplace',
    number: '04',
    title: 'The Marketplace',
    shortTitle: 'Marketplace',
    theme: 'Value, influence, and spending',
    promise: 'You will stop asking only “Can I afford it?” and start asking what a purchase is really worth to you.',
    sageOpening: 'Every shop is selling two things: a product and a story. Convenience. Status. Security. Belonging. The price tag names only one of them.',
    question: 'What story is most likely to make you spend before you have finished thinking?',
    concepts: [
      {
        title: 'Affordable is not the same as valuable',
        body: 'A payment can fit this month and still crowd out something you care about more. Value asks what the purchase adds, how long it lasts, and what it replaces.',
      },
      {
        title: 'Sales create urgency on purpose',
        body: 'Countdowns, limited quantities, and “buy now” messages shorten the space between feeling and deciding. A pause gives your own priorities time to speak.',
      },
      {
        title: 'Comparison needs the whole cost',
        body: 'Price, fees, upkeep, interest, time, and replacement all belong in the comparison. The cheapest option today can be the expensive option over time—and sometimes the reverse.',
      },
    ],
    scenario: {
      setup: 'Your phone works, but the newest model is on sale for “only $39 a month.” The offer requires a three-year plan and a $120 activation fee.',
      prompt: 'What question changes the decision most?',
      options: [
        {
          id: 'total-cost',
          label: 'What is the total cost over three years?',
          consequence: 'The small payment becomes a full price you can compare. You may still buy it, but the decision is no longer disguised as $39.',
          sage: 'Monthly payments are excellent magicians. Your job is to ask where the rest of the price went.',
        },
        {
          id: 'purpose',
          label: 'What problem would the new phone solve?',
          consequence: 'You compare the upgrade to a real need instead of to the excitement of “new.” The answer may reveal genuine value—or mostly novelty.',
          sage: 'A product without a job often becomes a very expensive decoration.',
        },
        {
          id: 'wait',
          label: 'Would I still want it after 72 hours?',
          consequence: 'The sale may disappear, but so may the urge. If the value survives the pause, you can return with a clearer reason.',
          sage: 'Waiting is not the same as saying no. It is giving your future self a seat at the table.',
        },
      ],
    },
    reflect: 'Think of a recent purchase you are glad you made. What made it valuable beyond the price?',
    action: 'Before one nonessential purchase, pause and answer three questions: What job will it do? What is the total cost? What will I postpone if I buy it?',
    connection: {
      lookBack: 'Your map from the Streets shows where money was supposed to go.',
      newGrowth: 'The Marketplace teaches you to notice when persuasion tries to reroute it.',
      wholeTreeScenario: 'A “limited-time” offer fits one budget category but delays a goal. Name the story being sold, calculate the whole cost, and decide whether the value survives a pause.',
      carryForward: 'Even strong decisions get tiring when you must remake them every day. City Hall will turn your best choices into quiet systems.',
    },
  },
  {
    key: 'city-hall',
    number: '05',
    title: 'City Hall',
    shortTitle: 'City Hall',
    theme: 'Systems and responsibility',
    promise: 'You will build simple systems that keep good decisions working even when life is busy.',
    sageOpening: 'A city does not stay clean, lit, and moving because the mayor remembers every task. Reliable systems do the ordinary work. Financial calm is built the same way.',
    question: 'Which money decision are you tired of having to remember?',
    concepts: [
      {
        title: 'Automate what should be consistent',
        body: 'Bills, savings, and transfers can often happen automatically. Automation does not remove responsibility; it protects important choices from busy days and short memories.',
      },
      {
        title: 'Keep one place for the truth',
        body: 'A short weekly check-in, a calendar, or one simple account list can replace the anxiety of scattered information. You do not need more dashboards. You need one trusted view.',
      },
      {
        title: 'Review systems instead of blaming yourself',
        body: 'When something fails, ask what made the system hard to follow. Was the amount unrealistic? Was the date wrong? Did the plan depend on perfect behavior? Repair the design.',
      },
    ],
    scenario: {
      setup: 'You keep paying a $35 late fee on a bill due three days before payday. You have enough monthly income, but the timing repeatedly catches you.',
      prompt: 'Which system change would you try first?',
      options: [
        {
          id: 'due-date',
          label: 'Ask the company to change the due date',
          consequence: 'If approved, the bill lines up with cash flow and removes a repeat problem at its source.',
          sage: 'Sometimes financial discipline looks like making a phone call so discipline has less work to do.',
        },
        {
          id: 'buffer',
          label: 'Build a one-bill buffer over several paychecks',
          consequence: 'The fix takes longer, but the account gradually stops depending on a perfect calendar.',
          sage: 'A buffer is space. Space turns a deadline from a crisis into a date.',
        },
        {
          id: 'autopay',
          label: 'Turn on autopay immediately',
          consequence: 'The late fee may disappear, but an overdraft risk remains if the timing problem is not solved first.',
          sage: 'Automation repeats a decision beautifully—even a badly timed one. Check the route before adding cruise control.',
        },
      ],
    },
    reflect: 'Which one-time setup could remove the same money stress from your life every month?',
    action: 'Choose one system to improve: a due date, automatic transfer, weekly review, bill reminder, or account label. Make the smallest version work today.',
    connection: {
      lookBack: 'You can now see choices, habits, routes, and the forces that try to change them.',
      newGrowth: 'City Hall turns that understanding into systems that keep working when attention is elsewhere.',
      wholeTreeScenario: 'A recurring bill, a saving goal, and one valued habit keep colliding. Build one small system that respects the habit, follows the budget, and protects the goal without depending on perfect memory.',
      carryForward: 'A well-run city still needs a direction. From the Skyline, we will connect today’s systems to the future they are building.',
    },
  },
  {
    key: 'skyline',
    number: '06',
    title: 'The Skyline',
    shortTitle: 'The Skyline',
    theme: 'Goals, options, and direction',
    promise: 'You will connect today’s ordinary choices to future options without turning your life into a race toward someone else’s version of success.',
    sageOpening: 'The skyline is not one destination. It is proof that many different things can be built from the same ground. Your goals should look like your life—not a picture someone handed you.',
    question: 'What would you like money to make more possible—not merely more impressive?',
    concepts: [
      {
        title: 'Turn wishes into named choices',
        body: 'A goal becomes useful when it has a reason, a rough amount, and a next step. Precision can grow later. Direction comes first.',
      },
      {
        title: 'Protect options, not just outcomes',
        body: 'Savings, lower fixed costs, useful skills, and thoughtful borrowing can create room to change course. Financial freedom is often the ability to choose again.',
      },
      {
        title: 'Progress can be quiet',
        body: 'A repaired habit, one avoided fee, or a small buffer may not look like a skyline. These are the foundations that let larger plans stand.',
      },
    ],
    scenario: {
      setup: 'You receive an unexpected $1,000. You have a small emergency cushion, a credit-card balance, and a goal to take a professional course that could expand your options.',
      prompt: 'How would you decide what the money should build?',
      options: [
        {
          id: 'one-goal',
          label: 'Choose the single goal with the strongest impact',
          consequence: 'One area changes quickly. The tradeoff is leaving the other two exactly where they are for now.',
          sage: 'Concentration creates momentum. Make sure the goal you choose solves the problem you actually care about most.',
        },
        {
          id: 'split',
          label: 'Divide it among safety, debt, and the course',
          consequence: 'Every priority moves, but none is finished. The value is balance; the risk is progress that feels too small to notice.',
          sage: 'Small movement is still movement. Give each piece a reason so “balanced” does not become “random.”',
        },
        {
          id: 'pause',
          label: 'Hold it for one week and gather more information',
          consequence: 'You delay action long enough to compare interest cost, course value, and emergency risk. The danger is letting a thoughtful pause become permanent drift.',
          sage: 'A pause works best with an appointment. Put the decision back on your calendar.',
        },
      ],
    },
    reflect: 'What future option would make you feel more capable, secure, or free to choose?',
    action: 'Write one 90-day goal in this form: “I want to ___ because ___. My next small step is ___.” Give the step a date.',
    connection: {
      lookBack: 'You entered the city learning to notice. Since then, you have connected choices, habits, cash flow, influence, and systems.',
      newGrowth: 'The Skyline lets you see them as one financial life—not six separate lessons.',
      wholeTreeScenario: 'Choose one 90-day goal. Give it a clear job, a repeatable habit, a place in the monthly map, protection from impulse, and one system that keeps it moving when life gets busy.',
      carryForward: 'The city is part of your tree now. The next root will add trust, agreements, and credit to everything you already understand.',
    },
  },
];

export const rootOneQuickPrompts = [
  { key: 'apply', label: 'Apply this to my life' },
  { key: 'example', label: 'Show me a real example' },
  { key: 'simplify', label: "I still don't get it" },
];
