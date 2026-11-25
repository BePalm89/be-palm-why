export const parseSubjectQuery = (
  queryParam: string[],
  allowedList: string[],
): { ok: true; subject: string | null } | { ok: false; error: string } => {
  if (queryParam.length === 0) return { ok: true, subject: null };

  if (queryParam.length === 1) {
    const normalizedQuery = queryParam[0].toLowerCase().trim();

    return { ok: true, subject: normalizedQuery };
  }

  if (queryParam.length > 1) {
    return { ok: false, error: "Specifica una sola materia" };
  }
};
