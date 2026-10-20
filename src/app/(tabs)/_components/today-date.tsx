import { formatDate, isToday } from "@/lib/utils/date";
import { connection } from "next/server";

const TodayDate = async () => {
  // Rende il componente dinamico: la data deve essere quella della visita,
  // non quella della build (cacheComponents).
  await connection();

  const today = formatDate(new Date());

  console.log(isToday("2026-10-13", new Date("2026-10-19T22:30:00Z")));

  return <p className="text-[15px] text-muted">{today}</p>;
};

export default TodayDate;
