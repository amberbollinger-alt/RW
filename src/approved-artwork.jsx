import './landing-grove.css';

const crops = {
  sage: { viewBox: '380 55 390 590', label: 'Sage, the approved RootWise financial mentor' },
  tree: { viewBox: '32 20 78 86', label: 'The approved RootWise tree' },
  brand: { viewBox: '24 15 345 96', label: 'RootWise — Grow financial wisdom at the root' },
};

export function ApprovedArtwork({ variant, className = '' }) {
  const crop = crops[variant];
  if (!crop) return null;
  return (
    <svg className={className} viewBox={crop.viewBox} preserveAspectRatio="xMidYMid slice" role="img" aria-label={crop.label}>
      <image href="/rootwise-approved-home.png" width="862" height="1824" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}

function GroveIntroduction() {
  return (
    <section className="landing-grove-intro" aria-labelledby="grove-intro-title">
      <div className="grove-stars" aria-hidden="true" />
      <div className="grove-intro-shell">
        <header className="grove-preview-head">
          <div className="grove-tree-stage" aria-hidden="true">
            <span className="grove-tree-halo" />
            <ApprovedArtwork variant="tree" className="grove-preview-tree" />
          </div>
          <div className="grove-title-block">
            <p className="grove-intro-kicker">Welcome to</p>
            <h2 className="grove-intro-title" id="grove-intro-title">The Grove</h2>
            <p>Your journey to financial wisdom begins here.</p>
          </div>
          <aside className="grove-why">
            <span>Why we exist</span>
            <p>We help you uncover the beliefs, habits, and patterns shaping your financial decisions so you can create a life with more choices, confidence, and freedom.</p>
          </aside>
        </header>

        <div className="grove-rule-question">
          <span>The question</span>
          <strong>Who wrote your<br />money rules?</strong>
          <em>Are you sure?</em>
        </div>

        <div className="grove-preview-grid">
          <article className="grove-preview-card">
            <div className="grove-card-icon">✦</div>
            <h3>What Is RootWise?</h3>
            <p>RootWise is an educational journey designed to build your <strong>financial decision capacity</strong>.</p>
            <p>We strengthen your ability to understand situations, recognize tradeoffs, ask better questions, evaluate consequences, and make decisions that fit the life you want to build.</p>
          </article>

          <article className="grove-preview-card">
            <div className="grove-card-icon">◈</div>
            <h3>Why We Teach Through Stories</h3>
            <p>Facts are easy to forget. Stories stay with us.</p>
            <p>Through Ivy, Eli, Sage, and others, you’ll see real-life choices, mistakes, consequences, and growth that mirror your own journey—helping you recognize patterns and create change.</p>
          </article>

          <article className="grove-preview-card">
            <div className="grove-card-icon">↗</div>
            <h3>What Success Looks Like</h3>
            <p>More choices tomorrow. Understanding before deciding. Replacing fear with confidence. Making decisions with wisdom. Explaining why—not just hoping.</p>
            <p>Little by little. Decision by decision. Choice by choice.</p>
          </article>

          <article className="grove-preview-card">
            <div className="grove-card-icon">◇</div>
            <h3>Our Promise</h3>
            <p>We won’t tell you what your future should look like.</p>
            <p>We’ll challenge assumptions, explore ideas, show hidden costs and opportunities, and give you the tools to think clearly enough to build your own.</p>
          </article>
        </div>

        <section className="grove-preview-closing">
          <div className="grove-seal"><ApprovedArtwork variant="tree" /></div>
          <div>
            <h3>The Grove</h3>
            <p>Trees don’t grow overnight. Neither do people. Strong roots are invisible—but they’re what help us stand tall through every season of life.</p>
            <p>The stronger your roots become, the more choices you’ll have when life changes.</p>
          </div>
          <blockquote>
            <p>That’s why we’re here.</p>
            <p>Not simply to teach you about money.</p>
            <p>But to help you build a life where your choices become larger than your circumstances.</p>
          </blockquote>
        </section>

        <p className="grove-cta-thought">Your journey doesn’t start with money.<br /><strong>It starts with understanding.</strong></p>
        <a className="grove-primary-cta" href="/#/heart"><span>Begin Your Journey</span><span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}

export function ApprovedLandingArtwork({ className = '' }) {
  const visibleHeight = 748;
  return (
    <>
      <svg className={`approved-landing-artwork ${className}`} viewBox={`0 0 862 ${visibleHeight}`} preserveAspectRatio="xMidYMin meet" role="img" aria-label="RootWise approved landing page featuring Sage and the RootWise foundation">
        <defs>
          <linearGradient id="landing-paper-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ead6bd" /><stop offset=".52" stopColor="#e3cdb3" /><stop offset="1" stopColor="#dac3a8" /></linearGradient>
          <linearGradient id="landing-paper-copy" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f4e7d6" /><stop offset="1" stopColor="#ecdecc" /></linearGradient>
          <linearGradient id="landing-quote-paper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f3eadc" /><stop offset="1" stopColor="#ece0cf" /></linearGradient>
          <filter id="landing-paper-feather" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="2.4" /></filter>
        </defs>
        <image href="/rootwise-approved-home.png" width="862" height="1824" />
        <rect x="354" y="23" width="468" height="47" fill="url(#landing-paper-top)" />
        <text x="588" y="51" textAnchor="middle" fill="#66533c" fontFamily="Georgia, serif" fontSize="11" fontWeight="700" letterSpacing="2.2">FINANCIAL WISDOM, ROOTED IN REAL LIFE</text>
        <rect x="122" y="119" width="270" height="332" rx="5" fill="url(#landing-paper-copy)" filter="url(#landing-paper-feather)" />
        <rect x="112" y="451" width="280" height="61" fill="url(#landing-paper-copy)" filter="url(#landing-paper-feather)" />
        <rect x="621" y="292" width="160" height="114" rx="5" fill="url(#landing-quote-paper)" />
        <text x="139" y="151" fill="#173a25" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="800" letterSpacing="1.4">GROW FINANCIAL WISDOM</text>
        <text x="139" y="171" fill="#173a25" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="800" letterSpacing="1.4">AT THE ROOT</text>
        <text x="139" y="225" fill="#12351f" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="900"><tspan x="139" dy="0">Stop</tspan><tspan x="139" dy="42">guessing with</tspan><tspan x="139" dy="42">money. Build</tspan><tspan x="139" dy="42">roots by</tspan><tspan x="139" dy="42">learning.</tspan></text>
        <text x="139" y="396" fill="#3e463d" fontFamily="Arial, sans-serif" fontSize="14"><tspan x="139" dy="0">RootWise teaches what money is, what it</tspan><tspan x="139" dy="22">does, the concepts behind it, and how to</tspan><tspan x="139" dy="22">apply that knowledge to the choices you</tspan><tspan x="139" dy="22">make in real life.</tspan></text>
        <text x="638" y="322" fill="#26352b" fontFamily="Arial, sans-serif" fontSize="12"><tspan x="638" dy="0">“Financial clarity isn’t</tspan><tspan x="638" dy="18">about how much you</tspan><tspan x="638" dy="18">make, it’s about</tspan><tspan x="638" dy="18">understanding where to</tspan><tspan x="638" dy="18">apply it. Clarity grows one</tspan><tspan x="638" dy="18">root at a time.”</tspan></text>
      </svg>
      <GroveIntroduction />
    </>
  );
}
