import { readFile } from "node:fs/promises";
import { z } from "zod";
import { supabaseAdmin } from "./lib/supabase-admin";
import { notebookExportSchema, type NotebookLesson } from "./lib/notebook-schema";

// Traduce una lezione del quaderno in una riga della tabella lessons
function toRow(lesson: NotebookLesson, userId: string) {
  return {
    user_id: userId,
    slug: lesson.id,
    date: lesson.data,
    subject: lesson.materia,
    subject_label: lesson.materia_nome,
    step: lesson.tappa,
    type: lesson.tipo,
    title: lesson.titolo,
    main_idea: lesson.idea_principale ?? null,
    body: lesson.testo,
    kid_version: lesson.bambino?.trim() || null,
    fun_facts: lesson.curiosita,
    next_step: lesson.prossima_tappa ?? null,
    note: lesson.nota ?? null,
    deep_dive: lesson.approfondimento ?? null,
  };
}

async function main() {
  const filePath = process.argv[2];
  const userId = process.env.IMPORT_USER_ID;

  if (!filePath) {
    throw new Error("Uso: npm run import:lessons -- data/lezioni.json");
  }
  if (!userId) {
    throw new Error("Manca IMPORT_USER_ID in .env.local");
  }

  // 1. Leggi e valida
  const raw = JSON.parse(await readFile(filePath, "utf-8"));
  const parsed = notebookExportSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("Il JSON non ha il formato atteso:\n");
    console.error(z.prettifyError(parsed.error));
    process.exit(1);
  }

  // 2. Trasforma
  const rows = parsed.data.lezioni.map((lesson) => toRow(lesson, userId));

  // 3. Inserisci o aggiorna
  const { data, error } = await supabaseAdmin
    .from("lessons")
    .upsert(rows, { onConflict: "user_id,slug" })
    .select("slug, title");

  if (error) throw error;

  console.log(`Importate ${data.length} lezioni:`);
  for (const row of data) {
    console.log(`  ✓ ${row.slug} — ${row.title}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});