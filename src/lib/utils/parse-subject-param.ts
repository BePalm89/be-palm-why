export const parseSubjectParam = (
  param: string | string[] | undefined,
  allowedList: string[],
): string | null => {
  if (param === undefined || Array.isArray(param)) return null;

  const normalizedParam = param.toLowerCase().trim();

  if (allowedList.includes(normalizedParam)) return normalizedParam;

  return null;
};
