import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";

export type PremiumVisualAsset = {
  src: string;
  alt: string;
};

type PremiumImageFrameProps = {
  asset: PremiumVisualAsset;
  className?: string;
  aspectClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function PremiumImageFrame({
  asset,
  className,
  aspectClassName = "aspect-[4/3]",
  sizes = "(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 100vw",
  priority = false,
}: PremiumImageFrameProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-[#D6E8FF] bg-white shadow-[0_24px_80px_rgba(7,27,58,0.08)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_18%)]" />
      <div className={cn("relative overflow-hidden rounded-[calc(2rem-0.7rem)] m-3", aspectClassName)}>
        <ImageWithFallback
          src={asset.src}
          alt={asset.alt}
          fill
          priority={priority}
          sizes={sizes}
          fallbackLabel="MedPobeda Group"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(7,27,58,0.12)_48%,rgba(7,27,58,0.26)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_22%)]" />
      </div>
    </div>
  );
}
