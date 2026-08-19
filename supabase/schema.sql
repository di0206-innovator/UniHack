-- ====================================================================
-- FORGE AI — SUPABASE PRODUCTION DATABASE SCHEMA
-- Execute this SQL script in your Supabase SQL Editor (https://app.supabase.com)
-- ====================================================================

-- 1. Create Profiles Table (Linked to Supabase Auth Users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    organization TEXT DEFAULT 'Enterprise Catalog Division',
    role TEXT DEFAULT 'steward',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    sku TEXT NOT NULL,
    name TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    category TEXT NOT NULL,
    short_description TEXT,
    description TEXT,
    review_status TEXT DEFAULT 'REVIEW_REQUIRED', -- READY, REVIEW_REQUIRED, CONFLICT
    reviewer_notes TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by TEXT,
    confidence_score REAL DEFAULT 0,
    completeness_score REAL DEFAULT 0,
    commerce_readiness_score REAL DEFAULT 0,
    raw_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Product Specifications Table
CREATE TABLE IF NOT EXISTS public.specifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    original_value TEXT,
    override_value TEXT,
    unit TEXT,
    confidence REAL DEFAULT 0,
    evidence_quote TEXT,
    line_number INT,
    page_number INT,
    status TEXT DEFAULT 'extracted', -- extracted, overridden, verified
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Validation Issues Table
CREATE TABLE IF NOT EXISTS public.validation_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    field_key TEXT NOT NULL,
    issue_type font TEXT NOT NULL, -- CONFLICT, MISSING, ANOMALY
    severity TEXT DEFAULT 'MEDIUM', -- HIGH, MEDIUM, LOW
    message TEXT NOT NULL,
    evidence_quote TEXT,
    candidate_values JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'open', -- open, resolved, ignored
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Immutable Audit Events Table
CREATE TABLE IF NOT EXISTS public.audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- approve, reject, edit_attribute, select_alternative
    actor TEXT NOT NULL,
    field_key TEXT,
    previous_value TEXT,
    new_value TEXT,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create Knowledge Graph Relationships Table
CREATE TABLE IF NOT EXISTS public.knowledge_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    target_entity_name TEXT NOT NULL,
    relationship_type TEXT NOT NULL, -- manufactured_by, belongs_to, made_from, compatible_with, used_in, certified_by
    target_category TEXT,
    confidence REAL DEFAULT 0.9,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.validation_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_relationships ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products & specifications for catalog explorer
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to products" ON public.products FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to specifications" ON public.specifications FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to specifications" ON public.specifications FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to validation_issues" ON public.validation_issues FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to validation_issues" ON public.validation_issues FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to audit_events" ON public.audit_events FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to audit_events" ON public.audit_events FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to knowledge_relationships" ON public.knowledge_relationships FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to knowledge_relationships" ON public.knowledge_relationships FOR ALL USING (auth.role() = 'authenticated');

-- ====================================================================
-- AUTOMATIC USER PROFILE CREATION TRIGGER
-- ====================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
