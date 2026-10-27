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

  if (!paths.length) return <p>Non hai ancora nessun percorso</p>;

  return (
    <section aria-labelledby={id}>
      <div className="flex justify-between">
        <h2 id={id}>I tuoi percorsi</h2>
        <p>tappe fatte</p>
      </div>
      <ul>
        {paths.map((path) => (
          <li key={path.subject}>
            <p>
              {path.label}{" "}
              <span>
                {path.done} / {path.total}
              </span>
            </p>
            {path.percent === null ? (
              <p>Dati non corretti</p>
            ) : (
              <div
                role="progressbar"
                aria-label={path.label}
                aria-valuenow={path.done}
                aria-valuemin={0}
                aria-valuemax={path.total}
                aria-valuetext={`${path.done} di ${path.total} tappe`}
              ></div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
