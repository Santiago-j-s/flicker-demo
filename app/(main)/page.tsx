import { getValueFromDatabase } from "@/services/upstash";
import { Modal } from "./page.client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const value = await getValueFromDatabase();

  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-center text-gray-900 dark:text-white mb-4">
          Testing Dialog
        </h1>
        <p className="text-sm text-gray-500 font-bold">
          Value from database: {value}
        </p>
      </header>
      <div className="flex flex-col gap-2">
        <Modal value={value} />
      </div>
    </div>
  );
}
