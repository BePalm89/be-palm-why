import { useId } from "react";

export type PathProgressItem = {
  subject: string;
  label: string;
  color: string | null;
  done: number;
  total: number;
  percent: number | null;
};

export type PathProgressCardProps = { paths: PathProgressItem[] };

export default function PathsProgressCard({ paths }: PathProgressCardProps) {
  const id = useId();

  if (!paths.length)
    return (
      <p className="rounded-[20px] bg-white px-4.5 py-4 text-[15px] text-muted">
        Non hai ancora nessun percorso
      </p>
    );

  return (
    <section aria-labelledby={id} className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h2 id={id} className="font-heading text-xl font-bold">
          I tuoi percorsi
        </h2>
        <p className="text-sm text-muted">tappe fatte</p>
      </div>

      <ul className="flex flex-col gap-3.25 rounded-[20px] bg-white px-4.5 py-4">
        {paths.map((path) => (
          <li key={path.subject} className="flex flex-col gap-1.5">
            <p className="flex justify-between text-[15px]">
              <span className="font-bold">{path.label}</span>
              <span className="text-muted">
                {path.done} / {path.total}
              </span>
            </p>

            {path.percent === null ? (
              <p className="text-sm font-bold text-idea-label">
                Dati non corretti
              </p>
            ) : (
              <div
                role="progressbar"
                aria-label={path.label}
                aria-valuenow={path.done}
                aria-valuemin={0}
                aria-valuemax={path.total}
                aria-valuetext={`${path.done} di ${path.total} tappe`}
                className="h-2 overflow-hidden rounded-full bg-track"
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${path.percent}%`,
                    backgroundColor: path.color ?? "var(--color-ink)",
                  }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
