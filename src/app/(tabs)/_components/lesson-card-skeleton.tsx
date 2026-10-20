export default function LessonCardSkeleton() {
  return (
    <article
      role="status"
      aria-label="Caricamento della lezione"
      className="flex animate-pulse flex-col gap-3.5 rounded-3xl bg-ink p-5.5"
    >
      <div
        aria-hidden="true"
        className="h-[29.5px] w-36 rounded-full bg-white/15"
      />

      <div aria-hidden="true" className="h-5 w-40 rounded bg-white/10" />

      <div aria-hidden="true" className="flex flex-col gap-1">
        <div className="h-8 w-full rounded bg-white/15" />
      </div>

      <div aria-hidden="true" className="flex flex-col gap-1.5">
        <div className="h-5 w-full rounded bg-white/10" />
        <div className="h-5 w-4/5 rounded bg-white/10" />
      </div>

      <div
        aria-hidden="true"
        className="h-12.5 w-46.25 rounded-[14px] bg-white/15"
      />
    </article>
  );
}
