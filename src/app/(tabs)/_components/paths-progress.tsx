import { createClient } from "@/lib/supabase/server";
import { groupStepsBySubject } from "@/lib/utils/group-steps-by-subject";
import PathsProgressCard, {
  type PathProgressItem,
} from "./paths-progress-card";
import { pathProgress } from "@/lib/utils/path-progress";

export default async function PathsProgress() {
  const [pathsResponse, lessonsResponse] = await Promise.all([
    getPaths(),
    getLessonSteps(),
  ]);

  if (pathsResponse.error) throw pathsResponse.error;
  if (lessonsResponse.error) throw lessonsResponse.error;

  const grouped = groupStepsBySubject(lessonsResponse.data);

  const items: PathProgressItem[] = pathsResponse.data.map((path) => {
    const progress = pathProgress(
      path.total_steps,
      grouped[path.subject] ?? [],
    );

    return {
      subject: path.subject,
      label: path.label,
      color: path.color,
      done: progress.done,
      total: path.total_steps,
      percent: progress.percent,
    };
  });

  return <PathsProgressCard paths={items} />;
}

const getPaths = async () => {
  const supabase = await createClient();

  const response = await supabase
    .from("paths")
    .select("subject, total_steps, label, color")
    .order("subject");
  return response;
};

const getLessonSteps = async () => {
  const supabase = await createClient();

  const response = await supabase.from("lessons").select("subject, step");
  return response;
};
