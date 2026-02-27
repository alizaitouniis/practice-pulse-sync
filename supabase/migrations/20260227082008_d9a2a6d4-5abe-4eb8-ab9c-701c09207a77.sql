
-- Profiles table for provider users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'provider' CHECK (role IN ('provider', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insurance Aging data
CREATE TABLE public.insurance_aging (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  insurance TEXT NOT NULL,
  bucket_0_30 NUMERIC NOT NULL DEFAULT 0,
  bucket_31_60 NUMERIC NOT NULL DEFAULT 0,
  bucket_61_90 NUMERIC NOT NULL DEFAULT 0,
  bucket_91_120 NUMERIC NOT NULL DEFAULT 0,
  bucket_120_plus NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.insurance_aging ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Providers see own insurance aging" ON public.insurance_aging FOR SELECT USING (auth.uid() = provider_id);
CREATE POLICY "Admins see all insurance aging" ON public.insurance_aging FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Patient Aging data
CREATE TABLE public.patient_aging (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  bucket TEXT NOT NULL,
  balance NUMERIC NOT NULL DEFAULT 0,
  pct NUMERIC NOT NULL DEFAULT 0,
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.patient_aging ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Providers see own patient aging" ON public.patient_aging FOR SELECT USING (auth.uid() = provider_id);
CREATE POLICY "Admins see all patient aging" ON public.patient_aging FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Payer Mix data
CREATE TABLE public.payer_mix (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  value NUMERIC NOT NULL DEFAULT 0,
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.payer_mix ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Providers see own payer mix" ON public.payer_mix FOR SELECT USING (auth.uid() = provider_id);
CREATE POLICY "Admins see all payer mix" ON public.payer_mix FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Revenue Trends
CREATE TABLE public.revenue_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  charges NUMERIC NOT NULL DEFAULT 0,
  payments NUMERIC NOT NULL DEFAULT 0,
  adjustments NUMERIC NOT NULL DEFAULT 0,
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.revenue_trends ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Providers see own revenue trends" ON public.revenue_trends FOR SELECT USING (auth.uid() = provider_id);
CREATE POLICY "Admins see all revenue trends" ON public.revenue_trends FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Denial Analytics
CREATE TABLE public.denials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  reason TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  amount NUMERIC NOT NULL DEFAULT 0,
  trend TEXT NOT NULL DEFAULT 'stable' CHECK (trend IN ('up', 'down', 'stable')),
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.denials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Providers see own denials" ON public.denials FOR SELECT USING (auth.uid() = provider_id);
CREATE POLICY "Admins see all denials" ON public.denials FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- KPI Summaries
CREATE TABLE public.kpi_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_charges NUMERIC NOT NULL DEFAULT 0,
  payments_collected NUMERIC NOT NULL DEFAULT 0,
  adjustments NUMERIC NOT NULL DEFAULT 0,
  outstanding_ar NUMERIC NOT NULL DEFAULT 0,
  collection_rate NUMERIC NOT NULL DEFAULT 0,
  monthly_revenue NUMERIC NOT NULL DEFAULT 0,
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.kpi_summaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Providers see own KPIs" ON public.kpi_summaries FOR SELECT USING (auth.uid() = provider_id);
CREATE POLICY "Admins see all KPIs" ON public.kpi_summaries FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
