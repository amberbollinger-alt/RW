import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const component = fs.readFileSync(path.join(root, 'src/kids-korner.jsx'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'src/kids-korner.css'), 'utf8');
const mission = fs.readFileSync(path.join(root, 'src/kids-mission-one.jsx'), 'utf8');
const missionStyles = fs.readFileSync(path.join(root, 'src/kids-mission-one.css'), 'utf8');
const routing = fs.readFileSync(path.join(root, 'src/root-routing.js'), 'utf8');
const main = fs.readFileSync(path.join(root, 'src/main.jsx'), 'utf8');
const crossing = fs.readFileSync(path.join(root, 'src/crossing.jsx'), 'utf8');
const grove = fs.readFileSync(path.join(root, 'src/grove.jsx'), 'utf8');

const checks = [
  ['Penny intro route', routing.includes("path === 'kids-korner'")],
  ['Kids Grove route', routing.includes("path === 'kids-korner/grove'")],
  ['Mission One route', routing.includes("path === 'kids-korner/mission-one'") && routing.includes("'/kids-korner/mission-one'")],
  ['adult reassurance copy', component.includes('Grown-ups, don’t worry.') && component.includes('No pressure. No scary money talk.')],
  ['adult handoff control', component.includes("Okay Penny, they’re yours")],
  ['child reveal copy', component.includes('Okay, kids!') && component.includes('I’ve been waiting for you!')],
  ['curiosity rule', component.includes('You don’t have to get everything right.') && component.includes('You do have to be curious.')],
  ['Grove launches mission', component.includes("window.location.href = '/kids-korner/mission-one'") && component.includes('Enter the fair')],
  ['closed child navigation', component.includes('Grown-Up Exit') && !component.includes('Business Hub') && !component.includes('Assessment')],
  ['Sage hidden in child routes', main.includes("!route.startsWith('kids-korner')")],
  ['Crossing entry activated', crossing.includes("go('/kids-korner')") && crossing.includes('Enter with Penny')],
  ['Main Grove entry visible', grove.includes('className="grove-kids-korner-link"') && grove.includes('href="/kids-korner"')],
  ['Business Hub unchanged', crossing.includes('Business Hub, coming soon') && crossing.includes('crossing-business') && crossing.includes('disabled')],
  ['Mission token limit', mission.includes('10 tokens') && mission.includes('spent + choice.cost > 10')],
  ['Mission keeps choice with child', mission.includes('I am not choosing for you') && mission.includes('no secret correct button')],
  ['Mission teaches tradeoff', mission.includes('That is a tradeoff.') && mission.includes('Every “yes” quietly creates a “not this time.”')],
  ['Mission has grown-up exit', mission.includes('Grown-Up Exit') && mission.includes("go('/crossing')")],
  ['Mission returns to Grove', mission.includes("window.location.href = '/kids-korner/grove'")],
  ['Mission avoids free-text PII', !mission.includes('<textarea') && !mission.includes('type="text"')],
  ['reduced motion', styles.includes('@media (prefers-reduced-motion: reduce)') && missionStyles.includes('@media(prefers-reduced-motion:reduce)')],
  ['Penny asset', fs.existsSync(path.join(root, 'public/kids-korner/penny-hero.png'))],
  ['Grove asset', fs.existsSync(path.join(root, 'public/kids-korner/kids-grove.png'))],
];

const failed = checks.filter(([, pass]) => !pass);
if (failed.length) {
  console.error(JSON.stringify({ status: 'FAIL', failed: failed.map(([name]) => name) }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'PASS',
  checks: checks.map(([name]) => name),
  routes: ['/kids-korner', '/kids-korner/grove', '/kids-korner/mission-one'],
}, null, 2));
