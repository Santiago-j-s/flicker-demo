import { Redis } from "@upstash/redis";

function parseUnknownValueAsNumber(value: unknown): number {
  if (typeof value === "string") {
    const parsed = parseInt(value);

    if (isNaN(parsed)) {
      throw new Error(`Value is not a number: ${value} (${parsed})`);
    }

    return parsed;
  }

  if (value === null || value === undefined) {
    return 0;
  }

  if (typeof value === "number") {
    return value;
  }

  throw new Error(`Value is not a number: ${value} (${typeof value})`);
}

if (
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN
) {
  throw new Error(
    "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set"
  );
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const KEY = "test" as const;

export async function getValueFromDatabase() {
  return parseUnknownValueAsNumber(await redis.get(KEY));
}

export async function setValueInDatabase(value: number) {
  await redis.set(KEY, value.toString());
}
