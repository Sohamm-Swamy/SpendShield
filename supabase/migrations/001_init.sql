-- SpendShield initial schema
-- Single-user app. Money is NUMERIC(12,2) rather than bare DECIMAL so PostgREST
-- returns JSON numbers instead of strings.

-- Profile ------------------------------------------------------------------
CREATE TABLE profile (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    monthly_income NUMERIC(12,2) NOT NULL DEFAULT 0,
    city TEXT,
    occupation TEXT,
    spender_type TEXT DEFAULT 'balanced',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories ---------------------------------------------------------------
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    monthly_budget NUMERIC(12,2),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expenses -----------------------------------------------------------------
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount NUMERIC(12,2) NOT NULL,
    category_id UUID REFERENCES categories(id),
    note TEXT,
    merchant TEXT,
    is_need BOOLEAN DEFAULT TRUE,
    payment_method TEXT DEFAULT 'upi',
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    time TIME NOT NULL DEFAULT CURRENT_TIME,
    source TEXT DEFAULT 'manual',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Income -------------------------------------------------------------------
CREATE TABLE income (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount NUMERIC(12,2) NOT NULL,
    source TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_recurring BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Goals --------------------------------------------------------------------
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    target NUMERIC(12,2) NOT NULL,
    current NUMERIC(12,2) DEFAULT 0,
    color TEXT DEFAULT '#22C55E',
    target_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions ------------------------------------------------------------
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    cycle TEXT DEFAULT 'monthly',
    next_due DATE,
    category_id UUID REFERENCES categories(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insights cache -----------------------------------------------------------
CREATE TABLE insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    content TEXT NOT NULL,
    week_start DATE,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes ------------------------------------------------------------------
CREATE INDEX expenses_date_idx ON expenses(date DESC);
CREATE INDEX expenses_category_id_idx ON expenses(category_id);
CREATE INDEX income_date_idx ON income(date DESC);
CREATE INDEX subscriptions_next_due_idx ON subscriptions(next_due) WHERE is_active;

-- updated_at maintenance ---------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profile_set_updated_at
    BEFORE UPDATE ON profile
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- Auto-create a profile row whenever a new auth user signs up --------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profile (id) VALUES (NEW.id) ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- Seed the 11 default categories (mirrors constants/categories.ts) ----------
INSERT INTO categories (name, icon, color, is_default) VALUES
    ('Food',          '🍔', '#F59E0B', TRUE),
    ('Bills',         '🧾', '#3B82F6', TRUE),
    ('Transport',     '🚗', '#06B6D4', TRUE),
    ('Shopping',      '🛍️', '#EC4899', TRUE),
    ('Entertainment', '🎬', '#A855F7', TRUE),
    ('Health',        '💊', '#14B8A6', TRUE),
    ('Education',     '📚', '#8B5CF6', TRUE),
    ('Savings',       '🐖', '#22C55E', TRUE),
    ('Subscriptions', '🔁', '#F97316', TRUE),
    ('Gifts',         '🎁', '#6366F1', TRUE),
    ('Coffee',        '☕', '#D97706', TRUE);

-- RLS ----------------------------------------------------------------------
-- NOTE: these policies are permissive by design (single-user, throwaway anon
-- key). They apply to every role including `anon`, so the anon key grants
-- full read/write on all tables. Tighten before exposing this DB to anything.

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE income ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_authenticated" ON profile FOR ALL USING (true);
CREATE POLICY "allow_all_authenticated" ON categories FOR ALL USING (true);
CREATE POLICY "allow_all_authenticated" ON expenses FOR ALL USING (true);
CREATE POLICY "allow_all_authenticated" ON income FOR ALL USING (true);
CREATE POLICY "allow_all_authenticated" ON goals FOR ALL USING (true);
CREATE POLICY "allow_all_authenticated" ON subscriptions FOR ALL USING (true);
CREATE POLICY "allow_all_authenticated" ON insights FOR ALL USING (true);