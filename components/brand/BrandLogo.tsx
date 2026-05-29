"use client";

import Image from "next/image";

import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "header" | "footer" | "icon";
  className?: string;
  light?: boolean;
};

const variantClasses = {
  header:
    "h-8 w-[7.1rem] rounded-[0.95rem] min-[360px]:h-[2.15rem] min-[360px]:w-[7.85rem] sm:h-10 sm:w-[9.85rem] sm:rounded-[1.05rem]",
  footer: "h-12 w-[11.75rem] rounded-[1.25rem] sm:h-14 sm:w-[13.5rem]",
  icon: "h-12 w-12 rounded-[1.1rem] sm:h-14 sm:w-14",
} as const;

export function BrandLogo({
  variant = "header",
  className,
  light = false,
}: BrandLogoProps) {
  const asset = light ? media.brand.logoDark : media.brand.logo;

  return (
    <div className={cn("inline-flex shrink-0 items-center", className)}>
      <div
        className={cn(
          "relative overflow-hidden border bg-white",
          variantClasses[variant],
          light
            ? "border-white/16 shadow-[0_20px_52px_rgba(0,0,0,0.24)]"
            : "border-[#D6E8FF] shadow-[0_18px_44px_rgba(7,27,58,0.14)]",
        )}
      >
        <Image
          src={asset.src}
          alt="MedPobeda Group logo"
          fill
          sizes={
            variant === "icon"
              ? "(min-width: 640px) 56px, 48px"
              : variant === "header"
                ? "(min-width: 640px) 192px, (min-width: 360px) 126px, 114px"
                : "(min-width: 640px) 240px, 216px"
          }
          className={cn(
            "select-none",
            variant === "icon" ? "object-cover object-left" : "object-cover object-center",
          )}
          priority={variant !== "footer"}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-[2px] rounded-[inherit] border",
            light ? "border-white/10" : "border-slate-200/80",
          )}
        />
      </div>
    </div>
  );
}
