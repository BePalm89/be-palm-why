import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const isLoggedIn = Boolean(data?.claims);

  if (!isLoggedIn) {
    return NextResponse.json({ error: "Non autenticata" }, { status: 401 });
  }

  const subject = request.nextUrl.searchParams.getAll("subject");
}
