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

export function ApprovedLandingArtwork({ className = '' }) {
  // End the approved artwork at the bottom edge of its ornate certificate frame.
  const visibleHeight = 748;

  return (
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
  );
}
