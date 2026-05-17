import "server-only";

import { env } from "@/lib/env";

export async function sendTelegramNotification(message: string) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return;
  }

  const endpoint = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: message,
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.warn("Telegram notification failed", error);
  }
}
