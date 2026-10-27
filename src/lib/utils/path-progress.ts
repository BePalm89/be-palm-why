export const pathProgress = (
  totalSteps: number,
  steps: (number | null)[],
): { done: number; percent: number | null } => {
  const uniqueSteps = new Set(steps);

  uniqueSteps.delete(null);

  const done = uniqueSteps.size;
  if (done > totalSteps) return { done, percent: null };

  const percent = Math.floor((done / totalSteps) * 100);
  return { done, percent };
};
