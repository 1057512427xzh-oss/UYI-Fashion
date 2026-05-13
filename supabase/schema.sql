create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  company_name text,
  contact_name text,
  contact_phone text,
  contact_email text,
  business_type text,
  business_model jsonb,
  employee_count text,
  sku_count text,
  monthly_order_count text,
  top_pain_points jsonb,
  answers jsonb,
  status text default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists survey_responses_created_at_idx on public.survey_responses (created_at desc);
create index if not exists survey_responses_company_name_idx on public.survey_responses using gin (company_name gin_trgm_ops);
create index if not exists survey_responses_contact_name_idx on public.survey_responses using gin (contact_name gin_trgm_ops);
create index if not exists survey_responses_business_model_idx on public.survey_responses using gin (business_model);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_survey_responses_updated_at on public.survey_responses;
create trigger set_survey_responses_updated_at
before update on public.survey_responses
for each row
execute function public.set_updated_at();

-- This app writes and reads through Next.js server routes using SUPABASE_SERVICE_ROLE_KEY.
-- Do not expose the service role key in frontend code.
alter table public.survey_responses enable row level security;

drop policy if exists "No direct anonymous access" on public.survey_responses;
create policy "No direct anonymous access"
on public.survey_responses
for all
using (false)
with check (false);
