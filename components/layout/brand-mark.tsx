import { BrandLogo } from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
  light?: boolean;
};

export function BrandMark({
  className,
  compact = false,
  light = false,
}: BrandMarkProps) {
  return (
    <BrandLogo
      variant={compact ? "header" : "footer"}
      light={light}
      className={cn("inline-flex shrink-0 items-center", className)}
    />
  );
}
