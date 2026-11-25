import { type ReactNode, useId } from "react";

type Variant = "highlight" | "dashed";

type LabeledBoxProps = {
  label: string;
  variant: Variant;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<Variant, { box: string; text: string }> = {
  highlight: {
    box: "rounded-2xl bg-idea-bg px-4.5 py-4",
    text: "text-idea-label",
  },
  dashed: {
    box: "rounded-2xl border-2 border-dashed border-card-muted px-4.5 py-3.5",
    text: "text-muted",
  },
};

export default function LabeledBox({
  label,
  variant,
  children,
}: LabeledBoxProps) {
  const labelId = useId();

  const classes = VARIANT_CLASSES[variant];

  return (
    <section
      aria-labelledby={labelId}
      className={`flex flex-col gap-1.5 ${classes.box}`}
    >
      <h2
        className={`font-body text-[13px] font-bold tracking-[0.06em] uppercase ${classes.text}`}
        id={labelId}
      >
        {label}
      </h2>
      {children}
    </section>
  );
}
