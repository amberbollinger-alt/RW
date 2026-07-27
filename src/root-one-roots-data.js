export const ROOT_ONE_PROGRESS_KEY = 'rootwise_root_one_city_progress';
export const ROOT_ONE_LEGACY_PROGRESS_KEY = 'rootwise_root_one_city_progress_legacy';

export const rootOneIntroduction = {
  eyebrow: 'Before We Enter the City',
  title: 'Root One — The Story Beneath the Decision',
  question: 'When did money become real to you?',
  sage: [
    'Before we enter the city, I want to ask you a question:',
    'When did money become real to you?',
    'Not when you learned what a dollar was. Not when someone explained that things cost money.',
    'When did money begin to mean something?',
    'Those moments do more than teach us what money buys. They begin teaching us what money means.',
    'Most financial decisions look as though they begin with numbers. They rarely do.',
    'Before we examine where money goes, how credit works, how debt grows, how savings create options, or how wealth is built, we have to understand who is making the decision.',
    'That is where Root One begins.',
  ],
  method: [
    { title: 'Understand It', question: 'What is it?', body: 'Learn what is happening financially.' },
    { title: 'Recognize It', question: 'Where does this appear in real life?', body: 'See where it appears in your life.' },
    { title: 'Examine It', question: 'What is driving the decision?', body: 'Identify what is influencing the decision.' },
  ],
  principle: 'Knowledge becomes useful when you can recognize it inside your own life and use it while a decision is still being made.',
};

const lesson = ({ key, number, title, theme, promise, setting, sage, story, question, parallel, concepts, check, application, reflection, action, transition, connection }) => {
  const recognitionExamples = concepts.map((item) => item.recognize);
  const examinePrompts = reflection.prompts;

  return {
    key, number, title, shortTitle: title, theme, promise, districtNote: setting, sageOpening: sage,
    journey: { arrival: story[0]?.text || '', sageDialogue: [], event: story.at(-1)?.text || '', story, transition },
    question,
    rootRevealed: { title: parallel.title, intro: parallel.intro, storyLink: parallel.storyLink, body: parallel.body },
    concepts,
    adultLevels: [
      {
        number: '01',
        name: 'Understand',
        question: 'What is it?',
        title: parallel.title,
        body: [parallel.intro, parallel.body],
        details: concepts.map((item) => ({ title: item.title, body: item.body })),
      },
      {
        number: '02',
        name: 'Recognize',
        question: 'Where does this appear in real life?',
        title: `Where ${title.toLowerCase()} appears in adult financial life.`,
        body: [parallel.storyLink, 'The same idea can appear through different behaviors. The behavior is evidence to examine, not a complete explanation of the person.'],
        examples: recognitionExamples,
      },
      {
        number: '03',
        name: 'Examine',
        question: 'What is driving the decision?',
        title: question,
        body: ['Separate what is financially true now from what the situation represents, protects, or pressures you to do. Use the questions below to create awareness while a choice is still available.'],
        prompts: examinePrompts,
      },
    ],
    recognitionCheck: {
      prompt: check.prompt,
      options: check.options.map((option) => ({ ...option, feedback: option.feedback || check.explanation })),
    },
    scenario: application,
    applicationActivity: {
      title: title === 'Carrying the Roots Into the City' ? 'Build your Money Roots Map' : `Bring ${title.toLowerCase()} into one current decision`,
      intro: reflection.intro,
      prompts: reflection.prompts,
      action,
    },
    reflect: reflection.intro,
    reflectionPrompts: reflection.prompts,
    action,
    growth: connection.newGrowth,
    connection,
    rootCheckRecap: check.recap,
  };
};

const concept = (title, storyLink, body, recognize) => ({ title, storyLink, body, recognize });
const option = (id, label, consequence, sage, correction = 'Pause and examine what happened before deciding what the pattern means.') => ({ id, label, consequence, sage, correction });

export const rootOneRootsData = [
  lesson({
    key: 'money-real', number: '01', title: 'When Money Became Real', theme: 'Early experience and meaning',
    promise: 'You will separate an early money experience from the meaning you learned to attach to it.',
    setting: 'Root One begins outside the city at dawn. The streets are visible, but exposed roots beneath the path reveal that every present-day choice rests on older ground.',
    sage: 'Before we talk about what you do with money, we need to notice what money has come to mean to you.',
    story: [
      { type: 'narration', text: 'Sage stops Ivy and Eli before they enter the city. She does not ask what they earn or whether they are good with money. She asks when money first became real.' },
      { type: 'narration', text: 'Ivy remembers sitting in a dark room after the electricity was disconnected. Adults spoke quietly nearby. Money became real when its absence changed the physical world around her.' },
      { type: 'narration', text: 'Eli remembers a family dinner after a disappointing grade. No essential disappeared, but approval changed. Money and achievement were discussed as proof that he was becoming the person everyone expected.' },
      { type: 'sage', text: 'Money often becomes real when we first understand what it can give, remove, protect, prove, or threaten.' },
    ],
    question: 'When did money first feel real to you, and what meaning did that moment leave behind?',
    parallel: { title: 'The event and the meaning are different information', intro: 'A first money memory may involve absence, work, reward, conflict, access, or control.', storyLink: 'Ivy remembers physical instability. Eli remembers conditional approval.', body: 'The event matters, but the conclusion formed around it may travel much farther. RootWise examines both without assuming that either person is defined by the beginning.' },
    concepts: [
      concept('Experience is not interpretation', 'The lights went out; Ivy learned that ordinary stability could disappear.', 'An observable event and the belief formed around it are related but not identical. Separating them makes the inherited conclusion visible.', 'Notice when a present decision carries the emotional weight of an older event.'),
      concept('Money can represent more than purchasing power', 'For Eli, money became connected to proof, achievement, and approval.', 'Money may represent safety, status, independence, love, usefulness, or control. Those meanings can influence a choice before price enters the conversation.', 'Ask what the money seems to prove, protect, or threaten in the moment.'),
    ],
    check: { prompt: 'Two people remember very different first experiences with money. What should RootWise assume?', explanation: 'The experience and the meaning attached to it must be explored separately.', recap: 'You separated a money event from the meaning a person may have formed around it.', options: [
      { id: 'nothing', isCorrect: true, label: 'Nothing; explore the experience and its meaning separately' },
      { id: 'scarcity', label: 'The person with less money will always make worse choices' },
      { id: 'stable', label: 'A stable household prevents complicated money beliefs' },
    ] },
    application: { setup: 'A person remembers hearing adults argue whenever a bill arrived. As an adult, they avoid opening financial mail.', prompt: 'What would you examine first?', options: [
      option('sequence', 'The event, the meaning, and the present reaction', 'This makes the sequence visible without turning it into a character verdict.', 'What did the mail come to predict before it was ever opened?'),
      option('identity', 'Whether the person is simply irresponsible', 'A label hides the useful information inside the behavior.', 'Describe what happened before deciding who the person is.'),
      option('income', 'Their exact income today', 'Income may matter later, but it does not by itself explain why mail became a trigger.', 'A number cannot answer every question about meaning.'),
    ] },
    reflection: { intro: 'Your response is private and optional.', prompts: ['When did money first feel real?', 'What changed in that moment?', 'What did you believe money could give, remove, protect, prove, or threaten?'] },
    action: 'Write the memory in one sentence, then write the meaning you attached to it in a second sentence.',
    transition: 'As the path descends, old signs appear among new growth. Sage asks Ivy and Eli to listen for messages they did not choose.',
    connection: { lookBack: 'You began with experience before strategy.', newGrowth: 'The meaning attached to an event is now visible.', wholeTreeScenario: 'Separate what happened from what you concluded.', carryForward: 'Next, examine the messages repeated around money.' },
  }),
  lesson({
    key: 'inherited-messages', number: '02', title: 'The Messages We Inherit', theme: 'Family scripts and repeated examples',
    promise: 'You will recognize money messages learned through words, behavior, emotion, and repetition.',
    setting: 'A district of old signs sits between the hill and the city. Some messages are written plainly; others appear only in the paths people repeatedly take.',
    sage: 'Families teach money through what they say and through what they repeatedly demonstrate. When those conflict, behavior often speaks louder.',
    story: [
      { type: 'narration', text: 'Signs line the path: Work hard and you will be fine. Never depend on anyone. Spend it while you have it. Debt is normal. Debt is failure.' },
      { type: 'narration', text: 'Ivy remembers adults saying money did not matter while every household decision revolved around it.' },
      { type: 'narration', text: 'Eli remembers hearing that happiness mattered most while achievement was measured through status, education, and earning potential.' },
      { type: 'sage', text: 'A money script is a starting assumption, not a final truth. First notice it. Then decide whether it still fits.' },
    ],
    question: 'Which money message did you hear, and what did it mean in the environment where you heard it?',
    parallel: { title: 'Inherited rules can quietly make present decisions', intro: 'Money scripts are absorbed through language and repeated experience.', storyLink: 'Ivy and Eli both received conflicting spoken and demonstrated messages.', body: 'A script may sound like money never stays, asking for help is weakness, or expensive means better. Its influence becomes easier to examine once it is named.' },
    concepts: [
      concept('Words teach rules', 'The district signs turn familiar phrases into visible instructions.', 'Repeated phrases can become default explanations for what responsible, successful, safe, or generous people do.', 'Listen for absolute words such as always, never, people like us, or responsible people.'),
      concept('Behavior teaches expectations', 'Ivy and Eli trusted repeated conduct when it contradicted stated values.', 'Adults often carry forward what they repeatedly observed around secrecy, conflict, giving, saving, working, borrowing, and status. Those patterns can carry more force than advice.', 'Compare what was said with what happened repeatedly.'),
    ],
    check: { prompt: 'What most strongly shapes the money beliefs an adult may carry forward?', explanation: 'Beliefs are shaped through the combination of words, behavior, emotion, silence, and repeated experience.', recap: 'You identified inherited money messages without treating them as permanent instructions.', options: [
      { id: 'combination', isCorrect: true, label: 'Words, behavior, emotion, and repeated experience together' },
      { id: 'words', label: 'Only the words that were spoken' }, { id: 'salary', label: 'Only the income the person earns later' },
    ] },
    application: { setup: 'You recognize the phrase “Money does not grow on trees.”', prompt: 'What is the most useful next question?', options: [
      option('meaning', 'What did that phrase mean where I heard it?', 'The same phrase can teach limits, fear, shame, planning, or something else depending on context.', 'The phrase is an echo. The environment gives it meaning.'),
      option('true', 'Is the phrase universally true or false?', 'A verdict skips the context that made the message influential.', 'Start with how it functioned before testing whether it still fits.'),
      option('reject', 'How do I eliminate this belief immediately?', 'Awareness comes before changing or keeping a message.', 'You do not need to fight an echo to hear it clearly.'),
    ] },
    reflection: { intro: 'Complete any statements that feel useful. Skipping is allowed.', prompts: ['In my family, money was…', 'Spending meant… Saving meant…', 'Asking for financial help meant…', 'Success looked like…'] },
    action: 'Choose one inherited phrase and write what it appeared to protect or encourage in its original environment.',
    transition: 'At the end of the sign district, Ivy calls herself bad with money. Sage stops walking.',
    connection: { lookBack: 'Early experiences created meanings.', newGrowth: 'Repeated messages added rules and expectations.', wholeTreeScenario: 'Name a phrase, its context, and the behavior it encouraged.', carryForward: 'Next, separate repeated behavior from identity.' },
  }),
  lesson({
    key: 'behavior-not-identity', number: '03', title: 'Behavior Is Not Identity', theme: 'Observation without shame',
    promise: 'You will replace a fixed money label with specific, observable information.',
    setting: 'The path reaches an old mirror wall. Labels appear broad and permanent, while the reflections reveal smaller actions and moments underneath.',
    sage: 'A behavior tells us what happened. An identity tells us who someone is. Those are not the same statement.',
    story: [
      { type: 'dialogue', speaker: 'Ivy', text: 'I am bad with money.' },
      { type: 'narration', text: 'Sage asks Ivy to describe “bad.” Ivy names avoiding balances, delaying bills, and spending quickly after payday. Sage writes down only the observable actions.' },
      { type: 'dialogue', speaker: 'Eli', text: 'I am responsible with money.' },
      { type: 'narration', text: 'Eli tracks everything, rarely buys anything unnecessary, and becomes anxious when plans change. Sage asks whether control and responsibility are always the same thing.' },
      { type: 'sage', text: 'Patterns can be examined. A verdict only tells us to feel ashamed or certain.' },
    ],
    question: 'What becomes visible when you replace “I am” with “I sometimes do”?',
    parallel: { title: 'Specific behavior creates usable information', intro: 'Identity labels compress many situations into one verdict.', storyLink: 'Ivy and Eli each used a flattering or condemning label that hid the cause of their actions.', body: '“I ignored two notices because I feared what I might find” contains timing, behavior, and context. “I am irresponsible” contains none of those details.' },
    concepts: [
      concept('Describe before interpreting', 'Sage writes actions instead of character traits.', 'Observable language identifies what happened, when, and under what conditions.', 'Replace always, never, good, bad, disciplined, or careless with a specific action.'),
      concept('A useful result can still have a complicated driver', 'Eli’s control produces order and anxiety.', 'A behavior is not automatically healthy because the outcome looks organized, or harmful because it looks disorganized.', 'Ask what happened before the behavior and what it cost afterward.'),
    ],
    check: { prompt: 'Which statement gives the learner more useful information?', explanation: 'The specific behavior reveals what can be examined without defining the person.', recap: 'You converted identity labels into observable patterns.', options: [
      { id: 'specific', isCorrect: true, label: 'I missed two payment dates because I avoided opening the notices' },
      { id: 'label', label: 'I am irresponsible' },
    ] },
    application: { setup: 'A learner says, “I have no self-control.”', prompt: 'Which rewrite reveals more?', options: [
      option('observable', 'I make faster purchases when I feel restricted or overwhelmed', 'The rewrite identifies conditions and behavior without excusing or condemning it.', 'Specific language gives us somewhere useful to look.'),
      option('stronger', 'I am extremely careless with money', 'A stronger label still hides the sequence.', 'Intensity is not the same as information.'),
      option('opposite', 'I am becoming perfectly disciplined', 'Replacing one identity verdict with another does not reveal the pattern.', 'Describe, do not brand.'),
    ] },
    reflection: { intro: 'Rewrite one label without forcing a positive interpretation.', prompts: ['What do you call yourself around money?', 'What observable actions does that label hide?', 'When are those actions more likely?'] },
    action: 'Rewrite one “I am” money statement as “I sometimes do ___ when ___.”',
    transition: 'Once the labels loosen, Sage asks a different question: not “What is wrong?” but “What is the pattern protecting?”',
    connection: { lookBack: 'Messages can become identity claims.', newGrowth: 'You returned those claims to observable behavior.', wholeTreeScenario: 'Name the action, timing, and context.', carryForward: 'Next, examine the immediate protection a pattern may provide.' },
  }),
  lesson({
    key: 'protective-patterns', number: '04', title: 'What the Pattern Is Protecting', theme: 'Relief, control, belonging, and safety',
    promise: 'You will identify the immediate protective function a repeated financial behavior may serve.',
    setting: 'Two paths circle the same exposed roots. One moves quickly toward relief; the other climbs toward certainty. Neither path tells the whole story alone.',
    sage: 'Understanding what a behavior protects does not automatically make it helpful. It explains why the behavior may be difficult to change.',
    story: [
      { type: 'narration', text: 'Ivy receives money and thinks about shoes, groceries, a repair, and one small thing that would make the week easier. Eli wants to leave the money untouched until every future possibility is considered.' },
      { type: 'narration', text: 'Ivy believes Eli does not understand going without. Eli believes urgency is controlling the decision.' },
      { type: 'sage', text: 'What are you protecting?' },
      { type: 'narration', text: 'Ivy is protecting relief from endless postponement. Eli is protecting certainty against being unprepared or appearing unsuccessful. The argument is between two forms of safety.' },
    ],
    question: 'What feeling, relationship, or possibility might the behavior be protecting?',
    parallel: { title: 'Repeated financial behavior often has an immediate reward', intro: 'Protection may look like relief, control, pride, belonging, status, or distance from fear.', storyLink: 'Ivy spends toward relief. Eli holds toward certainty.', body: 'The immediate reward can make a behavior repeat even when the later consequence creates new pressure. Naming the function makes the tradeoff visible.' },
    concepts: [
      concept('Immediate protection can outweigh later cost', 'Both Ivy and Eli feel safer in the short term through opposite actions.', 'The nervous system often values relief now more strongly than a consequence that remains distant.', 'Ask what becomes easier in the first five minutes after the behavior.'),
      concept('Explanation is not permission or blame', 'Sage understands both patterns without choosing a side.', 'Explaining the function creates information. The learner still decides whether the behavior fits their present values and circumstances.', 'Hold compassion and consequence in the same view.'),
    ],
    check: { prompt: 'Why might a person repeat a financial behavior even when it creates problems later?', explanation: 'The behavior may provide immediate safety, relief, control, belonging, or emotional protection.', recap: 'You identified the protective function without treating it as identity or destiny.', options: [
      { id: 'protection', isCorrect: true, label: 'It provides immediate relief, control, belonging, or protection' },
      { id: 'character', label: 'It proves a permanent character flaw' },
      { id: 'knowledge', label: 'It always means the person lacks financial knowledge' },
    ] },
    application: { setup: 'Someone agrees to an expense they cannot comfortably absorb because saying no may disappoint family.', prompt: 'What might the behavior protect?', options: [
      option('belonging', 'Belonging and connection', 'The immediate social protection may be real even when the financial consequence is difficult.', 'What would saying no seem to threaten?'),
      option('math', 'Only arithmetic ability', 'The person may understand the cost and still feel a stronger relational pressure.', 'Knowing the number does not remove every competing need.'),
      option('careless', 'A careless identity', 'A label erases the social context and immediate reward.', 'Look for what the yes preserves before judging it.'),
    ] },
    reflection: { intro: 'Choose one pattern only if it feels safe and useful to examine.', prompts: ['What feeling appears before it?', 'What does it give you immediately?', 'What discomfort does it postpone?', 'What might it protect?'] },
    action: 'Complete: “This pattern may be trying to protect ___, even though the later cost can be ___.”',
    transition: 'The city grows louder ahead. Sage asks Ivy and Eli to notice what happens inside them before they discuss price.',
    connection: { lookBack: 'Behavior is not identity.', newGrowth: 'The behavior now has an immediate function and a later consequence.', wholeTreeScenario: 'Name what the pattern gives now and asks later.', carryForward: 'Next, map the trigger-to-consequence sequence.' },
  }),
  lesson({
    key: 'triggers', number: '05', title: 'Triggers, Pressure, and Automatic Reactions', theme: 'The pattern sequence',
    promise: 'You will map one decision from situation through consequence before evaluating it.',
    setting: 'A crowded market district uses countdowns, comparison, music, and urgency. The pressure begins before any purchase is made.',
    sage: 'A trigger does not remove responsibility. It reveals the conditions under which deliberate thinking becomes harder.',
    story: [
      { type: 'narration', text: 'Advertisements promise limited-time offers. A countdown flashes. One sign says only three remain.' },
      { type: 'narration', text: 'Ivy notices urgency and fears missing an opportunity. Eli notices status and imagines how others may judge his choice.' },
      { type: 'sage', text: 'Stop before the price. What is happening around you, and what is happening inside you?' },
      { type: 'narration', text: 'Neither reaction began with the object. The environment created pressure before either person consciously made a decision.' },
    ],
    question: 'What happened immediately before the impulse appeared?',
    parallel: { title: 'Automatic decisions have a sequence', intro: 'Stress, payday, conflict, celebration, scarcity language, comparison, and exhaustion can increase automatic responding.', storyLink: 'The market produces urgency for Ivy and status pressure for Eli.', body: 'Map the sequence: situation, feeling, story, impulse, behavior, consequence. The purpose is not to assign a personality type; it is to reveal where awareness can enter.' },
    concepts: [
      concept('Triggers change decision conditions', 'The environment applied scarcity and comparison before the price mattered.', 'A trigger can narrow attention, increase urgency, or activate an older belief.', 'Notice location, timing, people, physical state, and emotional state.'),
      concept('The internal story links feeling to action', 'Ivy tells herself the opportunity will disappear; Eli imagines social judgment.', 'An impulse often becomes more compelling through a fast explanation about what the moment means.', 'Write the exact sentence your mind offered before the action.'),
    ],
    check: { prompt: 'Which often occurs first in an automatic financial decision?', explanation: 'A trigger or internal reaction often appears before the final behavior and consequence.', recap: 'You mapped a reaction as a sequence rather than a personality.', options: [
      { id: 'trigger', isCorrect: true, label: 'A trigger or internal reaction' },
      { id: 'consequence', label: 'The final financial consequence' },
      { id: 'calculation', label: 'A long-term savings calculation' },
    ] },
    application: { setup: 'After a stressful day, a limited-time message appears for something you have considered buying.', prompt: 'Which sequence gives the clearest information?', options: [
      option('map', 'Stress → urgency → “this may disappear” → buy now → later tradeoff', 'The sequence preserves both context and consequence.', 'What changed at each step?'),
      option('label', 'See offer → prove I am impulsive', 'The label skips the internal process.', 'A verdict cannot show where the pattern changed direction.'),
      option('price', 'Compare the price and ignore the emotional context', 'Price matters, but it does not explain why the decision suddenly felt urgent.', 'Financial information and internal information can both matter.'),
    ] },
    reflection: { intro: 'Map one recent decision without correcting it.', prompts: ['Situation', 'Feeling', 'Story or assumption', 'Impulse', 'Behavior', 'Consequence'] },
    action: 'Write your sequence using six arrows. Leave any unknown step blank instead of guessing.',
    transition: 'Beyond the market, two neighborhoods show how the same decision can carry very different consequences.',
    connection: { lookBack: 'Protective patterns have immediate rewards.', newGrowth: 'You can now see the sequence that activates them.', wholeTreeScenario: 'Map situation through consequence.', carryForward: 'Next, place personal choice inside real conditions and access.' },
  }),
  lesson({
    key: 'conditions', number: '06', title: 'Scarcity, Stability, and Privilege', theme: 'Choice within conditions',
    promise: 'You will examine personal agency and surrounding conditions without reducing outcomes to either one.',
    setting: 'Two neighborhoods share the same city but not the same margin for error. One is organized around uncertainty; the other can absorb mistakes more easily.',
    sage: 'Choices matter. Conditions matter. Access, time, support, information, luck, and history matter. None should erase the others.',
    story: [
      { type: 'narration', text: 'In one neighborhood, transportation is unreliable, prices are higher for people with fewer options, and one missed workday can disrupt a month.' },
      { type: 'narration', text: 'In another, families have time, information, transportation, relationships, and cushions. A poor decision matters, but it may not threaten immediate stability.' },
      { type: 'dialogue', speaker: 'Eli', text: 'Discipline is the main difference.' },
      { type: 'dialogue', speaker: 'Ivy', text: 'Opportunity is the main difference.' },
      { type: 'sage', text: 'Both views are incomplete when they stand alone.' },
    ],
    question: 'Which parts of this outcome came from choice, and which came from the conditions surrounding it?',
    parallel: { title: 'The same mistake can have unequal consequences', intro: 'Scarcity can narrow attention toward the immediate problem; stability can create space for long-term planning.', storyLink: 'The neighborhoods offer different access, time, support, and ability to recover.', body: 'Privilege can include more than income: reliable adults, housing, healthcare, technology, networks, transportation, and mistakes that remain survivable.' },
    concepts: [
      concept('Scarcity changes attention', 'Immediate disruptions consume time and decision capacity in the first neighborhood.', 'When several urgent needs compete, attention often narrows toward the closest pressure.', 'Ask what urgent problem is consuming the space needed for planning.'),
      concept('Access changes available choices', 'The second neighborhood has information, relationships, and room to recover.', 'Agency operates inside the options a person can realistically reach, afford, understand, or safely refuse.', 'Look beyond income to time, transportation, support, and institutional familiarity.'),
    ],
    check: { prompt: 'Which statement best reflects RootWise?', explanation: 'Choices and circumstances interact, and both should be examined.', recap: 'You examined agency and conditions together without using either to erase the other.', options: [
      { id: 'both', isCorrect: true, label: 'Choices and circumstances interact, and both should be examined' },
      { id: 'discipline', label: 'Outcomes are entirely determined by discipline' },
      { id: 'circumstance', label: 'Outcomes are entirely determined by circumstances' },
    ] },
    application: { setup: 'Two people make the same late payment. One pays a fee; the other also loses transportation needed for work.', prompt: 'What changed?', options: [
      option('exposure', 'Their exposure and ability to absorb the mistake', 'The same action can create different chains of consequence.', 'Compare the decision and the surrounding margin separately.'),
      option('morality', 'One person is less responsible', 'Different consequences do not prove different character.', 'Outcome severity is not a moral score.'),
      option('nothing', 'Nothing; the action was identical', 'The first action matched, but access and consequences did not.', 'Follow the full chain, not only the first step.'),
    ] },
    reflection: { intro: 'Use broad descriptions; exact financial details are not required.', prompts: ['Which resources were available growing up?', 'Which were missing?', 'Which mistakes were survivable?', 'What access influenced your choices?'] },
    action: 'Choose one outcome and list one personal choice and one surrounding condition that influenced it.',
    transition: 'Back at the city gate, Sage shows Ivy and Eli the small space where awareness can become choice.',
    connection: { lookBack: 'Triggers and patterns influence behavior.', newGrowth: 'Conditions now explain why the same behavior may carry unequal pressure.', wholeTreeScenario: 'Examine choice, access, and consequence separately.', carryForward: 'Next, practice the pause between reaction and choice.' },
  }),
  lesson({
    key: 'the-pause', number: '07', title: 'The Pause Between Reaction and Choice', theme: 'Awareness before action',
    promise: 'You will create one personal question that makes the influence on a decision visible.',
    setting: 'At the city gate, the ground is clearer than it was at dawn. The roots remain, but the learner can now see where they cross the path.',
    sage: 'Choice does not begin when you always make the perfect decision. Choice begins when you can see that a decision is being made.',
    story: [
      { type: 'narration', text: 'Ivy notices that urgency does not always require immediate action. Eli notices that control does not always mean a decision is thoughtful.' },
      { type: 'narration', text: 'They have not built a budget, calculated a savings goal, or chosen a financial product. Something has still changed.' },
      { type: 'sage', text: 'Pause long enough to identify what entered the room: fear, pride, relief, belonging, habit, pressure, a real need, or a deliberate value.' },
      { type: 'narration', text: 'The pause does not suppress emotion, shame an impulse, or force the opposite behavior. It makes the reasoning visible.' },
    ],
    question: 'What is influencing this decision right now?',
    parallel: { title: 'A pause creates room for deliberate choice', intro: 'The purpose is not delay for its own sake or a guarantee of perfection.', storyLink: 'Ivy can question urgency; Eli can question control.', body: 'A useful pause asks what is happening, what is assumed, what is missing, what is being protected, and what would change with time. The learner still chooses.' },
    concepts: [
      concept('Name the influence', 'Sage invites fear, pride, relief, belonging, need, and value into view.', 'Naming an influence reduces the chance that it will operate as invisible fact.', 'Ask “What is making this feel necessary right now?”'),
      concept('A pause is not a command to say no', 'Neither Ivy nor Eli is instructed to choose the opposite action.', 'The purpose is informed agency. After pausing, the learner may still make the original choice for clearer reasons.', 'Notice whether pausing changes the choice or only the understanding.'),
    ],
    check: { prompt: 'What is the purpose of the pause?', explanation: 'The pause creates enough space to notice what is influencing the decision.', recap: 'You used awareness to create space without demanding a perfect or predetermined choice.', options: [
      { id: 'notice', isCorrect: true, label: 'Create enough space to notice what is influencing the decision' },
      { id: 'prevent', label: 'Prevent all spending' },
      { id: 'perfect', label: 'Guarantee a perfect choice' },
    ] },
    application: { setup: 'A decision feels urgent, but the exact deadline and consequence are unclear.', prompt: 'Which pause question is most useful?', options: [
      option('urgent', 'Is this urgent, or does it feel urgent—and what information is missing?', 'The question respects the feeling while checking the facts.', 'A pause can hold emotion and evidence together.'),
      option('deny', 'How do I force myself to say no?', 'The pause is not designed to produce one predetermined answer.', 'Choice requires room for more than one conclusion.'),
      option('judge', 'Why am I like this?', 'A broad identity question hides the immediate influence.', 'Return to what is happening now.'),
    ] },
    reflection: { intro: 'Create a pause question that sounds natural in your own voice.', prompts: ['What am I trying to feel or protect?', 'Is this solving the problem I actually have?', 'Am I responding to now or to an older experience?', 'What would I notice if I waited ten minutes?'] },
    action: 'Choose one pause question and save it in words you would actually use.',
    transition: 'The city gate opens. Sage reminds Ivy and Eli that the roots will travel with them into every later financial lesson.',
    connection: { lookBack: 'You traced experience, messages, behavior, protection, triggers, and conditions.', newGrowth: 'The pause creates a place for awareness inside the sequence.', wholeTreeScenario: 'Name the influence before choosing.', carryForward: 'Next, assemble the Money Roots Map and carry it into Root Two.' },
  }),
  lesson({
    key: 'carry-roots', number: '08', title: 'Carrying the Roots Into the City', theme: 'The Money Roots Map',
    promise: 'You will assemble a private map of the influences you want to recognize in later Roots.',
    setting: 'The city gate opens toward work, income, banks, stores, homes, debt, saving, risk, family, and business. The roots remain visible beneath every road.',
    sage: 'Awareness does not erase the roots. It lets you recognize when they are influencing the direction of growth.',
    story: [
      { type: 'narration', text: 'Roads lead toward earning, spending, saving, debt, investing, family, and business. Ivy and Eli understand that their money stories will travel with them.' },
      { type: 'narration', text: 'Ivy will interpret value and security through histories of absence. Eli will interpret achievement and control through histories of expectation.' },
      { type: 'sage', text: 'Strategy without self-awareness can reproduce the same pattern in a new form.' },
      { type: 'sage', text: 'You have started to understand what money has meant to you. Now we will examine where money comes from, what people exchange for it, and why contribution is valued differently.' },
    ],
    question: 'Which influence do you most want to recognize when it appears in a future financial decision?',
    parallel: { title: 'Root One is the foundation beneath later strategy', intro: 'Money decisions are not made in isolation.', storyLink: 'Ivy and Eli will carry different histories into the same future lessons.', body: 'Past experience can influence present reactions; behavior is not identity; protective patterns and circumstances matter; awareness creates room for deliberate choice.' },
    concepts: [
      concept('Awareness travels forward', 'The roots remain beneath every road into the city.', 'Earning, spending, saving, debt, and investing will each activate meanings formed earlier.', 'Notice when a technical lesson also activates fear, proof, belonging, or control.'),
      concept('The map belongs to the learner', 'Sage guides but does not label Ivy, Eli, or you.', 'The Money Roots Map is private, revisable, unscored, and incomplete by design.', 'Return later when new observations change an earlier answer.'),
    ],
    check: { prompt: 'What should Root One leave the learner with?', explanation: 'Root One builds clearer self-understanding before introducing management strategies.', recap: 'You completed Root One with a private map, not a personality label or prescribed plan.', options: [
      { id: 'awareness', isCorrect: true, label: 'Clearer awareness of the influences beneath financial choices' },
      { id: 'budget', label: 'A strict budget and savings target' },
      { id: 'type', label: 'A permanent money personality type' },
    ] },
    application: { setup: 'A learner finishes Root One and wants to “fix everything” immediately.', prompt: 'What is the strongest next step within this Root?', options: [
      option('map', 'Carry one visible pattern and one pause question forward', 'This protects the purpose of Root One: awareness before strategy.', 'The map is a beginning, not a diagnosis or complete plan.'),
      option('system', 'Build a detailed saving and debt system now', 'Those mechanics belong in later Roots where they can be taught fully.', 'Do not make Root One carry lessons reserved for the city ahead.'),
      option('label', 'Choose a money personality label', 'A type would turn patterns back into identity.', 'The learner remains more complex than a category.'),
    ] },
    reflection: { intro: 'Build your private Money Roots Map. Exact financial amounts and trauma disclosure are not required.', prompts: ['My earliest money memory', 'Messages I heard and behaviors I observed', 'Beliefs I may have inherited', 'Situations that trigger me', 'Patterns I repeat and what they may protect', 'Values I want future choices to reflect', 'One question to carry into Root Two'] },
    action: 'Save one sentence you want to carry forward: “When ___ appears, I want to ask ___.”',
    transition: 'Ivy, Eli, and Sage pass through the gate toward the working district. Root Two begins with the question: What creates value, and how does that value become income?',
    connection: { lookBack: 'You made the person behind the financial choices visible.', newGrowth: 'Your Money Roots Map gathers the full Root without scoring or labeling it.', wholeTreeScenario: 'Carry one pattern, one value, and one pause question forward.', carryForward: 'Root Two examines value, contribution, exchange, and income.' },
  }),
];

export const rootOneRootsQuickPrompts = [
  { key: 'deep-dive', label: 'Examine the pattern' },
];
