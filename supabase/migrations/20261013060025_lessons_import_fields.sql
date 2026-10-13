-- Campi necessari per importare il JSON del quaderno.

-- 0. Via la lezione di prova: non esiste nel quaderno e non avrebbe uno slug.
delete from public.lessons where title = 'Lezione di prova';

-- 1. Nuove colonne
alter table public.lessons
  add column slug          text,   -- id della lezione nel quaderno
  add column subject_label text,   -- nome leggibile della materia
  add column note          text,   -- es. "Ricostruita il 10/10/2026..."
  add column deep_dive     jsonb;  -- approfondimento: { titolo, testo, domanda_aperta }

-- Lo slug è obbligatorio e unico per utente: è la chiave per l'upsert
alter table public.lessons alter column slug set not null;
alter table public.lessons
  add constraint lessons_user_slug_key unique (user_id, slug);

-- 2. La tappa è un numero (1, 2, 3...), non un testo
alter table public.lessons
  alter column step type smallint using step::smallint;