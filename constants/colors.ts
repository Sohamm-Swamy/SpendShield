/**
 * Mission Control palette. Mirrors tailwind.config.js — keep the two in sync.
 * Pure black (#000) and pure white (#FFF) are deliberately absent.
 */

export const colors = {
  void: '#06080F',
  surface: '#0A0F1E',
  elevated: '#111827',
  hover: '#1A2332',
  border: '#1E293B',

  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  textMuted: '#475569',

  accent: '#3B82F6',
  accentGlow: '#60A5FA',
  accentDim: '#1E3A5F',

  catFood: '#F59E0B',
  catBills: '#3B82F6',
  catTransport: '#06B6D4',
  catShopping: '#EC4899',
  catEntertainment: '#A855F7',
  catHealth: '#14B8A6',
  catEducation: '#8B5CF6',
  catSavings: '#22C55E',
  catSubscriptions: '#F97316',
  catGifts: '#6366F1',
  catCoffee: '#D97706',

  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  streak: '#F97316',
} as const;

export type ColorName = keyof typeof colors;
export type PaletteColor = (typeof colors)[ColorName];