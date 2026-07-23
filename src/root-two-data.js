const chapterOneLessons = [
  {
    number: "1.1",
    title: "The Quick Repair",
    focus: "Speed, expertise, and the result",
    opening:
      "Ivy and Eli enter the working district expecting to find wages posted beside every kind of work. The first price they encounter is attached to a repair that takes less time than a cup of coffee.",
    story: [
      {
        type: "narration",
        text: "The district wakes around them in layers: delivery carts rattling over stone, shopkeepers lifting shutters, steam escaping from kitchens, and workers crossing the square with tools worn smooth by years of use. Eli stops beside a laundress whose press has locked halfway down. A line of unfinished orders waits behind her, and the morning pickup cart is less than an hour away.",
      },
      {
        type: "narration",
        text: "A repair technician named Nicole kneels beside the press, listens once, removes a narrow side panel, and resets a slipped safety catch. The machine hums back to life in eleven minutes. Nicole writes seventy-five dollars on the invoice.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "Seventy-five dollars for eleven minutes? I’m not saying it wasn’t useful. I’m saying she barely had to do anything.",
      },
      {
        type: "narration",
        text: "Nicole hears him. She does not become defensive. She points to three things: the press is operating before the pickup cart arrives, no replacement part was purchased, and the laundress did not lose a morning of orders. Then Nicole opens her tool case. Tucked beneath the wrenches are years of worn service manuals, training cards, and notes from hundreds of earlier repairs.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "If Nicole had needed three hours to discover the same answer, would the result have become more valuable—or merely slower?",
      },
      {
        type: "narration",
        text: "Eli watches the laundress restart the press. The invoice did not purchase eleven minutes of visible movement. It purchased a correct diagnosis, restored production, avoided delay, and the confidence to touch a machine that could injure someone if handled badly. The short repair was not evidence that little value existed. It was evidence that much of the work happened before Nicole arrived.",
      },
    ],
    concept: {
      title: "Elapsed time does not contain the whole value",
      explanation:
        "Time is one part of many work exchanges, especially when someone is paid by the hour. But a buyer may also be exchanging money for accuracy, judgment, speed, safety, access, avoided loss, or a result they cannot create alone. Expertise often shortens the visible work because earlier practice has already absorbed the mistakes, pattern-finding, and learning.",
    },
    tradeoff:
      "Pricing only by time can make an efficient expert appear less valuable than an inexperienced person who needs longer. Pricing only by the result can also ignore the worker’s time, preparation, and boundaries. Seeing both prevents one measurement from pretending to be the entire exchange.",
    connection:
      "Think about a task you now complete quickly because you have repeated it many times. Someone watching only the final minutes would not see the learning stored inside them.",
    application: {
      prompt:
        "Name one task you can do more quickly now than when you began. What knowledge, judgment, or avoided mistake is hidden inside that speed?",
      placeholder:
        "The task is… I became faster because… The person receiving the work benefits because…",
    },
    check: {
      prompt: "What did the laundress receive beyond eleven minutes of Nicole’s time?",
      options: [
        {
          label: "Only the physical motion of resetting a catch",
          feedback:
            "That describes what was visible, but it leaves out the knowledge and consequences surrounding the repair.",
        },
        {
          label:
            "A correct diagnosis, restored production, avoided delay, and reduced risk",
          correct: true,
          feedback:
            "Exactly. The eleven minutes held years of preparation and several valuable results.",
        },
        {
          label: "Proof that every fast worker should charge more",
          feedback:
            "The story does not create a universal pricing rule. It shows which facts belong in the exchange before anyone evaluates the price.",
        },
      ],
    },
    takeaway:
      "A short task may contain a long history of learning. Measure the exchange by more than the clock.",
  },
  {
    number: "1.2",
    title: "The Years Inside the Hour",
    focus: "Accumulated knowledge",
    opening:
      "Nicole invites Ivy and Eli to walk with her to the next repair. Eli is still looking at the invoice, but now he is curious about everything the number failed to show.",
    story: [
      {
        type: "narration",
        text: "On the way, Nicole describes her first year in the trade. She carried tools for a senior technician and was not permitted to diagnose dangerous equipment alone. She learned electrical safety, studied diagrams at night, ruined inexpensive practice parts, and spent months recognizing which sounds meant wear, blockage, loose alignment, or immediate danger.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "So the customer isn’t paying you today for every hour you spent learning. But those hours change what you can do today.",
      },
      {
        type: "narration",
        text: "Nicole nods. Her next customer runs a small bakery. One oven is heating unevenly, and the baker has already replaced a sensor without solving the problem. Nicole checks the repair history, watches one heating cycle, and notices a faint color change near a connection. She shuts the oven down before opening it. The wire beneath the panel has begun to burn.",
      },
      {
        type: "narration",
        text: "Eli realizes he would not have noticed the color change. Even if he had, he would not have known whether it meant dust, age, or danger. Nicole’s expertise is not simply possessing information. It is retrieving the right knowledge in the right moment and accepting responsibility for what happens next.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Experience is not a pile of old hours. It is what those hours allow someone to recognize, decide, and prevent now.",
      },
      {
        type: "narration",
        text: "The baker cancels the afternoon batch while the connection is replaced. That costs money today. Continuing to use the oven might have cost much more—or harmed someone. The accumulated knowledge inside Nicole’s hour does not remove every cost. It changes which cost becomes necessary.",
      },
    ],
    concept: {
      title: "Present work can carry past investment",
      explanation:
        "Training, supervised practice, repeated exposure, mistakes, feedback, licensing, and continuing education can accumulate into capability. The market does not automatically reward every year of experience, and time served is not the same as skill gained. The financially relevant question is what the accumulated experience now allows the worker to do reliably.",
    },
    tradeoff:
      "Experience may improve speed and judgment, but it can require years of lower pay, tuition, tools, exams, or restricted responsibility first. It can also become outdated. The years matter when they produce a capability that remains useful—not merely because they passed.",
    connection:
      "You carry accumulated knowledge whether or not your current title names it. Some came from paid work; some came from caregiving, problem-solving, recovery, community roles, or learning outside a formal classroom.",
    application: {
      prompt:
        "Choose one capability you trust yourself to perform. What experiences built it, and what can you now notice or decide that a beginner may not?",
      placeholder:
        "I can reliably… I learned through… I now recognize…",
    },
    check: {
      prompt: "Why did Nicole’s experience matter during the bakery repair?",
      options: [
        {
          label: "It guaranteed that repairing the oven would cost nothing",
          feedback:
            "Experience did not erase the cost. It helped identify the danger and choose which cost to face.",
        },
        {
          label:
            "It allowed her to recognize a small warning, interpret it, and act before greater harm",
          correct: true,
          feedback:
            "Yes. The accumulated hours became useful through present recognition, judgment, and responsibility.",
        },
        {
          label: "It made every opinion she might have equally valuable",
          feedback:
            "Expertise is usually specific. Capability in one area does not make every judgment reliable.",
        },
      ],
    },
    takeaway:
      "Experience becomes financially relevant when yesterday’s learning improves what someone can reliably do today.",
  },
  {
    number: "1.3",
    title: "Effort and Results",
    focus: "Hard work and different outcomes",
    opening:
      "At the bakery, the cancelled batch leaves two crews with the same urgent problem: prepare enough bread for the evening market before the remaining ovens reach capacity.",
    story: [
      {
        type: "narration",
        text: "One crew begins mixing every recipe scheduled for the day. They move constantly—lifting sacks, washing bowls, measuring ingredients, and shifting trays between crowded tables. No one could honestly say they are not working hard.",
      },
      {
        type: "narration",
        text: "The second crew pauses. They compare oven temperatures, baking times, ingredient supply, and the orders customers have already paid for. They choose three breads that can share a temperature, postpone two low-demand pastries, and arrange one exchange with a bakery across the square.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "The first crew worked harder. Look at them. They haven’t stopped moving.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "They did work hard. But some of that work is creating dough the ovens cannot bake before closing.",
      },
      {
        type: "narration",
        text: "By late afternoon, both crews are exhausted. The first has produced more unfinished dough and several orders that do not match. The second has produced fewer varieties but completed every prepaid order and enough bread for the market. Equal effort did not become an equal result because planning, constraints, sequence, and demand shaped what the effort could produce.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Effort deserves respect. Results affect the exchange. Confusing either one with human worth will distort what happened here.",
      },
      {
        type: "narration",
        text: "Eli resists the conclusion at first. He hears it as an accusation against the first crew. Sage returns him to the facts: they worked hard, the system gave them poor coordination, and part of their effort did not reach a sellable result. The lesson is not that effort is meaningless. It is that effort alone cannot predict financial value.",
      },
    ],
    concept: {
      title: "Effort is an input; a usable result is an outcome",
      explanation:
        "Work can require enormous physical or emotional effort without producing the same quantity, quality, timing, safety, or usefulness as other work. Tools, systems, information, authority, health, experience, demand, and luck all affect how effort becomes a result. Markets usually respond to some combination of the result and the conditions around it—not to exertion alone.",
    },
    tradeoff:
      "Focusing only on results can hide poor systems, unequal resources, unpaid labor, or circumstances outside the worker’s control. Focusing only on effort can hide whether the work solved the needed problem. A fair examination keeps the input, conditions, and outcome visible together.",
    connection:
      "Recall a time when you worked extremely hard but the result still fell short. The gap may contain information about timing, tools, clarity, support, or constraints—not a verdict about your character.",
    application: {
      prompt:
        "Take one repeated task. Separate the effort you invest from the result it is meant to create. What condition helps or blocks that effort from reaching the result?",
      placeholder:
        "The effort is… The intended result is… One condition affecting the result is…",
    },
    check: {
      prompt: "What most accurately explains the difference between the bakery crews?",
      options: [
        {
          label: "The first crew did not care enough",
          feedback:
            "The story gives no evidence of that. They worked intensely; coordination and constraints affected the outcome.",
        },
        {
          label:
            "Effort interacted with planning, capacity, sequence, and demand to produce different results",
          correct: true,
          feedback:
            "Correct. The outcome cannot be understood from effort alone.",
        },
        {
          label: "Only results matter, so working conditions are irrelevant",
          feedback:
            "Conditions help explain what results were possible and who had control over them.",
        },
      ],
    },
    takeaway:
      "Hard work is real. Financial value also depends on what the effort can produce under the conditions surrounding it.",
  },
  {
    number: "1.4",
    title: "Who Needs the Work?",
    focus: "Demand, availability, and timing",
    opening:
      "The bakery finishes its evening orders just as a storm closes the eastern road. By sunset, the working district needs several things at once—and not enough people are available to provide them.",
    story: [
      {
        type: "narration",
        text: "A fallen branch blocks the delivery route. The district needs someone licensed to operate the lifting crane, but the nearest operator is across the river. A dozen strong workers stand ready beside the branch. None is authorized to use the machine.",
      },
      {
        type: "narration",
        text: "At the same time, the market musicians discover that the covered hall has already hired a performer. Several talented players are available, but only one performance is needed. Their skill is genuine; tonight the number of available performers is greater than the number of paid openings.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "So the crane operator can ask for more because people are desperate?",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Need changes bargaining power. That fact can describe an exchange without automatically deciding whether every use of that power is fair.",
      },
      {
        type: "narration",
        text: "The district coordinator offers the crane operator emergency pay for the evening call. The operator must leave dinner, travel in dangerous weather, accept responsibility for the lift, and be available when no substitute can arrive. The higher pay reflects scarcity, timing, disruption, risk, and the cost of waiting.",
      },
      {
        type: "narration",
        text: "The musicians face the other side of the same equation. One chooses an unpaid community performance, one goes home, and another asks nearby restaurants whether they need music later in the week. Lower demand tonight does not reduce their human worth or erase their ability. It changes the exchanges currently available.",
      },
    ],
    concept: {
      title: "Value meets a market through demand and availability",
      explanation:
        "A skill can be useful without producing income at every time and place. Financial exchange also depends on who needs the result, how urgently they need it, what alternatives exist, how many providers are available, what they can afford, and whether the worker can reach them. Demand is not a moral ranking. It is a condition of the market.",
    },
    tradeoff:
      "Scarcity can increase pay because availability, inconvenience, or risk has value. It can also create opportunities for exploitation when someone has no meaningful alternative. High demand does not settle whether a price is ethical; it explains one force shaping the price.",
    connection:
      "The same capability may receive different responses across neighborhoods, seasons, industries, or hours of the day. When income changes, the worker may not be the only thing that changed.",
    application: {
      prompt:
        "Choose one kind of work. List one situation that could increase demand for it and one substitute that could reduce demand.",
      placeholder:
        "The work is… Demand may rise when… A substitute or alternative is…",
    },
    check: {
      prompt: "Why did the crane operator receive emergency pay?",
      options: [
        {
          label: "Because the operator was worth more as a human that evening",
          feedback:
            "Human worth did not change. The conditions of the exchange changed.",
        },
        {
          label:
            "Because urgency, scarce authorization, risk, disruption, and the cost of waiting changed the exchange",
          correct: true,
          feedback:
            "Exactly. Several market conditions made that availability more financially valuable in that moment.",
        },
        {
          label: "Because physical strength is never valuable",
          feedback:
            "Strength may be valuable, but it was not a substitute for authorization and safe crane operation in this situation.",
        },
      ],
    },
    takeaway:
      "Useful work becomes paid work when it meets a need, a willing exchange, and the conditions that allow both sides to act.",
  },
  {
    number: "1.5",
    title: "Price Is Not Human Worth",
    focus: "Separating the market from the person",
    opening:
      "By morning, the road is clear. Eli has watched prices rise and fall around skill, urgency, results, and availability. One question has been following him through every exchange.",
    story: [
      {
        type: "narration",
        text: "In a quiet courtyard, the district posts the previous day’s payments. The crane operator earned emergency pay. Nicole earned two repair fees. The musicians earned different amounts, and one earned nothing from the community performance. A caregiver who stayed beside an ill neighbor through the storm does not appear on the board at all.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "If money follows value, what does the board say about the caregiver? That her work mattered less because nobody bought it?",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "It says no market exchange recorded it. That isn’t the same statement.",
      },
      {
        type: "narration",
        text: "Sage asks them to name everything a price can reflect: demand, supply, timing, bargaining power, budgets, law, custom, access, discrimination, information, alternatives, and who controls the money. A wage or fee contains evidence about an exchange. It does not contain a complete measurement of contribution, character, sacrifice, or human importance.",
      },
      {
        type: "narration",
        text: "They visit Nicole one final time. She tells Eli that a high invoice can never make her more human than the laundress who pays it. A quiet month does not erase her knowledge. And if a customer cannot afford a necessary repair, the need may remain real even when no transaction can occur.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Price answers a narrow question: what was exchanged here, under these conditions? Human worth is not for sale, so the market cannot calculate it.",
      },
      {
        type: "narration",
        text: "Eli looks again at the payment board. It has become more useful now that he no longer asks it to answer a question it was never capable of answering. The numbers can help him evaluate work, opportunity, and bargaining power. They cannot tell him who deserves dignity.",
      },
    ],
    concept: {
      title: "Market price and human worth belong to different categories",
      explanation:
        "Pay is influenced by what an employer or buyer wants, can afford, and has power to negotiate—along with scarcity, policy, access, prejudice, history, and alternatives. None of those forces can measure a person’s right to dignity or the full value of unpaid contribution. Separating the two makes pay easier to examine honestly because low compensation no longer has to become a personal verdict.",
    },
    tradeoff:
      "Rejecting price as a measure of human worth does not make price irrelevant. People still need income, and unequal pay has real consequences. The separation allows the learner to challenge an exchange without concluding that the person receiving less is worth less.",
    connection:
      "Notice the language people use around earnings: successful, unskilled, important, replaceable, deserving. Which words describe market conditions, and which quietly attempt to describe the human being?",
    application: {
      prompt:
        "Write two separate statements about one job: one describing what affects its pay, and one describing a contribution it makes that the pay may not fully capture.",
      placeholder:
        "The pay is affected by… The work also contributes…",
    },
    check: {
      prompt: "What can a price or wage legitimately tell us?",
      options: [
        {
          label: "The complete worth of the person receiving it",
          feedback:
            "A market exchange cannot measure human dignity, character, or every form of contribution.",
        },
        {
          label:
            "Something about what was exchanged and the market conditions surrounding it",
          correct: true,
          feedback:
            "Yes. Price is evidence about an exchange, not a complete verdict on a person or even on all value created.",
        },
        {
          label: "Whether unpaid work has no value",
          feedback:
            "Unpaid work can create substantial value even when no market transaction records it.",
        },
      ],
    },
    takeaway:
      "Income can describe an exchange. It cannot describe the worth of the person inside it.",
  },
];

const chapterTwoLessons = [
  {
    number: "2.1",
    title: "Hourly Pay",
    focus: "When time is the unit of exchange",
    opening:
      "The next morning, Ivy and Eli enter the district’s hiring hall. The first opportunity posts one clear number beside one clear unit: twenty-two dollars for each recorded hour.",
    story: [
      {
        type: "narration",
        text: "Ivy follows a warehouse coordinator named Nia through a seven-hour shift. Nia is paid for the hours she works, so an extra hour adds pay and a cancelled hour removes it. The structure makes the basic calculation visible: rate multiplied by recorded hours.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "That makes the exchange simple. She can see what each hour adds.",
      },
      {
        type: "narration",
        text: "Then the afternoon delivery is cancelled. Nia is sent home two hours earlier than scheduled. Her time has been returned, but the income she expected from those hours disappears. Next week, a late truck may create extra hours instead. The rate is steady; the number of paid hours is not.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "An hourly rate tells you the value assigned to the unit. It does not promise how many units will be available.",
      },
      {
        type: "narration",
        text: "Eli notices another boundary. Nia must record when work begins and ends, but the employer controls the schedule and much of what happens inside it. Hourly pay can protect the value of additional time when the rules are followed. It can also leave income exposed when hours change.",
      },
    ],
    concept: {
      title: "Hourly pay ties earnings directly to recorded time",
      explanation:
        "The base calculation is the hourly rate multiplied by paid hours. The arrangement makes additional or missing hours financially visible. Actual pay can still be affected by scheduling, overtime rules, different shift rates, unpaid breaks, and whether all compensable time is recorded.",
    },
    tradeoff:
      "Hourly work can create a clear boundary between paid and unpaid time, yet income may move when schedules change. More earnings commonly require more paid hours unless the rate changes.",
    connection:
      "If you have ever built a plan from a posted hourly rate, did you also know how many hours were guaranteed, typical, or merely possible?",
    application: {
      prompt:
        "Choose an hourly rate and compare earnings at three different weekly hour totals. What stays fixed, and what moves?",
      placeholder:
        "Rate… Lower-hour week… Expected week… Higher-hour week…",
    },
    check: {
      prompt: "What important fact is missing when an offer lists only an hourly rate?",
      options: [
        {
          label: "Whether the worker has a last name",
          feedback: "That does not determine the earnings calculation.",
        },
        {
          label: "How many paid hours are guaranteed, typical, or available",
          correct: true,
          feedback:
            "Yes. The rate names one unit; the number of paid units determines the gross earnings.",
        },
        {
          label: "Whether every week will contain overtime",
          feedback:
            "Overtime cannot be assumed. The missing fact is the actual availability and treatment of hours.",
        },
      ],
    },
    takeaway:
      "An hourly rate is only half of the first calculation. Hours determine how much of that rate becomes earnings.",
  },
  {
    number: "2.2",
    title: "Salary",
    focus: "A recurring amount for an ongoing role",
    opening:
      "Across the hall, Ivy finds an annual salary posted for an operations role. The amount is divided into regular pay periods instead of recalculated from each ordinary hour.",
    story: [
      {
        type: "narration",
        text: "The role belongs to Tomas, who coordinates shipments, staff coverage, and customer problems. His regular gross paycheck is predictable. A quiet week and a chaotic week begin with the same salary calculation.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "So he is not paid for time at all?",
      },
      {
        type: "narration",
        text: "Tomas shows them his calendar. The role still requires his time, attention, availability, and results. Salary changes how ordinary earnings are expressed; it does not make hours or workload disappear. During peak season he often stays late. During a calm period he may leave on time without losing pay.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Salary creates regularity in the payment. It does not, by itself, describe the legal classification, the workload, or the boundaries.",
      },
      {
        type: "narration",
        text: "Ivy stops treating the annual number as a complete offer. She asks what the role owns, how performance is judged, which hours are expected, whether additional time receives additional pay, and how often the salary is reviewed.",
      },
    ],
    concept: {
      title: "Salary spreads agreed compensation across pay periods",
      explanation:
        "A salary commonly names annual compensation for an ongoing role and is paid in regular portions. It often creates more predictable gross pay than variable hourly schedules. Salary alone does not determine overtime eligibility, reasonable workload, job security, or total compensation; those require additional facts.",
    },
    tradeoff:
      "Predictable pay can make planning easier. If the role regularly consumes more time than expected without additional compensation, the effective return for each hour of life may fall.",
    connection:
      "When you hear an annual salary, do you picture the work itself—or only the size of the yearly number?",
    application: {
      prompt:
        "List three questions that would help you understand the workload and boundaries behind a salary.",
      placeholder:
        "I would ask about…",
    },
    check: {
      prompt: "Which statement about salary is most accurate?",
      options: [
        {
          label: "Salary guarantees that working hours never matter",
          feedback:
            "Time, workload, and legal rules still matter even when ordinary pay is expressed annually.",
        },
        {
          label:
            "Salary usually creates regular pay, while workload, classification, and boundaries require separate facts",
          correct: true,
          feedback:
            "Exactly. The payment structure is only one part of the working arrangement.",
        },
        {
          label: "Every salaried worker receives the same benefits",
          feedback:
            "Benefits vary by employer, role, eligibility, and plan terms.",
        },
      ],
    },
    takeaway:
      "Salary can stabilize the paycheck without stabilizing the amount of time or responsibility the role requires.",
  },
  {
    number: "2.3",
    title: "Tips and Commission",
    focus: "Income connected to customer choices or sales",
    opening:
      "At lunch, Ivy and Eli meet two workers whose earnings can change even when they work the same number of hours.",
    story: [
      {
        type: "narration",
        text: "Rosa serves tables at a busy café and receives tips in addition to her employer-paid wages. Dev helps customers choose commercial equipment and earns commission on qualifying sales. Both can have a strong day or a weak day without changing their scheduled time.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "Their income responds to results—but not only to results they control.",
      },
      {
        type: "narration",
        text: "Rain empties Rosa’s patio even though her service is excellent. Dev loses a sale because a customer’s financing is delayed. On another day, a convention fills every café seat and a large account arrives already prepared to buy. Skill matters, but traffic, pricing, territory, customer budgets, policies, and luck also enter the earnings.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Variable pay can reward influence. It becomes dangerous when someone is held responsible for conditions they cannot see or control.",
      },
      {
        type: "narration",
        text: "Eli asks how each arrangement handles returns, shared tables, team sales, slow seasons, and disputed credit. The percentage alone is not enough. They need the rules that decide which transaction counts and when the money becomes final.",
      },
    ],
    concept: {
      title: "Tips and commission connect part of earnings to transactions",
      explanation:
        "Tips depend on customer behavior within the rules of the workplace. Commission usually pays a stated amount or percentage when defined sales conditions are met. Either may exist beside base pay. The formula, timing, reversals, customer traffic, assigned opportunities, and worker control all affect how dependable the earnings are.",
    },
    tradeoff:
      "The worker may benefit when demand is strong, but also carries more of the uncertainty when demand weakens or a transaction changes. Higher possible earnings are not the same as guaranteed earnings.",
    connection:
      "Have you ever seen a worker’s pay depend on another person’s mood, timing, budget, or decision? Which parts of the result did the worker actually control?",
    application: {
      prompt:
        "Write the full path from customer action to worker pay in a tip- or commission-based role. Where could the amount change?",
      placeholder:
        "Customer action… Rule… Timing… Possible change… Final pay…",
    },
    check: {
      prompt: "Why can two equal work periods produce different tip or commission income?",
      options: [
        {
          label: "Because one worker must always have tried less",
          feedback:
            "Effort may differ, but demand, opportunity, customer behavior, and policy can change earnings too.",
        },
        {
          label:
            "Because transactions depend on both worker influence and conditions outside the worker’s control",
          correct: true,
          feedback:
            "Yes. Variable earnings reflect a larger system than individual effort alone.",
        },
        {
          label: "Because variable income is never legitimate",
          feedback:
            "The structure can be legitimate; the lesson is to understand its formula, control, timing, and risk.",
        },
      ],
    },
    takeaway:
      "When pay follows a transaction, examine who creates the opportunity, who controls the result, and when the earning becomes final.",
  },
  {
    number: "2.4",
    title: "Bonuses and Incentives",
    focus: "Conditional money",
    opening:
      "A bright banner in the hiring hall promises a year-end bonus. Eli adds it to the annual income before Ivy has finished reading the smaller print.",
    story: [
      {
        type: "narration",
        text: "The employer explains that the bonus may depend on company profit, team performance, individual targets, continued employment on the payment date, and leadership approval. Some conditions are measurable. Others preserve the employer’s discretion.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "But they put ten percent on the banner. Why would I not count it?",
      },
      {
        type: "narration",
        text: "Ivy draws two columns: compensation that is committed under the offer and compensation that becomes available only if later conditions are met. The bonus may be meaningful. It simply does not belong in both columns.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Possible money can influence a decision. It cannot safely perform the job of certain money before the conditions occur.",
      },
      {
        type: "narration",
        text: "They ask what happened during the previous three years, which measures are within the worker’s control, whether the plan can change, when it pays, and what occurs if someone leaves before that date. The banner becomes less exciting and far more useful.",
      },
    ],
    concept: {
      title: "Incentive pay is conditional compensation",
      explanation:
        "Bonuses may reward individual, team, or company outcomes; some are defined by a formula and others are discretionary. Understanding the opportunity requires the target amount, actual history, eligibility rules, measurement period, payment date, and conditions that can reduce or eliminate it.",
    },
    tradeoff:
      "Incentives can share upside and focus attention. They can also shift risk to workers, reward the wrong behavior, or encourage someone to build recurring obligations around money that may not arrive.",
    connection:
      "What language makes possible income sound guaranteed: target, typical, up to, expected, eligible, or discretionary?",
    application: {
      prompt:
        "Take one promised incentive and sort its conditions into three groups: within the worker’s control, shared control, and outside control.",
      placeholder:
        "Within control… Shared… Outside control…",
    },
    check: {
      prompt: "How should Eli interpret a target bonus before it is earned?",
      options: [
        {
          label: "As guaranteed base pay",
          feedback:
            "A conditional amount is not guaranteed merely because a target is advertised.",
        },
        {
          label:
            "As possible compensation whose formula, history, control, and eligibility need examination",
          correct: true,
          feedback:
            "Correct. That keeps the opportunity visible without pretending uncertainty has disappeared.",
        },
        {
          label: "As money that can never have value",
          feedback:
            "A bonus can be valuable. Its uncertainty and conditions must remain attached to it.",
        },
      ],
    },
    takeaway:
      "Conditional money belongs in the plan only with its conditions still attached.",
  },
  {
    number: "2.5",
    title: "Project and Contract Pay",
    focus: "A price for a defined result",
    opening:
      "Outside the hiring hall, Eli meets Jun, who is paid to install a lighting system for the market rather than to remain on a weekly payroll.",
    story: [
      {
        type: "narration",
        text: "Jun’s agreement names the result, deadline, payment schedule, materials, and what happens if the market changes the requested work. The price looks larger than a weekly paycheck because it must cover more than Jun’s personal labor.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "If the contract pays six thousand dollars, Jun earns six thousand dollars.",
      },
      {
        type: "narration",
        text: "Jun opens the project ledger: equipment rental, permits, insurance, an assistant, replacement materials, travel, bookkeeping, taxes, and unpaid time spent preparing the proposal. The contract brings in six thousand dollars. That is not automatically the amount Jun can use personally.",
      },
      {
        type: "narration",
        text: "Midway through installation, the market asks for lights along a second walkway. Jun points back to the defined scope and offers a separate price. Without that boundary, a fixed project price could quietly purchase an expanding amount of work.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A project price is a container. If the promised result grows while the price stays fixed, the exchange changes even when the contract total does not.",
      },
    ],
    concept: {
      title: "Project pay exchanges a defined result for an agreed price",
      explanation:
        "A contract may pay by project, milestone, deliverable, or retained service. The person performing it may carry expenses, administrative work, collection risk, schedule risk, and responsibility for correcting problems. Contract revenue and personal usable income are different numbers.",
    },
    tradeoff:
      "A project can reward efficiency and allow more control over method or schedule. The worker may also absorb cost overruns, unpaid preparation, delayed payment, and unclear scope.",
    connection:
      "Whenever a project amount looks large, what must it pay for before it becomes compensation for the person doing the work?",
    application: {
      prompt:
        "Choose a simple project and list the work that happens before, during, and after the visible delivery.",
      placeholder:
        "Before… During… After… Costs carried by the worker…",
    },
    check: {
      prompt: "Why is Jun’s six-thousand-dollar contract not the same as six thousand dollars of personal income?",
      options: [
        {
          label: "Because contract numbers are imaginary",
          feedback:
            "The revenue is real, but other obligations have claims on it first.",
        },
        {
          label:
            "Because project expenses, unpaid administration, taxes, risk, and helpers may be paid from it",
          correct: true,
          feedback:
            "Exactly. The contract total enters the work before the remainder reaches Jun personally.",
        },
        {
          label: "Because project work never produces income",
          feedback:
            "It can produce income; the calculation must separate revenue from costs and obligations.",
        },
      ],
    },
    takeaway:
      "A contract total is the price of the whole promise, not automatically the pay of the person making it.",
  },
  {
    number: "2.6",
    title: "The Same Earnings, Different Exchange",
    focus: "Comparing what each arrangement carries",
    opening:
      "At the end of the hall, Ivy and Eli compare five workers who each received fifty-two thousand dollars during the previous year.",
    story: [
      {
        type: "narration",
        text: "One earned hourly pay through steady scheduled shifts. One received salary after several long peak-season weeks. One combined base pay and commission. One reached the amount only after an unusually large bonus. Jun’s business collected more than that before project costs left fifty-two thousand for personal compensation.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "The ending number matches. The route, certainty, time, cost, and risk do not.",
      },
      {
        type: "narration",
        text: "Eli makes a comparison using only annual earnings and declares the arrangements equal. Ivy adds hours, unpaid preparation, schedule control, expenses, benefits, income timing, and the portion dependent on customers or company results.",
      },
      {
        type: "narration",
        text: "No arrangement wins every category. The hourly worker values clear boundaries. The salaried worker values regular pay. The commissioned worker accepts variation for access to upside. Jun values control and ownership but carries more administration and risk.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A comparison becomes useful when it keeps the differences visible long enough for the learner to decide which differences matter.",
      },
    ],
    concept: {
      title: "Equal annual earnings can represent unequal exchanges",
      explanation:
        "Income structure determines who carries variation, expenses, schedule risk, performance risk, administration, and responsibility. Annual earnings are important, but they do not reveal how dependable the income was or what the person exchanged to obtain it.",
    },
    tradeoff:
      "Reducing every arrangement to one annual number makes comparison fast but incomplete. Adding every detail makes comparison slower but allows the learner to identify the risks and controls that matter in their own life.",
    connection:
      "Two people can truthfully say, “I made the same amount,” while having completely different levels of time, stability, cost, and choice.",
    application: {
      prompt:
        "Compare two earning arrangements across amount, time, predictability, control, costs, benefits, and risk. Which differences remain after the totals match?",
      placeholder:
        "Arrangement A… Arrangement B… The totals match, but…",
    },
    check: {
      prompt: "What does equal annual earnings prove?",
      options: [
        {
          label: "That the workers made the same exchange",
          feedback:
            "The total can match while time, certainty, cost, control, and risk differ.",
        },
        {
          label: "Only that the compared annual earnings total is equal",
          correct: true,
          feedback:
            "Yes. Every conclusion beyond that needs additional information.",
        },
        {
          label: "That all five workers should prefer the same arrangement",
          feedback:
            "Preference depends on which tradeoffs and conditions matter to the individual.",
        },
      ],
    },
    takeaway:
      "The same earnings can be built from very different exchanges. Compare the route, not only the destination.",
  },
];

const chapterThreeLessons = [
  {
    number: "3.1",
    title: "Annual Pay Versus Paycheck",
    focus: "The largest number is not the next deposit",
    opening:
      "Ivy receives an offer from the district’s operations office. Her eyes go directly to the bold annual salary at the top.",
    story: [
      {
        type: "narration",
        text: "The offer reads fifty-four thousand dollars per year. Ivy briefly pictures fifty-four thousand dollars becoming available to solve the goals she carried from Root One. Eli asks how much will reach her account next Friday. The offer does not answer him yet.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "I know it will be divided. I just keep reacting to the annual number as if I receive it all at once.",
      },
      {
        type: "narration",
        text: "They separate four questions: the annual rate, the amount assigned to each pay period, the gross pay before deductions, and the net pay actually deposited. Each number is real, but each answers a different question.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "The annual number describes the scale of the agreement. Your life meets the agreement one paycheck at a time.",
      },
      {
        type: "narration",
        text: "Ivy does not reject the offer or celebrate it yet. She asks for the pay frequency, benefit costs, and a sample pay statement. The largest number remains important; it simply stops pretending to be liquid cash.",
      },
    ],
    concept: {
      title: "Annual compensation and paycheck cash flow are different views",
      explanation:
        "Annual salary helps compare the scale of offers across a year. Pay frequency divides that amount into gross pay periods, and deductions separate gross pay from the deposit. Planning requires the timing and usable amount, not only the annual headline.",
    },
    tradeoff:
      "Annual figures make offers easy to advertise and compare. They can also feel more available than they are when the learner has not yet traced the money into pay periods and deductions.",
    connection:
      "Which number do you emotionally respond to first: annual pay, gross paycheck, or deposited amount?",
    application: {
      prompt:
        "Take an annual amount and write the next three questions needed before it can become a usable-pay estimate.",
      placeholder:
        "I still need to know…",
    },
    check: {
      prompt: "Why can Ivy not plan next Friday from the annual salary alone?",
      options: [
        {
          label: "Because annual salaries are never paid",
          feedback:
            "The salary is real, but it must be translated through timing and deductions.",
        },
        {
          label:
            "Because pay frequency, gross period pay, and deductions determine the deposit",
          correct: true,
          feedback:
            "Correct. The annual number begins the calculation; it does not finish it.",
        },
        {
          label: "Because all deductions are optional",
          feedback:
            "Some deductions are required and others depend on elections or circumstances.",
        },
      ],
    },
    takeaway:
      "Annual pay describes the agreement from far away. A paycheck shows how the agreement reaches daily life.",
  },
  {
    number: "3.2",
    title: "Pay Periods",
    focus: "How timing divides income",
    opening:
      "The operations office offers two calendars: one marks twenty-six paydays, and another worker’s calendar marks twenty-four.",
    story: [
      {
        type: "narration",
        text: "Ivy assumes twice a month and every two weeks mean the same thing. They usually create a similar rhythm, but not the same number of paychecks. Semi-monthly pay commonly creates twenty-four periods; biweekly pay commonly creates twenty-six.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "So two months in a biweekly year may have a third paycheck. Is that extra income?",
      },
      {
        type: "narration",
        text: "Sage asks him to look at the full year. The annual amount has been divided into twenty-six pieces instead of twenty-four. A third deposit changes that month’s cash flow, but it is not automatically income beyond the annual agreement.",
      },
      {
        type: "narration",
        text: "Ivy lays recurring bills beside both calendars. Rent still arrives monthly. A paycheck rhythm may not line up neatly with a monthly obligation. Timing can create a temporary squeeze even when the annual totals appear sufficient.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Cash flow problems often live in the distance between dates, not only in the size of totals.",
      },
    ],
    concept: {
      title: "A pay period determines when annual earnings become available",
      explanation:
        "Weekly, biweekly, semi-monthly, and monthly schedules divide pay differently. The schedule affects the size and timing of ordinary gross checks, the number of deposits, and how deductions may appear. Pay date and work period are also not always the same dates.",
    },
    tradeoff:
      "More frequent pay can shorten the wait between earnings and access. Less frequent pay may create larger deposits but longer gaps. Neither changes the agreed annual total by itself.",
    connection:
      "Do your obligations follow the same calendar as your income, or do you have to bridge a gap between them?",
    application: {
      prompt:
        "Place one monthly bill beside a biweekly pay calendar. Which paychecks would need to carry it across three months?",
      placeholder:
        "Bill date… Pay dates… The gap appears…",
    },
    check: {
      prompt: "What does a third biweekly paycheck in one month usually mean?",
      options: [
        {
          label: "The employer raised the annual salary",
          feedback:
            "The calendar can create three deposits without changing the annual agreement.",
        },
        {
          label:
            "The same annual pay schedule placed three of its twenty-six deposits in that month",
          correct: true,
          feedback:
            "Yes. It changes monthly timing, not automatically the annual total.",
        },
        {
          label: "No deductions will appear on that paycheck",
          feedback:
            "The treatment of deductions depends on the payroll and benefit rules.",
        },
      ],
    },
    takeaway:
      "Income has an amount and a calendar. Daily life has to meet both.",
  },
  {
    number: "3.3",
    title: "Gross Pay",
    focus: "Earnings before deductions",
    opening:
      "Ivy’s first pay statement begins with gross pay. The number is smaller than the annual salary and larger than the deposit.",
    story: [
      {
        type: "narration",
        text: "The statement shows the portion of salary assigned to the pay period, plus a small training payment. That total is gross pay: earnings recognized before the listed deductions are subtracted.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "So gross pay is mine, but not all of it is available to spend?",
      },
      {
        type: "narration",
        text: "Sage separates ownership from availability. Gross pay is the starting earnings figure on the statement. Taxes, benefit elections, and other deductions may have valid claims on part of it before the remainder reaches Ivy.",
      },
      {
        type: "narration",
        text: "Eli notices that year-to-date gross pay appears beside current gross pay. One answers what happened this period; the other accumulates the relevant earnings across the year. Mixing them would make one paycheck look enormous.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Every number needs a label and a time period. Remove either one, and a correct number can tell the wrong story.",
      },
    ],
    concept: {
      title: "Gross pay is the paycheck’s earnings starting point",
      explanation:
        "Gross pay generally includes earnings for the period before deductions. Depending on the job, it may include salary, hourly earnings, overtime, differentials, commission, bonuses, or other taxable and nontaxable items shown separately. Current and year-to-date columns serve different purposes.",
    },
    tradeoff:
      "Gross pay is useful for verifying that earnings were calculated correctly. Using it as spendable income ignores every deduction that still stands between the starting figure and the deposit.",
    connection:
      "When someone says, “I make this much,” are they naming a rate, gross earnings, net pay, or something else?",
    application: {
      prompt:
        "On a sample or real pay statement, identify the pay period, each earnings line, current gross, and year-to-date gross.",
      placeholder:
        "Pay period… Earnings lines… Current gross… Year-to-date gross…",
    },
    check: {
      prompt: "What does current gross pay tell Ivy?",
      options: [
        {
          label: "The exact amount deposited after every deduction",
          feedback: "That is closer to net pay, not gross pay.",
        },
        {
          label:
            "The recognized earnings for the pay period before deductions",
          correct: true,
          feedback:
            "Correct. It is the starting point for tracing the rest of the statement.",
        },
        {
          label: "Her lifetime earnings",
          feedback:
            "Current gross is limited to the statement’s current pay period.",
        },
      ],
    },
    takeaway:
      "Gross pay tells you what the period earned before the paycheck distributes money to its other jobs.",
  },
  {
    number: "3.4",
    title: "Required Deductions",
    focus: "Amounts withheld by law or legal order",
    opening:
      "Below gross pay, Ivy finds several deductions she did not choose during enrollment.",
    story: [
      {
        type: "narration",
        text: "Federal income tax withholding, Social Security tax, Medicare tax, and applicable state or local withholding appear on the statement. A different worker may also have a deduction required by a court or government order. The exact list and amount depend on location, wages, forms, and circumstances.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "If income tax was withheld, that means the final tax bill is already settled.",
      },
      {
        type: "narration",
        text: "Ivy reads the payroll explanation. Withholding is money sent during the year toward an expected tax obligation. The final return later compares what was paid with the actual tax calculation. Withheld does not automatically mean exact.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A required deduction can be correct, incorrect, or based on information that changed. Required does not mean unreadable.",
      },
      {
        type: "narration",
        text: "Ivy checks the labels, her submitted withholding information, and the current and year-to-date amounts. She is not choosing whether payroll law exists. She is learning enough to recognize what has been applied to her earnings.",
      },
    ],
    concept: {
      title: "Required deductions move part of gross pay before deposit",
      explanation:
        "Payroll commonly withholds taxes required by federal, state, or local rules and may process legally required orders. The amount can depend on wages, filing information, jurisdiction, wage limits, and the type of deduction. Income-tax withholding is a prepayment process, not necessarily the final tax result.",
    },
    tradeoff:
      "Ignoring required deductions creates an unrealistic usable-pay estimate. Treating every required line as unquestionable can allow outdated information or payroll errors to continue unnoticed.",
    connection:
      "Can you identify which deductions on a pay statement are required and which document or rule caused each one?",
    application: {
      prompt:
        "Make a list of required deductions on a sample statement. Beside each, write what information appears to affect it.",
      placeholder:
        "Deduction… Required by… Amount appears connected to…",
    },
    check: {
      prompt: "What does federal income tax withholding represent?",
      options: [
        {
          label: "A guaranteed final tax calculation",
          feedback:
            "The final return compares withholding and other payments with the actual tax obligation.",
        },
        {
          label:
            "Money sent during the year toward an expected federal income tax obligation",
          correct: true,
          feedback:
            "Yes. It is part of an ongoing payment and reconciliation process.",
        },
        {
          label: "An optional employee benefit",
          feedback:
            "Federal income tax withholding is not a voluntary workplace benefit.",
        },
      ],
    },
    takeaway:
      "Required deductions are not optional, but they are still meant to be identified, traced, and checked.",
  },
  {
    number: "3.5",
    title: "Optional Deductions",
    focus: "Elections that redirect pay",
    opening:
      "The next lines on Ivy’s statement came from choices she made during enrollment: health coverage, retirement contributions, and a transit program.",
    story: [
      {
        type: "narration",
        text: "Eli calls the deductions lost money because they reduce the deposit. Ivy follows each line to what it purchases or funds. One pays her share of insurance coverage. One moves money into a retirement account. One buys transit access under the employer’s program.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "They reduce what I can use today, but they do not all disappear in the same way.",
      },
      {
        type: "narration",
        text: "Sage asks which elections can be changed at any time, which require an enrollment event, which receive employer contributions, and which affect taxable wages. The word optional describes how the deduction began; it does not mean the rules are identical.",
      },
      {
        type: "narration",
        text: "Ivy discovers a small deduction for a benefit she does not remember selecting. She does not assume fraud or ignore it. She checks the enrollment record and asks payroll what created the line.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A deduction may support a choice you made. It should still be able to explain its name, amount, destination, and change rules.",
      },
    ],
    concept: {
      title: "Optional deductions exchange present cash for another benefit or destination",
      explanation:
        "Workers may elect deductions for insurance, retirement savings, flexible benefit programs, dues, transit, or other offerings. Some are taken before certain taxes are calculated and some after; the plan documents and payroll statement indicate treatment. Employer contributions may add value that does not appear in the deposit.",
    },
    tradeoff:
      "Each election can reduce cash available now while providing coverage, savings, access, or another benefit. Calling every deduction a loss hides what it purchases; calling every benefit valuable hides whether it fits the worker’s actual needs.",
    connection:
      "Could you explain where every optional deduction on your statement goes and what would happen if you changed it?",
    application: {
      prompt:
        "Choose one optional deduction and trace four facts: destination, present cost, employer contribution if any, and change rules.",
      placeholder:
        "Destination… My cost… Employer adds… I can change it when…",
    },
    check: {
      prompt: "Why should Ivy avoid treating every optional deduction as lost money?",
      options: [
        {
          label: "Because deductions never reduce take-home pay",
          feedback:
            "They commonly reduce the deposit even when they fund something valuable.",
        },
        {
          label:
            "Because a deduction may purchase coverage, fund savings, or provide access that must be evaluated separately",
          correct: true,
          feedback:
            "Correct. The destination and benefit matter alongside the reduced present cash.",
        },
        {
          label: "Because every offered benefit is automatically useful",
          feedback:
            "Fit, cost, rules, and actual use still require examination.",
        },
      ],
    },
    takeaway:
      "An optional deduction is present cash redirected. Follow it far enough to see what receives it.",
  },
  {
    number: "3.6",
    title: "Net Pay",
    focus: "What reaches the worker now",
    opening:
      "At the bottom of the statement, Ivy reaches net pay: the amount remaining after the listed deductions.",
    story: [
      {
        type: "narration",
        text: "The deposit is lower than she first imagined from the annual salary. It is also not the whole value of the job; part of her compensation now lives in insurance coverage, an employer retirement contribution, and paid time she has not used.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "So net pay is the real number and everything else is fake?",
      },
      {
        type: "narration",
        text: "Ivy shakes her head. Net pay is the real amount delivered to her account for current use. Gross pay remains real earnings information. Benefits remain real compensation. Taxes and elected deductions remain real claims. The numbers serve different decisions.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Use net pay to plan the cash you can direct now. Use the rest of the statement to understand why that cash has that size.",
      },
      {
        type: "narration",
        text: "Ivy replaces the rough plan she built from annual salary with one built from actual net deposits and actual dates. The offer did not shrink. Her understanding became more precise.",
      },
    ],
    concept: {
      title: "Net pay is gross pay minus the statement’s deductions",
      explanation:
        "Net pay is commonly the amount delivered by check or direct deposit after required and voluntary deductions. It is the most immediate figure for cash-flow planning, but it does not represent total compensation or explain whether every line above it is correct.",
    },
    tradeoff:
      "Net pay is concrete and usable now. Focusing on it alone can hide valuable benefits, a payroll error, insufficient withholding, or a voluntary deduction that no longer fits.",
    connection:
      "Which decisions require net pay, and which require the full compensation or gross-pay picture?",
    application: {
      prompt:
        "Build a one-line paycheck bridge: gross pay minus required deductions minus optional deductions equals net pay.",
      placeholder:
        "Gross… Required… Optional… Net…",
    },
    check: {
      prompt: "What is net pay best used to understand?",
      options: [
        {
          label: "The total value of every benefit and wage",
          feedback:
            "Net pay does not include the full value of benefits or employer contributions.",
        },
        {
          label: "The cash from this paycheck available after listed deductions",
          correct: true,
          feedback:
            "Yes. It is the immediate cash-flow figure.",
        },
        {
          label: "Whether every deduction is automatically correct",
          feedback:
            "The statement still needs to be read and checked.",
        },
      ],
    },
    takeaway:
      "Net pay is the money that reaches today. The path above it explains how it arrived.",
  },
  {
    number: "3.7",
    title: "Reading the Entire Pay Statement",
    focus: "Turning payroll into a traceable story",
    opening:
      "Ivy places the offer, time record, benefit elections, and first pay statement side by side.",
    story: [
      {
        type: "narration",
        text: "She traces the pay period and pay date, verifies the earnings lines, checks gross pay, identifies required and optional deductions, follows employer contributions, and compares net pay with the deposit. Each section connects to a document or event outside the statement.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "I used to look only at the deposit. If it felt close enough, I assumed the rest was fine.",
      },
      {
        type: "narration",
        text: "Eli notices that her transit deduction appears twice. Ivy checks whether one line is current and the other year-to-date. It is not a duplicate charge after all. Later she finds a different mismatch: one training payment is missing. Reading carefully prevents both a false alarm and a missed question.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Financial literacy is not suspicion. It is the ability to follow a number to the event, rule, or choice that created it.",
      },
      {
        type: "narration",
        text: "Ivy asks payroll about the missing payment using dates and labels rather than anger or apology. The correction appears on the next statement. The paycheck is no longer a mysterious verdict. It is a record she can read.",
      },
    ],
    concept: {
      title: "A pay statement connects work, rules, elections, and payment",
      explanation:
        "A complete review identifies the employer and worker, work and pay dates, earnings details, rates or salary basis where shown, current and year-to-date amounts, taxes, other deductions, employer-paid items, net pay, and the deposit. Layouts vary, but the tracing questions remain useful.",
    },
    tradeoff:
      "Reading the entire statement takes longer than checking the bank balance. It creates the chance to catch missing earnings, misunderstood deductions, stale elections, or timing differences before they repeat.",
    connection:
      "Could you point to one line on a pay statement and explain the real-world event or choice that caused it?",
    application: {
      prompt:
        "Use the statement trail: What period? What earnings? What deductions? What employer additions? What net amount? What needs a question?",
      placeholder:
        "Period… Earnings… Deductions… Additions… Net… Question…",
    },
    check: {
      prompt: "What made Ivy’s payroll question effective?",
      options: [
        {
          label: "She assumed every unfamiliar line was theft",
          feedback:
            "One unfamiliar line was a year-to-date figure, so assumption would have created a false accusation.",
        },
        {
          label:
            "She traced labels, dates, records, and calculations before asking about a specific mismatch",
          correct: true,
          feedback:
            "Exactly. Evidence turned confusion into a focused, answerable question.",
        },
        {
          label: "She ignored the statement and waited for the annual tax return",
          feedback:
            "That would allow a recurring payroll issue to continue.",
        },
      ],
    },
    takeaway:
      "A paycheck stops being mysterious when every important number can be traced to its source.",
  },
];

const chapterFourLessons = [
  {
    number: "4.1",
    title: "Health and Insurance Benefits",
    focus: "Coverage, premiums, and financial exposure",
    opening:
      "While Ivy waits for payroll to correct her training payment, a second employer sends an offer with a higher salary. The benefit page is shorter.",
    story: [
      {
        type: "narration",
        text: "The City Operations offer contributes toward Ivy’s health plan and includes disability and life coverage. Harbor Dispatch pays six thousand dollars more in salary but requires Ivy to pay a larger share of the health premium. The plan also uses a different provider network, deductible, and out-of-pocket limit.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "Six thousand more is six thousand more. Why let an insurance booklet bury the obvious?",
      },
      {
        type: "narration",
        text: "Ivy compares what leaves each paycheck and what financial exposure remains if she actually needs care. A low premium does not automatically mean low total cost, and a rich benefit is not automatically valuable if the available providers or rules do not fit her situation.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Insurance has at least two prices: what you pay to keep coverage and what you may pay when you use it.",
      },
      {
        type: "narration",
        text: "Neither plan predicts Ivy’s future health. The comparison gives her facts about coverage, exclusions, access, employer contribution, and the range of costs she could face. The higher salary remains higher; it now stands beside the cost and protection attached to it.",
      },
    ],
    concept: {
      title: "Insurance benefits change both paycheck deductions and financial risk",
      explanation:
        "Employer plans may contribute toward health, dental, vision, disability, or life coverage. Evaluation can include the worker’s premium, deductible, copays or coinsurance, out-of-pocket limits, networks, covered services, waiting periods, and employer share. Plan documents control the actual terms.",
    },
    tradeoff:
      "More employer support can reduce premiums or risk without appearing as wages. A lower-cost plan may preserve present cash but leave greater cost or access limits when used.",
    connection:
      "When you hear that a job “has benefits,” which plan details would determine whether those benefits actually protect you?",
    application: {
      prompt:
        "Compare two imaginary plans across paycheck premium, deductible, maximum exposure, network, and employer contribution.",
      placeholder:
        "Plan A… Plan B… What I still need to know…",
    },
    check: {
      prompt: "Why can Ivy not compare the plans using premiums alone?",
      options: [
        {
          label: "Because premiums never matter",
          feedback:
            "Premiums affect every paycheck, but they are only one part of cost and access.",
        },
        {
          label:
            "Because coverage, cost when used, networks, limits, and employer contributions also shape value",
          correct: true,
          feedback:
            "Exactly. The complete plan changes both present cash and future exposure.",
        },
        {
          label: "Because the higher-salary offer must have the better plan",
          feedback:
            "Salary and benefit quality are separate facts that need separate comparison.",
        },
      ],
    },
    takeaway:
      "A health benefit is not one checkbox. It is a set of costs, protections, limits, and access rules.",
  },
  {
    number: "4.2",
    title: "Paid and Unpaid Time",
    focus: "What happens financially when work pauses",
    opening:
      "The two offers give Ivy different answers to a simple question: what happens to income when she is not working?",
    story: [
      {
        type: "narration",
        text: "City Operations lists paid holidays, vacation, and sick time. Harbor offers fewer paid days and allows additional approved unpaid leave. On a working day, Harbor’s wage is higher. On a paid day away, City continues the paycheck while Harbor may not.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "Time off looked like permission. I wasn’t treating it as part of compensation.",
      },
      {
        type: "narration",
        text: "They compare accrual rules, waiting periods, carryover, scheduling approval, payout rules, and what happens during an absence longer than the available paid balance. A promised number of days is not fully understood until Ivy knows whether she can use them and what happens when she does.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A day away can cost wages, consume a paid benefit, protect a job, or do several of those things at once. Do not let the word leave erase the money question.",
      },
      {
        type: "narration",
        text: "Ivy imagines a routine appointment, a family emergency, and a planned week away. The offers behave differently in each scene. She does not know which event will occur; she now understands the financial mechanism if it does.",
      },
    ],
    concept: {
      title: "Paid time preserves income during eligible time away",
      explanation:
        "Paid vacation, holidays, sick time, and other leave can be part of compensation. Unpaid, job-protected, or employer-approved leave answers different questions. Eligibility, accrual, approval, carryover, and separation rules determine how the benefit functions.",
    },
    tradeoff:
      "A higher wage can produce more money while working. Stronger paid-time benefits can protect income when work pauses. The value depends partly on eligibility and real ability to use the time.",
    connection:
      "If you missed five workdays, which parts of your income and benefits would continue, pause, or require another resource?",
    application: {
      prompt:
        "Run two five-day scenarios for an offer: one planned absence and one unexpected absence. What is paid, protected, approved, or lost?",
      placeholder:
        "Planned… Unexpected… Questions remaining…",
    },
    check: {
      prompt: "What is the difference between paid leave and unpaid protected leave?",
      options: [
        {
          label: "There is never a difference",
          feedback:
            "Protection and pay answer separate questions.",
        },
        {
          label:
            "One may continue eligible wages; the other may protect eligible time away without continuing wages",
          correct: true,
          feedback:
            "Correct. The exact rules depend on the leave and governing terms.",
        },
        {
          label: "Unpaid leave always pays a bonus later",
          feedback:
            "No such conclusion follows from unpaid leave.",
        },
      ],
    },
    takeaway:
      "Time away has a calendar effect and an income effect. A complete offer explains both.",
  },
  {
    number: "4.3",
    title: "Retirement Contributions",
    focus: "Compensation directed toward later",
    opening:
      "City Operations offers to add money to Ivy’s workplace retirement account when she contributes under the plan’s formula.",
    story: [
      {
        type: "narration",
        text: "Harbor offers a retirement account but no employer contribution during the first year. City’s salary is lower, yet part of its compensation can appear as employer money directed toward Ivy’s future rather than her current deposit.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "If she cannot spend it now, should it count when we compare the offers?",
      },
      {
        type: "narration",
        text: "Ivy studies the contribution formula, eligibility date, investment control, fees, and vesting schedule. Some employer money becomes hers immediately; other amounts may require continued service before she fully owns them.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Later money and present money are not interchangeable. They can both be compensation without performing the same job.",
      },
      {
        type: "narration",
        text: "Ivy refuses two easy conclusions: that future-directed money is worthless because it is not spendable today, and that every promised employer contribution is already hers. She counts only what the terms and likely timeline support.",
      },
    ],
    concept: {
      title: "Retirement benefits can add employer-funded compensation",
      explanation:
        "A workplace plan may allow employee contributions and add employer matching or nonelective contributions. Eligibility, contribution limits, taxes, investment options, fees, withdrawals, and vesting affect the benefit. A contribution shown in total compensation may not be current cash or immediately owned.",
    },
    tradeoff:
      "Directing money toward later can reduce present flexibility while expanding future resources. Employer contributions may increase compensation, but vesting or continued-employment conditions can limit what the worker keeps after an early departure.",
    connection:
      "When does future money become valuable to your comparison: when promised, contributed, vested, or available to withdraw?",
    application: {
      prompt:
        "Trace one employer retirement contribution through eligibility, contribution, vesting, investment, and eventual access.",
      placeholder:
        "Eligible on… Employer adds… I own it when… It is invested… Access rules…",
    },
    check: {
      prompt: "Why does Ivy examine vesting before counting the full employer contribution?",
      options: [
        {
          label: "Because vesting determines the salary tax rate",
          feedback:
            "Vesting concerns ownership of employer contributions, not the salary tax rate.",
        },
        {
          label:
            "Because some employer contributions may require continued service before she fully owns them",
          correct: true,
          feedback:
            "Yes. The timeline can change what the benefit is worth if she leaves.",
        },
        {
          label: "Because retirement contributions are always fake",
          feedback:
            "They can be real compensation; the terms determine timing and ownership.",
        },
      ],
    },
    takeaway:
      "Future-directed compensation counts—but only with its access and ownership rules attached.",
  },
  {
    number: "4.4",
    title: "Schedule Stability",
    focus: "The financial value of knowing when work occurs",
    opening:
      "Harbor’s offer guarantees full-time status but posts the weekly schedule only four days before each new week.",
    story: [
      {
        type: "narration",
        text: "City Operations uses a regular weekday schedule with occasional planned events. Harbor rotates mornings, evenings, and weekends according to shipment volume. The annual pay estimate assumes full hours, but the time pattern changes what Ivy can coordinate around them.",
      },
      {
        type: "narration",
        text: "Ivy helps care for her nephew two afternoons each week. A stable schedule lets her coordinate with her sister without paid backup care. A late Harbor schedule may require last-minute help at a higher cost—or force someone else to miss work.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "But schedule isn’t compensation. It’s just when the job happens.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "When timing changes transportation, care, a second job, education, sleep, or missed income, schedule becomes financially measurable.",
      },
      {
        type: "narration",
        text: "Ivy asks about minimum notice, shift changes, on-call expectations, guaranteed hours, weekend frequency, and the difference between policy and actual practice. Stability becomes a condition she can investigate instead of a vague preference.",
      },
    ],
    concept: {
      title: "Schedule stability affects the cost and coordination of earning",
      explanation:
        "Predictable hours can support transportation, caregiving, school, health routines, and additional work. Variable schedules may fit some lives and disrupt others. The relevant facts include notice, guaranteed hours, rotation, changes, on-call time, and worker input.",
    },
    tradeoff:
      "A variable schedule may create access to more hours, shift premiums, or daytime freedom. It may also create coordination costs and make other commitments difficult to protect.",
    connection:
      "What parts of your life rely on knowing not only how many hours you will work, but exactly when they will happen?",
    application: {
      prompt:
        "Place one variable schedule beside transportation, care, health, and other commitments. Where does a cost or conflict appear?",
      placeholder:
        "Work changes… That affects… The possible cost is…",
    },
    check: {
      prompt: "When does schedule stability have financial value?",
      options: [
        {
          label: "Never, because only wages are financial",
          feedback:
            "Timing can create or prevent direct costs and lost income.",
        },
        {
          label:
            "When predictability changes care, transportation, other work, education, health, or coordination costs",
          correct: true,
          feedback:
            "Exactly. The schedule can change what earning the wage requires.",
        },
        {
          label: "Only when the worker dislikes mornings",
          feedback:
            "Preference may matter, but financial effects extend far beyond a preferred time of day.",
        },
      ],
    },
    takeaway:
      "A paycheck arrives through a schedule. The schedule can create costs or preserve choices before the money is spent.",
  },
  {
    number: "4.5",
    title: "Flexibility and Control",
    focus: "Who can change the time, place, and method",
    opening:
      "City offers a fixed schedule with little daily variation. Harbor offers two remote days but can change them when shipment needs rise.",
    story: [
      {
        type: "narration",
        text: "At first Ivy labels Harbor flexible and City inflexible. Then she asks who holds the power to make a change. Harbor can move her remote days; Ivy needs approval to move them herself. City’s schedule rarely changes, and employees may trade shifts under a clear rule.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "A changing schedule and a controllable schedule are not the same thing.",
      },
      {
        type: "narration",
        text: "Eli compares two forms of flexibility: freedom to choose and willingness to adapt to the employer’s changes. The same word had been hiding opposite directions of control.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Ask who may change the arrangement, how much notice is required, and what happens if the other side cannot agree.",
      },
      {
        type: "narration",
        text: "Ivy adds location, start and end time, break timing, time-off approval, shift trades, and emergency changes to her comparison. Flexibility becomes a collection of permissions and limits, not a recruiting adjective.",
      },
    ],
    concept: {
      title: "Flexibility describes control, not merely variation",
      explanation:
        "A flexible arrangement may allow the worker to influence when, where, or how work happens. An unpredictable arrangement may change frequently while leaving the worker little control. Policies, manager practice, job duties, and coverage needs determine how flexibility functions.",
    },
    tradeoff:
      "Worker control can reduce coordination costs and protect other responsibilities. A fixed schedule can offer reliability even with less choice. Variation controlled mostly by the employer may create flexibility for the organization rather than the worker.",
    connection:
      "When an opportunity advertises flexibility, whose flexibility is being described?",
    application: {
      prompt:
        "Turn the word flexible into five specific questions about who can change time, location, or method.",
      placeholder:
        "Who chooses… How much notice… What requires approval…",
    },
    check: {
      prompt: "Why is Harbor’s changing remote schedule not automatically worker flexibility?",
      options: [
        {
          label: "Because remote work is never flexible",
          feedback:
            "Remote work can create flexibility; the control and rules determine how.",
        },
        {
          label:
            "Because the employer may control the changes while Ivy has limited power to choose them",
          correct: true,
          feedback:
            "Correct. Variation and worker control are different facts.",
        },
        {
          label: "Because every fixed schedule offers total control",
          feedback:
            "A fixed schedule can be predictable without giving the worker control over it.",
        },
      ],
    },
    takeaway:
      "Do not ask only whether work can change. Ask who holds the power to change it.",
  },
  {
    number: "4.6",
    title: "Total Compensation",
    focus: "Adding wages and employer-provided value",
    opening:
      "Ivy now has enough information to build a total-compensation view of both offers.",
    story: [
      {
        type: "narration",
        text: "She begins with wages, then adds identifiable employer costs or contributions for insurance, paid leave, retirement, and other benefits. The exercise shows why an employer may spend more on compensation than the wage deposited to a worker.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "Then we should just add every employer cost to salary and call it equally valuable.",
      },
      {
        type: "narration",
        text: "Ivy refuses. An employer cost is evidence of compensation, but it may not equal the worker’s personal value. A benefit Ivy cannot use, a contribution she may not vest in, or paid leave she cannot realistically schedule should not be treated like cash in her account.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Total compensation answers what the employer provides. Personal value asks how that compensation functions in this worker’s life.",
      },
      {
        type: "narration",
        text: "Ivy keeps both views: employer-provided compensation and her own usable value. This prevents her from erasing benefits or pretending every dollar of employer cost is identical to a dollar of take-home pay.",
      },
    ],
    concept: {
      title: "Total compensation includes wages and benefits",
      explanation:
        "Compensation can include wages or salary, paid leave, supplemental pay, insurance, retirement contributions, and legally required benefits. Employer cost, worker access, tax treatment, and personal usefulness are related but distinct measurements.",
    },
    tradeoff:
      "A single total-compensation number makes hidden employer contributions visible. It can overstate personal value if the worker cannot use, keep, or access the benefits on the assumed terms.",
    connection:
      "Which parts of an employer’s compensation spending function almost like cash for you, and which have a narrower use?",
    application: {
      prompt:
        "Build two columns for one offer: employer-provided compensation and how each item functions for the worker.",
      placeholder:
        "Employer provides… For the worker, this means…",
    },
    check: {
      prompt: "Why does Ivy keep employer cost and personal value separate?",
      options: [
        {
          label: "Because benefits have no value",
          feedback:
            "Benefits can be substantial compensation; their usefulness and access differ.",
        },
        {
          label:
            "Because a dollar the employer spends on a restricted benefit may not function like a dollar of current cash",
          correct: true,
          feedback:
            "Yes. Both numbers matter, but they answer different questions.",
        },
        {
          label: "Because salary should never be counted",
          feedback:
            "Wages and salary remain a central part of total compensation.",
        },
      ],
    },
    takeaway:
      "Count the full compensation, then ask how each part can actually be used, kept, and accessed.",
  },
  {
    number: "4.7",
    title: "Comparing the Full Offer",
    focus: "Holding money and conditions together",
    opening:
      "Ivy places the two offers on the district’s long comparison table. This time, the biggest number does not get the first or final word.",
    story: [
      {
        type: "narration",
        text: "Harbor leads in salary. City leads in employer insurance contribution, paid time, retirement support, and schedule stability. Harbor offers possible incentive pay and two remote days; the actual control over those days is limited.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "We have more facts, but now the answer looks less obvious.",
      },
      {
        type: "narration",
        text: "Ivy says that is the point. Facts do not always remove the choice. They reveal what the choice contains. She marks which differences are certain, conditional, estimated, personally useful, or still unknown.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "RootWise does not choose the winning offer. It makes sure no quiet part of the exchange disappears before you choose.",
      },
      {
        type: "narration",
        text: "Ivy asks both employers final questions and requests the plan documents in writing. She has not yet decided. She has stopped mistaking uncertainty for a command to guess.",
      },
    ],
    concept: {
      title: "A full offer combines cash, benefits, time, control, and conditions",
      explanation:
        "Useful comparison keeps base pay, variable pay, health and insurance benefits, paid time, retirement, schedule, flexibility, eligibility, and unanswered questions visible. The learner can then decide which differences carry the greatest consequence in their own circumstances.",
    },
    tradeoff:
      "More information may make a decision slower and less emotionally tidy. It reduces the chance that one attractive number silently chooses on the learner’s behalf.",
    connection:
      "Which part of an offer would cause the greatest disruption if you misunderstood it?",
    application: {
      prompt:
        "Create a full-offer comparison with five labels: guaranteed, conditional, employer-provided, personally useful, and unknown.",
      placeholder:
        "Offer A… Offer B… My most important unknown…",
    },
    check: {
      prompt: "What does a complete comparison do for Ivy?",
      options: [
        {
          label: "It guarantees that one offer will be best in every category",
          feedback:
            "Real offers often lead in different categories.",
        },
        {
          label:
            "It reveals the money, benefits, time, control, conditions, and unknowns she is actually comparing",
          correct: true,
          feedback:
            "Exactly. It improves the choice without making the choice for her.",
        },
        {
          label: "It removes the need for Ivy’s priorities",
          feedback:
            "The facts still need to be interpreted through the consequences that matter in her life.",
        },
      ],
    },
    takeaway:
      "The strongest offer is not automatically the one with the largest wage. It is the one whose full exchange you have actually examined.",
  },
];

const chapterFiveLessons = [
  {
    number: "5.1",
    title: "Transportation",
    focus: "The route required to reach income",
    opening:
      "Ivy tests the commute to Harbor before deciding. The route looks manageable on a map and expensive from the driver’s seat.",
    story: [
      {
        type: "narration",
        text: "The trip requires fuel, parking, additional vehicle use, and a toll on the fastest route. The cheaper route takes longer and becomes unreliable during shift changes. City Operations is reachable by one direct bus.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "I compared salaries before I priced the act of reaching them.",
      },
      {
        type: "narration",
        text: "Eli lists only gasoline. Ivy adds parking, tolls, maintenance, wear, insurance changes if applicable, and backup transportation when the car is unavailable. Not every cost occurs each paycheck, but the work still helps cause it.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A delayed cost is still a cost. Tires do not disappear from the exchange because they are replaced twice a year instead of twice a month.",
      },
      {
        type: "narration",
        text: "The higher salary remains higher. The amount Ivy can use for the rest of her life narrows once transportation claims its share.",
      },
    ],
    concept: {
      title: "Transportation is part of the cost of accessing work",
      explanation:
        "Commuting can require fares, fuel, parking, tolls, maintenance, depreciation, insurance, or backup transportation. Tax treatment is separate from economic reality: an expense can reduce usable income even when it is not deductible.",
    },
    tradeoff:
      "A more distant opportunity may provide higher pay or better growth while consuming more money and increasing exposure to delay or vehicle failure.",
    connection:
      "What does one workday cost before you perform any work at all?",
    application: {
      prompt:
        "Calculate one week of direct transportation costs, then list the less frequent costs the week also helps create.",
      placeholder:
        "Weekly direct… Less frequent… Backup plan…",
    },
    check: {
      prompt: "Why does Ivy include maintenance even when no repair is due this week?",
      options: [
        {
          label: "Because every commute immediately breaks the car",
          feedback:
            "The cost accumulates through use; it does not require immediate failure.",
        },
        {
          label:
            "Because repeated work travel contributes to wear and future replacement costs",
          correct: true,
          feedback:
            "Yes. A less frequent bill can still be caused gradually by current earning activity.",
        },
        {
          label: "Because all commute costs are refunded by employers",
          feedback:
            "Reimbursement depends on the employer and arrangement; it cannot be assumed.",
        },
      ],
    },
    takeaway:
      "Income does not begin at the worksite. The route to reach it can already be spending money.",
  },
  {
    number: "5.2",
    title: "Childcare and Dependent Care",
    focus: "Care required by the work schedule",
    opening:
      "Harbor’s rotating schedule changes the care arrangement Ivy shares with her sister for her nephew.",
    story: [
      {
        type: "narration",
        text: "On a stable weekday schedule, their family can cover most care without payment. Evening and weekend rotations create gaps. The available care provider charges more for late notice, and some shifts end after the provider closes.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "That is a family expense, not a work expense.",
      },
      {
        type: "narration",
        text: "Ivy separates legal or tax labels from the decision in front of her. Whatever category a form later uses, Harbor’s schedule would cause a new cash outflow that City’s schedule does not cause. The effect belongs in her comparison.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "If an opportunity changes what must happen for someone to accept it, that consequence belongs on the table.",
      },
      {
        type: "narration",
        text: "They price regular care, late-notice care, registration fees, transportation, backup care, and the cost of a missed shift when no care is available. Ivy also records the strain placed on unpaid family help instead of treating it as unlimited.",
      },
    ],
    concept: {
      title: "Dependent care can be a necessary access cost of earning",
      explanation:
        "Work schedules may require childcare, elder care, disability support, transportation, or backup arrangements. Cost depends on timing, notice, number of dependents, provider access, employer benefits, subsidies, and available unpaid support.",
    },
    tradeoff:
      "An opportunity may raise gross pay while creating new care expenses or shifting unpaid burden to someone else. Care can also preserve work access, safety, and family stability that make the opportunity possible.",
    connection:
      "Whose time or money makes your work schedule possible, and what happens if that support is unavailable?",
    application: {
      prompt:
        "Map one week of work against required care. Mark regular, backup, unpaid, and uncovered periods.",
      placeholder:
        "Work period… Care source… Cost… Backup… Uncovered risk…",
    },
    check: {
      prompt: "Why does care belong in Ivy’s offer comparison?",
      options: [
        {
          label: "Because every family uses paid care",
          feedback:
            "Care arrangements vary. The relevant fact is how this offer changes Ivy’s actual arrangement.",
        },
        {
          label:
            "Because the work schedule creates a new requirement and cost she must solve to accept the job",
          correct: true,
          feedback:
            "Exactly. The causal consequence matters even before any tax label is considered.",
        },
        {
          label: "Because the employer automatically pays every care bill",
          feedback:
            "Employer support must be verified; it is not automatic.",
        },
      ],
    },
    takeaway:
      "Care is part of the infrastructure that makes earning possible. If work changes the care, count the consequence.",
  },
  {
    number: "5.3",
    title: "Clothing, Tools, and Equipment",
    focus: "What the worker must bring or maintain",
    opening:
      "Harbor requires steel-toe shoes, weatherproof outerwear, a specific headset, and a phone capable of running its scheduling application.",
    story: [
      {
        type: "narration",
        text: "The company provides a safety vest and partial shoe allowance. Ivy must cover the rest. City provides all specialized equipment and requires ordinary office clothing she already owns.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "The shoe allowance sounded like the company covered shoes. It covers part of one approved pair.",
      },
      {
        type: "narration",
        text: "Eli adds the purchase prices once. Ivy adds replacement frequency, cleaning, repairs, data use, accessories, certification renewal, and whether equipment can serve another job if she leaves.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "An allowance reduces a cost. It does not erase the cost unless it actually covers what the requirement creates.",
      },
      {
        type: "narration",
        text: "They also identify employer-owned equipment Ivy would have to return. A tool can support work without becoming an asset the worker owns.",
      },
    ],
    concept: {
      title: "Required work items create purchase and replacement costs",
      explanation:
        "Uniforms, protective clothing, tools, technology, licenses, supplies, and maintenance may be employer-provided, reimbursed, partially covered, or worker-funded. Ownership, permitted use, replacement, and return rules affect the true cost.",
    },
    tradeoff:
      "Worker-owned tools can remain useful across opportunities and expand independence. They also require present cash, care, replacement, and the risk of buying equipment that one employer uniquely requires.",
    connection:
      "What do you own, replace, charge, clean, update, or insure because your work expects it?",
    application: {
      prompt:
        "Create a work-equipment ledger with purchase, employer support, replacement cycle, ownership, and other possible uses.",
      placeholder:
        "Item… Cost… Employer pays… Replace… Owner… Reusable…",
    },
    check: {
      prompt: "Why is a partial allowance not the same as employer-provided equipment?",
      options: [
        {
          label: "Because allowances can never be used",
          feedback:
            "An allowance can reduce cost; the difference is who pays the remainder and owns the item.",
        },
        {
          label:
            "Because Ivy may still pay part of the required cost and carry replacement responsibility",
          correct: true,
          feedback:
            "Correct. The exact coverage and ongoing obligation need to be traced.",
        },
        {
          label: "Because employer equipment always becomes the worker’s property",
          feedback:
            "Employer-owned equipment commonly must be returned.",
        },
      ],
    },
    takeaway:
      "The cost of a required tool includes who buys it, who owns it, and who replaces it.",
  },
  {
    number: "5.4",
    title: "Unpaid Preparation",
    focus: "Work surrounding the paid activity",
    opening:
      "Ivy shadows a Harbor dispatcher whose shift begins at seven. His workday begins earlier than the time record suggests.",
    story: [
      {
        type: "narration",
        text: "He checks overnight route changes at home, finds a clean required uniform, charges two devices, and arrives early enough to pass security and reach the dispatch floor. Some activities may be ordinary personal preparation; other required pre-shift work may be compensable under applicable rules. The boundary requires facts, not habit.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "If everyone does it off the clock, maybe that is simply what the job takes.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A repeated practice can be common and still deserve a legal or financial question.",
      },
      {
        type: "narration",
        text: "Ivy separates required job activity, voluntary career development, ordinary personal readiness, and commuting. She asks when the employer requires each action, whether it can be performed during paid time, and whether policy matches practice.",
      },
      {
        type: "narration",
        text: "The visible shift no longer contains the entire time exchange. Some preparation is simply part of life; some is a cost the worker absorbs; some may need to be recorded as work.",
      },
    ],
    concept: {
      title: "Preparation can extend the real time required by earning",
      explanation:
        "Required setup, closing tasks, training, security procedures, equipment checks, and work communications can surround scheduled hours. Whether time must legally be paid depends on the activity and applicable law. Financial comparison can still identify all time the opportunity causes while the legal question is verified separately.",
    },
    tradeoff:
      "Preparation can make work safe and effective. When substantial required activity remains unrecorded, the worker’s effective time exchange may be larger than the posted schedule suggests.",
    connection:
      "What happens before you can begin paid work and after the official work appears finished?",
    application: {
      prompt:
        "Draw a timeline from the first work-caused activity to the last. Mark paid, unpaid, uncertain, and ordinary personal time.",
      placeholder:
        "First activity… Shift… Last activity… What needs verification…",
    },
    check: {
      prompt: "What should Ivy do with a common off-the-clock practice?",
      options: [
        {
          label: "Assume common means lawful and irrelevant",
          feedback:
            "Frequency does not settle whether an activity is compensable or financially significant.",
        },
        {
          label:
            "Identify the activity, requirement, timing, control, and applicable rule before classifying it",
          correct: true,
          feedback:
            "Exactly. Specific facts turn habit into an answerable question.",
        },
        {
          label: "Assume every personal morning activity is paid work",
          feedback:
            "Ordinary personal preparation and required job activities need to be distinguished.",
        },
      ],
    },
    takeaway:
      "The paid shift may sit inside a longer work-caused day. Trace the edges instead of assuming them.",
  },
  {
    number: "5.5",
    title: "Travel and Commuting Time",
    focus: "The hours spent reaching or moving for work",
    opening:
      "Ivy times both routes again—this time with a clock, not only a cost estimate.",
    story: [
      {
        type: "narration",
        text: "Harbor requires nearly ninety minutes of round-trip commuting on an ordinary day. City requires forty. Over five days, the difference becomes more than four hours each week before delays.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "Neither commute appears on the paycheck, but both occupy hours I cannot use elsewhere.",
      },
      {
        type: "narration",
        text: "A Harbor dispatcher sometimes travels from the main site to a second facility during the workday. Sage distinguishes ordinary home-to-work commuting from travel that occurs as part of the workday; compensation rules may treat them differently.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Legal pay treatment and life impact are two lenses. Use the correct rule for wages and the actual hours for your choice.",
      },
      {
        type: "narration",
        text: "Ivy calculates an effective time commitment by adding the schedule, routine commute, and recurring required travel. She does not force every hour into a wage claim. She refuses to let unpayable time become invisible.",
      },
    ],
    concept: {
      title: "Travel time has both legal and opportunity-cost dimensions",
      explanation:
        "Ordinary commuting and travel during the workday may be treated differently under wage rules. Regardless of pay treatment, time spent traveling can affect care, rest, other income, education, and personal life. A full opportunity comparison can keep both lenses visible.",
    },
    tradeoff:
      "A longer route may reach higher wages or a stronger opportunity. It also consumes time and increases exposure to delay. Remote or closer work can return time without necessarily offering the same compensation or advancement.",
    connection:
      "If your commute were added to your scheduled hours, how large would the real weekly time commitment become?",
    application: {
      prompt:
        "Calculate scheduled work plus ordinary commute plus recurring workday travel. Which hours are paid, unpaid, or subject to a separate rule?",
      placeholder:
        "Scheduled… Commute… Workday travel… Total commitment…",
    },
    check: {
      prompt: "Why does Ivy count commuting time even if it is not paid?",
      options: [
        {
          label: "To claim every commute must legally be paid",
          feedback:
            "The story keeps legal treatment and life impact separate.",
        },
        {
          label:
            "Because the opportunity still consumes those hours and changes what remains available",
          correct: true,
          feedback:
            "Yes. Unpaid time can still be part of the personal exchange.",
        },
        {
          label: "Because time has no effect on opportunity",
          feedback:
            "Time affects rest, care, other work, education, and choice.",
        },
      ],
    },
    takeaway:
      "Not every work-caused hour is paid. Every work-caused hour still comes from the same twenty-four-hour day.",
  },
  {
    number: "5.6",
    title: "Physical and Schedule Demands",
    focus: "What earning asks of the body and life",
    opening:
      "After shadowing an evening at Harbor, Ivy notices a cost that will never arrive as an invoice.",
    story: [
      {
        type: "narration",
        text: "The dispatch floor is loud, interruptions are constant, and peak shifts require long periods standing beside the routing wall. Rotating schedules alter sleep from week to week. City’s work is less physically intense but requires sustained screen concentration and difficult public conversations.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "How do we put a price on being tired without making up a number?",
      },
      {
        type: "narration",
        text: "Sage does not force every consequence into dollars. They identify what can be measured—recovery time, meals purchased because cooking becomes harder, appointments, missed additional work—and what must remain a nonfinancial consequence in the decision.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A consequence does not become unreal because it resists a price tag.",
      },
      {
        type: "narration",
        text: "Ivy examines lifting, standing, sensory demand, emotional labor, safety exposure, sleep disruption, recovery, and accommodation. She also records what she finds energizing or meaningful. Demands and strengths can exist together.",
      },
    ],
    concept: {
      title: "Work consumes physical, cognitive, emotional, and schedule capacity",
      explanation:
        "An opportunity can require lifting, standing, concentration, emotional regulation, hazard exposure, shift adaptation, or recovery. Some consequences produce direct costs; others change health, energy, relationships, or the ability to perform additional roles.",
    },
    tradeoff:
      "Demanding work may provide meaning, skill, identity, or higher compensation. It may also reduce the capacity available for recovery and other responsibilities. The same demand can affect different people differently.",
    connection:
      "Which part of your work follows you home even when the timecard stops?",
    application: {
      prompt:
        "List one physical, cognitive, emotional, and schedule demand of an opportunity. What recovery or support does each require?",
      placeholder:
        "Physical… Cognitive… Emotional… Schedule… Support…",
    },
    check: {
      prompt: "How should Ivy treat a consequence that cannot be priced precisely?",
      options: [
        {
          label: "Erase it from the decision",
          feedback:
            "A consequence can matter even when no reliable dollar figure exists.",
        },
        {
          label:
            "Name it, measure what can be measured, and keep the remaining life effect visible",
          correct: true,
          feedback:
            "Correct. Precision should improve the comparison, not silence real effects.",
        },
        {
          label: "Invent a large price so the choice becomes obvious",
          feedback:
            "An invented number would create false precision and push the decision.",
        },
      ],
    },
    takeaway:
      "What work takes from the body, attention, and schedule belongs in the exchange even when it has no neat price.",
  },
  {
    number: "5.7",
    title: "Usable Income After Work Costs",
    focus: "What remains after earning is made possible",
    opening:
      "Ivy now returns to Harbor’s higher salary with transportation, care, equipment, preparation, travel time, and recovery visible.",
    story: [
      {
        type: "narration",
        text: "She begins with estimated net pay, not gross salary. From it she subtracts the new cash costs specifically created by accepting the opportunity. She keeps time costs and nonfinancial demands beside the calculation instead of forcing them into the same total.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "The higher offer still leaves more cash in one scenario and less in another. The rotating care cost changes the result.",
      },
      {
        type: "narration",
        text: "Eli wants one average. Ivy builds a regular month, a difficult month, and a month with a vehicle repair or extra care. The range shows how sensitive the opportunity is to real life.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A usable-income estimate is not a prophecy. It is a transparent set of assumptions you can update when reality speaks.",
      },
      {
        type: "narration",
        text: "Ivy does not announce a winner. She can finally see what the additional salary is expected to provide after the work itself is funded—and what uncertainty she would carry to obtain it.",
      },
    ],
    concept: {
      title: "Usable income after work costs begins with net pay and subtracts earning-caused cash costs",
      explanation:
        "A practical comparison can estimate take-home pay, then subtract incremental transportation, care, required equipment, and other cash costs caused by the opportunity. Time and nonfinancial demands remain separate companion measures. Scenarios prevent one average from hiding volatility.",
    },
    tradeoff:
      "A higher-paying role may still create more usable income, but by a smaller amount than the wage difference suggests. An opportunity with lower usable income may still provide growth or benefits the learner values; the calculation informs rather than commands.",
    connection:
      "How much of a pay increase would remain after the new costs required to earn it?",
    application: {
      prompt:
        "Build three usable-income scenarios: regular, difficult, and unusually favorable. Keep the assumptions beside each result.",
      placeholder:
        "Net pay… Work costs… Usable cash… Time… Assumptions…",
    },
    check: {
      prompt: "Why does Ivy build several scenarios instead of one exact answer?",
      options: [
        {
          label: "Because calculations have no value",
          feedback:
            "Calculations are useful; the scenarios show how changing assumptions affect them.",
        },
        {
          label:
            "Because care, transportation, and other work costs can vary, creating a range of possible usable income",
          correct: true,
          feedback:
            "Exactly. The range is more honest than false certainty.",
        },
        {
          label: "Because the higher salary can never help",
          feedback:
            "The outcome depends on the actual pay, costs, benefits, and circumstances.",
        },
      ],
    },
    takeaway:
      "Do not ask only what the job pays. Ask what remains after the job itself has been made possible.",
  },
];

const chapterSixLessons = [
  {
    number: "6.1",
    title: "Predictable Income",
    focus: "What stays steady—and what does not",
    opening:
      "While Ivy studies the offers, Eli accepts a maintenance role with the district. His regular weekly pay is the same whenever he completes the agreed schedule.",
    story: [
      {
        type: "narration",
        text: "The steady amount makes Eli feel that the income is fixed. Sage asks him to name what could still change: missed unpaid time, a rate change, a job loss, a deduction change, or an interruption in the employer’s operations.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "Then no income is truly certain. Does predictable mean anything?",
      },
      {
        type: "narration",
        text: "Ivy compares probability with guarantee. Eli’s ordinary pay has a reliable pattern supported by an agreement and recent history. That makes it useful for planning without making it permanent.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Predictable is not a promise that nothing can change. It is evidence that a reasonable pattern exists under stated conditions.",
      },
      {
        type: "narration",
        text: "Eli begins using the regular amount as a baseline while keeping the employment conditions visible. The distinction lets him rely on evidence without building certainty the evidence cannot support.",
      },
    ],
    concept: {
      title: "Predictable income follows a reasonably stable pattern",
      explanation:
        "Regular salary, guaranteed hours, pensions, benefits, or other recurring payments may create a consistent amount and schedule. The source, legal terms, eligibility, and interruption risks determine how dependable the pattern is. In investing, “fixed income” has a separate technical meaning, so RootWise uses predictable income for this planning idea.",
    },
    tradeoff:
      "Predictability supports recurring commitments and simpler planning. It may come with less upside, less flexibility, or dependence on one payer or employer.",
    connection:
      "Which part of your income has the strongest evidence of repeating, and what conditions must remain true for it to continue?",
    application: {
      prompt:
        "Name one predictable income source, the evidence supporting its pattern, and three events that could interrupt it.",
      placeholder:
        "Source… Evidence… Conditions… Possible interruptions…",
    },
    check: {
      prompt: "What does predictable income mean in Eli’s plan?",
      options: [
        {
          label: "Income that can never change or stop",
          feedback:
            "No ordinary income source should be treated as permanently guaranteed without regard to its terms.",
        },
        {
          label:
            "Income with a supported recurring pattern that remains dependent on identifiable conditions",
          correct: true,
          feedback:
            "Exactly. The pattern can support planning without becoming a false promise.",
        },
        {
          label: "Only income from investments",
          feedback:
            "RootWise is using predictable income to describe planning stability across possible income sources.",
        },
      ],
    },
    takeaway:
      "A dependable pattern is useful evidence. Keep the conditions that support it attached.",
  },
  {
    number: "6.2",
    title: "Variable Income",
    focus: "When the amount changes from period to period",
    opening:
      "Eli’s supervisor offers optional weekend repair calls paid separately from his regular weekly amount.",
    story: [
      {
        type: "narration",
        text: "One month brings six calls. The next brings one. Eli enjoys the larger deposits and begins treating their average as if it will repeat. Ivy asks him to separate his recurring pay from the additional call income.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "But the average is real. I calculated it from actual money.",
      },
      {
        type: "narration",
        text: "Sage agrees that the average describes the past. It does not explain the range, the timing, or whether the conditions that produced it will continue. Two workers can share the same average while one receives stable amounts and the other swings sharply.",
      },
      {
        type: "narration",
        text: "Eli records each call, pay date, source, and cause. Weather, equipment age, customer budgets, and his own availability influence the number. The variable income becomes less mysterious even though it does not become steady.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Variation is not a planning failure. Hiding the variation is.",
      },
    ],
    concept: {
      title: "Variable income changes in amount, timing, or both",
      explanation:
        "Tips, commission, projects, gig work, overtime, bonuses, and irregular hours can create variable income. Averages help summarize history, while ranges, frequency, source concentration, and causes show the uncertainty the average hides.",
    },
    tradeoff:
      "Variable earnings can create upside and access to more work. They may also make recurring commitments harder to match and place more risk on the worker.",
    connection:
      "Which income in your life is recurring, which is variable, and which looks recurring only because recent months happened to be strong?",
    application: {
      prompt:
        "List six periods of a variable income source. Calculate the average, then identify the highest, lowest, and most common range.",
      placeholder:
        "Periods… Average… High… Low… Typical range…",
    },
    check: {
      prompt: "Why is Eli’s past average not enough for planning?",
      options: [
        {
          label: "Because averages are always false",
          feedback:
            "An average can be accurate; it simply does not show variation or guarantee the future.",
        },
        {
          label:
            "Because it hides the range, timing, causes, and uncertainty around future calls",
          correct: true,
          feedback:
            "Correct. Those facts reveal how much risk sits behind the summary.",
        },
        {
          label: "Because weekend pay cannot count as income",
          feedback:
            "It is income; the question is how dependable and repeatable it is.",
        },
      ],
    },
    takeaway:
      "An average summarizes variable income. A range explains how it behaves.",
  },
  {
    number: "6.3",
    title: "Seasonal Income",
    focus: "Patterns tied to the calendar",
    opening:
      "As winter approaches, repair calls rise. The district’s old heating systems fail faster than Eli can reach them.",
    story: [
      {
        type: "narration",
        text: "For three months, Eli’s additional income nearly matches his regular pay. He mistakes the busy season for a permanent expansion. Ivy finds the previous year’s service records and sees the calls fall sharply after winter.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "I knew winter was busy. I didn’t realize how much of my new normal was actually the weather.",
      },
      {
        type: "narration",
        text: "They map twelve months instead of three. Some patterns follow weather, holidays, school calendars, tourism, agriculture, construction cycles, budgets, or tax deadlines. A season can be regular even while the income within it varies.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A strong season is not lying to you. It is answering a calendar question you did not ask.",
      },
      {
        type: "narration",
        text: "Eli stops treating winter income as a permanent monthly baseline. He begins asking what part of the season must carry the quieter period and what expenses also rise during the busiest months.",
      },
    ],
    concept: {
      title: "Seasonal income follows recurring periods of higher and lower demand",
      explanation:
        "Seasonality can influence work availability, rates, tips, sales, and project volume. A twelve-month view helps distinguish a strong season from sustained growth. Several years of history can reveal whether the pattern is recurring or exceptional.",
    },
    tradeoff:
      "Busy seasons may create concentrated opportunity and larger earnings. They can also demand more time, raise work costs, and require strong months to support quieter ones.",
    connection:
      "Does any income or expense in your life follow a season even when it first appears random?",
    application: {
      prompt:
        "Draw a twelve-month income line for one seasonal source. Mark the causes of peaks, valleys, and unusual years.",
      placeholder:
        "Peak months… Low months… Cause… Exception…",
    },
    check: {
      prompt: "What changed when Eli examined twelve months instead of three?",
      options: [
        {
          label: "The winter earnings disappeared",
          feedback:
            "The earnings remained real; their likely duration became clearer.",
        },
        {
          label:
            "He could see that the recent high income followed a seasonal pattern rather than a permanent baseline",
          correct: true,
          feedback:
            "Exactly. A longer time horizon revealed the calendar behind the numbers.",
        },
        {
          label: "He proved next winter will be identical",
          feedback:
            "A recurring pattern supports planning but does not guarantee an identical season.",
        },
      ],
    },
    takeaway:
      "A season can repeat without every amount repeating. Plan for the pattern and leave room for the year to differ.",
  },
  {
    number: "6.4",
    title: "High and Low Pay Periods",
    focus: "Learning from the range",
    opening:
      "Eli places his highest winter paycheck beside his lowest summer paycheck. The difference is large enough to make them look like income from two different jobs.",
    story: [
      {
        type: "narration",
        text: "The high check came from regular pay, weekend calls, a holiday differential, and a training bonus. The low check followed unpaid time and no extra calls. Neither check alone represents his ordinary earning pattern.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "If you plan from the high, the low feels like a crisis. If you plan only from the low, you may ignore real capacity.",
      },
      {
        type: "narration",
        text: "They classify each period: ordinary, predictably high, predictably low, or unusual. Then they identify which parts of the check recur and which came from one-time events.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A high period can fund something without promising to repeat. A low period can warn you without defining your entire future.",
      },
      {
        type: "narration",
        text: "Eli begins directing high-period money only after naming the jobs it may need to perform during lower periods. The low period stops being an ambush because it was given a place in the annual story.",
      },
    ],
    concept: {
      title: "High and low periods reveal the operating range of variable income",
      explanation:
        "Examining extremes, ordinary periods, and causes can show which income is recurring, seasonal, one-time, or disrupted. A single high or low check should not silently become the forecast for every future period.",
    },
    tradeoff:
      "Planning from a conservative baseline can protect essential commitments but may understate possible capacity. Planning from a high period expands apparent capacity while increasing exposure when income falls.",
    connection:
      "Which paycheck do you emotionally treat as normal: the best, the worst, or the one supported by the strongest evidence?",
    application: {
      prompt:
        "Choose a high and low pay period. Label every line as recurring, seasonal, one-time, or disrupted.",
      placeholder:
        "High period… Low period… What actually explains the difference…",
    },
    check: {
      prompt: "Why does Ivy avoid choosing either extreme as Eli’s normal pay?",
      options: [
        {
          label: "Because neither paycheck was real",
          feedback:
            "Both were real. Their causes and repeatability differed.",
        },
        {
          label:
            "Because each contained unusual or variable components that do not represent every period",
          correct: true,
          feedback:
            "Correct. Classification reveals which parts deserve a place in the baseline.",
        },
        {
          label: "Because income history can never inform planning",
          feedback:
            "History is useful when the causes and range remain visible.",
        },
      ],
    },
    takeaway:
      "Do not let the best or worst paycheck impersonate the entire income pattern.",
  },
  {
    number: "6.5",
    title: "Income Timing",
    focus: "Earning money and receiving money",
    opening:
      "Eli completes three emergency calls in the final week of the month. The related pay will not appear until the following pay cycle.",
    story: [
      {
        type: "narration",
        text: "He has earned the additional money under the employer’s rules, but it is not yet available. A separate project customer owes Eli for a small repair and pays thirty days after the invoice. The work date, recognition date, invoice date, and cash date are different.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "The money exists in the record. My rent cannot use a record.",
      },
      {
        type: "narration",
        text: "Ivy builds a timing map: work performed, approval, payroll cutoff or invoice, scheduled payment, actual receipt, and possible delay. She refuses to assign a bill to money whose arrival date is still uncertain.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Earned, owed, scheduled, and received are four different states. Cash flow cares which state the money is in today.",
      },
      {
        type: "narration",
        text: "Eli realizes that a profitable month of work can still create a cash shortage if payment arrives later than the obligations it is expected to cover.",
      },
    ],
    concept: {
      title: "Income timing tracks the path from work to available cash",
      explanation:
        "Payroll cutoffs, approval, invoicing, customer terms, processing, disputes, and delays can separate performance from payment. Planning distinguishes accrued or expected income from cleared money available to use.",
    },
    tradeoff:
      "Accepting delayed payment may open work or fit an industry’s normal terms. It transfers more timing risk to the worker and can require another resource to bridge the gap.",
    connection:
      "How long is the path between doing your work and being able to use the money?",
    application: {
      prompt:
        "Trace one income source through work date, approval, statement or invoice, due date, and actual availability.",
      placeholder:
        "Worked… Approved… Submitted… Due… Received… Delay risk…",
    },
    check: {
      prompt: "Why can Eli not use earned but unpaid income for rent today?",
      options: [
        {
          label: "Because earned income has no value",
          feedback:
            "It may be a valid receivable or payroll earning; it is simply not available cash yet.",
        },
        {
          label:
            "Because the money has not completed the timing path into funds he can access",
          correct: true,
          feedback:
            "Exactly. Cash-flow planning depends on receipt, not only entitlement.",
        },
        {
          label: "Because rent must always be paid annually",
          feedback:
            "The story concerns timing between an obligation and available income.",
        },
      ],
    },
    takeaway:
      "Work creates a claim to income. Only receipt creates cash available for today’s obligations.",
  },
  {
    number: "6.6",
    title: "Building a Dependable Baseline",
    focus: "The amount supported by evidence",
    opening:
      "Eli now has regular pay, variable calls, seasonal peaks, and delayed project payments. He wants one number he can use without lying to himself.",
    story: [
      {
        type: "narration",
        text: "He first chooses the average of everything. Ivy removes one-time bonuses and separates income that depends on winter conditions. She asks which amount has the strongest evidence of arriving on time in an ordinary lower period.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "The baseline feels smaller than what I usually make.",
      },
      {
        type: "narration",
        text: "Sage explains that a baseline is not an identity or forecast of maximum ability. It is a planning foundation. Additional income can still have deliberate jobs when it arrives.",
      },
      {
        type: "narration",
        text: "They test the baseline against several past low periods and ask what recurring commitments it can support. They also identify the conditions that would require the baseline to be revised up or down.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Dependable does not mean smallest imaginable. It means supported strongly enough that essential plans are not borrowing confidence from uncertain money.",
      },
    ],
    concept: {
      title: "A dependable baseline is the planning amount supported by repeatable evidence",
      explanation:
        "A baseline may use guaranteed pay, a conservative portion of variable income, or a documented lower-range pattern. It excludes or separately treats one-time, highly seasonal, delayed, and unusually strong income. It should be reviewed when the source or pattern changes.",
    },
    tradeoff:
      "A lower baseline can protect recurring obligations but may feel restrictive. A higher baseline creates more apparent room while making the plan more dependent on variable outcomes.",
    connection:
      "What amount could your recurring plan rely on without requiring your best month to repeat?",
    application: {
      prompt:
        "Build a baseline from one income history. State what you included, excluded, and why.",
      placeholder:
        "Included… Excluded… Evidence… Review trigger…",
    },
    check: {
      prompt: "What is Eli’s baseline meant to represent?",
      options: [
        {
          label: "The most he can ever earn",
          feedback:
            "A baseline is a planning foundation, not a ceiling.",
        },
        {
          label:
            "An amount supported strongly enough to carry recurring plans without depending on unusually strong income",
          correct: true,
          feedback:
            "Yes. Additional income remains real without being required in advance.",
        },
        {
          label: "The lowest income any person has ever received",
          feedback:
            "The baseline comes from Eli’s evidence and conditions, not an unrelated universal minimum.",
        },
      ],
    },
    takeaway:
      "A baseline protects recurring choices from needing uncertain income to become certain on command.",
  },
  {
    number: "6.7",
    title: "Planning Without Pretending Income Is Certain",
    focus: "A plan that can respond to reality",
    opening:
      "Eli uses his baseline to build the next three months, then gives variable and seasonal income separate jobs if it arrives.",
    story: [
      {
        type: "narration",
        text: "Regular pay supports recurring essentials. Additional calls may replenish a low-period reserve, fund a training goal, or support another chosen use after arrival. Project payments remain expected until they clear.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "You are still making plans for variable money. You just stopped spending it before it exists.",
      },
      {
        type: "narration",
        text: "Eli creates triggers: if call volume falls below a stated range, he revises optional commitments; if an invoice passes its due date, he follows up and removes it from near-term availability; if the baseline itself changes, he rebuilds the plan.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Uncertainty does not require paralysis. It requires conditions, ranges, and a response before surprise begins making the decisions.",
      },
      {
        type: "narration",
        text: "The plan cannot guarantee income. It can keep one uncertain period from automatically becoming a chain of unexamined choices.",
      },
    ],
    concept: {
      title: "Responsive planning uses baselines, ranges, and decision triggers",
      explanation:
        "A plan can assign recurring commitments to dependable income, give variable income conditional jobs after receipt, track payment timing, and define when falling or rising income requires revision. The plan stays useful because it expects new information.",
    },
    tradeoff:
      "Waiting for uncertain money to arrive may delay some goals. Spending it in advance may accelerate those goals when the income arrives and create a shortage when it does not.",
    connection:
      "Which part of your current plan quietly requires a variable amount to behave like a guarantee?",
    application: {
      prompt:
        "Write one baseline, one high-low range, and three if-then triggers for a changing income source.",
      placeholder:
        "Baseline… Range… If income…, then I will…",
    },
    check: {
      prompt: "How does Eli plan for variable income without pretending it is certain?",
      options: [
        {
          label: "He ignores every dollar beyond base pay",
          feedback:
            "He gives variable money conditional jobs after arrival and uses its history to prepare.",
        },
        {
          label:
            "He uses a supported baseline, keeps ranges visible, and defines responses when reality changes",
          correct: true,
          feedback:
            "Exactly. The plan acknowledges uncertainty and still directs action.",
        },
        {
          label: "He assumes the highest winter month will continue forever",
          feedback:
            "That would erase the seasonal evidence he uncovered.",
        },
      ],
    },
    takeaway:
      "A useful plan does not need certainty. It needs honest assumptions and a way to change when they stop being true.",
  },
];

const chapterSevenLessons = [
  {
    number: "7.1",
    title: "Skills",
    focus: "What you can now do reliably",
    opening:
      "Ivy returns to the six-hundred-dollar diagnostic course she marked on her Root One map. This time she begins with capability instead of enrollment.",
    story: [
      {
        type: "narration",
        text: "The course promises advanced equipment diagnostics. Ivy asks employers and graduates what tasks successful learners can perform afterward. She learns the skill involves reading fault patterns, testing likely causes, documenting evidence, and communicating when a machine should be shut down.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "The course name sounded valuable. The skill becomes real when I can describe what changes in the work.",
      },
      {
        type: "narration",
        text: "Eli finds a cheaper class with a more impressive title but no supervised practice. It provides information without evidence that learners can apply it reliably.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Knowledge can inform you. A skill appears when you can use knowledge to produce a result under real conditions.",
      },
      {
        type: "narration",
        text: "Ivy lists the specific problems the skill could help solve and the settings where employers request it. Training becomes one possible route to capability, not a symbolic purchase.",
      },
    ],
    concept: {
      title: "A skill is a practiced ability that changes what work you can perform",
      explanation:
        "Skills may be technical, analytical, interpersonal, physical, creative, or organizational. Their earning relevance depends on reliability, level, context, demand, evidence, and connection to problems someone will pay to solve.",
    },
    tradeoff:
      "Learning a skill can expand possible work and reduce time needed for a result. It requires practice and does not guarantee that demand, access, or compensation will follow.",
    connection:
      "Can you describe your skills as reliable actions and results rather than course names or personality labels?",
    application: {
      prompt:
        "Rewrite one skill as: I can perform this action, under these conditions, to produce or protect this result.",
      placeholder:
        "I can… Under… So that… Evidence…",
    },
    check: {
      prompt: "What makes the diagnostic course relevant to Ivy’s earning capacity?",
      options: [
        {
          label: "Its title sounds advanced",
          feedback:
            "A title alone does not establish capability, demand, or evidence.",
        },
        {
          label:
            "It may build a specific practiced capability used to solve problems employers need addressed",
          correct: true,
          feedback:
            "Correct. The link between learning, capability, evidence, and demand matters.",
        },
        {
          label: "Any course automatically raises income",
          feedback:
            "Training can expand options without guaranteeing access or earnings.",
        },
      ],
    },
    takeaway:
      "A skill is not what you studied. It is what you can now do reliably because you studied and practiced.",
  },
  {
    number: "7.2",
    title: "Experience",
    focus: "Capability tested by repeated reality",
    opening:
      "The course requires supervised diagnostic hours. Ivy first sees them as a delay between learning and higher-paying work.",
    story: [
      {
        type: "narration",
        text: "During the first supervised repair, Ivy follows the correct checklist and still reaches the wrong likely cause. Her mentor shows her a vibration pattern that rarely appears in a classroom example. Ivy corrects the diagnosis before any part is ordered.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "I knew the process. I did not yet know which detail deserved more weight.",
      },
      {
        type: "narration",
        text: "Across several cases, experience teaches variation: equipment altered by earlier repairs, incomplete records, customers describing symptoms differently, and two faults appearing at once. Repetition alone is not enough; feedback turns repetition into improved judgment.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Experience becomes capability when reality is allowed to correct you.",
      },
      {
        type: "narration",
        text: "Ivy begins recording cases, decisions, mentor feedback, and outcomes. The hours stop being merely time served and become evidence of problems encountered and judgment strengthened.",
      },
    ],
    concept: {
      title: "Experience develops pattern recognition and judgment through exposure and feedback",
      explanation:
        "Repeated work can reveal exceptions, context, consequences, and tacit knowledge that instruction alone cannot supply. Experience is strongest when it includes feedback, increasing responsibility, reflection, and evidence of improving outcomes.",
    },
    tradeoff:
      "Entry-level or supervised experience may offer lower pay while capability grows. Experience without challenge or feedback may repeat habits without expanding earning capacity.",
    connection:
      "Which experiences actually changed your judgment, and which simply repeated a familiar task?",
    application: {
      prompt:
        "Choose one experience and name the pattern, exception, or consequence it taught you to recognize.",
      placeholder:
        "At first I assumed… Reality showed… Now I notice…",
    },
    check: {
      prompt: "What made Ivy’s supervised hours more than time served?",
      options: [
        {
          label: "The calendar moved forward",
          feedback:
            "Time passed, but learning came from cases, feedback, correction, and improved judgment.",
        },
        {
          label:
            "Real cases tested her knowledge and feedback changed how she interpreted evidence",
          correct: true,
          feedback:
            "Exactly. Experience became a stronger capability through correction.",
        },
        {
          label: "She never made an incorrect assumption",
          feedback:
            "Her incorrect first judgment created an important learning moment before harm occurred.",
        },
      ],
    },
    takeaway:
      "Experience is valuable when repeated reality improves what you notice, decide, and prevent.",
  },
  {
    number: "7.3",
    title: "Credentials",
    focus: "Evidence, access, and permission",
    opening:
      "After the course and supervised hours, Ivy can sit for a credential required by some diagnostic roles and merely preferred by others.",
    story: [
      {
        type: "narration",
        text: "The credential verifies that Ivy met stated education, experience, and examination requirements. It does not prove she will be the strongest technician in every situation. It does allow employers to screen for a common baseline without personally observing every applicant’s work.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "If she already has the skill, why pay for a piece of paper?",
      },
      {
        type: "narration",
        text: "In one facility, the credential is legally or contractually required for the work. In another, a portfolio and practical test can substitute. In a third, the credential changes nothing because the employer does not use that equipment.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A credential can prove, signal, or permit. Its value depends on which job it performs in the market you are entering.",
      },
      {
        type: "narration",
        text: "Ivy checks renewal fees, continuing education, recognition across employers, and the actual job postings that request it. The credential becomes a tool with a defined use rather than an automatic status upgrade.",
      },
    ],
    concept: {
      title: "Credentials can verify a baseline, signal capability, or authorize work",
      explanation:
        "Degrees, licenses, certifications, apprenticeships, and badges serve different functions. Their earning value depends on legal requirements, employer recognition, transferability, renewal, cost, and whether they connect to real capability and demand.",
    },
    tradeoff:
      "A credential can open a gate or make evidence easier to communicate. It can also cost money and time without changing access if the relevant market does not require or respect it.",
    connection:
      "Which credentials in your field are required, preferred, substitutable, or mostly decorative?",
    application: {
      prompt:
        "Evaluate one credential across function, recognition, cost, renewal, transferability, and evidence from actual opportunities.",
      placeholder:
        "It proves or permits… Required by… Cost… Renewal… Evidence…",
    },
    check: {
      prompt: "When is Ivy’s credential most likely to expand access?",
      options: [
        {
          label: "Whenever the title sounds impressive",
          feedback:
            "Market recognition and function matter more than an impressive name.",
        },
        {
          label:
            "When relevant employers or rules use it as a recognized requirement, signal, or permission",
          correct: true,
          feedback:
            "Correct. The credential must connect to the actual gate Ivy needs to cross.",
        },
        {
          label: "Only when no skill is required",
          feedback:
            "Credentials commonly work best alongside real capability rather than replacing it.",
        },
      ],
    },
    takeaway:
      "A credential has value when it proves, signals, or permits something the opportunity actually requires.",
  },
  {
    number: "7.4",
    title: "Reputation and Reliability",
    focus: "What other people expect from your work",
    opening:
      "Ivy’s mentor begins sending her the difficult calls that require careful documentation and honest communication.",
    story: [
      {
        type: "narration",
        text: "Ivy does not solve every problem immediately. She arrives prepared, records what she tested, names uncertainty, follows through, and calls before a delay becomes a surprise. Customers and coworkers begin requesting her.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "My reputation is growing partly from what I do when I do not have the answer yet.",
      },
      {
        type: "narration",
        text: "Eli sees that reputation reduces uncertainty for the person choosing a worker. A referral carries borrowed trust. A record of reliability can expand access to responsibility, repeat work, and negotiation.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Reputation is other people’s expectation. Reliability is the repeated behavior that gives the expectation evidence.",
      },
      {
        type: "narration",
        text: "They also see the fragility. One false accusation, biased network, inaccessible opportunity, or mistake can affect reputation unevenly. A strong record helps; it does not make every market fair.",
      },
    ],
    concept: {
      title: "Reliability lowers the risk of choosing your work",
      explanation:
        "Follow-through, communication, quality, honesty, documentation, and consistent response help employers and buyers predict an exchange. Reputation carries those expectations across relationships. It can expand opportunity but may also be shaped by bias, unequal visibility, and access to networks.",
    },
    tradeoff:
      "A trusted reputation can create repeat work and bargaining power. Maintaining it requires consistency, boundaries, correction, and sometimes refusing work that cannot be performed reliably.",
    connection:
      "What specific behavior causes people to trust your work—not merely like you?",
    application: {
      prompt:
        "Name three reliability behaviors you control and one reputation factor that may sit outside your control.",
      placeholder:
        "I can control… Outside my control… Evidence I can preserve…",
    },
    check: {
      prompt: "Why do people begin requesting Ivy?",
      options: [
        {
          label: "Because she pretends to know every answer",
          feedback:
            "Her honesty about uncertainty is part of the trust she builds.",
        },
        {
          label:
            "Because repeated preparation, communication, documentation, honesty, and follow-through reduce the risk of choosing her",
          correct: true,
          feedback:
            "Exactly. Reliability gives reputation an evidence base.",
        },
        {
          label: "Because reputation eliminates all market bias",
          feedback:
            "Bias and unequal access can still shape whose work is seen and trusted.",
        },
      ],
    },
    takeaway:
      "Reputation is not a slogan. It is the expectation built from what your repeated behavior teaches others to trust.",
  },
  {
    number: "7.5",
    title: "The Cost of Training",
    focus: "Everything invested before the possible return",
    opening:
      "Ivy finally prices the diagnostic path beyond the six-hundred-dollar tuition.",
    story: [
      {
        type: "narration",
        text: "She adds registration, books, tools, examination and credential fees, travel, renewal, and the hours spent studying. Some supervised hours are paid at her current rate; others replace weekend calls she could have accepted.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "The course costs six hundred dollars. The rest are choices she is making around it.",
      },
      {
        type: "narration",
        text: "Ivy agrees they are choices and keeps them in the calculation because the training causes them. Opportunity cost does not turn every sacrificed hour into a guaranteed cash loss, but it makes the alternative she gives up visible.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "The price purchases entry to the program. The cost describes what completing the path requires from the learner’s actual life.",
      },
      {
        type: "narration",
        text: "Ivy also identifies support: an employer reimbursement after passing, borrowed tools, and a family schedule that protects two study evenings. Costs and resources belong in the same map.",
      },
    ],
    concept: {
      title: "Training cost includes direct expense, time, forgone alternatives, and financing",
      explanation:
        "Tuition is one line. Fees, materials, equipment, transportation, care, study time, reduced work, interest, and renewal may also matter. Grants, reimbursement, paid learning, shared tools, and support can reduce the learner’s burden, often under specific conditions.",
    },
    tradeoff:
      "Training can expand future options while reducing present cash, time, and earning capacity. Support may lower the cost but create service, grade, completion, or repayment conditions.",
    connection:
      "What did your last learning investment cost beyond the amount on the registration page?",
    application: {
      prompt:
        "Build a complete training-cost map: direct cash, time, forgone income, financing, support, and conditions.",
      placeholder:
        "Tuition… Other cash… Hours… Income forgone… Support… Conditions…",
    },
    check: {
      prompt: "Why does Ivy include missed weekend calls in the training comparison?",
      options: [
        {
          label: "Because she is guaranteed to receive every possible call",
          feedback:
            "Forgone income should be estimated from evidence, not treated as guaranteed.",
        },
        {
          label:
            "Because study time may replace a realistic earning alternative, creating an opportunity cost",
          correct: true,
          feedback:
            "Yes. The estimate makes the tradeoff visible without pretending the alternative was certain.",
        },
        {
          label: "Because tuition never matters",
          feedback:
            "Tuition remains a direct cost alongside the other requirements.",
        },
      ],
    },
    takeaway:
      "The advertised price opens the training door. The complete cost measures what it takes to walk through.",
  },
  {
    number: "7.6",
    title: "The Possible Return",
    focus: "Evidence, probability, and the time to benefit",
    opening:
      "With the cost mapped, Ivy investigates what the training might return.",
    story: [
      {
        type: "narration",
        text: "The school advertises the highest wage earned by one graduate. Ivy asks for the range, typical roles, completion rate, credential pass rate, employer demand, and time between graduation and relevant work.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "The best outcome shows what happened once. It does not tell me how often or under what conditions.",
      },
      {
        type: "narration",
        text: "She builds three scenarios: no immediate pay change but expanded responsibility, a moderate raise after six months, and access to a higher-paid opening that also requires relocation. Each return carries a different probability and different cost.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A possible return is not weakened by honest uncertainty. It becomes usable when the uncertainty has names.",
      },
      {
        type: "narration",
        text: "Ivy includes non-wage returns: more mobility, stronger bargaining evidence, safer work, and the ability to recognize harmful equipment conditions. She does not translate every benefit into dollars.",
      },
    ],
    concept: {
      title: "Training return is a range of possible changes, not a promised salary",
      explanation:
        "Possible return can include earnings, job access, stability, mobility, responsibility, safety, or choice. Evidence can come from actual opportunities, graduate outcomes, employer requirements, and transferability. Probability, delay, added costs, and failure to complete belong beside the upside.",
    },
    tradeoff:
      "A high possible return may justify attention while carrying low probability or long delay. A modest wage return may still expand choice or reduce risk in ways the salary number misses.",
    connection:
      "When you imagine the return from learning, are you picturing the typical outcome, the best outcome, or the outcome most supported by your own conditions?",
    application: {
      prompt:
        "Build low, middle, and high return scenarios for one training path. Include probability evidence, delay, and added costs.",
      placeholder:
        "Low… Middle… High… Evidence… Time… New costs…",
    },
    check: {
      prompt: "Why does Ivy not use the school’s highest graduate wage as her forecast?",
      options: [
        {
          label: "Because no graduate earned it",
          feedback:
            "The outcome may be real; it is not necessarily typical or likely for Ivy.",
        },
        {
          label:
            "Because one best-case outcome does not reveal frequency, conditions, range, delay, or added cost",
          correct: true,
          feedback:
            "Correct. Those facts turn a marketing example into a decision range.",
        },
        {
          label: "Because training can never improve earnings",
          feedback:
            "Training may improve earnings or options; the result is not automatic.",
        },
      ],
    },
    takeaway:
      "A possible return deserves evidence, a range, a timeline, and the conditions required to reach it.",
  },
  {
    number: "7.7",
    title: "Access and Structural Barriers",
    focus: "Why ability and effort may not be enough",
    opening:
      "Two learners complete the same diagnostic course with similar results. Their paths afterward separate quickly.",
    story: [
      {
        type: "narration",
        text: "One has transportation to distant worksites, a schedule that allows unpaid supervised hours, and a mentor who recommends her. The other supports a family member, relies on a limited transit route, and cannot accept unpaid placement hours without losing housing stability.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "They earned the same credential. Why should the opportunity care about everything around it?",
      },
      {
        type: "narration",
        text: "Sage identifies gates: geography, care, disability access, discrimination, licensing history, technology, language, networks, upfront cost, schedule, and who can afford the transition period. The barriers do not erase effort; they affect whether effort can reach the opportunity.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A barrier can be personal in impact without being personal in origin.",
      },
      {
        type: "narration",
        text: "Ivy adds barrier questions to her return scenarios. She looks for paid placements, transit-accessible employers, flexible supervised hours, and transparent selection criteria. Identifying structure reveals possible routes without pretending every barrier is individually solvable.",
      },
    ],
    concept: {
      title: "Earning capacity depends on capability and access",
      explanation:
        "Skills and credentials create possible capacity. Opportunity also depends on systems that distribute information, permission, transportation, time, capital, safety, accommodation, and trust. Structural barriers can make equal effort produce unequal access and unequal return.",
    },
    tradeoff:
      "Naming barriers prevents the learner from turning every blocked opportunity into self-blame. It can also reveal which barrier can be reduced, which requires collective or policy change, and which must be included as uncertainty.",
    connection:
      "Which gate between capability and opportunity has mattered most in your own work history?",
    application: {
      prompt:
        "Map one opportunity from capability to access. Name each gate and whether it is open, costly, uncertain, or closed.",
      placeholder:
        "Capability… Gate… Current access… Possible support… Structural limit…",
    },
    check: {
      prompt: "What do the two graduates demonstrate?",
      options: [
        {
          label: "That the learner with barriers did not work hard",
          feedback:
            "The story gives similar course performance; access conditions differ.",
        },
        {
          label:
            "That equal capability can meet unequal access to time, location, support, networks, and transition resources",
          correct: true,
          feedback:
            "Exactly. The return from effort is shaped by the path available around it.",
        },
        {
          label: "That credentials always remove structural barriers",
          feedback:
            "Credentials may open one gate while others remain.",
        },
      ],
    },
    takeaway:
      "Capability creates possibility. Access determines whether possibility can reach an actual exchange.",
  },
  {
    number: "7.8",
    title: "More Income Versus More Choice",
    focus: "What expanded capacity is meant to provide",
    opening:
      "Ivy completes her evidence map and sees two possible returns from the diagnostic path: a higher-paying specialist role and greater control over which work she can accept.",
    story: [
      {
        type: "narration",
        text: "The specialist role pays more but requires rotating emergency coverage. Another employer pays only modestly more and offers a stable schedule, broader training, and a path across several departments. The skill expands both income and alternatives, but not through the same job.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "I thought growing earning capacity meant making the largest number possible. It can also mean having more doors I am qualified to open or refuse.",
      },
      {
        type: "narration",
        text: "Eli asks whether choosing the lower increase wastes the training. Ivy points to the capability itself: it remains hers and may support a later choice. The return is not limited to the first role after completion.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Capacity is the range of value you can reliably create and the exchanges you can reach. Income is one result. Choice is another.",
      },
      {
        type: "narration",
        text: "Ivy names what she wants the training to protect: enough income, safety, mobility, and schedule control. She still has uncertainty, but the objective is now larger than one salary.",
      },
    ],
    concept: {
      title: "Earning capacity can expand income, resilience, bargaining power, and choice",
      explanation:
        "Skills, experience, credentials, reputation, and access may improve pay, but they can also broaden industries, roles, schedules, locations, or work structures available. More capacity does not guarantee more income, and more income does not always produce more choice.",
    },
    tradeoff:
      "Maximizing immediate pay may reduce time, control, or flexibility. Choosing a role with broader options may delay some income. The learner decides which return matters; RootWise keeps each consequence visible.",
    connection:
      "If your earning capacity grew, which new choice would matter even if it did not create the highest immediate income?",
    application: {
      prompt:
        "Define the return you want across income, stability, mobility, control, and future options. Do not rank them yet; make them visible.",
      placeholder:
        "Income… Stability… Mobility… Control… Future options…",
    },
    check: {
      prompt: "What changed in Ivy’s definition of earning capacity?",
      options: [
        {
          label: "She decided income no longer matters",
          feedback:
            "Income remains a central result; it is not the only possible return.",
        },
        {
          label:
            "She recognized that capability can expand both earnings and the range of exchanges she can choose or refuse",
          correct: true,
          feedback:
            "Exactly. More choice is a meaningful form of financial capacity.",
        },
        {
          label: "She assumed every new door will open automatically",
          feedback:
            "Access, demand, barriers, and evidence still affect which possibilities become real.",
        },
      ],
    },
    takeaway:
      "The deepest return from earning capacity may be more income, more resilience, more choice—or a combination you define.",
  },
];

const chapterEightLessons = [
  {
    number: "8.1",
    title: "Comparing Two Offers",
    focus: "Seeing the whole exchange at once",
    opening:
      "Ivy places the City Operations and Harbor Dispatch offers side by side. This time, the salary is only one row.",
    story: [
      {
        type: "narration",
        text: "Harbor offers $6,000 more each year and possible incentive pay. City offers the lower salary, a direct bus route, a stable weekday schedule, a larger health contribution, more paid time, and a retirement contribution.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "Harbor still wins the income row. City wins several rows that decide what the income can actually do.",
      },
      {
        type: "narration",
        text: "Ivy adds the higher Harbor health premium, the longer commute, rotating shifts, and possible dependent-care costs. She does not subtract every nonfinancial demand as though life can be reduced to one number. She records money, time, predictability, control, and future options separately.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A comparison does not choose for you. It keeps one attractive number from choosing before you do.",
      },
      {
        type: "narration",
        text: "Neither offer wins every category. For the first time, that does not feel like a failure of the comparison. It is the information the comparison was meant to reveal.",
      },
    ],
    concept: {
      title: "A full offer comparison includes money, time, conditions, costs, risk, and options",
      explanation:
        "Annual pay, likely net pay, benefits, work costs, schedule, variability, physical demands, flexibility, and growth paths describe different parts of an exchange. Some can be estimated in dollars; others remain meaningful without a price tag.",
    },
    tradeoff:
      "Combining every factor into a single score can make comparison easier, but it may hide which differences matter most. Keeping categories separate preserves the learner’s priorities.",
    connection:
      "When two opportunities are close, which two or three differences would change what each one provides in your actual life?",
    application: {
      prompt:
        "Compare two real or imagined opportunities across five rows: usable income, time, predictability, control, and future options.",
      placeholder:
        "Opportunity A / Opportunity B\nUsable income…\nTime…\nPredictability…\nControl…\nFuture options…",
    },
    check: {
      prompt: "Why does Ivy keep several rows instead of naming one overall winner?",
      options: [
        {
          label: "Because salary is too difficult to compare",
          feedback:
            "Salary is comparable, but it describes only one part of the exchange.",
        },
        {
          label:
            "Because the offers provide different combinations of money, time, stability, control, and possibility",
          correct: true,
          feedback:
            "Exactly. The comparison reveals tradeoffs without deciding which one must matter most.",
        },
        {
          label: "Because a strong offer should never require a tradeoff",
          feedback:
            "Most exchanges involve tradeoffs. Visibility makes them examinable.",
        },
      ],
    },
    takeaway:
      "A complete comparison makes the differences visible; your priorities determine what those differences mean.",
  },
  {
    number: "8.2",
    title: "Knowing What Is Negotiable",
    focus: "Separating a printed offer from a fixed reality",
    opening:
      "Eli treats both offer sheets as final. Ivy notices that neither document says which terms can change.",
    story: [
      {
        type: "narration",
        text: "Ivy lists the terms she would want to understand: starting pay, schedule, start date, remote days, paid time, training support, and the timing of a review. Some may be set by policy. Some may depend on the role, budget, or manager.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "Negotiable does not mean I am entitled to a yes. It means the term is not necessarily beyond discussion.",
      },
      {
        type: "narration",
        text: "Eli sees the same distinction in his maintenance work. A customer may not move the total budget, but the scope, deadline, materials, payment timing, or follow-up work may still change the exchange.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Before deciding whether to ask, identify the term, the evidence supporting a change, and what you would do with either answer.",
      },
      {
        type: "narration",
        text: "Ivy marks each item confirmed fixed, possibly flexible, or unknown. The unknown column becomes a list of questions rather than a list of assumptions.",
      },
    ],
    concept: {
      title: "Negotiation can involve more than pay",
      explanation:
        "Depending on the exchange, negotiable terms may include compensation, schedule, location, scope, deadline, title, start date, paid time, equipment, training, payment timing, or review dates. Which terms can move is specific to the situation.",
    },
    tradeoff:
      "Asking may improve the exchange or clarify its limits. It also takes preparation and may not change the offer. A no supplies information, but it can still affect the decision.",
    connection:
      "Which term in an opportunity would most change whether the exchange works for you?",
    application: {
      prompt:
        "Choose one opportunity and sort its important terms into confirmed fixed, possibly flexible, and unknown.",
      placeholder:
        "Confirmed fixed…\nPossibly flexible…\nUnknown…",
    },
    check: {
      prompt: "What does negotiable mean in this scene?",
      options: [
        {
          label: "The other party must accept a reasonable request",
          feedback:
            "A request can be well supported without creating an obligation to accept it.",
        },
        {
          label:
            "A term may be open to discussion, although the answer can still be no",
          correct: true,
          feedback:
            "Yes. Negotiability creates a conversation, not a guaranteed result.",
        },
        {
          label: "Only the wage can change",
          feedback:
            "Many exchanges include other terms that shape value, cost, and control.",
        },
      ],
    },
    takeaway:
      "An offer contains terms. Some are fixed, some may move, and some remain unknown until someone asks.",
  },
  {
    number: "8.3",
    title: "Asking for More Information",
    focus: "Replacing assumptions with usable facts",
    opening:
      "Ivy is almost ready to choose when Eli points to three words in the Harbor offer: “schedule as needed.”",
    story: [
      {
        type: "dialogue",
        speaker: "Eli",
        text: "We calculated the cost of a rotating schedule without knowing how often it rotates.",
      },
      {
        type: "narration",
        text: "Ivy asks Harbor how schedules are assigned, how far ahead they are posted, how often remote days move, and whether incentive targets are typical or exceptional. She asks City when health coverage begins, what the retirement contribution requires, and how overtime is handled.",
      },
      {
        type: "narration",
        text: "The answers change the comparison. Harbor’s incentive is possible but uncommon in the first year. City’s health coverage begins after a waiting period. One uncertainty shrinks; another becomes visible.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "The purpose of a question is not to make an opportunity sound better. It is to make the decision less imaginary.",
      },
      {
        type: "narration",
        text: "Ivy updates only the rows supported by the new information. She leaves genuine uncertainty labeled instead of filling it with hope or fear.",
      },
    ],
    concept: {
      title: "Decision-quality information is specific, relevant, and distinguishable from possibility",
      explanation:
        "Useful questions clarify amounts, timing, eligibility, frequency, expectations, conditions, and who controls a change. A possible bonus is different from a typical bonus; flexible scheduling is different from worker-controlled scheduling.",
    },
    tradeoff:
      "More information can reduce uncertainty, but no decision becomes perfectly certain. Waiting for every unknown to disappear may carry its own cost.",
    connection:
      "What vague phrase in an offer, contract, or opportunity would need a concrete example before you could evaluate it?",
    application: {
      prompt:
        "Turn one vague term into two specific questions: one about what happens and one about how often or under what conditions.",
      placeholder:
        "Vague term…\nWhat happens…?\nHow often / under what conditions…?",
    },
    check: {
      prompt: "Which answer most improves Ivy’s comparison?",
      options: [
        {
          label: "The schedule is flexible",
          feedback:
            "Flexible is still ambiguous: flexible for whom, how often, and with how much notice?",
        },
        {
          label:
            "Schedules are posted two weeks ahead and changed by the employer about twice a month",
          correct: true,
          feedback:
            "Exactly. The answer describes timing, control, and frequency.",
        },
        {
          label: "Employees usually make it work",
          feedback:
            "That statement does not describe the actual schedule or its consequences.",
        },
      ],
    },
    takeaway:
      "A specific question can turn a persuasive phrase into information you can actually use.",
  },
  {
    number: "8.4",
    title: "Naming a Price",
    focus: "Connecting a price to the exchange it covers",
    opening:
      "A neighborhood shop asks Eli to maintain its aging cooling system through the summer. His old instinct is to quote the smallest number that will avoid losing the work.",
    story: [
      {
        type: "narration",
        text: "Eli maps the likely exchange: routine inspections, travel, ordinary supplies, documentation, and a response window. Emergency repairs and major parts could expand the work far beyond the routine service.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "If I name one number before I name the scope, the customer and I may be pricing two different jobs.",
      },
      {
        type: "narration",
        text: "He names a price for the defined service and a separate rate for work outside it. He explains the experience behind the preventive checks and the result the shop is buying: earlier warning, documented maintenance, and fewer surprises—not a promise that nothing will ever fail.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "A price becomes clearer when both people can say what is included, what is not, and what would change it.",
      },
      {
        type: "narration",
        text: "The owner asks for a lower total. Eli does not treat the request as proof that his work lacks value. They reduce the response coverage and keep the core inspections.",
      },
    ],
    concept: {
      title: "A price names the terms of an exchange, not the worth of a person",
      explanation:
        "A work price may reflect scope, time, expertise, result, costs, risk, demand, timing, and alternatives. Naming the boundaries helps both parties understand what the number covers and what would require a new agreement.",
    },
    tradeoff:
      "A higher price may better cover costs and capacity while reducing the number of buyers willing or able to accept it. A lower price may increase access to the work while shrinking margin or requiring a smaller scope.",
    connection:
      "When you name or evaluate a price, which part of the exchange is easiest to leave unstated?",
    application: {
      prompt:
        "Write a one-sentence price statement for a real or imagined piece of work. Include the result or scope, one boundary, and one condition that could change the price.",
      placeholder:
        "The price covers… It does not include… It would change if…",
    },
    check: {
      prompt: "What makes Eli’s price more usable?",
      options: [
        {
          label: "He promises that the equipment will never fail",
          feedback:
            "That would promise a result he cannot fully control.",
        },
        {
          label:
            "He connects the number to a defined scope, boundaries, and conditions",
          correct: true,
          feedback:
            "Exactly. Both people can now evaluate the same exchange.",
        },
        {
          label: "He makes the number as low as possible",
          feedback:
            "A low number does not show whether the exchange covers its actual requirements.",
        },
      ],
    },
    takeaway:
      "Name the work before the number, so the price and the exchange describe the same thing.",
  },
  {
    number: "8.5",
    title: "When the Exchange No Longer Works",
    focus: "Recognizing a changed or unsustainable arrangement",
    opening:
      "Three weeks into the shop agreement, routine messages begin arriving late at night and each one is described as urgent.",
    story: [
      {
        type: "narration",
        text: "The inspections still fit the agreement. The new response expectations do not. Eli’s evenings become uncertain, and another customer’s scheduled work is interrupted twice.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "The customer is not wrong to need faster coverage. But that coverage is not the exchange we priced.",
      },
      {
        type: "narration",
        text: "He compares the current arrangement with the agreed scope. Then he names three possible structures: return to the original boundary, add emergency coverage at a different rate, or end the arrangement after the agreed notice.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "An exchange can stop working because the work changed, the cost changed, your capacity changed, or the terms were never shared clearly enough.",
      },
      {
        type: "narration",
        text: "The shop keeps the original service and finds separate emergency coverage. Eli does not get every piece of income available. He preserves the exchange he can reliably perform.",
      },
    ],
    concept: {
      title: "An exchange can be re-examined when its scope, cost, capacity, or conditions change",
      explanation:
        "Warning signs may include expanding duties, unpaid time, rising costs, unsafe conditions, unpredictable demands, repeated boundary changes, or compensation that no longer covers what is required. The possible responses depend on the agreement and situation.",
    },
    tradeoff:
      "Renegotiating, reducing, or leaving work can protect time, health, reliability, or other income, while also reducing immediate earnings or introducing uncertainty.",
    connection:
      "What evidence would tell you that an exchange has changed—not merely become temporarily inconvenient?",
    application: {
      prompt:
        "Describe one exchange using two lines: what was originally agreed and what is happening now. Name the material difference.",
      placeholder:
        "Originally…\nNow…\nThe material difference is…",
    },
    check: {
      prompt: "Why does Eli revisit the agreement?",
      options: [
        {
          label: "Because any difficult week means an exchange has failed",
          feedback:
            "Temporary difficulty alone does not establish that the underlying exchange changed.",
        },
        {
          label:
            "Because repeated emergency coverage expanded the time, control, and work required beyond the priced scope",
          correct: true,
          feedback:
            "Yes. He can point to a material change in the exchange.",
        },
        {
          label: "Because the customer’s needs do not matter",
          feedback:
            "The need is real; it simply requires a different arrangement.",
        },
      ],
    },
    takeaway:
      "When the requirements change, the exchange deserves another look—not a silent rewrite.",
  },
  {
    number: "8.6",
    title: "Income Changes and Recovery",
    focus: "Responding when an expected exchange changes",
    opening:
      "Before Ivy gives her answer, City delays the role’s start date by four weeks. The income she expected now arrives later.",
    story: [
      {
        type: "narration",
        text: "Ivy feels the delay before she can analyze it. Then she separates the event from the story forming around it: the start date changed; her capability did not disappear; the gap still has consequences.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "I cannot make the delayed paycheck arrive on the old date. I can identify what changes before then and what options are actually available.",
      },
      {
        type: "narration",
        text: "She maps the timing of current income, the first new paycheck, work costs that have not started yet, commitments due during the gap, and the information she still needs. Eli maps which project work is confirmed rather than treating possible calls as certain.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "Recovery begins with the changed fact, the timing, the immediate effect, and the resources or choices that remain. Shame supplies none of those.",
      },
      {
        type: "narration",
        text: "The map does not erase the interruption. It gives Ivy a sequence: clarify the revised date and first pay period, identify the gap, examine available supports and exchanges, and revise as facts change.",
      },
    ],
    concept: {
      title: "Income recovery is a response to changed amount, timing, or certainty",
      explanation:
        "A layoff, reduced hours, delayed start, lost customer, illness, seasonal drop, or other interruption can change income. A response map distinguishes confirmed facts, timing, immediate obligations, available resources, and uncertain possibilities.",
    },
    tradeoff:
      "A fast replacement may restore income sooner while carrying weaker terms or new costs. Waiting for a stronger exchange may preserve standards while extending the gap. The available range is not equal for everyone.",
    connection:
      "If expected income changed, which fact would you need first: the amount, the timing, the duration, or the conditions for it to resume?",
    application: {
      prompt:
        "Build a four-line response map for a real or imagined income change: changed fact, timing, immediate effect, and remaining options or resources.",
      placeholder:
        "Changed fact…\nTiming…\nImmediate effect…\nOptions or resources still available…",
    },
    check: {
      prompt: "What does Ivy’s recovery map accomplish?",
      options: [
        {
          label: "It guarantees that the lost timing will not matter",
          feedback:
            "The gap remains real and can still carry consequences.",
        },
        {
          label:
            "It separates confirmed changes and timing from uncertain possibilities so she can examine the next exchange",
          correct: true,
          feedback:
            "Exactly. The map restores visibility, not certainty.",
        },
        {
          label: "It proves she chose the wrong opportunity",
          feedback:
            "A changed start date is new information, not automatic proof about the entire choice.",
        },
      ],
    },
    takeaway:
      "An income change can alter the path without erasing the capacity, information, and choices that remain.",
  },
  {
    number: "8.7",
    title: "The Root Two Choice",
    focus: "Choosing with the whole exchange visible",
    opening:
      "The working district is quiet when Ivy and Eli return to the bench where they first argued that harder work should always earn more.",
    story: [
      {
        type: "narration",
        text: "Ivy’s final comparison still has no universal winner. Harbor provides more potential income. City provides the schedule, commute, benefits, and future movement that better support the choices she wants available now.",
      },
      {
        type: "dialogue",
        speaker: "Ivy",
        text: "I am choosing City. Not because it is the better offer for everyone. Because I can explain what it provides, what it requires, and why that exchange fits my priorities.",
      },
      {
        type: "narration",
        text: "She accepts the revised start date after mapping the gap. Eli accepts the defined summer maintenance scope and declines automatic emergency coverage. His mix of regular pay and project income remains less predictable, but its boundaries are clearer.",
      },
      {
        type: "dialogue",
        speaker: "Eli",
        text: "I used to think the price told me what the work—and the worker—was worth. Now I see a price as one part of a specific exchange.",
      },
      {
        type: "sage",
        speaker: "Sage",
        text: "The root is not the choice Ivy made or the price Eli named. It is their ability to see the exchange clearly enough to make, question, or change it.",
      },
      {
        type: "narration",
        text: "They leave with different income structures and different priorities. What they share is a rooted question: what am I exchanging, what does it actually provide, what does it require, and which choices does it leave available?",
      },
    ],
    concept: {
      title: "A sound earning decision connects value, income, usable pay, work costs, capacity, uncertainty, and choice",
      explanation:
        "No single number answers whether an exchange works. Root Two’s capability is the ability to trace the whole arrangement, distinguish facts from assumptions, recognize tradeoffs, and decide according to the learner’s own conditions and priorities.",
    },
    tradeoff:
      "Choosing one exchange closes or delays others. A rooted choice does not eliminate that cost; it makes the reason for accepting it visible and revisable.",
    connection:
      "What do you want an income exchange to make possible—not only on payday, but in the life around it?",
    application: {
      prompt:
        "Complete your Root Two statement in your own language: I am exchanging… It provides… It requires… It leaves these choices available…",
      placeholder:
        "I am exchanging…\nIt provides…\nIt requires…\nIt leaves these choices available…",
    },
    check: {
      prompt: "What is the Root Two capability?",
      options: [
        {
          label: "Always choose the opportunity with the highest annual pay",
          feedback:
            "Annual pay is important, but it cannot describe the entire exchange.",
        },
        {
          label:
            "Understand what you exchange for income, what it provides and requires, and whether it supports the choices you want available",
          correct: true,
          feedback:
            "Rooted. You can see the exchange without borrowing someone else’s priorities.",
        },
        {
          label: "Find an exchange with no uncertainty or tradeoffs",
          feedback:
            "Clarity helps you examine uncertainty and tradeoffs; it does not remove them.",
        },
      ],
    },
    takeaway:
      "I can understand what I am exchanging for income, what the income actually provides, what earning it requires, and whether the exchange supports the choices I want available.",
  },
];

export const rootTwoChapters = [
  {
    number: "01",
    title: "What Makes Work Valuable?",
    shortTitle: "Work & Value",
    theme: "What money responds to",
    arc:
      "Ivy and Eli enter the working district. Eli’s childhood belief—that harder work deserves more money—begins affecting how he prices and evaluates work.",
    closingCapability:
      "I can separate time, effort, expertise, demand, results, and human worth when I examine the value of work.",
    lessons: chapterOneLessons,
  },
  {
    number: "02",
    title: "How Work Becomes Income",
    shortTitle: "Income Arrangements",
    theme: "Different structures of exchange",
    arc:
      "Ivy and Eli encounter people earning money through hourly pay, salary, tips, commission, bonuses, projects, and contracts.",
    closingCapability:
      "I can compare what different earning arrangements pay for, require, and place at risk.",
    lessons: chapterTwoLessons,
  },
  {
    number: "03",
    title: "The Number on the Offer",
    shortTitle: "The Offer",
    theme: "From annual pay to usable pay",
    arc:
      "Ivy receives an employment offer and initially focuses on the largest number printed on the page.",
    closingCapability:
      "I can trace an offered salary through pay periods, deductions, and the amount that reaches the paycheck.",
    lessons: chapterThreeLessons,
  },
  {
    number: "04",
    title: "More Than the Paycheck",
    shortTitle: "Full Compensation",
    theme: "Benefits, time, and control",
    arc:
      "Ivy and Eli compare two opportunities with different wages, schedules, and benefits.",
    closingCapability:
      "I can compare the full compensation and working conditions of an opportunity, not only its wage.",
    lessons: chapterFourLessons,
  },
  {
    number: "05",
    title: "What It Costs to Earn",
    shortTitle: "Work Costs",
    theme: "The money and time behind income",
    arc:
      "A higher-paying opportunity begins costing Ivy more than she expected.",
    closingCapability:
      "I can identify the direct, hidden, and time costs required to earn income.",
    lessons: chapterFiveLessons,
  },
  {
    number: "06",
    title: "When Income Moves",
    shortTitle: "Changing Income",
    theme: "Variation, timing, and a baseline",
    arc:
      "Eli begins receiving income that changes from one period to another.",
    closingCapability:
      "I can plan around income that changes without pretending uncertain money is guaranteed.",
    lessons: chapterSixLessons,
  },
  {
    number: "07",
    title: "Growing Earning Capacity",
    shortTitle: "Earning Capacity",
    theme: "Skills, access, cost, and possibility",
    arc:
      "Ivy considers training that could expand her options—but requires money, time, and uncertainty now.",
    closingCapability:
      "I can examine the evidence, costs, barriers, uncertainty, and possible return of expanding my earning capacity.",
    lessons: chapterSevenLessons,
  },
  {
    number: "08",
    title: "Choosing What You Exchange",
    shortTitle: "The Exchange",
    theme: "Information, negotiation, and choice",
    arc:
      "Ivy and Eli use everything learned throughout Root Two to evaluate real opportunities.",
    closingCapability:
      "I can understand what I am exchanging for income, what the income actually provides, what earning it requires, and whether the exchange supports the choices I want available.",
    lessons: chapterEightLessons,
  },
];

const districtPlan = [
  { chapter: 0, start: 0, end: 5, key: 'work-value', title: 'Work & Value', theme: 'What money responds to' },
  { chapter: 1, start: 0, end: 3, key: 'income-structures', title: 'Income Structures', theme: 'How work becomes income' },
  { chapter: 1, start: 3, end: 6, key: 'variable-rewards', title: 'Variable Rewards', theme: 'Tips, commissions & contracts' },
  { chapter: 2, start: 0, end: 3, key: 'offer-district', title: 'The Offer District', theme: 'Reading the headline number' },
  { chapter: 2, start: 3, end: 7, key: 'paycheck-plaza', title: 'Paycheck Plaza', theme: 'From gross pay to usable pay' },
  { chapter: 3, start: 0, end: 7, key: 'compensation-civic', title: 'Compensation Civic', theme: 'Benefits, time & control' },
  { chapter: 4, start: 0, end: 7, key: 'work-costs', title: 'Work Costs', theme: 'The cost behind earning' },
  { chapter: 5, start: 0, end: 3, key: 'income-weather', title: 'Income Weather', theme: 'Variation and timing' },
  { chapter: 5, start: 3, end: 7, key: 'baseline-boulevard', title: 'Baseline Boulevard', theme: 'Planning with changing income' },
  { chapter: 6, start: 0, end: 4, key: 'capacity-campus', title: 'Capacity Campus', theme: 'Skills, credentials & cost' },
  { chapter: 6, start: 4, end: 8, key: 'access-avenue', title: 'Access Avenue', theme: 'Barriers, evidence & return' },
  { chapter: 7, start: 0, end: 7, key: 'exchange-square', title: 'Exchange Square', theme: 'Information, negotiation & choice' },
];

export const rootTwoDistricts = districtPlan.map((plan, districtIndex) => {
  const chapter = rootTwoChapters[plan.chapter];
  return {
    ...plan,
    number: String(districtIndex + 1).padStart(2, '0'),
    arc: chapter.arc,
    capability: chapter.closingCapability,
    lessons: chapter.lessons.slice(plan.start, plan.end).map((lesson, offset) => ({
      ...lesson,
      sourceChapterIndex: plan.chapter,
      sourceLessonIndex: plan.start + offset,
      progressKey: `${plan.chapter}-${plan.start + offset}`,
    })),
  };
});

export const rootTwoQuickPrompts = [
  { key: 'explain', label: 'Explain this simply' },
  { key: 'example', label: 'Give me another example' },
  { key: 'apply', label: 'Help me apply this' },
];
