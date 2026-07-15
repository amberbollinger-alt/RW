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
  const visibleHeight = 1306;

  return (
    <svg
      className={`approved-landing-artwork ${className}`}
      viewBox={`0 0 862 ${visibleHeight}`}
      preserveAspectRatio="xMidYMin meet"
      role="img"
      aria-label="RootWise approved landing page with Sage, the financial journey, and four destination links at the bottom"
    >
      <defs>
        <linearGradient id="landing-paper-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ead6bd" />
          <stop offset="0.52" stopColor="#e3cdb3" />
          <stop offset="1" stopColor="#dac3a8" />
        </linearGradient>
        <linearGradient id="landing-paper-action" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6d2b9" />
          <stop offset="0.55" stopColor="#dfcbb2" />
          <stop offset="1" stopColor="#dbc5aa" />
        </linearGradient>
      </defs>
      <image href="/rootwise-approved-home.png" width="862" height="1824" />
      <rect x="354" y="23" width="468" height="47" fill="url(#landing-paper-top)" />
      <text x="588" y="51" textAnchor="middle" fill="#66533c" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" letterSpacing="2.2">FINANCIAL WISDOM, ROOTED IN REAL LIFE</text>
      <rect x="112" y="451" width="278" height="61" fill="url(#landing-paper-action)" />
      <text x="251" y="486" textAnchor="middle" fill="#173a25" fontFamily="Georgia, serif" fontSize="16" fontStyle="italic">Clarity grows one root at a time.</text>
    </svg>
  );
}
