import type { CategorySlug } from '@/constants/categories';
import type { CategoryDefinition } from '@/constants/categories';
import type {
  CategoryRow,
  ExpenseRow,
  GoalRow,
  IncomeRow,
  InsightRow,
  ProfileRow,
  SubscriptionRow,
} from '@/types/supabase';

export type { CategoryDefinition };

export type Category = CategoryRow;
export type Expense = ExpenseRow;
export type Income = IncomeRow;
export type Goal = GoalRow;
export type Subscription = SubscriptionRow;
export type Insight = InsightRow;
export type Profile = ProfileRow;

/** An expense joined with its category, as returned by the Phase 2 queries. */
export type ExpenseWithCategory = Expense & {
  category: Category | null;
  category_slug: CategorySlug | null;
};

/** Payload for the interceptor flow that a Shortcut can pre-fill. */
export type QuickAddDraft = {
  amount?: number;
  merchant?: string;
  note?: string;
  category?: CategorySlug;
  source: Expense['source'];
};

/** Shape of the `spendshield://add` deep link after parsing. */
export type AddExpenseDeepLink = {
  amount: number | null;
  merchant: string | null;
  note: string | null;
  category: CategorySlug | null;
};