-- 0002_create_cards_and_explanations.sql
-- Domande di ripasso (cards) e spiegazioni "Ora tocca a te" (explanations).

-- 0. PREREQUISITO -------------------------------------------------------
-- Le chiavi esterne composte (lesson_id, user_id) richiedono che
-- la coppia (id, user_id) sia unica in lessons.

alter table public.lessons
  add constraint lessons_id_user_id_key unique (id, user_id);


-- 1. CARDS --------------------------------------------------------------

create table public.cards (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid()
              references auth.users (id) on delete cascade,
  lesson_id   uuid not null,

  -- 'review' = domanda di ripasso, 'flashcard' = flashcard
  kind        text not null check (kind in ('review', 'flashcard')),
  question    text not null,
  answer      text not null,

  -- Prossimo ripasso: colonna vera perché ci filtriamo ("da ripassare oggi").
  -- Default now() = una card nuova è subito da studiare.
  due         timestamptz not null default now(),

  -- Resto dello stato FSRS (stabilità, difficoltà, ripassi...), letto e
  -- scritto in blocco da ts-fsrs. Null = card mai ripassata.
  fsrs_state  jsonb,

  created_at  timestamptz not null default now(),

  -- La card può puntare solo a una lezione dello stesso utente
  foreign key (lesson_id, user_id)
    references public.lessons (id, user_id) on delete cascade,

  -- Niente doppioni: rende sicuro rilanciare l'import
  unique (lesson_id, question)
);

-- "Le mie card da ripassare, dalla più urgente"
create index cards_user_due_idx on public.cards (user_id, due);
-- Postgres non indicizza da solo le chiavi esterne: serve per le cancellazioni a cascata
create index cards_lesson_idx on public.cards (lesson_id);

alter table public.cards enable row level security;

create policy "Users can read own cards"
  on public.cards for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert own cards"
  on public.cards for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update own cards"
  on public.cards for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete own cards"
  on public.cards for delete
  to authenticated
  using ((select auth.uid()) = user_id);


-- 2. EXPLANATIONS -------------------------------------------------------

create table public.explanations (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid()
              references auth.users (id) on delete cascade,
  lesson_id   uuid not null,

  transcript  text not null,       -- la tua spiegazione, trascritta
  audio_path  text,                -- percorso del file in Supabase Storage (non il file)

  -- Risposta strutturata dell'LLM-as-judge:
  -- { centrato: [...], manca: [...], errori: [...], frase_modello: "..." }
  feedback    jsonb,
  score       smallint check (score between 1 and 4),

  created_at  timestamptz not null default now(),

  foreign key (lesson_id, user_id)
    references public.lessons (id, user_id) on delete cascade
);

-- "Le mie spiegazioni di questa lezione, dalla più recente"
create index explanations_user_lesson_idx
  on public.explanations (user_id, lesson_id, created_at desc);

alter table public.explanations enable row level security;

-- Nessuna policy di UPDATE: una spiegazione è un registro, non si modifica.

create policy "Users can read own explanations"
  on public.explanations for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert own explanations"
  on public.explanations for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can delete own explanations"
  on public.explanations for delete
  to authenticated
  using ((select auth.uid()) = user_id);