"use client";

import { Check } from "lucide-react";

import { useMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type InquiryProgressProps = {
  steps: string[];
  currentStep: number;
};

export function InquiryProgress({
  steps,
  currentStep,
}: InquiryProgressProps) {
  const messages = useMessages();

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {steps.map((step, index) => {
        const state =
          index < currentStep ? "complete" : index === currentStep ? "current" : "upcoming";

        return (
          <div
            key={step}
            className={cn(
              "rounded-[1.5rem] border px-4 py-4 transition shadow-[0_12px_30px_rgba(8,22,52,0.04)]",
              state === "complete" &&
                "border-sky-200 bg-sky-50 text-sky-800",
              state === "current" &&
                "border-[#BFD7FF] bg-white text-slate-950 shadow-soft",
              state === "upcoming" &&
                "border-slate-200 bg-slate-50 text-slate-500",
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                  state === "complete" &&
                    "border-sky-200 bg-sky-100 text-sky-800",
                  state === "current" &&
                    "border-slate-200 bg-sky-50 text-sky-700",
                  state === "upcoming" &&
                    "border-slate-200 bg-white text-slate-500",
                )}
              >
                {state === "complete" ? <Check className="h-4 w-4" /> : `0${index + 1}`}
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.24em] opacity-70">
                  {messages.chrome.progress.step}
                </p>
                <p className="mt-1 text-sm font-semibold leading-6">{step}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
