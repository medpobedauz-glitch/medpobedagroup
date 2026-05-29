import { AlertCircle } from "lucide-react";

import { Card } from "@/components/ui/card";

type ArticleDisclaimerProps = {
  title: string;
  body: string;
};

export function ArticleDisclaimer({ title, body }: ArticleDisclaimerProps) {
  return (
    <Card className="border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(239,246,255,0.96))] p-5">
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-100 bg-sky-50 text-sky-700">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">{body}</p>
        </div>
      </div>
    </Card>
  );
}
