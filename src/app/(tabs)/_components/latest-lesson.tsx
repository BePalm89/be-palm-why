import { createClient } from "@/lib/supabase/server";

export default async function LatestLesson() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lessons")
    .select("title")
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(error);
    return <p>Errore nel caricare i dati</p>;
  }

  if (!data) {
    return <p>Nessuna lezione</p>;
  }

  return <h2>{data.title}</h2>;
}
