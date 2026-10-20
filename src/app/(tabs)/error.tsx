"use client";

import { useEffect } from "react";
import { CircleAlert, RotateCw } from "lucide-react";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error.digest);
  }, [error]);

  return (
    <div
      role="alert"
      className="mt-5 flex flex-col gap-4 rounded-[20px] bg-white px-4.5 py-5"
    >
      <div className="flex items-center gap-3.5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
          <CircleAlert size={22} className="text-accent" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="font-heading text-xl font-bold">
            Qualcosa è andato storto
          </h2>
          <p className="text-sm text-muted">
            Non sono riuscita a caricare le lezioni.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => retry()}
        className="flex items-center gap-2 self-start rounded-[14px] bg-accent px-5 py-3.25 font-bold text-white hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <RotateCw size={18} aria-hidden="true" />
        Riprova
      </button>
    </div>
  );
}
