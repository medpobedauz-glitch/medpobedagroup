import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[150px] w-full rounded-[1.35rem] border border-slate-200/80 bg-[rgba(255,255,255,0.94)] px-4 py-3.5 text-sm text-slate-950 shadow-[0_12px_30px_rgba(8,22,52,0.06)] outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
