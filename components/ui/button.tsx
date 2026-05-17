"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-display text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white text-slate-950 shadow-soft hover:-translate-y-0.5 hover:bg-slate-50",
        hero:
          "bg-brand-gradient bg-[length:180%_180%] text-white shadow-premium hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(29,78,216,0.24)] hover:animate-gradient-shift after:absolute after:inset-0 after:bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.3)_45%,transparent_65%)] after:translate-x-[-140%] after:transition-transform after:duration-700 hover:after:translate-x-[140%]",
        primary:
          "bg-[linear-gradient(135deg,#071B3A_0%,#1D4ED8_55%,#38BDF8_100%)] text-white shadow-premium hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_24px_72px_rgba(29,78,216,0.2)] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_45%)]",
        outline:
          "border border-[#D6E8FF] bg-white/90 text-slate-700 shadow-[0_14px_36px_rgba(8,22,52,0.05)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-[#1D4ED8]/50 hover:bg-white",
        ghost:
          "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
        secondary:
          "border border-[#D6E8FF] bg-white/85 text-slate-950 shadow-[0_14px_36px_rgba(8,22,52,0.05)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white",
        subtle:
          "border border-[#D6E8FF] bg-slate-50 text-slate-700 hover:-translate-y-0.5 hover:border-[#38BDF8]/30 hover:bg-white",
        surface:
          "border border-[#D6E8FF] bg-white/92 text-slate-700 shadow-soft backdrop-blur-xl hover:-translate-y-0.5 hover:border-[#9CC8FF] hover:bg-white",
        danger:
          "bg-rose-600 text-white shadow-soft hover:-translate-y-0.5 hover:bg-rose-500",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-sm",
        xl: "h-14 px-7 text-[0.95rem]",
        "2xl": "h-16 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
