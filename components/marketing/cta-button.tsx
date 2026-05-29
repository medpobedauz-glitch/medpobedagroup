"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getLocaleFromPathname, localizePath } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type CTAButtonIcon = "arrow-right" | "arrow-up-right";

type CTAButtonProps = {
  href: string;
  label: string;
  variant?: "hero" | "surface" | "outline" | "primary";
  size?: "sm" | "default" | "lg" | "xl" | "2xl";
  icon?: CTAButtonIcon;
  className?: string;
};

const iconMap = {
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
} as const;

export function CTAButton({
  href,
  label,
  variant = "hero",
  size = "xl",
  icon,
  className,
}: CTAButtonProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const isInternalPath = href.startsWith("/");
  const resolvedHref = isInternalPath ? localizePath(href, locale) : href;
  const Icon = icon ? iconMap[icon] : null;

  return (
    <Button asChild variant={variant} size={size} className={cn("w-full sm:w-auto", className)}>
      {isInternalPath ? (
        <Link href={resolvedHref}>
          {label}
          {Icon ? <Icon className="h-4 w-4" /> : null}
        </Link>
      ) : (
        <a href={resolvedHref}>
          {label}
          {Icon ? <Icon className="h-4 w-4" /> : null}
        </a>
      )}
    </Button>
  );
}
