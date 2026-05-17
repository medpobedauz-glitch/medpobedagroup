import "server-only";

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __medpobeda_rate_limit__: Map<string, Bucket> | undefined;
}

const rateLimitStore = global.__medpobeda_rate_limit__ ?? new Map<string, Bucket>();

if (process.env.NODE_ENV !== "production") {
  global.__medpobeda_rate_limit__ = rateLimitStore;
}

export function assertRateLimit({ key, limit, windowMs }: RateLimitOptions) {
  const now = Date.now();
  const bucket = rateLimitStore.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (bucket.count >= limit) {
    throw new Error("Too many requests. Please try again shortly.");
  }

  bucket.count += 1;
  rateLimitStore.set(key, bucket);
}
