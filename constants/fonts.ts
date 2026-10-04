/**
 * All monetary values use the bundled Space Mono face, registered as
 * `SpaceMono` in app/_layout.tsx and exposed to Tailwind as `font-mono`.
 */

export const fonts = {
  mono: 'SpaceMono',
} as const;

export const fontSizes = {
  caption: 11,
  label: 13,
  body: 15,
  title: 17,
  amount: 22,
  display: 34,
  hero: 48,
} as const;