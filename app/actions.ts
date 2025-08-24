"use server";
import { revalidatePath } from "next/cache";

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function doSomething(formData: FormData) {
  await wait(2000);
  revalidatePath("/");

  return { state: "success", message: "Something done" } as const;
}
