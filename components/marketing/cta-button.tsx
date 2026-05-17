import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  href: string;
  label: string;
  variant?: "hero" | "surface" | "outline" | "primary";
  size?: "sm" | "default" | "lg" | "xl" | "2xl";
  icon?: LucideIcon;
  className?: string;
};

export function CTAButton({
  href,
  label,
  variant = "hero",
  size = "xl",
  icon: Icon,
  className,
}: CTAButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      <Link href={href}>
        {label}
        {Icon ? <Icon className="h-4 w-4" /> : null}
      </Link>
    </Button>
  );
}
