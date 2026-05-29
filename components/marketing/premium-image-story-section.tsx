import { PremiumImageFrame, type PremiumVisualAsset } from "@/components/marketing/premium-image-frame";
import { SectionHeader } from "@/components/marketing/section-header";

type PremiumImageStorySectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  body: string[];
  badges: string[];
  images: PremiumVisualAsset[];
};

export function PremiumImageStorySection({
  eyebrow,
  title,
  description,
  body,
  badges,
  images,
}: PremiumImageStorySectionProps) {
  return (
    <section className="section-shell">
      <div className="container-wide">
        <div className="section-frame-soft px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {images.map((asset, index) => (
                <PremiumImageFrame
                  key={asset.src}
                  asset={asset}
                  aspectClassName={index % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}
                  className={index === 2 ? "md:-mt-10" : undefined}
                />
              ))}
            </div>
            <div className="panel-stack">
              <SectionHeader
                eyebrow={eyebrow}
                title={title}
                description={description}
              />
              <div className="mt-6 grid gap-5">
                {body.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="story-divider my-8" />
              <div className="grid gap-3 sm:grid-cols-2">
                {badges.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center rounded-full border border-[#D6E8FF] bg-white px-4 py-3 text-sm font-semibold text-[#071B3A] shadow-[0_14px_40px_rgba(7,27,58,0.06)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
