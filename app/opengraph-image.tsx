import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = "MedPobeda Group social preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              height: 72,
              width: 72,
              borderRadius: 24,
              border: "1px solid rgba(29,78,216,0.12)",
              background: "rgba(255,255,255,0.86)",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 16px 40px rgba(7,27,58,0.08)",
            }}
          >
            <div
              style={{
                height: 18,
                width: 18,
                borderRadius: 999,
                background: "#38BDF8",
                boxShadow: "0 0 24px rgba(56,189,248,0.45)",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 20,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: "rgba(29,78,216,0.78)",
              }}
            >
              MedPobeda
            </span>
            <span style={{ fontSize: 34, fontWeight: 700 }}>Group</span>
          </div>
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
            Connecting Patients, Hospitals & Global Healthcare Opportunities
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
            Medical tourism, international patient support, hospital partnerships,
            student mobility, and India–Uzbekistan healthcare collaboration.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
