import type { PremiumVisualAsset } from "@/components/marketing/premium-image-frame";
import { getPremiumImage } from "@/lib/images";

export function createPremiumVisual(
  category: string,
  slug: string,
  alt: string,
): PremiumVisualAsset {
  return getPremiumImage(category, slug, alt);
}
