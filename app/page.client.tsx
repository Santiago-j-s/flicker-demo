"use client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { doSomething } from "./actions";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface BaseFinalState {
  state: "success" | "error";
  finishedAt: Date;
}

interface ErrorState extends BaseFinalState {
  state: "error";
  error: string;
  finishedAt: Date;
}

interface SuccessState extends BaseFinalState {
  state: "success";
  message: string;
  finishedAt: Date;
}

type FinalState = ErrorState | SuccessState;

interface InitialState {
  state: "idle";
}

export type DoSomethingState = InitialState | FinalState;

async function clientAction(
  _prevState: DoSomethingState,
  formData: FormData
): Promise<DoSomethingState> {
  const result = await doSomething(formData);

  return {
    state: result.state,
    message: result.message,
    finishedAt: new Date(),
  };
}

export function Modal() {
  const [state, formAction, isPending] = useActionState(clientAction, {
    state: "idle",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-6 py-2 rounded-lg font-semibold bg-zinc-900 text-white shadow hover:bg-zinc-800 transition-colors duration-200">
          Open
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-zinc-900 border-0 shadow-2xl rounded-2xl p-8">
        <DialogHeader className="mb-4">
          <form action={formAction} className="flex flex-col gap-6">
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Dialog Title
            </DialogTitle>
            {state.state === "success" ? (
              <DialogDescription className="mb-2 text-base font-medium text-green-600 dark:text-green-400">
                Action completed successfully! Everything went as planned.
              </DialogDescription>
            ) : state.state === "error" ? (
              <DialogDescription className="mb-2 text-base font-medium text-red-600 dark:text-red-400">
                Oops! Something went wrong: {state.error ?? "Unknown error."}
              </DialogDescription>
            ) : (
              <DialogDescription className="mb-2 text-base font-medium text-gray-600 dark:text-gray-400">
                Working magic for you...
              </DialogDescription>
            )}
            <Button
              type="submit"
              disabled={isPending}
              className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-200 ${
                isPending
                  ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 cursor-not-allowed"
                  : "bg-zinc-900 text-white hover:bg-zinc-800"
              }`}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4 inline-block" />
                  <span>Working magic for you...</span>
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 inline-block" />
                  <span>Do something amazing</span>
                </>
              )}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
