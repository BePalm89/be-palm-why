import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { parseSubjectParam } from "@/lib/utils/parse-subject-param";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const isLoggedIn = Boolean(data?.claims);

  if (!isLoggedIn) {
    return NextResponse.json({ error: "Non autenticata" }, { status: 401 });
  }

  const subject = request.nextUrl.searchParams.getAll("subject");

  if (subject.length > 1) {
    return NextResponse.json(
      { error: "Specifica una sola materia" },
      { status: 400 },
    );
  }

  let subjectFilter: string | null = null;

  if (subject.length === 1) {
    const pathsResponse = await supabase.from("paths").select("subject");

    if (pathsResponse.error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }

    const allowList = pathsResponse.data.map((path) => path.subject);

    const parsedSubjectParam = parseSubjectParam(subject[0], allowList);

    if (parsedSubjectParam === null) {
      return NextResponse.json(
        { error: "Materia non valida" },
        { status: 400 },
      );
    }

    subjectFilter = parsedSubjectParam;
  }

  let query = supabase
    .from("lessons")
    .select("id, date, subject, step, title")
    .order("date", { ascending: false });

  if (subjectFilter) {
    query = query.eq("subject", subjectFilter);
  }

  const { data: lessons, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }

  return NextResponse.json(lessons);
}
