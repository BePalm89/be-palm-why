-- Chunk delle lezioni con embeddings, per la ricerca semantica (RAG di "Chiedi").

-- 1. ESTENSIONE ---------------------------------------------------------
-- pgvector: aggiunge il tipo "vector" e la distanza del coseno (<=>).
-- In uno schema separato, come consiglia Supabase.

create extension if not exists vector with schema extensions;


-- 2. TABELLA ------------------------------------------------------------

create table public.lesson_chunks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid()
              references auth.users (id) on delete cascade,
  lesson_id   uuid not null,

  chunk_index smallint not null,   -- posizione del chunk nella lezione (0, 1, 2...)
  content     text not null,       -- il testo del chunk (~300 parole)

  -- 384 numeri prodotti da multilingual-e5-small
  embedding   extensions.vector(384) not null,

  -- Testo normalizzato in italiano per la ricerca per parole.
  -- Colonna calcolata: Postgres la aggiorna da solo quando cambia content.
  fts         tsvector generated always as (to_tsvector('italian', content)) stored,

  created_at  timestamptz not null default now(),

  -- Il chunk può appartenere solo a una lezione dello stesso utente
  foreign key (lesson_id, user_id)
    references public.lessons (id, user_id) on delete cascade,

  -- Ogni lezione ha un solo chunk per posizione
  unique (lesson_id, chunk_index)
);


-- 3. INDICI -------------------------------------------------------------

-- Ricerca per significato (distanza del coseno)
create index lesson_chunks_embedding_idx
  on public.lesson_chunks using hnsw (embedding extensions.vector_cosine_ops);

-- Ricerca per parole (indice invertito)
create index lesson_chunks_fts_idx
  on public.lesson_chunks using gin (fts);

-- Chiave esterna (per le cancellazioni a cascata)
create index lesson_chunks_lesson_idx
  on public.lesson_chunks (lesson_id);


-- 4. ROW LEVEL SECURITY -------------------------------------------------
-- Nessuna policy di UPDATE: i chunk non si modificano,
-- si cancellano e si rigenerano quando la lezione cambia.

alter table public.lesson_chunks enable row level security;

create policy "Users can read own chunks"
  on public.lesson_chunks for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert own chunks"
  on public.lesson_chunks for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can delete own chunks"
  on public.lesson_chunks for delete
  to authenticated
  using ((select auth.uid()) = user_id);