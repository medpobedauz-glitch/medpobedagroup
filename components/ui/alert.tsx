import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "rounded-[1.4rem] border px-4 py-4 text-sm leading-7 shadow-sm",
  {
    variants: {
      variant: {
        info: "border-cyan-200/40 bg-cyan-50/10 text-cyan-50",
        success: "border-emerald-300/35 bg-emerald-300/12 text-emerald-50",
        warning: "border-amber-300/35 bg-amber-300/12 text-amber-50",
        light: "border-slate-200 bg-white text-slate-700",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export function Alert({ className, variant, ...props }: AlertProps) {
  return <div className={cn(alertVariants({ variant }), className)} {...props} />;
}
