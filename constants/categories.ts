/**
 * The 11 default categories. These mirror the seed data in
 * supabase/migrations/001_init.sql — keep the two in sync.
 *
 * `colorClass` / `tintClass` / `borderClass` / `dimClass` exist because
 * Tailwind can only see class names that appear as literal strings somewhere
 * in `content` paths. Building them dynamically (`` `bg-cat-${slug}` ``)
 * silently produces no styles, so they are stored pre-built here instead.
 */

export const categorySlugs = [
  'food',
  'bills',
  'transport',
  'shopping',
  'entertainment',
  'health',
  'education',
  'savings',
  'subscriptions',
  'gifts',
  'coffee',
] as const;

export type CategorySlug = (typeof categorySlugs)[number];

export type CategoryDefinition = {
  slug: CategorySlug;
  name: string;
  icon: string;
  color: string;
  colorClass: string;
  tintClass: string;
  borderClass: string;
  dimClass: string;
};

export const categories: Record<CategorySlug, CategoryDefinition> = {
  food: {
    slug: 'food',
    name: 'Food',
    icon: '🍔',
    color: '#F59E0B',
    colorClass: 'bg-cat-food',
    tintClass: 'text-cat-food',
    borderClass: 'border-cat-food',
    dimClass: 'bg-cat-food/15',
  },
  bills: {
    slug: 'bills',
    name: 'Bills',
    icon: '🧾',
    color: '#3B82F6',
    colorClass: 'bg-cat-bills',
    tintClass: 'text-cat-bills',
    borderClass: 'border-cat-bills',
    dimClass: 'bg-cat-bills/15',
  },
  transport: {
    slug: 'transport',
    name: 'Transport',
    icon: '🚗',
    color: '#06B6D4',
    colorClass: 'bg-cat-transport',
    tintClass: 'text-cat-transport',
    borderClass: 'border-cat-transport',
    dimClass: 'bg-cat-transport/15',
  },
  shopping: {
    slug: 'shopping',
    name: 'Shopping',
    icon: '🛍️',
    color: '#EC4899',
    colorClass: 'bg-cat-shopping',
    tintClass: 'text-cat-shopping',
    borderClass: 'border-cat-shopping',
    dimClass: 'bg-cat-shopping/15',
  },
  entertainment: {
    slug: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    color: '#A855F7',
    colorClass: 'bg-cat-entertainment',
    tintClass: 'text-cat-entertainment',
    borderClass: 'border-cat-entertainment',
    dimClass: 'bg-cat-entertainment/15',
  },
  health: {
    slug: 'health',
    name: 'Health',
    icon: '💊',
    color: '#14B8A6',
    colorClass: 'bg-cat-health',
    tintClass: 'text-cat-health',
    borderClass: 'border-cat-health',
    dimClass: 'bg-cat-health/15',
  },
  education: {
    slug: 'education',
    name: 'Education',
    icon: '📚',
    color: '#8B5CF6',
    colorClass: 'bg-cat-education',
    tintClass: 'text-cat-education',
    borderClass: 'border-cat-education',
    dimClass: 'bg-cat-education/15',
  },
  savings: {
    slug: 'savings',
    name: 'Savings',
    icon: '🐖',
    color: '#22C55E',
    colorClass: 'bg-cat-savings',
    tintClass: 'text-cat-savings',
    borderClass: 'border-cat-savings',
    dimClass: 'bg-cat-savings/15',
  },
  subscriptions: {
    slug: 'subscriptions',
    name: 'Subscriptions',
    icon: '🔁',
    color: '#F97316',
    colorClass: 'bg-cat-subscriptions',
    tintClass: 'text-cat-subscriptions',
    borderClass: 'border-cat-subscriptions',
    dimClass: 'bg-cat-subscriptions/15',
  },
  gifts: {
    slug: 'gifts',
    name: 'Gifts',
    icon: '🎁',
    color: '#6366F1',
    colorClass: 'bg-cat-gifts',
    tintClass: 'text-cat-gifts',
    borderClass: 'border-cat-gifts',
    dimClass: 'bg-cat-gifts/15',
  },
  coffee: {
    slug: 'coffee',
    name: 'Coffee',
    icon: '☕',
    color: '#D97706',
    colorClass: 'bg-cat-coffee',
    tintClass: 'text-cat-coffee',
    borderClass: 'border-cat-coffee',
    dimClass: 'bg-cat-coffee/15',
  },
};

export const categoryList: CategoryDefinition[] = categorySlugs.map(
  (slug) => categories[slug]
);

export function getCategory(slug: CategorySlug): CategoryDefinition {
  return categories[slug];
}