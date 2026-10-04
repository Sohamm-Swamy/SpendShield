/**
 * Hand-maintained mirror of supabase/migrations/001_init.sql.
 * Regenerate with `npx supabase gen types typescript --linked > types/supabase.ts`
 * once the Supabase CLI is linked; the shape below is what Phase 1 expects.
 */

export type SpenderType = 'saver' | 'balanced' | 'spender' | 'impulse';

export type ExpenseSource = 'manual' | 'interceptor' | 'quick_add' | 'recurring';

export type PaymentMethod = 'upi' | 'cash' | 'card' | 'netbanking' | 'other';

export type SubscriptionCycle = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export type InsightType = 'observation' | 'warning' | 'win' | 'challenge';

export type ProfileRow = {
  id: string;
  monthly_income: number;
  city: string | null;
  occupation: string | null;
  spender_type: SpenderType;
  created_at: string;
  updated_at: string;
};

export type CategoryRow = {
  id: string;
  name: string;
  icon: string;
  color: string;
  monthly_budget: number | null;
  is_default: boolean;
  created_at: string;
};

export type ExpenseRow = {
  id: string;
  amount: number;
  category_id: string | null;
  note: string | null;
  merchant: string | null;
  is_need: boolean;
  payment_method: PaymentMethod;
  date: string;
  time: string;
  source: ExpenseSource;
  created_at: string;
};

export type IncomeRow = {
  id: string;
  amount: number;
  source: string;
  date: string;
  is_recurring: boolean;
  created_at: string;
};

export type GoalRow = {
  id: string;
  name: string;
  target: number;
  current: number;
  color: string;
  target_date: string | null;
  created_at: string;
};

export type SubscriptionRow = {
  id: string;
  name: string;
  amount: number;
  cycle: SubscriptionCycle;
  next_due: string | null;
  category_id: string | null;
  is_active: boolean;
  created_at: string;
};

export type InsightRow = {
  id: string;
  type: InsightType;
  content: string;
  week_start: string | null;
  is_read: boolean;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: ProfileRow;
        Insert: Omit<ProfileRow, 'created_at' | 'updated_at'> &
          Partial<Pick<ProfileRow, 'created_at' | 'updated_at'>>;
        Update: Partial<ProfileRow>;
      };
      categories: {
        Row: CategoryRow;
        Insert: Omit<CategoryRow, 'id' | 'created_at'> &
          Partial<Pick<CategoryRow, 'id' | 'created_at'>>;
        Update: Partial<CategoryRow>;
      };
      expenses: {
        Row: ExpenseRow;
        Insert: Omit<ExpenseRow, 'id' | 'created_at'> &
          Partial<Pick<ExpenseRow, 'id' | 'created_at'>>;
        Update: Partial<ExpenseRow>;
      };
      income: {
        Row: IncomeRow;
        Insert: Omit<IncomeRow, 'id' | 'created_at'> &
          Partial<Pick<IncomeRow, 'id' | 'created_at'>>;
        Update: Partial<IncomeRow>;
      };
      goals: {
        Row: GoalRow;
        Insert: Omit<GoalRow, 'id' | 'created_at'> &
          Partial<Pick<GoalRow, 'id' | 'created_at'>>;
        Update: Partial<GoalRow>;
      };
      subscriptions: {
        Row: SubscriptionRow;
        Insert: Omit<SubscriptionRow, 'id' | 'created_at'> &
          Partial<Pick<SubscriptionRow, 'id' | 'created_at'>>;
        Update: Partial<SubscriptionRow>;
      };
      insights: {
        Row: InsightRow;
        Insert: Omit<InsightRow, 'id' | 'created_at'> &
          Partial<Pick<InsightRow, 'id' | 'created_at'>>;
        Update: Partial<InsightRow>;
      };
    };
  };
};