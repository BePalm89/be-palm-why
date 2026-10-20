import formatDate from "@/lib/utils/format-date";
import { connection } from "next/server";

const TodayDate = async () => {
  // Rende il componente dinamico: la data deve essere quella della visita,
  // non quella della build (cacheComponents).
  await connection();

  const today = formatDate(new Date());

  return <p className="text-[15px] text-muted">{today}</p>;
};

export default TodayDate;
