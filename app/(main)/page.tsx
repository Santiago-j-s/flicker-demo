import { getValueFromDatabase } from "@/services/upstash";
import { Modal } from "./page.client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const value = await getValueFromDatabase();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold tracking-tight text-center text-gray-900 dark:text-white mb-4">
        Testing Dialog
      </h1>
      <Modal value={value} />
    </div>
  );
}
