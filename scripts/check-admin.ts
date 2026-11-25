import { supabaseAdmin } from "./lib/supabase-admin";

async function main() {
  const { count, error } = await supabaseAdmin
    .from("lessons")
    .select("*", { count: "exact", head: true });

  console.log({ count, error });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
