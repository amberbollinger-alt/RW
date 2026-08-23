export const KINDERGARTEN_PROGRESS_KEY = 'rootwise_kids_kindergarten_progress_v1';
export const KIDS_GRADE_KEY = 'rootwise_kids_selected_grade_v1';

export const phaseLabels = {
  story: 'Story Spark',
  play: 'Play Lab',
  challenge: 'Choice Challenge',
};

const mission = (id, title, story, instruction, choices, feedback, reflection = [], lesson = {}) => ({
  id, title, story, instruction, choices, feedback, reflection, lesson,
  accessibilityLabel: `${title}. ${instruction}`,
});

export const kindergartenRoots = [
  {
    id: 1,
    slug: 'me-and-choices',
    title: 'Meet the Penny',
    shortTitle: 'The Penny',
    setting: 'Penny Place',
    zone: 'mirror',
    icon: '🪞',
    capacity: 'Recognize a penny, name its value, and count to one cent.',
    moneyConnection: 'A penny is worth 1 cent. Recognizing its color, size, and value is the first step in counting money.',
    color: '#ff6f73',
    phases: {
      story: mission('1.1', 'Find the Penny', ['A penny is the copper-colored coin.', 'It is worth exactly one cent.'], 'Tap the penny.', [
        { id: 'penny', label: 'Penny', coin: 'penny', effect: 'Yes. The copper-colored penny is worth 1 cent.' },
        { id: 'nickel', label: 'Nickel', coin: 'nickel', effect: 'That is a nickel. Look for the copper-colored penny.' },
        { id: 'dime', label: 'Dime', coin: 'dime', effect: 'That is a dime. Look for the copper-colored penny.' },
      ], 'A penny is copper-colored and worth 1 cent.', [], { coin: 'penny', value: 1, countBy: 1 }),
      play: mission('1.2', 'Count One Cent', ['The penny has the smallest value of these coins.', 'Start at zero and count one step: 0, 1.'], 'Tap the penny’s value.', [
        { id: 'one', label: '1 cent', value: 1, effect: 'Correct. One penny has a value of 1 cent.' },
        { id: 'five', label: '5 cents', value: 5, effect: 'Five cents is the value of a nickel. A penny is 1 cent.' },
        { id: 'ten', label: '10 cents', value: 10, effect: 'Ten cents is the value of a dime. A penny is 1 cent.' },
      ], 'Count one penny as 1 cent.', [], { coin: 'penny', value: 1, countBy: 1 }),
      challenge: mission('1.3', 'Penny Picture Match', ['Look at the coin, then look at the value cards.', 'Find the value that matches the penny.'], 'Match the penny to its value.', [
        { id: 'one', label: 'Penny matches 1 cent', pair: ['penny', 1], effect: 'It matches. Penny equals 1 cent.' },
        { id: 'five', label: 'Penny matches 5 cents', pair: ['penny', 5], effect: 'Not this match. Five cents belongs with a nickel.' },
        { id: 'ten', label: 'Penny matches 10 cents', pair: ['penny', 10], effect: 'Not this match. Ten cents belongs with a dime.' },
      ], 'Match the coin picture to 1 cent.', ['I found the copper coin.', 'I counted to 1.', 'I matched penny with 1 cent.'], { coin: 'penny', value: 1, countBy: 1 }),
    },
    completion: 'Your first Root grew because you recognized a penny and counted its 1-cent value.',
  },
  {
    id: 2, slug: 'value-and-helping', title: 'Meet the Nickel', shortTitle: 'The Nickel', setting: 'Nickel Nook', zone: 'helping', icon: '🪙', color: '#ffc43d',
    capacity: 'Recognize a nickel, name its value, and count from one to five cents.',
    moneyConnection: 'A nickel is worth 5 cents. Counting 1, 2, 3, 4, 5 connects the coin to its value.',
    phases: {
      story: mission('2.1', 'Find the Nickel', ['A nickel is a silver-colored coin.', 'It is bigger than a penny and worth 5 cents.'], 'Tap the nickel.', [
        { id: 'penny', label: 'Penny', coin: 'penny', effect: 'That is a penny. The nickel is silver-colored and larger.' },
        { id: 'nickel', label: 'Nickel', coin: 'nickel', effect: 'Yes. The nickel is worth 5 cents.' },
        { id: 'dime', label: 'Dime', coin: 'dime', effect: 'That is the smaller dime. Find the larger nickel.' },
      ], 'A nickel is the larger silver-colored coin worth 5 cents.', [], { coin: 'nickel', value: 5, countBy: 1 }),
      play: mission('2.2', 'Count to Five', ['Count one cent at a time until you reach the nickel’s value.', 'Say it with Penny: 1, 2, 3, 4, 5.'], 'Tap the count that ends at 5.', [
        { id: 'five', label: '1, 2, 3, 4, 5', count: [1, 2, 3, 4, 5], effect: 'Yes. The count ends at 5 cents, the value of one nickel.' },
        { id: 'three', label: '1, 2, 3', count: [1, 2, 3], effect: 'Keep counting. A nickel is worth 5 cents.' },
        { id: 'ten', label: '2, 4, 6, 8, 10', count: [2, 4, 6, 8, 10], effect: 'That count reaches 10. A nickel stops at 5 cents.' },
      ], 'Count to 5 to remember a nickel’s value.', [], { coin: 'nickel', value: 5, countBy: 1 }),
      challenge: mission('2.3', 'Nickel Picture Match', ['Look at the silver-colored nickel.', 'Now find the value card that belongs with it.'], 'Match the nickel to its value.', [
        { id: 'one', label: 'Nickel matches 1 cent', pair: ['nickel', 1], effect: 'One cent belongs with a penny.' },
        { id: 'five', label: 'Nickel matches 5 cents', pair: ['nickel', 5], effect: 'It matches. Nickel equals 5 cents.' },
        { id: 'ten', label: 'Nickel matches 10 cents', pair: ['nickel', 10], effect: 'Ten cents belongs with a dime.' },
      ], 'Match the nickel picture to 5 cents.', ['I found the larger silver coin.', 'I counted from 1 to 5.', 'I matched nickel with 5 cents.'], { coin: 'nickel', value: 5, countBy: 1 }),
    }, completion: 'This Root grew because you recognized a nickel and counted from 1 to 5 cents.',
  },
  {
    id: 3, slug: 'choice-and-tradeoffs', title: 'Meet the Dime', shortTitle: 'The Dime', setting: 'Dime Dock', zone: 'choice', icon: '🔟', color: '#ff4f9a',
    capacity: 'Recognize a dime, name its value, and count from one to ten cents.',
    moneyConnection: 'A dime is worth 10 cents. It is smaller than a nickel even though it has a larger value.',
    phases: {
      story: mission('3.1', 'Find the Dime', ['A dime is the smallest coin in this group.', 'It is silver-colored and worth 10 cents.'], 'Tap the dime.', [
        { id: 'nickel', label: 'Nickel', coin: 'nickel', effect: 'That is a nickel. The dime is the smaller silver coin.' },
        { id: 'dime', label: 'Dime', coin: 'dime', effect: 'Yes. The small silver dime is worth 10 cents.' },
        { id: 'quarter', label: 'Quarter', coin: 'quarter', effect: 'That is a quarter. Find the smallest silver coin.' },
      ], 'A dime is small, silver-colored, and worth 10 cents.', [], { coin: 'dime', value: 10, countBy: 1 }),
      play: mission('3.2', 'Count to Ten', ['Count one cent at a time to the dime’s value.', 'The last number should be 10.'], 'Tap the count that reaches 10.', [
        { id: 'five', label: '1 through 5', count: [1, 2, 3, 4, 5], effect: 'That stops at 5. Keep counting to the dime’s value.' },
        { id: 'ten', label: '1 through 10', count: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], effect: 'Correct. The count reaches 10 cents.' },
        { id: 'twenty', label: '5, 10, 15, 20', count: [5, 10, 15, 20], effect: 'That count reaches 20. A dime is worth 10 cents.' },
      ], 'Count from 1 to 10 to remember the dime’s value.', [], { coin: 'dime', value: 10, countBy: 1 }),
      challenge: mission('3.3', 'Dime Picture Match', ['The dime is smaller than the nickel.', 'Its value card says 10 cents.'], 'Match the dime to its value.', [
        { id: 'five', label: 'Dime matches 5 cents', pair: ['dime', 5], effect: 'Five cents belongs with a nickel.' },
        { id: 'ten', label: 'Dime matches 10 cents', pair: ['dime', 10], effect: 'It matches. Dime equals 10 cents.' },
        { id: 'twenty-five', label: 'Dime matches 25 cents', pair: ['dime', 25], effect: 'Twenty-five cents belongs with a quarter.' },
      ], 'Match the dime picture to 10 cents.', ['I found the smallest coin.', 'I counted from 1 to 10.', 'I matched dime with 10 cents.'], { coin: 'dime', value: 10, countBy: 1 }),
    }, completion: 'This Root grew because you recognized a dime and counted from 1 to 10 cents.',
  },
  {
    id: 4, slug: 'saving-and-waiting', title: 'Meet the Quarter', shortTitle: 'The Quarter', setting: 'Quarter Quarry', zone: 'waiting', icon: '2️⃣5️⃣', color: '#58c96d',
    capacity: 'Recognize a quarter, name its value, and count by fives to twenty-five cents.',
    moneyConnection: 'A quarter is worth 25 cents. Counting 5, 10, 15, 20, 25 helps children reach that value without counting every cent.',
    phases: {
      story: mission('4.1', 'Find the Quarter', ['A quarter is the largest coin in this group.', 'It is silver-colored and worth 25 cents.'], 'Tap the quarter.', [
        { id: 'penny', label: 'Penny', coin: 'penny', effect: 'That is the copper penny. Find the large silver quarter.' },
        { id: 'dime', label: 'Dime', coin: 'dime', effect: 'That is the small dime. Find the large silver quarter.' },
        { id: 'quarter', label: 'Quarter', coin: 'quarter', effect: 'Yes. A quarter is worth 25 cents.' },
      ], 'A quarter is the largest of these four coins and worth 25 cents.', [], { coin: 'quarter', value: 25, countBy: 5 }),
      play: mission('4.2', 'Count by Fives to 25', ['A quarter is worth 25 cents.', 'Count five steps: 5, 10, 15, 20, 25.'], 'Tap the count that reaches 25.', [
        { id: 'ten', label: '5, 10', count: [5, 10], effect: 'That stops at 10. A quarter is worth 25 cents.' },
        { id: 'twenty-five', label: '5, 10, 15, 20, 25', count: [5, 10, 15, 20, 25], effect: 'Correct. Five jumps of 5 reach 25 cents.' },
        { id: 'thirty', label: '5, 10, 15, 20, 25, 30', count: [5, 10, 15, 20, 25, 30], effect: 'That went one jump too far. Stop at 25.' },
      ], 'Counting by fives is a quick way to reach 25.', [], { coin: 'quarter', value: 25, countBy: 5 }),
      challenge: mission('4.3', 'Quarter Picture Match', ['Look for the largest silver coin.', 'Find the 25-cent value card.'], 'Match the quarter to its value.', [
        { id: 'five', label: 'Quarter matches 5 cents', pair: ['quarter', 5], effect: 'Five cents belongs with a nickel.' },
        { id: 'ten', label: 'Quarter matches 10 cents', pair: ['quarter', 10], effect: 'Ten cents belongs with a dime.' },
        { id: 'twenty-five', label: 'Quarter matches 25 cents', pair: ['quarter', 25], effect: 'It matches. Quarter equals 25 cents.' },
      ], 'Match the quarter picture to 25 cents.', ['I found the largest coin.', 'I counted by fives to 25.', 'I matched quarter with 25 cents.'], { coin: 'quarter', value: 25, countBy: 5 }),
    }, completion: 'This Root grew because you recognized a quarter and counted by fives to 25 cents.',
  },
  {
    id: 5, slug: 'promises-and-trust', title: 'Coin Match Meadow', shortTitle: 'Coin Matching', setting: 'Match Meadow', zone: 'promise', icon: '🧩', color: '#ff8b43',
    capacity: 'Visually match penny, nickel, dime, and quarter pictures to their cent values.',
    moneyConnection: 'Matching each coin to its value builds fast, accurate coin recognition before children begin adding mixed coins.',
    phases: {
      story: mission('5.1', 'Match Copper to One', ['Only one of these coins is copper-colored.', 'Match that coin to the 1-cent card.'], 'Choose the correct picture match.', [
        { id: 'penny-one', label: 'Penny and 1 cent', pair: ['penny', 1], effect: 'Match! The copper penny is worth 1 cent.' },
        { id: 'penny-five', label: 'Penny and 5 cents', pair: ['penny', 5], effect: 'The coin is right, but 5 cents belongs with a nickel.' },
        { id: 'nickel-one', label: 'Nickel and 1 cent', pair: ['nickel', 1], effect: 'The value is 1 cent, but the picture should be a penny.' },
      ], 'Look at both parts of a match: the coin picture and the value.', [], { coin: 'penny', value: 1, countBy: 1 }),
      play: mission('5.2', 'Match Small to Ten', ['The dime is the smallest silver coin.', 'Its matching value card is 10 cents.'], 'Choose the correct dime match.', [
        { id: 'nickel-ten', label: 'Nickel and 10 cents', pair: ['nickel', 10], effect: 'Ten cents is right, but that picture is a nickel.' },
        { id: 'dime-ten', label: 'Dime and 10 cents', pair: ['dime', 10], effect: 'Match! The small silver dime is worth 10 cents.' },
        { id: 'quarter-ten', label: 'Quarter and 10 cents', pair: ['quarter', 10], effect: 'Ten cents is right, but that picture is a quarter.' },
      ], 'Use size and value together to match the dime.', [], { coin: 'dime', value: 10, countBy: 1 }),
      challenge: mission('5.3', 'Four-Coin Match', ['Penny mixed up four coin-and-value cards.', 'Find the pair where both the picture and number belong together.'], 'Choose the correct visual match.', [
        { id: 'nickel-five', label: 'Nickel and 5 cents', pair: ['nickel', 5], effect: 'Match! A nickel is worth 5 cents.' },
        { id: 'dime-twenty-five', label: 'Dime and 25 cents', pair: ['dime', 25], effect: 'Those do not match. A dime is worth 10 cents.' },
        { id: 'quarter-one', label: 'Quarter and 1 cent', pair: ['quarter', 1], effect: 'Those do not match. A quarter is worth 25 cents.' },
      ], 'A visual match needs the right coin and the right number.', ['I checked the coin color.', 'I checked the coin size.', 'I checked the cent number.'], { coin: 'nickel', value: 5, countBy: 1 }),
    }, completion: 'This Root grew because you matched coin pictures to their cent values.',
  },
  {
    id: 6, slug: 'growth-and-care', title: 'Build Coin Values', shortTitle: 'Build Values', setting: 'Counting Creek', zone: 'growing', icon: '🧮', color: '#7c58d6',
    capacity: 'Count groups of pennies and nickels and connect different coin groups to the same total value.',
    moneyConnection: 'Different groups of coins can have the same total value. Counting carefully shows how much the group is worth.',
    phases: {
      story: mission('6.1', 'Five Pennies', ['Each penny is worth 1 cent.', 'Count five pennies: 1, 2, 3, 4, 5 cents.'], 'Choose the coin with the same value as five pennies.', [
        { id: 'penny', label: 'One penny', coin: 'penny', effect: 'One penny is only 1 cent.' },
        { id: 'nickel', label: 'One nickel', coin: 'nickel', effect: 'Correct. Five pennies and one nickel are both worth 5 cents.' },
        { id: 'dime', label: 'One dime', coin: 'dime', effect: 'A dime is 10 cents, more than five pennies.' },
      ], 'Five pennies equal one nickel because both are worth 5 cents.', [], { group: ['penny', 'penny', 'penny', 'penny', 'penny'], value: 5, countBy: 1 }),
      play: mission('6.2', 'Two Nickels', ['Each nickel is worth 5 cents.', 'Count two nickels by fives: 5, 10.'], 'Choose the coin with the same value as two nickels.', [
        { id: 'nickel', label: 'One nickel', coin: 'nickel', effect: 'One nickel is only 5 cents.' },
        { id: 'dime', label: 'One dime', coin: 'dime', effect: 'Correct. Two nickels and one dime are both worth 10 cents.' },
        { id: 'quarter', label: 'One quarter', coin: 'quarter', effect: 'A quarter is 25 cents, more than two nickels.' },
      ], 'Two nickels equal one dime because 5 plus 5 equals 10.', [], { group: ['nickel', 'nickel'], value: 10, countBy: 5 }),
      challenge: mission('6.3', 'Make Twenty-Five', ['Two dimes are 10 plus 10, or 20 cents.', 'Add one nickel: 20 plus 5 equals 25 cents.'], 'Choose the coin with the same value as two dimes and one nickel.', [
        { id: 'dime', label: 'One dime', coin: 'dime', effect: 'One dime is 10 cents, not 25.' },
        { id: 'quarter', label: 'One quarter', coin: 'quarter', effect: 'Correct. Two dimes and one nickel equal one quarter: 25 cents.' },
        { id: 'nickel', label: 'One nickel', coin: 'nickel', effect: 'One nickel is 5 cents, not 25.' },
      ], 'Different coin groups can make the same total value.', ['I counted each coin once.', 'I counted 10, 20, 25.', 'I matched the group to a quarter.'], { group: ['dime', 'dime', 'nickel'], value: 25, countBy: 5 }),
    }, completion: 'This Root grew because you counted coin groups and found equal values.',
  },
  {
    id: 7, slug: 'stewardship-and-sharing', title: 'Use Coins for Choices', shortTitle: 'Coin Choices', setting: 'Penny’s Pocket Shop', zone: 'sharing', icon: '🛍️', color: '#efb62d',
    capacity: 'Choose a coin that exactly matches a simple price and explain the coin’s value.',
    moneyConnection: 'Coin values help us decide whether we have enough money for a price. We count first, then choose.',
    phases: {
      story: mission('7.1', 'The Five-Cent Sticker', ['A star sticker costs exactly 5 cents.', 'Choose one coin that matches the price.'], 'Tap the coin worth 5 cents.', [
        { id: 'penny', label: 'Pay with a penny', coin: 'penny', effect: 'A penny is only 1 cent. Count to the 5-cent price.' },
        { id: 'nickel', label: 'Pay with a nickel', coin: 'nickel', effect: 'Correct. A nickel exactly matches the 5-cent price.' },
        { id: 'dime', label: 'Pay with a dime', coin: 'dime', effect: 'A dime is 10 cents. Find the coin that exactly matches 5 cents.' },
      ], 'Read the price, remember each coin’s value, then choose.', [], { price: 5, value: 5, countBy: 1 }),
      play: mission('7.2', 'The Ten-Cent Pencil', ['A bright pencil costs exactly 10 cents.', 'Choose one coin that matches the price.'], 'Tap the coin worth 10 cents.', [
        { id: 'nickel', label: 'Pay with a nickel', coin: 'nickel', effect: 'A nickel is 5 cents. The price is 10 cents.' },
        { id: 'dime', label: 'Pay with a dime', coin: 'dime', effect: 'Correct. A dime exactly matches the 10-cent price.' },
        { id: 'quarter', label: 'Pay with a quarter', coin: 'quarter', effect: 'A quarter is 25 cents. Find the exact 10-cent match.' },
      ], 'The dime is the one-coin match for 10 cents.', [], { price: 10, value: 10, countBy: 1 }),
      challenge: mission('7.3', 'The Twenty-Five-Cent Pinwheel', ['A pinwheel costs exactly 25 cents.', 'Choose one coin that matches the price.'], 'Tap the coin worth 25 cents.', [
        { id: 'penny', label: 'Pay with a penny', coin: 'penny', effect: 'A penny is 1 cent. The price is 25 cents.' },
        { id: 'dime', label: 'Pay with a dime', coin: 'dime', effect: 'A dime is 10 cents. Keep looking for 25 cents.' },
        { id: 'quarter', label: 'Pay with a quarter', coin: 'quarter', effect: 'Correct. A quarter exactly matches the 25-cent price.' },
      ], 'Count the price, then connect it to the matching coin value.', ['I read the price first.', 'I remembered the coin value.', 'I found the exact coin match.'], { price: 25, value: 25, countBy: 5 }),
    }, completion: 'This Root grew because you read a price and chose the coin with the matching value.',
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
