import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { SiteImageAsset } from "@/lib/site-images";
import { cn } from "@/lib/utils";

type ImageCardProps = {
  asset: SiteImageAsset;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  aspectClassName?: string;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
};

export function ImageCard({
  asset,
  eyebrow,
  title,
  description,
  className,
  imageClassName,
  contentClassName,
  aspectClassName = "aspect-[4/3]",
  priority = false,
  sizes = "(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw",
  showCaption = true,
}: ImageCardProps) {
  return (
    <div
      className={cn(
        "group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.1)]",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", aspectClassName)}>
        <ImageWithFallback
          src={asset.path}
          alt={asset.alt}
          fill
          priority={priority}
          sizes={sizes}
          fallbackLabel={title || asset.title}
          className={cn(
            "object-cover transition duration-700 group-hover:scale-[1.03]",
            imageClassName,
          )}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(15,23,42,0.1)_38%,rgba(15,23,42,0.62)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.18),transparent_24%)]" />

        {showCaption ? (
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div
              className={cn(
                "rounded-[1.5rem] border border-white/60 bg-white/82 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-2xl",
                contentClassName,
              )}
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-sky-700">
                {eyebrow || asset.category}
              </p>
              <p className="mt-3 font-display text-xl font-semibold text-slate-950 sm:text-2xl">
                {title || asset.title}
              </p>
              {description ? (
                <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
