import path from "node:path";
import { fileURLToPath } from "node:url";

import { env } from "@/lib/env";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const defaultLocalUploadRoot = path.join(
  currentDir,
  "..",
  "storage",
  "uploads",
  "private",
);
const defaultVercelUploadRoot = path.join("/tmp", "medpobeda-uploads");
const vercelFunctionPayloadLimitMb = 4;

function isDefaultRelativeUploadRoot(value: string) {
  return value === "./storage/uploads/private" || value === "storage/uploads/private";
}

function getUploadRootBase() {
  const configuredRoot = env.UPLOAD_ROOT.trim();

  if (path.isAbsolute(configuredRoot)) {
    return configuredRoot;
  }

  if (!configuredRoot || isDefaultRelativeUploadRoot(configuredRoot)) {
    return process.env.VERCEL ? defaultVercelUploadRoot : defaultLocalUploadRoot;
  }

  return process.env.VERCEL
    ? path.join(defaultVercelUploadRoot, configuredRoot.replace(/^\.?\//, ""))
    : defaultLocalUploadRoot;
}

export function getEffectiveUploadSizeLimitMb() {
  return process.env.VERCEL
    ? Math.min(env.MAX_UPLOAD_SIZE_MB, vercelFunctionPayloadLimitMb)
    : env.MAX_UPLOAD_SIZE_MB;
}

export function resolveUploadStoragePath(...segments: string[]) {
  return path.join(getUploadRootBase(), ...segments);
}
