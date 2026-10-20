export type LessonCardProps = {
  id: string;
  title: string;
  subject: string | null;
  step: number | null;
  mainIdea: string | null;
};

const LessonCard = ({ title, subject, step, mainIdea }: LessonCardProps) => {
  const label = badgeLabel(subject, step);
  return (
    <div>
      {label && <span>{label}</span>}
      <p>Lezione di oggi</p>
      <h2>{title}</h2>
      <p>{mainIdea}</p>
    </div>
  );
};

const badgeLabel = (subject: string | null, step: number | null): string => {
  if (step === null && !subject) return "";

  if (!subject) return `Tappa ${step}`;

  if (step === null) return subject;

  return `${subject} · Tappa ${step}`;
};

export default LessonCard;
