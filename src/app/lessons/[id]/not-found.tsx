import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-4 px-5 text-ink">
      <h1 className="font-heading text-[30px] leading-[1.1] font-bold">
        Lezione non trovata
      </h1>
      <p className="text-[17px] leading-[1.55] text-muted">
        Il link potrebbe essere sbagliato, oppure questa lezione non esiste più.
      </p>
      <Link
        href="/"
        className="mt-2 flex min-h-14 items-center justify-center rounded-2xl bg-ink font-bold text-white"
      >
        Torna alla lezione di oggi
      </Link>
    </main>
  );
}
