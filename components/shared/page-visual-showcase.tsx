import { FadeIn } from "@/components/shared/fade-in";
import { ImageCard } from "@/components/shared/image-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getSiteImage, type SiteImageKey } from "@/lib/site-images";

type PageVisualShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageKeys: readonly SiteImageKey[];
};

export function PageVisualShowcase({
  eyebrow,
  title,
  description,
  imageKeys,
}: PageVisualShowcaseProps) {
  const primary = getSiteImage(imageKeys[0]!);
  const secondary = getSiteImage(imageKeys[1]!);
  const tertiary = getSiteImage(imageKeys[2]!);

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
                title={primary.title}
                description={primary.alt}
                aspectClassName="aspect-[16/9]"
              />
            </FadeIn>
            <FadeIn delay={0.06}>
              <ImageCard asset={secondary} title={secondary.title} />
            </FadeIn>
            <FadeIn delay={0.1}>
              <ImageCard asset={tertiary} title={tertiary.title} />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
