import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ImageResponse } from "next/og";

import enMessages from "@/messages/en.json";
import { media } from "@/lib/media";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.socialPreviewAlt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const publicRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");

export default async function OpenGraphImage() {
  const logoBuffer = await readFile(
    path.join(publicRoot, media.brand.logo.src.replace(/^\//, "")),
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 20% 0%, rgba(89, 220, 255, 0.18), transparent 24%), radial-gradient(circle at 84% 16%, rgba(69, 123, 255, 0.16), transparent 22%), linear-gradient(140deg, #ffffff 0%, #eff6ff 44%, #dbeafe 100%)",
          padding: "72px",
          color: "#071B3A",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <img
            src={logoSrc}
            alt={siteConfig.name}
            width={276}
            height={84}
            style={{
              height: 84,
              width: 276,
              borderRadius: 26,
              border: "1px solid rgba(29,78,216,0.12)",
              background: "rgba(255,255,255,0.96)",
              objectFit: "cover",
              objectPosition: "center",
              boxShadow: "0 18px 44px rgba(7,27,58,0.12)",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              borderRadius: 999,
              border: "1px solid rgba(29,78,216,0.12)",
              background: "rgba(255,255,255,0.82)",
              padding: "10px 18px",
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(29,78,216,0.92)",
            }}
          >
            {siteConfig.tagline}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 940,
              fontSize: 72,
              lineHeight: 1.04,
              fontWeight: 700,
            }}
          >
            {enMessages.pages.home.hero.title}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 840,
              fontSize: 26,
              lineHeight: 1.5,
              color: "rgba(71, 85, 105, 0.94)",
            }}
          >
            {enMessages.routes.home.description}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
