import { z } from "zod";

const questionSchema = z.object({
  domanda: z.string().min(1),
  risposta: z.string().min(1),
});

const flashcardSchema = z.object({
  fronte: z.string().min(1),
  retro: z.string().min(1),
  tipo: z.enum(["fatto", "perche", "collegamento"]),
});

const deepDiveSchema = z.object({
  titolo: z.string().min(1),
  testo: z.string().min(1),
  domanda_aperta: z.string().optional(),
});

export const lessonSchema = z.object({
  id: z.string().min(1),
  data: z.iso.date(),
  materia: z.string().min(1),
  materia_nome: z.string().min(1),
  tappa: z.number().int().positive().nullable(),
  tipo: z.string().min(1),
  titolo: z.string().min(1),
  idea_principale: z.string().nullish(),
  testo: z.string().min(1),
  bambino: z.string().optional(),
  curiosita: z.array(z.string()).default([]),
  domande: z.array(questionSchema).default([]),
  flashcard: z.array(flashcardSchema).default([]),
  prossima_tappa: z.string().nullish(),
  nota: z.string().optional(),
  approfondimento: deepDiveSchema.optional(),
});

export const notebookExportSchema = z.object({
  esportato_il: z.string(),
  schema: z.literal(1),
  lezioni: z.array(lessonSchema),
});

export type NotebookLesson = z.infer<typeof lessonSchema>;