import "server-only";

export function registerMonitoring() {
  if (process.env.NODE_ENV === "development") {
    console.info("Monitoring hooks initialized.");
  }
}

export function captureServerError(error: unknown, context: Record<string, unknown>) {
  const message = error instanceof Error ? error.message : "Unknown server error";
  console.error("MedPobeda monitoring capture", {
    message,
    context,
  });
}
