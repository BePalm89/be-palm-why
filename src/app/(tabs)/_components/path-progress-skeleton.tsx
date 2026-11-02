const ROWS = 8;

export default function PathsProgressSkeleton() {
  return (
    <div role="status" className="flex animate-pulse flex-col gap-3">
      <span className="sr-only">Caricamento dei tuoi percorsi</span>

      <div aria-hidden="true" className="flex items-center justify-between">
        <div className="h-7 w-36 rounded bg-ink/10" />
        <div className="h-5 w-20 rounded bg-ink/10" />
      </div>

      <div
        aria-hidden="true"
        className="flex flex-col gap-3.25 rounded-[20px] bg-white px-4.5 py-4"
      >
        {Array.from({ length: ROWS }, (_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <div className="h-[22.5px] w-32 rounded bg-ink/10" />
              <div className="h-[22.5px] w-10 rounded bg-ink/10" />
            </div>
            <div className="h-2 rounded-full bg-track" />
          </div>
        ))}
      </div>
    </div>
  );
}
