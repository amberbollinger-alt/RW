import { rootOneChapterOne } from './root-one-chapter-one.js';

const legacyRootOneDistricts = [
  {
    key: 'gates',
    number: '01',
    title: 'Through the Gates',
    shortTitle: 'The Gates',
    theme: 'Financial orientation',
    districtNote: 'The Gates represent your financial starting point. Before choosing a direction, you need a clear view of what you have, when more is coming, and which jobs are already waiting for your money.',
    promise: 'You will learn how to get your financial bearings before one choice quietly makes the next choice for you.',
    sageOpening: 'Every useful journey begins with an honest starting point. Let\'s look at what is true before we decide where the money should go.',
    journey: {
      arrival: 'Morning light reaches the city as you and Sage approach the gates. A young woman named Maya is standing beneath the stone arch with one suitcase, an apprenticeship letter, and $200 to carry her through the week. Leo, another apprentice, has come to welcome her. He points toward a festival opening that evening and tells her a $45 ticket would be an easy way to meet people before work begins.',
      sageDialogue: [
        'Maya is not choosing between fun and responsibility. She is choosing before she has seen the whole map.',
        'Watch what happens when one amount of money is asked to do several reasonable things at once.',
        'The balance tells her what is present. It does not tell her what is available.',
      ],
      event: 'Maya buys the ticket because belonging matters in a new place. At apprenticeship check-in, she learns that approved work shoes will cost $80. She also needs $55 for groceries and $35 for gas before payday. Those known jobs total $170, but the festival ticket has left her with $155. Maya resells the ticket for $35 and loses a $10 fee. Leo meets her later at a free performance in the plaza instead. Sage unfolds a city map and helps Maya mark four facts: the money she has, the date of her next income, the jobs already promised, and the amount still free to choose. The mistake was not wanting the festival. It was choosing a route before seeing where the other roads had to lead.',
      story: [
        {
          type: 'narration',
          text: 'Morning light reaches the city just as Maya arrives beneath the stone gates. Everything she needs for a twelve-week apprenticeship is packed into one suitcase. Her first payday is seven days away, and the $200 in her account must carry her there. Folded inside her apprenticeship letter is information about a $600 professional course she hopes to take afterward. She also wants to begin a $500 emergency cushion and still carries an existing $420 balance. Those longer goals matter, but this morning her immediate objective is simpler: get settled, buy what the first week requires, and arrive at work ready.',
        },
        {
          type: 'narration',
          text: 'Leo, another apprentice, meets her at the entrance and offers to show her around. A banner over the plaza announces a welcome festival that evening. The $45 ticket includes food, music, and a gathering for the apprenticeship group. Maya has spent the trip imagining that everyone else will already know one another. The festival feels like a chance to avoid beginning as the outsider. She checks the $200 balance, decides $45 looks manageable, and buys the ticket before they walk to check-in.',
        },
        {
          type: 'sage',
          text: 'Before we head to the festival, what else has to happen between now and payday?',
        },
        {
          type: 'narration',
          text: 'At check-in, the coordinator hands Maya a first-day list. Approved work shoes will cost $80. Maya estimates $55 for groceries and needs $35 in gas before payday. She adds those amounts twice because she dislikes the result: $170. The festival has left her with $155. For a moment she tries to shrink the grocery estimate and tells herself the gas might last, but the shoes are required and the trip meter says otherwise. The shortage is not hypothetical. It will appear before her first shift if nothing changes.',
        },
        {
          type: 'narration',
          text: 'Maya checks the ticket exchange and learns she can resell it for $35. The $10 loss bothers her; keeping the ticket would feel better in the moment than paying to undo a decision she made less than an hour ago. Then she pictures arriving without the required shoes or enough gas. She lists the ticket, accepts the $35, and tells Leo she will miss the festival. Leo points toward a free street performance beginning after sunset. Several apprentices plan to stop there before going home, so Maya can still meet them without reopening the shortage.',
        },
        {
          type: 'sage',
          text: 'Once this week is covered, what else do you want this money journey to remember for you?',
        },
        {
          type: 'narration',
          text: 'Maya buys the $80 shoes and separates $55 for groceries and $35 for gas. The arithmetic now follows the actual path: $200 minus the $10 ticket loss, then minus $170 for the first-week needs, leaves $20. She writes “cushion” beside that $20 rather than treating it as spare. On the back of the map she records the larger markers too: a $500 cushion target, the $600 post-apprenticeship course, and the existing $420 balance that will remain part of later decisions. Nothing has been solved all at once, but nothing is hidden.',
        },
        {
          type: 'narration',
          text: 'That evening Maya and Leo stand at the edge of the free performance with several people from the apprenticeship. She has the right shoes waiting in her room, groceries for the week, enough gas to reach work, and $20 resting under a name instead of drifting unnamed. When the group begins planning lunch for Monday, Maya folds the map into her jacket and follows them into the city. The first day has not gone exactly as planned, but it ends with the week intact and the longer journey visible.',
        },
      ],
      transition: 'With the week mapped honestly, Maya, Leo, and Sage walk through the gates. One clear decision has solved today, but the next streets will show what happens when ordinary choices repeat.',
    },
    question: 'What would Maya have needed to see before deciding whether the festival fit?',
    rootRevealed: {
      title: 'The map before the route',
      body: 'A city map tells you where you are before it recommends a direction. Financial orientation does the same. It separates the money visible in an account from the money that is actually free after timing and known obligations are considered.',
    },
    concepts: [
      {
        title: 'Start with what is true',
        storyLink: 'Maya could not judge the ticket clearly until the shoes, groceries, gas, and payday were visible together.',
        body: 'A useful starting point includes the money available now, the next expected income, known obligations, and their timing. This is not a verdict on past choices. It is the information needed to make the next choice deliberately.',
        recognize: 'This may appear when an account balance feels comfortable until several bills, needs, or promises are placed beside it.',
      },
      {
        title: 'Separate visible money from free money',
        storyLink: 'Maya could see $200, but $170 already had near-term jobs before the festival entered the picture.',
        body: 'Money can be present without being unassigned. Rent waiting for Friday is still rent on Tuesday. Seeing those invisible commitments protects you from spending the same dollar twice in your mind.',
        recognize: 'Notice moments when the number in an account feels spendable even though part of it must carry you to the next payday or cover something already known.',
      },
      {
        title: 'Name the jobs before choosing',
        storyLink: 'Once each job was placed on the map, Maya could see the real tradeoff without treating the festival itself as wrong.',
        body: 'One amount of money may be asked to provide safety, food, transportation, joy, or future progress. Naming those jobs makes the tradeoff visible. It does not remove the choice; it gives you enough clarity to own it.',
        recognize: 'This shows up whenever several worthwhile things are competing for the same limited dollars.',
      },
    ],
    scenario: {
      setup: 'You have $340 available. Before your next payday, $140 is needed for groceries, $80 for transportation, and $90 for a bill. A friend invites you to a $60 event.',
      prompt: 'What is the strongest first move?',
      options: [
        {
          id: 'list',
          label: 'Put every amount and date on one map',
          consequence: 'You see that $310 already has known jobs, leaving $30 before the event is considered. The choice becomes clear before another dollar moves.',
          correction: 'If the event still matters, look for a lower-cost way to join or identify a known job that can safely change rather than pretending all $340 is free.',
          sage: 'Orientation does not make the decision for you. It makes sure you know which decision you are actually making.',
        },
        {
          id: 'urgent',
          label: 'Pay whichever item feels most urgent',
          consequence: 'One pressure disappears, but the remaining jobs and dates are still hidden from one another.',
          correction: 'After protecting anything truly time-sensitive, place the rest on the same map before making another choice.',
          sage: 'Urgency deserves attention, but it should not be allowed to erase the rest of the week.',
        },
        {
          id: 'concert',
          label: 'Buy the event ticket while it is available',
          consequence: 'The experience is secured, but $30 of known obligations no longer fits. The ticket costs $60 and also creates a second decision about that shortage.',
          correction: 'Recount what remains immediately, then change, replace, or delay a job only after checking the consequence of doing so.',
          sage: 'The printed price is only one part of a purchase. The jobs it displaces belong in the cost too.',
        },
      ],
    },
    recognitionCheck: {
      prompt: 'What was the real cause of Maya\'s shortage at the Gates?',
      options: [
        {
          id: 'income-only',
          label: 'She simply did not earn enough money',
          feedback: 'More income could create room, but it would not change the lesson: she made a decision before seeing the jobs already attached to the money she had.',
        },
        {
          id: 'festival-wrong',
          label: 'Going to a festival is always irresponsible',
          feedback: 'The festival had real social value. RootWise does not label joy as wrong; it makes the full tradeoff visible.',
        },
        {
          id: 'unmapped-jobs',
          isCorrect: true,
          label: 'She chose before mapping the known jobs and dates',
          feedback: 'Exactly. Financial orientation begins by seeing the full starting point before selecting a route.',
        },
      ],
    },
    reflect: 'What piece of information - an amount, a date, or an existing promise - could make one money decision clearer?',
    action: 'Create a one-page snapshot with four lines: available now, next income date, known jobs before then, and money still free to choose.',
    connection: {
      lookBack: 'This is the first district, so the first root begins with one skill: notice what is true before deciding what comes next.',
      newGrowth: 'You can now distinguish a visible balance from money that is actually free to choose.',
      wholeTreeScenario: 'When one amount must cover several reasonable things, map the amount, dates, and known jobs before ranking the choices.',
      carryForward: 'A snapshot explains one day. In the Neighborhoods, we will see how choices repeated day after day become habits.',
    },
    rootCheckRecap: 'You strengthened financial orientation: see the whole starting point before choosing a route. Next, Maya will discover that repeated routes can shape her money more than one dramatic decision.',
  },
  {
    key: 'neighborhoods',
    number: '02',
    title: 'The Neighborhoods',
    shortTitle: 'Neighborhoods',
    theme: 'Habits',
    districtNote: 'A neighborhood is shaped by what happens there repeatedly. Financial habits work the same way: one small choice may barely register, while its regular route can gradually change what becomes possible.',
    promise: 'You will learn how to recognize a money habit and redesign it without pretending the value behind it does not matter.',
    sageOpening: 'One purchase is a visitor. A repeated choice moves in. Let\'s look at the route Maya has begun taking without even deciding to make it a habit.',
    journey: {
      arrival: 'Two weeks after the Gates, Maya and Leo know the walk from their apprenticeship to Bell Street Cafe by heart. At noon, they follow the same turn, order the same $14 lunch, and sit by the same window. The meal solves hunger, but the break and conversation also help Maya feel that the city is becoming home.',
      sageDialogue: [
        'There is real value at that table, so the lesson is not to call the lunches wasteful.',
        'The useful question is what happens when one good choice repeats often enough to become a route.',
        'A habit is not just what you buy. It is the cue that starts it, the routine you follow, and the reward that brings you back.',
      ],
      event: 'After ten workdays, Maya realizes the lunches have cost $140. The emergency cushion she mapped at the Gates is growing much more slowly than she expected. Her first correction is absolute: she announces that she will never buy lunch again. By Thursday, a long shift finds her tired, hungry, and unprepared, and she buys a larger meal than usual. Instead of blaming herself, Maya studies the route. Noon is the cue. The cafe is the routine. Food, rest, and connection are the rewards. She begins preparing lunch three days a week, keeps two cafe days with Leo, and transfers the $42 weekly difference to her emergency cushion on payday. She does not erase the part she values. She redesigns the part that was happening automatically.',
      story: [
        {
          type: 'narration',
          text: 'By the end of Maya\'s second apprenticeship week, the city has begun to feel familiar. She knows the quickest morning route to work and the exact turn from the workshop to Bell Street Cafe. At noon, she and Leo follow it without making a fresh plan: left at the fountain, across the narrow avenue, through the green door, then the same table near the window. The $14 lunch gives Maya food, a real break, and an hour when she does not feel like the newest person in the room.',
        },
        {
          type: 'narration',
          text: 'The first cafe visit feels like a welcome. The fifth feels like part of the schedule. By the tenth, Maya reaches for her wallet before the cashier finishes saying the total. That evening she opens the account where the $20 from the Gates is supposed to begin her cushion. Ten cafe charges appear in two neat rows: $140 across ten workdays. No individual lunch felt large enough to reconsider, but together they explain why the cushion has not moved beyond its starting amount.',
        },
        {
          type: 'sage',
          text: 'When you come here at noon, what are you getting besides lunch?',
        },
        {
          type: 'narration',
          text: 'Maya names the easy conversation, the relief of leaving the workshop, and the fact that she never has to prepare anything the night before. Still bothered by the $140, she decides the cleanest correction is to stop completely. Monday she packs food. Tuesday too. Wednesday morning runs late, but she tells herself she can wait until dinner. By Thursday, after an extended shift with no lunch prepared, she arrives at Bell Street exhausted and hungry. She orders a larger meal than usual and leaves feeling as though four difficult days have produced no useful change.',
        },
        {
          type: 'narration',
          text: 'Instead of announcing another rule, Maya watches the routine for a few days. Noon starts it. An unprepared morning makes the cafe nearly inevitable. Food, distance from the workshop, and time with Leo are what make the route worth repeating. She chooses three specific workdays for packed lunches and keeps two cafe days. On the nights before packed days, she places lunch beside her work bag. She also puts one walk around the plaza on the schedule so a packed lunch does not mean eating alone at her station.',
        },
        {
          type: 'sage',
          text: 'What would make this version possible again next week, even if Thursday is tiring?',
        },
        {
          type: 'narration',
          text: 'Maya adds two supports. She prepares the three lunches in one batch, and on payday she schedules a $42 transfer - three avoided $14 lunches - before the difference can blend into checking. The first week goes as planned. The second includes a rushed Wednesday, but the prepared lunch is already beside her bag, so the new route survives. Both $42 transfers reach the cushion. Added to the $20 from the Gates, the balance is now $104. She has spent two cafe days each week with Leo and has not had to pretend those lunches meant nothing.',
        },
        {
          type: 'narration',
          text: 'On the next Friday, Maya and Leo leave Bell Street and pass the city\'s central transit table. The lunch route no longer feels accidental; it has days, preparation, and a visible result. Maya opens the folded map and writes $104 beside the cushion goal. Then she looks at the rest of her paycheck - rent, groceries, gas, the existing balance, the future course, and everything not yet given a route. One repeated choice is working. The larger map is ready for the Streets.',
        },
      ],
      transition: 'The new lunch route holds for another week. As Maya watches the first transfer reach her cushion, Sage points toward the city\'s busiest intersection. One habit has a direction now; the rest of the paycheck still needs one.',
    },
    question: 'Which part of Maya\'s lunch routine made it worth repeating - and which part could change?',
    rootRevealed: {
      title: 'The route repeated',
      body: 'One visitor does not shape a neighborhood, and one purchase rarely shapes a financial life. Repetition does. A habit turns a small decision into a predictable financial direction through frequency.',
    },
    concepts: [
      {
        title: 'Find the cue, routine, and reward',
        storyLink: 'Maya\'s habit began at noon, followed the cafe route, and rewarded her with food, rest, and belonging.',
        body: 'Changing only the purchase can leave the reason for the habit untouched. When you can name the cue, routine, and reward, you can redesign the route while protecting the value that made it attractive.',
        recognize: 'Look for a purchase that happens in the same place, at the same time, after the same feeling, or with the same people.',
      },
      {
        title: 'Measure frequency, not just price',
        storyLink: 'Fourteen dollars felt small at lunch, but ten repetitions became $140.',
        body: 'A price shows the cost of one occurrence. Frequency reveals the cost of the habit. Multiplying the amount by a week or month often makes an invisible pattern visible without exaggerating any single choice.',
        recognize: 'This often appears in purchases that feel too small to examine but show up several times in a statement.',
      },
      {
        title: 'Redesign instead of punish',
        storyLink: 'Maya\'s total ban failed because it removed food and connection without replacing either one.',
        body: 'A sustainable habit change respects what the old routine was doing. Reduce the frequency, prepare an alternative, preserve what matters, and move the savings before another purchase claims it.',
        recognize: 'Notice plans that depend on perfect restraint or make every enjoyable choice feel like failure. A smaller repeatable change may create more progress.',
      },
    ],
    scenario: {
      setup: 'A weekday routine costs $14 each time and happens five days a week. You value the convenience and the people involved, but you also want to build a cushion.',
      prompt: 'Which change is most likely to become a lasting habit?',
      options: [
        {
          id: 'cut-all',
          label: 'Stop the routine completely tomorrow',
          consequence: 'The potential savings are large, but the plan removes every reward at once and depends on being prepared every day.',
          correction: 'If the full cut feels punishing, replace a few days first and create an alternative for the convenience or connection you would lose.',
          sage: 'A fast change is useful only if it can survive an ordinary Thursday.',
        },
        {
          id: 'two-days',
          label: 'Replace two days and transfer the difference',
          consequence: 'You preserve much of the routine while giving the savings a repeatable destination. The progress is smaller each week but easier to maintain.',
          correction: 'Prepare for the replacement days and schedule the transfer so the saved amount does not disappear into another unplanned choice.',
          sage: 'You kept the reward and changed the route. That is habit design, not deprivation.',
        },
        {
          id: 'leave-it',
          label: 'Keep it unchanged and save from whatever remains',
          consequence: 'The routine keeps its value, but the savings goal must wait behind every other choice unless a different habit is named.',
          correction: 'If this routine stays, identify another specific repeat pattern, calculate its amount, and direct that money to the goal.',
          sage: 'Keeping something you value can be thoughtful. Just make the replacement plan concrete enough to exist.',
        },
      ],
    },
    recognitionCheck: {
      prompt: 'Which description identifies Maya\'s full lunch habit rather than only the purchase?',
      options: [
        {
          id: 'price-only',
          label: 'She spent $14 at a cafe',
          feedback: 'That names one purchase. A habit also includes what triggered it, how often it repeated, and what reward kept it attractive.',
        },
        {
          id: 'full-loop',
          isCorrect: true,
          label: 'Noon triggered a cafe routine that provided food, rest, and connection',
          feedback: 'Exactly. Seeing the complete loop let Maya change the cost without pretending the rewards were meaningless.',
        },
        {
          id: 'want-only',
          label: 'She bought something she wanted instead of something she needed',
          feedback: 'Lunch met a need and carried additional value. Labeling the whole routine a want would hide why it kept repeating.',
        },
      ],
    },
    reflect: 'Which repeated purchase is still worth keeping, and what part of its route could become more intentional?',
    action: 'Choose one repeated purchase. Write its cue, routine, reward, weekly cost, and one change small enough to repeat.',
    connection: {
      lookBack: 'At the Gates, Maya learned to see the jobs already waiting for her money.',
      newGrowth: 'The Neighborhoods show how one choice becomes a financial direction when it repeats.',
      wholeTreeScenario: 'Take one valued habit, calculate its monthly route, and redesign its frequency without erasing the reason it matters.',
      carryForward: 'Habits create traffic. The Streets will give the entire paycheck a route so those habits can live beside every other priority.',
    },
    rootCheckRecap: 'You now understand that repeated choices shape direction, and lasting corrections protect the value behind a routine. Next, those routines will become part of Ivy\'s first working budget.',
  },
  {
    key: 'streets',
    number: '03',
    title: 'The Streets',
    shortTitle: 'The Streets',
    theme: 'Budgeting',
    districtNote: 'Streets give movement a route. A budget gives income a route through essentials, flexibility, future goals, and irregular costs while leaving room to adjust when life changes.',
    promise: 'You will learn how to build a budget that directs money, respects timing, and changes without making every detour feel like failure.',
    sageOpening: 'Maya has mapped today and reshaped one habit. Now every dollar in the next paycheck needs a route through the month.',
    journey: {
      arrival: 'On a later payday, Maya meets Leo at a transit table in the center of the Streets. Her cushion has reached $104, and she has mapped rent, groceries, gas, her two cafe lunches, a savings transfer, and a small amount for everything else. On paper, the monthly income and monthly expenses meet exactly. Maya circles the final zero and smiles as though the route is finished.',
      sageDialogue: [
        'The totals balance, but a budget must travel through time, not only across a page.',
        'A useful route shows when money arrives, when each job must be completed, and where the plan can bend.',
        'A detour does not prove the map failed. It shows whether the map knows how to move.',
      ],
      event: 'Halfway through the month, Maya hears the unmistakable thump of a damaged tire. The safe repair costs $180, and payday is one week away. Her monthly totals said she could afford the month, but she did not place paydays, bill dates, or irregular vehicle costs on the same route. Maya returns to the map instead of abandoning it. She uses $100 from flexible spending and $80 from the cushion she began building in the Neighborhoods. She reduces two optional expenses for the remaining weeks and schedules an $80 cushion refill from the next paycheck. Then she rebuilds the budget by paycheck and adds a small vehicle-maintenance category. The repair changed the route; it did not erase the destination.',
      story: [
        {
          type: 'narration',
          text: 'Several paydays into the twelve-week apprenticeship, Maya meets Leo at the central transit table and spreads her notes beneath the route map. The $104 cushion from the Neighborhoods sits in its own account. On paper she assigns the month\'s income to rent, groceries, gas, two Bell Street lunches each week, the continuing $42 transfers, and $100 of flexible spending. She accounts for the existing balance and keeps the $600 course visible even though neither will be finished this month. When income minus every planned amount reaches zero, the page looks complete. Leo checks the arithmetic with her, and Maya likes how settled the month appears before either of them has taken the first road through it.',
        },
        {
          type: 'narration',
          text: 'For the next stretch, the plan behaves exactly as expected. Rent clears, groceries fit, and the cafe routine stays inside its chosen amount. Then, halfway home from work, the steering wheel begins to shake. Maya pulls into a repair shop, where the mechanic finds a damaged tire that cannot safely wait. The repair will cost $180. Her next payday is one week away. The month still works in total, but the money scheduled to arrive later cannot pay the mechanic today.',
        },
        {
          type: 'sage',
          text: 'Does this map show when the money is actually here, or only how much will pass through by the end of the month?',
        },
        {
          type: 'narration',
          text: 'Maya places the dates beside the amounts for the first time. Her $100 flexible category is available. The cushion contains $104. Several bills are already protected, and moving their money would create a second problem within days. She considers charging the repair because that would preserve the tidy categories, but when she adds the payment to a future paycheck, the cost reappears there. Keeping the original page untouched would not keep her money untouched. It would only move the change out of sight.',
        },
        {
          type: 'narration',
          text: 'Maya chooses the $100 flexible category and $80 from the cushion. That covers the full $180 repair and leaves $24 in the cushion. Two optional expenses scheduled for the next two weeks will wait, but rent, groceries, gas, and the planned cafe days stay intact. She authorizes the repair and drives away safely that afternoon. The immediate tension is gone; the thinner cushion is now the consequence she can see.',
        },
        {
          type: 'sage',
          text: 'If eighty dollars leaves this road today, where does it return from—and when?',
        },
        {
          type: 'narration',
          text: 'Maya assigns an $80 refill to the next payday before using that paycheck for anything new. When it arrives, the refill restores the cushion from $24 to $104. The regular $42 weekly transfer continues separately and brings it to $146. She then redraws the plan by paycheck rather than by monthly total alone. Paydays sit beside due dates, and a small vehicle-maintenance category begins receiving money so the next irregular cost has a marked place to land.',
        },
        {
          type: 'narration',
          text: 'A week later Maya returns to the transit table. The page is less symmetrical than the first one, but it tells a more complete story. The tire is repaired, the cushion has been restored and continues growing, and the next paydays show which roads are already occupied. Leo folds the map and points toward the Marketplace, where a bright sign advertises a new phone for a small monthly payment. Maya carries the revised route with her as they cross the street.',
        },
      ],
      transition: 'With the tire repaired and the refill already assigned, Maya follows the budget map toward the Marketplace. The streets show where she intends to go. The signs ahead are designed to make another direction feel more exciting.',
    },
    question: 'Why could Maya afford the month on paper but still feel trapped on the day of the repair?',
    rootRevealed: {
      title: 'A living route for income',
      body: 'A budget is a plan that gives income jobs across amounts and time. It does not predict life perfectly. It shows what must be protected, what can bend, and how to return after a detour.',
    },
    concepts: [
      {
        title: 'Give the whole paycheck a route',
        storyLink: 'Maya included essentials, a valued habit, savings, and flexible money instead of treating the budget as a list of bills alone.',
        body: 'A working budget begins with income and gives room to essentials, flexible choices, future goals, and irregular costs. Categories are not moral grades. They show how much room each priority receives before another priority gets a turn.',
        recognize: 'A category may be missing when it repeatedly borrows from another or when a familiar cost keeps feeling like a surprise.',
      },
      {
        title: 'Put amounts and dates together',
        storyLink: 'The monthly total worked, but the repair arrived while the next paycheck was still one week away.',
        body: 'Cash flow is the timing inside a budget. Two plans with the same monthly totals can feel completely different when bills cluster before income arrives. Paydays and due dates belong on the same view.',
        recognize: 'This appears when the whole month seems affordable but one particular week repeatedly becomes difficult.',
      },
      {
        title: 'Plan the detour and the return',
        storyLink: 'Maya named which categories would bend for the repair and exactly how the cushion would be rebuilt.',
        body: 'Changing a budget is part of using it. A complete adjustment identifies the current source, the immediate consequence, and the route back. Without the return step, a temporary detour can quietly become the new plan.',
        recognize: 'Look for moments when an unexpected expense is covered successfully but the category used to cover it is never restored.',
      },
    ],
    scenario: {
      setup: 'A $180 essential repair appears one week before payday. Your plan has $100 in flexible spending and $250 in savings, but no repair category yet.',
      prompt: 'Which response creates the clearest budget detour?',
      options: [
        {
          id: 'flex-first',
          label: 'Use $100 of flexibility and $80 of savings, then schedule the refill',
          consequence: 'The essential repair is covered without creating a new obligation. The next two weeks tighten, and the savings category has a named route back.',
          correction: 'Choose which flexible expenses will change and assign the $80 refill to a specific paycheck rather than waiting for leftovers.',
          sage: 'A detour is strongest when it includes both the turn and the route back.',
        },
        {
          id: 'credit',
          label: 'Charge the repair and leave this month unchanged',
          consequence: 'Cash remains available today, but future income now receives the repair job and possibly an interest cost.',
          correction: 'If borrowing is the safest available route, calculate the full cost and put the payoff into named future paychecks instead of calling this month unchanged.',
          sage: 'Moving a cost into the future changes its date. It does not remove it from the map.',
        },
        {
          id: 'delay',
          label: 'Ask whether the repair can safely wait',
          consequence: 'You gather information before moving money. A safe delay may improve timing; an unsafe delay may increase the cost or risk.',
          correction: 'Get a clear safety answer and a firm repair date. If waiting is unsafe, choose a funded route now.',
          sage: 'Sometimes the most useful budget question begins with: What happens if I wait?',
        },
      ],
    },
    recognitionCheck: {
      prompt: 'What was missing from Maya\'s first budget?',
      options: [
        {
          id: 'discipline',
          label: 'More discipline to follow the original numbers exactly',
          feedback: 'The original numbers could not account for the repair or its timing. Following an incomplete route more strictly would not make it complete.',
        },
        {
          id: 'income',
          label: 'A higher income was the only possible solution',
          feedback: 'More income can help, but Maya first needed dates, flexibility, and a place for irregular costs inside the income she already had.',
        },
        {
          id: 'timing-flex',
          isCorrect: true,
          label: 'Payday timing, irregular costs, and a planned place to bend',
          feedback: 'Exactly. A budget must move through real dates and leave a deliberate way to adjust.',
        },
      ],
    },
    reflect: 'Where does timing - rather than the total monthly amount - create the most pressure in a financial plan?',
    action: 'Place the next two paydays, five largest bills, and one irregular expense on a calendar. Mark where the route may need flexibility.',
    connection: {
      lookBack: 'The Gates identified the jobs. The Neighborhoods revealed which choices repeat.',
      newGrowth: 'The Streets place those jobs and habits inside one flexible route for income.',
      wholeTreeScenario: 'When an irregular cost lands beside a repeated habit, decide what must be protected, what can bend, and how the used category will be restored.',
      carryForward: 'A budget shows where Maya plans to go. The Marketplace will test whether a persuasive offer deserves a place on that route.',
    },
    rootCheckRecap: 'You now understand how to give income a route, include timing, and plan both the detour and the return. Next, Ivy will decide whether an attractive purchase is valuable enough to change that route.',
  },
  {
    key: 'marketplace',
    number: '04',
    title: 'The Marketplace',
    shortTitle: 'Marketplace',
    theme: 'Value-based spending',
    districtNote: 'The Marketplace represents every moment a product and its story compete for a place in your plan. Value becomes clearer when you examine the purchase\'s job, whole cost, and the priority it would displace.',
    promise: 'You will learn how to judge a purchase by its real value instead of its excitement, monthly payment, or label as a need or want.',
    sageOpening: 'The budget names Maya\'s direction. Now the Marketplace will offer her a dozen reasons to change it. Let\'s see which questions give her own priorities a voice.',
    journey: {
      arrival: 'Maya and Leo enter the Marketplace beneath bright screens and countdown signs. Maya\'s phone is scratched but dependable. Leo\'s battery has begun dying during work calls. At the largest phone shop, a sign promises the newest model for only $39 a month. Both of them stop, but they are not standing in front of the same decision.',
      sageDialogue: [
        'A shop sells a product and a story. The story may be convenience, confidence, status, safety, or fear of missing out.',
        'The monthly payment is real, but it is not the whole price and it is not the whole decision.',
        'Before asking whether something is a need or a want, ask what job it would do and what that job is worth here.',
      ],
      event: 'The salesperson shows Maya how polished the new phone would look at apprenticeship meetings. The offer includes a $120 activation fee and a 36-month commitment, bringing the total to $1,524. Maya begins imagining the upgrade, then remembers the course goal and the route she repaired in the Streets. She asks three questions: What problem will this solve? What is the whole cost? What will it postpone? A repair shop can replace her damaged screen for $90, so she chooses the repair after a 72-hour pause. Leo compares the same numbers and chooses replacement because his failing battery is interrupting the work that pays him. Neither choice becomes a universal rule. The difference is that both decisions now rest on purpose and full information rather than the size of the advertised payment.',
      story: [
        {
          type: 'narration',
          text: 'The Streets empty into the busiest part of the Marketplace. Shop windows flash weekly offers while overhead speakers promise easier, faster, newer versions of nearly everything. Maya and Leo stop beneath the largest display, where a phone turns slowly under bright glass. The sign advertises device financing for $39 a month. Maya\'s current phone has a scratched screen but works reliably. Leo\'s battery has begun dying during apprenticeship calls, and twice that week he has borrowed Maya\'s phone to return a supervisor\'s message.',
        },
        {
          type: 'narration',
          text: 'A salesperson places the new phone in Maya\'s hand and shows her the camera, the brighter screen, and the professional case included with the device. He mentions that polished equipment can make a good impression at meetings. Maya imagines arriving at the post-apprenticeship course looking as prepared as she hopes to feel. Thirty-nine dollars sounds manageable inside one month. The offer is valid through the end of the week, leaving enough time to sign but still creating a reason not to forget it.',
        },
        {
          type: 'sage',
          text: 'What job would this new phone do that the one you already carry cannot do?',
        },
        {
          type: 'narration',
          text: 'Maya asks for the complete device agreement. The $39 payment lasts for 36 months, and activation adds $120. The device alone will cost $1,524: $39 multiplied by 36, plus the fee. The payment fits inside one flexible month, but it will still be present long after the twelve-week apprenticeship ends. Maya places the agreement beside the $600 course information on her map. If she adds the phone, that future course must compete with another fixed claim on each paycheck.',
        },
        {
          type: 'narration',
          text: 'Maya does not reject the phone or sign immediately. She uses 72 hours of the week-long offer to gather another option. A repair shop quotes $90 to replace her scratched screen, and a diagnostic check confirms the battery is healthy. Leo brings in his phone too. His battery and charging port both need work, and the repair estimate is high enough that he wants to compare replacement seriously. The same offer now sits beside two different devices, two different problems, and two different budgets.',
        },
        {
          type: 'sage',
          text: 'If you leave here with different answers, which facts made the difference?',
        },
        {
          type: 'narration',
          text: 'Maya writes down what matters in her case: her phone already completes every required job, the screen repair is $90, the financed device is $1,524, and the new payment would slow the course. Leo writes down his own facts: his phone is interrupting work calls, the repair estimate is poor value on an aging device, and he can adjust his budget for the full device commitment without dropping a protected need. Maya chooses the repair and assigns $90 from the current paycheck\'s flexible category to it. A jacket she had planned to buy will wait, while the $42 cushion transfer and the course remain protected. Leo chooses the replacement and records all 36 payments before he signs.',
        },
        {
          type: 'narration',
          text: 'Three days after first entering the shop, they return together. Maya pays $90 and leaves with a clear screen on the phone she already owns. Leo activates the replacement that solves the failure affecting his work. The weekly offer is still available; neither had to race it. As they step into the quieter civic district, Maya still likes the new model and Leo still notices the size of the commitment. Both can explain what they chose, what it costs, and what each choice asks of the months ahead.',
        },
      ],
      transition: 'The shop noise fades as Maya and Leo leave with different choices and clear reasons. Sage turns toward City Hall, where one wise decision can be turned into a system that keeps working after the Marketplace is out of sight.',
    },
    question: 'Why can the same phone offer create real value for Leo and very little value for Maya?',
    rootRevealed: {
      title: 'The job, the whole cost, and the tradeoff',
      body: 'Value-based spending asks what a purchase will do, what it will cost in full, and what must wait if it enters the plan. A want is not automatically wasteful, and a need does not make every version equally valuable.',
    },
    concepts: [
      {
        title: 'Name the job before the label',
        storyLink: 'Maya\'s phone still completed its job, while Leo\'s phone was interfering with work calls.',
        body: 'Needs and wants are useful starting words, but they can hide the details. Food may be a need while the restaurant is a preference. A phone may be necessary while the newest model is an upgrade. Naming the exact job makes the comparison more honest.',
        recognize: 'This appears when an essential function is bundled with a brand, feature, convenience, or image and the whole package begins to feel equally necessary.',
      },
      {
        title: 'Calculate the whole cost',
        storyLink: 'The sign emphasized $39 while the activation fee and three-year commitment held most of the cost.',
        body: 'The full cost can include payments, fees, interest, maintenance, time, and the length of a commitment. Monthly pricing can improve affordability, but it can also make a large total easier to overlook.',
        recognize: 'Look for offers that make one small number prominent while placing the term, fees, or conditions somewhere less visible.',
      },
      {
        title: 'Give postponed priorities a voice',
        storyLink: 'Maya compared the phone not only with $39, but with the course and flexibility that payment would delay.',
        body: 'Opportunity cost is what a choice makes less possible for now. That does not make the purchase wrong. It ensures the priority being postponed is part of the decision rather than discovered afterward.',
        recognize: 'This shows up when a purchase fits one category but quietly slows a goal, reduces flexibility, or adds another fixed payment.',
      },
    ],
    scenario: {
      setup: 'Your current phone works. A new one costs $39 a month for 36 months plus a $120 activation fee. The offer runs through the end of the week.',
      prompt: 'Which question gives you the clearest view of its value?',
      options: [
        {
          id: 'total-cost',
          label: 'What is the whole cost and what will it postpone?',
          consequence: 'The offer becomes a $1,524 commitment that can be compared with keeping or repairing the current phone and with the goals already in your plan.',
          correction: 'If the upgrade still earns a place, identify the category and priority that will change so the commitment has a real route.',
          sage: 'The monthly payment tells you how the price arrives. The total and tradeoff tell you what the choice means.',
        },
        {
          id: 'purpose',
          label: 'What specific problem would the new phone solve?',
          consequence: 'You compare the upgrade with an actual job instead of the general excitement of something new.',
          correction: 'If the problem is real, compare every option that solves it. If no clear job appears, let the decision wait for a stronger reason.',
          sage: 'A product with a clear job can be evaluated. A product with only a feeling is harder to compare.',
        },
        {
          id: 'wait',
          label: 'Would the value survive a 72-hour pause?',
          consequence: 'The offer remains available while your own priorities have time to re-enter the conversation. Real value can survive a pause.',
          correction: 'Schedule a decision time and use the pause to gather the whole cost and alternatives. Waiting without returning is drift, not evaluation.',
          sage: 'A pause is not a no. It is room for the decision to become yours again.',
        },
      ],
    },
    recognitionCheck: {
      prompt: 'Why could Leo and Maya reasonably make different choices about the same phone?',
      options: [
        {
          id: 'income-status',
          label: 'The person with more income always gets the upgrade',
          feedback: 'Income affects room in a plan, but the story focused on the job, total cost, and priorities displaced - not a status rule.',
        },
        {
          id: 'same-rule',
          label: 'They could not; one choice must be financially correct for everyone',
          feedback: 'Value depends on circumstances and priorities. RootWise teaches a sound decision process rather than one universal purchase answer.',
        },
        {
          id: 'different-job',
          isCorrect: true,
          label: 'The phone solved a more important problem for Leo, and both compared the full tradeoff',
          feedback: 'Exactly. The same product can hold different value when its job and opportunity cost differ.',
        },
      ],
    },
    reflect: 'Think of a purchase you value. What job does it do, what is its whole cost, and what makes that tradeoff worthwhile to you?',
    action: 'Before one nonessential purchase, ask three questions: What job will it do? What is the whole cost? What will wait if I choose it?',
    connection: {
      lookBack: 'Maya\'s budget gave her money a direction before the offer appeared.',
      newGrowth: 'The Marketplace added a way to judge whether a purchase is valuable enough to change that direction.',
      wholeTreeScenario: 'When an attractive offer fits the monthly payment but competes with a goal, name its job, calculate the whole cost, and include the postponed priority.',
      carryForward: 'Thoughtful choices still require attention. City Hall will turn Maya\'s best intentions into systems that work on busy days too.',
    },
    rootCheckRecap: 'You now understand how to judge a purchase by its job, full cost, and tradeoff rather than one label or payment. Next, Ivy will learn why a good decision needs a reliable system behind it.',
  },
  {
    key: 'city-hall',
    number: '05',
    title: 'City Hall',
    shortTitle: 'City Hall',
    theme: 'Financial systems',
    districtNote: 'City Hall represents the quiet processes that keep essential work happening at the right time. A financial system coordinates triggers, actions, safeguards, and reviews so progress does not depend on perfect memory.',
    promise: 'You will learn how to build a simple financial system that solves a recurring problem at its source.',
    sageOpening: 'Maya knows how to make a thoughtful choice. Now she needs support that keeps the choice working when work is busy and attention is somewhere else.',
    journey: {
      arrival: 'A month after Maya enters the city, a second $35 late fee appears on the same utility bill. The bill is due three days before payday. Her monthly budget can cover it, but the calendar keeps placing the payment before the money. Frustrated with herself, Maya opens the provider app and turns on autopay so she cannot forget again.',
      sageDialogue: [
        'Automation repeats a decision beautifully - even when the route underneath it is poorly timed.',
        'When the same problem returns despite sincere effort, inspect the system before judging the person.',
        'A reliable system needs a trigger, an action, a safeguard, and a time to review whether it still works.',
      ],
      event: 'After paying the second fee, Maya turns on autopay and immediately compares the scheduled withdrawal with the paydays in her budget. The same $120 will still leave three days before the paycheck and could overdraw the account, so she pauses autopay before it can repeat the problem. Maya calls the provider and moves the due date to two days after payday. She then builds a one-bill buffer with four separate $30 contributions from flexible spending while her regular $42 cushion transfer continues. Once the timing and funding are sound, she turns autopay back on, adds a low-balance alert, and schedules a ten-minute Friday review. The system does not replace responsibility. It gives responsibility a structure that can survive a busy week.',
      story: [
        {
          type: 'narration',
          text: 'Later in the apprenticeship, Maya opens her utility account and finds a second $35 late fee on the same $120 bill. The first fee had appeared during the opening weeks of the apprenticeship; she paid it, marked the next date, and promised herself she would remember. The due date still falls three days before her weekly paycheck. Her broader monthly numbers can cover the bill, but the money available on that particular date cannot. A busy workweek passed, the payment waited, and the same fee returned. Maya is more frustrated by the repetition because this time she cannot tell herself the date was a surprise.',
        },
        {
          type: 'narration',
          text: 'Maya decides the weakness must be memory. She opens the provider app, pays the bill and fee, then activates autopay for the next cycle. The task can no longer be forgotten, which feels like relief. When the app displays the scheduled withdrawal, she places it beside the paydays and projected balances in her budget. The same $120 will still leave three days before the paycheck and may overdraw the account unless she intervenes again. Autopay will perform exactly what she requested, on exactly the date that created the original pressure.',
        },
        {
          type: 'sage',
          text: 'If you had remembered perfectly every month, would the money have arrived any sooner?',
        },
        {
          type: 'narration',
          text: 'Maya pauses the automatic payment and calls the utility provider. The representative can move the due date to two days after payday beginning with the next cycle. That solves the immediate mismatch, but Maya also wants enough space that a changed work schedule will not recreate the problem. She studies the routines inside City Hall: service dates, backup supplies, warning signals, and regular reviews. On her own calendar, the bill currently has only a deadline and a reaction after something goes wrong.',
        },
        {
          type: 'narration',
          text: 'Maya sets a separate $120 buffer target equal to one utility bill. She divides it into four $30 contributions from four weekly paychecks. The $30 comes from flexible money she identifies specifically for this temporary build; it does not replace or borrow from the regular $42 cushion transfer, which continues on its own schedule. For four weeks, the two transfers appear separately on payday: $42 toward the emergency cushion and $30 toward the utility buffer. Nothing is counted twice, and each amount has one destination.',
        },
        {
          type: 'sage',
          text: 'What needs to be true before you ask autopay to take over again?',
        },
        {
          type: 'narration',
          text: 'Maya checks the new due date, confirms the $120 buffer is fully funded, and turns autopay back on. She adds a low-balance alert as a safeguard and schedules a ten-minute Friday review to confirm upcoming withdrawals and restore the buffer if it is ever used. The next utility payment leaves two days after payday. The money is present, the buffer remains untouched, and the account shows neither a late fee nor an overdraft warning.',
        },
        {
          type: 'narration',
          text: 'On Friday, Maya sees the cleared $120 payment during the review and closes the account after a few quiet minutes. The bill has not disappeared, and she has not become responsible for remembering it at the exact right hour. The due date, buffer, automatic action, alert, and review now work in sequence. Outside City Hall, Leo is waiting at the stairs to the observation tower. Only one week of the twelve-week apprenticeship remains, and the city below is beginning to look less like separate stops.',
        },
      ],
      transition: 'The next payment clears quietly on the new date. For the first time, Maya notices the bill only during her Friday review. Sage leads her up the City Hall stairs toward the observation tower, where the systems below reveal what they are building together.',
    },
    question: 'Why did autopay repeat Maya\'s problem instead of solving it?',
    rootRevealed: {
      title: 'Repair the route before automating it',
      body: 'A financial system turns an intention into a repeatable process. Automation is one tool inside that process, but it works only when timing, funding, safeguards, and review are aligned first.',
    },
    concepts: [
      {
        title: 'Build the four parts of a system',
        storyLink: 'Maya aligned a payday trigger, an automatic action, a balance safeguard, and a weekly review.',
        body: 'A simple system answers four questions: What starts it? What happens automatically or routinely? What catches a problem? When will someone check that it still fits? Missing parts make the system fragile.',
        recognize: 'A recurring money task may lack a system when it succeeds only if you remember it at exactly the right moment.',
      },
      {
        title: 'Align timing before adding speed',
        storyLink: 'Autopay made the same badly timed withdrawal more reliable until Maya moved the due date.',
        body: 'Automation cannot repair a mismatch between income and due dates. First align the route through a changed date, planned transfer, or buffer. Then let automation reduce the burden of remembering.',
        recognize: 'This appears when an automated payment repeatedly creates a low balance, overdraft risk, or transfer scramble.',
      },
      {
        title: 'Use repetition as evidence',
        storyLink: 'Two late fees showed Maya that the design, not one forgotten afternoon, needed attention.',
        body: 'When a problem returns, ask what the current system keeps producing. The amount may be unrealistic, the date may be wrong, or the process may depend on perfect behavior. Responsibility includes repairing that design.',
        recognize: 'Look for sincere attempts that keep ending in the same fee, missed transfer, or stressful rush. Repetition often reveals the true source.',
      },
    ],
    scenario: {
      setup: 'A bill is due three days before payday and has produced two late fees. Monthly income is sufficient, but the timing repeats the problem.',
      prompt: 'Which system change should come first?',
      options: [
        {
          id: 'due-date',
          label: 'Align the due date with cash flow',
          consequence: 'The recurring mismatch is addressed at its source. Once aligned, reminders or autopay can repeat a workable route.',
          correction: 'If the company cannot move the date, ask about a grace period or split payment and create a temporary funding transfer while building a buffer.',
          sage: 'Sometimes financial responsibility looks like one phone call that gives every future month a better design.',
        },
        {
          id: 'buffer',
          label: 'Build a one-bill buffer over several paychecks',
          consequence: 'The account gradually stops depending on a perfect calendar, though the full solution takes time to build.',
          correction: 'Choose an amount from each paycheck, give the target a separate label, and use a reminder until the buffer is complete.',
          sage: 'A buffer is time stored as money. It turns a deadline from a crisis into a date.',
        },
        {
          id: 'autopay',
          label: 'Turn on autopay without changing anything else',
          consequence: 'Forgetting may disappear, but the payment can still arrive before the money and create an overdraft instead of a late fee.',
          correction: 'Pause or safeguard autopay until the date, funding transfer, or buffer is fixed. Automate only after the route works.',
          sage: 'Cruise control is helpful after the road is pointed in the right direction.',
        },
      ],
    },
    recognitionCheck: {
      prompt: 'Which order creates the most reliable system for Maya\'s bill?',
      options: [
        {
          id: 'automate-first',
          label: 'Automate, hope the balance is enough, and review only if a fee appears',
          feedback: 'This repeats the action before correcting timing or adding a safeguard.',
        },
        {
          id: 'align-protect-review',
          isCorrect: true,
          label: 'Align the timing, create a buffer, automate, then review',
          feedback: 'Exactly. The route works first, automation carries it, and review keeps it healthy.',
        },
        {
          id: 'remember-harder',
          label: 'Rely on memory and try harder each month',
          feedback: 'Attention is not a reliable system. The repeated mismatch would still be present even if Maya remembered the date.',
        },
      ],
    },
    reflect: 'Which recurring money task would become calmer if it had a clear trigger, action, safeguard, and review?',
    action: 'Improve one system today: align a due date, label a buffer, schedule a transfer, add an alert, or set a ten-minute weekly review.',
    connection: {
      lookBack: 'Maya can now see her starting point, reshape habits, route income, and judge value.',
      newGrowth: 'City Hall turns those choices into a process that continues when her attention is elsewhere.',
      wholeTreeScenario: 'Choose one recurring problem and build a trigger, action, safeguard, and review that respects the budget and protects the priorities behind it.',
      carryForward: 'A system answers how progress will continue. The Skyline will ask what future Maya wants those systems to build.',
    },
    rootCheckRecap: 'You now understand how financial systems repair problems, add safeguards, automate what works, and stay useful through review. Next, Ivy will connect every chapter to a future she has chosen deliberately.',
  },
  {
    key: 'skyline',
    number: '06',
    title: 'The Skyline',
    shortTitle: 'The Skyline',
    theme: 'Goal-directed planning',
    districtNote: 'The Skyline represents direction. A financial goal turns a valued future into a reason, amount, date, and next step while coordinating the habits, budget, choices, and systems beneath it.',
    promise: 'You will learn how to turn a meaningful future goal into a funded plan without copying someone else\'s definition of success.',
    sageOpening: 'The city has taught Maya how money moves. From the Skyline, she can decide what she wants all that movement to make possible.',
    journey: {
      arrival: 'At the end of the twelve-week apprenticeship, Maya receives a $1,000 completion bonus. From the observation tower, the whole city is visible: the Gates, the Neighborhoods, the Streets, the Marketplace, and City Hall. Her priorities are visible too. Her emergency cushion has reached $356 and needs $144 more to meet her first $500 target. She has an existing $420 balance. The professional course she hopes to take after the apprenticeship still costs $600. She also wants to celebrate finishing something difficult.',
      sageDialogue: [
        'A goal is not a picture of success. It is a future you value translated into decisions today.',
        'When several good futures ask for the same money, planning does not remove the tradeoff. It gives the tradeoff a reason.',
        'Look back across the city. Every district has already given Maya one part of this decision.',
      ],
      event: 'Maya leaves the bonus in checking and says she will decide later. During the next week, $85 moves through ordinary meals, rides, and small conveniences. None of the purchases is terrible, but the money has no named job, so nothing asks them to wait. With $915 remaining, Maya uses the whole city. One thoughtful plan assigns $144 to complete the cushion, $420 to clear the existing balance, $301 to the course, and $50 to a deliberate celebration. The remaining $299 course cost will be covered by seven more $42 transfers and one final $5 transfer. Another person could choose a different plan. Maya\'s plan works because every dollar has a reason, every unfinished goal has a next step, and the future is no longer depending on vague intention.',
      story: [
        {
          type: 'narration',
          text: 'On the final afternoon of the twelve-week apprenticeship, Maya and Leo climb the observation tower above the Skyline. From there, the city no longer looks like disconnected stops. The Gates open into the Neighborhoods, the Streets cross the Marketplace, and City Hall stands along the same route. Maya checks the cushion ledger she has carried through all of them. After the refill in the Streets and five more $42 weekly transfers, it has reached $356. Her first $500 target is now $144 away.',
        },
        {
          type: 'narration',
          text: 'At the completion ceremony, Maya receives a $1,000 bonus. The deposit gives several unfinished plans a way forward, but not enough to finish all of them. The cushion needs $144. The existing balance is $420. The post-apprenticeship course still costs $600. Maya also wants to celebrate the end of twelve demanding weeks with Leo. She can explain why each choice matters, yet she cannot find one division that feels obviously correct. She leaves the full bonus in checking and tells herself she will decide when the answer becomes clearer.',
        },
        {
          type: 'narration',
          text: 'During the next week, $85 leaves through ordinary meals, rides, and small conveniences. None of the purchases is a disaster, and Maya could have chosen any of them deliberately. But she had not decided how much of the bonus was free for the week, so each purchase answered that question separately. When she finally opens the account, $915 remains. Waiting has not kept every option unchanged. It has allowed the nearest choices to begin dividing the money before the larger plans receive an amount.',
        },
        {
          type: 'sage',
          text: 'What were you waiting to learn this week—and did the week give you that answer?',
        },
        {
          type: 'narration',
          text: 'Maya writes the real amount, $915, at the center of the folded city map. She confirms that the next paycheck already protects rent, groceries, gas, and the separate $120 utility buffer. The weekly $42 transfer can continue after the apprenticeship because her new work schedule begins the following Monday. She writes beside each larger choice what it would change now: the cushion would reach its first target, the existing balance would disappear, the course would move closer, and a celebration would mark something she does not want to rush past without noticing.',
        },
        {
          type: 'sage',
          text: 'If today cannot finish every goal, which results do you want now, and what route will carry the unfinished one forward?',
        },
        {
          type: 'narration',
          text: 'Maya assigns $144 to the cushion, bringing it from $356 to exactly $500. She assigns $420 to clear the existing balance, $301 to the professional course, and $50 to a deliberate celebration with Leo. The four amounts total the remaining $915. The course still needs $299. Seven more $42 transfers will cover $294, and an eighth, smaller $5 transfer will finish it. Maya marks that final week on the calendar instead of calling the course “later.” Every dollar in the bonus now belongs to one named result.',
        },
        {
          type: 'narration',
          text: 'That evening Maya and Leo celebrate at a small rooftop restaurant where the city lights come on below them. The meal has a set $50 place in the plan, so it does not need to compete silently with the course or cushion while they enjoy it. Before leaving the tower, Maya folds the map one final time. At the Grove, the city remains visible beyond the tree, but the first root now carries every stop together. Sage turns toward the next path, where questions of trust, promises, credit, and future income are waiting.',
        },
      ],
      transition: 'Maya, Leo, and Sage walk back to the Grove. The city does not vanish behind them; it settles into the first root of the tree. In the distance, the next path rises toward questions of trust, promises, credit, and future income.',
    },
    question: 'What changed when Maya turned the bonus from money she was holding into money with named jobs and next steps?',
    rootRevealed: {
      title: 'A future translated into decisions',
      body: 'Goal-directed planning gives a valued future a reason, an amount, a date, and a funded next step. The goal then coordinates the earlier concepts instead of competing with them as a vague wish.',
    },
    concepts: [
      {
        title: 'Give the future a reason and a number',
        storyLink: 'The cushion, existing balance, course, and celebration became comparable only when Maya named what each one would do and what each required.',
        body: 'A goal becomes usable when it answers: Why does this matter? Roughly how much will it take? When will I review or complete it? What is the next action? Precision can improve later, but direction needs a concrete beginning.',
        recognize: 'A wish may remain important for years while receiving no money because it has never been translated into one amount and one next step.',
      },
      {
        title: 'Prioritize without pretending only one goal matters',
        storyLink: 'Maya\'s $915 could not finish every priority, so she chose what to complete, what to advance, and how the unfinished work would continue.',
        body: 'Planning several goals means deciding which needs momentum now, which protects options, and which can grow through a slower habit. Focus and balance are both valid when the reasoning and consequences are visible.',
        recognize: 'This appears when emergency savings, existing obligations, growth, and enjoyment all deserve attention but cannot all receive the full amount today.',
      },
      {
        title: 'Connect the goal to a repeatable system',
        storyLink: 'The course did not depend on the bonus alone; Maya kept the $42 weekly transfer and gave the remaining $299 a realistic finish line.',
        body: 'A goal supported only by motivation can stall when attention changes. A recurring transfer, calendar date, milestone, and review turn delayed gratification into a working plan rather than an endless wait.',
        recognize: 'Look for goals that receive bursts of attention but have no scheduled action between those bursts.',
      },
    ],
    scenario: {
      setup: 'You receive an unexpected $1,000 while a safety goal, an existing balance, and a professional opportunity all need funding.',
      prompt: 'Which planning approach gives the money the clearest direction?',
      options: [
        {
          id: 'one-goal',
          label: 'Fund the single goal with the strongest current impact',
          consequence: 'One priority may change quickly while the others remain in place for now. The clarity comes from naming why this goal goes first.',
          correction: 'Set a review date and a next step for the other priorities so focus does not quietly turn into neglect.',
          sage: 'Concentration can create momentum. Make the reason and the cost of waiting visible.',
        },
        {
          id: 'split',
          label: 'Divide it deliberately and give every unfinished goal a next step',
          consequence: 'Several priorities move, though fewer may be completed immediately. The plan remains clear because each amount has a job and continuation.',
          correction: 'Avoid random percentages. Choose each amount from the result it creates and schedule which goal receives the next available dollar.',
          sage: 'Balanced does not have to mean vague. Every piece should be able to explain why it is there.',
        },
        {
          id: 'pause',
          label: 'Pause briefly, gather the missing facts, and schedule the decision',
          consequence: 'You gain time to compare urgency, cost, and opportunity. Without an appointment, however, thoughtful waiting can become unplanned drift.',
          correction: 'Name the facts you need and put the decision on the calendar. At that time, choose with the best information available.',
          sage: 'A pause becomes part of a plan when it has a purpose and an ending.',
        },
      ],
    },
    recognitionCheck: {
      prompt: 'What turned Maya\'s bonus into a goal-directed plan?',
      options: [
        {
          id: 'leave-it',
          label: 'Leaving it unassigned until the perfect answer appeared',
          feedback: 'The unassigned week showed that waiting without a date or purpose allowed other choices to make the decision gradually.',
        },
        {
          id: 'largest-only',
          label: 'Automatically choosing whichever goal had the largest number',
          feedback: 'Size alone does not reveal value, urgency, or what the goal makes possible.',
        },
        {
          id: 'reason-amount-next',
          isCorrect: true,
          label: 'Giving each priority a reason, amount, consequence, and next step',
          feedback: 'Exactly. The plan connected a valued future to decisions and systems already working today.',
        },
      ],
    },
    reflect: 'What would you like money to make more possible - and what is one small funded step that could begin that direction?',
    action: 'Write one 90-day goal in four lines: why it matters, the amount, the next funded step, and the date you will review it.',
    connection: {
      lookBack: 'Maya entered the city learning to see what was true. She then reshaped a habit, routed income, judged value, and built a reliable system.',
      newGrowth: 'The Skyline joins those lessons into one financial life directed toward a future Maya chose for herself.',
      wholeTreeScenario: 'Take one goal and give it an honest starting point, a supporting habit, a place in the budget, a clear value test, and a system that keeps it moving.',
      carryForward: 'Root One is part of the tree now. The next root will add trust, agreements, credit, and future income to everything this city taught you.',
    },
    rootCheckRecap: 'You strengthened goal-directed planning and completed Root One: see clearly, shape habits, route income, judge value, build systems, and fund a future. The city was the setting; the financial foundation is what you carry forward.',
  },
];

function continueWithIvyAndEli(value) {
  if (typeof value === 'string') {
    return value.replace(/\bMaya\b/g, 'Ivy').replace(/\bLeo\b/g, 'Eli');
  }
  if (Array.isArray(value)) return value.map(continueWithIvyAndEli);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, continueWithIvyAndEli(item)]));
  }
  return value;
}

export const rootOneDistricts = [
  rootOneChapterOne,
  ...legacyRootOneDistricts.slice(1).map(continueWithIvyAndEli),
];

export const rootOneQuickPrompts = [
  { key: 'deep-dive', label: 'Deeper Dive' },
];
