const formatDate = (date: Date): string => {
  const formatted = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Madrid",
  }).format(date);

  const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  return capitalized;
};

export default formatDate;
