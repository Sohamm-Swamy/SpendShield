import { categorySlugs, type CategorySlug } from '@/constants/categories';
import type { AddExpenseDeepLink } from '@/types';

export const APP_SCHEME = 'spendshield';

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

function parseAmount(value: string | null): number | null {
  if (value === null) return null;
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ''));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function parseCategory(value: string | null): CategorySlug | null {
  if (value === null) return null;
  const normalized = value.trim().toLowerCase();
  return (categorySlugs as readonly string[]).includes(normalized)
    ? (normalized as CategorySlug)
    : null;
}

/**
 * Normalises the params Expo Router hands a route into the shape
 * `app/add.tsx` expects.
 *
 * The interceptor Shortcut appends a query string, e.g.
 * `spendshield://add?amount=450&merchant=Swiggy&category=food`
 */
export function parseAddExpenseParams(params: RawParams): AddExpenseDeepLink {
  return {
    amount: parseAmount(first(params.amount)),
    merchant: first(params.merchant),
    note: first(params.note),
    category: parseCategory(first(params.category)),
  };
}