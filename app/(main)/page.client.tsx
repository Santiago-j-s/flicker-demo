"use client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { doSomething } from "../actions";
import { useActionState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw, Sparkles } from "lucide-react";
import { Description } from "./components/Description";
import { useRouter } from "next/navigation";

interface BaseFinalState {
  state: "success" | "error";
}

interface ErrorState extends BaseFinalState {
  state: "error";
  error: string;
}

interface SuccessState extends BaseFinalState {
  state: "success";
  message: string;
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
  return doSomething(formData);
}

export function Modal({ value }: { value: number }) {
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
              Value from database: {value}
            </DialogTitle>
            <Description state={state} />
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
            <RefreshButton />
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function RefreshButton() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button
      onClick={handleRefresh}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4 inline-block" />
          <span>Refreshing...</span>
        </>
      ) : (
        <>
          <RefreshCcw className="w-4 h-4" />
          <span>Refresh</span>
        </>
      )}
    </Button>
  );
}
