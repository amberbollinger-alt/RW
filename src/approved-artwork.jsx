import './landing-grove.css';

const crops = {
  sage: {
    viewBox: '380 55 390 590',
    label: 'Sage, the approved RootWise financial mentor',
  },
  tree: {
    viewBox: '32 20 78 86',
    label: 'The approved RootWise tree',
  },
  brand: {
    viewBox: '24 15 345 96',
    label: 'RootWise — Grow financial wisdom at the root',
  },
};

export function ApprovedArtwork({ variant, className = '' }) {
  const crop = crops[variant];

  if (!crop) return null;

  return (
    <svg
      className={className}
      viewBox={crop.viewBox}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={crop.label}
    >
      <image
        href="/rootwise-approved-home.png"
        width="862"
        height="1824"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}

function GroveIntroduction() {
  return (
    <section className="landing-grove-intro" aria-labelledby="grove-intro-title">
      <div className="grove-intro-shell">
        <p className="grove-intro-kicker">RootWise begins here</p>
        <h2 className="grove-intro-title" id="grove-intro-title">Welcome to The Grove</h2>
        <p className="grove-intro-lead">Before we begin, I&apos;d like to ask you a question.</p>

        <div className="grove-rule-question">
          <strong>Who wrote your money rules?</strong>
          <em>Are you sure?</em>
        </div>

        <div className="grove-intro-copy">
          <article className="grove-copy-card">
            <p>Think about it for a moment.</p>
            <p>Who taught you what money means?</p>
            <p>Who showed you what success looked like?</p>
            <p>Who decided what was &quot;too expensive,&quot; what was &quot;worth it,&quot; what debt meant, what wealth meant, or what kind of life was possible?</p>
            <p>Most of us never stop to ask.</p>
            <p>We simply inherit those beliefs from our parents, teachers, friends, culture, experiences, victories, failures, fears, and circumstances. Over time those beliefs become habits. Habits become decisions. Decisions become our lives.</p>
            <p>RootWise exists to help you examine those decisions—not to tell you what to think, but to help you understand <em>why</em> you think the way you do.</p>
          </article>

          <article className="grove-copy-card">
            <h2>What Is RootWise?</h2>
            <p>RootWise is an educational journey designed to build your <strong>financial decision capacity</strong>.</p>
            <p>That means strengthening your ability to understand situations, recognize tradeoffs, ask better questions, evaluate consequences, and make decisions that fit the life <em>you</em> want to build.</p>
            <p>This isn&apos;t about memorizing financial terms.</p>
            <p>It isn&apos;t about becoming rich overnight.</p>
            <p>It isn&apos;t about telling you which investments to buy, which bank to choose, or which path is &quot;correct.&quot;</p>
            <p>Instead, we help you develop the thinking behind every financial decision.</p>
            <p>Because better decisions don&apos;t happen by accident.</p>
            <p>They grow from deeper understanding.</p>
          </article>

          <article className="grove-copy-card">
            <h2>Why We Teach Through Stories</h2>
            <p>Facts are easy to forget.</p>
            <p>Stories stay with us.</p>
            <p>Throughout your journey you&apos;ll meet Ivy, Eli, Sage, and others whose lives mirror the choices many of us face every day.</p>
            <p>Their victories won&apos;t always be glamorous.</p>
            <p>Their mistakes won&apos;t always be obvious.</p>
            <p>Sometimes they&apos;ll make the same decision you would have made.</p>
            <p>Sometimes they&apos;ll make the one you wish you had.</p>
            <p>Their stories aren&apos;t there to entertain you.</p>
            <p>They&apos;re there to help you recognize pieces of your own story.</p>
            <p>Because when you can recognize a pattern, you can begin to change it.</p>
          </article>

          <article className="grove-copy-card">
            <h2>What Success Looks Like</h2>
            <p>Success at RootWise isn&apos;t measured by your income.</p>
            <p>It isn&apos;t measured by your credit score.</p>
            <p>It isn&apos;t measured by how much money you have in the bank.</p>
            <p>Those things matter, but they aren&apos;t the destination.</p>
            <p>Our definition of success is much simpler.</p>
            <p className="grove-statement">Success is having more choices tomorrow than you have today.</p>
            <p className="grove-success-line">It&apos;s understanding the tradeoffs before making the decision.</p>
            <p className="grove-success-line">It&apos;s replacing fear with confidence.</p>
            <p className="grove-success-line">It&apos;s recognizing when emotion is making the decision instead of wisdom.</p>
            <p className="grove-success-line">It&apos;s being able to explain <em>why</em> you&apos;re making a financial choice—not just hoping it works out.</p>
            <p>Every Root you complete is designed to strengthen that ability.</p>
            <p>Little by little.</p>
            <p>Decision by decision.</p>
            <p>Choice by choice.</p>
          </article>

          <article className="grove-copy-card">
            <h2>Our Promise</h2>
            <p>We won&apos;t pretend life is simple.</p>
            <p>There isn&apos;t one right answer for every person.</p>
            <p>People have different goals, responsibilities, values, and circumstances.</p>
            <p>Because of that, RootWise won&apos;t tell you what your future should look like.</p>
            <p>Instead, we&apos;ll give you the tools to think clearly enough to build it yourself.</p>
            <p>We&apos;ll ask questions.</p>
            <p>We&apos;ll challenge assumptions.</p>
            <p>We&apos;ll explore ideas from different angles.</p>
            <p>We&apos;ll show you the hidden costs, the hidden opportunities, and the tradeoffs that often go unnoticed.</p>
            <p>Our goal isn&apos;t to create people who can repeat financial facts.</p>
            <p>Our goal is to create people who can think independently when money is involved.</p>
          </article>

          <article className="grove-copy-card grove-closing">
            <h2>The Grove</h2>
            <p>The Grove is where every journey begins.</p>
            <p>Trees don&apos;t grow overnight.</p>
            <p>Neither do people.</p>
            <p>Strong roots are invisible.</p>
            <p>You won&apos;t see them from the outside, but they&apos;re the reason a tree can survive storms that would topple weaker ones.</p>
            <p>The same is true of financial wisdom.</p>
            <p>The stronger your roots become, the more choices you&apos;ll have when life changes.</p>
            <p>That&apos;s why we&apos;re here.</p>
            <p>Not simply to teach you about money.</p>
            <p>But to help you build a life where your choices become larger than your circumstances.</p>
            <strong>Welcome to The Grove.<br />Let&apos;s begin.</strong>
          </article>
        </div>
      </div>
    </section>
  );
}

export function ApprovedLandingArtwork({ className = '' }) {
  // End the approved artwork at the bottom edge of its ornate certificate frame.
  const visibleHeight = 748;

  return (
    <>
      <svg
        className={`approved-landing-artwork ${className}`}
        viewBox={`0 0 862 ${visibleHeight}`}
        preserveAspectRatio="xMidYMin meet"
        role="img"
        aria-label="RootWise approved landing page featuring Sage, money, the financial journey, and the RootWise foundation"
      >
        <defs>
          <linearGradient id="landing-paper-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ead6bd" />
            <stop offset="0.52" stopColor="#e3cdb3" />
            <stop offset="1" stopColor="#dac3a8" />
          </linearGradient>
          <linearGradient id="landing-paper-copy" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4e7d6" />
            <stop offset="0.55" stopColor="#f0e3d2" />
            <stop offset="1" stopColor="#ecdecc" />
          </linearGradient>
          <linearGradient id="landing-quote-paper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f3eadc" />
            <stop offset="1" stopColor="#ece0cf" />
          </linearGradient>
          <filter id="landing-paper-feather" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>
        <image href="/rootwise-approved-home.png" width="862" height="1824" />
        <rect x="354" y="23" width="468" height="47" fill="url(#landing-paper-top)" />
        <text x="588" y="51" textAnchor="middle" fill="#66533c" fontFamily="Georgia, serif" fontSize="11" fontWeight="700" letterSpacing="2.2">FINANCIAL WISDOM, ROOTED IN REAL LIFE</text>
        <rect x="122" y="119" width="270" height="332" rx="5" fill="url(#landing-paper-copy)" filter="url(#landing-paper-feather)" />
        <rect x="112" y="451" width="280" height="61" fill="url(#landing-paper-copy)" filter="url(#landing-paper-feather)" />
        <rect x="621" y="292" width="160" height="114" rx="5" fill="url(#landing-quote-paper)" />
      </svg>
      <GroveIntroduction />
    </>
  );
}
