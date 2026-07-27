export function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function withUniqueSlugs(rootSlug, lessons) {
  const used = new Set();
  return lessons.map((lesson, index) => {
    const base = slugify(lesson.slug || lesson.title || lesson.id || `lesson-${index + 1}`) || `lesson-${index + 1}`;
    let slug = base;
    let suffix = 2;
    while (used.has(slug)) {
      slug = `${base}-${suffix}`;
      suffix += 1;
    }
    used.add(slug);
    const order = Number(lesson.order) || index + 1;
    return Object.freeze({
      ...lesson,
      id: String(lesson.id || `${rootSlug}-${order}`),
      order,
      slug,
      title: String(lesson.title || `Lesson ${order}`),
      published: lesson.published !== false,
      route: `/roots/${rootSlug}/lessons/${slug}`,
    });
  });
}

export function createRootRegistry(catalog, lessonSources = {}, coreQuestions = {}) {
  return catalog.map((definition) => {
    const lessons = withUniqueSlugs(definition.slug, lessonSources[definition.slug] || []);
    return Object.freeze({
      ...definition,
      title: definition.title || definition.label,
      displayTitle: definition.title || definition.label,
      coreQuestion: coreQuestions[definition.slug] || '',
      lessons: Object.freeze(lessons),
      lessonCount: lessons.filter((lesson) => lesson.published).length,
      overviewRoute: `/roots/${definition.slug}`,
    });
  });
}

export function validateRootRegistry(registry) {
  const errors = [];
  if (registry.length !== 11) errors.push(`Expected 11 Roots; found ${registry.length}.`);
  const rootSlugs = new Set();
  registry.forEach((root, index) => {
    if (root.id !== index + 1) errors.push(`Root IDs must be sequential; expected ${index + 1}, found ${root.id}.`);
    if (!root.slug) errors.push(`Root ${root.id} has no slug.`);
    if (!root.purpose?.trim()) errors.push(`Root ${root.id} has no purpose.`);
    if (rootSlugs.has(root.slug)) errors.push(`Duplicate Root slug: ${root.slug}.`);
    rootSlugs.add(root.slug);
    const lessonSlugs = new Set();
    root.lessons.filter((lesson) => lesson.published).forEach((lesson) => {
      if (!lesson.slug) errors.push(`${root.label} has a published lesson without a slug.`);
      if (lessonSlugs.has(lesson.slug)) errors.push(`${root.label} has duplicate lesson slug ${lesson.slug}.`);
      if (!lesson.route || lesson.route === '#' || !lesson.route.startsWith('/')) errors.push(`${root.label} has an invalid lesson href.`);
      lessonSlugs.add(lesson.slug);
    });
    if (!root.overviewRoute || root.overviewRoute === '#') errors.push(`${root.label} has an invalid overview href.`);
  });
  return errors;
}

export function rootActionForProgress(root, progress) {
  const published = root.lessons.filter((lesson) => lesson.published);
  if (!published.length) return null;
  if (progress.complete) return { label: 'Review Root', href: root.overviewRoute, kind: 'review' };
  if (!progress.started) return { label: 'Start Root', href: published[0].route, kind: 'start' };
  const activeOrder = progress.activeOrder || 1;
  const fromCurrent = published.find((lesson) => lesson.order >= activeOrder && !progress.completedIds.includes(lesson.id));
  const next = fromCurrent || published.find((lesson) => !progress.completedIds.includes(lesson.id)) || published[0];
  return { label: 'Continue Root', href: next.route, kind: 'continue' };
}

export function extractRootFiveLessonIndex(markdown) {
  return String(markdown || '').split(/^# LESSON [^\n]+$/m).slice(1).map((raw, index) => ({
    id: `bridge-${index + 1}`,
    order: index + 1,
    number: String(index + 1).padStart(2, '0'),
    title: raw.match(/^\s*##\s+(.+)$/m)?.[1]?.trim() || `Lesson ${index + 1}`,
    published: true,
  }));
}
