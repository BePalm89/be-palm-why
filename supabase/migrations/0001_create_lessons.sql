-- 0001_create_lessons.sql
-- Tabella delle lezioni di cultura generale, una riga per lezione.
-- Il formato ricalca il JSON esportato dal quaderno.

-- 1. TABELLA ------------------------------------------------------------

create table public.lessons (
  -- Identificativo casuale (non progressivo: non rivela quante righe esistono)
  id          uuid primary key default gen_random_uuid(),

  -- Proprietario della lezione. Chiave esterna verso gli utenti di Supabase:
  -- default = utente loggato; se l'utente viene cancellato, spariscono anche le sue lezioni.
  user_id     uuid not null default auth.uid()
              references auth.users (id) on delete cascade,

  date        date not null,
  subject     text not null,          -- materia (Storia, Scienza, Arte...)
  step        text,                   -- tappa del percorso
  title       text not null,
  main_idea   text,                   -- l'idea principale in una frase
  body        text not null,          -- il testo completo della lezione
  kid_version text,                   -- la versione "per Luca"
  fun_facts   text[] not null default '{}',  -- curiosità; array vuoto invece di null
  next_step   text,
  type        text,

  -- Data e ora con fuso orario
  created_at  timestamptz not null default now(),

  -- Niente doppioni: rende sicuro rilanciare lo script di import
  unique (user_id, date, title)
);

-- 2. INDICE -------------------------------------------------------------
-- Velocizza la query più frequente: "le mie lezioni, dalla più recente".

create index lessons_user_date_idx on public.lessons (user_id, date desc);

-- 3. ROW LEVEL SECURITY -------------------------------------------------
-- Da qui in poi: tutto negato, salvo ciò che le policy permettono.

alter table public.lessons enable row level security;

-- 4. POLICY ---------------------------------------------------------------
-- Ogni utente loggato vede e modifica SOLO le proprie lezioni.
-- using       = quali righe esistenti puoi toccare
-- with check  = come devono essere le righe nuove o modificate
-- (select auth.uid()) tra parentesi = calcolato una volta per query, non per riga

create policy "Users can read own lessons"
  on public.lessons for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert own lessons"
  on public.lessons for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update own lessons"
  on public.lessons for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete own lessons"
  on public.lessons for delete
  to authenticated
  using ((select auth.uid()) = user_id);