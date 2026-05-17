import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[3.35rem] w-full rounded-[1.35rem] border border-slate-200/80 bg-[rgba(255,255,255,0.94)] px-4 py-3 text-sm text-slate-950 shadow-[0_12px_30px_rgba(8,22,52,0.06)] outline-none backdrop-blur-xl transition file:mr-4 file:rounded-full file:border-0 file:bg-[#071B3A] file:px-4 file:py-2 file:font-display file:text-sm file:font-semibold file:text-white hover:file:bg-[#12387B] placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
