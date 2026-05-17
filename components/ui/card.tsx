import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-[1.9rem] text-card-foreground transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(247,250,255,0.96))] shadow-soft backdrop-blur-2xl",
        panel:
          "border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(243,248,255,0.96))] shadow-panel backdrop-blur-3xl",
        dashboard:
          "border border-slate-200/80 bg-[linear-gradient(180deg,rgba(252,253,255,0.98),rgba(237,245,255,0.94))] shadow-panel backdrop-blur-3xl",
        light:
          "border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] shadow-[0_24px_80px_rgba(8,22,52,0.14)]",
        accent:
          "border border-sky-100 bg-[linear-gradient(145deg,rgba(255,255,255,0.99),rgba(232,244,255,0.96)_52%,rgba(191,219,254,0.9))] shadow-halo",
        muted:
          "border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,245,249,0.92))] shadow-soft backdrop-blur-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-2 p-7", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-display text-xl font-semibold tracking-tight text-slate-950", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm leading-6 text-slate-600", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
