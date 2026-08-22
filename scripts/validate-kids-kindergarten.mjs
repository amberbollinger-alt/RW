import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const component = read('src/kids-kindergarten.jsx');
const data = read('src/kids-kindergarten-data.js');
const styles = read('src/kids-kindergarten.css');
const routing = read('src/root-routing.js');
const main = read('src/main.jsx');
const intro = read('src/kids-korner.jsx');
const legacyMission = read('src/kids-mission-one.jsx');
const speechApi = read('api/speech.js');

const slugs = ['me-and-choices', 'value-and-helping', 'choice-and-tradeoffs', 'saving-and-waiting', 'promises-and-trust', 'growth-and-care', 'stewardship-and-sharing'];
const phases = ['story', 'play', 'challenge'];
const requiredRoutes = [
  '/kids-korner/kindergarten', '/kids-korner/kindergarten/orientation',
  ...slugs.flatMap((slug) => phases.map((phase) => `/kids-korner/kindergarten/roots/${slug}/${phase}`)),
  '/kids-korner/kindergarten/capstone', '/kids-korner/kindergarten/complete',
];

const checks = [
  ['Kindergarten grade route', routing.includes("path === 'kids-korner/kindergarten'")],
  ['five-token School Fair route', component.includes('PENNY’S') && component.includes('SCHOOL FAIR') && component.includes('spent + choice.cost > 5')],
  ['all 21 Root phase routes', slugs.every((slug) => data.includes(`slug: '${slug}'`)) && (data.match(/story: mission/g) || []).length === 7 && (data.match(/play: mission/g) || []).length === 7 && (data.match(/challenge: mission/g) || []).length === 7],
  ['capstone route', routing.includes("kids-korner/kindergarten/") && component.includes("subpath === 'capstone'")],
  ['completion route', component.includes("subpath === 'complete'")],
  ['seven Roots present', slugs.every((slug) => data.includes(slug)) && (data.match(/completion:/g) || []).length === 7],
  ['three phases per Root', (data.match(/story: mission/g) || []).length === 7 && (data.match(/play: mission/g) || []).length === 7 && (data.match(/challenge: mission/g) || []).length === 7],
  ['Penny present', component.includes('penny-hero.png')],
  ['Grown-Up Exit present', component.includes('Grown-Up Exit') && component.includes("go('/crossing')")],
  ['No Sage inside Kindergarten', !component.includes('SageVoice') && main.includes('!isKidsRoute') && main.includes("route.startsWith('kids-kindergarten')")],
  ['No adult tools inside Kindergarten', !component.includes('/tools') && !component.includes('ToolsCenter')],
  ['No Business Hub navigation', !component.includes('Business Hub')],
  ['No free-text inputs', !component.includes('<textarea') && !component.includes('type="text"')],
  ['No advertisements or purchases', !component.includes('advertisement') && !component.includes('purchase')],
  ['No adult credit products', !data.includes('credit card') && !data.includes('credit score') && !data.includes('lender')],
  ['separate local progress key', data.includes("rootwise_kids_kindergarten_progress_v1")],
  ['existing 10-token Mission One intact', legacyMission.includes('10 tokens') && legacyMission.includes("rootwise_kids_mission_one_v1")],
  ['read-aloud controls exist', component.includes('SpeechSynthesisUtterance') && component.includes('ReadAloud')],
  ['Penny uses separate bright female voice persona', component.includes("persona: 'penny'") && component.includes('preferredPennyDeviceVoice') && speechApi.includes('OPENAI_KIDS_TTS_VOICE') && speechApi.includes('bright and inviting young female guide')],
  ['all seven Roots explain the money connection', (data.match(/moneyConnection:/g) || []).length === 7 && component.includes('Why this matters with money')],
  ['all activities explain the situation and action', component.includes('The situation') && component.includes('What to do') && component.includes('phaseDirections')],
  ['coin values teach penny nickel dime and quarter', ['penny is worth 1 cent', 'nickel is worth 5 cents', 'dime is worth 10 cents', 'quarter is worth 25 cents'].every((fact) => data.toLowerCase().includes(fact))],
  ['coin counting reaches 1 5 10 and 25', data.includes('Count One Cent') && data.includes('Count to Five') && data.includes('Count to Ten') && data.includes('Count by Fives to 25')],
  ['visual coin matching is interactive', data.includes('Coin Match Meadow') && (data.match(/pair:/g) || []).length >= 12 && component.includes('kg-coin-pair')],
  ['shared mission contrast applies to every Root', styles.includes('.kg-mission-heading{') && !styles.includes('.kg-mission.is-mirror .kg-mission-heading') && styles.includes('background:rgba(255,255,255,.96)')],
  ['reduced-motion support', styles.includes('@media(prefers-reduced-motion:reduce)')],
  ['sensory-calm support', component.includes('sensoryCalm') && styles.includes('.is-calm')],
  ['required assets exist', fs.existsSync(path.join(root, 'public/kids-korner/penny-hero.png')) && fs.existsSync(path.join(root, 'public/kids-korner/kids-grove.png'))],
  ['Grade 1–6 future states non-clickable', intro.includes('[1, 2, 3, 4, 5, 6].map') && intro.includes('Grade {grade}') && intro.includes('<div key={grade}')],
  ['direct routing recognizes Kindergarten', routing.includes("path.startsWith('kids-korner/kindergarten/')") && main.includes("route.startsWith('kids-kindergarten')")],
];

const failed = checks.filter(([, pass]) => !pass);
if (failed.length) {
  console.error(JSON.stringify({ status: 'FAIL', failed: failed.map(([name]) => name) }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ status: 'PASS', checks: checks.map(([name]) => name), routes: requiredRoutes }, null, 2));
