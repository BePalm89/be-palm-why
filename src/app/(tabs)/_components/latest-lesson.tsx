import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

export default async function LatestLesson() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("lessons").select("id, title");

  return <p> lezioni</p>;
}
