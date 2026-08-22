export const KINDERGARTEN_PROGRESS_KEY = 'rootwise_kids_kindergarten_progress_v1';
export const KIDS_GRADE_KEY = 'rootwise_kids_selected_grade_v1';

export const phaseLabels = {
  story: 'Story Spark',
  play: 'Play Lab',
  challenge: 'Choice Challenge',
};

const mission = (id, title, story, instruction, choices, feedback, reflection = []) => ({
  id, title, story, instruction, choices, feedback, reflection,
  accessibilityLabel: `${title}. ${instruction}`,
});

export const kindergartenRoots = [
  {
    id: 1,
    slug: 'me-and-choices',
    title: 'Me, My Choices & My Money Story',
    shortTitle: 'Me & My Choices',
    setting: 'Mirror Meadow',
    zone: 'mirror',
    icon: '🪞',
    capacity: 'Notice personal preferences and feelings without calling them right, wrong, good, or bad.',
    color: '#ff6f73',
    phases: {
      story: mission('1.1', 'Penny Picks Purple', ['Penny likes the purple cup. Bea likes the yellow cup.', 'Did one of them choose the wrong color?'], 'Tap what you notice.', [
        { id: 'penny', label: 'Penny is right', icon: '🟣', effect: 'Penny uses purple. Bea smiles with yellow.' },
        { id: 'bea', label: 'Bea is right', icon: '🟡', effect: 'Bea uses yellow. Penny smiles with purple.' },
        { id: 'different', label: 'They like different things', icon: '🟣🟡', effect: 'Two different cups fit two different people.' },
      ], 'My choice worked for me. Bea’s choice worked for Bea. Different does not always mean somebody is wrong.'),
      play: mission('1.2', 'The Feelings Basket', ['Feelings can visit when we choose.', 'A feeling tells us something. It does not make the choice for us.'], 'Match the face to the moment.', [
        { id: 'happy', label: 'Happy', icon: '😊', effect: 'This face can visit when we get what we hoped for.' },
        { id: 'disappointed', label: 'Disappointed', icon: '😞', effect: 'This face can visit when a first choice is not there.' },
        { id: 'unsure', label: 'Unsure', icon: '🤔', effect: 'This face can visit while we are still deciding.' },
      ], 'Feelings give us clues. We can notice them and still choose.'),
      challenge: mission('1.3', 'Two Good Picnics', ['One friend likes crunchy food and shade.', 'One friend likes soft food and sunshine.'], 'Build a picnic that fits each friend.', [
        { id: 'same', label: 'Make both the same', icon: '🥪🥪', effect: 'The picnics match, but one friend is still looking for shade.' },
        { id: 'different', label: 'Make each one different', icon: '🥕🍌', effect: 'Each picnic fits what that friend enjoys.' },
        { id: 'switch', label: 'Try, then switch one', icon: '🔄', effect: 'You noticed and changed one picnic.' },
      ], 'Same picnic or different picnic? Let’s build one that fits each person.', ['I picked what I liked.', 'We liked different things.', 'Both choices worked.', 'I changed one picnic after I noticed.']),
    },
    completion: 'Your first Root grew because you noticed the person making the choice.',
  },
  {
    id: 2, slug: 'value-and-helping', title: 'Value, Effort & Earning', shortTitle: 'Value & Helping', setting: 'Helping Hollow', zone: 'helping', icon: '🛠️', color: '#ffc43d',
    capacity: 'Notice how effort, skill, reliability, creativity, and contribution can create value.',
    phases: {
      story: mission('2.1', 'Who Helped the Fair?', ['The fair is almost ready. A sign is crooked, a table is empty, and paper is on the path.', 'Three helpers each change something.'], 'Choose a helper and see what changes.', [
        { id: 'sign', label: 'Straighten the sign', icon: '🪧', effect: 'Now visitors can see where to go.' },
        { id: 'table', label: 'Ready the table', icon: '🧺', effect: 'Now the booth has what people need.' },
        { id: 'path', label: 'Clear the path', icon: '🧹', effect: 'Now the path is safer and easier to use.' },
      ], 'Money is not the only way people create value. Helping can make something safer, clearer, cleaner, or ready.'),
      play: mission('2.2', 'Fix-It Team', ['The fair needs a banner, water, and game pieces.', 'We can do two jobs first. One job will wait.'], 'Pick a job to do first.', [
        { id: 'banner', label: 'Hang the banner', icon: '🎏', effect: 'The entrance becomes bright and easy to find.' },
        { id: 'water', label: 'Fill the water station', icon: '💧', effect: 'The water station is ready for everyone.' },
        { id: 'games', label: 'Set out game pieces', icon: '🎲', effect: 'The game booth is ready to play.' },
      ], 'Your time and effort changed what everyone could use.'),
      challenge: mission('2.3', 'Ready Together', ['A booth opens in three steps: supplies, setup, then welcome.', 'Each job helps the next job become possible.'], 'Choose what must happen first.', [
        { id: 'box', label: 'Open the supply box', icon: '📦', effect: 'The supplies are ready for setup.' },
        { id: 'booth', label: 'Set up the booth', icon: '⛺', effect: 'The booth needs its supplies first. You can try again.' },
        { id: 'welcome', label: 'Welcome visitors', icon: '👋', effect: 'The visitors need an open booth. You can try again.' },
      ], 'One person did not do everything. Each job helped the next job become possible.', ['I noticed who helped.', 'I tried a job.', 'Everyone helped in a different way.', 'The order mattered.']),
    }, completion: 'This Root grew because you noticed how effort and contribution create value.',
  },
  {
    id: 3, slug: 'choice-and-tradeoffs', title: 'Choice, Spending & Tradeoffs', shortTitle: 'Choice & Tradeoffs', setting: 'Choice Carnival', zone: 'choice', icon: '🎟️', color: '#ff4f9a',
    capacity: 'Make a choice within a visible limit and notice what the choice changes.',
    phases: {
      story: mission('3.1', 'More, Less or Enough?', ['Two tokens can meet a two-token choice.', 'Sometimes we have less than we need. Sometimes we have more.'], 'Look at the tokens and choose what you notice.', [
        { id: 'enough', label: 'Enough', icon: '🟡🟡', effect: 'Two tokens are enough for a two-token choice.' },
        { id: 'less', label: 'Not enough yet', icon: '🟡', effect: 'One token cannot reach a three-token choice yet.' },
        { id: 'more', label: 'More than needed', icon: '🟡🟡🟡🟡', effect: 'Four tokens leave one after a three-token choice.' },
      ], 'Before we choose, we can notice what we have and what something uses.'),
      play: mission('3.2', 'The Five-Token Snack Cart', ['You have five tokens.', 'You may choose something, more than one thing, or nothing yet.'], 'Pick a snack and watch the tokens.', [
        { id: 'fruit', label: 'Fruit Cup · 2', icon: '🍓', cost: 2, effect: 'Two tokens move to the cart. Three stay with you.' },
        { id: 'sandwich', label: 'Sandwich · 3', icon: '🥪', cost: 3, effect: 'Three tokens move to the cart. Two stay with you.' },
        { id: 'cookie', label: 'Cookie · 1', icon: '🍪', cost: 1, effect: 'One token moves to the cart. Four stay with you.' },
      ], 'Watch what happens to your tokens when you choose.'),
      challenge: mission('3.3', 'The Full Backpack', ['The backpack has three spaces.', 'Some things use more space than others.'], 'Choose what goes in the backpack.', [
        { id: 'bottle-book', label: 'Water and book', icon: '🧴📘', effect: 'Two spaces are used. One stays open.' },
        { id: 'sweater', label: 'Sweater and toy', icon: '🧥🧸', effect: 'The sweater uses two spaces. The toy uses the last one.' },
        { id: 'too-full', label: 'Sweater, bottle and book', icon: '🎒', effect: 'Oop—the backpack cannot stretch that far. Something has to wait.' },
      ], 'The backpack has a limit too. To add something, something else might wait.', ['I chose my favorite.', 'I chose more than one thing.', 'I kept some space.', 'Something had to wait.', 'I tried a different way.']),
    }, completion: 'This Root grew because you noticed what a choice gave you and what it changed.',
  },
  {
    id: 4, slug: 'saving-and-waiting', title: 'Saving, Waiting & Preparedness', shortTitle: 'Saving & Waiting', setting: 'Waiting Garden', zone: 'waiting', icon: '🌱', color: '#58c96d',
    capacity: 'Understand now and later, preserve a choice for later, and adapt when circumstances change.',
    phases: {
      story: mission('4.1', 'Tiny Seed, Big Flower', ['Penny plants a tiny seed.', 'Water can help the seed, wait for later, or help a flower now.'], 'Choose what to do with the water.', [
        { id: 'seed', label: 'Water the seed now', icon: '🌱💧', effect: 'The soil darkens. A tiny sprout begins.' },
        { id: 'later', label: 'Save water for later', icon: '🫙', effect: 'The water waits beside the seed.' },
        { id: 'flower', label: 'Water the flower', icon: '🌼💧', effect: 'The blooming flower lifts its petals.' },
      ], 'Some choices help right now. Some help something grow later. Let’s notice what each changes.'),
      play: mission('4.2', 'The Goal Jar', ['Pick a goal: a kite, chalk, or a garden flag.', 'One token can go toward later or a small activity now.'], 'Choose what this token does.', [
        { id: 'kite', label: 'Put it toward a kite', icon: '🪁', effect: 'The kite picture fills one step.' },
        { id: 'chalk', label: 'Put it toward chalk', icon: '🖍️', effect: 'The chalk picture fills one step.' },
        { id: 'now', label: 'Use it for fun now', icon: '🫧', effect: 'Bubbles fill the garden right now.' },
      ], 'Neither button gets to boss you around. You decide what matters this time.'),
      challenge: mission('4.3', 'Rain Before the Picnic', ['Two sun tokens were saved for a picnic decoration.', 'A rain cloud changes the plan.'], 'Choose what the picnic does next.', [
        { id: 'umbrella', label: 'Use tokens for an umbrella', icon: '☂️', effect: 'The picnic stays outside under a bright umbrella.' },
        { id: 'tree', label: 'Move under the tree', icon: '🌳', effect: 'The tokens stay. The tree becomes the roof.' },
        { id: 'change', label: 'Change the picnic plan', icon: '🏠', effect: 'The picnic moves inside and becomes a floor picnic.' },
      ], 'A surprise changed the plan. You still had choices. They were just different choices.', ['I wanted something now.', 'I waited for something later.', 'I changed my plan.', 'I found another way.', 'The surprise changed what mattered.']),
    }, completion: 'This Root grew because you practiced now, later, and what happens when plans change.',
  },
  {
    id: 5, slug: 'promises-and-trust', title: 'Borrowing, Promises & Trust', shortTitle: 'Promises & Trust', setting: 'Promise Bridge', zone: 'promise', icon: '🌉', color: '#ff8b43',
    capacity: 'Understand that borrowing creates a responsibility to return, repair, or communicate.',
    phases: {
      story: mission('5.1', 'The Red Crayon', ['Penny asks to borrow Bea’s red crayon.', 'The crayon is still Bea’s while Penny uses it.'], 'Choose the first step.', [
        { id: 'ask', label: 'Ask', icon: '🙋', effect: 'Bea knows Penny would like to use the crayon.' },
        { id: 'use', label: 'Use', icon: '🖍️', effect: 'Using comes after asking. You can try again.' },
        { id: 'return', label: 'Return', icon: '↩️', effect: 'Returning comes after using. You can try again.' },
      ], 'When I borrow something, it is still Bea’s. I can use it, care for it, and bring it back.'),
      play: mission('5.2', 'The Promise Path', ['A library book needs to cross the bridge and return.', 'Sometimes we need more time. We can say what is happening.'], 'Choose what happens when time runs short.', [
        { id: 'hide', label: 'Hide the book', icon: '🙈', effect: 'The other person waits and does not know what is happening.' },
        { id: 'ask', label: 'Ask for more time', icon: '💬', effect: 'Now the other person knows what to expect.' },
        { id: 'return', label: 'Return it unfinished', icon: '📚', effect: 'The book returns, even though the reading is not finished.' },
      ], 'A wobbly promise can be repaired. You can tell the person or bring the book back.'),
      challenge: mission('5.3', 'Trust Tower', ['Shared blocks travel out and come back.', 'Returning or communicating adds a steady piece.'], 'Choose how to steady the next block.', [
        { id: 'return', label: 'Bring it back', icon: '🧱↩️', effect: 'A steady block joins the tower.' },
        { id: 'more-time', label: 'Ask for more time', icon: '🕰️', effect: 'The tower waits, and everyone knows why.' },
        { id: 'repair', label: 'Repair a forgotten promise', icon: '🛠️', effect: 'A brace helps the wobbly piece stand again.' },
      ], 'Trust can grow when people know what to expect. A wobbly promise can be repaired.', ['I brought it back.', 'I needed more time.', 'I told the other person.', 'I repaired the promise.', 'I tried again.']),
    }, completion: 'This Root grew because you practiced borrowing, returning, and repairing trust.',
  },
  {
    id: 6, slug: 'growth-and-care', title: 'Growth, Risk & Ownership', shortTitle: 'Growth & Care', setting: 'Growing Patch', zone: 'growing', icon: '🌻', color: '#7c58d6',
    capacity: 'Understand that resources can change over time and caring for something creates responsibility.',
    phases: {
      story: mission('6.1', 'Plant and Care', ['You have one seed.', 'Owning the seed does not make it grow by itself.'], 'Choose what the seed needs first.', [
        { id: 'water', label: 'Water', icon: '💧', effect: 'The seed coat softens in the damp soil.' },
        { id: 'sun', label: 'Sunlight', icon: '☀️', effect: 'The warm light reaches the soil.' },
        { id: 'sign', label: 'Garden sign', icon: '🪧', effect: 'The sign is pretty, but the seed still needs water and sun.' },
      ], 'Some things need care after they become ours.'),
      play: mission('6.2', 'The Weather Wheel', ['The weather may bring sun, rain, or wind.', 'We cannot know for sure. We can choose how to prepare.'], 'Pick one tool before the weather arrives.', [
        { id: 'shade', label: 'Shade cloth', icon: '⛱️', effect: 'This tool helps when the sun is strong.' },
        { id: 'water', label: 'Watering can', icon: '🚿', effect: 'This tool helps when the soil is dry.' },
        { id: 'stick', label: 'Support stick', icon: '🎋', effect: 'This tool helps when the wind pushes.' },
      ], 'We could not know the weather. We could choose how to prepare.'),
      challenge: mission('6.3', 'Mine, Yours and Ours', ['Some things belong to one person. Some belong to everyone.', 'Who owns it changes who chooses and who helps care for it.'], 'Choose where the shared crayons belong.', [
        { id: 'mine', label: 'Mine', icon: '🎒', effect: 'A backpack can belong to one person.' },
        { id: 'yours', label: 'Yours', icon: '🧢', effect: 'Bea’s hat belongs to Bea.' },
        { id: 'ours', label: 'Ours', icon: '🖍️', effect: 'Shared crayons belong on the table for everyone.' },
      ], 'Something can belong to one person or many people. Shared things need shared care.', ['I cared for it.', 'The weather changed it.', 'I prepared one way.', 'I shared the care.', 'I noticed who it belonged to.']),
    }, completion: 'This Root grew because you noticed growth, uncertainty, ownership, and care.',
  },
  {
    id: 7, slug: 'stewardship-and-sharing', title: 'Stewardship, Systems & Legacy', shortTitle: 'Sharing & Stewardship', setting: 'Sharing Circle', zone: 'sharing', icon: '🌈', color: '#efb62d',
    capacity: 'Care for shared resources and notice how one person’s choices can affect other people.',
    phases: {
      story: mission('7.1', 'The Sharing Shelf', ['Six art supplies wait on a shared shelf.', 'Three children will use them.'], 'Choose how many the first child takes.', [
        { id: 'one', label: 'Take one', icon: '🖍️', effect: 'Five supplies remain for the next children.' },
        { id: 'three', label: 'Take three', icon: '🖍️🖍️🖍️', effect: 'Three supplies remain for the next children.' },
        { id: 'six', label: 'Take all six', icon: '🎨', effect: 'The next child reaches the shelf and finds no choices.' },
      ], 'You were allowed to use the supplies. Your choice also changed what waited for the next person.'),
      play: mission('7.2', 'Playground Fix', ['You have five repair stars.', 'The playground needs more help than five stars can do at once.'], 'Choose what to help first.', [
        { id: 'swing', label: 'Loose swing · 3', icon: '🛝', effect: 'The swing becomes steady. Two stars remain.' },
        { id: 'lines', label: 'Faded game lines · 2', icon: '🟦', effect: 'The game lines become bright. Three stars remain.' },
        { id: 'water', label: 'Dog water bowl · 2', icon: '🐕', effect: 'The bowl fills with clean water. Three stars remain.' },
      ], 'A shared place can have more needs than we can fix at once. What mattered most to you first?'),
      challenge: mission('7.3', 'The Circle Picnic', ['Three friends need different things to join the picnic.', 'Fair does not always look exactly the same.'], 'Choose what helps someone join.', [
        { id: 'chair', label: 'Bring a chair', icon: '🪑', effect: 'The friend who needs a chair can join comfortably.' },
        { id: 'shade', label: 'Make a shady place', icon: '⛱️', effect: 'The friend who needs shade can join comfortably.' },
        { id: 'plate', label: 'Prepare a safe plate', icon: '🍽️', effect: 'The friend who needs a different plate can join comfortably.' },
      ], 'Sometimes fair means noticing what helps each person join.', ['I shared some.', 'I left some for others.', 'I helped the shared place.', 'Different people needed different things.', 'I had to choose what came first.']),
    }, completion: 'This Root grew because you cared for something shared and noticed how choices travel to other people.',
  },
];

export const kindergartenRoutePaths = [
  '/kids-korner/kindergarten',
  '/kids-korner/kindergarten/orientation',
  ...kindergartenRoots.flatMap((root) => Object.keys(root.phases).map((phase) => `/kids-korner/kindergarten/roots/${root.slug}/${phase}`)),
  '/kids-korner/kindergarten/capstone',
  '/kids-korner/kindergarten/complete',
];

export const capstoneStations = kindergartenRoots.map((root) => ({
  rootId: root.id,
  title: root.shortTitle,
  icon: root.icon,
  prompt: root.phases.challenge.instruction,
  choices: root.phases.challenge.choices.slice(0, 3),
}));

export function getKindergartenRoot(slug) {
  return kindergartenRoots.find((root) => root.slug === slug);
}

export function nextKindergartenPath(root, phase) {
  if (phase === 'story') return `/kids-korner/kindergarten/roots/${root.slug}/play`;
  if (phase === 'play') return `/kids-korner/kindergarten/roots/${root.slug}/challenge`;
  return '/kids-korner/kindergarten';
}
