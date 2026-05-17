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
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative flex h-12 w-12 items-center justify-center rounded-2xl border shadow-premium",
          light
            ? "border-white/20 bg-[linear-gradient(160deg,rgba(255,255,255,0.2),rgba(56,189,248,0.16),rgba(29,78,216,0.18))]"
            : "border-[#D6E8FF] bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(224,242,254,0.94),rgba(214,232,255,0.92))]",
        )}
      >
        <div
          className={cn(
            "absolute inset-[5px] rounded-[1rem] border",
            light ? "border-white/20 bg-white/10" : "border-white/70 bg-white/96",
          )}
        />
        <div className="relative h-5 w-5">
          <div
            className={cn(
              "absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 rounded-full",
              light ? "bg-white" : "bg-[#1D4ED8]",
            )}
          />
          <div
            className={cn(
              "absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full",
              light ? "bg-white" : "bg-[#071B3A]",
            )}
          />
        </div>
      </div>
      <div className="min-w-0">
        <p
          className={cn(
            "truncate text-[0.68rem] font-semibold uppercase tracking-[0.34em]",
            light ? "text-sky-200" : "text-blue-700",
          )}
        >
          MedPobeda
        </p>
        {!compact && (
          <p
            className={cn(
              "font-display text-base font-semibold",
              light ? "text-white" : "text-[#071B3A]",
            )}
          >
            Group
          </p>
        )}
      </div>
    </div>
  );
}
