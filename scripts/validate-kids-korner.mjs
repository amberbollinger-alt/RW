import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const component = fs.readFileSync(path.join(root, 'src/kids-korner.jsx'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'src/kids-korner.css'), 'utf8');
const routing = fs.readFileSync(path.join(root, 'src/root-routing.js'), 'utf8');
const main = fs.readFileSync(path.join(root, 'src/main.jsx'), 'utf8');
const crossing = fs.readFileSync(path.join(root, 'src/crossing.jsx'), 'utf8');

const checks = [
  ['Penny intro route', routing.includes("path === 'kids-korner'")],
  ['Kids Grove route', routing.includes("path === 'kids-korner/grove'")],
  ['adult reassurance copy', component.includes('Grown-ups, don’t worry.') && component.includes('No pressure. No scary money talk.')],
  ['adult handoff control', component.includes("Okay Penny, they’re yours")],
  ['child reveal copy', component.includes('Okay, kids!') && component.includes('I’ve been waiting for you!')],
  ['curiosity rule', component.includes('You don’t have to get everything right.') && component.includes('You do have to be curious.')],
  ['Grove mission', component.includes('The School Fair') && component.includes('10 tokens')],
  ['closed child navigation', component.includes('Grown-Up Exit') && !component.includes('Business Hub') && !component.includes('Assessment')],
  ['Sage hidden in child routes', main.includes("!route.startsWith('kids-korner')")],
  ['Crossing entry activated', crossing.includes("go('/kids-korner')") && crossing.includes('Enter with Penny')],
  ['Business Hub unchanged', crossing.includes('Business Hub, coming soon') && crossing.includes('crossing-business') && crossing.includes('disabled')],
  ['reduced motion', styles.includes('@media (prefers-reduced-motion: reduce)')],
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
  routes: ['/kids-korner', '/kids-korner/grove'],
}, null, 2));
