import { FadeIn } from "@/components/shared/fade-in";
import { ImageCard } from "@/components/shared/image-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getSiteImage, type SiteImageKey } from "@/lib/site-images";

type PageVisualShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageKeys: readonly SiteImageKey[];
  imageTitles?: string[];
  imageDescriptions?: string[];
  imageAlts?: string[];
};

export function PageVisualShowcase({
  eyebrow,
  title,
  description,
  imageKeys,
  imageTitles,
  imageDescriptions,
  imageAlts,
}: PageVisualShowcaseProps) {
  const primaryBase = getSiteImage(imageKeys[0]!);
  const secondaryBase = getSiteImage(imageKeys[1]!);
  const tertiaryBase = getSiteImage(imageKeys[2]!);
  const primary = { ...primaryBase, alt: imageAlts?.[0] ?? primaryBase.alt };
  const secondary = { ...secondaryBase, alt: imageAlts?.[1] ?? secondaryBase.alt };
  const tertiary = { ...tertiaryBase, alt: imageAlts?.[2] ?? tertiaryBase.alt };

  return (
    <section className="section-shell-compact">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <FadeIn>
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2">
            <FadeIn className="sm:col-span-2">
              <ImageCard
                asset={primary}
                title={imageTitles?.[0] ?? primary.title}
                description={imageDescriptions?.[0] || primary.alt}
                aspectClassName="aspect-[16/9]"
              />
            </FadeIn>
            <FadeIn delay={0.06}>
              <ImageCard
                asset={secondary}
                title={imageTitles?.[1] ?? secondary.title}
                description={imageDescriptions?.[1] || undefined}
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <ImageCard
                asset={tertiary}
                title={imageTitles?.[2] ?? tertiary.title}
                description={imageDescriptions?.[2] || undefined}
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
