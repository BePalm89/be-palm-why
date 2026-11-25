const ROWS_PER_SECTION = [2, 1, 1];

export default function LessonsBySubjectSkeleton() {
  return (
    <div role="status" className="flex animate-pulse flex-col gap-5">
      <span className="sr-only">Caricamento delle tue lezioni</span>

      {ROWS_PER_SECTION.map((rows, sectionIndex) => (
        <div
          key={sectionIndex}
          aria-hidden="true"
          className="flex flex-col gap-2.5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-2.5 rounded-full bg-ink/10" />
              <div className="h-6 w-32 rounded bg-ink/10" />
            </div>
            <div className="h-4 w-10 rounded bg-ink/10" />
          </div>

          <div className="divide-y divide-track rounded-[20px] bg-white px-4.5">
            {Array.from({ length: rows }, (_, rowIndex) => (
              <div
                key={rowIndex}
                className="flex min-h-15 items-center gap-3.5 py-2"
              >
                <div className="size-9 shrink-0 rounded-[10px] bg-ink/10" />
                <div className="flex grow flex-col gap-1.5">
                  <div className="h-4 w-3/4 rounded bg-ink/10" />
                  <div className="h-3.5 w-20 rounded bg-ink/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
