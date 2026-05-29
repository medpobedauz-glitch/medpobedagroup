"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";

type ImageWithFallbackProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  fallbackLabel?: string;
  fallbackClassName?: string;
};

export function ImageWithFallback({
  src,
  alt,
  fallbackLabel = "MedPobeda Group",
  className,
  fallbackClassName,
  onLoad,
  onError,
  fill,
  ...props
}: ImageWithFallbackProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fallbackPanel = (
    <div
      className={cn(
        fill ? "absolute inset-0" : "h-full w-full",
        "flex items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.22),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef6ff_100%)]",
        fallbackClassName,
      )}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-4 px-5 text-center">
        <BrandLogo variant="icon" className="drop-shadow-[0_16px_32px_rgba(7,27,58,0.12)]" />
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
            MedPobeda Group
          </p>
          <p className="text-sm text-slate-600">{fallbackLabel}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!hasLoaded && !hasError ? (
        <div
          className={cn(
            fill ? "absolute inset-0" : "h-full w-full",
            "animate-pulse bg-[linear-gradient(135deg,rgba(239,246,255,1),rgba(219,234,254,0.9),rgba(239,246,255,1))]",
          )}
          aria-hidden="true"
        />
      ) : null}
      {hasError ? fallbackPanel : null}
      {!hasError ? (
        <Image
          {...props}
          fill={fill}
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-500",
            hasLoaded ? "opacity-100" : "opacity-0",
            className,
          )}
          onLoad={(event) => {
            setHasLoaded(true);
            onLoad?.(event);
          }}
          onError={(event) => {
            setHasError(true);
            onError?.(event);
          }}
        />
      ) : null}
    </>
  );
}
