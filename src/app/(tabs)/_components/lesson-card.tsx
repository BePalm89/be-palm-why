import badgeLabel from "@/lib/utils/badge-label";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useId } from "react";

export type LessonCardProps = {
  id: string;
  title: string;
  subject: string | null;
  step: number | null;
  mainIdea: string | null;
  isFromToday: boolean;
};

const LessonCard = ({
  id,
  title,
  subject,
  step,
  mainIdea,
  isFromToday,
}: LessonCardProps) => {
  const label = badgeLabel(subject, step);

  const titleId = useId();

  return (
    <article
      className="flex flex-col gap-3.5 rounded-3xl bg-ink p-5.5 text-white"
      aria-labelledby={titleId}
    >
      {label && (
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-badge-bg px-2.5 py-1.25 text-[13px] font-bold text-badge-text">
            {label}
          </span>
        </div>
      )}

      <p className="text-sm tracking-[0.08em] text-card-muted uppercase">
        {isFromToday ? "La lezione di oggi" : "La tua ultima lezione"}
      </p>

      <h2
        className="font-heading text-[28px] leading-[1.15] font-bold"
        id={titleId}
      >
        {title}
      </h2>

      {mainIdea && (
        <p className="text-base leading-[1.45] text-card-text">{mainIdea}</p>
      )}

      <Link
        href={`/lessons/${id}`}
        className="flex items-center gap-2 self-start rounded-[14px] bg-white px-5 py-3.25 font-bold text-ink"
      >
        Inizia a leggere
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </article>
  );
};

export default LessonCard;
