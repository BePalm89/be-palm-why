const TIME_ZONE = "Europe/Madrid";

export const formatDate = (date: Date): string => {
  const formatted = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TIME_ZONE,
  }).format(date);

  const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  return capitalized;
};

export const isToday = (lessonDate: string, now: Date): boolean => {
  const todayInMadrid = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
  }).format(new Date(now));

  console.log(todayInMadrid);

  return lessonDate === todayInMadrid;
};
