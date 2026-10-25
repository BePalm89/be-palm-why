import { useId } from "react";

export default function EmptyLessonCard() {
  const titleId = useId();

  return (
    <section
      className="flex flex-col gap-3.5 rounded-3xl bg-ink p-5.5 text-white"
      aria-labelledby={titleId}
    >
      <h2
        className="font-heading text-[28px] leading-[1.15] font-bold"
        id={titleId}
      >
        Non hai ancora nessuna lezione
      </h2>
      <p className="text-base leading-[1.45] text-card-text">
        La prima arriverà qui appena sarà pronta.
      </p>
    </section>
  );
}
