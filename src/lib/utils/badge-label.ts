export const badgeLabel = (
  subject: string | null,
  step: number | null,
): string => {
  if (step === null && !subject) return "";

  if (!subject) return `Tappa ${step}`;

  if (step === null) return subject;

  return `${subject} · Tappa ${step}`;
};
