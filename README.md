# Why? (Perché?)

> A daily general-knowledge companion: lessons become a searchable notebook, spaced-repetition quizzes and an AI assistant that answers **only from my own lessons**, with citations.

🔗 **Live:** [be-palm-why.vercel.app](https://be-palm-why.vercel.app) · 🚧 **Status:** in progress (v1)

## Why I'm building this

Every morning I study a short general-knowledge lesson: history, science, art, geography. I want to remember what I learn, and one day answer my son's endless _"why?"_ questions.

This app turns those lessons into something I can reread, review and talk to. It is also my portfolio project for AI application engineering, built in short sessions with a newborn in my arms.

## Features

**v1: The notebook**

- Import lessons from a structured JSON export
- "Today" screen: today's lesson and progress by subject
- Read, search and filter lessons by subject
- Installable PWA (works from the iPhone home screen)

**v2: AI that makes me study**

- Quizzes and flashcards scheduled with spaced repetition (FSRS)
- **Ask**: natural-language questions answered only from my lessons, citing lesson and date (RAG)
- **Your turn**: explain a lesson out loud; speech-to-text, then feedback on what I got right and what's missing (LLM-as-judge)

**v3: Polish**

- Text-to-speech for listening on walks
- Stats: streaks, strongest and weakest subjects
- Public demo with sample data

## Tech stack

| Layer             | Choice                                                     |
| ----------------- | ---------------------------------------------------------- |
| Frontend          | Next.js (App Router), TypeScript, Tailwind CSS             |
| Mobile            | Installable PWA                                            |
| Database & auth   | Supabase (Postgres, Auth, Storage) with Row Level Security |
| Semantic search   | pgvector                                                   |
| LLM               | Groq via the Vercel AI SDK (provider-agnostic)             |
| Embeddings        | Transformers.js (`multilingual-e5-small`), in the browser  |
| Speech-to-text    | Web Speech API                                             |
| Spaced repetition | `ts-fsrs`                                                  |
| Testing & evals   | Vitest + a custom evaluation set                           |
| Deploy            | Vercel                                                     |

## AI engineering highlights

- **RAG with citations**: hybrid search (vector + Postgres full-text), answers grounded only in retrieved chunks, explicit "I don't know" when the answer isn't there
- **LLM-as-judge**: structured feedback with a 1–4 score on spoken explanations
- **Evaluation**: a 20–30 question test set re-run on every prompt change, measuring correctness, citation accuracy and appropriate refusals
- **Security**: API keys server-side only, lesson content passed to prompts as data (not instructions) to mitigate prompt injection, rate limiting on every AI route

## Roadmap

- [x] Project setup: Next.js, TypeScript, Tailwind, Vercel deploy
- [ ] Data: Supabase schema with RLS, lesson import script
- [ ] Notebook: Today and Lesson screens, search, PWA (end of v1)
- [ ] Quiz: spaced-repetition review
- [ ] Ask: chunking, embeddings, RAG with citations
- [ ] Your turn: voice explanations and AI feedback
- [ ] Evaluation results, demo video

## Getting started

```bash
git clone https://github.com/BePalm89/be-palm-why.git
cd be-palm-why
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Author

**Claudia Palmerini**: frontend developer moving into AI engineering, with an MSc in Cybersecurity.
[GitHub](https://github.com/BePalm89)
