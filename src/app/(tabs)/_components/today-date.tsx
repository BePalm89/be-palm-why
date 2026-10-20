import { formatDate, isToday } from "@/lib/utils/date";
import { connection } from "next/server";

export default async function TodayDate() {
  // Rende il componente dinamico: la data deve essere quella della visita,
  // non quella della build (cacheComponents).
  await connection();

  const today = formatDate(new Date());

  return <p className="text-[15px] text-muted">{today}</p>;
}
