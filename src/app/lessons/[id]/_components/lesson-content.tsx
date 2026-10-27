import { badgeLabel } from "@/lib/utils/badge-label";
import LabeledBox from "./labeled-box";
import Markdown from "react-markdown";

export type LessonContentProps = {
  title: string;
  subject: string | null;
  step: number | null;
  mainIdea: string | null;
  body: string;
  kidVersion: string | null;
};

export default function LessonContent({
  title,
  subject,
  step,
  mainIdea,
  body,
  kidVersion,
}: LessonContentProps) {
  const label = badgeLabel(subject, step);

  return (
    <article className="flex flex-col gap-4 px-6 pt-2 pb-4">
      {label && (
        <div className="flex items-center gap-2">
          <span
            data-testid="lesson-badge"
            className="self-start rounded-full bg-badge-bg px-2.5 py-1.25 text-[13px] font-bold text-badge-text"
          >
            {label}
          </span>
        </div>
      )}

      <h1 className="font-heading text-[32px] leading-[1.1] font-bold">
        {title}
      </h1>
      {mainIdea && (
        <LabeledBox label="L'idea principale" variant="highlight">
          <p className="text-[17px] leading-[1.45] font-bold">{mainIdea}</p>
        </LabeledBox>
      )}
      {body && <Markdown>{body}</Markdown>}
      {kidVersion && (
        <LabeledBox label="Come lo spiegheresti a Luca" variant="dashed">
          <p className="text-[16px] leading-[1.45]">{kidVersion}</p>
        </LabeledBox>
      )}
    </article>
  );
}
