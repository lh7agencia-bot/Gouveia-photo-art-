export function scrollToSection(sectionId: string): void {
  const cleanId = sectionId.replace(/^#/, '');
  const element = document.getElementById(cleanId);
  if (!element) {
    return;
  }

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const headerOffset = 72;
  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  const targetTop = Math.max(0, elementTop - headerOffset);

  window.scrollTo({
    top: targetTop,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
}
