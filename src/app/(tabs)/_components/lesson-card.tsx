import { ArrowRight } from "lucide-react";
import Link from "next/link";

export type LessonCardProps = {
  id: string;
  title: string;
  subject: string | null;
  step: number | null;
  mainIdea: string | null;
};

const LessonCard = ({
  id,
  title,
  subject,
  step,
  mainIdea,
}: LessonCardProps) => {
  const label = badgeLabel(subject, step);
  return (
    <article className="flex flex-col gap-3.5 rounded-3xl bg-ink p-[22px] text-white">
      {label && (
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-badge-bg px-2.5 py-[5px] text-[13px] font-bold text-badge-text">
            {label}
          </span>
        </div>
      )}

      <p className="text-sm tracking-[0.08em] text-card-muted uppercase">
        La lezione di oggi
      </p>

      <h2 className="font-heading text-[28px] leading-[1.15] font-bold">
        {title}
      </h2>

      {mainIdea && (
        <p className="text-base leading-[1.45] text-card-text">{mainIdea}</p>
      )}

      <Link
        href={`/lessons/${id}`}
        className="flex items-center gap-2 self-start rounded-[14px] bg-white px-5 py-[13px] font-bold text-ink"
      >
        Inizia a leggere
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </article>
  );
};

const badgeLabel = (subject: string | null, step: number | null): string => {
  if (step === null && !subject) return "";

  if (!subject) return `Tappa ${step}`;

  if (step === null) return subject;

  return `${subject} · Tappa ${step}`;
};

export default LessonCard;
