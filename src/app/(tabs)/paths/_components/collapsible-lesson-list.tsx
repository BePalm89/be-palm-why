"use client";

import { useId, useState } from "react";
import LessonRow from "./lesson-row";
import type { LessonItem } from "./subject-section";
import { ChevronDown } from "lucide-react";

export type CollapsibleLessonListProps = {
  lessons: LessonItem[];
  color: string | null;
};

const VISIBLE_LESSONS = 3;

export default function CollapsibleLessonList({
  lessons,
  color,
}: CollapsibleLessonListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = useId();

  const visibleLessons = isExpanded
    ? lessons
    : lessons.slice(0, VISIBLE_LESSONS);

  return (
    <div className="rounded-[20px] bg-white px-4.5">
      <ul
        className="divide-y divide-track rounded-[20px] bg-white px-4.5"
        id={panelId}
      >
        {visibleLessons.map((lesson) => (
          <li key={lesson.id}>
            <LessonRow {...lesson} color={color} />
          </li>
        ))}
      </ul>
      {lessons.length > VISIBLE_LESSONS && (
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-1.5 rounded-b-[20px] border-t border-track text-[15px] font-bold text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {isExpanded ? "Mostra meno" : `Mostra tutte (${lessons.length})`}
          <ChevronDown
            size={18}
            aria-hidden="true"
            className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
}
