-- ============================================================================
-- GYMOS MULTI-TENANT SAAS DATABASE SCHEMA & RLS POLICIES (SUPABASE / POSTGRESQL)
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TENANTS TABLE (GIMNASIOS)
CREATE TABLE IF NOT EXISTS public.gyms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'Plan Mensual Élite',
  payment_status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. USER PROFILES TABLE (PERFILES CON ROLES: ADMIN, COACH, CLIENT)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'coach', 'client')) DEFAULT 'client',
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  target_goal TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. ROUTINES TABLE (RUTINAS & BIOMECÁNICA POR CLIENTE)
CREATE TABLE IF NOT EXISTS public.routines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  split_type TEXT NOT NULL DEFAULT '4days',
  exercises JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. DIETS TABLE (MOTOR DE NUTRICIÓN CON GRAMAJES)
CREATE TABLE IF NOT EXISTS public.diets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  diet_type TEXT NOT NULL DEFAULT 'omnivore',
  calories INT NOT NULL DEFAULT 2000,
  protein INT NOT NULL DEFAULT 160,
  carbs INT NOT NULL DEFAULT 200,
  fat INT NOT NULL DEFAULT 60,
  meals JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. CHECKINS TABLE (LOGROS VERIFICABLES POR TIEMPO)
CREATE TABLE IF NOT EXISTS public.checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  week_number INT NOT NULL DEFAULT 1,
  weight_kg NUMERIC(5, 2) NOT NULL,
  waist_cm NUMERIC(5, 2) NOT NULL,
  adherence_pct INT NOT NULL DEFAULT 90,
  press_load_kg NUMERIC(5, 2) DEFAULT 0,
  squat_load_kg NUMERIC(5, 2) DEFAULT 0,
  achievements JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES - ISOLATION BY TENANT (GYM_ID)
-- ============================================================================

ALTER TABLE public.gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;

-- Helper Function to Fetch Current User Gym ID
CREATE OR REPLACE FUNCTION public.get_auth_gym_id()
RETURNS UUID AS $$
  SELECT gym_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- DROP EXISTING POLICIES TO PREVENT DUPLICATION ERRORS
DROP POLICY IF EXISTS "Gyms selection policy" ON public.gyms;
DROP POLICY IF EXISTS "Profiles tenant policy" ON public.profiles;
DROP POLICY IF EXISTS "Routines tenant policy" ON public.routines;
DROP POLICY IF EXISTS "Diets tenant policy" ON public.diets;
DROP POLICY IF EXISTS "Checkins tenant policy" ON public.checkins;

-- CONSOLIDATED TENANT POLICIES (FOR ALL OPERATIONS: SELECT, INSERT, UPDATE)
CREATE POLICY "Gyms selection policy" ON public.gyms
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Profiles tenant policy" ON public.profiles
  FOR ALL TO authenticated USING (gym_id = public.get_auth_gym_id()) WITH CHECK (gym_id = public.get_auth_gym_id());

CREATE POLICY "Routines tenant policy" ON public.routines
  FOR ALL TO authenticated USING (gym_id = public.get_auth_gym_id()) WITH CHECK (gym_id = public.get_auth_gym_id());

CREATE POLICY "Diets tenant policy" ON public.diets
  FOR ALL TO authenticated USING (gym_id = public.get_auth_gym_id()) WITH CHECK (gym_id = public.get_auth_gym_id());

CREATE POLICY "Checkins tenant policy" ON public.checkins
  FOR ALL TO authenticated USING (gym_id = public.get_auth_gym_id()) WITH CHECK (gym_id = public.get_auth_gym_id());

-- ============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
RETURNS TRIGGER AS $$
DECLARE
  default_gym_id UUID;
BEGIN
  SELECT id INTO default_gym_id FROM public.gyms LIMIT 1;
  IF default_gym_id IS NULL THEN
    INSERT INTO public.gyms (name, plan) VALUES ('GymOS Central Gym', 'Licencia GymOS Pro') RETURNING id INTO default_gym_id;
  END IF;

  INSERT INTO public.profiles (id, gym_id, role, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'gym_id')::UUID, default_gym_id),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Nuevo Usuario'),
    NEW.email,
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_signup();
