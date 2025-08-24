import { useEffect, useMemo, useState } from "react";
import type { DoSomethingState } from "../page.client";
import { DialogDescription } from "@/components/ui/dialog";

const RESET_DESCRIPTION_AFTER = 5;

export function Description({ state }: { state: DoSomethingState }) {
  const descriptionState = useMemo(() => {
    if (state.state === "success" || state.state === "error") {
      return { state: "visible", lastFinishedAt: new Date() } as const;
    }

    return { state: "hidden", lastFinishedAt: null } as const;
  }, [state]);

  const [timePassed, setTimePassed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      if (descriptionState.lastFinishedAt) {
        setTimePassed(
          Math.floor(
            (now.getTime() - descriptionState.lastFinishedAt.getTime()) / 1000
          )
        );
      } else {
        setTimePassed(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [descriptionState]);

  if (
    descriptionState.state === "hidden" ||
    timePassed > RESET_DESCRIPTION_AFTER
  ) {
    return null;
  }

  const time = (
    <span className="text-sm text-gray-500">
      {RESET_DESCRIPTION_AFTER - timePassed} seconds left
    </span>
  );

  if (state.state === "success") {
    return (
      <DialogDescription className="mb-2 text-base font-medium text-green-600 dark:text-green-400">
        Action completed successfully! Everything went as planned. {time}
      </DialogDescription>
    );
  }

  if (state.state === "error") {
    return (
      <DialogDescription className="mb-2 text-base font-medium text-red-600 dark:text-red-400">
        Oops! Something went wrong: {state.error ?? "Unknown error."} {time}
      </DialogDescription>
    );
  }
}
