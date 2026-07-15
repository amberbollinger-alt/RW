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
