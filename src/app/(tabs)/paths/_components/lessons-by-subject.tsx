import { createClient } from "@/lib/supabase/server";
import SubjectSection from "./subject-section";
import { groupLessonsBySubject } from "@/lib/utils/group-lessons-by-subject";
import { pathProgress } from "@/lib/utils/path-progress";
import { sortLessonsByStep } from "@/lib/utils/sort-lessons-by-step";
import FilterBySubject from "./filter-by-subject";
import { parseSubjectParam } from "@/lib/utils/parse-subject-param";

export default async function LessonsBySubject({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { subject } = await searchParams;

  const [pathsResponse, lessonsResponse] = await Promise.all([
    getPaths(),
    getLessons(),
  ]);

  if (pathsResponse.error) throw pathsResponse.error;
  if (lessonsResponse.error) throw lessonsResponse.error;

  const allowedPathList = pathsResponse.data.map((path) => path.subject);

  const parsedSubjectParam = parseSubjectParam(subject, allowedPathList);

  const sortedLessonByStep = sortLessonsByStep(lessonsResponse.data);

  const grouped = groupLessonsBySubject(sortedLessonByStep);

  const subjectSections = pathsResponse.data.map((path) => {
    const steps = grouped[path.subject]?.map((g) => g.step) ?? [];

    const progress = pathProgress(path.total_steps, steps);

    return {
      subject: path.subject,
      labelSubject: path.label,
      color: path.color,
      totalStep: path.total_steps,
      stepDone: progress.done,
      lessons: grouped[path.subject] ?? [],
    };
  });

  const filteredSubjectSections = subjectSections.filter(
    (sub) => parsedSubjectParam === null || sub.subject === parsedSubjectParam,
  );

  return (
    <>
      <FilterBySubject paths={pathsResponse.data} />
      <div className="flex flex-col gap-5">
        {filteredSubjectSections.length ? (
          filteredSubjectSections.map((section) => {
            return <SubjectSection {...section} key={section.subject} />;
          })
        ) : (
          <p className="rounded-[20px] bg-white px-4.5 py-4 text-[15px] text-muted">
            Non hai ancora nessun percorso
          </p>
        )}
      </div>
    </>
  );
}

const getPaths = async () => {
  const supabase = await createClient();

  const response = await supabase
    .from("paths")
    .select("subject, label, color, total_steps")
    .order("subject");

  return response;
};

const getLessons = async () => {
  const supabase = await createClient();

  const response = await supabase
    .from("lessons")
    .select("id, date, subject, step, title")
    .order("step");

  return response;
};
