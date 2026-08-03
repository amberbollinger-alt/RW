export function routeFromPath(pathname, hash = '') {
  const path = String(pathname || '').replace(/^\/+|\/+$/g, '');
  if (['privacy', 'terms', 'accessibility', 'faq', 'contact'].includes(path)) return path;
  if (path === 'my-journey') return 'legacy-my-journey';
  if (path === 'tools') return 'tools';
  if (path === 'tools/dictionary') return 'tool-dictionary';
  const toolMatch = path.match(/^tools\/([^/]+)$/);
  if (toolMatch) return `tool:${toolMatch[1]}`;
  const lessonMatch = path.match(/^roots\/([^/]+)\/lessons\/([^/]+)$/);
  if (lessonMatch) return `root-lesson:${lessonMatch[1]}:${lessonMatch[2]}`;
  const rootMatch = path.match(/^roots\/([^/]+)$/);
  if (rootMatch) return `root-overview:${rootMatch[1]}`;
  if (path === 'grove') return 'dashboard';
  if (path === 'crossing') return 'crossing';
  const hashRoute = String(hash || '').replace(/^#\/?/, '');
  if (hashRoute === 'my-journey') return 'legacy-my-journey';
  if (hashRoute === 'tools') return 'legacy-tools';
  return hashRoute || path || 'home';
}

export function destinationForPage(page) {
  const value = String(page || 'home');
  if (value.startsWith('/')) return value;
  if (value === 'home') return '/';
  if (['privacy', 'terms', 'accessibility', 'faq', 'contact'].includes(value)) return `/${value}`;
  if (value === 'dashboard') return '/grove';
  if (value === 'crossing') return '/crossing';
  if (value === 'tools') return '/tools';
  if (value.startsWith('roots/')) return `/${value}`;
  return `/#/${value}`;
}
