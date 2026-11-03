import { Lesson } from "./subject-section";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { formatDayMonth } from "@/lib/utils/date";

export default function LessonRow({ step, title, date, id }: Lesson) {
  const dateOnly = formatDayMonth(date);
  return (
    <Link href={`/lessons/${id}`}>
      <div>
        <p>
          <span className="sr-only">
            Tappa numero {step ?? "non assegnata"}
          </span>
          <span aria-hidden="true">{step ?? "–"}</span>
        </p>
        <p>{title}</p>
        <p>{dateOnly}</p>
        <ChevronRight size={20} aria-hidden="true" />
      </div>
    </Link>
  );
}
