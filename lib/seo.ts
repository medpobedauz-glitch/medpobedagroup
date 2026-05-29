import { getSeoImageForPath, media, type MediaAsset } from "@/lib/media";

export function resolveSeoImage(path = "/", explicitImage?: string): MediaAsset {
  if (!explicitImage) {
    return getSeoImageForPath(path);
  }

  const matchedMedia =
    Object.values(media.blog.posts).find((asset) => asset.src === explicitImage) ||
    Object.values(media.brand).find((asset) => asset.src === explicitImage) ||
    Object.values(media.hero).find((asset) => asset.src === explicitImage) ||
    Object.values(media.defaults).find((asset) => asset.src === explicitImage);

  return matchedMedia ?? { src: explicitImage, alt: media.brand.openGraph.alt };
}
