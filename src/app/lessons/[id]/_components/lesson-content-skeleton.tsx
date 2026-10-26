export default function LessonContentSkeleton() {
  return (
    <div
      role="status"
      className="flex animate-pulse flex-col gap-4 px-6 pt-2 pb-4"
    >
      <span className="sr-only">Caricamento della lezione</span>
      <div className="h-7.5 w-44 rounded-full bg-ink/10"></div>
      <div className="h-9 w-4/5 rounded-lg bg-ink/10"></div>
      <div className="h-9 w-3/5 rounded-lg bg-ink/10"></div>
      <div className="h-28 rounded-2xl bg-ink/10"></div>
    </div>
  );
}
