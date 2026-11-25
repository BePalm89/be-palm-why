-- 20261027090000_create_paths.sql
-- Percorsi di studio: una riga per materia per utente.
-- Le "tappe fatte" NON stanno qui: si contano dalle lezioni.

-- 1. TABELLA ------------------------------------------------------------

create table public.paths (
  -- Proprietario del percorso (stesso schema di lessons)
  user_id     uuid not null default auth.uid()
              references auth.users (id) on delete cascade,

  subject     text not null,                                -- stesso codice di lessons.subject
  label       text not null,                                -- nome leggibile ("Storia contemporanea")
  total_steps smallint not null check (total_steps > 0),    -- tappe previste dal percorso
  color       text,                                         -- es. '#8A3410'; null → colore di fallback nel codice

  created_at  timestamptz not null default now(),

  primary key (user_id, subject)
);

-- 2. ROW LEVEL SECURITY -------------------------------------------------

alter table public.paths enable row level security;

-- 3. POLICY ---------------------------------------------------------------
-- Per ora solo lettura: i percorsi li inserisci tu (SQL o script di import).

create policy "Users can read own paths"
  on public.paths for select
  to authenticated
  using ((select auth.uid()) = user_id);