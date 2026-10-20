import { Suspense } from "react";
import LatestLesson from "./_components/latest-lesson";
import TodayDate from "./_components/today-date";

const TodayPage = () => {
  return (
    <div>
      <div className="my-4 flex flex-col gap-1">
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              className="h-[22.5px] w-40 animate-pulse rounded bg-ink/10"
            />
          }
        >
          <TodayDate />
        </Suspense>

        <h1 className="font-heading text-[30px] leading-[1.1] font-bold">
          Buongiorno, Claudia
        </h1>
      </div>
      <Suspense fallback={<p>Caricamento</p>}>
        <LatestLesson />
      </Suspense>
    </div>
  );
};

export default TodayPage;
